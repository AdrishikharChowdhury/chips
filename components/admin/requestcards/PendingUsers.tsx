import { ApprovalAnimation } from "@/components/lottie/ApprovalAnimation";
import Link from "next/link";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/database";
import { usersTable } from "@/database/schema";
import PendingUserCard from "./PendingUserCard";

export default async function PendingUsers({ slug }: { slug: string }) {
  const pendingUsers = await db
        .select()
        .from(usersTable)
        .where(and(
          eq(usersTable.status, "PENDING"),
          eq(usersTable.universitySlug, slug),
        )).limit(7).orderBy(desc(usersTable.createdAt));
  
  return (
    <section className="bg-cream-paper py-6 px-4 sm:py-8 sm:px-8 lg:py-10 lg:px-12 flex flex-col gap-4 rounded-2xl">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-2">Pending Approvals</h2>
        <Link
          className="text-cobalt-blue font-semibold underline hover:text-cobalt-blue/80"
          href="/admin/users"
        >
          View All
        </Link>
      </div>
      {pendingUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <ApprovalAnimation label="user" />
          <span className="text-midnight-ink/50 text-xl capitalize font-degular-display -mt-4">
            No User found for Approval
          </span>
        </div>
      ) : (
        <ul className="grid grid-cols-1 grid-rows-7 gap-2">
          {pendingUsers.map((user) => (
            <PendingUserCard key={user.fullName} {...user} />
          ))}
        </ul>
      )}
    </section>
  );
}
