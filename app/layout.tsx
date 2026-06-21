import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const degularDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-degular-display",
});

const usual = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-usual",
});

export const metadata: Metadata = {
  title: "CHIPS",
  description: "Centralized Hardware Inventory for Prototype Systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", degularDisplay.variable, usual.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
