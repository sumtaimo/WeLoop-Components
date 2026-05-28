import React, { useState } from "react";
import { Toggle } from "../../src/components/atoms/Toggle";
import { DemoShell, DemoRow } from "../DemoShell";

// ─── Demo ─────────────────────────────────────────────────────────────────────

export function ToggleDemo() {
  const [smOff,   setSmOff]   = useState(false);
  const [smOn,    setSmOn]    = useState(true);
  const [mdOff,   setMdOff]   = useState(false);
  const [mdOn,    setMdOn]    = useState(true);

  return (
    <DemoShell
      title="Toggle / Switch"
      description="Figma node 215:424 — SM (36×20px) and MD (44×24px). States: Normal / Hover / Pressed / Disabled × Active=true/false. Powered by @radix-ui/react-switch."
    >

      {/* ── Interactive ── */}
      <DemoRow label="Interactive — click to toggle" code={`const [on, setOn] = useState(false);

// SM (36×20 px)
<Toggle size="sm" checked={on} onChange={setOn} />

// MD (44×24 px)
<Toggle size="md" checked={on} onChange={setOn} />

// With visible label
<Toggle size="md" checked={on} onChange={setOn} label="Enable notifications" showLabel />`}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px 32px", alignItems: "center" }}>
          <LabeledToggle label="SM off→on">
            <Toggle size="sm" checked={smOff}  onChange={setSmOff} />
          </LabeledToggle>
          <LabeledToggle label="SM on→off">
            <Toggle size="sm" checked={smOn}   onChange={setSmOn} />
          </LabeledToggle>
          <LabeledToggle label="MD off→on">
            <Toggle size="md" checked={mdOff}  onChange={setMdOff} />
          </LabeledToggle>
          <LabeledToggle label="MD on→off">
            <Toggle size="md" checked={mdOn}   onChange={setMdOn} />
          </LabeledToggle>
        </div>
      </DemoRow>

      {/* ── All states grid — SM ── */}
      <DemoRow label="Size SM (36×20) — all states">
        <StateGrid size="sm" />
      </DemoRow>

      {/* ── All states grid — MD ── */}
      <DemoRow label="Size MD (44×24) — all states">
        <StateGrid size="md" />
      </DemoRow>

      {/* ── With label ── */}
      <DemoRow label="With label text (showLabel)">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Toggle size="sm" checked={smOff} onChange={setSmOff} label="Enable notifications" showLabel />
          <Toggle size="sm" checked={smOn}  onChange={setSmOn}  label="Dark mode" showLabel />
          <Toggle size="md" checked={mdOff} onChange={setMdOff} label="Auto-save" showLabel />
          <Toggle size="md" checked={mdOn}  onChange={setMdOn}  label="Sync across devices" showLabel />
          <Toggle size="md" checked={true}  disabled label="Admin-only feature (disabled)" showLabel />
        </div>
      </DemoRow>

    </DemoShell>
  );
}

// ─── State grid ───────────────────────────────────────────────────────────────

function StateGrid({ size }: { size: "sm" | "md" }) {
  const headerStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600,
    letterSpacing: "0.06em", textTransform: "uppercase", color: "#9CA3AF",
    textAlign: "center",
  };
  const rowLabelStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif", fontSize: 11, color: "#6B7280",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "max-content 1fr 1fr 1fr 1fr",
      gap: "16px 24px",
      alignItems: "center",
    }}>
      {/* Header */}
      <div />
      {["Normal", "Hover (focus)", "Pressed", "Disabled"].map(h => (
        <div key={h} style={headerStyle}>{h}</div>
      ))}

      {/* Active=False row */}
      <div style={rowLabelStyle}>Off (Active=False)</div>
      <Toggle size={size} checked={false} />
      <Toggle size={size} checked={false} /> {/* hover is CSS-driven; shown naturally */}
      <Toggle size={size} checked={false} />
      <Toggle size={size} checked={false} disabled />

      {/* Active=True row */}
      <div style={rowLabelStyle}>On (Active=True)</div>
      <Toggle size={size} checked={true} />
      <Toggle size={size} checked={true} />
      <Toggle size={size} checked={true} />
      <Toggle size={size} checked={true} disabled />
    </div>
  );
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function LabeledToggle({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
      <span style={{
        fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600,
        letterSpacing: "0.05em", textTransform: "uppercase", color: "#9CA3AF",
      }}>
        {label}
      </span>
      {children}
    </div>
  );
}
