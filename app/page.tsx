"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  ClipboardCheck,
  Coins,
  LineChart,
  ShieldCheck,
  Users,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
} from "lucide-react";

// Single-file, production-ready landing page for DANSANTAN
// Styling: Tailwind (available by default). No external assets required.

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-black/70 shadow-sm backdrop-blur">
    {children}
  </span>
);

const Card = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="group rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex items-start gap-3">
      <div className="rounded-xl border border-black/10 bg-white p-2 shadow-sm">{icon}</div>
      <div>
        <h3 className="text-base font-semibold text-black">{title}</h3>
        <div className="mt-2 text-sm leading-6 text-black/70">{children}</div>
      </div>
    </div>
  </div>
);

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur">
    <div className="text-2xl font-semibold tracking-tight text-black">{value}</div>
    <div className="mt-1 text-sm text-black/60">{label}</div>
  </div>
);

const SectionTitle = ({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) => (
  <div className="mx-auto max-w-3xl text-center">
    {kicker ? (
      <div className="mb-3 flex items-center justify-center gap-2">
        <Pill>{kicker}</Pill>
      </div>
    ) : null}
    <h2 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">{title}</h2>
    {subtitle ? <p className="mt-3 text-sm leading-6 text-black/70 sm:text-base">{subtitle}</p> : null}
  </div>
);

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function DansantanWebsite() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!validateEmail(form.email)) e.email = "Please enter a valid email.";
    if (!form.message.trim()) e.message = "Please add a short message.";
    return e;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0;

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });
    if (!canSubmit) return;
    // Replace this mailto with your preferred form handler (e.g., Netlify forms, Formspree, Supabase, etc.)
    const subject = encodeURIComponent("DANSANTAN Website Enquiry");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:dansantancompany@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const nav = [
    { label: "Portfolio", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "Approach", href: "#approach" },
    { label: "Outcomes", href: "#outcomes" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-black/[0.03] text-black">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm overflow-hidden">
              {/* Place your logo file at /public/logo.png */}
              <img src="/logo.png" alt="DANSANTAN" className="h-full w-full object-cover" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">DANSANTAN</div>
              <div className="text-[11px] text-black/60">Holding company • Franchise investments • Advisory</div>
            </div>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-black/70 sm:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-black">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-95"
            >
              Book a call <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-black/[0.06] blur-3xl" />
          <div className="absolute -bottom-24 right-[-40px] h-72 w-72 rounded-full bg-black/[0.05] blur-3xl" />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                <Pill>Franchise investments</Pill>
                <Pill>Operator advisory</Pill>
                <Pill>Cash flow discipline</Pill>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                A holding company for franchise investments — with a hands-on operator advisory arm.
              </h1>
              <p className="mt-5 text-sm leading-6 text-black/70 sm:text-base">
                DANSANTAN is the holding company behind a portfolio of franchise investments. We also provide practical,
                experience-based advisory to franchisees and owner-managed businesses — focused on cash flow, unit economics,
                people systems, and store-level execution.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white shadow-sm hover:opacity-95 sm:w-auto"
                >
                  Get an assessment <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="#services"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-black/10 bg-white/70 px-5 py-3 text-sm font-medium text-black shadow-sm hover:bg-white sm:w-auto"
                >
                  See services
                </a>
              </div>
            </div>
          </FadeIn>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <FadeIn delay={0.05}>
              <Stat label="Focus" value="Owner returns + cash discipline" />
            </FadeIn>
            <FadeIn delay={0.1}>
              <Stat label="Style" value="Lean systems + accountability" />
            </FadeIn>
            <FadeIn delay={0.15}>
              <Stat label="Output" value="Measurable KPIs + governance" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="border-t border-black/5">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <FadeIn>
            <SectionTitle
              kicker="Portfolio"
              title="Franchise holdings"
              subtitle="DANSANTAN is the holding company behind investments across leading franchise brands."
            />
          </FadeIn>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FadeIn delay={0.05}>
              <Card title="VIDA e Caffè" icon={<BarChart3 className="h-5 w-5" />}>
                Coffee retail with a focus on unit economics, consistency, and store-level execution.
              </Card>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Card title="BOOTLEGGER" icon={<LineChart className="h-5 w-5" />}>
                Premium café operations built on experience, service rhythm, and disciplined controls.
              </Card>
            </FadeIn>
            <FadeIn delay={0.15}>
              <Card title="ULTRA Liquors" icon={<Coins className="h-5 w-5" />}>
                Liquor retail focused on stock flow, margin control, compliance, and cash conversion.
              </Card>
            </FadeIn>
          </div>

          <FadeIn delay={0.22}>
            <div className="mt-10 rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-base font-semibold tracking-tight">Want the portfolio section to be more specific?</h3>
                  <p className="mt-1 text-sm text-black/70">
                    We can add locations, store count, and a short investment thesis for each brand — or keep it high level.
                  </p>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white shadow-sm hover:opacity-95"
                >
                  Update portfolio details <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-black/5">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <FadeIn>
            <SectionTitle
              kicker="What we do"
              title="Services built for operators"
              subtitle="Pick a focused engagement, or combine them into a 90-day turnaround plan."
            />
          </FadeIn>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FadeIn delay={0.05}>
              <Card title="Cash Flow & Controls" icon={<Coins className="h-5 w-5" />}>
                Tighten payments, stock flow, and daily disciplines. Build a simple control framework that reduces
                leakage and surprises.
              </Card>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Card title="Unit Economics Review" icon={<BarChart3 className="h-5 w-5" />}>
                Understand your store-level profitability drivers. Identify the 20% changes that move EBITDA and
                owner return.
              </Card>
            </FadeIn>
            <FadeIn delay={0.15}>
              <Card title="Operations & SOPs" icon={<ClipboardCheck className="h-5 w-5" />}>
                Convert tribal knowledge into repeatable execution: checklists, shift routines, stock counts,
                wastage, and service standards.
              </Card>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Card title="Leadership & People Systems" icon={<Users className="h-5 w-5" />}>
                Coaching for managers on accountability, motivation, discipline, and culture — with practical tools
                and measurable expectations.
              </Card>
            </FadeIn>
            <FadeIn delay={0.25}>
              <Card title="Turnaround / 90-Day Plan" icon={<LineChart className="h-5 w-5" />}>
                A structured sprint: diagnose, prioritise, execute. Weekly scorecards, site visits or calls, and
                owner-level decision support.
              </Card>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Card title="Governance & Compliance" icon={<ShieldCheck className="h-5 w-5" />}>
                Simple, usable policies and routines that keep you compliant (without slowing the business).
              </Card>
            </FadeIn>
          </div>

          <FadeIn delay={0.35}>
            <div className="mt-10 rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-base font-semibold tracking-tight">Not sure where to start?</h3>
                  <p className="mt-1 text-sm text-black/70">
                    We’ll do a quick discovery and recommend the smallest set of actions that create momentum.
                  </p>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white shadow-sm hover:opacity-95"
                >
                  Book a 20-min call <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="border-t border-black/5">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <FadeIn>
            <SectionTitle
              kicker="How it works"
              title="A simple cadence that drives execution"
              subtitle="The goal isn’t a thick report. It’s consistent action, clear accountability, and measurable progress."
            />
          </FadeIn>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Diagnose",
                points: [
                  "Review P&L, bank and key store KPIs",
                  "Walk the operation (or do a video walkthrough)",
                  "Identify the 3–5 constraints holding performance back",
                ],
              },
              {
                step: "02",
                title: "Prioritise",
                points: [
                  "Choose high-leverage actions",
                  "Set targets + scorecards",
                  "Assign owners and deadlines",
                ],
              },
              {
                step: "03",
                title: "Execute",
                points: [
                  "Weekly check-ins (40–60 mins)",
                  "On-site support where needed",
                  "Tight feedback loop: measure → adjust",
                ],
              },
            ].map((s, idx) => (
              <FadeIn key={s.step} delay={0.06 * idx}>
                <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                  <div className="flex items-baseline justify-between">
                    <div className="text-xs font-semibold text-black/60">STEP {s.step}</div>
                    <CheckCircle2 className="h-5 w-5 text-black/30" />
                  </div>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">{s.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-black/70">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-black/40" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section id="outcomes" className="border-t border-black/5">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <FadeIn>
            <SectionTitle
              kicker="What changes"
              title="The outcomes we aim for"
              subtitle="Typical improvements we target in the first 30–90 days."
            />
          </FadeIn>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <FadeIn delay={0.08}>
              <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                <h3 className="text-base font-semibold">Financial clarity</h3>
                <ul className="mt-4 space-y-2 text-sm text-black/70">
                  {[
                    "Clean view of true gross margin and contribution",
                    "Cash flow rhythm: payments, creditors, and buffers",
                    "Spend discipline and approvals",
                  ].map((p) => (
                    <li key={p} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-black/40" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.16}>
              <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                <h3 className="text-base font-semibold">Operational control</h3>
                <ul className="mt-4 space-y-2 text-sm text-black/70">
                  {[
                    "Stock counts that actually reconcile",
                    "Reduced wastage and variances",
                    "Better rosters, better service, fewer fires",
                  ].map((p) => (
                    <li key={p} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-black/40" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.22}>
            <div className="mt-8 rounded-2xl border border-black/10 bg-black p-6 text-white shadow-sm">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-base font-semibold">Want a quick benchmark?</h3>
                  <p className="mt-1 text-sm text-white/75">
                    Share your latest P&L and we’ll highlight 3 focus areas to lift EBITDA and reduce cash strain.
                  </p>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black shadow-sm hover:opacity-95"
                >
                  Request a benchmark <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-black/5">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-5 lg:items-start">
            <div className="lg:col-span-2">
              <FadeIn>
                <SectionTitle
                  kicker="About DANSANTAN"
                  title="Operator-led, not theory-led"
                  subtitle="We work best with founders and managers who are ready to execute."
                />
              </FadeIn>
            </div>
            <div className="lg:col-span-3">
              <FadeIn delay={0.08}>
                <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                  <p className="text-sm leading-6 text-black/70">
                    DANSANTAN is a holding company behind franchise investments (VIDA, BOOTLEGGER, and ULTRA) with a small,
                    hands-on advisory arm. The work is practical: unit economics, cash flow controls, store-level operations,
                    and leadership systems that hold up under pressure.
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      "Experience-based mentorship",
                      "KPIs that managers can actually use",
                      "Strong focus on cash discipline",
                      "Lean systems, simple routines",
                    ].map((t) => (
                      <div key={t} className="flex items-start gap-2 text-sm text-black/70">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-black/40" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5">
                    <div className="text-xs font-semibold text-black/60">Good fit if you want:</div>
                    <div className="mt-3 grid gap-2 text-sm text-black/70">
                      {[
                        "A clear plan you can execute this week",
                        "Accountability that sticks",
                        "Better cash flow visibility and fewer surprises",
                      ].map((p) => (
                        <div key={p} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-black/40" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-black/5">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <FadeIn>
            <SectionTitle
              kicker="Contact"
              title="Let’s talk"
              subtitle="Send a note and we’ll come back with a recommended next step."
            />
          </FadeIn>

          <div className="mt-10 grid gap-6 lg:grid-cols-5">
            <FadeIn delay={0.08}>
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                  <h3 className="text-base font-semibold">Details</h3>
                  <div className="mt-4 space-y-3 text-sm text-black/70">
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-4 w-4 text-black/40" />
                      <div>
                        <div className="font-medium text-black">Email</div>
                        <div className="text-black/70">dansantancompany@gmail.com</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-4 w-4 text-black/40" />
                      <div>
                        <div className="font-medium text-black">Phone</div>
                        <div className="text-black/70">+27 (0)00 000 0000</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 text-black/40" />
                      <div>
                        <div className="font-medium text-black">Location</div>
                        <div className="text-black/70">South Africa</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5">
                    <div className="text-xs font-semibold text-black/60">Prefer WhatsApp?</div>
                    <p className="mt-2 text-sm text-black/70">
                      Add your number in the form and we’ll reply with a convenient time.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="lg:col-span-3">
                <form
                  onSubmit={onSubmit}
                  className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium text-black/70">Name</label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                        className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-black/30"
                        placeholder="Your name"
                      />
                      {touched.name && errors.name ? (
                        <div className="mt-1 text-xs text-black/60">{errors.name}</div>
                      ) : null}
                    </div>
                    <div>
                      <label className="text-xs font-medium text-black/70">Email</label>
                      <input
                        value={form.email}
                        onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                        className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-black/30"
                        placeholder="you@company.com"
                      />
                      {touched.email && errors.email ? (
                        <div className="mt-1 text-xs text-black/60">{errors.email}</div>
                      ) : null}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-medium text-black/70">Phone / WhatsApp (optional)</label>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                        className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-black/30"
                        placeholder="+27 ..."
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-medium text-black/70">Message</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                        onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                        rows={5}
                        className="mt-1 w-full resize-none rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-black/30"
                        placeholder="Tell us a bit about your business and what you want to improve."
                      />
                      {touched.message && errors.message ? (
                        <div className="mt-1 text-xs text-black/60">{errors.message}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="text-xs text-black/60">
                      By submitting, you agree we may contact you regarding this enquiry.
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white shadow-sm disabled:opacity-50"
                      disabled={!canSubmit}
                    >
                      Send enquiry <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>

                  {submitted ? (
                    <div className="mt-4 rounded-xl border border-black/10 bg-white p-3 text-sm text-black/70">
                      If your email app didn’t open, please email <span className="font-medium">dansantancompany@gmail.com</span>.
                    </div>
                  ) : null}
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-black/60 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} DANSANTAN. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-black" href="#portfolio">
              Portfolio
            </a>
            <a className="hover:text-black" href="#services">
              Services
            </a>
            <a className="hover:text-black" href="#contact">
              Contact
            </a>
            <a className="hover:text-black" href="#">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
