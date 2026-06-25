import Banner from "@/components/root/Banner";
import ComponentList from "@/components/root/ComponentList";
import { sampleComponents } from "@/constants";
import { db } from "@/database";
import { usersTable } from "@/database/schema";

export default async function Home() {
  const result = await db.select().from(usersTable)
  console.log(JSON.stringify(result,null,2))
  return (
    <div>
      <Banner />
      <ComponentList
        title="Latest Components"
        components={sampleComponents}
        containerClassName="my-28"
      />
    </div>
  );
}
