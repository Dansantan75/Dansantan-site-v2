import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="text-sm font-semibold tracking-wide text-neutral-100"
        >
          DANSANTAN
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <a
            href="#how-it-works"
            className="text-sm text-neutral-300 transition hover:text-neutral-50"
          >
            How it works
          </a>

          <Link
            href="/resources"
            className="text-sm text-neutral-300 transition hover:text-neutral-50"
          >
            Resources
          </Link>
        </nav>
      </div>
    </header>
  );
}
