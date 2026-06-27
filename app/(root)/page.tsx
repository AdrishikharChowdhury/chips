import Banner from "@/components/root/Banner";
import ComponentList from "@/components/root/ComponentList";
import { db } from "@/database";
import { componentsTable } from "@/database/schema";
import { Components } from "@/types";
import { desc } from "drizzle-orm";

export default async function Home() {
  const latestComponents = (await db
    .select()
    .from(componentsTable)
    .limit(10)
    .orderBy(desc(componentsTable.createdAt))) as Components[];
  return (
    <div>
      <Banner components={latestComponents} />
      <ComponentList
        title="Latest Components"
        components={latestComponents}
        containerClassName="my-28"
      />
    </div>
  );
}
