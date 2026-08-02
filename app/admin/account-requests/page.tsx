import { auth } from "@/auth";
import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { AccountRequestTable } from "@/components/admin/accountrequests/AccountRequestTable"

export default async function AccountRequestsPage(props: { searchParams?: Promise<{ search?: string }> }) {
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
        <h2 className="text-xl font-semibold">Account Requests</h2>
        <p>Sorted by </p>
      </div>
      <div className="mt-7 w-full overflow-x-auto">
        <AccountRequestTable searchQuery={searchQuery} slug={user?.slug || ""} />
      </div>
    </section>
  );
}
