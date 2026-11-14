"use server";

import { auth } from "@/auth";
import { db } from "@/database";
import { componentsTable, usersTable } from "@/database/schema";
import { ComponentParams } from "@/types";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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

export const updateComponentDetails = async (
  componentId: string,
  params: ComponentParams,
) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) return { success: false, message: "Unauthorized" };

    const [user] = await db
      .select({ slug: usersTable.universitySlug })
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    const slug = user?.slug;
    if (!slug) return { success: false, message: "University not found" };

    const [existing] = await db
      .select({
        totalCopies: componentsTable.totalCopies,
        availableCopies: componentsTable.availableCopies,
      })
      .from(componentsTable)
      .where(
        and(
          eq(componentsTable.id, componentId),
          eq(componentsTable.universitySlug, slug),
        ),
      )
      .limit(1);

    if (!existing) return { success: false, message: "Component not found" };

    // Keep the number of borrowed copies intact when total copies changes.
    const borrowedCopies = Math.max(
      0,
      existing.totalCopies - existing.availableCopies,
    );
    const availableCopies = Math.max(0, params.totalCopies - borrowedCopies);

    const [updated] = await db
      .update(componentsTable)
      .set({
        title: params.title,
        manufacturer: params.manufacturer,
        type: params.type,
        rating: params.rating,
        cover: params.cover,
        description: params.description,
        totalCopies: params.totalCopies,
        availableCopies,
        summary: params.summary,
      })
      .where(
        and(
          eq(componentsTable.id, componentId),
          eq(componentsTable.universitySlug, slug),
        ),
      )
      .returning();

    if (!updated) return { success: false, message: "Component not found" };

    revalidatePath("/admin/components");
    revalidatePath("/home/components");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updated)),
      message: "Component updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred while updating the component",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
