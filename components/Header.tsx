import Link from "next/link";

const chips = [
  { label: "Franchise Investments", href: "#services" },
  { label: "Angel Investing", href: "#services" },
  { label: "Operator Advisory", href: "#services" }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 bg-white shadow-sm">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z"
                  stroke="currentColor"
                  className="text-neutral-900"
                  strokeWidth="1.6"
                />
                <path
                  d="M8.5 10.5h7M8.5 13.5h7"
                  stroke="currentColor"
                  className="text-neutral-900"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <span className="text-sm font-semibold tracking-wide text-neutral-900">
              DANSANTAN
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <a
              href="#how-it-works"
              className="text-sm text-neutral-700 transition hover:text-neutral-900"
            >
              How it works
            </a>

            <Link
              href="/resources"
              className="text-sm text-neutral-700 transition hover:text-neutral-900"
            >
              Resources
            </Link>
          </nav>
        </div>

        <div className="pb-3">
          <div className="flex flex-wrap gap-2">
            {chips.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700 shadow-sm transition hover:bg-neutral-50 hover:text-neutral-900"
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
