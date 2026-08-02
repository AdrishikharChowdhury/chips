import { db } from "@/database";
import { borrowRecords, componentsTable, usersTable } from "@/database/schema";
import { and, desc, eq, sql, sum } from "drizzle-orm";
import PendingApprovalChart from "./PendingApprovalChart";
import { ApprovalAnimation } from "@/components/lottie/ApprovalAnimation";
import Link from "next/link";
import { getInitials } from "@/lib/utils";
import { GroupStatusDropdown } from "../../requests/GroupStatusDropdown";

const CHART_COLORS = [
  "#1457d8",
  "#e84522",
  "#f5b400",
  "#f2c3bd",
  "#0b0f16",
  "#0891b2",
  "#7c3aed",
  "#059669",
];

export default async function PendingApprovalCard({ slug }: { slug: string }) {
  const pending = await db
    .select({
      componentTitle: componentsTable.title,
      totalAmount: sum(borrowRecords.amount),
      availableCopies: componentsTable.availableCopies,
      fullName: usersTable.fullName,
      recordIds: sql<string[]>`array_agg(${borrowRecords.id})`,
    })
    .from(borrowRecords)
    .innerJoin(
      componentsTable,
      eq(borrowRecords.componentId, componentsTable.id),
    ).innerJoin(usersTable, eq(borrowRecords.userId, usersTable.id))
    .where(and(
      eq(borrowRecords.status, "PENDING"),
      eq(borrowRecords.universitySlug, slug),
    ))
    .groupBy(
      borrowRecords.componentId,
      borrowRecords.userId,
      componentsTable.title,
      componentsTable.availableCopies,
      usersTable.fullName,
      borrowRecords.createdAt
    )
    .orderBy(desc(borrowRecords.createdAt));

  const chartData = pending.map((p, i) => ({
    label: p.componentTitle,
    value: Number(p.totalAmount) || 0,
    maxValue: p.availableCopies,
    color: CHART_COLORS[i % CHART_COLORS.length],
  }));

  return (
    <div
      className={`bg-cream-paper py-6 px-4 sm:py-8 sm:px-8 lg:py-10 lg:px-12 rounded-2xl flex flex-col items-center justify-start h-fit`}
      suppressHydrationWarning
    >
      <div className="flex justify-between items-center w-full">
        <h2 className="text-2xl font-semibold">
          Pending for Approval
        </h2>
        <Link
          href="/admin/component-requests"
          className="text-cobalt-blue font-semibold underline hover:text-cobalt-blue/80"
        >
          View All
        </Link>
      </div>

      {chartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <ApprovalAnimation label="approval" />
          <span className="text-midnight-ink/50 text-xl capitalize font-degular-display mt-8">
            No Components is pending approval
          </span>
        </div>
      ) : (
          <>
            <PendingApprovalChart data={chartData} />
            <div className="w-full flex flex-col gap-4">
              {pending.slice(0,3).map((p) => (
                <section key={p.recordIds[0]} className="bg-marigold-yellow/10 p-4 w-full border-poppy-red border-2 rounded-2xl flex justify-between items-center">
                  <aside className="flex items-center gap-2">
                    <figure className="bg-poppy-red text-white rounded-full size-12 flex items-center justify-center font-degular-display text-lg">
                      {getInitials(p.fullName)}
                    </figure>
                    <article className="flex flex-col items-start">
                      <p className="font-degular-display text-lg">{p.componentTitle}</p>
                      <p className="text-sm text-midnight-ink/60" >By {p.fullName}</p>
                    </article>
                  </aside>
                  <aside className="flex items-center gap-3">
                    <span className="text-sm font-bold text-midnight-ink/70">x{Number(p.totalAmount) || 0}</span>
                    <GroupStatusDropdown
                      requestIds={p.recordIds}
                      currentStatus="PENDING"
                    />
                  </aside>
                </section>
              ))}
            </div>
        </>
      )}
    </div>
  );
}
