"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Wand2
} from "lucide-react";
import {
  type RatioKey,
  type SanityCheckPayload,
  type SanityCheckResult,
  buildWhatsappMessage,
  evaluateSanityCheck
} from "@/lib/sanity-check";

type RatioState = Record<
  RatioKey,
  {
    value: string;
    unknown: boolean;
  }
>;

const ratioFields: {
  key: RatioKey;
  label: string;
  helper: string;
}[] = [
  { key: "cogs", label: "COGS %", helper: "Cost of goods as % of revenue." },
  { key: "staff", label: "Staff %", helper: "All people costs as % of revenue." },
  { key: "occupancy", label: "Occupancy %", helper: "Rent + utilities as % of revenue." },
  { key: "otherOpex", label: "Other Opex %", helper: "Other operating expenses as % of revenue." },
  { key: "wastage", label: "Wastage %", helper: "Shrink / wastage as % of revenue." },
  { key: "ebitda", label: "EBITDA %", helper: "EBITDA as % of revenue." }
];

const formatOptions = [
  "QSR",
  "Café/Coffee",
  "Restaurant",
  "Liquor Retail",
  "Grocery/Convenience",
  "Other"
];

const stageOptions = ["<12m", "1–3y", "3+"];

const roleOptions = [
  "Owner-operator",
  "Multi-unit franchisee",
  "Manager",
  "Investor / Board",
  "Prospective franchisee",
  "Other"
];

const initialRatios: RatioState = {
  cogs: { value: "", unknown: false },
  staff: { value: "", unknown: false },
  occupancy: { value: "", unknown: false },
  otherOpex: { value: "", unknown: false },
  wastage: { value: "", unknown: false },
  ebitda: { value: "", unknown: false }
};

function toNumber(value: string) {
  if (value === "") return null;
  const num = Number(value);
  if (Number.isNaN(num)) return null;
  return Math.min(200, Math.max(-50, num));
}

export default function SanityCheckPage() {
  const [form, setForm] = useState({
    format: "",
    stage: "",
    role: "",
    country: "",
    province: "",
    screamingBaby: ""
  });
  const [ratios, setRatios] = useState<RatioState>(initialRatios);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [result, setResult] = useState<SanityCheckResult | null>(null);
  const [submittedPayload, setSubmittedPayload] = useState<SanityCheckPayload | null>(null);

  const gp = useMemo(() => {
    if (ratios.cogs.unknown) return null;
    const num = toNumber(ratios.cogs.value);
    return num === null ? null : Math.max(-50, Math.min(150, 100 - num));
  }, [ratios.cogs]);

  useEffect(() => {
    const last = typeof window !== "undefined" ? window.localStorage.getItem("sanity-check-last") : null;
    if (last) {
      const elapsed = Math.floor((Date.now() - Number(last)) / 1000);
      const remaining = Math.max(0, 60 - elapsed);
      setCooldownRemaining(remaining);
    }

    const interval = setInterval(() => {
      setCooldownRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const whatsappLink = useMemo(() => {
    if (!result || !submittedPayload) {
      const message =
        "Hi Mario, I’m on the DANSANTAN site. I’d like to start a conversation about my business. We’re struggling with ____";
      return `https://wa.me/27824988638?text=${encodeURIComponent(message)}`;
    }
    const structured = buildWhatsappMessage(submittedPayload, result);
    return `https://wa.me/27824988638?text=${encodeURIComponent(structured)}`;
  }, [result, submittedPayload]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (honeypot.trim()) {
      return;
    }

    if (!consent) {
      setError("Please accept the consent to continue.");
      return;
    }

    if (cooldownRemaining > 0) {
      setError("A recent submission was recorded. Please wait a moment and try again.");
      return;
    }

    const payload: SanityCheckPayload = {
      format: form.format,
      stage: form.stage,
      role: form.role,
      country: form.country,
      province: form.province,
      screamingBaby: form.screamingBaby.slice(0, 140),
      ratios: {
        cogs: { value: ratios.cogs.unknown ? null : toNumber(ratios.cogs.value), unknown: ratios.cogs.unknown },
        staff: { value: ratios.staff.unknown ? null : toNumber(ratios.staff.value), unknown: ratios.staff.unknown },
        occupancy: {
          value: ratios.occupancy.unknown ? null : toNumber(ratios.occupancy.value),
          unknown: ratios.occupancy.unknown
        },
        otherOpex: {
          value: ratios.otherOpex.unknown ? null : toNumber(ratios.otherOpex.value),
          unknown: ratios.otherOpex.unknown
        },
        wastage: {
          value: ratios.wastage.unknown ? null : toNumber(ratios.wastage.value),
          unknown: ratios.wastage.unknown
        },
        ebitda: {
          value: ratios.ebitda.unknown ? null : toNumber(ratios.ebitda.value),
          unknown: ratios.ebitda.unknown
        }
      },
      gp
    };

    if (
      !payload.format ||
      !payload.stage ||
      !payload.role ||
      !payload.country ||
      !payload.province ||
      !payload.screamingBaby
    ) {
      setError("Please complete all required fields.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/sanity-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ payload, honeypot })
      });

      if (!response.ok) {
        throw new Error("Unable to submit right now. Please try again.");
      }

      const data = await response.json();
      const calculatedResult: SanityCheckResult =
        data?.result ?? evaluateSanityCheck(payload);

      setResult(calculatedResult);
      setSubmittedPayload(payload);
      setStatus("success");
      window.localStorage.setItem("sanity-check-last", String(Date.now()));
      setCooldownRemaining(60);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-black/[0.03] text-black">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-black hover:opacity-70">
            <ArrowLeft className="h-4 w-4" />
            Back to main site
          </a>
          <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-medium text-black/70 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-black/50" />
            Ratio-only. POPIA compliant.
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-black/5 bg-white/80 shadow-sm backdrop-blur">
          <div className="border-b border-black/5 bg-white/60 px-5 py-6 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black/70">
                  <Sparkles className="h-4 w-4 text-black/60" />
                  Operator sanity check
                </div>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Run a 3-minute sanity check</h1>
                <p className="mt-2 max-w-2xl text-sm text-black/70">
                  Drop a few ratios and your current “screaming baby” issue. We’ll score the inputs, highlight the
                  primary execution issue, and suggest the next checks to run.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-black px-4 py-3 text-xs font-medium text-white shadow-sm">
                <Clock className="h-4 w-4 text-white/80" />
                Cooldown {cooldownRemaining > 0 ? `${cooldownRemaining}s` : "ready"}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 px-5 py-8 sm:px-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-black/70">Format</label>
                <select
                  className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-black/30"
                  value={form.format}
                  onChange={(e) => setForm((prev) => ({ ...prev, format: e.target.value }))}
                  required
                >
                  <option value="">Select</option>
                  {formatOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-black/70">Stage</label>
                <select
                  className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-black/30"
                  value={form.stage}
                  onChange={(e) => setForm((prev) => ({ ...prev, stage: e.target.value }))}
                  required
                >
                  <option value="">Select</option>
                  {stageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-black/70">Role</label>
                <select
                  className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-black/30"
                  value={form.role}
                  onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                  required
                >
                  <option value="">Select</option>
                  {roleOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-black/70">Country</label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-black/30"
                  placeholder="South Africa"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-black/70">Province / State</label>
                <input
                  type="text"
                  value={form.province}
                  onChange={(e) => setForm((prev) => ({ ...prev, province: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-black/30"
                  placeholder="Western Cape"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-black/70">Screaming baby (140 chars)</label>
                <textarea
                  value={form.screamingBaby}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      screamingBaby: e.target.value.slice(0, 140)
                    }))
                  }
                  maxLength={140}
                  rows={3}
                  className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-black/30"
                  placeholder="The thing that keeps shouting for your attention."
                  required
                />
                <div className="mt-1 text-right text-[11px] text-black/60">{form.screamingBaby.length}/140</div>
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.12em] text-black/60">Ratios</div>
                  <p className="text-sm text-black/70">Add your best view. Toggle “I don’t know” if data is missing.</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/70">
                  <Wand2 className="h-4 w-4 text-black/50" />
                  GP auto-calculates from COGS
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {ratioFields.map((field) => (
                  <div
                    key={field.key}
                    className="rounded-xl border border-black/10 bg-white p-4 shadow-sm transition hover:border-black/20"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <label className="text-sm font-semibold text-black">{field.label}</label>
                        <p className="text-xs text-black/60">{field.helper}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setRatios((prev) => ({
                            ...prev,
                            [field.key]: { value: prev[field.key].unknown ? prev[field.key].value : "", unknown: !prev[field.key].unknown }
                          }))
                        }
                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition ${
                          ratios[field.key].unknown
                            ? "border-black bg-black text-white"
                            : "border-black/15 bg-white text-black/70 hover:border-black/30"
                        }`}
                      >
                        I don’t know
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        type="number"
                        min="-50"
                        max="200"
                        step="0.1"
                        value={ratios[field.key].value}
                        onChange={(e) =>
                          setRatios((prev) => ({
                            ...prev,
                            [field.key]: { ...prev[field.key], value: e.target.value, unknown: false }
                          }))
                        }
                        disabled={ratios[field.key].unknown}
                        className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-black/30 disabled:bg-black/5"
                        placeholder="e.g. 36.5"
                      />
                      <span className="text-sm text-black/60">%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-black/10 bg-black p-4 text-white shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">Gross Profit (auto)</div>
                    <CheckCircle2 className="h-5 w-5 text-white/70" />
                  </div>
                  <div className="mt-3 text-3xl font-semibold tracking-tight">{gp !== null ? `${gp.toFixed(1)}%` : "—"}</div>
                  <p className="mt-1 text-xs text-white/70">Calculated from COGS input.</p>
                </div>
                <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold text-black">
                    <AlertCircle className="h-4 w-4 text-black/60" />
                    Anti-spam
                  </div>
                  <ul className="mt-2 space-y-1 text-xs text-black/70">
                    <li>• Honeypot field to filter bots.</li>
                    <li>• 60s cooldown between submissions.</li>
                    <li>• Consent required to store ratio-only inputs.</li>
                  </ul>
                  <input
                    type="text"
                    aria-hidden
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="sr-only"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-2 text-sm text-black/80">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-black/30 text-black focus:ring-black"
                  required
                />
                <span>I consent to DANSANTAN storing ratio-only inputs in line with POPIA.</span>
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white shadow-sm disabled:opacity-60"
                >
                  {status === "submitting" ? "Running..." : "Run the sanity check"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <div className="flex items-center gap-2 text-xs text-black/60">
                  <ShieldCheck className="h-4 w-4" />
                  No customer data. Ratios only.
                </div>
              </div>
              {error ? (
                <div className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              ) : null}
              {status === "success" ? (
                <div className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-800">
                  <CheckCircle2 className="h-4 w-4" />
                  Check logged. Scroll for results and next steps.
                </div>
              ) : null}
            </div>
          </form>

          {result && submittedPayload ? (
            <div className="mt-6 border-t border-black/5 bg-white/70 px-5 py-8 sm:px-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.12em] text-black/60">Results</div>
                  <h2 className="text-xl font-semibold tracking-tight">Execution flags</h2>
                  <p className="text-sm text-black/70">Primary + secondary issues, score, and next checks.</p>
                </div>
                <div className="rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black/70 shadow-sm">
                  Score: {result.score}/100
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold text-black">
                    <AlertCircle className="h-4 w-4 text-black/60" />
                    Primary issue
                  </div>
                  <p className="mt-2 text-sm text-black/70">{result.primaryIssue}</p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold text-black">
                    <AlertCircle className="h-4 w-4 text-black/60" />
                    Secondary issue
                  </div>
                  <p className="mt-2 text-sm text-black/70">{result.secondaryIssue}</p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold text-black">
                    <CheckCircle2 className="h-4 w-4 text-black/60" />
                    Gross profit
                  </div>
                  <p className="mt-3 text-3xl font-semibold tracking-tight">{result.gp !== null ? `${result.gp.toFixed(1)}%` : "—"}</p>
                  <p className="mt-1 text-xs text-black/60">Auto from COGS input.</p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm lg:col-span-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-black">
                    <Sparkles className="h-4 w-4 text-black/60" />
                    Flags
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {result.flags.length === 0 ? (
                      <div className="rounded-xl border border-green-100 bg-green-50 p-3 text-sm text-green-800">
                        No immediate flags. Lock in the cadence and manager scorecards.
                      </div>
                    ) : (
                      result.flags.map((flag) => (
                        <div
                          key={flag.message}
                          className={`rounded-xl border p-3 text-sm shadow-sm ${
                            flag.level === "issue"
                              ? "border-red-200 bg-red-50 text-red-800"
                              : "border-amber-200 bg-amber-50 text-amber-800"
                          }`}
                        >
                          <div className="text-xs font-semibold uppercase tracking-[0.08em]">{flag.label}</div>
                          <div className="mt-1 text-sm">{flag.message}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold text-black">
                    <Wand2 className="h-4 w-4 text-black/60" />
                    Check next
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-black/70">
                    {result.checkNext.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-black/40" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-black/10 bg-black p-5 text-white shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <MessageCircle className="h-4 w-4 text-white/80" />
                    Ready to talk through this?
                  </div>
                  <p className="mt-2 text-sm text-white/80">
                    We’ll reply with a short read on the ratios above, plus a 20-minute slot to unpack the screaming baby.
                  </p>
                </div>
                <div className="flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900 shadow-sm">
                  <div className="flex items-center gap-2 font-semibold">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp CTA (structured)
                  </div>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
                  >
                    Send to Mario on WhatsApp
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                  <div className="text-xs text-emerald-800">
                    Pre-fills your format, stage, screaming baby, ratios, and the primary issue flagged above.
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
