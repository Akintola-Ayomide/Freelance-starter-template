/**
 * Email verification template.
 * Returns { html, text } — both are sent by Resend for better deliverability.
 */

interface VerifyEmailProps {
  name: string;
  verificationUrl: string;
  appName: string;
}

export async function renderVerifyEmailTemplate(
  props: VerifyEmailProps,
): Promise<{ html: string; text: string }> {
  const { name, verificationUrl, appName } = props;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your email</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f9fafb; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .header { background: #1a1a1a; padding: 32px 40px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; }
    .body { padding: 40px; }
    .body p { color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px; }
    .button { display: inline-block; background: #2563eb; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: 600; font-size: 16px; margin: 8px 0 24px; }
    .link-note { font-size: 14px; color: #6b7280; word-break: break-all; }
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
      <p>Thanks for signing up! Please verify your email address to get started.</p>
      <a href="${verificationUrl}" class="button">Verify Email Address</a>
      <p class="link-note">Or copy and paste this link into your browser:<br />${verificationUrl}</p>
      <p>This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`.trim();

  const text = `
Hi ${name},

Thanks for signing up for ${appName}! Please verify your email address by clicking the link below:

${verificationUrl}

This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.

© ${new Date().getFullYear()} ${appName}
`.trim();

  return { html, text };
}
