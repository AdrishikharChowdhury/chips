"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface ComponentPaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string
}

export function ComponentPagination({ currentPage, totalPages, basePath = "/components" }: ComponentPaginationProps) {
  if (totalPages <= 1) return null

  const buildHref = (page: number) => page === 1 ? basePath : `${basePath}?page=${page}`

  const pages: (number | "ellipsis")[] = []
  const delta = 1
  const left = Math.max(2, currentPage - delta)
  const right = Math.min(totalPages - 1, currentPage + delta)

  pages.push(1)
  if (left > 2) pages.push("ellipsis")
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < totalPages - 1) pages.push("ellipsis")
  if (totalPages > 1) pages.push(totalPages)

  return (
    <Pagination>
      <PaginationContent className="gap-1">
        <PaginationItem>
          <PaginationPrevious
            href={buildHref(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            className={`border-2 text-sm font-bold uppercase tracking-wider ${
              currentPage <= 1
                ? "pointer-events-none border-midnight-ink/10 text-midnight-ink/20"
                : "border-midnight-ink/20 text-midnight-ink/60 hover:border-midnight-ink/40 hover:text-midnight-ink"
            }`}
          />
        </PaginationItem>
        {pages.map((page, idx) =>
          page === "ellipsis" ? (
            <PaginationItem key={`e-${idx}`}>
              <PaginationEllipsis className="text-midnight-ink/30" />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href={buildHref(page)}
                isActive={page === currentPage}
                className={
                  page === currentPage
                    ? "border-2 border-cobalt-blue bg-cobalt-blue font-bold text-cream-paper hover:bg-cobalt-blue hover:text-cream-paper"
                    : "border-2 border-midnight-ink/20 font-semibold text-midnight-ink/60 hover:border-midnight-ink/40 hover:text-midnight-ink"
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            href={buildHref(currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            className={`border-2 text-sm font-bold uppercase tracking-wider ${
              currentPage >= totalPages
                ? "pointer-events-none border-midnight-ink/10 text-midnight-ink/20"
                : "border-midnight-ink/20 text-midnight-ink/60 hover:border-midnight-ink/40 hover:text-midnight-ink"
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
