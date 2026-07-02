"use client";

import { updateUserRole } from "@/lib/actions/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RoleDropdownProps {
  userId: string;
  currentRole: string;
}

export function RoleDropdown({ userId, currentRole }: RoleDropdownProps) {
  return (
    <form action={updateUserRole.bind(null, userId)} className="inline-block">
      <input type="hidden" name="role" id={`role-${userId}`} />
      <Select
        defaultValue={currentRole}
        onValueChange={(value) => {
          const input = document.getElementById(`role-${userId}`) as HTMLInputElement;
          if (input) {
            input.value = value;
            input.form?.requestSubmit();
          }
        }}
      >
        <SelectTrigger
          className={`border text-xs font-bold ${
            currentRole === "ADMIN"
              ? "border-cobalt-blue/40 bg-cobalt-blue/10 text-cobalt-blue"
              : "border-midnight-ink/20 bg-transparent text-midnight-ink/70"
          }`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USER">USER</SelectItem>
          <SelectItem value="ADMIN">ADMIN</SelectItem>
        </SelectContent>
      </Select>
    </form>
  );
}
