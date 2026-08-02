"use server";

import { auth } from "@/auth";
import { db } from "@/database";
import { componentsTable, usersTable } from "@/database/schema";
import { ComponentParams } from "@/types";
import { eq } from "drizzle-orm";

export const createComponent = async (params: ComponentParams) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) return { success: false, message: "Unauthorized" };
    const [user] = await db
      .select({ slug: usersTable.universitySlug })
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);
    const newComponent = await db.insert(componentsTable).values({
      ...params,
      availableCopies: params.totalCopies,
      universitySlug: user?.slug ?? "",
    }).returning();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newComponent[0])),
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An Error Occured While creating the component",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
