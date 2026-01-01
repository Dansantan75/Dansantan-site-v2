import './globals.css';

import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

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
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
