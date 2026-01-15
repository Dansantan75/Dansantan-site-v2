import Link from "next/link";
import HowItWorks from "@/components/HowItWorks";
import WhoItsFor from "@/components/WhoItsFor";
import WhoWeAre from "@/components/WhoWeAre";
import WhatWeDo from "@/components/WhatWeDo";

const chips = ["Franchise Investments", "Angel Investing", "Operator Advisory"];

const authorityItems = [
  { name: "VIDA e Caffè", desc: "Coffee retail & unit economics" },
  { name: "BOOTLEGGER", desc: "Café operations & service rhythm" },
  { name: "ULTRA Liquors", desc: "Stock flow, margin & compliance" },
  { name: "SPAR Group", desc: "Grocery and liquor retail, distribution & governance" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-black/[0.03] text-black">
      {/* HERO */}
      <section className="relative">
        {/* Watermark (centered behind heading/subheading, fades right) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[28%] top-6 z-0 -translate-x-1/2 opacity-[0.1] md:top-10">
            {/* NOTE: Uses public/logo.png */}
            <img
              src="/logo.png"
              alt=""
              className="h-[680px] w-[680px] select-none object-contain sm:h-[640px] sm:w-[640px] md:h-[720px] md:w-[720px]"
            />
          </div>

          {/* subtle fade so watermark doesn’t fight the copy */}
          <div className="absolute inset-y-0 left-[45%] w-[55%] bg-gradient-to-r from-transparent via-white/70 to-white md:left-[50%] md:w-[50%]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            {/* LEFT: copy */}
            <div>
              {/* Chips */}
              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                {chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-black/20 bg-white/70 px-3 py-1 text-xs font-medium text-black/70 shadow-sm backdrop-blur"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Headline */}
              <h1 className="mt-6 text-[40px] font-semibold leading-[1.02] tracking-tight sm:text-6xl">
                An owner-operator
                <br />
                franchise investment
                <br />
                holding company
                <br />
                built on execution — not
                <br />
                theory.
              </h1>

              {/* Subheading */}
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-black/70 sm:text-base">
                <p>
                  <span className="font-semibold text-black">
                    DANSANTAN is an owner-operator led franchise investment holding company.
                  </span>{" "}
                  We’re built by operators who have spent decades inside franchised businesses —
                  living the gap between strategy on paper and execution on the floor.
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/sanity-check"
                  className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black/20"
                >
                  Run a Free Sanity Check →
                </Link>

                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-semibold text-black/80 shadow-sm transition hover:bg-black/[0.03] focus:outline-none focus:ring-2 focus:ring-black/10"
                >
                  See services
                </a>
              </div>
            </div>

            {/* RIGHT: authority block */}
            <div className="lg:pt-2">
              <div className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm backdrop-blur">
                <h3 className="text-base font-semibold tracking-tight">
                  Holding &amp; Operating Leadership
                </h3>

                <div className="mt-3 space-y-3 text-sm leading-6 text-black/65">
                  <p>
                    We’ve built and operated across Grocery Retail and Liquor, Coffee and Café, —
                    inside Franchised Environments where margins, stock flow, people, and compliance
                    matter daily, as well as corporate Wholesale and Distribution scaling
                    Independent Retailers in one of South Africas biggest listed Supermarket Chains.
                  </p>
                  <p>
                    Our experience shapes how we invest, operate, and advise: focusing on disciplined
                    execution, tighter unit economics, and simple operating systems that work under
                    real world pressure.
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  {authorityItems.map((it) => (
                    <div
                      key={it.name}
                      className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-3"
                    >
                      <div>
                        <div className="text-sm font-semibold tracking-tight">{it.name}</div>
                        <div className="text-xs text-black/55">{it.desc}</div>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-black/20" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anchor targets for nav/CTAs */}
      <HowItWorks />
      <WhatWeDo />
      <WhoItsFor />
      <WhoWeAre />
      <section id="services" className="scroll-mt-24" aria-hidden="true" />
    </div>
  );
}
