import React, { useState } from "react";

interface DemoShellProps {
  title: string;
  description?: string;
  category?: "atom" | "molecule" | "organism" | "reference";
  importCode?: string;
  children: React.ReactNode;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  atom:      { bg: "#EEF0FF", text: "#1D32FF" },
  molecule:  { bg: "#FDF4FF", text: "#9333EA" },
  organism:  { bg: "#F0FDF4", text: "#15803D" },
  reference: { bg: "#FFF7ED", text: "#C2410C" },
};

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };
  return (
    <div style={{ marginBottom: 28 }}>
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: 10,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--showcase-label, #A3A3A3)",
          marginBottom: 6,
        }}
      >
        Import
      </div>
      <div style={{ position: "relative" }}>
        <pre
          style={{
            background: "#0F1117",
            color: "#E5E7EB",
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: 12,
            lineHeight: "20px",
            borderRadius: 10,
            padding: "16px 56px 16px 16px",
            margin: 0,
            overflowX: "auto",
            whiteSpace: "pre",
          }}
        >
          {code}
        </pre>
        <button
          onClick={copy}
          title="Copy import"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            borderRadius: 6,
            background: copied ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.08)",
            color: copied ? "#4ADE80" : "#9CA3AF",
            cursor: "pointer",
            fontSize: 13,
            transition: "all 0.12s",
            padding: 0,
          }}
        >
          {copied ? "✓" : "⎘"}
        </button>
      </div>
    </div>
  );
}

export function DemoShell({ title, description, category, importCode, children }: DemoShellProps) {
  const catStyle = category ? CATEGORY_COLORS[category] : null;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: description ? 6 : (importCode ? 16 : 28) }}>
        <h1
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: 22,
            lineHeight: "28px",
            letterSpacing: "-0.4px",
            color: "var(--showcase-title, #171717)",
            margin: 0,
          }}
        >
          {title}
        </h1>
        {catStyle && (
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 11,
              lineHeight: "16px",
              letterSpacing: "0.2px",
              padding: "3px 8px",
              borderRadius: 999,
              background: catStyle.bg,
              color: catStyle.text,
              textTransform: "capitalize",
              flexShrink: 0,
            }}
          >
            {category}
          </span>
        )}
      </div>
      {description && (
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: "22px",
            color: "var(--showcase-text-subtle, #737373)",
            marginBottom: importCode ? 20 : 28,
            maxWidth: 560,
          }}
        >
          {description}
        </p>
      )}
      {importCode && <CodeBlock code={importCode} />}
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
          flexDirection: fullWidth ? "column" : "row",
          flexWrap: fullWidth ? "nowrap" : "wrap",
          alignItems: fullWidth ? "stretch" : "center",
          gap: 12,
          padding: "20px 24px",
          background: "var(--showcase-shell-bg, #ffffff)",
          border: "1px solid var(--showcase-shell-border, #e5e5e5)",
          borderRadius: 12,
          maxWidth: fullWidth ? "none" : 900,
          overflowX: fullWidth ? "auto" : undefined,
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
