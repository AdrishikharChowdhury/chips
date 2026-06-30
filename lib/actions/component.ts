"use server";

import { auth } from "@/auth";
import { db } from "@/database";
import { borrowRecords, componentsTable, usersTable } from "@/database/schema";
import { BorrowComponentParams, Components } from "@/types";
import { formatDate } from "date-fns";
import { eq, count } from "drizzle-orm";

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

  const { componentId, dueDate } = params;
  try {
    const component = await db
      .select({ availableCopies: componentsTable.availableCopies })
      .from(componentsTable)
      .where(eq(componentsTable.id, componentId))
      .limit(1);

    if (!component.length || component[0].availableCopies <= 0) {
      return {
        success: false,
        message: "Component not available",
      };
    }

    const record = await db.insert(borrowRecords).values({
      userId,
      componentId,
      dueDate: formatDate(dueDate, "yyyy-MM-dd"),
      status: "BORROWED",
    });
    await db
      .update(componentsTable)
      .set({ availableCopies: component[0].availableCopies - 1 })
      .where(eq(componentsTable.id, componentId));
    
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

export const fetchComponents = async (page: number = 1, perPage: number = 6) => {
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
