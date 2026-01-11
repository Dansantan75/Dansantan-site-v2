"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";

const navItems = [
  { label: "How it works", href: "#how-it-works" },
  { label: "What we do", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Who it’s for", href: "#who-its-for" },
  { label: "Who we are", href: "#who-we-are" }
];

const logoCandidates = ["/logo.svg", "/logo.png", "/logo-mark.svg"];

export default function Header() {
  const [idx, setIdx] = useState(0);
  const logoSrc = useMemo(() => logoCandidates[idx] ?? null, [idx]);

  const phone = "27824988638";
  const text = encodeURIComponent("Hi Mario — I’d like to start a conversation.");
  const waHref = `https://wa.me/${phone}?text=${text}`;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/85 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
              {logoSrc ? (
                <Image
                  src={logoSrc}
                  alt="DANSANTAN"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                  onError={() => setIdx((v) => v + 1)}
                  priority
                />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-wide text-neutral-900">DANSANTAN</span>
              <span className="text-[12px] text-neutral-500">People. Purpose. Performance.</span>
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

          <div className="flex items-center gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:brightness-95 active:brightness-90"
              aria-label="Contact us on WhatsApp"
              title="Contact us on WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.52 3.48A11.82 11.82 0 0012.06 0C5.5.02.17 5.35.18 11.93c0 2.1.56 4.15 1.63 5.95L0 24l6.3-1.73a11.9 11.9 0 005.75 1.47h.01c6.57 0 11.9-5.33 11.92-11.9a11.84 11.84 0 00-3.46-8.36zM12.06 21.3h-.01a9.9 9.9 0 01-5.04-1.38l-.36-.22-3.74 1.03 1-3.64-.24-.38a9.88 9.88 0 01-1.52-5.27C2.16 6.46 6.56 2.06 12.06 2.04c2.63 0 5.1 1.02 6.96 2.88a9.79 9.79 0 012.9 6.97c-.02 5.5-4.42 9.91-9.86 9.91zm5.44-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35z" />
              </svg>
              WhatsApp
            </a>

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
