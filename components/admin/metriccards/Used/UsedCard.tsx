import { db } from "@/database";
import { borrowRecords, componentsTable, usersTable } from "@/database/schema";
import { eq, sum } from "drizzle-orm";
import UsedChart from "./UsedChart";

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
    })
    .from(borrowRecords)
    .innerJoin(componentsTable, eq(borrowRecords.componentId, componentsTable.id))
    .innerJoin(usersTable, eq(borrowRecords.userId, usersTable.id))
    .where(eq(borrowRecords.status, "BORROWED"))
    .groupBy(borrowRecords.componentId, componentsTable.title, borrowRecords.userId, usersTable.fullName)
    .orderBy(sum(borrowRecords.amount));

  // Build metrics (distinct components)
  const componentSet = new Set<string>();
  for (const r of rows) {
    componentSet.add(r.componentTitle);
  }
  const metrics = Array.from(componentSet).map((title) => ({
    key: title,
    label: title,
  }));

  // Build data (per user, values per component)
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

  // Normalize values to 0-100
  const allValues = rows.map((r) => Number(r.totalAmount) || 0);
  const maxVal = Math.max(...allValues, 1);

  const data = userOrder.map((name, i) => ({
    label: name,
    color: CHART_COLORS[i % CHART_COLORS.length],
    values: Object.fromEntries(
      Object.entries(userMap.get(name)!).map(([k, v]) => [k, Math.round((v / maxVal) * 100)])
    ),
  }));

  return (
    <div className={`bg-cream-paper py-10 px-12 rounded-2xl flex flex-col items-center ${data.length === 0 ? ' h-fit' : ''}`}>
      <h2 className="text-2xl font-semibold mb-2 self-start">Used</h2>
      {data.length === 0 ? (
        <span className="text-midnight-ink/50 text-xl capitalize font-degular-display mt-8">No Components is being used</span>
      ) : (
        <UsedChart metrics={metrics} data={data} />
      )}
    </div>
  );
}
