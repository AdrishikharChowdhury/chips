"use client";

import { Components } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Star } from "@phosphor-icons/react";

export default function ComponentCard({
  id,
  title,
  manufacturer,
  type,
  cover,
  rating,
  availableCopies,
  totalCopies,
}: Components) {
  const router = useRouter();
  const typeArray = type.split("/");

  return (
    <li className="flex">
      <div className="flex w-full flex-col overflow-hidden border-2 border-midnight-ink/10 bg-cream-paper transition-colors hover:border-cobalt-blue/40">
        <Link
          href={`/components/${id}`}
          className="group flex flex-col"
        >
          <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden bg-midnight-ink/3">
            <Image
              src={cover}
              alt={title}
              width={320}
              height={240}
              className="size-full object-contain"
            />
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-marigold-yellow/40 bg-cream-paper px-2.5 py-1 text-xs font-bold text-midnight-ink">
              <Star weight="fill" className="size-3 text-marigold-yellow" />
              {rating}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-midnight-ink/40">
              {manufacturer}
            </p>
            <h3 className="font-degular-display text-xl font-bold leading-tight text-midnight-ink">
              {title}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {typeArray.map((t, i) => (
                <span
                  key={i}
                  className="rounded-full border border-poppy-red/30 bg-poppy-red/8 px-2.5 py-0.5 text-[11px] font-semibold text-poppy-red"
                >
                  {t.trim()}
                </span>
              ))}
            </div>
            <p className="mt-auto text-xs text-midnight-ink/40">
              {availableCopies}/{totalCopies} available
            </p>
          </div>
        </Link>

        <div className="border-t border-midnight-ink/10 px-4 py-3 flex justify-between flex-row-reverse">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/components/borrow/${id}`);
            }}
            className="w-fit bg-cobalt-blue text-xs font-bold text-cream-paper hover:bg-cobalt-blue/90"
          >
            Borrow Component
          </Button>
          <Button className="w-fit bg-poppy-red text-xs font-bold text-cream-paper hover:bg-marigold-yellow/90" >Add To Cart</Button>
        </div>
      </div>
    </li>
  );
}
