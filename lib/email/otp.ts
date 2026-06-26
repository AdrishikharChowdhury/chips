export function renderOtpEmail(otp: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Inter, system-ui, sans-serif; background: #fbf3e4; margin: 0; padding: 40px 20px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table style="max-width: 480px; width: 100%; background: #fffef9; border: 2px solid #0b0f16; border-radius: 0;">
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
            <td style="padding: 0 32px 24px; text-align: center;">
              <div style="font-size: 48px; font-weight: 700; color: #1457d8; letter-spacing: 12px; padding: 24px 0; border-top: 2px solid #0b0f16; border-bottom: 2px solid #0b0f16;">
                ${otp}
              </div>
              <p style="font-size: 16px; color: #0b0f16; margin: 24px 0 0; line-height: 1.6;">
                Enter this code to verify your email address. It expires in <strong>10 minutes</strong>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 32px; text-align: center; border-top: 1px solid #0b0f16; border-color: rgba(11,15,22,0.1);">
              <p style="font-size: 12px; color: #0b0f16; opacity: 0.4; margin: 0;">
                If you didn't request this, ignore this email.
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
