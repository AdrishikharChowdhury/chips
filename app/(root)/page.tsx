import Banner from "@/components/root/Banner";
import ComponentList from "@/components/root/ComponentList";
import { sampleComponents } from "@/constants";

export default function Home() {
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
