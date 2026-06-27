"use server";

import { signIn } from "@/auth";
import { db } from "@/database";
import { usersTable } from "@/database/schema";
import crypto from "crypto";
import { AuthCredentials } from "@/types";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { ratelimit } from "../ratelimit";
import { redirect } from "next/navigation";
import { workflowClient } from "@/lib/workflow";
import { config } from "@/lib/config";

const OTP_SECRET = process.env.AUTH_SECRET || "otp-dev-secret";

function verifyOtpInternal(
  email: string,
  userOtp: string,
  expiry: number,
  hmac: string,
) {
  if (Date.now() > expiry) {
    return false;
  }
  if (userOtp.length !== 6 || !/^\d+$/.test(userOtp)) {
    return false;
  }
  const expected = crypto
    .createHmac("sha256", OTP_SECRET)
    .update(`${email}:${userOtp}:${expiry}`)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(hmac));
}

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">,
) => {
  const { email, password } = params;
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1"

  const { success: rateLimited } = await ratelimit.limit(ip)
  if (!rateLimited) {
    redirect("/too-fast");
  }
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, message: "Invalid email or password" };
    }

    await db
      .update(usersTable)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(usersTable.email, email));

    return { success: true, message: "User signed in successfully" };
  } catch (error) {
    console.log(error, "Sign In Error");
    return { success: false, message: "Invalid email or password" };
  }
};

export const signUp = async (
  params: AuthCredentials & {
    otp: string;
    otpExpiry: number;
    otpHmac: string;
  },
) => {
  const { fullName, email, password, universityId, universityCard, otp, otpExpiry, otpHmac } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1"

  const { success: rateLimited } = await ratelimit.limit(ip)
  if (!rateLimited) {
    redirect("/too-fast");
  }

  const otpValid = verifyOtpInternal(email, otp, otpExpiry, otpHmac);
  if (!otpValid) {
    return { success: false, message: "Email verification failed. Please try again." };
  }

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

    try {
      await workflowClient.trigger({
        url: `${config.env.upstash.workflowUrl}/api/workflows`,
        body: { email, name: fullName },
      });
    } catch (e) {
      console.warn("Workflow trigger failed:", e);
    }

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
      .set({ ...data, lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(usersTable.id, userId));
    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.log(error, "Update Profile Error");
    return { success: false, message: "Failed to update profile" };
  }
};
