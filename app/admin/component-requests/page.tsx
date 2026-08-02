import { auth } from "@/auth";
import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { RequestTable } from "@/components/admin/requests/RequestTable";

export default async function ComponentRequestsPage(props: { searchParams?: Promise<{ search?: string }> }) {
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
      <h2 className="text-xl font-semibold">Component Requests</h2>
      <div className="mt-7 w-full overflow-x-auto">
        <RequestTable searchQuery={searchQuery} slug={user?.slug || ""} />
      </div>
    </section>
  );
}

