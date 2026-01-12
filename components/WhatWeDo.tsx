export default function WhatWeDo() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 bg-white text-neutral-900"
      aria-label="What we do"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs tracking-wide text-neutral-700">
            WHAT WE DO
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            Three ways we get involved — always grounded in execution
          </h2>

          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            We don’t force a single engagement model. How we participate depends on risk,
            complexity, and where value is actually created.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <h3 className="text-lg font-semibold">Invest</h3>
            <p className="mt-2 text-sm text-neutral-600">
              We invest where execution and economics align.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li>• Active owner-level involvement</li>
              <li>• Focus on cash flow and controls</li>
              <li>• Long-term operating value</li>
            </ul>

            <p className="mt-4 text-xs text-neutral-500">
              Not passive capital or financial speculation.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <h3 className="text-lg font-semibold">Advise</h3>
            <p className="mt-2 text-sm text-neutral-600">
              Operator-led advisory for owners who stay accountable.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li>• Unit economics &amp; cash flow clarity</li>
              <li>• Operating rhythm &amp; controls</li>
              <li>• Decision support, not delegation</li>
            </ul>

            <p className="mt-4 text-xs text-neutral-500">
              Not consulting decks or generic frameworks.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <h3 className="text-lg font-semibold">Operate</h3>
            <p className="mt-2 text-sm text-neutral-600">
              Direct operating involvement where execution risk is real.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li>• Embedded operating leadership</li>
              <li>• Process &amp; control implementation</li>
              <li>• Stability and transition planning</li>
            </ul>

            <p className="mt-4 text-xs text-neutral-500">
              Not permanent management replacement.
            </p>
          </div>
        </div>

        <div className="mt-10 max-w-2xl">
          <p className="text-sm text-neutral-600">
            Each mode is deliberate. We choose the lightest structure that still produces real
            outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}
