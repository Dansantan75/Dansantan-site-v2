"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const nav = [
    { label: "How it works", href: "#how-it-works" },
    { label: "What we do", href: "#services" },
    { label: "Who it’s for", href: "#who-its-for" },
    { label: "Insights", href: "#insights" },
    { label: "Contact", href: "#contact" },
  ];

  const whatsappMessage =
    "Hi Mario, I’m on the DANSANTAN site. I’d like to start a conversation about my business. We’re struggling with ____.";
  const whatsappLink = `https://wa.me/27824988638?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="DANSANTAN home"
          onClick={() => setMobileOpen(false)}
        >
          <div className="relative h-24 w-24 overflow-hidden rounded-full sm:h-28 sm:w-28">
            <Image
              src="/logo.png"
              alt="DANSANTAN logo"
              fill
              sizes="(min-width: 640px) 112px, 96px"
              priority
              className="object-contain"
            />
          </div>

          <div className="ml-1 leading-tight">
            <div className="text-[20px] font-semibold tracking-tight text-black sm:text-[22px]">
              DANSANTAN
            </div>
            <div className="mt-1 flex items-center gap-2 text-[13px] font-medium tracking-[0.30em] text-black/60 sm:text-[14px]">
              <span>People</span>
              <span className="h-[2px] w-[2px] rounded-full bg-black/30" />
              <span>Purpose</span>
              <span className="h-[2px] w-[2px] rounded-full bg-black/30" />
              <span>Performance</span>
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-[16px] font-medium text-black/65 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-black"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions (NO SANITY CTA HERE) */}
        <div className="flex items-center gap-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            aria-label="Start a conversation on WhatsApp"
            title="Start a conversation"
            className="group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white shadow-sm transition hover:bg-black/[0.03]"
          >
            <Image src="/icon/whatsapp.svg" alt="WhatsApp" width={24} height={24} priority />
            <span className="pointer-events-none absolute right-0 top-full mt-2 hidden whitespace-nowrap rounded-full border border-black/10 bg-white px-3 py-1 text-[12px] font-medium text-black/70 shadow-sm group-hover:block">
              Start a conversation
            </span>
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm transition hover:bg-black/[0.03] md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen ? (
        <div className="border-t border-black/10 bg-white/95 backdrop-blur md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <div className="grid gap-2">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-[16px] font-medium text-black/80 shadow-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-5 py-3 text-[14px] font-semibold text-black shadow-sm"
                onClick={() => setMobileOpen(false)}
              >
                <Image src="/icon/whatsapp.svg" alt="WhatsApp" width={22} height={22} priority />
                Start a conversation
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
