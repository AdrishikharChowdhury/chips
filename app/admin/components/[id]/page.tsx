import { editComponent } from "@/lib/actions/component";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const response = await editComponent(id);
  if (!response?.success) {
    toast.error("Couldn't fetch the component details");
    redirect("/admin/components");
  }
  console.log(response);
  return <div>EditComponent</div>;
};

export default Page;
