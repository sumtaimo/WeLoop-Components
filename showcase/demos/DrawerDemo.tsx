import React, { useState } from "react";
import { Drawer } from "../../src/components/molecules/Drawer";
import { DemoShell, DemoRow } from "../DemoShell";

// ─── Demo ─────────────────────────────────────────────────────────────────────

export function DrawerDemo() {
  const [bottomOpen, setBottomOpen] = useState(false);
  const [rightOpen,  setRightOpen]  = useState(false);
  const [leftOpen,   setLeftOpen]   = useState(false);

  return (
    <DemoShell
      title="Drawer"
      category="molecule"
      description="A slide-in panel built on @radix-ui/react-dialog. Supports bottom, right, and left sides with sm / md / lg / full size options. Click outside or press Esc to close."
      importCode={`import { Drawer } from 'weloop-components';`}
    >

      {/* ── Trigger buttons ── */}
      <DemoRow
        label="Open drawer — bottom (md), right (lg), left (sm)"
        code={`const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>Open bottom drawer</button>

<Drawer
  open={open}
  onClose={() => setOpen(false)}
  side="bottom"
  size="md"
  title="Bottom Drawer"
  description="Slides up from the bottom edge. Useful for action sheets on mobile."
>
  <p>Drawer body content goes here.</p>
</Drawer>`}
      >
        <TriggerButton onClick={() => setBottomOpen(true)} label="Bottom drawer (md)" color="#1D32FF" />
        <TriggerButton onClick={() => setRightOpen(true)}  label="Right drawer (lg)"  color="#9333EA" />
        <TriggerButton onClick={() => setLeftOpen(true)}   label="Left drawer (sm)"   color="#0D9488" />
      </DemoRow>

      {/* ── Bottom drawer ── */}
      <Drawer
        open={bottomOpen}
        onClose={() => setBottomOpen(false)}
        side="bottom"
        size="md"
        title="Bottom Drawer"
        description="Slides up from the bottom edge. Great for action sheets and mobile-friendly panels."
      >
        <DrawerBodyContent />
      </Drawer>

      {/* ── Right drawer ── */}
      <Drawer
        open={rightOpen}
        onClose={() => setRightOpen(false)}
        side="right"
        size="lg"
        title="Right Drawer"
        description="Slides in from the right — ideal for settings panels and detail views."
      >
        <DrawerBodyContent />
      </Drawer>

      {/* ── Left drawer ── */}
      <Drawer
        open={leftOpen}
        onClose={() => setLeftOpen(false)}
        side="left"
        size="sm"
        title="Left Drawer"
        description="Slides in from the left — a common pattern for navigation menus."
      >
        <DrawerBodyContent />
      </Drawer>

      {/* ── Size reference ── */}
      <DemoRow label="Size reference">
        <SizeTable />
      </DemoRow>

    </DemoShell>
  );
}

// ─── Trigger button ───────────────────────────────────────────────────────────

function TriggerButton({
  onClick,
  label,
  color,
}: {
  onClick: () => void;
  label: string;
  color: string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 36,
        padding: "0 14px",
        borderRadius: 8,
        border: `1.5px solid ${color}`,
        background: hov ? color : "transparent",
        color: hov ? "#fff" : color,
        fontFamily: "Inter, sans-serif",
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        transition: "background 0.12s, color 0.12s",
        flexShrink: 0,
      }}
    >
      {label}
    </button>
  );
}

// ─── Drawer body ──────────────────────────────────────────────────────────────

function DrawerBodyContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {[
        "This is the scrollable body of the drawer.",
        "Use it to render forms, lists, settings controls, or any other content.",
        "Press Esc or click the backdrop to dismiss.",
      ].map((text, i) => (
        <p
          key={i}
          style={{
            margin: 0,
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            lineHeight: "22px",
            color: "var(--color-text-subtle, #6B7280)",
          }}
        >
          {text}
        </p>
      ))}

      {/* Dummy list items */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
        {["Notifications", "Privacy & Security", "Linked Accounts", "Preferences", "Help & Support"].map(item => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 14px",
              borderRadius: 8,
              background: "var(--color-bg-surface-subtle, #F9FAFB)",
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "var(--color-text-default, #111827)",
            }}
          >
            <span>{item}</span>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Size reference table ─────────────────────────────────────────────────────

function SizeTable() {
  const headerStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#9CA3AF",
    padding: "6px 12px",
    textAlign: "left",
  };
  const cellStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: 12,
    color: "#6B7280",
    padding: "6px 12px",
    borderTop: "1px solid #F3F4F6",
  };
  const codeStyle: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    background: "#F3F4F6",
    padding: "1px 5px",
    borderRadius: 4,
    color: "#374151",
  };

  const rows = [
    { size: "sm",   bottom: "40 vh",  side: "320 px" },
    { size: "md",   bottom: "60 vh",  side: "400 px" },
    { size: "lg",   bottom: "80 vh",  side: "520 px" },
    { size: "full", bottom: "100 vh", side: "100 %" },
  ];

  return (
    <table style={{ borderCollapse: "collapse", width: "auto" }}>
      <thead>
        <tr>
          <th style={headerStyle}>size</th>
          <th style={headerStyle}>bottom (height)</th>
          <th style={headerStyle}>left / right (width)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.size}>
            <td style={cellStyle}><code style={codeStyle}>{r.size}</code></td>
            <td style={cellStyle}>{r.bottom}</td>
            <td style={cellStyle}>{r.side}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
