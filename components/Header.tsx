import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-6 py-4 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 text-black">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-black/90 text-white">
              <svg
                viewBox="0 0 32 32"
                width="18"
                height="18"
                aria-hidden="true"
                className="fill-current"
              >
                <path d="M16 3l10.5 18H5.5L16 3zm0 7.2L12.2 17h7.6L16 10.2z" />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-wide">DANSANTAN</span>
          </Link>

          <nav className="flex items-center gap-6">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-black transition hover:text-black/70"
            >
              How it works
            </a>
            <Link
              href="/resources"
              className="text-sm font-medium text-black transition hover:text-black/70"
            >
              Resources
            </Link>
          </nav>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {["Franchise Investments", "Angel Investing", "Operator Advisory"].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-medium text-black/80 shadow-sm"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
