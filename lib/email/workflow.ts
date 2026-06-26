import { init, send } from "@emailjs/nodejs";

init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY!,
  privateKey: process.env.EMAILJS_PRIVATE_KEY!,
});

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendViaEmailJS(payload: EmailPayload) {
  const result = await send(
    process.env.EMAILJS_SERVICE_ID!,
    process.env.EMAILJS_TEMPLATE_ID!,
    {
      to_email: payload.to,
      subject: payload.subject,
      html: payload.html,
    },
  );

  return result;
}
