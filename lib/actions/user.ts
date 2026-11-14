"use server";

import { auth } from "@/auth";
import { db } from "@/database";
import { borrowRecords, cartItemsTable, usersTable } from "@/database/schema";
import { and, eq, inArray, sum } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getUserRole() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Unauthorized");

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  if (!user) throw new Error("User Not Found");

  return user.role;
}

export async function getAdminSlug() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Unauthorized");

  const [user] = await db
    .select({ slug: usersTable.universitySlug })
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);
  return user?.slug;
}

export const fetchPendingAccountRequests = async () => {
  try {
    const slug = await getAdminSlug();
    if (!slug) return [];

    const users = await db
      .select()
      .from(usersTable)
      .where(
        and(
          eq(usersTable.status, "PENDING"),
          eq(usersTable.universitySlug, slug),
        ),
      );
    return users;
  } catch (error) {
    throw new Error("Failed to fetch account requests");
  }
};

export const approveAccountRequest = async (
  userId: string,
  formData: FormData,
) => {
  try {
    const slug = await getAdminSlug();
    if (!slug) return;

    await db
      .update(usersTable)
      .set({ status: "APPROVED" })
      .where(
        and(eq(usersTable.id, userId), eq(usersTable.universitySlug, slug)),
      );
    revalidatePath("/admin/account-requests");
  } catch (error) {
    console.log(error);
  }
};

export const rejectAccountRequest = async (
  userId: string,
  formData: FormData,
) => {
  try {
    const slug = await getAdminSlug();
    if (!slug) return;

    await db
      .update(usersTable)
      .set({ status: "REJECTED" })
      .where(
        and(eq(usersTable.id, userId), eq(usersTable.universitySlug, slug)),
      );
    revalidatePath("/admin/account-requests");
  } catch (error) {
    console.log(error);
  }
};

export const fetchNonPendingAccounts = async () => {
  try {
    const slug = await getAdminSlug();
    if (!slug) return [];

    const users = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        email: usersTable.email,
        universityName: usersTable.universityName,
        universityCard: usersTable.universityCard,
        status: usersTable.status,
        role: usersTable.role,
        createdAt: usersTable.createdAt,
        lastActivityDate: usersTable.lastActivityDate,
      })
      .from(usersTable)
      .where(
        and(
          eq(usersTable.status, "APPROVED"),
          eq(usersTable.universitySlug, slug),
        ),
      );

    const userIds = users.map((u) => u.id);

    const borrowCounts =
      userIds.length > 0
        ? await db
            .select({
              userId: borrowRecords.userId,
              borrowCount: sum(borrowRecords.amount),
            })
            .from(borrowRecords)
            .where(
              and(
                inArray(borrowRecords.userId, userIds),
                inArray(borrowRecords.status, ["PENDING", "BORROWED"]),
              ),
            )
            .groupBy(borrowRecords.userId)
        : [];

    const countMap = new Map(
      borrowCounts.map((bc) => [bc.userId, bc.borrowCount]),
    );

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
    const slug = await getAdminSlug();
    if (!slug) return;

    const newRole = formData.get("role") as string;
    if (!newRole || !["USER", "ADMIN"].includes(newRole)) return;
    await db
      .update(usersTable)
      .set({ role: newRole as "USER" | "ADMIN" })
      .where(
        and(eq(usersTable.id, userId), eq(usersTable.universitySlug, slug)),
      );
    revalidatePath("/admin/users");
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (userId: string, formData: FormData) => {
  try {
    const slug = await getAdminSlug();
    if (!slug) return;

    const [target] = await db
      .select({ slug: usersTable.universitySlug })
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    if (!target || target.slug !== slug) return;

    await db.delete(cartItemsTable).where(eq(cartItemsTable.userId, userId));
    await db.delete(borrowRecords).where(eq(borrowRecords.userId, userId));
    await db.delete(usersTable).where(eq(usersTable.id, userId));
    revalidatePath("/admin/users");
  } catch (error) {
    console.log(error);
  }
};
