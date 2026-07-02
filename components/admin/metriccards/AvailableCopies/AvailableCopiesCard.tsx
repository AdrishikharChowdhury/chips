import { db } from "@/database";
import { componentsTable } from "@/database/schema";
import { sql } from "drizzle-orm";
import AvailableCopiesChart from "./AvailableCopiesChart";

export default async function AvailableCopiesCard() {
  const components = await db
    .select({
      title: componentsTable.title,
      availableCopies: componentsTable.availableCopies,
      totalCopies: componentsTable.totalCopies,
    })
    .from(componentsTable)
    .orderBy(sql`${componentsTable.availableCopies} DESC`);

  const data = components
    .filter((c) => c.totalCopies > 0)
    .map((c) => {
      const pct = Math.round((c.availableCopies / c.totalCopies) * 100);
      return {
        title: c.title,
        available: pct,
        unavailable: 100 - pct,
      };
    });

  return (
    <div className="bg-cream-paper py-10 px-12 rounded-2xl flex flex-col col-span-2 h-fit">
      <h2 className="text-2xl font-semibold mb-2">Available</h2>
      {data.length === 0 ? (
        <span>No Available Components</span>
      ) : (
        <AvailableCopiesChart data={data} />
      )}
    </div>
  );
}
