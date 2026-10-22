import * as React from "react";

interface VerifyEmailProps {
  name?: string;
  verificationUrl?: string;
  appName?: string;
}

export default function VerifyEmail({
  name = "John",
  verificationUrl = "http://localhost:3000/verify-email?token=example",
  appName = "Freelancer Starter",
}: VerifyEmailProps) {
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ background: "#1a1a1a", padding: "32px 40px" }}>
        <h1 style={{ color: "#ffffff", margin: 0, fontSize: "24px" }}>{appName}</h1>
      </div>
      <div style={{ padding: "40px", background: "#ffffff" }}>
        <p style={{ color: "#374151", fontSize: "16px" }}>Hi {name},</p>
        <p style={{ color: "#374151", fontSize: "16px" }}>
          Thanks for signing up! Please verify your email address to get started.
        </p>
        <a
          href={verificationUrl}
          style={{
            display: "inline-block",
            background: "#2563eb",
            color: "#ffffff",
            textDecoration: "none",
            padding: "14px 28px",
            borderRadius: "6px",
            fontWeight: "600",
            fontSize: "16px",
            margin: "8px 0 24px",
          }}
        >
          Verify Email Address
        </a>
        <p style={{ fontSize: "14px", color: "#6b7280", wordBreak: "break-all" }}>
          Or copy: {verificationUrl}
        </p>
        <p style={{ color: "#374151", fontSize: "14px" }}>This link expires in 24 hours.</p>
      </div>
      <div style={{ background: "#f9fafb", padding: "24px 40px", borderTop: "1px solid #e5e7eb" }}>
        <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>
          © {new Date().getFullYear()} {appName}
        </p>
      </div>
    </div>
  );
}
