"use client";

import { landingLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState<string>("");

  return (
    <header className="my-10 flex items-center justify-between gap-5">
      <Link href="/" className="flex items-center gap-2" onClick={() => setActive("")}>
        <Image
          src="/logo.svg"
          className="size-40"
          alt="CHIPS"
          width={80}
          height={80}
        />
        <span className="text-4xl font-extrabold tracking-tighter cursor-pointer capitalize">
          CHIPS
        </span>
      </Link>
      <nav>
        <ul className="flex flex-row items-center gap-8">
          {landingLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setActive(link.href === "#home" ? "" : link.href)}
                className={cn(
                  "text-xl cursor-pointer capitalize",
                  active === link.href ?
                    "text-cobalt-blue font-extrabold underline underline-offset-4 decoration-2 decoration-wavy":
                    "text-poppy-red decoration-0 decoration-none",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav>
        <ul className="flex justify-center items-center gap-4 text-lg">
          <li className="bg-primary text-white px-6 py-2 font-semibold">
            <Link href="/sign-in">Sign In</Link>
          </li>
          <li className="bg-poppy-red text-white px-6 py-2 font-semibold">
            <Link href="/sign-up">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
