import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { db } from "@/database"
import { borrowRecords, componentsTable, usersTable } from "@/database/schema"
import { eq, inArray } from "drizzle-orm"
import { GroupStatusDropdown } from "./GroupStatusDropdown"

interface GroupedRequest {
  id: string
  userId: string
  componentId: string
  amount: number
  borrowDate: Date | null
  dueDate: string | null
  returnDate: string | null
  status: string
  userFullName: string
  userEmail: string
  componentTitle: string
  recordIds: string[]
}

export async function RequestTable() {
  const rawRecords = await db
    .select({
      id: borrowRecords.id,
      userId: borrowRecords.userId,
      componentId: borrowRecords.componentId,
      amount: borrowRecords.amount,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      returnDate: borrowRecords.returnDate,
      status: borrowRecords.status,
      userFullName: usersTable.fullName,
      userEmail: usersTable.email,
      componentTitle: componentsTable.title,
      componentManufacturer: componentsTable.manufacturer,
      componentCover: componentsTable.cover,
      componentType: componentsTable.type,
    })
    .from(borrowRecords)
    .innerJoin(usersTable, eq(borrowRecords.userId, usersTable.id))
    .innerJoin(componentsTable, eq(borrowRecords.componentId, componentsTable.id))
    .orderBy(borrowRecords.createdAt)

  const groups = new Map<string, typeof rawRecords>()

  for (const record of rawRecords) {
    const key = `${record.componentId}|${record.userId}`
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(record)
  }

  const toUpdate: string[] = []

  for (const [, group] of groups) {
    const returnedCount = group.filter((r) => r.status === "RETURNED").length
    if (returnedCount >= 2) {
      const nonReturned = group.filter((r) => r.status !== "RETURNED").map((r) => r.id)
      toUpdate.push(...nonReturned)
    }
  }

  if (toUpdate.length > 0) {
    await db
      .update(borrowRecords)
      .set({ status: "RETURNED", returnDate: new Date().toISOString().slice(0, 10) })
      .where(inArray(borrowRecords.id, toUpdate))
  }

  const aggregated: GroupedRequest[] = Array.from(groups.entries()).map(([, records]) => {
    const first = records[0]
    const totalAmount = records.reduce((sum, r) => sum + r.amount, 0)
    const hasNonReturned = records.some((r) => r.status !== "RETURNED")
    const status = hasNonReturned
      ? records.find((r) => r.status !== "RETURNED")!.status
      : "RETURNED"
    const borrowDates = records.map((r) => r.borrowDate).filter(Boolean) as Date[]
    const dueDates = records.map((r) => r.dueDate).filter(Boolean) as string[]
    const returnDates = records.map((r) => r.returnDate).filter(Boolean) as string[]

    return {
      id: first.id,
      userId: first.userId,
      componentId: first.componentId,
      amount: totalAmount,
      borrowDate: borrowDates.length > 0 ? borrowDates.sort((a, b) => a.getTime() - b.getTime())[0] : null,
      dueDate: dueDates.length > 0 ? dueDates.sort().reverse()[0] : null,
      returnDate: returnDates.length > 0 ? returnDates.sort().reverse()[0] : null,
      status,
      userFullName: first.userFullName,
      userEmail: first.userEmail,
      componentTitle: first.componentTitle,
      recordIds: records.map((r) => r.id),
    }
  })

  aggregated.sort((a, b) => {
    if (!a.borrowDate) return 1
    if (!b.borrowDate) return -1
    return b.borrowDate.getTime() - a.borrowDate.getTime()
  })

  return (
    <div className="bg-cream-paper">
      <Table className="[&_td]:p-4 [&_th]:p-4">
        <TableCaption className="text-sm text-midnight-ink/40 border-t border-midnight-ink/10 py-3">
          Total of {aggregated.length} groups
        </TableCaption>
        <TableHeader>
          <TableRow className="border-b-2 border-midnight-ink/10 hover:bg-transparent">
            <TableHead className="w-14 text-xs font-bold uppercase tracking-wider text-midnight-ink/50">
              #
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              User
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              Component
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              Amount
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              Borrow Date
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              Due Date
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              Return Date
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {aggregated.map((req, idx) => (
            <TableRow
              key={req.id}
              className="border-b border-midnight-ink/5 hover:bg-midnight-ink/5 transition-colors"
            >
              <TableCell className="font-mono text-sm text-midnight-ink/40 font-semibold">
                {String(idx + 1).padStart(2, "0")}
              </TableCell>
              <TableCell>
                <div>
                  <p className="text-sm font-bold text-midnight-ink">{req.userFullName}</p>
                  <p className="text-xs text-midnight-ink/50">{req.userEmail}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-midnight-ink">{req.componentTitle}</p>
                </div>
              </TableCell>
              <TableCell className="text-sm font-semibold text-midnight-ink">
                {req.amount}
              </TableCell>
              <TableCell className="text-sm text-midnight-ink/70">
                {req.borrowDate
                  ? new Date(req.borrowDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "—"}
              </TableCell>
              <TableCell className="text-sm text-midnight-ink/70">
                {req.dueDate
                  ? new Date(req.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "—"}
              </TableCell>
              <TableCell className="text-sm text-midnight-ink/70">
                {req.returnDate
                  ? new Date(req.returnDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "—"}
              </TableCell>
              <TableCell>
                {req.status === "RETURNED" ? (
                  <span className="inline-block border border-emerald-400 bg-emerald-50 px-2 py-0.5 text-sm font-bold text-emerald-700">
                    RETURNED
                  </span>
                ) : (
                  <GroupStatusDropdown requestIds={req.recordIds} currentStatus={req.status} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="border-t-2 border-midnight-ink/10 bg-transparent hover:bg-transparent">
            <TableCell colSpan={7} className="text-sm font-semibold text-midnight-ink/50">
              Total
            </TableCell>
            <TableCell className="text-right font-bold text-midnight-ink">
              {aggregated.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
