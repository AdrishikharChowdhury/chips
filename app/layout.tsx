import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        degularDisplay.variable,
        usual.variable,
      )}
    >
      <SessionProvider session={session}>
        <body className="min-h-full flex flex-col">
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
