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
import { componentsTable } from "@/database/schema"
import { deleteComponent } from "@/lib/actions/component"
import Image from "next/image"
import { Pencil, Trash } from "lucide-react"

export async function ComponentTable() {
  const components = await db.select().from(componentsTable)

  return (
    <div className="bg-cream-paper">
      <Table>
        <TableCaption className="text-sm text-midnight-ink/40 border-t border-midnight-ink/10 py-3">
          Total of {components.length} components
        </TableCaption>
        <TableHeader>
          <TableRow className="border-b-2 border-midnight-ink/10 hover:bg-transparent">
            <TableHead className="w-14 text-xs font-bold uppercase tracking-wider text-midnight-ink/50">
              #
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              Component
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              Manufacturer
            </TableHead>
            <TableHead className="text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              Type
            </TableHead>
            <TableHead className="text-right text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              Created
            </TableHead>
            <TableHead className="text-right text-sm font-bold uppercase tracking-wider text-midnight-ink/50">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {components.map((component, idx) => {
            const typeArray = component.type.split("/")
            return (
              <TableRow
                key={component.id}
                className="border-b border-midnight-ink/5 hover:bg-midnight-ink/5 transition-colors"
              >
                <TableCell className="font-mono text-sm text-midnight-ink/40 font-semibold">
                  {String(idx + 1).padStart(2, "0")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden bg-midnight-ink/5">
                      <Image
                        src={component.cover}
                        alt={component.title}
                        width={56}
                        height={56}
                        className="size-full object-contain"
                      />
                    </div>
                    <p className="text-base font-bold text-midnight-ink">{component.title}</p>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-semibold text-midnight-ink/70">
                  {component.manufacturer}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {typeArray.map((t, i) => (
                      <span
                        key={i}
                        className="inline-block border border-cobalt-blue/30 bg-cobalt-blue/10 px-2 py-0.5 text-sm font-semibold text-cobalt-blue"
                      >
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right text-sm font-semibold text-midnight-ink/50">
                  {component.createdAt
                    ? new Date(component.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="flex size-9 items-center justify-center border-2 border-cobalt-blue/30 text-cobalt-blue hover:bg-cobalt-blue hover:text-cream-paper transition-colors">
                      <Pencil size={16} />
                    </button>
                    <form action={deleteComponent.bind(null, component.id)}>
                      <button
                        type="submit"
                        className="flex size-9 items-center justify-center border-2 border-poppy-red/30 text-poppy-red hover:bg-poppy-red hover:text-cream-paper transition-colors"
                      >
                        <Trash size={16} />
                      </button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow className="border-t-2 border-midnight-ink/10 bg-transparent hover:bg-transparent">
            <TableCell colSpan={5} className="text-sm font-semibold text-midnight-ink/50">
              Total
            </TableCell>
            <TableCell className="text-right font-bold text-midnight-ink">
              {components.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
