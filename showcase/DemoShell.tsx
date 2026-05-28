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

// ─── Reusable dark code block ─────────────────────────────────────────────────

function CodePre({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <pre style={{
        background: "#0F1117", color: "#E5E7EB",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: 12, lineHeight: "20px",
        margin: 0, padding: "16px 56px 16px 16px",
        overflowX: "auto", whiteSpace: "pre",
      }}>
        {code}
      </pre>
      <button
        onClick={() => {
          navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
          });
        }}
        title="Copy code"
        style={{
          position: "absolute", top: 10, right: 10,
          width: 28, height: 28,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "none", borderRadius: 6,
          background: copied ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.08)",
          color: copied ? "#4ADE80" : "#9CA3AF",
          cursor: "pointer", fontSize: 13, transition: "all 0.12s", padding: 0,
        }}
      >
        {copied ? "✓" : "⎘"}
      </button>
    </div>
  );
}

// ─── DemoShell ────────────────────────────────────────────────────────────────

export function DemoShell({ title, description, category, importCode, children }: DemoShellProps) {
  const catStyle = category ? CATEGORY_COLORS[category] : null;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: description ? 6 : (importCode ? 16 : 28) }}>
        <h1 style={{
          fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 22,
          lineHeight: "28px", letterSpacing: "-0.4px",
          color: "var(--showcase-title, #171717)", margin: 0,
        }}>
          {title}
        </h1>
        {catStyle && (
          <span style={{
            fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 11,
            lineHeight: "16px", letterSpacing: "0.2px",
            padding: "3px 8px", borderRadius: 999,
            background: catStyle.bg, color: catStyle.text,
            textTransform: "capitalize", flexShrink: 0,
          }}>
            {category}
          </span>
        )}
      </div>
      {description && (
        <p style={{
          fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 14,
          lineHeight: "22px", color: "var(--showcase-text-subtle, #737373)",
          marginBottom: importCode ? 20 : 28, maxWidth: 560,
        }}>
          {description}
        </p>
      )}
      {importCode && (
        <div style={{ marginBottom: 28 }}>
          <div style={{
            fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 10,
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: "var(--showcase-label, #A3A3A3)", marginBottom: 6,
          }}>
            Import
          </div>
          <CodePre code={importCode} />
        </div>
      )}
      {children}
    </div>
  );
}

// ─── Code toggle button ───────────────────────────────────────────────────────

function CodeToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      title={open ? "Hide code" : "Show code"}
      style={{
        display: "flex", alignItems: "center", gap: 5,
        background: open ? "#EEF0FF" : "transparent",
        border: `1px solid ${open ? "#C7CFFF" : "#E5E5E5"}`,
        borderRadius: 6, padding: "3px 8px",
        fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 500,
        color: open ? "#1D32FF" : "#A3A3A3",
        cursor: "pointer", transition: "background 0.12s, color 0.12s, border-color 0.12s",
        lineHeight: "16px", letterSpacing: "0.2px",
        flexShrink: 0,
      }}
    >
      <span style={{ fontFamily: "monospace", fontSize: 12, lineHeight: 1 }}>&lt;/&gt;</span>
      {open ? "Hide" : "Code"}
    </button>
  );
}

// ─── Inline code drawer (attaches below a card) ───────────────────────────────

function CodeDrawer({ code }: { code: string }) {
  return (
    <div style={{
      border: "1px solid var(--showcase-shell-border, #e5e5e5)",
      borderTop: "none",
      borderRadius: "0 0 12px 12px",
      overflow: "hidden",
    }}>
      <CodePre code={code} />
    </div>
  );
}

// ─── DemoRow ──────────────────────────────────────────────────────────────────

interface DemoRowProps {
  label: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  /** JSX usage snippet shown in a toggleable code block below the preview */
  code?: string;
}

export function DemoRow({ label, children, fullWidth, code }: DemoRowProps) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <p style={{
          fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 11,
          lineHeight: "16px", letterSpacing: "0.4px", textTransform: "uppercase",
          color: "var(--showcase-label, #a3a3a3)", margin: 0,
        }}>
          {label}
        </p>
        {code && <CodeToggle open={open} onToggle={() => setOpen(v => !v)} />}
      </div>

      <div style={{
        display: "flex",
        flexDirection: fullWidth ? "column" : "row",
        flexWrap: fullWidth ? "nowrap" : "wrap",
        alignItems: fullWidth ? "stretch" : "center",
        gap: 12,
        padding: "20px 24px",
        background: "var(--showcase-shell-bg, #ffffff)",
        border: "1px solid var(--showcase-shell-border, #e5e5e5)",
        borderRadius: open ? "12px 12px 0 0" : 12,
        maxWidth: fullWidth ? "none" : 900,
        overflowX: fullWidth ? "auto" : undefined,
      }}>
        {children}
      </div>

      {open && code && <CodeDrawer code={code} />}
    </div>
  );
}

// ─── DemoBlock ────────────────────────────────────────────────────────────────

interface DemoBlockProps {
  label: string;
  children: React.ReactNode;
  /** JSX usage snippet shown in a toggleable code block below the preview */
  code?: string;
}

export function DemoBlock({ label, children, code }: DemoBlockProps) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <p style={{
          fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 11,
          lineHeight: "16px", letterSpacing: "0.4px", textTransform: "uppercase",
          color: "var(--showcase-label, #a3a3a3)", margin: 0,
        }}>
          {label}
        </p>
        {code && <CodeToggle open={open} onToggle={() => setOpen(v => !v)} />}
      </div>

      <div style={{
        background: "var(--showcase-shell-bg, #ffffff)",
        border: "1px solid var(--showcase-shell-border, #e5e5e5)",
        borderRadius: open ? "12px 12px 0 0" : 12,
        overflow: "hidden",
      }}>
        {children}
      </div>

      {open && code && <CodeDrawer code={code} />}
    </div>
  );
}
