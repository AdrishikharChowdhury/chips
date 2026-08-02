"use server"
import { db } from "@/database";
import { universitiesTable } from "@/database/schema";

export const fetchUniversities = async () => {
  try {
    const universities = await db
      .select({ name: universitiesTable.fullName,slug:universitiesTable.slug })
      .from(universitiesTable);
    return universities;
  } catch (error) {
    console.error(error);
  }
};
