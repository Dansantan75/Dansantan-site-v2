"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "How it works", href: "#how-it-works" },
  { label: "What we do", href: "#services" },
  { label: "Who it’s for", href: "#who-its-for" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" }
];

export default function Header() {
  const [logoMissing, setLogoMissing] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
        <Link href="/" className="flex items-center gap-3 text-neutral-900">
          {logoMissing ? (
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
          ) : (
            <img
              src="/logo.svg"
              alt="DANSANTAN logo"
              className="h-9 w-9"
              onError={() => setLogoMissing(true)}
            />
          )}
          <span className="text-sm font-semibold tracking-wide">DANSANTAN</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-900 transition hover:text-neutral-600"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
