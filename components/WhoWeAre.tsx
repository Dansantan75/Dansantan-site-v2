export default function WhoWeAre() {
  return (
    <section
      id="who-we-are"
      className="relative scroll-mt-24 bg-white text-neutral-900"
      aria-label="Who we are"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs tracking-wide text-neutral-700">
            WHO WE ARE
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            Built by an operator — sustained by execution
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
              <p className="text-base font-medium text-neutral-900">
                I didn’t choose retail — it chose me.
              </p>

              <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-700">
                <p>
                  I grew up inside operating environments where the smell of fresh bread at sunrise
                  mattered just as much as the numbers at close of trade — where people, process,
                  and pressure intersect every day.
                </p>

                <p>
                  For nearly three decades, retail was my classroom. From the shop floor to leading
                  national strategy at{" "}
                  <span className="font-medium text-neutral-900">SPAR Group</span>, I learned how
                  real businesses work — and why many fail.
                </p>

                <p>
                  I’ve turned struggling stores around, built teams that cared, and learned to
                  measure success in more than just margin. Along the way, I had the privilege of
                  serving as <span className="font-medium text-neutral-900">Mr SPAR (2013)</span>,
                  helping launch SPAR in{" "}
                  <span className="font-medium text-neutral-900">Mauritius and India</span>, turning
                  around the{" "}
                  <span className="font-medium text-neutral-900">EUROSPAR format in Ireland</span>,
                  and serving on the{" "}
                  <span className="font-medium text-neutral-900">
                    National Executive Committee
                  </span>{" "}
                  of a JSE-listed retailer.
                </p>

                <p>
                  And then I walked away — not because I was done, but because I wanted to test
                  everything I had learned with my own capital, my own people, and my own risk.
                </p>
              </div>

              <div className="mt-6 border-t border-neutral-200 pt-5">
                <p className="font-script text-2xl leading-none text-neutral-900">Mario Santana</p>
                <p className="text-xs text-neutral-600">Founder — DANSANTAN</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-7 shadow-sm">
              <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
                What operators can expect from us
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                DANSANTAN exists to bring experienced judgement into the moments that matter: when
                margins tighten, cash flow gets strained, people issues surface, and decisions
                can’t wait for perfect information.
              </p>

              <div className="mt-5 space-y-3 text-sm text-neutral-700">
                <div className="flex gap-3">
                  <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 bg-white text-[11px] font-semibold text-neutral-900">
                    1
                  </span>
                  <p>
                    <span className="font-medium text-neutral-900">Commercial clarity:</span> unit
                    economics, margin levers, and working capital — made simple and decision-ready.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 bg-white text-[11px] font-semibold text-neutral-900">
                    2
                  </span>
                  <p>
                    <span className="font-medium text-neutral-900">Operating discipline:</span>{" "}
                    rhythms, controls, and standards that hold under real-world pressure.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 bg-white text-[11px] font-semibold text-neutral-900">
                    3
                  </span>
                  <p>
                    <span className="font-medium text-neutral-900">People performance:</span> clear
                    accountability, practical leadership, and a culture that keeps execution
                    consistent.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5">
                <p className="text-sm text-neutral-800">
                  We don’t bring theory to operators.{" "}
                  <span className="font-semibold text-neutral-900">
                    We bring judgement shaped by responsibility.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-sm font-semibold tracking-wide text-neutral-900">
            How that shows up through DANSANTAN
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-700">
            Today, we build, own, and operate businesses where margins are tight, people matter,
            and decisions compound daily.
          </p>

          <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-10 md:px-10 md:py-12">
            <div className="mx-auto max-w-4xl">
              <p className="text-center text-lg font-semibold italic tracking-tight text-neutral-900 md:text-xl">
                “Experience doesn’t guarantee outcomes, but it does improve judgement.”
              </p>

              <div className="mt-4 flex justify-center">
                <p className="font-script text-xl leading-none text-neutral-900 md:text-2xl">
                  Mario Santana
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
