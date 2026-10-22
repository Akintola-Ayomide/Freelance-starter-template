/**
 * Password reset email template.
 */

interface ResetPasswordProps {
  name: string;
  resetUrl: string;
  appName: string;
}

export async function renderResetPasswordTemplate(
  props: ResetPasswordProps,
): Promise<{ html: string; text: string }> {
  const { name, resetUrl, appName } = props;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset your password</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f9fafb; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .header { background: #1a1a1a; padding: 32px 40px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; }
    .body { padding: 40px; }
    .body p { color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px; }
    .button { display: inline-block; background: #2563eb; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: 600; font-size: 16px; margin: 8px 0 24px; }
    .link-note { font-size: 14px; color: #6b7280; word-break: break-all; }
    .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 4px; margin-top: 8px; }
    .warning p { color: #92400e; font-size: 14px; margin: 0; }
    .footer { background: #f9fafb; padding: 24px 40px; border-top: 1px solid #e5e7eb; }
    .footer p { color: #6b7280; font-size: 14px; margin: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${appName}</h1>
    </div>
    <div class="body">
      <p>Hi ${name},</p>
      <p>We received a request to reset the password for your account. Click the button below to choose a new password:</p>
      <a href="${resetUrl}" class="button">Reset Password</a>
      <p class="link-note">Or copy and paste this link into your browser:<br />${resetUrl}</p>
      <div class="warning">
        <p>⚠️ This link expires in 1 hour. If you didn't request a password reset, please ignore this email — your account is safe.</p>
      </div>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`.trim();

  const text = `
Hi ${name},

We received a request to reset the password for your ${appName} account. Click the link below to choose a new password:

${resetUrl}

This link expires in 1 hour. If you didn't request a password reset, please ignore this email — your account is safe.

© ${new Date().getFullYear()} ${appName}
`.trim();

  return { html, text };
}
