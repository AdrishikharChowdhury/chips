import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section id="home" className="flex flex-col gap-16 py-12 lg:py-20 h-screen justify-center items-center">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-20 h-full">
        {/* Text column */}
        <div className="relative flex flex-col items-start gap-8 justify-center h-full">
          <span className="absolute -left-10 -top-12 hidden size-6 bg-cobalt-blue lg:block" />
          <span className="absolute -left-6 top-24 hidden size-4 border-2 border-midnight-ink lg:block" />

          <div className="flex flex-wrap items-center gap-5">
            <span className="ml-4 bg-marigold-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-midnight-ink border-2">
              Beta
            </span>
            <span className="border-2 border-cobalt-blue px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cobalt-blue">
              Centralized Hardware Inventory
            </span>
          </div>

          <h1 className="font-degular-display text-5xl font-bold leading-tight tracking-wide text-midnight-ink xs:text-6xl md:text-7xl">
            Centralized Hardware
            <span className="block text-cobalt-blue">
              Inventory for Prototype Systems
            </span>
          </h1>

          <p className="max-w-115 text-lg leading-relaxed text-midnight-ink/70">
            CHIPS gives university labs and makerspaces a shared, trackable
            catalog of electronic components — borrow, return, restock. No
            spreadsheets. No lost inventory.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/sign-up"
              className="inline-flex min-h-14 items-center justify-center border-2 border-midnight-ink bg-cobalt-blue px-8 font-degular-display text-lg font-bold text-cream-paper transition-colors hover:bg-cobalt-blue/90"
            >
              Get Started
            </Link>
            <Link
              href="#hiw"
              className="text-lg font-bold text-midnight-ink transition-colors hover:text-cobalt-blue"
            >
              How It Works <span className="text-cobalt-blue">▸</span>
            </Link>
          </div>

          <div className="mt-4 grid w-full max-w-115 grid-cols-3 gap-4 border-y-2 border-midnight-ink py-6">
            {[
              { n: "01", l: "University" },
              { n: "02", l: "Steps to Borrow" },
              { n: "03", l: "Slug-scoped Admin" },
            ].map((s) => (
              <div key={s.n} className="flex flex-col gap-1">
                <span className="font-degular-display text-2xl font-bold text-poppy-red">
                  {s.n}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-midnight-ink/50">
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Poster column — framed like a print, offset shapes behind */}
        <div className="relative min-h-80 lg:min-h-full">
          <span className="absolute -right-8 -top-8 hidden size-16 bg-marigold-yellow lg:block" />
          <span className="absolute -bottom-8 -left-8 hidden size-24 bg-blush-pink lg:block" />
          <div className="relative h-full min-h-80 border-2 border-midnight-ink">
            <Image
              src="/images/hero.webp"
              alt="CHIPS hero illustration"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
        
      </div>
      <div className="grid grid-cols-4 w-full">
        {["bg-midnight-ink", "bg-cobalt-blue", "bg-poppy-red", "bg-marigold-yellow"].map(
          (c) => (
            <span key={c} className={`h-3 ${c}`} />
          ),
        )}
      </div>
    </section>
  );
}
