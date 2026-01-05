/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "How it works", href: "#how-it-works" },
  { label: "What we do", href: "#services" },
  { label: "Who it’s for", href: "#who-its-for" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  const whatsappUrl = useMemo(() => {
    const message =
      "Hi Mario, I’m on the DANSANTAN site. I’d like to start a conversation about my business. We’re struggling with ____";
    return `https://wa.me/27824988638?text=${encodeURIComponent(message)}`;
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center gap-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full ring-1 ring-black/5 shadow-sm sm:h-12 sm:w-12 lg:h-12 lg:w-12">
              <img src="/logo.png" alt="DANSANTAN logo" className="h-full w-full object-cover" />
            </div>
            <div className="leading-tight">
              <div className="text-base font-semibold tracking-tight text-black sm:text-lg">DANSANTAN</div>
              <div className="mt-1 text-[11px] font-normal tracking-[0.18em] text-black/60 sm:text-xs">
                People · Purpose · Performance
              </div>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-7 text-sm font-medium text-black/75 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-black hover:underline hover:underline-offset-8"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/sanity-check"
              className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-95 sm:px-5"
            >
              Run a Sanity Check
            </Link>
            <a
              href={whatsappUrl}
              aria-label="WhatsApp"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-black/70 transition hover:text-black lg:inline-flex"
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">Start a conversation on WhatsApp</span>
              <img src="/icons/whatsapp.svg" alt="" className="h-5 w-5" />
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black/80 transition hover:border-black/20 lg:hidden"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setOpen((state) => !state)}
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-black/5 pb-4 pt-3 lg:hidden">
            <nav className="flex flex-col gap-3 text-sm text-black/80">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-2 py-2 transition hover:bg-black/[0.04] hover:text-black"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="my-2 h-px bg-black/10" />
              <a
                href={whatsappUrl}
                aria-label="WhatsApp"
                className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-black transition hover:bg-black/[0.04]"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                <img src="/icons/whatsapp.svg" alt="" className="h-5 w-5" />
                <span>Start a conversation (WhatsApp)</span>
              </a>
              <Link
                href="/sanity-check"
                className="mt-1 inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-95"
                onClick={() => setOpen(false)}
              >
                Run a Sanity Check
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
