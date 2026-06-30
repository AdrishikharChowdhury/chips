import { auth } from "@/auth";
import Link from "next/link";
import { ComponentPagination } from "@/components/root/ComponentPagination";
import { BorrowCard } from "@/components/borrow/BorrowCard";
import { fetchBorrowedComponents } from "@/lib/actions/component";

export default async function BorrowPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const perPage = 3;
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <div className="mx-auto max-w-6xl py-20 text-center">
        <p className="text-2xl text-midnight-ink/60">You must be logged in to view borrowed components.</p>
      </div>
    );
  }
  const rows = await fetchBorrowedComponents();

  const records = rows.reduce<Record<string, Omit<(typeof rows)[number], "borrowDate" | "amount"> & { borrowDate: Date | null; amount: number }>>((acc, row) => {
    const key = row.componentId;
    if (!acc[key]) {
      acc[key] = { ...row, amount: 0, borrowDate: row.borrowDate };
    }
    acc[key].amount += row.amount ?? 1;
    return acc;
  }, {});

  const allUnique = Object.values(records);
  const totalPages = Math.ceil(allUnique.length / perPage);
  const start = (currentPage - 1) * perPage;
  const paginatedRecords = allUnique.slice(start, start + perPage);

  return (
    <div className="mx-auto max-w-8xl w-7xl min-w-full space-y-10 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-midnight-ink md:text-5xl">
          My Borrowed Components
        </h1>
        <span className="rounded-full border-2 border-midnight-ink/20 px-4 py-1.5 text-sm font-semibold text-midnight-ink/60">
          {allUnique.length} {allUnique.length === 1 ? "type" : "types"}
        </span>
      </div>

      {allUnique.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="size-24 rounded-full bg-midnight-ink/5 flex items-center justify-center mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-midnight-ink/30">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-2xl font-semibold text-midnight-ink/40">No components borrowed yet</p>
          <Link
            href="/components"
            className="mt-4 inline-flex items-center gap-2 text-cobalt-blue hover:underline"
          >
            Browse components
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 4L10 8L6 12" />
            </svg>
          </Link>
        </div>
      ) : (
        <div className="grid w-full gap-6">
          {paginatedRecords.map((record) => (
            <BorrowCard key={record.id} {...record} />
          ))}
        </div>
      )}
      <ComponentPagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/components/borrow"
      />
    </div>
  );
}
