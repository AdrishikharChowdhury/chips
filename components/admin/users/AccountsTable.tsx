import Image from "next/image"
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
import { fetchNonPendingAccounts, deleteUser } from "@/lib/actions/user"
import { RoleDropdown } from "./RoleDropdown"
import { ImagePopover } from "../accountrequests/ImagePopover"
import { Trash } from "lucide-react"

export async function AccountsTable() {
  const accounts = await fetchNonPendingAccounts()

  return (
    <div className="bg-cream-paper">
      <Table className="[&_td]:p-4 [&_th]:p-4">
        <TableCaption className="text-sm text-midnight-ink/40 border-t border-midnight-ink/10 py-3">
          Total of {accounts.length} accounts
        </TableCaption>
        <TableHeader>
          <TableRow className="border-b-2 border-midnight-ink/10 hover:bg-transparent">
            <TableHead className="w-14 text-xs font-bold uppercase tracking-wider text-midnight-ink/50">
              #
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              Name
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              University ID
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              ID Card
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              Role
            </TableHead>
            <TableHead className="text-right text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              Borrowed
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              Date Joined
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              Last Activity
            </TableHead>
            <TableHead className="text-right text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((acc, idx) => (
            <TableRow
              key={acc.id}
              className="border-b border-midnight-ink/5 hover:bg-midnight-ink/5 transition-colors"
            >
              <TableCell className="font-mono text-sm text-midnight-ink/40 font-semibold">
                {String(idx + 1).padStart(2, "0")}
              </TableCell>
              <TableCell className="flex gap-2 items-center">
                <Image src={acc.universityCard} alt={`${acc.fullName}'s university card`} width={56} height={56} className="size-14 rounded-full" />
                <p className="text-sm font-bold text-midnight-ink">{acc.fullName}</p>
              </TableCell>
              <TableCell className="text-sm text-midnight-ink/70 text-center" >
                {acc.universityId}
              </TableCell>
              <TableCell>
                <ImagePopover src={acc.universityCard} alt={`${acc.fullName}'s university card`}>
                  <button className="text-sm font-semibold text-cobalt-blue underline underline-offset-2 hover:text-cobalt-blue/70 transition-colors cursor-pointer">
                    View Card
                  </button>
                </ImagePopover>
              </TableCell>
              <TableCell>
                <RoleDropdown userId={acc.id} currentRole={acc.role} />
              </TableCell>
              <TableCell className="text-right text-sm font-semibold text-midnight-ink">
                {acc.borrowedCount}
              </TableCell>
              <TableCell className="text-sm text-midnight-ink/70">
                {acc.createdAt
                  ? new Date(acc.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—"}
              </TableCell>
              <TableCell className="text-sm text-midnight-ink/70">
                {acc.lastActivityDate
                  ? new Date(acc.lastActivityDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—"}
              </TableCell>
              <TableCell className="text-right">
                <form action={deleteUser.bind(null, acc.id)}>
                  <button
                    type="submit"
                    className="flex size-9 items-center justify-center border-2 border-poppy-red/30 text-poppy-red hover:bg-poppy-red hover:text-cream-paper transition-colors"
                  >
                    <Trash size={16} />
                  </button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="border-t-2 border-midnight-ink/10 bg-transparent hover:bg-transparent">
            <TableCell colSpan={8} className="text-sm font-semibold text-midnight-ink/50">
              Total
            </TableCell>
            <TableCell className="text-right font-bold text-midnight-ink">
              {accounts.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
