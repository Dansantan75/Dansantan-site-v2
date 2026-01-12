export default function WhoWeAre() {
  return (
    <section
      id="who-we-are"
      className="relative scroll-mt-24 bg-neutral-50 text-neutral-900"
      aria-label="Who we are"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs tracking-wide text-neutral-700">
            WHO WE ARE
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            Built by an operator — sustained by execution
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-8 space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
              <p className="text-base font-medium text-neutral-900">
                I didn’t choose retail — it chose me.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                I grew up inside operating environments where the smell of fresh bread at sunrise
                mattered just as much as the numbers at close of trade. Where people, process, and
                pressure intersected every day.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-neutral-900">The classroom</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                For nearly three decades, retail was my classroom. From the shop floor to leading
                national strategy at{" "}
                <span className="font-medium text-neutral-900">SPAR Group</span>, I learned how real
                businesses work — and why many fail.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                I’ve turned struggling stores around, built teams that cared, and learned to
                measure success in more than just margin.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-neutral-900">Proof points</h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Mr SPAR (2013)",
                  "SPAR: Mauritius & India",
                  "EUROSPAR turnaround: Ireland",
                  "National Executive Committee"
                ].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-neutral-700">
                These weren’t highlights on a CV — they were operating lessons earned under
                pressure inside a listed retail environment.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-neutral-900">The pivot</h3>

              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                And then I walked away. Not because I was done — but because I wanted to test
                everything I had learned with my own capital, my own people, and my own risk.
              </p>

              <div className="mt-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <p className="text-sm text-neutral-800">
                  That decision is what shaped{" "}
                  <span className="font-semibold text-neutral-900">DANSANTAN</span>.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-900 px-7 py-6 text-neutral-50 shadow-sm">
              <p className="text-sm leading-relaxed text-neutral-200">
                We don’t bring theory to operators.
              </p>
              <p className="mt-1 text-base font-semibold">
                We bring judgement shaped by responsibility.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-neutral-900">Today</h3>

              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                Today, <span className="font-medium text-neutral-900">we</span> build, own, and
                operate businesses across grocery retail, liquor, and franchised café environments.
              </p>

              <p className="mt-4 text-sm text-neutral-700">We live with:</p>

              <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                <li>• Tight margins and working capital pressure</li>
                <li>• The reality of managing people, not structures</li>
                <li>• Daily operational decisions that compound over time</li>
                <li>• Compliance, governance, and accountability that can’t be outsourced</li>
              </ul>

              <p className="mt-4 text-sm leading-relaxed text-neutral-700">
                We’ve achieved consistent growth — but growth isn’t the point. What matters is
                building businesses that hold under pressure, develop people into leaders, and
                create places customers trust and communities support.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-neutral-700">
                Retail reflects the effort, care, and courage of the people behind it. That’s why
                we show up every day — to build, to lead, to grow, and to leave things stronger
                than we found them.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 space-y-6 md:pt-2">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-neutral-900">
                What this means in practice
              </h3>

              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                <li>• We prioritise cash flow before complexity</li>
                <li>• We prefer simple systems that hold under pressure</li>
                <li>• We stay close to operations and decision-making</li>
                <li>• We respect accountability — because we carry it</li>
              </ul>

              <p className="mt-4 text-xs text-neutral-500">
                Experience doesn’t guarantee outcomes — but it improves judgement.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-neutral-900">
                How we show up
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                <li>• Operator-led, not advisory at a distance</li>
                <li>• Discipline before expansion</li>
                <li>• Data anchored to real-world cadence</li>
                <li>• Actionable clarity, not complexity</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-neutral-900">
                Principles we don’t compromise
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                <li>• Accountability over ego</li>
                <li>• Operators first</li>
                <li>• Integrity in numbers</li>
                <li>• People and process together</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
