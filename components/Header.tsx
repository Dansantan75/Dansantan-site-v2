"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  { label: "How it works", href: "#how-it-works" },
  { label: "What we do", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Who it’s for", href: "#who-its-for" },
  { label: "Who we are", href: "#who-we-are" }
];

export default function Header() {
  const [logoOk, setLogoOk] = useState(true);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/85 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
              {logoOk ? (
                <Image
                  src="/logo.svg"
                  alt="DANSANTAN"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                  onError={() => setLogoOk(false)}
                  priority
                />
              ) : (
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
              )}
            </span>

            <span className="text-sm font-semibold tracking-wide text-neutral-900">
              DANSANTAN
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-neutral-900/90 transition hover:text-neutral-900"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/resources"
              className="text-sm font-medium text-neutral-900/90 transition hover:text-neutral-900"
            >
              Resources
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
