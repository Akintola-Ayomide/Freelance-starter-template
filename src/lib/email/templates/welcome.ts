/**
 * Welcome email template — sent after successful email verification.
 */

interface WelcomeProps {
  name: string;
  appName: string;
  appUrl: string;
}

export async function renderWelcomeTemplate(
  props: WelcomeProps,
): Promise<{ html: string; text: string }> {
  const { name, appName, appUrl } = props;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to ${appName}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f9fafb; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .header { background: #1a1a1a; padding: 32px 40px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; }
    .body { padding: 40px; }
    .body p { color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px; }
    .button { display: inline-block; background: #2563eb; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: 600; font-size: 16px; margin: 8px 0 24px; }
    .feature { display: flex; align-items: flex-start; margin-bottom: 16px; }
    .feature-icon { font-size: 20px; margin-right: 12px; flex-shrink: 0; }
    .feature-text { color: #374151; font-size: 15px; line-height: 1.5; }
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
      <p>🎉 Welcome aboard! Your email has been verified and your account is ready to go.</p>
      <a href="${appUrl}/dashboard" class="button">Go to Dashboard</a>
      <p>If you have any questions, just reply to this email — we're here to help.</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`.trim();

  const text = `
Hi ${name},

Welcome to ${appName}! Your email has been verified and your account is ready to go.

Visit your dashboard: ${appUrl}/dashboard

If you have any questions, just reply to this email — we're here to help.

© ${new Date().getFullYear()} ${appName}
`.trim();

  return { html, text };
}
