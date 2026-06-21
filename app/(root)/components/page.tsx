import ComponentList from "@/components/root/ComponentList";
import { sampleComponents } from "@/constants";

export default function ComponentPage() {
  return (
    <div>
      <ComponentList
        title="All Components"
        components={sampleComponents}
        containerClassName="my-28"
      />
    </div>
  );
}