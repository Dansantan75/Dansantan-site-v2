"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

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
      "Hi Mario, I’m on the DANSANTAN site. I’d like to start a conversation about my business. We’re struggling with ____.";
    return `https://wa.me/27824988638?text=${encodeURIComponent(message)}`;
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="group flex items-center gap-3" aria-label="DANSANTAN Home">
            <div className="relative h-11 w-11 overflow-hidden rounded-full sm:h-12 sm:w-12 lg:h-12 lg:w-12">
              <Image src="/logo.png" alt="DANSANTAN logo" fill sizes="48px" priority className="object-contain" />
            </div>
            <div className="leading-tight">
              <div className="text-base font-semibold tracking-tight text-black sm:text-lg">DANSANTAN</div>
              <div className="mt-1 text-[11px] font-normal tracking-[0.22em] text-neutral-500 sm:text-xs">
                People · Purpose · Performance
              </div>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-8 text-[15px] font-medium text-neutral-700 lg:flex" aria-label="Primary">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-neutral-900 hover:underline hover:underline-offset-8">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <Link
              href="/sanity-check"
              className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-black/30"
            >
              Run a Sanity Check
              <span className="ml-2">→</span>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Start a WhatsApp conversation"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-white shadow-sm transition hover:border-neutral-400 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              title="WhatsApp"
            >
              <Image src="/icon/whatsapp.svg" alt="" width={22} height={22} />
              <span className="sr-only">Start a conversation on WhatsApp</span>
            </a>
          </div>

          <div className="ml-auto flex items-center gap-3 lg:hidden">
            <Link
              href="/sanity-check"
              className="inline-flex h-11 items-center justify-center rounded-full bg-black px-4 text-sm font-semibold text-white shadow-sm"
            >
              Sanity <span className="ml-2">→</span>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white shadow-sm"
              title="WhatsApp"
            >
              <Image src="/icon/whatsapp.svg" alt="" width={20} height={20} />
              <span className="sr-only">Start a conversation on WhatsApp</span>
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white shadow-sm"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setOpen((state) => !state)}
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="lg:hidden">
          <div className="mx-auto max-w-6xl px-4 pb-4">
            <nav className="mt-2 rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-3 py-3 text-[15px] font-medium text-neutral-700 transition hover:bg-neutral-50"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="my-2 h-px bg-neutral-200" />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Start a WhatsApp conversation"
                className="flex items-center gap-2 rounded-xl px-3 py-3 text-[15px] font-medium text-neutral-800 transition hover:bg-neutral-50"
                onClick={() => setOpen(false)}
              >
                <Image src="/icon/whatsapp.svg" alt="" width={20} height={20} />
                <span>Start a conversation (WhatsApp)</span>
              </a>
              <Link
                href="/sanity-check"
                className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full bg-black px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-900"
                onClick={() => setOpen(false)}
              >
                Run a Sanity Check
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
