import { env } from "@/env";
import { siteConfig } from "@/config/site";

/**
 * Email sending wrapper with dev fallback.
 *
 * - When RESEND_API_KEY is set: sends emails via Resend
 * - When RESEND_API_KEY is absent: logs email content to the console (dev mode)
 *
 * This makes local development work without a Resend account.
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendEmail(options: EmailOptions): Promise<SendEmailResult> {
  const { to, subject, html, text } = options;
  const from = env.EMAIL_FROM;

  // Dev fallback: log to console when no Resend API key
  if (!env.RESEND_API_KEY) {
    console.log("\n" + "=".repeat(60));
    console.log("📧 [EMAIL — DEV MODE] Would send email:");
    console.log(`   To:      ${to}`);
    console.log(`   From:    ${from}`);
    console.log(`   Subject: ${subject}`);
    if (text) {
      console.log(`   Text:\n${text}`);
    }
    console.log("=".repeat(60) + "\n");
    return { success: true, messageId: `dev-${Date.now()}` };
  }

  // Production: send via Resend
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown email error";
    console.error("[email] Failed to send email:", message);
    return { success: false, error: message };
  }
}

// =============================================================================
// Typed email sending functions — import these throughout the app
// =============================================================================

/**
 * Send an email verification link to a new user.
 */
export async function sendVerificationEmail({
  to,
  name,
  verificationUrl,
}: {
  to: string;
  name: string;
  verificationUrl: string;
}) {
  const { renderVerifyEmailTemplate } = await import("./templates/verify-email");
  const { html, text } = await renderVerifyEmailTemplate({
    name,
    verificationUrl,
    appName: siteConfig.name,
  });

  return sendEmail({
    to,
    subject: `Verify your email — ${siteConfig.name}`,
    html,
    text,
  });
}

/**
 * Send a password reset link.
 */
export async function sendPasswordResetEmail({
  to,
  name,
  resetUrl,
}: {
  to: string;
  name: string;
  resetUrl: string;
}) {
  const { renderResetPasswordTemplate } = await import("./templates/reset-password");
  const { html, text } = await renderResetPasswordTemplate({
    name,
    resetUrl,
    appName: siteConfig.name,
  });

  return sendEmail({
    to,
    subject: `Reset your password — ${siteConfig.name}`,
    html,
    text,
  });
}

/**
 * Send a welcome email after successful email verification.
 */
export async function sendWelcomeEmail({ to, name }: { to: string; name: string }) {
  const { renderWelcomeTemplate } = await import("./templates/welcome");
  const { html, text } = await renderWelcomeTemplate({
    name,
    appName: siteConfig.name,
    appUrl: siteConfig.url,
  });

  return sendEmail({
    to,
    subject: `Welcome to ${siteConfig.name}!`,
    html,
    text,
  });
}
