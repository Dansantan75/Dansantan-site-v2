"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
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
  Menu,
  X
} from "lucide-react";

const FadeIn = ({
  children,
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
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
  children
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

const SectionTitle = ({
  kicker,
  title,
  subtitle
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
    {subtitle ? (
      <p className="mt-3 text-sm leading-6 text-black/70 sm:text-base">{subtitle}</p>
    ) : null}
  </div>
);

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function DansantanWebsite() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submissionState, setSubmissionState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [submissionError, setSubmissionError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!validateEmail(form.email)) e.email = "Please enter a valid email.";
    if (!form.message.trim()) e.message = "Please add a short message.";
    return e;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0;

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });
    if (!canSubmit || submissionState === "loading") return;

    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("email", form.email.trim());
    formData.append("phone", form.phone.trim());
    formData.append("message", form.message.trim());
    formData.append("_subject", "New DANSANTAN website enquiry");
    formData.append("_template", "table");
    formData.append("_captcha", "false");

    setSubmissionState("loading");
    setSubmissionError("");

    try {
      const response = await fetch("https://formspree.io/f/meeqvwwp", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData
      });

      if (!response.ok) {
        throw new Error("We couldn’t send your message. Please try again.");
      }

      setSubmissionState("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      setTouched({});
    } catch (error) {
      console.error(error);
      setSubmissionState("error");
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "We couldn’t send your message. Please try again or email dansantancompany@gmail.com."
      );
    }
  };

  const resetSubmissionFeedback = () => {
    if (submissionState !== "idle") {
      setSubmissionState("idle");
      setSubmissionError("");
    }
  };

  const whatsappMessage =
    "Hi Mario, I’m on the DANSANTAN site. I’d like to start a conversation about my business. We’re struggling with ____";
  const whatsappLink = `https://wa.me/27824988638?text=${encodeURIComponent(whatsappMessage)}`;

  const nav = [
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "Approach", href: "#approach" },
    { label: "Outcomes", href: "#outcomes" },
    { label: "Insights", href: "#insights" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-black/[0.03] text-black">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
              <img src="/logo.png" alt="DANSANTAN logo" className="h-full w-full object-cover" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">DANSANTAN</div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-black/60">
                <span>PEOPLE</span>
                <span className="h-3 w-px bg-black/20" />
                <span>PURPOSE</span>
                <span className="h-3 w-px bg-black/20" />
                <span>PERFORMANCE</span>
              </div>
            </div>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-black/70 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-black">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={whatsappLink}
              className="inline-flex items-center justify-center rounded-xl border border-[#128C7E] bg-[#25D366] px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:brightness-95"
              target="_blank"
              rel="noreferrer"
            >
              Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white p-2 text-black shadow-sm md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileOpen ? (
          <div className="border-t border-black/5 bg-white/90 backdrop-blur md:hidden">
            <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
              <div className="grid gap-3 text-sm text-black/80">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-[#128C7E] bg-[#25D366] px-3 py-2 font-semibold text-black shadow-sm"
                >
                  Start a Conversation
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-black/[0.06] blur-3xl" />
          <div className="absolute -bottom-24 right-[-40px] h-72 w-72 rounded-full bg-black/[0.05] blur-3xl" />
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
          <img
            src="/logo.png"
            alt="DANSANTAN watermark"
            className="max-h-[520px] max-w-[520px] object-contain blur-[0.5px]"
            aria-hidden="true"
          />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                <Pill>Franchise investments</Pill>
                <Pill>Angel investor</Pill>
                <Pill>Operator advisory</Pill>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                Strategy doesn’t fail. Execution does.
              </h1>
              <p className="mt-5 text-sm leading-6 text-black/70 sm:text-base">
                DANSANTAN is an operator-led holding company built in franchising. We back portfolio
                brands and work with franchisees to translate strategy into store-level execution:
                people, purpose, performance — with numbers that hold up under pressure.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/sanity-check"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:opacity-95 sm:w-auto"
                >
                  Run a Sanity Check <ArrowRight className="ml-2 h-4 w-4" />
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
            {[
              {
                title: "Owner returns + cash discipline",
                body: "Not “more sales” — more cash that actually lands."
              },
              {
                title: "Lean systems + accountability",
                body: "Simple routines your managers can run without you."
              },
              {
                title: "Measurable KPIs + governance",
                body: "Scorecards that catch problems early — before the bank does."
              }
            ].map((item, idx) => (
              <FadeIn key={item.title} delay={0.05 * (idx + 1)}>
                <div className="rounded-2xl border border-black/10 bg-white/70 p-5 text-left shadow-sm backdrop-blur">
                  <h3 className="text-base font-semibold text-black">{item.title}</h3>
                  <p className="mt-2 text-sm text-black/70">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

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
              <Card
                title="VIDA e Caffè"
                icon={
                  <div className="flex h-10 w-16 items-center justify-center rounded-lg bg-[#e4002b] text-xs font-semibold text-white">
                    VIDA
                  </div>
                }
              >
                Coffee retail with a focus on unit economics, rhythm, and store-level execution.
              </Card>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Card
                title="BOOTLEGGER"
                icon={
                  <div className="flex h-10 w-24 items-center justify-center rounded-lg bg-black text-xs font-semibold text-white">
                    BOOTLEGGER
                  </div>
                }
              >
                Premium café operations built on experience, service rhythm, and disciplined controls.
              </Card>
            </FadeIn>
            <FadeIn delay={0.15}>
              <Card
                title="ULTRA Liquors"
                icon={
                  <div className="flex h-10 w-20 items-center justify-center rounded-lg bg-[#0d3b66] text-xs font-semibold text-white">
                    ULTRA
                  </div>
                }
              >
                Liquor retail focused on stock flow, margin control, compliance, and cash conversion.
              </Card>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Card
                title="SPAR (Operating leadership)"
                icon={
                  <div className="flex h-10 w-16 items-center justify-center rounded-lg bg-[#007d32] text-xs font-semibold text-white">
                    SPAR
                  </div>
                }
              >
                30+ years of operating leadership across local and international SPAR stores and distribution — with guild
                chair exposure where discipline, stock flow, and execution are non-negotiable.
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

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
            {[
              {
                title: "Cash Flow & Controls",
                icon: <Coins className="h-5 w-5" />,
                body: "Daily discipline around payables, cash buffers, and approvals that stop leakage.",
                pills: ["Cash buffers", "Payables rhythm", "Approvals"]
              },
              {
                title: "Stock + Margin Control (Operator Grade)",
                icon: <BarChart3 className="h-5 w-5" />,
                body: "Ordering, par levels, variance management, and guardrails for margin and shrink.",
                pills: ["Par levels", "Variance", "Supplier discipline"]
              },
              {
                title: "Unit Economics Review",
                icon: <LineChart className="h-5 w-5" />,
                body: "Identify the 20% of levers that move EBITDA, cash conversion, and owner return.",
                pills: ["20% levers", "Owner returns", "Scorecards"]
              },
              {
                title: "Operations & SOPs",
                icon: <ClipboardCheck className="h-5 w-5" />,
                body: "Runbooks, checklists, shift routines, and controls managers can actually follow.",
                pills: ["Shift routines", "Checklists", "Manager-ready"]
              },
              {
                title: "Leadership & People Systems",
                icon: <Users className="h-5 w-5" />,
                body: "Accountability, coaching, and performance rhythms that don’t need you in the store.",
                pills: ["Accountability", "Coaching", "Cadence"]
              },
              {
                title: "90-Day Turnaround Sprint",
                icon: <LineChart className="h-5 w-5" />,
                body: "Diagnose, prioritise, execute. Weekly scorecards, owner-level decision support, and field time.",
                pills: ["Diagnose", "Prioritise", "Execute"]
              },
              {
                title: "Franchisee–Franchisor Translation (optional)",
                icon: <ShieldCheck className="h-5 w-5" />,
                body: "Bridge expectations, data, and reality between the franchisor playbook and store constraints.",
                pills: ["Data translation", "Expectations", "Guardrails"]
              },
              {
                title: "Governance & Compliance (Practical)",
                icon: <ShieldCheck className="h-5 w-5" />,
                body: "Simple policies and controls that keep you compliant without slowing the operation.",
                pills: ["Policies", "Audit ready", "Practical controls"]
              }
            ].map((item, idx) => (
              <FadeIn key={item.title} delay={0.05 * (idx + 1)}>
                <Card title={item.title} icon={item.icon}>
                  <p>{item.body}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.pills.map((pill) => (
                      <Pill key={pill}>{pill}</Pill>
                    ))}
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.35}>
            <div className="mt-10 rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-base font-semibold tracking-tight">Not sure where to start?</h3>
                  <p className="mt-1 text-sm text-black/70">
                    Run a quick sanity check to see where execution is slipping, then pick the right engagement.
                  </p>
                </div>
                <a
                  href="/sanity-check"
                  className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:opacity-95"
                >
                  Run a Sanity Check <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="insights" className="border-t border-black/5">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <FadeIn>
            <SectionTitle
              title="Insights to challenge convention"
              subtitle="Leadership perspectives on the future of franchise."
            />
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "GP is the invitation. Cash flow is the commitment.",
                image: "/images/cashflow-vs-gp.png",
                href: "/insights/gp-is-the-invitation.docx"
              },
              {
                title: "Franchising has a customer problem (and it’s not the one you think).",
                image: "/images/whose-customer.png",
                href: "/insights/whose-customer-is-whose.docx"
              }
            ].map((post, idx) => (
              <FadeIn key={post.title} delay={0.06 * idx}>
                <a
                  href={post.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/70 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
                  download
                >
                  <div className="relative h-40 w-full overflow-hidden bg-black/5">
                    <img src={post.image} alt={post.title} className="h-full w-full object-contain" />
                  </div>
                  <div className="p-4 text-center text-sm font-semibold text-black group-hover:text-black/80">
                    {post.title}
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-3">
            <div className="text-sm text-black/70">Follow on LinkedIn for new operator notes.</div>
            <a
              href="https://www.linkedin.com/in/mario-santana-dansantan/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:bg-black hover:text-white"
            >
              Follow on LinkedIn → mario-santana-dansantan
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-black/5">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <FadeIn>
            <SectionTitle
              kicker="Contact"
              title="Let’s talk"
              subtitle="Send a note and we’ll come back with a recommended next step."
            />
          </FadeIn>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <FadeIn delay={0.08}>
              <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                <h3 className="text-base font-semibold">Details</h3>

                <div className="mt-4 space-y-3 text-sm text-black/70">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-black/40" />
                    <div>
                      <div className="font-medium text-black">Email</div>
                      <div className="text-black/70">mario@dansantan.com</div>
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
                    Add your number in the form and we’ll reply with a convenient time. WhatsApp is
                    optional — email works too.
                  </p>
                </div>

                <div className="mt-5 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black/70">
                  Thanks for reaching out. We’ll reply from{" "}
                  <span className="font-medium">mario@dansantan.com</span> with next steps.
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <form
                className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur"
                onSubmit={handleSubmit}
                onChange={resetSubmissionFeedback}
              >
                <h3 className="text-base font-semibold">Send a message</h3>
                <div className="mt-4 grid gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  />
                  <input
                    type="text"
                    placeholder="Phone (optional)"
                    className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
                    value={form.phone}
                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                  <textarea
                    placeholder="Message"
                    className="min-h-[120px] rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  />
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submissionState === "loading" ? "Sending..." : "Send message"}
                  </button>
                  {submissionState === "error" ? (
                    <p className="text-sm text-red-600">{submissionError}</p>
                  ) : null}
                  {submissionState === "success" ? (
                    <p className="text-sm text-green-600">Thanks! We’ll be in touch shortly.</p>
                  ) : null}
                </div>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
