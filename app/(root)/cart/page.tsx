import { auth } from "@/auth";
import { db } from "@/database";
import { cartItemsTable, componentsTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import CartSection from "@/components/cart/CartSection";

export default async function CartPage() {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <div className="mx-auto max-w-6xl py-20 text-center">
        <p className="text-2xl text-midnight-ink/60">
          You must be logged in to view your cart.
        </p>
      </div>
    );
  }
  const userId = session.user.id;

  const rows = await db
    .select({
      id: cartItemsTable.id,
      componentId: cartItemsTable.componentId,
      componentTitle: componentsTable.title,
      componentManufacturer: componentsTable.manufacturer,
      componentCover: componentsTable.cover,
      componentType: componentsTable.type,
    })
    .from(cartItemsTable)
    .innerJoin(
      componentsTable,
      eq(cartItemsTable.componentId, componentsTable.id),
    )
    .where(eq(cartItemsTable.userId, userId))
    .orderBy(cartItemsTable.createdAt);

  return (
    <div className="mx-auto min-w-full w-7xl space-y-10 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-midnight-ink md:text-5xl">
          Cart
        </h1>
        <span className="rounded-full border-2 border-midnight-ink/20 px-4 py-1.5 text-sm font-semibold text-midnight-ink/60">
          {rows.length} {rows.length === 1 ? "item" : "items"}
        </span>
      </div>

      {rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-midnight-ink/5">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-midnight-ink/30"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <p className="text-2xl font-semibold text-midnight-ink/40">
            Your cart is empty
          </p>
          <Link
            href="/components"
            className="mt-4 inline-flex items-center gap-2 text-cobalt-blue hover:underline"
          >
            Browse components
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 4L10 8L6 12" />
            </svg>
          </Link>
        </div>
      ) : (
        <CartSection rows={rows} />
      )}
    </div>
  );
}
