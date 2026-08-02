
import { auth } from "@/auth";
import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import RecentComponents from "@/components/admin/allcomponents/RecentComponents";
import AvailableCopiesCard from "@/components/admin/metriccards/AvailableCopies/AvailableCopiesCard";
import PendingApprovalCard from "@/components/admin/metriccards/PendingApprove/PendingApprovalCard";
import UsedCard from "@/components/admin/metriccards/Used/UsedCard";
import AllUsersCard from "@/components/admin/requestcards/AllUsersCard";
import PendingUsers from "@/components/admin/requestcards/PendingUsers";
import Link from "next/link";

export default async function AdminPage() {
  const session = await auth();
  const userId = session?.user?.id;
  const [user] = userId
    ? await db
        .select({ slug: usersTable.universitySlug })
        .from(usersTable)
        .where(eq(usersTable.id, userId))
        .limit(1)
    : [];
  const slug = user?.slug;
  if (!slug) return null;

  return (
    <div>
      <section className="flex flex-col gap-4">
        <article className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">Components</h1>
          <Link
            href="/admin/components"
            className="text-cobalt-blue font-semibold underline hover:text-cobalt-blue/80"
          >
            View All
          </Link>
        </article>
        <article className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <AvailableCopiesCard slug={slug} />
          <PendingApprovalCard slug={slug} />
          <UsedCard slug={slug} />
        </article>
      </section>
      <section className="flex flex-col gap-4">
        <article className="flex justify-between items-center mt-8">
          <h1 className="text-3xl font-extrabold">Users</h1>
          <Link
            href="/admin/users"
            className="text-cobalt-blue font-semibold underline hover:text-cobalt-blue/80"
          >
            View All
          </Link>
        </article>
        <article className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <AllUsersCard slug={slug} />
          <PendingUsers slug={slug} />
        </article>
      </section>
      <section className="flex flex-col gap-4 w-full">
        <article className="flex justify-between items-center mt-8">
          <h1 className="text-3xl font-extrabold">Recently Added Components</h1>
          <Link
            href="/admin/components"
            className="text-cobalt-blue font-semibold underline hover:text-cobalt-blue/80"
          >
            View All
          </Link>
          
        </article>
        <RecentComponents slug={slug} />
      </section>
    </div>
  );
}
