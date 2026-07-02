import { ComponentTable } from "@/components/admin/allcomponents/ComponentTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ComponentsPage() {
  return (
    <section className="w-full rounded-2xl bg-cream-paper p-7">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-xl font-semibold">All Components</h2>
        <Button
          className="bg-primary text-xl py-8 px-6 font-degular-display"
          asChild
        >
          <Link href="/admin/components/new">
            <PlusCircle /> Create a New Component Entry
          </Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <ComponentTable />
      </div>
    </section>
  );
}
