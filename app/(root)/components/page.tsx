import ComponentList from "@/components/root/ComponentList";
import { db } from "@/database";
import { componentsTable } from "@/database/schema";
import { Components } from "@/types";

export default async function ComponentPage() {
  const components = (await db.select().from(componentsTable)) as Components[];
  return (
    <div>
      <ComponentList
        title="All Components"
        components={components}
        containerClassName="my-28"
      />
    </div>
  );
}
