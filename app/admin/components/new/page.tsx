import ComponentForm from "@/components/admin/forms/ComponentForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewComponentPage() {
  return (
    <div>
      <Button asChild className="back-btn text-lg py-6 px-4">
        <Link href="/admin/components">Go Back</Link>
      </Button>
      <section className="w-full max-w-4xl mx-auto">
        <ComponentForm />
      </section>
    </div>
  );
}
