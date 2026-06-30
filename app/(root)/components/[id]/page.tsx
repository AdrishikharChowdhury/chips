import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { db } from "@/database";
import { componentsTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import ComponentCard from "@/components/root/ComponentCard";
import { ShoppingCart } from "lucide-react";

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = (
    await db.select().from(componentsTable).where(eq(componentsTable.id, id))
  )[0];

  const relatedComponents = await db.select().from(componentsTable).limit(3);

  if (!c) notFound();
  const typeArray = c.type.split("/");

  return (
    <div className="space-y-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-midnight-ink/60 transition-colors hover:text-cobalt-blue"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
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
            <h1 className="text-4xl font-bold text-midnight-ink md:text-5xl">
              {c.title}
            </h1>
            <span className="border-2 border-poppy-red px-4 py-1.5 font-semibold text-poppy-red capitalize w-fit">
              {c.manufacturer}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="text-sm flex gap-4 self-center">
              {typeArray.map((typeItem, idx: number) => (
                <span
                  className="text-cobalt-blue font-semibold border-2  border-cobalt-blue px-3 py-1 w-max text-center "
                  key={idx}
                >
                  {typeItem}
                </span>
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
              <p className="text-2xl font-bold text-midnight-ink">
                {c.totalCopies}
              </p>
            </div>
            <div>
              <p className="text-sm text-midnight-ink/40">Available</p>
              <p
                className={`text-2xl font-bold ${c.availableCopies <= 5 ? "text-red-500" : ""}`}
              >
                {c.availableCopies}
              </p>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-midnight-ink/70">
            {c.description}
          </p>

          <div className="border-t-2 border-midnight-ink/10 pt-4">
            <p className="text-sm font-semibold text-midnight-ink/40 uppercase tracking-wider">
              Summary
            </p>
            <p className="mt-1 text-midnight-ink/60">{c.summary}</p>
          </div>
          <div className="flex items-center justify-between flex-row-reverse" >
            <Link href={`/components/borrow/${c.id}`}>
              <Button className="bg-cobalt-blue text-cream-paper hover:bg-cobalt-blue/90 py-6 px-8 w-fit cursor-pointer">
                <Image
                  src="/icons/component.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="invert-100"
                />
                <span className="font-degular-display text-lg">
                  Borrow Component
                </span>
              </Button>
            </Link>
            <Link href={`/cart`}>
              <Button className="bg-poppy-red text-cream-paper hover:bg-poppy-red/90 py-6 px-8 w-fit cursor-pointer">
                <ShoppingCart />
                <span className="font-degular-display text-lg">
                  Add to Cart
                </span>
              </Button>
            </Link>
          </div>
          
        </div>
      </div>
      <div className="space-y-8 mb-10">
        <section className="w-full flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">More Components</h1>
          <Link href="/components" className="text-midnight-ink/60">View All</Link>
        </section>
        
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedComponents.map((component) => (
            <li key={component.id}>
              <ComponentCard {...component} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
