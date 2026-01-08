import Header from "@/components/site/Header";
import Link from "next/link";

const chips = ["Franchise Investments", "Angel Investing", "Operator Advisory"];

const authorityItems = [
  { name: "VIDA e Caffè", desc: "Coffee retail & unit economics" },
  { name: "BOOTLEGGER", desc: "Café operations & service rhythm" },
  { name: "ULTRA Liquors", desc: "Stock flow, margin & compliance" },
  { name: "SPAR Group", desc: "Grocery and liquor retail, distribution & governance" }
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-black/[0.03] text-black">
      <Header />

      {/* HERO */}
      <section className="relative">
        {/* Watermark (left aligned behind heading/subheading) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute left-[-140px] top-12 z-0 opacity-[0.1] md:left-[-120px]">
            {/* NOTE: Uses public/logo.png */}
            <img
              src="/logo.png"
              alt=""
              className="h-[520px] w-[520px] select-none object-contain md:h-[620px] md:w-[620px]"
            />
          </div>

          {/* subtle fade so watermark doesn’t fight the copy */}
          <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-white via-white/70 to-transparent md:w-[40%]" />
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

              {/* Subheading (extended, no “warts and all” here) */}
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
                {/* Primary */}
                <Link
                  href="/sanity-check"
                  className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black/20"
                >
                  Run a Free Sanity Check →
                </Link>

                {/* Secondary */}
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

                {/* Removed: “Typical 30–90 day outcomes” block (per your instruction) */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anchor targets for nav/CTAs */}
      <div id="services" />
    </div>
  );
}
