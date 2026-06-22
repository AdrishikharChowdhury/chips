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
        href={`/components/${id}`}
        className={cn(
          "group flex flex-col items-center rounded-t-4xl border-2 border-midnight-ink/10 bg-cream-paper min-h-125 justify-between",
          isLoaned && "w-full flex-col items-center overflow-hidden",
        )}
      >
        <div className="flex w-full items-center justify-center rounded-t-4xl bg-midnight-ink/5 overflow-hidden">
          <Image
            src={cover}
            alt={title}
            width={280}
            height={400}
            className="h-80 w-full overflow-hidden object-center rounded-t-2xl"
          />
        </div>
        <div className="pb-4 flex flex-col items-start">
          <div
            className={cn(
              "w-full text-center",
              !isLoaned && "xs:max-w-60 max-w-36",
            )}
          >
            <p className="text-base font-semibold text-midnight-ink xs:text-lg">
              {title}
            </p>
            <p className="text-sm italic text-midnight-ink/60 xs:text-base">
              {genre}
            </p>
          </div>

          <div className="mt-3 w-full flex flex-col items-center space-y-3">
            {isLoaned ? (
              <>
                <div className="book-loaned">
                  <Image
                    src="/icons/calendar.svg"
                    alt="calendar"
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                  <p className="text-sm text-midnight-ink/60">
                    11 days left to return
                  </p>
                </div>
                <Button className="text-md py-6 px-8 w-full bg-cobalt-blue text-cream-paper hover:bg-cobalt-blue/90 space-x-2">
                  <Image src="/icons/receipt.svg" alt="download" width={100} height={100} className="object-contain size-20" />
                  <p>Download Receipt</p>
                </Button>
              </>
            ) : (
                <Button className="text-md py-6 px-8 bg-poppy-red text-cream-paper hover:bg-poppy-red/90 mt-3">
                  <Image src="/icons/component.svg" alt="borrow" width={100} height={100} className="object-contain size-20 invert-100" />
                <p>Borrow Now</p>
              </Button>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
}
