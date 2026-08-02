import { auth } from "@/auth";
import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { ComponentTable } from "@/components/admin/allcomponents/ComponentTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function ComponentsPage(props: { searchParams?: Promise<{ search?: string }> }) {
  const searchParams = await props.searchParams;
  const searchQuery = searchParams?.search;
  const session = await auth();
  const [user] = session?.user?.id
    ? await db
        .select({ slug: usersTable.universitySlug })
        .from(usersTable)
        .where(eq(usersTable.id, session.user.id))
        .limit(1)
    : [];
  return (
    <section className="w-full rounded-2xl bg-cream-paper p-7">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-xl font-semibold">All Components</h2>
        <Button
          className="bg-primary text-xl py-8 px-6 font-degular-display"
          asChild
        >
          <Link href="/admin/components/new">
            <PlusCircle /> Create a New Component Entry
          </Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-x-auto">
        <ComponentTable searchQuery={searchQuery} slug={user?.slug || ""} />
      </div>
    </section>
  );
}
