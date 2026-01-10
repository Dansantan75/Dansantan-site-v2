import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "DANSANTAN | Franchise investments & operator advisory",
  description:
    "Owner-operator franchise investment holding company built on execution — not theory."
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

        <FloatingWhatsApp />

        <Analytics />
      </body>
    </html>
  );
}
