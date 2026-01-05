"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";

type NavItem = { label: string; href: string };

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const nav: NavItem[] = [
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
        <Link href="/" className="flex items-center gap-3" aria-label="DANSANTAN home">
          <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full">
            <Image src="/logo.png" alt="DANSANTAN logo" fill sizes="72px" className="object-contain" draggable={false} priority />
          </div>
          <div className="leading-tight">
            <div className="text-[20px] font-semibold tracking-tight text-black">DANSANTAN</div>
            <div className="mt-1 flex items-center gap-2 text-[13px] font-medium tracking-[0.30em] text-black/60">
              <span>People</span>
              <span className="h-[2px] w-[2px] rounded-full bg-black/30" />
              <span>Purpose</span>
              <span className="h-[2px] w-[2px] rounded-full bg-black/30" />
              <span>Performance</span>
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-[16px] font-medium text-black/65 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-black">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/sanity-check"
            className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-[14px] font-semibold text-white shadow-sm transition hover:opacity-90 sm:px-5"
          >
            Run a Sanity Check <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            aria-label="Start a WhatsApp conversation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white shadow-sm transition hover:bg-black/[0.03]"
          >
            <Image src="/icon/whatsapp.svg" alt="WhatsApp" width={22} height={22} priority />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="ml-1 inline-flex items-center justify-center rounded-full border border-black/10 bg-white p-2 text-black shadow-sm md:hidden"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-black/10 bg-white/95 backdrop-blur md:hidden">
          <div className="mx-auto grid max-w-6xl gap-2 px-4 py-3 sm:px-6">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-[15px] font-medium text-black/80 shadow-sm"
              >
                {item.label}
              </a>
            ))}

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-3 py-2 text-[15px] font-semibold text-black shadow-sm"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
