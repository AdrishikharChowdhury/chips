import { serve } from "@upstash/workflow/nextjs";
import {
  renderEmailShell,
  renderWelcomeEmail,
} from "@/lib/email/templates";
import { sendViaEmailJS } from "@/lib/email/workflow";

type InitialData = {
  email: string;
  name?: string;
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, name } = context.requestPayload;

  await context.run("new-signup", async () => {
    await sendEmail("welcome", email, name);
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState();
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail("non-active", email, name);
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail("newsletter", email, name);
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
}); 

async function sendEmail(
  type: "welcome" | "non-active" | "newsletter",
  to: string,
  name?: string,
) {
  const subject =
    type === "welcome"
      ? "Welcome to CHIPS"
      : type === "non-active"
        ? "We Miss You at CHIPS"
        : "CHIPS Monthly Newsletter";

  const body =
    type === "welcome"
      ? renderWelcomeEmail(name || "there")
      : type === "non-active"
        ? `<div style="text-align:center;"><p style="font-size:16px;color:#0b0f16;line-height:1.6;opacity:0.7;">We noticed you haven't logged in recently. Come back and explore the latest components!</p></div>`
        : `<div style="text-align:center;"><p style="font-size:16px;color:#0b0f16;line-height:1.6;opacity:0.7;">Here's what's new at CHIPS this month.</p></div>`;

  const html = renderEmailShell(body);

  await sendViaEmailJS({ to, subject, html });
}

type UserState = "non-active" | "active";

const getUserState = async (): Promise<UserState> => {
  return "non-active";
};
