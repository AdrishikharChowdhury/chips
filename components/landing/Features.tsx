import React from "react";
import Shape from "./Shape";
import { features } from "../../constants";

export default function Features() {
  return (
    <section id="features" className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-12 py-16 md:py-24">
      <div className="flex flex-col items-start gap-5">
        <span className="border-2 bg-marigold-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-midnight-ink">
          Features
        </span>
        <h2 className="font-degular-display text-3xl font-bold leading-tight tracking-wide text-midnight-ink xs:text-4xl md:text-5xl xl:text-6xl">
          Everything a campus lab needs,{" "}
          <span className="text-cobalt-blue">in one system</span>
        </h2>
        <p className="text-base leading-relaxed text-midnight-ink/60 font-semibold ml-4 md:text-lg">
          Built for universities that share hardware. Track it, borrow it,
          approve it, and know exactly where every component is.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {features.map((f) => (
          <article
            key={f.id}
            className="group relative flex flex-col gap-4 border-2 border-midnight-ink bg-cream-paper p-6 sm:p-8 transition-colors hover:bg-midnight-ink"
          >
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <span className="font-degular-display text-2xl font-bold text-poppy-red transition-colors group-hover:text-marigold-yellow">
                {f.id}
              </span>
              <span className="flex items-center justify-center gap-1.5 rounded-full border-2 border-midnight-ink px-3 py-1 text-xs font-bold uppercase tracking-wider text-midnight-ink transition-colors group-hover:border-cream-paper group-hover:text-cream-paper">
                {f.tag}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Shape type={f.shape} accent={f.accent} />
              <h3 className="font-degular-display text-xl font-bold text-midnight-ink transition-colors group-hover:text-cream-paper md:text-2xl">
                {f.title}
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-midnight-ink/70 transition-colors group-hover:text-cream-paper/70 md:text-base">
              {f.desc}
            </p>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}
