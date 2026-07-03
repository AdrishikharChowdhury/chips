import { db } from "@/database";
import { componentsTable } from "@/database/schema";
import { sql } from "drizzle-orm";
import AvailableCopiesChart from "./AvailableCopiesChart";
import { ApprovalAnimation } from "@/components/lottie/ApprovalAnimation";

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
    <div className="bg-cream-paper py-10 px-12 rounded-2xl flex flex-col col-span-2 items-center justify-between">
      <h2 className="text-left text-2xl font-semibold mb-2 w-full">Available</h2>
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          
          <ApprovalAnimation label="available" />
          <span className="text-midnight-ink/50 text-xl capitalize font-degular-display mt-8">No Available Components</span>
        </div>
      ) : (
        <AvailableCopiesChart data={data} />
      )}
    </div>
  );
}
