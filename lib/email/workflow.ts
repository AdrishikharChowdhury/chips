interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendViaEmailJS(payload: EmailPayload) {
  const response = await fetch(
    "https://api.emailjs.com/api/v1.0/email/send",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
          to_email: payload.to,
          subject: payload.subject,
          message_html: payload.html,
        },
      }),
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`EmailJS error ${response.status}: ${text}`);
  }
}
