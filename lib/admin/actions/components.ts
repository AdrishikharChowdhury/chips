"use server";

import { db } from "@/database";
import { componentsTable } from "@/database/schema";
import { ComponentParams } from "@/types";

export const createComponent = async (params: ComponentParams) => {
  try {
    const newComponent = await db.insert(componentsTable).values({...params,availableCopies:params.totalCopies}).returning();
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
