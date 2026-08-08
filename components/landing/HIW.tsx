import Image from "next/image";
import { steps } from "../../constants";
import { Mark } from "./Mark";

export default function HIW() {
  return (
    <section id="hiw" className="flex min-h-screen flex-col gap-12 py-16 lg:grid lg:grid-cols-[1fr_380px] lg:items-stretch lg:gap-12 xl:gap-20">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-start gap-5">
          <span className="border-2 bg-marigold-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-midnight-ink">
            How It Works
          </span>
          <h2 className="font-degular-display text-3xl font-bold leading-tight tracking-wide text-midnight-ink xs:text-4xl md:text-5xl xl:text-6xl">
            Live in <span className="text-cobalt-blue">three steps</span>
          </h2>
          <p className="text-base leading-relaxed text-midnight-ink/60 font-semibold ml-4 md:text-lg">
            From empty shelf to a tracked, borrowable campus inventory in
            minutes — no spreadsheets, no setup costs.
          </p>
        </div>

        <div className="relative">
          <span className="absolute left-7 top-0 hidden h-full w-0.5 bg-midnight-ink/15 md:block" />

          <ol className="flex flex-col gap-10 md:gap-0">
            {steps.map((step, i) => (
              <li
                key={step.id}
                className="relative grid grid-cols-1 items-center gap-4 md:grid-cols-[64px_1fr] md:gap-12 md:py-10"
              >
                <div className="relative z-10 flex size-12 items-center justify-center border-2 border-midnight-ink bg-cream-paper md:size-14">
                  <Mark shape={step.shape} color={step.color} />
                </div>

                <div className="flex flex-col gap-3 border-b-2 border-midnight-ink/10 pb-8 md:pb-0 md:border-b-0">
                  <div className="flex flex-wrap items-center gap-4 md:gap-6">
                    <span
                      className="font-degular-display text-5xl font-bold leading-none md:text-8xl"
                      style={{ color: step.color }}
                    >
                      {step.id}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="border-2 border-midnight-ink px-3 py-1 text-xs font-bold uppercase tracking-wider text-midnight-ink w-fit">
                        {step.tag}
                      </span>
                      <h3 className="font-degular-display text-xl font-bold text-midnight-ink md:text-2xl xl:text-3xl">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="max-w-125 text-base leading-relaxed text-midnight-ink/70 md:text-lg">
                    {step.desc}
                  </p>
                </div>

                {i < steps.length - 1 && (
                  <span className="absolute -bottom-5 left-7 z-10 hidden size-3 bg-poppy-red md:block" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="relative min-h-96 lg:min-h-full">
        <span className="absolute -right-6 -top-6 hidden size-14 bg-cobalt-blue lg:block" />
        <span className="absolute -bottom-6 -left-6 hidden size-20 bg-blush-pink lg:block" />
        <div className="relative h-full min-h-96 border-2 border-midnight-ink">
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