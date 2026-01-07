import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-black/10 bg-white"
    >
      {/* Logo watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="relative h-[520px] w-[520px] opacity-[0.08] sm:h-[640px] sm:w-[640px]">
          <Image src="/logo.png" alt="" fill className="object-contain" priority />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* LEFT: Narrative */}
          <div className="lg:col-span-7">
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {["Franchise Investments", "Angel Investing", "Operator Advisory"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-black/70 shadow-sm"
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-black sm:text-5xl">
              An owner-operator franchise investment holding company
              <br />
              built on execution — not theory.
            </h1>

            {/* Subheading */}
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-black/70 sm:text-lg">
              <p>
                <strong className="font-semibold text-black/80">
                  DANSANTAN is an owner-operator led franchise investment holding company.
                </strong>{" "}
                We’re built by operators who have spent decades inside franchised businesses —
                living the gap between strategy on paper and execution on the floor.
              </p>
              <p>
                That experience shapes how we invest, operate, and advise: focusing on disciplined
                execution, tighter unit economics, and simple operating systems that work under
                real-world pressure.
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sanity-check"
                className="inline-flex w-full items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-black/90 sm:w-auto"
              >
                Run a Free Sanity Check →
              </Link>

              <Link
                href="#services"
                className="inline-flex w-full items-center justify-center rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-black/80 shadow-sm transition hover:border-black/25 hover:text-black sm:w-auto"
              >
                See services
              </Link>
            </div>
          </div>

          {/* RIGHT: Authority Block */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-black">Holdings & operating leadership</div>

              <p className="mt-3 text-sm leading-relaxed text-black/65">
                We’ve built and operated across coffee, café, liquor, and grocery retail — inside
                franchised environments where margins, stock flow, people, and compliance matter
                daily.
              </p>

              <p className="mt-3 text-sm leading-relaxed text-black/65">
                Our experience spans both owner-operated businesses and senior operating leadership
                within large franchise systems, shaping a practical, execution-first approach to
                investment and advisory work.
              </p>

              {/* Experience rows */}
              <div className="mt-5 space-y-2">
                {[
                  { name: "VIDA e Caffè", note: "Coffee retail & unit economics" },
                  { name: "BOOTLEGGER", note: "Café operations & service rhythm" },
                  { name: "ULTRA Liquors", note: "Stock flow, margin & compliance" },
                  { name: "SPAR Group", note: "Grocery retail, distribution & franchise governance" }
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3"
                  >
                    <div>
                      <div className="text-sm font-semibold text-black/90">{item.name}</div>
                      <div className="text-xs text-black/55">{item.note}</div>
                    </div>
                    <div className="text-xs font-semibold text-black/30">●</div>
                  </div>
                ))}
              </div>

              {/* Micro-proof */}
              <div className="mt-6 rounded-2xl bg-black px-4 py-3">
                <div className="text-xs font-semibold text-white/90">
                  Typical 30–90 day outcomes
                </div>
                <div className="mt-2 space-y-1 text-xs text-white/70">
                  <div>• True GP and contribution clarity</div>
                  <div>• Stock variance under control</div>
                  <div>• Simple scorecards owners can act on</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
