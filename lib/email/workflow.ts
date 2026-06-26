import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendViaEmailJS(payload: EmailPayload) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
  });
}
