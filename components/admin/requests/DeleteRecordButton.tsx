"use client";
import { Button } from "@/components/ui/button";
import { deleteBorrowRecordInAdmin } from "@/lib/actions/component";
import { Trash } from "lucide-react";

export default function DeleteRecordButton({ id }: { id: string }) {
  return (
    <Button
      className="bg-poppy-red hover:bg-poppy-red/80 py-5"
      onClick={() => deleteBorrowRecordInAdmin(id)}
    >
      <span className="inline-block text-sm font-extrabold text-red-50">
        <Trash />
      </span>
    </Button>
  );
}
