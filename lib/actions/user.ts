"use server";

import { db } from "@/database";
import { borrowRecords, cartItemsTable, usersTable } from "@/database/schema";
import { and, eq, inArray, sum } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const fetchAllUsers = async () => {
  try {
    const users = await db.select().from(usersTable);
    return users;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const fetchPendingAccountRequests = async () => {
  try {
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.status, "PENDING"));
    return users;
  } catch (error) {
    throw new Error("Failed to fetch account requests");
  }
};

export const approveAccountRequest = async (userId: string, formData: FormData) => {
  try {
    await db
      .update(usersTable)
      .set({ status: "APPROVED" })
      .where(eq(usersTable.id, userId));
    revalidatePath("/admin/account-requests");
  } catch (error) {
    console.log(error);
  }
};

export const rejectAccountRequest = async (userId: string, formData: FormData) => {
  try {
    await db
      .update(usersTable)
      .set({ status: "REJECTED" })
      .where(eq(usersTable.id, userId));
    revalidatePath("/admin/account-requests");
  } catch (error) {
    console.log(error);
  }
};

export const fetchNonPendingAccounts = async () => {
  try {
    const users = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        email: usersTable.email,
        universityId: usersTable.universityId,
        universityCard: usersTable.universityCard,
        status: usersTable.status,
        role: usersTable.role,
        createdAt: usersTable.createdAt,
        lastActivityDate: usersTable.lastActivityDate,
      })
      .from(usersTable)
      .where(eq(usersTable.status, "APPROVED"));

    const userIds = users.map((u) => u.id);

    const borrowCounts = userIds.length > 0
      ? await db
          .select({
            userId: borrowRecords.userId,
            borrowCount: sum(borrowRecords.amount),
          })
          .from(borrowRecords)
          .where(and(
            inArray(borrowRecords.userId, userIds),
            inArray(borrowRecords.status, ["PENDING", "BORROWED"]),
          ))
          .groupBy(borrowRecords.userId)
      : [];

    const countMap = new Map(borrowCounts.map((bc) => [bc.userId, bc.borrowCount]));

    return users.map((u) => ({
      ...u,
      borrowedCount: countMap.get(u.id) ?? 0,
    }));
  } catch (error) {
    throw new Error("Failed to fetch accounts");
  }
};

export const updateUserRole = async (userId: string, formData: FormData) => {
  try {
    const newRole = formData.get("role") as string;
    if (!newRole || !["USER", "ADMIN"].includes(newRole)) return;
    await db
      .update(usersTable)
      .set({ role: newRole as "USER" | "ADMIN" })
      .where(eq(usersTable.id, userId));
    revalidatePath("/admin/users");
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (userId: string, formData: FormData) => {
  try {
    await db.delete(cartItemsTable).where(eq(cartItemsTable.userId, userId));
    await db.delete(borrowRecords).where(eq(borrowRecords.userId, userId));
    await db.delete(usersTable).where(eq(usersTable.id, userId));
    revalidatePath("/admin/users");
  } catch (error) {
    console.log(error);
  }
};
