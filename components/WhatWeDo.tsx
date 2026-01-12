export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="scroll-mt-24 bg-white py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
            What We Do
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Operator-led investment, advisory, and portfolio performance support.
          </h2>
        </div>
        <div className="grid gap-6 text-sm text-neutral-600 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-neutral-900">Franchise Investments</h3>
            <p className="mt-2 leading-6">
              We deploy capital with a focus on disciplined execution, unit economics, and
              operational cadence.
            </p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-neutral-900">Operator Advisory</h3>
            <p className="mt-2 leading-6">
              We guide owner-operators to tighten systems, elevate governance, and drive margin
              performance.
            </p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-neutral-900">Portfolio Performance</h3>
            <p className="mt-2 leading-6">
              We stay close to operators to improve compliance, people performance, and growth
              outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
