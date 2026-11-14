import ComponentForm from "@/components/admin/forms/ComponentForm";
import { Button } from "@/components/ui/button";
import { editComponent } from "@/lib/actions/component";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const response = await editComponent(id);

  if (!response?.success || !response.data) {
    redirect("/admin/components");
  }

  return (
    <div>
      <Button asChild className="back-btn text-lg py-6 px-4">
        <Link href="/admin/components">Go Back</Link>
      </Button>
      <section className="w-full max-w-4xl mx-auto">
        <ComponentForm
          type="UPDATE"
          componentId={id}
          component={response.data}
        />
      </section>
    </div>
  );
};

export default Page;
