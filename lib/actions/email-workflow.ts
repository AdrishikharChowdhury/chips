"use server";

import { Client } from "@upstash/qstash";
import { config } from "@/lib/config";

const client = new Client({
  token: config.env.upstash.qstashToken,
});

interface WorkflowEmailPayload {
  to: string;
  type: "welcome" | "status_change" | "verification_done";
  data?: Record<string, unknown>;
}

export async function triggerEmailWorkflow(payload: WorkflowEmailPayload) {
  try {
    await client.publishJSON({
      url: `${config.env.upstash.workflowUrl}/api/workflows/send-email`,
      body: {
        to: payload.to,
        type: payload.type,
        data: payload.data,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to trigger email workflow:", error);
    return { success: false, message: "Failed to queue email" };
  }
}
