export function renderEmailShell(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Inter, system-ui, sans-serif; background: #fbf3e4; margin: 0; padding: 40px 20px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table style="max-width: 480px; width: 100%; background: #fffef9; border: 2px solid #0b0f16;">
          <tr>
            <td style="padding: 40px 32px 24px; text-align: center;">
              <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700; color: #0b0f16; margin: 0; letter-spacing: 1px;">
                C.H.I.P.S.
              </h1>
              <p style="font-size: 14px; color: #0b0f16; opacity: 0.6; margin: 4px 0 0;">
                Centralized Hardware Inventory
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px 32px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 32px; text-align: center; border-top: 1px solid rgba(11,15,22,0.1);">
              <p style="font-size: 12px; color: #0b0f16; opacity: 0.4; margin: 0;">
                C.H.I.P.S. — Centralized Hardware Inventory for Prototype Systems
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderWelcomeEmail(name: string): string {
  return `
<div style="text-align: center;">
  <div style="display: inline-block; margin-bottom: 24px;">
    <table cellpadding="0" cellspacing="0" style="width: 64px; height: 64px; background: #1457d8;">
      <tr>
        <td style="text-align: center; vertical-align: middle; color: #fbf3e4; font-size: 32px; font-weight: 700; font-family: 'Space Grotesk', sans-serif;">
          ✓
        </td>
      </tr>
    </table>
  </div>
  <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; color: #0b0f16; margin: 0 0 8px;">
    Welcome, ${name}!
  </h2>
  <p style="font-size: 16px; color: #0b0f16; line-height: 1.6; margin: 0 0 8px; opacity: 0.7;">
    Your account has been created successfully. You now have access to the full CHIPS inventory of electronic components.
  </p>
  <p style="font-size: 16px; color: #0b0f16; line-height: 1.6; margin: 0; opacity: 0.7;">
    Start browsing components, request items, and manage your projects.
  </p>
</div>`;
}

export function renderStatusChangeEmail(status: string): string {
  const statusColors: Record<string, string> = {
    APPROVED: "#1457d8",
    REJECTED: "#e84522",
    PENDING: "#f5b400",
  };
  const color = statusColors[status] || "#0b0f16";

  return `
<div style="text-align: center;">
  <div style="display: inline-block; margin-bottom: 24px;">
    <table cellpadding="0" cellspacing="0" style="width: 64px; height: 64px; background: ${color};">
      <tr>
        <td style="text-align: center; vertical-align: middle; color: #fbf3e4; font-size: 24px; font-weight: 700; font-family: 'Space Grotesk', sans-serif;">
          !
        </td>
      </tr>
    </table>
  </div>
  <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; color: #0b0f16; margin: 0 0 8px;">
    Account Status Updated
  </h2>
  <p style="font-size: 16px; color: #0b0f16; line-height: 1.6; margin: 0 0 16px; opacity: 0.7;">
    Your account status has changed to:
  </p>
  <div style="display: inline-block; border: 2px solid #0b0f16; padding: 8px 32px;">
    <span style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; color: ${color}; letter-spacing: 2px;">
      ${status}
    </span>
  </div>
</div>`;
}

export function renderVerificationDoneEmail(): string {
  return `
<div style="text-align: center;">
  <div style="display: inline-block; margin-bottom: 24px;">
    <table cellpadding="0" cellspacing="0" style="width: 64px; height: 64px; background: #1457d8;">
      <tr>
        <td style="text-align: center; vertical-align: middle; color: #fbf3e4; font-size: 32px; font-weight: 700; font-family: 'Space Grotesk', sans-serif;">
          ✓
        </td>
      </tr>
    </table>
  </div>
  <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; color: #0b0f16; margin: 0 0 8px;">
    Email Verified
  </h2>
  <p style="font-size: 16px; color: #0b0f16; line-height: 1.6; margin: 0; opacity: 0.7;">
    Your email address has been verified successfully. You can now fully access your CHIPS account.
  </p>
</div>`;
}
