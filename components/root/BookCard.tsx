import { cn } from "@/lib/utils";
import { Components } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function BookCard({
  id,
  title,
  genre,
  cover,
  isLoaned = false,
}: Components) {
  return (
    <li className={cn(isLoaned && "w-full")}>
      <Link
        href={`/books/${id}`}
        className={cn(
          "group flex flex-col items-center rounded-2xl border-2 border-midnight-ink/10 bg-cream-paper transition-colors hover:border-cobalt-blue min-h-140",
          isLoaned && "w-full flex-col items-center"
        )}
      >
        <div className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-midnight-ink/5 p-4">
          <Image
            src={cover}
            alt={title}
            width={280}
            height={400}
            className="h-80 w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
        <div className={cn("mt-4 w-full text-center", !isLoaned && "xs:max-w-60 max-w-36")}>
          <p className="text-base font-semibold text-midnight-ink xs:text-lg">{title}</p>
          <p className="mt-1 text-sm italic text-midnight-ink/60 xs:text-base">{genre}</p>
        </div>
        {isLoaned ? (
          <div className="mt-3 w-full space-y-3">
            <div className="book-loaned">
              <Image src="/icons/calendar.svg" alt="calendar" width={18} height={18} className="object-contain" />
              <p className="text-sm text-midnight-ink/60">11 days left to return</p>
            </div>
            <Button className="w-full bg-cobalt-blue text-cream-paper hover:bg-cobalt-blue/90">
              Download Receipt
            </Button>
          </div>
        ):(<Button className="w-full bg-cobalt-blue text-cream-paper hover:bg-cobalt-blue/90 mt-3">
          Borrow Now
        </Button>)}</div>
      </Link>
    </li>
  );
}
