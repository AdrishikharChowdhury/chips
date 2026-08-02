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
import { and, eq, count, desc, inArray, sql } from "drizzle-orm";
import { toast } from "sonner";

async function getAdminSlug() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  const [user] = await db
    .select({ slug: usersTable.universitySlug })
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);
  return user?.slug;
}

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

  const isApproved = await db
    .select({ status: usersTable.status })
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  if (!isApproved) redirect("/");

  if (isApproved[0].status !== "APPROVED") {
    toast.error("You are not approved to borrow components");
    return {
      success: false,
      message: "You are not approved to borrow components",
    };
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

    const [userRow] = await db
      .select({ universitySlug: usersTable.universitySlug })
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    const record = await db.insert(borrowRecords).values({
      userId,
      componentId,
      dueDate: formatDate(dueDate, "yyyy-MM-dd"),
      status: "PENDING",
      amount,
      universitySlug: userRow?.universitySlug ?? "",
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
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { components: [], totalCount: 0 };
  }
  const [user] = await db
    .select({ uniSlug: usersTable.universitySlug })
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);
  const slug = user?.uniSlug;
  if (!slug) {
    return { components: [], totalCount: 0 };
  }
  const offset = (page - 1) * perPage;
  const [components, countResult] = await Promise.all([
    db
      .select()
      .from(componentsTable)
      .where(eq(componentsTable.universitySlug, slug))
      .limit(perPage)
      .offset(offset),
    db
      .select({ total: count() })
      .from(componentsTable)
      .where(eq(componentsTable.universitySlug, slug)),
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
    await db.delete(cartItemsTable).where(eq(cartItemsTable.id, cartItemId));
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
    await db.delete(cartItemsTable).where(eq(cartItemsTable.userId, userId));
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
    .where(and(
      eq(borrowRecords.userId, userId),
      eq(borrowRecords.status, "BORROWED"),
    ))
    .orderBy(desc(borrowRecords.createdAt));
  return rows;
};

export const deleteComponent = async (componentId: string) => {
  const session = await auth();
  if (!session?.user?.id) return;
  const slug = await getAdminSlug();
  if (!slug) return;
  try {
    await db
      .delete(componentsTable)
      .where(and(
        eq(componentsTable.id, componentId),
        eq(componentsTable.universitySlug, slug),
      ));
    revalidatePath("/admin/components");
  } catch (error) {
    console.log(error);
  }
  redirect("/admin/component-requests");
};

export const updateGroupStatus = async (formData: FormData) => {
  const session = await auth();
  if (!session?.user?.id) return;
  const slug = await getAdminSlug();
  if (!slug) return;
  const requestIdsStr = formData.get("requestIds") as string;
  const newStatus = formData.get("status") as string;
  if (
    !requestIdsStr ||
    !newStatus ||
    !["BORROWED", "RETURNED"].includes(newStatus)
  )
    return;
  const requestIds = requestIdsStr.split(",");

  try {
    if (newStatus === "RETURNED") {
      const records = await db
        .select({
          componentId: borrowRecords.componentId,
          amount: borrowRecords.amount,
        })
        .from(borrowRecords)
        .where(and(
          inArray(borrowRecords.id, requestIds),
          eq(borrowRecords.universitySlug, slug),
        ));
      if (records.length) {
        const totalAmount = records.reduce((sum, r) => sum + r.amount, 0);
        await db
          .update(componentsTable)
          .set({
            availableCopies: sql`${componentsTable.availableCopies} + ${totalAmount}`,
          })
          .where(and(
            eq(componentsTable.id, records[0].componentId),
            eq(componentsTable.universitySlug, slug),
          ));
      }
      await db
        .update(borrowRecords)
        .set({
          status: newStatus as "BORROWED" | "RETURNED",
          returnDate: new Date().toISOString().slice(0, 10),
        })
        .where(and(
          inArray(borrowRecords.id, requestIds),
          eq(borrowRecords.universitySlug, slug),
        ));
    } else {
      await db
        .update(borrowRecords)
        .set({ status: newStatus as "BORROWED" | "RETURNED" })
        .where(and(
          inArray(borrowRecords.id, requestIds),
          eq(borrowRecords.universitySlug, slug),
        ));
    }
    revalidatePath("/admin");
    revalidatePath("/admin/component-requests");
    toast.success(`Status updated to ${newStatus}`);
  } catch (error) {
    console.log(error);
  }
};

export const approveRequest = async (requestId: string) => {
  const session = await auth();
  if (!session?.user?.id) return;
  const slug = await getAdminSlug();
  if (!slug) return;
  try {
    await db
      .update(borrowRecords)
      .set({ status: "BORROWED" })
      .where(and(
        eq(borrowRecords.id, requestId),
        eq(borrowRecords.universitySlug, slug),
      ));
    revalidatePath("/admin/component-requests");
  } catch (error) {
    console.log(error);
  }
  redirect("/admin/component-requests");
};

export const rejectRequest = async (requestId: string) => {
  const session = await auth();
  if (!session?.user?.id) return;
  const slug = await getAdminSlug();
  if (!slug) return;
  try {
    await db
      .update(borrowRecords)
      .set({ status: "RETURNED" })
      .where(and(
        eq(borrowRecords.id, requestId),
        eq(borrowRecords.universitySlug, slug),
      ));
    revalidatePath("/admin/component-requests");
  } catch (error) {
    console.log(error);
  }
  redirect("/admin/component-requests");
};

export const returnRequest = async (requestId: string) => {
  const session = await auth();
  if (!session?.user?.id) return;
  const slug = await getAdminSlug();
  if (!slug) return;
  try {
    const record = await db
      .select({
        componentId: borrowRecords.componentId,
        amount: borrowRecords.amount,
      })
      .from(borrowRecords)
      .where(and(
        eq(borrowRecords.id, requestId),
        eq(borrowRecords.universitySlug, slug),
      ))
      .limit(1);

    if (record.length) {
      await db
        .update(componentsTable)
        .set({
          availableCopies: sql`${componentsTable.availableCopies} + ${record[0].amount}`,
        })
        .where(and(
          eq(componentsTable.id, record[0].componentId),
          eq(componentsTable.universitySlug, slug),
        ));
    }

    await db
      .update(borrowRecords)
      .set({
        status: "RETURNED",
        returnDate: new Date().toISOString().slice(0, 10),
      })
      .where(and(
        eq(borrowRecords.id, requestId),
        eq(borrowRecords.universitySlug, slug),
      ));
    revalidatePath("/admin/component-requests");
  } catch (error) {
    console.log(error);
  }
  redirect("/admin/component-requests");
};

export const updateRequestStatus = async (
  requestId: string,
  formData: FormData,
) => {
  const session = await auth();
  if (!session?.user?.id) return;
  const slug = await getAdminSlug();
  if (!slug) return;
  const newStatus = formData.get("status") as string;
  if (!newStatus || !["BORROWED", "RETURNED"].includes(newStatus)) return;
  try {
    if (newStatus === "RETURNED") {
      const record = await db
        .select({
          componentId: borrowRecords.componentId,
          amount: borrowRecords.amount,
        })
        .from(borrowRecords)
        .where(and(
          eq(borrowRecords.id, requestId),
          eq(borrowRecords.universitySlug, slug),
        ))
        .limit(1);
      if (record.length) {
        await db
          .update(componentsTable)
          .set({
            availableCopies: sql`${componentsTable.availableCopies} + ${record[0].amount}`,
          })
          .where(and(
            eq(componentsTable.id, record[0].componentId),
            eq(componentsTable.universitySlug, slug),
          ));
      }
      await db
        .update(borrowRecords)
        .set({
          status: newStatus as "BORROWED" | "RETURNED",
          returnDate: new Date().toISOString().slice(0, 10),
        })
        .where(and(
          eq(borrowRecords.id, requestId),
          eq(borrowRecords.universitySlug, slug),
        ));
    } else {
      await db
        .update(borrowRecords)
        .set({ status: newStatus as "BORROWED" | "RETURNED" })
        .where(and(
          eq(borrowRecords.id, requestId),
          eq(borrowRecords.universitySlug, slug),
        ));
    }
    revalidatePath("/admin/component-requests");
  } catch (error) {
    console.log(error);
  }
  redirect("/admin/component-requests");
};

export const deleteBorrowRecordInAdmin = async (requestId: string) => {
  const slug = await getAdminSlug();
  if (!slug) return;
  try {
    await db
      .delete(borrowRecords)
      .where(and(
        eq(borrowRecords.id, requestId),
        eq(borrowRecords.universitySlug, slug),
      ));
    revalidatePath("/admin/component-requests");
  } catch (error) {
    console.log(error);
  }
  redirect("/admin/component-requests");
};

export const deleteBorrowRecordUser = async (requestId: string) => {
  const session = await auth();
  if (!session?.user?.id) return;
  try {
    await db.delete(borrowRecords).where(eq(borrowRecords.id, requestId));
    revalidatePath("/components/borrow");
  } catch (error) {
    console.log(error);
  }
};
