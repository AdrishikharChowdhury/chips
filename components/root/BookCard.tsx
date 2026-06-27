import { cn } from "@/lib/utils";
import { Components } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function BookCard({
  id,
  title,
  type,
  cover,
  isLoaned = false,
}: Components) {
  const typeArray = type.split("/");
  return (
    <li className={cn(isLoaned && "w-full")}>
      <Link
        href={`/components/${id}`}
        className={cn(
          "group flex flex-col items-center rounded-t-4xl border-2 border-poppy-red/30 hover:border-poppy-red transition-colors duration-200 shadow-xl bg-cream-paper min-h-125 justify-center",
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
        <div className="py-4 flex flex-col items-center w-full justify-center">
          <div
            className={cn(
              "w-full text-center flex flex-col gap-2",
              !isLoaned && "xs:max-w-60 max-w-36",
            )}
          >
            <p className="font-semibold text-midnight-ink text-lg w-max self-center">
              {title}
            </p>
            <div className="text-sm flex gap-4 self-center">
              {typeArray.map((typeItem,idx:number) => (
                <span className="text-midnight-ink font-semibold border-2  border-marigold-yellow bg-marigold-yellow/50 px-3 py-1 w-max text-center " key={idx} >{ typeItem}</span>
              ))}
            </div>
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
                <Button className="text-md py-6 px-8 bg-cobalt-blue text-cream-paper hover:bg-cobalt-blue/90 space-x-2 w-fit">
                  <Image src="/icons/receipt.svg" alt="download" width={100} height={100} className="object-contain size-20" />
                  <p>Download Receipt</p>
                </Button>
              </>
            ) : (
                <Button className="text-md py-6 px-8 bg-poppy-red text-cream-paper hover:bg-poppy-red/90 mt-3 mb-5">
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
