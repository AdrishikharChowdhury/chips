"use client";
import { deleteBorrowRecordUser } from "@/lib/actions/component";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

export default function DeleteBorrowRecord({id}: {id: string}) {
  return (
    <Button
      className="bg-poppy-red py-5 px-3 hover:bg-poppy-red/80 rounded-full"
      onClick={() => deleteBorrowRecordUser(id)}
    >
      <span className="inline-block text-sm font-extrabold text-red-50">
        <Trash />
      </span>
    </Button>
  );
}
