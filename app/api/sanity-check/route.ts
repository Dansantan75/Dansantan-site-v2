import { db, getDb, sanityChecks, type InsertSanityCheck } from '@/lib/db';
import {
  type RatioInput,
  type RatioKey,
  type SanityCheckPayload,
  evaluateSanityCheck
} from '@/lib/sanity-check';

function toPercent(value: unknown) {
  if (value === undefined || value === null || value === '') return null;
  const num = Number(value);
  if (Number.isNaN(num)) return null;
  return Math.min(200, Math.max(-50, num));
}

function toNumericString(value: number | null) {
  if (value === null || Number.isNaN(value)) return null;
  return value.toString();
}

function normalizeRatios(raw: any): RatioInput {
  const keys: RatioKey[] = ['cogs', 'staff', 'occupancy', 'otherOpex', 'wastage', 'ebitda'];
  return keys.reduce((acc, key) => {
    const entry = raw?.[key] ?? {};
    acc[key] = {
      value: toPercent(entry.value),
      unknown: Boolean(entry.unknown)
    };
    return acc;
  }, {} as RatioInput);
}

function normalizePayload(input: any): SanityCheckPayload | null {
  if (!input) return null;
  const payload = input.payload ?? input;
  const format = String(payload.format ?? '').trim();
  const stage = String(payload.stage ?? '').trim();
  const role = String(payload.role ?? '').trim();
  const country = String(payload.country ?? '').trim();
  const province = String(payload.province ?? '').trim();
  const screamingBaby = String(payload.screamingBaby ?? '').trim().slice(0, 140);

  if (!format || !stage || !role || !country || !province || !screamingBaby) {
    return null;
  }

  const ratios = normalizeRatios(payload.ratios);
  const gp =
    ratios.cogs.value === null || ratios.cogs.unknown
      ? null
      : Math.max(-50, Math.min(150, 100 - (ratios.cogs.value ?? 0)));

  return { format, stage, role, country, province, screamingBaby, ratios, gp };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body?.honeypot) {
      return Response.json({ success: true, ignored: true });
    }

    const payload = normalizePayload(body);
    if (!payload) {
      return Response.json(
        { success: false, error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const result = evaluateSanityCheck(payload);
    const client = db ?? getDb();

    const record: InsertSanityCheck = {
      format: payload.format,
      stage: payload.stage,
      role: payload.role,
      country: payload.country,
      province: payload.province,
      screamingBaby: payload.screamingBaby,
      cogs: toNumericString(payload.ratios.cogs.value),
      staff: toNumericString(payload.ratios.staff.value),
      occupancy: toNumericString(payload.ratios.occupancy.value),
      otherOpex: toNumericString(payload.ratios.otherOpex.value),
      wastage: toNumericString(payload.ratios.wastage.value),
      ebitda: toNumericString(payload.ratios.ebitda.value),
      gp: toNumericString(result.gp),
      unknownCogs: payload.ratios.cogs.unknown,
      unknownStaff: payload.ratios.staff.unknown,
      unknownOccupancy: payload.ratios.occupancy.unknown,
      unknownOtherOpex: payload.ratios.otherOpex.unknown,
      unknownWastage: payload.ratios.wastage.unknown,
      unknownEbitda: payload.ratios.ebitda.unknown,
      score: result.score,
      primaryIssue: result.primaryIssue,
      secondaryIssue: result.secondaryIssue,
      flags: result.flags,
      checkNext: result.checkNext
    };

    await client.insert(sanityChecks).values(record);

    return Response.json({ success: true, result });
  } catch (error) {
    console.error('Sanity check submission failed', error);
    return Response.json(
      { success: false, error: 'Unable to submit right now. Please try again shortly.' },
      { status: 500 }
    );
  }
}
