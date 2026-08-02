import { db } from "@/database";
import { componentsTable } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import AvailableCopiesChart from "./AvailableCopiesChart";
import { ApprovalAnimation } from "@/components/lottie/ApprovalAnimation";

export default async function AvailableCopiesCard({ slug }: { slug: string }) {
  const components = await db
    .select({
      title: componentsTable.title,
      availableCopies: componentsTable.availableCopies,
      totalCopies: componentsTable.totalCopies,
    })
    .from(componentsTable)
    .where(eq(componentsTable.universitySlug, slug))
    .orderBy(desc(componentsTable.availableCopies));

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
    <div className="bg-cream-paper py-6 px-4 sm:py-8 sm:px-8 lg:py-10 lg:px-12 rounded-2xl flex flex-col xl:col-span-2 items-center justify-start">
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
