"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Components } from "@/types";
import Image from "next/image";
import { borrowComponent } from "@/lib/actions/component";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export function ComponentBorrowForm({
  component,
  isBorrowerVerified,
}: {
  component: Components;
  isBorrowerVerified?: boolean;
}) {
  const [date, setDate] = React.useState<Date>();
  const { id } = component;
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-midnight-ink/40 uppercase tracking-wider">
          Till Date:
        </span>
        <span className="text-midnight-ink/60">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!date}
                className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                defaultMonth={date}
              />
            </PopoverContent>
          </Popover>
        </span>
      </div>
      <Button
        onClick={async (e) => {
          e.preventDefault();
          if (!date) return;
          if (!isBorrowerVerified) {
            toast.error("You must be verified to borrow a component");
            return;
          }
          const result = await borrowComponent({ componentId: id, dueDate: date });
          if (result.success) {
            toast.success(result.message);
            redirect("/components/borrow")
          } else {
            toast.error(result.message);
          }
        }}
        className="bg-cobalt-blue text-cream-paper hover:bg-cobalt-blue/90 py-6 px-6 text-lg font-degular-display space-x-1 w-fit mt-6"
      >
        <Image
          src="/icons/component.svg"
          alt=""
          width={24}
          height={24}
          className="invert-100"
        />
        <p>Confirm Borrow</p>
      </Button>
    </div>
  );
}
