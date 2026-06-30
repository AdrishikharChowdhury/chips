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
import { eq } from "drizzle-orm"
import { StatusDropdown } from "./StatusDropdown"

export async function RequestTable() {
  const requests = await db
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

  return (
    <div className="bg-cream-paper">
      <Table className="[&_td]:p-4 [&_th]:p-4">
        <TableCaption className="text-sm text-midnight-ink/40 border-t border-midnight-ink/10 py-3">
          Total of {requests.length} requests
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
          {requests.map((req, idx) => (
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
                  <StatusDropdown requestId={req.id} currentStatus={req.status} />
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
              {requests.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
