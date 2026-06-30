"use server";

import { auth } from "@/auth";
import { db } from "@/database";
import {
  borrowRecords,
  cartItemsTable,
  componentsTable,
  usersTable,
} from "@/database/schema";
import { BorrowComponentParams, CartItem, Components } from "@/types";
import { formatDate } from "date-fns";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, count, desc } from "drizzle-orm";

export const borrowComponent = async (params: BorrowComponentParams) => {
  const session = await auth();
  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  const userId = session?.user?.id;
  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  const { componentId, dueDate, amount = 1 } = params;
  try {
    const component = await db
      .select({ availableCopies: componentsTable.availableCopies })
      .from(componentsTable)
      .where(eq(componentsTable.id, componentId))
      .limit(1);

    if (!component.length || component[0].availableCopies < amount) {
      return {
        success: false,
        message: `Only ${component[0]?.availableCopies ?? 0} available`,
      };
    }

    const record = await db.insert(borrowRecords).values({
      userId,
      componentId,
      dueDate: formatDate(dueDate, "yyyy-MM-dd"),
      status: "BORROWED",
      amount,
    });
    await db
      .update(componentsTable)
      .set({ availableCopies: component[0].availableCopies - amount })
      .where(eq(componentsTable.id, componentId));

    await db
      .update(usersTable)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(usersTable.id, userId));

    return {
      success: true,
      message: "Component borrowed successfully",
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
};

export const isVerified = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);
  if (!user) return;
  if (user[0].status === "PENDING") {
    return false;
  }
  return true;
};

export const fetchComponents = async (
  page: number = 1,
  perPage: number = 6,
) => {
  const offset = (page - 1) * perPage;
  const [components, countResult] = await Promise.all([
    db.select().from(componentsTable).limit(perPage).offset(offset),
    db.select({ total: count() }).from(componentsTable),
  ]);
  return {
    components: components as Components[],
    totalCount: countResult[0]?.total ?? 0,
  };
};

export const addToCart = async (componentId: string) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;
  try {
    await db.insert(cartItemsTable).values({
      userId,
      componentId,
    });

    return {
      success: true,
      message: "Component added to cart successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
};

export const fetchCartItems = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return [];
  try {
    const cartItems = await db
      .select()
      .from(cartItemsTable)
      .where(eq(cartItemsTable.userId, userId));
    return cartItems as CartItem[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const removeFromCart = async (cartItemId: string) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;
  try {
    await db
      .delete(cartItemsTable)
      .where(eq(cartItemsTable.id, cartItemId));
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/cart");
  redirect("/cart");
};

export const clearCart = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;
  try {
    await db
      .delete(cartItemsTable)
      .where(eq(cartItemsTable.userId, userId));
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/cart");
  redirect("/cart");
};

export const fetchBorrowedComponents = async () => {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  const { id: userId } = session.user;

  const rows = await db
    .select({
      id: borrowRecords.id,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      status: borrowRecords.status,
      amount: borrowRecords.amount,
      componentId: borrowRecords.componentId,
      componentTitle: componentsTable.title,
      componentManufacturer: componentsTable.manufacturer,
      componentCover: componentsTable.cover,
      componentType: componentsTable.type,
    })
    .from(borrowRecords)
    .innerJoin(
      componentsTable,
      eq(borrowRecords.componentId, componentsTable.id),
    )
    .where(eq(borrowRecords.userId, userId))
    .orderBy(desc(borrowRecords.createdAt))
  return rows;
};

export const deleteComponent = async (componentId: string) => {
  const session = await auth();
  if (!session?.user?.id) return;
  try {
    await db
      .delete(componentsTable)
      .where(eq(componentsTable.id, componentId));
    revalidatePath("/admin/components");
  } catch (error) {
    console.log(error);
  }
  redirect("/admin/components");
};