import { auth } from "@/auth";
import { db } from "@/database";
import { cartItemsTable, componentsTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import CartSection from "@/components/cart/CartSection";
import EmptyCart from "@/components/cart/EmptyCart";

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
        <EmptyCart />
      ) : (
        <CartSection rows={rows} />
      )}
    </div>
  );
}
