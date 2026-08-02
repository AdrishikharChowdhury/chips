import { auth } from "@/auth";
import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { AccountsTable } from "@/components/admin/users/AccountsTable"

export default async function UsersPage(props: { searchParams?: Promise<{ search?: string }> }) {
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
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Accounts</h2>
      </div>
      <div className="mt-7 w-full overflow-x-auto">
        <AccountsTable searchQuery={searchQuery} slug={user?.slug || ""} />
      </div>
    </section>
  );
}
