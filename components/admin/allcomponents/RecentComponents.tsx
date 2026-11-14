import { Button } from "@/components/ui/button";
import { db } from "@/database";
import { componentsTable } from "@/database/schema";
import { deleteComponent, updateComponent } from "@/lib/actions/component";
import { desc, eq } from "drizzle-orm";
import { Pencil, Plus, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function RecentComponents({ slug }: { slug: string }) {
  const recentComponents = await db
    .select()
    .from(componentsTable)
    .where(eq(componentsTable.universitySlug, slug))
    .limit(5)
    .orderBy(desc(componentsTable.createdAt));

  return (
    <section className="w-full p-4 bg-cream-paper rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Link href="/admin/components/new" className="w-full">
        <Button className="bg-marigold-yellow/30 py-14 pl-4 text-xl font-degular-display border-marigold-yellow border-2 rounded-2xl flex justify-start hover:bg-marigold-yellow/20 cursor-pointer w-full">
          <p className="text-left font-degular-display text-midnight-ink flex items-center gap-4">
            <span className="p-4 rounded-2xl bg-cream-paper">
              <Plus className="size-40" />
            </span>
            <span>Create a New Component Entry</span>
          </p>
        </Button>
      </Link>
      {recentComponents.map((component, idx: number) => (
        <div
          key={idx}
          className="bg-marigold-yellow/30 p-4 w-full border-marigold-yellow border-2 rounded-2xl flex justify-between items-center hover:bg-marigold-yellow/20"
        >
          <aside className="flex items-center gap-3">
            <figure className="size-18 rounded-2xl overflow-hidden shrink-0 border-2 border-midnight-ink/10">
              {component.cover ? (
                <Image
                  width={100}
                  height={100}
                  src={component.cover}
                  alt={component.title}
                  className="size-full object-cover"
                />
              ) : (
                <div className="size-full bg-marigold-yellow text-white flex items-center justify-center font-degular-display text-lg">
                  {component.title.charAt(0)}
                </div>
              )}
            </figure>
            <article className="flex flex-col items-start">
              <p className="font-degular-display text-lg">{component.title}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-midnight-ink/60">
                  {component.manufacturer}
                </p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cobalt-blue/10 text-cobalt-blue font-semibold">
                  {component.type?.split("/")[0]?.trim()}
                </span>
              </div>
            </article>
          </aside>
          <aside className="flex items-center gap-2 shrink-0">
            <form action={updateComponent.bind(null, component.id)}>
              <button className="flex size-9 items-center justify-center border-2 border-cobalt-blue/30 text-cobalt-blue hover:bg-cobalt-blue hover:text-cream-paper transition-colors">
                <Pencil size={16} />
              </button>
            </form>
            <form action={deleteComponent.bind(null, component.id)}>
              <button
                type="submit"
                className="flex size-9 items-center justify-center border-2 border-poppy-red/30 text-poppy-red hover:bg-poppy-red hover:text-cream-paper transition-colors"
              >
                <Trash size={16} />
              </button>
            </form>
          </aside>
        </div>
      ))}
    </section>
  );
}
