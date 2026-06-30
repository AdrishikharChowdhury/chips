import { auth } from "@/auth";
import { db } from "@/database";
import { eq } from "drizzle-orm";
import { borrowRecords, componentsTable } from "@/database/schema";
import Image from "next/image";
import Link from "next/link";
import { ComponentPagination } from "@/components/root/ComponentPagination";

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
  const { id: userId } = session.user;

  const rows = await db
    .select({
      id: borrowRecords.id,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      status: borrowRecords.status,
      componentId: borrowRecords.componentId,
      componentTitle: componentsTable.title,
      componentManufacturer: componentsTable.manufacturer,
      componentCover: componentsTable.cover,
      componentType: componentsTable.type,
    })
    .from(borrowRecords)
    .innerJoin(componentsTable, eq(borrowRecords.componentId, componentsTable.id))
    .where(eq(borrowRecords.userId, userId))
    .orderBy(borrowRecords.createdAt);

  const records = rows.reduce<Record<string, Omit<(typeof rows)[number], "borrowDate"> & { borrowDate: Date | null; count: number }>>((acc, row) => {
    const key = row.componentId;
    if (!acc[key]) {
      acc[key] = { ...row, count: 0 };
    }
    acc[key].count += 1;
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
          {allUnique.length} {allUnique.length === 1 ? "component" : "components"}
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
          {paginatedRecords.map((record) => {
            const typeArray = record.componentType?.split("/") ?? [];
            return (
              <div
                key={record.id}
                className="flex flex-col gap-4 rounded-2xl border-2 border-midnight-ink/10 bg-cream-paper p-4 md:flex-row md:items-center"
              >
                <div className="relative flex size-36 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-midnight-ink/5">
                    {record.componentCover ? (
                      <Image
                        src={record.componentCover}
                        alt={record.componentTitle ?? ""}
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
                    href={`/components/${record.componentId}`}
                    className="text-lg font-bold text-midnight-ink hover:text-cobalt-blue"
                  >
                    {record.componentTitle}
                  </Link>
                  <p className="text-sm text-midnight-ink/60">
                    {record.componentManufacturer}
                  </p>
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
                      {record.borrowDate
                        ? new Date(record.borrowDate).toLocaleDateString("en-US", {
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
                      {record.dueDate
                        ? new Date(record.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-midnight-ink/40 uppercase tracking-wider">
                      Status
                    </p>
                    <span
                      className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold ${
                        record.status === "BORROWED"
                          ? "bg-marigold-yellow/30 text-midnight-ink"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {record.status}
                    </span>
                  </div>
                  {record.count > 1 && (
                    <span className="flex size-10 items-center justify-center rounded-full  bg-cobalt-blue text-xs font-bold text-white">
                      {record.count}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
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
