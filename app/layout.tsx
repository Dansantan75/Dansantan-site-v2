import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Caveat } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "600"]
});

export const metadata: Metadata = {
  title: "DANSANTAN | Franchise investments & operator advisory",
  description:
    "A focused landing page for DANSANTAN that highlights franchise holdings, operator advisory services, outcomes, and a streamlined contact path."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${caveat.variable} flex min-h-screen w-full flex-col`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
