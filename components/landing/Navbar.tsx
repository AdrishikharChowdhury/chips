"use client";

import { landingLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleClick = (href: string) => {
    setActive(href === "#home" ? "" : href);
    setOpen(false);
  };

  return (
    <header className="relative my-6 flex items-center justify-between gap-4 md:my-10">
      <Link
        href="/"
        className="flex items-center gap-1"
        onClick={() => handleClick("#home")}
      >
        <Image
          src="/logo.svg"
          className="size-24 sm:size-32 md:size-36 lg:size-40"
          alt="CHIPS"
          width={80}
          height={80}
        />
        <span className="text-2xl font-extrabold tracking-tighter cursor-pointer capitalize sm:text-3xl md:text-4xl">
          CHIPS
        </span>
      </Link>

      <nav className="hidden lg:block">
        <ul className="flex flex-row items-center gap-8">
          {landingLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => handleClick(link.href)}
                className={cn(
                  "text-xl cursor-pointer capitalize",
                  active === link.href
                    ? "text-cobalt-blue font-extrabold underline underline-offset-4 decoration-2 decoration-wavy"
                    : "text-poppy-red",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="hidden items-center gap-4 text-lg lg:flex">
        <Link
          href="/sign-in"
          className="bg-primary px-6 py-2 font-semibold text-white"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="bg-poppy-red px-6 py-2 font-semibold text-white"
        >
          Sign Up
        </Link>
      </nav>

      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex size-11 items-center justify-center border-2 border-midnight-ink bg-cream-paper text-midnight-ink lg:hidden"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 flex flex-col gap-6 border-b-2 border-midnight-ink bg-cream-paper px-6 pb-8 pt-4 lg:hidden">
          <ul className="flex flex-col gap-4">
            {landingLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => handleClick(link.href)}
                  className={cn(
                    "text-xl capitalize",
                    active === link.href
                      ? "text-cobalt-blue font-extrabold underline underline-offset-4 decoration-2 decoration-wavy"
                      : "text-poppy-red",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="bg-primary px-6 py-2.5 text-center font-semibold text-white"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setOpen(false)}
              className="bg-poppy-red px-6 py-2.5 text-center font-semibold text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}