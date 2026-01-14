export type RatioKey =
  | 'cogs'
  | 'staff'
  | 'occupancy'
  | 'otherOpex'
  | 'wastage'
  | 'ebitda';

export type RatioInput = Record<
  RatioKey,
  {
    value: number | null;
    unknown: boolean;
  }
>;

export type SanityCheckPayload = {
  format: string;
  stage: string;
  role: string;
  country: string;
  province: string;
  screamingBaby: string;
  ratios: RatioInput;
  gp: number | null;
};

export type SanityFlag = {
  key: RatioKey | 'gp' | 'data';
  label: string;
  level: 'watch' | 'issue';
  message: string;
  area: 'margin' | 'labour' | 'overhead' | 'waste' | 'profit' | 'data';
  severity: number;
};

export type SanityCheckResult = {
  score: number;
  flags: SanityFlag[];
  primaryIssue: string;
  secondaryIssue: string;
  checkNext: string[];
  gp: number | null;
};

type RatioRule = {
  label: string;
  area: SanityFlag['area'];
  idealMax?: number;
  idealMin?: number;
  weight: number;
  prompt: string;
};

const ratioRules: Record<RatioKey, RatioRule> = {
  cogs: {
    label: 'COGS',
    area: 'margin',
    idealMax: 42,
    weight: 18,
    prompt: 'Tighten purchasing, stock flow, and recipe adherence.'
  },
  staff: {
    label: 'Staff',
    area: 'labour',
    idealMax: 24,
    weight: 12,
    prompt: 'Rebuild rosters and shift controls to protect labour %.'
  },
  occupancy: {
    label: 'Occupancy',
    area: 'overhead',
    idealMax: 12,
    weight: 8,
    prompt: 'Stress-test rent + utilities against monthly breakeven.'
  },
  otherOpex: {
    label: 'Other Opex',
    area: 'overhead',
    idealMax: 10,
    weight: 8,
    prompt: 'Cap discretionary spend; add approvals + monthly variance.'
  },
  wastage: {
    label: 'Wastage',
    area: 'waste',
    idealMax: 3,
    weight: 10,
    prompt: 'Audit counts, shrink, and prep to plug daily leakage.'
  },
  ebitda: {
    label: 'EBITDA',
    area: 'profit',
    idealMin: 12,
    weight: 16,
    prompt: 'Stack quick wins to lift EBITDA above 12–15%.'
  }
};

function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function addGapFlag(key: RatioKey, flags: SanityFlag[]) {
  flags.push({
    key,
    label: ratioRules[key].label,
    level: 'watch',
    message: `No data provided for ${ratioRules[key].label}. We can’t benchmark this lever yet.`,
    area: 'data',
    severity: 6
  });
}

export function evaluateSanityCheck(payload: SanityCheckPayload): SanityCheckResult {
  let score = 100;
  const flags: SanityFlag[] = [];

  (Object.keys(ratioRules) as RatioKey[]).forEach((key) => {
    const rule = ratioRules[key];
    const entry = payload.ratios[key];

    if (!entry || entry.value === null || Number.isNaN(entry.value) || entry.unknown) {
      if (entry?.unknown) {
        addGapFlag(key, flags);
        score -= 4;
      }
      return;
    }

    const value = clampNumber(entry.value, -50, 150);

    if (rule.idealMax !== undefined && value > rule.idealMax) {
      const overage = value - rule.idealMax;
      const severity = clampNumber(Math.round(rule.weight + overage * 0.7), 6, 28);
      flags.push({
        key,
        label: rule.label,
        level: severity > 14 ? 'issue' : 'watch',
        message: `${rule.label} at ${value}% is above the guardrail (${rule.idealMax}% target).`,
        area: rule.area,
        severity
      });
      score -= severity;
    }

    if (rule.idealMin !== undefined && value < rule.idealMin) {
      const gap = rule.idealMin - value;
      const severity = clampNumber(Math.round(rule.weight + gap * 0.6), 6, 26);
      flags.push({
        key,
        label: rule.label,
        level: severity > 14 ? 'issue' : 'watch',
        message: `${rule.label} at ${value}% is below the healthy floor (${rule.idealMin}%).`,
        area: rule.area,
        severity
      });
      score -= severity;
    }
  });

  const hasCogs = payload.ratios.cogs.value !== null && !payload.ratios.cogs.unknown;
  const gp = hasCogs ? clampNumber(100 - (payload.ratios.cogs.value ?? 0), -50, 150) : null;

  if (gp !== null && gp < 55) {
    const severity = clampNumber(Math.round(16 + (55 - gp) * 0.5), 8, 24);
    flags.push({
      key: 'gp',
      label: 'Gross Profit',
      level: severity > 14 ? 'issue' : 'watch',
      message: `Gross profit at ${gp}% points to margin pressure.`,
      area: 'margin',
      severity
    });
    score -= severity;
  }

  const ordered = [...flags].sort((a, b) => b.severity - a.severity);
  const primaryIssue =
    ordered[0]?.message ?? 'Execution looks steady. Keep your cadence tight and measured.';
  const secondaryIssue =
    ordered[1]?.message ?? 'Stay close to weekly numbers and manager routines.';

  const areasNeedingAttention = new Set(ordered.map((f) => f.area));
  const checkNext: string[] = [];

  (Object.values(ratioRules) as RatioRule[]).forEach((rule) => {
    if (checkNext.length >= 4) return;
    if (areasNeedingAttention.size === 0 || areasNeedingAttention.has(rule.area)) {
      if (!checkNext.includes(rule.prompt)) {
        checkNext.push(rule.prompt);
      }
    }
  });

  if (checkNext.length === 0) {
    checkNext.push('Lock in a weekly operator scoreboard and cash flow cadence.');
  }

  return {
    score: clampNumber(Math.round(score), 0, 100),
    flags: ordered,
    primaryIssue,
    secondaryIssue,
    checkNext,
    gp
  };
}

export function buildWhatsappMessage(payload: SanityCheckPayload, result: SanityCheckResult) {
  const pieces = [
    "Hi Mario, I’m on the DANSANTAN site. I’d like to start a conversation about my business.",
    `Format: ${payload.format || 'Unknown'} | Stage: ${payload.stage || 'n/a'} | Role: ${payload.role || 'n/a'}`,
    `Location: ${payload.country}${payload.province ? ` (${payload.province})` : ''}`,
    `Screaming baby: ${payload.screamingBaby || 'Not provided'}`,
    `Ratios - COGS: ${payload.ratios.cogs.unknown ? 'Unknown' : `${payload.ratios.cogs.value ?? 'n/a'}%`}, Staff: ${
      payload.ratios.staff.unknown ? 'Unknown' : `${payload.ratios.staff.value ?? 'n/a'}%`
    }, Occupancy: ${
      payload.ratios.occupancy.unknown ? 'Unknown' : `${payload.ratios.occupancy.value ?? 'n/a'}%`
    }, Other Opex: ${
      payload.ratios.otherOpex.unknown ? 'Unknown' : `${payload.ratios.otherOpex.value ?? 'n/a'}%`
    }, Wastage: ${
      payload.ratios.wastage.unknown ? 'Unknown' : `${payload.ratios.wastage.value ?? 'n/a'}%`
    }, EBITDA: ${payload.ratios.ebitda.unknown ? 'Unknown' : `${payload.ratios.ebitda.value ?? 'n/a'}%`}`,
    `Score: ${result.score}/100 | Primary: ${result.primaryIssue}`
  ];

  return pieces.join('\n');
}
