import Image from "next/image";
import type { Components } from "../../types";
import { Button } from "../ui/button";
import Link from "next/link";

export default function ComponentOverview({
  title,
  manufacturer,
  description,
  type,
  rating,
  totalCopies,
  availableCopies,
  cover,
  userId,
}: Components & { userId: string }) {
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1 className="">{title}</h1>
        <div className="book-info">
          <p className="font-semibold">
            By <span className="">{manufacturer}</span>
          </p>
          <p>
            Category: <span className="">{type}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Image
              src="/icons/star.svg"
              alt="star"
              width={22}
              height={22}
              className=""
            />
            <p>{rating}</p>
          </div>
        </div>
        <div className="book-copies">
          <p>
            Total Count: <span className="">{totalCopies}</span>
          </p>
          <p>
            Available Count: <span className="">{availableCopies}</span>
          </p>
        </div>
        <p className="book-description">{description}</p>
        <Link href={`/api/borrow/${userId}`}>
          <Button className="book-overview_btn">
            <Image
              src="/icons/component.svg"
              alt="book"
              width={20}
              height={20}
              className="invert-100"
            />
            <p className="font-degular-display text-xl">Borrow Component</p>
          </Button>
        </Link>
      </div>
      <div className="relative flex flex-1 justify-center items-center rounded-4xl h-140 overflow-hidden">
        <Image
          src={cover}
          alt={title}
          width={300}
          height={450}
          className="h-full w-full object-contain rounded-2xl"
        />
      </div>
    </section>
  );
}
