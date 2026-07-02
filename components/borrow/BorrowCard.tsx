import Image from "next/image";
import Link from "next/link";
import DeleteBorrowRecord from "./DeleteBorrowRecord";

interface BorrowCardProps {
  id: string;
  componentId: string;
  componentTitle: string | null;
  componentManufacturer: string | null;
  componentCover: string | null;
  componentType: string | null;
  borrowDate: Date | null;
  dueDate: string | null;
  status: string | null;
  amount: number;
}

export function BorrowCard({
  id,
  componentId,
  componentTitle,
  componentManufacturer,
  componentCover,
  componentType,
  borrowDate,
  dueDate,
  status,
  amount,
}: BorrowCardProps) {
  const typeArray = componentType?.split("/") ?? [];

  return (
    <div
      key={id}
      className="flex flex-col gap-4 rounded-2xl border-2 border-midnight-ink/10 bg-cream-paper p-4 md:flex-row md:items-center"
    >
      <div className="relative flex size-36 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-midnight-ink/5">
        {componentCover ? (
          <Image
            src={componentCover}
            alt={componentTitle ?? ""}
            width={144}
            height={144}
            className="size-full object-cover"
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
        <div className="flex flex-wrap gap-2 mt-1">
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

      <div className="flex flex-wrap gap-6 md:gap-8">
        <div className="text-center">
          <p className="text-xs font-semibold text-midnight-ink/40 uppercase tracking-wider">
            Borrowed
          </p>
          <p className="text-sm font-bold text-midnight-ink">
            {borrowDate
              ? new Date(borrowDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "—"}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold text-midnight-ink/40 uppercase tracking-wider">
            Due
          </p>
          <p className="text-sm font-bold text-midnight-ink">
            {dueDate
              ? new Date(dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "—"}
          </p>
        </div>
        <div className="text-center space-y-2">
          <p className="text-xs font-semibold text-midnight-ink/40 uppercase tracking-wider">
            Status
          </p>
          <span
            className={`inline-block rounded-full px-3 py-1.5 text-xs font-bold ${
              status === "PENDING"
                ? "bg-marigold-yellow/30 text-midnight-ink"
                : status === "BORROWED"
                  ? "bg-cobalt-blue text-white"
                  : "bg-emerald-100 text-emerald-800"
            }` }
          >
            {status}
          </span>
        </div>
        {amount > 1 && (
          <span className="flex size-10 items-center justify-center rounded-full  bg-cobalt-blue text-xs font-bold text-white">
            {amount}
          </span>
        )}
        {status === "RETURNED" && (
          <DeleteBorrowRecord id={id} />
        )}
      </div>
    </div>
  );
}
