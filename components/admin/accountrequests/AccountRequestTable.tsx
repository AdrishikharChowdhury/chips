import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  fetchPendingAccountRequests,
  approveAccountRequest,
  rejectAccountRequest,
} from "@/lib/actions/user";
import { ImagePopover } from "./ImagePopover";
import { Check, X } from "lucide-react";

export async function AccountRequestTable() {
  const requests = await fetchPendingAccountRequests();

  return (
    <div className="bg-cream-paper">
      <Table className="[&_td]:p-4 [&_th]:p-4">
        <TableCaption className="text-sm text-midnight-ink/40 border-t border-midnight-ink/10 py-3">
          Total of {requests.length} pending requests
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
              Email
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              University ID
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              University Card
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              Status
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
          {requests.map((req, idx) => (
            <TableRow
              key={req.id}
              className="border-b border-midnight-ink/5 hover:bg-midnight-ink/5 transition-colors"
            >
              <TableCell className="font-mono text-sm text-midnight-ink/40 font-semibold">
                {String(idx + 1).padStart(2, "0")}
              </TableCell>
              <TableCell>
                <p className="text-sm font-bold text-midnight-ink">
                  {req.fullName}
                </p>
              </TableCell>
              <TableCell className="text-sm text-midnight-ink/70">
                {req.email}
              </TableCell>
              <TableCell className="text-center" >{req.universityId}</TableCell>
              <TableCell>
                <ImagePopover src={req.universityCard} alt={`${req.fullName}'s university card`}>
                  <button className="flex items-center gap-2 cursor-pointer">
                    <span className="text-sm font-semibold text-cobalt-blue underline underline-offset-2 hover:text-cobalt-blue/70 transition-colors">
                      View Card
                    </span>
                  </button>
                </ImagePopover>
              </TableCell>
              <TableCell>
                <span className="inline-block border border-marigold-yellow/40 bg-marigold-yellow/20 px-2 py-0.5 text-sm font-bold text-midnight-ink">
                  PENDING
                </span>
              </TableCell>
              <TableCell className="text-sm text-midnight-ink/70">
                {req.createdAt
                  ? new Date(req.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—"}
              </TableCell>
              <TableCell className="text-sm text-midnight-ink/70">
                {req.lastActivityDate
                  ? new Date(req.lastActivityDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <form action={approveAccountRequest.bind(null, req.id)}>
                    <button
                      type="submit"
                      className="flex size-9 items-center justify-center border-2 border-emerald-400/30 text-emerald-600 hover:bg-emerald-600 hover:text-cream-paper transition-colors"
                    >
                      <Check size={16} />
                    </button>
                  </form>
                  <form action={rejectAccountRequest.bind(null, req.id)}>
                    <button
                      type="submit"
                      className="flex size-9 items-center justify-center border-2 border-poppy-red/30 text-poppy-red hover:bg-poppy-red hover:text-cream-paper transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </form>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="border-t-2 border-midnight-ink/10 bg-transparent hover:bg-transparent">
            <TableCell
              colSpan={8}
              className="text-sm font-semibold text-midnight-ink/50"
            >
              Total
            </TableCell>
            <TableCell className="text-right font-bold text-midnight-ink">
              {requests.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
