import { db } from "@/database";
import { componentsTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { ComponentBorrowForm } from "@/components/borrow/ComponentBorrowForm";
import { notFound } from "next/navigation";
import { isVerified } from "@/lib/actions/component";

export default async function BorrowComponentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const component = (
    await db
      .select()
      .from(componentsTable)
      .where(eq(componentsTable.id, id))
      .limit(1)
  )[0];
  const isBorrowVerified = await isVerified();

  if (!component) notFound();

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-10">
      <Link
        href="/components"
        className="inline-flex items-center gap-2 text-sm text-midnight-ink/60 transition-colors hover:text-cobalt-blue"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 12L6 8L10 4" />
        </svg>
        Back to Components
      </Link>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-4xl bg-cream-paper/50 p-8 h-140 overflow-hidden">
          <Image
            src={component.cover}
            alt={component.title}
            width={400}
            height={600}
            className="h-full w-full object-contain rounded-2xl"
            priority
          />
        </div>

        <div className="flex flex-col gap-6 justify-center">
          <h1 className="text-4xl font-bold text-midnight-ink md:text-5xl">
            {component.title}
          </h1>

          <div className="border-t-2 border-midnight-ink/10 pt-4">
            <p className="text-sm font-semibold text-midnight-ink/40 uppercase tracking-wider">
              Description
            </p>
            <p className="mt-1 text-lg leading-relaxed text-midnight-ink/70">
              {component.description}
            </p>
          </div>

          <div className="border-t-2 border-midnight-ink/10 pt-4">
            <p className="text-sm font-semibold text-midnight-ink/40 uppercase tracking-wider">
              Summary
            </p>
            <p className="mt-1 text-midnight-ink/60">{component.summary}</p>
          </div>
          <ComponentBorrowForm isBorrowerVerified={isBorrowVerified} component={component} />
        </div>
      </section>
    </div>
  );
}
