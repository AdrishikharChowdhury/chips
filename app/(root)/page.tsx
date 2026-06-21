import ComponentList from "@/components/root/ComponentList";
import ComponentOverview from "@/components/root/ComponentOverview";

export default function Home() {
  return (
    <div>
      <ComponentOverview />
      <ComponentList />
    </div>
  );
}