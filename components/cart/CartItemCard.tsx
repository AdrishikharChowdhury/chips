"use client";

import Image from "next/image";
import Link from "next/link";
import { removeFromCart } from "@/lib/actions/component";
import { Trash } from "lucide-react";

interface CartItemCardProps {
  id: string;
  componentId: string;
  componentTitle: string | null;
  componentManufacturer: string | null;
  componentCover: string | null;
  componentType: string | null;
  amount: number;
  setAmount: (val: number) => void;
}

export function CartItemCard({
  id,
  componentId,
  componentTitle,
  componentManufacturer,
  componentCover,
  componentType,
  amount,
  setAmount,
}: CartItemCardProps) {
  const typeArray = componentType?.split("/") ?? [];

  return (
    <div className="flex flex-col gap-4 rounded-2xl border-2 border-midnight-ink/10 bg-cream-paper p-4 md:flex-row md:items-center">
      <div className="relative flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-midnight-ink/5">
        {componentCover ? (
          <Image
            src={componentCover}
            alt={componentTitle ?? ""}
            width={112}
            height={112}
            className="size-full object-contain"
          />
        ) : (
          <div className="size-12 rounded-full bg-midnight-ink/10" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <Link
          href={`/components/${componentId}`}
          className="text-lg font-bold text-midnight-ink hover:text-cobalt-blue"
        >
          {componentTitle}
        </Link>
        <p className="text-sm text-midnight-ink/60">{componentManufacturer}</p>
        <div className="mt-1 flex flex-wrap gap-2">
          {typeArray.map((t, i) => (
            <span
              key={i}
              className="rounded-full border border-cobalt-blue/30 bg-cobalt-blue/10 px-2.5 py-0.5 text-xs font-semibold text-cobalt-blue"
            >
              {t.trim()}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap text-sm font-semibold text-midnight-ink/40 uppercase tracking-wider">
            Amount
          </span>
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setAmount(Math.max(1, amount - 1))}
              className="flex size-8 items-center justify-center rounded-full border-2 border-midnight-ink/20 text-lg font-bold text-midnight-ink/60 hover:border-midnight-ink/40 hover:text-midnight-ink"
            >
              −
            </button>
            <span className="flex size-10 items-center justify-center rounded-full bg-cobalt-blue text-xs font-bold text-white">
              {amount}
            </span>
            <button
              onClick={() => setAmount(amount + 1)}
              className="flex size-8 items-center justify-center rounded-full border-2 border-midnight-ink/20 text-lg font-bold text-midnight-ink/60 hover:border-midnight-ink/40 hover:text-midnight-ink"
            >
              +
            </button>
          </div>
        </div>

        <form action={removeFromCart.bind(null, id)} className="shrink-0">
          <button
            type="submit"
            className="flex size-10 items-center justify-center rounded-full bg-poppy-red/15 text-poppy-red hover:bg-poppy-red/25"
          >
            <Trash />
          </button>
        </form>
      </div>
    </div>
  );
}
