import { db } from "@/database";
import { borrowRecords, componentsTable, usersTable } from "@/database/schema";
import { desc, eq, sql, sum } from "drizzle-orm";
import UsedChart from "./UsedChart";
import { ApprovalAnimation } from "@/components/lottie/ApprovalAnimation";
import Link from "next/link";
import { getInitials } from "@/lib/utils";
import { GroupStatusDropdown } from "@/components/admin/requests/GroupStatusDropdown";

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

export default async function UsedCard() {
  const rows = await db
    .select({
      componentTitle: componentsTable.title,
      userFullName: usersTable.fullName,
      totalAmount: sum(borrowRecords.amount),
      recordIds: sql<string[]>`array_agg(${borrowRecords.id})`,
    })
    .from(borrowRecords)
    .innerJoin(
      componentsTable,
      eq(borrowRecords.componentId, componentsTable.id),
    )
    .innerJoin(usersTable, eq(borrowRecords.userId, usersTable.id))
    .where(eq(borrowRecords.status, "BORROWED"))
    .groupBy(
      borrowRecords.componentId,
      componentsTable.title,
      borrowRecords.userId,
      usersTable.fullName,
      borrowRecords.createdAt,
    )
    .orderBy(desc(borrowRecords.createdAt));

  // Build metrics (distinct components) for the radar chart
  const componentSet = new Set<string>();
  for (const r of rows) {
    componentSet.add(r.componentTitle);
  }
  const metrics = Array.from(componentSet).map((title) => ({
    key: title,
    label: title,
  }));

  // Build data (per user, values per component) for the radar chart
  const userMap = new Map<string, Record<string, number>>();
  const userOrder: string[] = [];
  for (const r of rows) {
    if (!userMap.has(r.userFullName)) {
      userMap.set(r.userFullName, {});
      userOrder.push(r.userFullName);
    }
    const vals = userMap.get(r.userFullName)!;
    vals[r.componentTitle] = Number(r.totalAmount) || 0;
  }

  const allValues = rows.map((r) => Number(r.totalAmount) || 0);
  const maxVal = Math.max(...allValues, 1);

  const data = userOrder.map((name, i) => ({
    label: name,
    color: CHART_COLORS[i % CHART_COLORS.length],
    values: Object.fromEntries(
      Object.entries(userMap.get(name)!).map(([k, v]) => [
        k,
        Math.round((v / maxVal) * 100),
      ]),
    ),
  }));

  return (
    <div
      className={`bg-cream-paper py-10 px-12 rounded-2xl flex flex-col items-center justify-start`}
    >
      <div className="flex justify-between items-center w-full">
        <h2 className="text-2xl font-semibold">Used</h2>
        <Link
          href="/admin/component-requests"
          className="text-cobalt-blue font-semibold underline hover:text-cobalt-blue/80"
        >
          View All
        </Link>
      </div>
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <ApprovalAnimation label="used" />
          <span className="text-midnight-ink/50 text-xl capitalize font-degular-display mt-8">
            No Components is being used
          </span>
        </div>
      ) : (
        <>
          <UsedChart metrics={metrics} data={data} />
          <div className="w-full overflow-y-scroll flex flex-col gap-4">
            {rows.slice(0, 3).map((r, idx: number) => (
              <section
                key={idx}
                className="bg-marigold-yellow/10 p-4 w-full border-cobalt-blue border-2 rounded-2xl flex justify-between items-center"
              >
                <aside className="flex items-center gap-2">
                  <figure className="bg-cobalt-blue text-white rounded-full size-12 flex items-center justify-center font-degular-display text-lg">
                    {getInitials(r.userFullName)}
                  </figure>
                  <article className="flex flex-col items-start">
                    <p className="font-degular-display text-lg">
                      {r.componentTitle}
                    </p>
                    <p className="text-sm text-midnight-ink/60">
                      By {r.userFullName}
                    </p>
                  </article>
                </aside>
                <aside className="flex items-center gap-3">
                  <span className="text-sm font-bold text-midnight-ink/70">
                    x{Number(r.totalAmount) || 0}
                  </span>
                  <GroupStatusDropdown
                    requestIds={r.recordIds}
                    currentStatus="BORROWED"
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
