import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NewComponentPage() {
  return (
    <div>
      <Button asChild className="back-btn" >
        <Link href="/admin/components">Go Back</Link>
      </Button>
      <section className="w-full max-w-2xl" >
        <p>Book Form</p>
      </section>
    </div>
  );
}
