import ComponentList from "@/components/root/ComponentList";
import ComponentOverview from "@/components/root/ComponentOverview";
import { sampleComponents } from "@/constants";

export default function Home() {
  return (
    <div>
      <ComponentOverview {...sampleComponents[0]} />
      <ComponentList
        title="Latest Components"
        components={sampleComponents}
        containerClassName="mt-28"
      />
    </div>
  );
}
