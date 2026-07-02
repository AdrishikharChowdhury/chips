"use client";

import { updateGroupStatus } from "@/lib/actions/component";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GroupStatusDropdownProps {
  requestIds: string[];
  currentStatus: string;
}

export function GroupStatusDropdown({ requestIds, currentStatus }: GroupStatusDropdownProps) {
  return (
    <form action={updateGroupStatus} className="inline-block">
      <input type="hidden" name="requestIds" value={requestIds.join(",")} />
      <input type="hidden" name="status" id={`status-${requestIds[0]}`} />
      <Select
        defaultValue={currentStatus}
        onValueChange={(value) => {
          const input = document.getElementById(`status-${requestIds[0]}`) as HTMLInputElement;
          if (input) {
            input.value = value;
            input.form?.requestSubmit();
          }
        }}
      >
        <SelectTrigger
          className={`border text-sm font-bold ${
            currentStatus === "BORROWED"
              ? "border-poppy-red/40 bg-poppy-red/10 text-poppy-red"
              : currentStatus === "PENDING"
                ? "border-marigold-yellow/40 bg-marigold-yellow/20 text-midnight-ink"
                : "border-emerald-400 bg-emerald-50 text-emerald-700"
          }`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PENDING">PENDING</SelectItem>
          {(currentStatus === "PENDING" || currentStatus === "BORROWED") && (
            <SelectItem value="BORROWED">BORROWED</SelectItem>
          )}
          {currentStatus !== "RETURNED" && (
            <SelectItem value="RETURNED">RETURNED</SelectItem>
          )}
        </SelectContent>
      </Select>
    </form>
  );
}
