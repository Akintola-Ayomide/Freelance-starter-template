import * as React from "react";

interface WelcomeProps {
  name?: string;
  appName?: string;
  appUrl?: string;
}

export default function Welcome({
  name = "John",
  appName = "Freelancer Starter",
  appUrl = "http://localhost:3000",
}: WelcomeProps) {
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ background: "#1a1a1a", padding: "32px 40px" }}>
        <h1 style={{ color: "#ffffff", margin: 0, fontSize: "24px" }}>{appName}</h1>
      </div>
      <div style={{ padding: "40px", background: "#ffffff" }}>
        <p style={{ color: "#374151", fontSize: "16px" }}>Hi {name},</p>
        <p style={{ color: "#374151", fontSize: "16px" }}>
          🎉 Welcome aboard! Your account is ready.
        </p>
        <a
          href={`${appUrl}/dashboard`}
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
          Go to Dashboard
        </a>
      </div>
      <div style={{ background: "#f9fafb", padding: "24px 40px", borderTop: "1px solid #e5e7eb" }}>
        <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>
          © {new Date().getFullYear()} {appName}
        </p>
      </div>
    </div>
  );
}
