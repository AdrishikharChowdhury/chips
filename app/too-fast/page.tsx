import Image from "next/image";
import Link from "next/link";

export default function TooFastPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="flex w-full max-w-3xl flex-col items-center bg-cream-paper p-8 xs:p-12 md:p-16">
        <div className="mb-2 inline-block bg-marigold-yellow px-4 py-1">
          <span className="font-degular-display text-xs font-bold uppercase tracking-widest text-midnight-ink">
            Rate Limited
          </span>
        </div>

        <h1 className="mt-4 text-center text-4xl font-bold leading-tight text-midnight-ink xs:text-5xl md:text-6xl">
          Whoa, Slow Down There,{" "}
          <span className="text-poppy-red">Engineer!</span>
        </h1>

        <div className="mt-8 w-full border-2 border-midnight-ink">
          <Image
            src="/images/soldering.webp"
            width={800}
            height={400}
            alt="soldering"
            className="block w-full object-cover"
          />
        </div>

        <p className="mt-8 max-w-xl text-center text-base leading-relaxed text-midnight-ink/70 xs:text-lg">
          Looks like you&apos;ve been too eager to move on. We&apos;ve put a
          temporary pause on your progress. Take a breather and try again in a
          few moments.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-14 w-full max-w-xs items-center justify-center border-2 border-midnight-ink bg-cobalt-blue px-8 font-degular-display text-lg font-bold text-cream-paper transition-colors hover:bg-cobalt-blue/90"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
