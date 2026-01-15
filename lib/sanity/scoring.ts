import { SANITY_BANDS, FormatBands, MetricBand } from './bands';
import { BusinessFormat, Flag, Metric, Stage } from './types';

const FLAG_SCORES: Record<Flag, number> = {
  green: 0,
  amber: 1,
  red: 3,
  unknown: 0
};

const METRIC_WEIGHTS: Record<Metric, number> = {
  occupancy: 1.5,
  staff: 1.3,
  gp: 1.2,
  wastage: 1.2,
  otherOpex: 1.0,
  ebitda: 1.0
};

const PRIMARY_ORDER: Metric[] = ['occupancy', 'staff', 'gp', 'wastage', 'otherOpex'];

export type MetricInputs = Partial<Record<Metric, number | null | undefined>>;

export type ScoreSummary = {
  format: BusinessFormat;
  stage: Stage;
  flags: Record<Metric, Flag>;
  weightedScores: Record<Metric, number>;
  weightedTotal: number;
  redCount: number;
  unknownMetrics: Metric[];
  confidence: 'HIGH' | 'LOW';
  primary?: Metric;
  secondary?: Metric;
};

export const computeGpFromCogs = (cogsPercent: number | null | undefined): number | null => {
  if (typeof cogsPercent !== 'number' || Number.isNaN(cogsPercent)) {
    return null;
  }

  return 100 - cogsPercent;
};

const cloneBand = (band: MetricBand): MetricBand => ({
  direction: band.direction,
  green: [...band.green],
  amber: [...band.amber],
  red: { ...band.red }
});

const adjustLowerIsBetterBand = (band: MetricBand, offset: number): MetricBand => {
  if (band.red.gt === undefined) {
    return band;
  }

  const adjustedThreshold = band.red.gt + offset;

  return {
    ...band,
    amber: [band.amber[0], adjustedThreshold],
    red: { gt: adjustedThreshold }
  };
};

const adjustEbitdaForLt12m = (band: MetricBand): MetricBand => {
  if (band.red.lt === undefined) {
    return band;
  }

  return {
    ...band,
    amber: [0, band.amber[1]],
    red: { lt: 0 }
  };
};

const applyStageAdjustments = (format: BusinessFormat, stage: Stage): FormatBands => {
  const baseBands = SANITY_BANDS[format];
  const adjusted: Partial<FormatBands> = {};

  (Object.keys(baseBands) as Metric[]).forEach((metric) => {
    let band = cloneBand(baseBands[metric]);

    if (stage === 'LT_12M' && (metric === 'staff' || metric === 'otherOpex')) {
      band = adjustLowerIsBetterBand(band, 2);
    }

    if (
      stage === 'Y3_PLUS' &&
      (metric === 'staff' || metric === 'occupancy' || metric === 'otherOpex')
    ) {
      band = adjustLowerIsBetterBand(band, -1);
    }

    if (stage === 'LT_12M' && metric === 'ebitda') {
      band = adjustEbitdaForLt12m(band);
    }

    adjusted[metric] = band;
  });

  return adjusted as FormatBands;
};

const resolveFlag = (value: number | null | undefined, band: MetricBand): Flag => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 'unknown';
  }

  if (band.direction === 'higher') {
    if (band.red.lt !== undefined && value < band.red.lt) {
      return 'red';
    }

    if (value >= band.green[0]) {
      return 'green';
    }

    if (value >= band.amber[0]) {
      return 'amber';
    }

    return 'red';
  }

  if (band.red.gt !== undefined && value > band.red.gt) {
    return 'red';
  }

  if (value <= band.green[1]) {
    return 'green';
  }

  if (value <= band.amber[1]) {
    return 'amber';
  }

  return 'red';
};

const calculatePrimaryMetrics = (
  weightedScores: Record<Metric, number>
): { primary?: Metric; secondary?: Metric } => {
  const candidates = PRIMARY_ORDER.filter((metric) => weightedScores[metric] > 0);
  if (!candidates.length) {
    return {};
  }

  const sorted = candidates.sort((a, b) => {
    const diff = weightedScores[b] - weightedScores[a];
    if (diff !== 0) {
      return diff;
    }

    return PRIMARY_ORDER.indexOf(a) - PRIMARY_ORDER.indexOf(b);
  });

  const primary = sorted[0];
  const primaryScore = weightedScores[primary];
  const secondary = sorted.find(
    (metric) => metric !== primary && weightedScores[metric] >= primaryScore * 0.7
  );

  return { primary, secondary };
};

export const scoreAll = (
  format: BusinessFormat,
  stage: Stage,
  metrics: MetricInputs
): ScoreSummary => {
  const bands = applyStageAdjustments(format, stage);
  const flags: Record<Metric, Flag> = {
    gp: 'unknown',
    staff: 'unknown',
    occupancy: 'unknown',
    otherOpex: 'unknown',
    wastage: 'unknown',
    ebitda: 'unknown'
  };
  const weightedScores: Record<Metric, number> = {
    gp: 0,
    staff: 0,
    occupancy: 0,
    otherOpex: 0,
    wastage: 0,
    ebitda: 0
  };
  const unknownMetrics: Metric[] = [];
  let weightedTotal = 0;
  let redCount = 0;

  (Object.keys(bands) as Metric[]).forEach((metric) => {
    const flag = resolveFlag(metrics[metric], bands[metric]);
    flags[metric] = flag;

    if (flag === 'unknown') {
      unknownMetrics.push(metric);
      return;
    }

    const weightedScore = FLAG_SCORES[flag] * METRIC_WEIGHTS[metric];
    weightedScores[metric] = weightedScore;
    weightedTotal += weightedScore;

    if (flag === 'red') {
      redCount += 1;
    }
  });

  const { primary, secondary } = calculatePrimaryMetrics(weightedScores);
  const confidence = unknownMetrics.length >= 3 ? 'LOW' : 'HIGH';

  return {
    format,
    stage,
    flags,
    weightedScores,
    weightedTotal,
    redCount,
    unknownMetrics,
    confidence,
    primary,
    secondary
  };
};

export const inferIssues = (summary: ScoreSummary) => ({
  primary: summary.primary ?? null,
  secondary: summary.secondary ?? null,
  confidence: summary.confidence,
  unknownMetrics: summary.unknownMetrics
});

export const overallStatus = (summary: ScoreSummary): Flag => {
  if (summary.redCount >= 2 || summary.weightedTotal > 7) {
    return 'red';
  }

  if (summary.redCount === 1 || (summary.weightedTotal >= 4 && summary.weightedTotal <= 7)) {
    return 'amber';
  }

  if (summary.redCount === 0 && summary.weightedTotal < 4) {
    return 'green';
  }

  return 'unknown';
};

export const buildWhatsAppUrl = (message?: string) => {
  const base = 'https://wa.me/27824988638';
  if (!message) {
    return base;
  }

  return `${base}?text=${encodeURIComponent(message)}`;
};
