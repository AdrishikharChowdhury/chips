"use server";

import { signIn } from "@/auth";
import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { AuthCredentials } from "@/types";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">,
) => {
  const { email, password } = params;
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, message: result.error };
    }

    return { success: true, message: "User signed in successfully" };
  } catch (error) {
    console.log(error, "Sign In Error");
    return { success: false, message: "Sign In Error" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityId, universityCard } = params;
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);
  if (existingUser.length > 0) {
    return { success: false, message: "User already exists" };
  }
  const hashedPassword = await hash(password, 10);
  try {
    await db.insert(usersTable).values({
      fullName,
      email,
      password: hashedPassword,
      universityId,
      universityCard,
    });

    await signInWithCredentials({ email, password });

    return { success: true, message: "User signed up successfully" };
  } catch (error) {
    console.log(error, "Sign Up Error");
    return { success: false, message: "Sign Up Error" };
  }
};

export const updateProfile = async (
  userId: string,
  data: { fullName?: string; universityCard?: string; universityId?: number },
) => {
  try {
    await db
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, userId));
    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.log(error, "Update Profile Error");
    return { success: false, message: "Failed to update profile" };
  }
};
