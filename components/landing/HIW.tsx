import Image from "next/image";
import { steps } from "../../constants";
import { Mark } from "./Mark";

export default function HIW() {
  return (
    <section id="hiw" className="flex flex-col gap-8 py-24 lg:grid lg:grid-cols-[1fr_380px] lg:items-stretch lg:gap-60 h-screen">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-start gap-6">
          <span className="border-2 bg-marigold-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-midnight-ink">
            How It Works
          </span>
          <h2 className="font-degular-display text-4xl font-bold leading-tight tracking-wide text-midnight-ink xs:text-5xl md:text-6xl">
            Live in <span className="text-cobalt-blue">three steps</span>
          </h2>
          <p className="text-lg leading-relaxed text-midnight-ink/60 font-semibold ml-4">
            From empty shelf to a tracked, borrowable campus inventory in
            minutes — no spreadsheets, no setup costs.
          </p>
        </div>

        <div className="relative">
          <span className="absolute left-7 top-0 hidden h-full w-0.5 bg-midnight-ink/15 md:block" />

          <ol className="flex flex-col gap-12 md:gap-0">
            {steps.map((step, i) => (
              <li
                key={step.id}
                className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-[64px_1fr] md:gap-12 md:py-10"
              >
                <div className="relative z-10 flex size-14 items-center justify-center border-2 border-midnight-ink bg-cream-paper">
                  <Mark shape={step.shape} color={step.color} />
                </div>

                <div className="flex flex-col gap-4 border-b-2 border-midnight-ink/10 pb-10 md:pb-0 md:border-b-0">
                  <div className="flex flex-wrap items-center gap-6">
                    <span
                      className="font-degular-display text-6xl font-bold leading-none md:text-8xl"
                      style={{ color: step.color }}
                    >
                      {step.id}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="border-2 border-midnight-ink px-3 py-1 text-xs font-bold uppercase tracking-wider text-midnight-ink w-fit">
                        {step.tag}
                      </span>
                      <h3 className="font-degular-display text-2xl font-bold text-midnight-ink md:text-3xl">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="max-w-125 text-lg leading-relaxed text-midnight-ink/70">
                    {step.desc}
                  </p>
                </div>

                {i < steps.length - 1 && (
                  <span className="absolute -bottom-6 left-7 z-10 hidden size-3 bg-poppy-red md:block" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="relative min-h-160 lg:min-h-full">
        <span className="absolute -right-6 -top-6 hidden size-14 bg-cobalt-blue lg:block" />
        <span className="absolute -bottom-6 -left-6 hidden size-20 bg-blush-pink lg:block" />
        <div className="relative h-full min-h-160 border-2 border-midnight-ink">
          <Image
            src="/images/hiw.webp"
            alt="How CHIPS works — illustration"
            fill
            className="size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}