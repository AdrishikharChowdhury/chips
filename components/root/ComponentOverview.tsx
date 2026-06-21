import Image from "next/image";
import type { Components } from "../../types";
import { Button } from "../ui/button";

export default function ComponentOverview({
  title,
  author,
  description,
  genre,
  rating,
  total_copies,
  available_copies,
  cover
}: Components) {
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1 className="">{title}</h1>
        <div className="book-info">
          <p className="font-semibold">
            By <span className="">{author}</span>
          </p>
          <p>
            Category: <span className="">{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} className="" />
            <p>{rating}</p>
          </div>
        </div>
        <div className="book-copies">
          <p>Total Copies: <span className="">{total_copies}</span></p>
          <p>Available Copies: <span className="">{available_copies}</span></p>
        </div>
        <p className="book-description">
          {description}
        </p>
        <Button className="book-overview_btn"> 
          <Image src="/icons/component.svg" alt="book" width={20} height={20} className="invert-100" />
          <p className="font-degular-display text-xl" >Borrow Component</p>
        </Button>
      </div>
      <div className="relative flex flex-1 justify-center items-center rounded-4xl min-h-140">
        <Image src={cover} alt={title} width={200} height={300} className="object-contain min-h-3/4 w-3/4 rounded-2xl" />
      </div>
    </section>
  );
}
