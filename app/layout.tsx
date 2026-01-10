import './globals.css';

import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'DANSANTAN | Franchise investments & operator advisory',
  description:
    'A focused landing page for DANSANTAN that highlights franchise holdings, operator advisory services, outcomes, and a streamlined contact path.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <a
          href="https://wa.me/27824988638"
          className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md transition hover:shadow-lg"
          aria-label="WhatsApp"
          title="WhatsApp"
        >
          <img src="/icon/whatsapp.svg" alt="" className="h-6 w-6" />
        </a>
        <Analytics />
      </body>
    </html>
  );
}
