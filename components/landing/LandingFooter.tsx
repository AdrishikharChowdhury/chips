import { footerLinks, landingLinks } from "@/constants";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LandingFooter() {
  return (
    <footer className="relative z-10 mt-24 w-screen border-t-2 border-midnight-ink bg-cream-paper -ml-[50vw] left-1/2">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col items-start gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              className="size-25"
              alt="CHIPS"
              width={80}
              height={80}
            />
            <span className="text-3xl font-extrabold tracking-tighter capitalize text-midnight-ink">
              CHIPS
            </span>
          </Link>
          <p className="max-w-90 text-base leading-relaxed text-midnight-ink/70">
            The campus catalog that runs itself — slug-scoped workspaces and
            zero setup costs for every university.
          </p>
          <div className="flex items-center gap-2">
            <span className="size-3 bg-poppy-red" />
            <span className="size-3 bg-cobalt-blue" />
            <span className="size-3 bg-marigold-yellow" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="border-2 border-midnight-ink px-3 py-1 text-xs font-bold uppercase tracking-widest text-midnight-ink w-fit">
            Explore
          </span>
          <ul className="flex flex-col gap-2.5">
            {landingLinks.map((link) => (
              <li key={link.href} className="flex items-center gap-2">
                <span className="size-2 bg-marigold-yellow" />
                <Link
                  href={link.href}
                  className="text-base capitalize text-midnight-ink/80 hover:text-cobalt-blue hover:underline hover:underline-offset-4 hover:decoration-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className="border-2 border-midnight-ink px-3 py-1 text-xs font-bold uppercase tracking-widest text-midnight-ink w-fit">
            Legal
          </span>
          <ul className="flex flex-col gap-2.5">
            {footerLinks.map((link) => (
              <li key={link.href} className="flex items-center gap-2">
                <span className="size-2 bg-poppy-red" />
                <Link
                  href={link.href}
                  className="text-base capitalize text-midnight-ink/70 hover:text-poppy-red hover:underline hover:underline-offset-4 hover:decoration-wavy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className="border-2 border-midnight-ink px-3 py-1 text-xs font-bold uppercase tracking-widest text-midnight-ink w-fit">
            Start now
          </span>
          <p className="text-base leading-relaxed text-midnight-ink/70">
            Get your campus on board before the next semester.
          </p>
          <Link
            href="/sign-up"
            className="flex w-fit items-center gap-2 border-2 border-midnight-ink bg-midnight-ink px-6 py-3 text-base font-bold uppercase tracking-wider text-cream-paper transition-colors hover:bg-cobalt-blue"
          >
            Sign up
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t-2 border-midnight-ink/10 px-6 py-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-midnight-ink/50">
          © {new Date().getFullYear()} CHIPS. All rights reserved.
        </p>
        <p className="text-sm text-midnight-ink/50">
          Built for campuses, by students who tracked chips.
        </p>
      </div>
    </footer>
  );
}