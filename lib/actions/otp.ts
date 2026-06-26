"use server";

import crypto from "crypto";
import nodemailer from "nodemailer";
import { renderOtpEmail } from "@/lib/email/otp";

const OTP_SECRET = process.env.AUTH_SECRET || "otp-dev-secret";
const OTP_LENGTH = 6;
const OTP_EXPIRY_MS = 10 * 60 * 1000;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function generateOtp(): string {
  return Array.from({ length: OTP_LENGTH }, () =>
    Math.floor(Math.random() * 10),
  ).join("");
}

function hmacOtp(email: string, otp: string, expiry: number): string {
  return crypto
    .createHmac("sha256", OTP_SECRET)
    .update(`${email}:${otp}:${expiry}`)
    .digest("hex");
}

export async function sendOtp(email: string) {
  const otp = generateOtp();
  const expiry = Date.now() + OTP_EXPIRY_MS;
  const hmac = hmacOtp(email, otp, expiry);

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
      to: email,
      subject: "Your CHIPS verification code",
      html: renderOtpEmail(otp),
    });

    return { success: true, expiry, hmac } as const;
  } catch (error) {
    console.error("Failed to send OTP:", error);
    return { success: false, message: "Failed to send OTP" } as const;
  }
}

export async function verifyOtp(
  email: string,
  userOtp: string,
  expiry: number,
  hmac: string,
) {
  if (Date.now() > expiry) {
    return { success: false, message: "OTP has expired" };
  }

  if (userOtp.length !== OTP_LENGTH || !/^\d+$/.test(userOtp)) {
    return { success: false, message: "Invalid OTP format" };
  }

  const expectedHmac = hmacOtp(email, userOtp, expiry);

  if (!crypto.timingSafeEqual(Buffer.from(expectedHmac), Buffer.from(hmac))) {
    return { success: false, message: "Invalid OTP" };
  }

  return { success: true, message: "Email verified successfully" };
}
