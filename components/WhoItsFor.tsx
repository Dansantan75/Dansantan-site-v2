export default function WhoItsFor() {
  return (
    <section
      id="who-its-for"
      className="relative scroll-mt-24 bg-neutral-50 text-neutral-900"
      aria-label="Who it’s for and who it’s not"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs tracking-wide text-neutral-700">
            WHO IT’S FOR
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            Clarity for the right operators — and an honest “no” for everyone else
          </h2>

          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            We work best with owners who value discipline, accountability, and execution. If
            that’s not you, this won’t be a fit — and that’s intentional.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold tracking-tight">This is for you if…</h3>

            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li>• You are an owner or principal, not a spectator</li>
              <li>• You care about unit economics, cash flow, and controls</li>
              <li>• You want clarity before growth</li>
              <li>• You’re willing to confront what isn’t working</li>
              <li>• You want decision support, not decision replacement</li>
              <li>• You’re building for durability, not a quick flip</li>
            </ul>

            <p className="mt-4 text-xs text-neutral-500">
              You value progress measured in outcomes — not activity.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold tracking-tight">This is not for you if…</h3>

            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li>• You’re looking for passive or hands-off returns</li>
              <li>• You want someone else to run the business</li>
              <li>• You expect guarantees, shortcuts, or quick wins</li>
              <li>• You prefer decks and theory over numbers</li>
              <li>• You avoid uncomfortable performance conversations</li>
              <li>• You want scale before discipline</li>
            </ul>

            <p className="mt-4 text-xs text-neutral-500">
              We don’t fix businesses by avoiding reality.
            </p>
          </div>
        </div>

        <div className="mt-10 max-w-2xl">
          <p className="text-sm text-neutral-600">
            This clarity protects everyone involved. It keeps the work honest, focused, and
            worth doing.
          </p>
        </div>
      </div>
    </section>
  );
}
