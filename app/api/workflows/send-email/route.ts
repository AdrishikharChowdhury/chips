import { type NextRequest, NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { sendViaEmailJS } from "@/lib/email/workflow";
import {
  renderEmailShell,
  renderWelcomeEmail,
  renderStatusChangeEmail,
  renderVerificationDoneEmail,
} from "@/lib/email/templates";

const EMAIL_SUBJECTS: Record<string, string> = {
  welcome: "Welcome to CHIPS",
  status_change: "Your CHIPS Account Status Has Changed",
  verification_done: "Email Verified Successfully",
};

const EMAIL_RENDERERS: Record<
  string,
  (data?: Record<string, unknown>) => string
> = {
  welcome: (data) => renderWelcomeEmail((data?.name as string) || "there"),
  status_change: (data) =>
    renderStatusChangeEmail((data?.status as string) || "PENDING"),
  verification_done: () => renderVerificationDoneEmail(),
};

export const POST = verifySignatureAppRouter(async (req: NextRequest) => {
  const body = await req.json();
  const { to, type, data } = body;

  if (!to || !type) {
    return NextResponse.json(
      { success: false, message: "Missing required fields: to, type" },
      { status: 400 },
    );
  }

  const renderer = EMAIL_RENDERERS[type];
  const subject =
    EMAIL_SUBJECTS[type] || "Notification from CHIPS";

  if (!renderer) {
    return NextResponse.json(
      {
        success: false,
        message: `Unknown email type: ${type}`,
      },
      { status: 400 },
    );
  }

  const content = renderer(data);
  const html = renderEmailShell(content);

  try {
    await sendViaEmailJS({ to, subject, html });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Workflow email failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 },
    );
  }
});
