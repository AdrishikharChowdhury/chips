"use client";

import React, { useState } from "react";
import { CartItemCard } from "./CartItemCard";
import { CartList } from "./CartList";
import { Button } from "../ui/button";
import { borrowComponent, clearCart } from "@/lib/actions/component";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface CartRow {
  id: string;
  componentId: string;
  componentTitle: string;
  componentManufacturer: string;
  componentCover: string;
  componentType: string;
}

export interface CartSectionProps {
  rows: CartRow[];
}

export default function CartSection({ rows }: CartSectionProps) {
  const router = useRouter();
  const [amounts, setAmounts] = useState<Record<string, number>>({});
  const [date, setDate] = React.useState<Date>();
  const [loading, setLoading] = useState(false);

  const getAmount = (id: string) => amounts[id] ?? 1;

  const setAmount = (id: string, value: number) => {
    setAmounts((prev) => ({ ...prev, [id]: Math.max(1, value) }));
  };

  const handleBorrowAll = async () => {
    if (!date) {
      toast.error("Please select a due date.");
      return;
    }
    setLoading(true);

    const results: { success: boolean; message: string }[] = [];
    for (const row of rows) {
      const result = await borrowComponent({
        componentId: row.componentId,
        dueDate: date,
        amount: getAmount(row.id),
      });
      results.push(result);
      if (!result?.success) break;
    }

    const allSuccess = results.every((r) => r?.success);
    if (allSuccess) {
      await clearCart();
      toast.success("All components borrowed successfully.");
      router.push("/components/borrow");
    } else {
      const failed = results.find((r) => !r?.success);
      toast.error(failed?.message ?? "An error occurred.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-4">
        <div className="col-span-3 w-full pr-8 flex flex-col gap-4">
          {rows.map((row) => (
            <CartItemCard
              key={row.id}
              amount={getAmount(row.id)}
              setAmount={(val: number) => setAmount(row.id, val)}
              {...row}
            />
          ))}
        </div>
        <div className="col-span-1 pl-4 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-semibold text-midnight-ink">
              Cart Total
            </h3>
            <div className="flex flex-col gap-4">
              {rows.map((row) => (
                <CartList key={row.id} amount={getAmount(row.id)} {...row} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <span className="text-sm font-semibold text-midnight-ink/40 uppercase tracking-wider">
              Till Date:
            </span>
            <span className="text-midnight-ink/60">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className="w-45 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
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
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleBorrowAll}
          disabled={loading}
          className="text-xl font-extrabold py-6 px-8"
        >
          {loading ? "Borrowing..." : "Borrow All"}
        </Button>
      </div>
    </div>
  );
}
