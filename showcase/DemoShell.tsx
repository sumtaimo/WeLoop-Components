import React from "react";

// DemoShell reads CSS variables set by App.tsx based on the active color mode.
// This keeps DemoShell zero-prop while ensuring dark/light consistency.

interface DemoShellProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function DemoShell({ title, description, children }: DemoShellProps) {
  return (
    <div>
      <h1
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: 22,
          lineHeight: "28px",
          letterSpacing: "-0.4px",
          color: "var(--showcase-title, #171717)",
          marginBottom: description ? 6 : 28,
        }}
      >
        {title}
      </h1>
      {description && (
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: "22px",
            color: "var(--showcase-text-subtle, #737373)",
            marginBottom: 28,
            maxWidth: 560,
          }}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

interface DemoRowProps {
  label: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function DemoRow({ label, children, fullWidth }: DemoRowProps) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: 11,
          lineHeight: "16px",
          letterSpacing: "0.4px",
          textTransform: "uppercase",
          color: "var(--showcase-label, #a3a3a3)",
          marginBottom: 12,
        }}
      >
        {label}
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
          padding: "20px 24px",
          background: "var(--showcase-shell-bg, #ffffff)",
          border: "1px solid var(--showcase-shell-border, #e5e5e5)",
          borderRadius: 12,
          maxWidth: fullWidth ? "none" : 900,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function DemoBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: 11,
          lineHeight: "16px",
          letterSpacing: "0.4px",
          textTransform: "uppercase",
          color: "var(--showcase-label, #a3a3a3)",
          marginBottom: 12,
        }}
      >
        {label}
      </p>
      <div
        style={{
          background: "var(--showcase-shell-bg, #ffffff)",
          border: "1px solid var(--showcase-shell-border, #e5e5e5)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
