import { auth } from "@/auth";
import Banner from "@/components/root/Banner";
import ComponentList from "@/components/root/ComponentList";
import { db } from "@/database";
import { componentsTable } from "@/database/schema";
import { Components } from "@/types";
import { desc } from "drizzle-orm";

export default async function Home() {
  const session = await auth();
  const { id } = session?.user ?? {};

  const latestComponents = (await db
    .select()
    .from(componentsTable)
    .limit(12)
    .orderBy(desc(componentsTable.createdAt))) as Components[];
  return (
    <div>
      <Banner components={latestComponents} userId={id as string} />
      <ComponentList
        title="Latest Components"
        components={latestComponents}
        containerClassName="my-28"
      />
    </div>
  );
}
