import { db } from "@/database";
import { borrowRecords, componentsTable } from "@/database/schema";
import { eq, sum } from "drizzle-orm";
import PendingApprovalChart from "./PendingApprovalChart";

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

export default async function PendingApprovalCard() {
  const pending = await db
    .select({
      componentTitle: componentsTable.title,
      totalAmount: sum(borrowRecords.amount),
      availableCopies: componentsTable.availableCopies,
    })
    .from(borrowRecords)
    .innerJoin(componentsTable, eq(borrowRecords.componentId, componentsTable.id))
    .where(eq(borrowRecords.status, "PENDING"))
    .groupBy(borrowRecords.componentId, componentsTable.title, componentsTable.availableCopies)
    .orderBy(sum(borrowRecords.amount));

  const chartData = pending.map((p, i) => ({
    label: p.componentTitle,
    value: Number(p.totalAmount) || 0,
    maxValue: p.availableCopies,
    color: CHART_COLORS[i % CHART_COLORS.length],
  }));

  return (
    <div className={`bg-cream-paper py-10 px-12 rounded-2xl flex flex-col items-center ${chartData.length === 0 ? ' h-fit' : ''}`} suppressHydrationWarning>
      <h2 className="text-2xl font-semibold mb-2 self-start">Pending for Approval</h2>
      {chartData.length === 0 ? (
        <span className="text-midnight-ink/50 text-xl capitalize font-degular-display mt-8">No Components is pending approval</span>
      ) : (
        <PendingApprovalChart data={chartData} />
      )}
    </div>
  );
}
