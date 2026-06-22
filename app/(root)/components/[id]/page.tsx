import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sampleComponents } from "@/constants";
import { Button } from "@/components/ui/button";

export default async function ComponentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  const c = sampleComponents.find((c) => c.id === id);
  if (!c) notFound();
  const genreArray = c.genre.split("/");

  return (
    <div className="space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-midnight-ink/60 transition-colors hover:text-cobalt-blue"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 12L6 8L10 4" />
        </svg>
        Back to Home
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-4xl bg-cream-paper/50 p-8 h-140 overflow-hidden">
          <Image
            src={c.cover}
            alt={c.title}
            width={400}
            height={600}
            className="h-full w-full object-contain rounded-2xl"
            priority
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-midnight-ink md:text-5xl">{c.title}</h1>
            <span className="border-2 border-poppy-red px-4 py-1.5 font-semibold text-poppy-red capitalize w-fit">by {c.author}</span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="text-sm flex gap-4 self-center">
              {genreArray.map((genreItem,idx:number) => (
                <span className="text-cobalt-blue font-semibold border-2  border-cobalt-blue px-3 py-1 w-max text-center " key={idx} >{ genreItem}</span>
              ))}
            </div>
            <span className="flex items-center gap-1.5 border-2 border-midnight-ink/60 px-4 py-1.5 font-semibold text-midnight-ink">
              <Image src="/icons/star.svg" alt="" width={16} height={16} />
              {c.rating}
            </span>
          </div>

          <div className="flex gap-6">
            <div>
              <p className="text-sm text-midnight-ink/40">Total Copies</p>
              <p className="text-2xl font-bold text-midnight-ink">{c.total_copies}</p>
            </div>
            <div>
              <p className="text-sm text-midnight-ink/40">Available</p>
              <p className={`text-2xl font-bold ${c.available_copies <= 5 ? 'text-red-500' : ''}`}>{c.available_copies}</p>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-midnight-ink/70">{c.description}</p>

          <div className="border-t-2 border-midnight-ink/10 pt-4">
            <p className="text-sm font-semibold text-midnight-ink/40 uppercase tracking-wider">Summary</p>
            <p className="mt-1 text-midnight-ink/60">{c.summary}</p>
          </div>

          <Button className="bg-cobalt-blue text-cream-paper hover:bg-cobalt-blue/90 py-6 px-8 w-fit">
            <Image src="/icons/component.svg" alt="" width={20} height={20} className="invert-100" />
            <span className="font-degular-display text-lg">Borrow Component</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
