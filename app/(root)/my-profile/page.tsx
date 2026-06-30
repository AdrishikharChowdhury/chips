import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { UniversityCard } from "@/components/profile/UniversityCard";
import { BorrowCard } from "@/components/borrow/BorrowCard";
import { auth } from "@/auth";
import { fetchBorrowedComponents } from "@/lib/actions/component";

export default async function MyProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, session.user.id))
    .limit(1);
  if (!user.length) redirect("/sign-in");

  const u = user[0];

  const rows = (await fetchBorrowedComponents()).slice(0, 3);
  

  const records = rows.reduce<
    Record<
      string,
      Omit<(typeof rows)[number], "borrowDate" | "amount"> & {
        borrowDate: Date | null;
        amount: number;
      }
    >
  >((acc, row) => {
    const key = row.componentId;
    if (!acc[key]) {
      acc[key] = { ...row, amount: 0, borrowDate: row.borrowDate };
    }
    acc[key].amount += row.amount ?? 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-7xl space-y-10 py-10">
      <div className="flex items-center gap-4">
        <div className="flex size-20 items-center justify-center rounded-full bg-cobalt-blue text-3xl font-bold text-cream-paper p-8">
          {u.fullName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-midnight-ink">{u.fullName}</h1>
          <p className="text-lg text-midnight-ink/60">{u.email}</p>
        </div>
      </div>

      <UniversityCard
        universityCard={u.universityCard}
        universityId={u.universityId}
        status={u.status}
        role={u.role}
        lastActivityDate={u.lastActivityDate}
        createdAt={u.createdAt}
      />
      <section className="w-full space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold">Your Components</h2>
          {Object.keys(records).length > 0 && (
            <Link
              href="/components/borrow"
              className="text-sm font-semibold text-cobalt-blue hover:underline"
            >
              View all
            </Link>
          )}
        </div>
        {Object.keys(records).length === 0 ? (
          <p className="text-center text-4xl text-midnight-ink/20 mt-6">
            No Borrowed Components Yet
          </p>
        ) : (
          <div className="grid gap-4">
            {Object.values(records).map((record) => (
              <BorrowCard key={record.id} {...record} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
