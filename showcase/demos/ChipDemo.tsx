import React, { useState } from "react";
import { Chip } from "../../src/components/atoms/Chip";
import { DemoShell, DemoRow } from "../DemoShell";

// ─── Demo ─────────────────────────────────────────────────────────────────────

export function ChipDemo() {
  const [interactiveChips, setInteractiveChips] = useState([
    { id: 1, label: "Design",     type: "suggest" as const, src: undefined as string | undefined },
    { id: 2, label: "React",      type: "suggest" as const, src: undefined },
    { id: 3, label: "TypeScript", type: "suggest" as const, src: undefined },
    { id: 4, label: "Figma",      type: "suggest" as const, src: undefined },
    { id: 5, label: "Olivia",     type: "input"   as const, src: "https://i.pravatar.cc/64?img=5"  },
    { id: 6, label: "Phoenix",    type: "input"   as const, src: "https://i.pravatar.cc/64?img=9"  },
    { id: 7, label: "Lana",       type: "input"   as const, src: "https://i.pravatar.cc/64?img=12" },
  ]);

  return (
    <DemoShell
      title="Chip"
      description="Figma node 5730:7847 — suggest (✓ checkmark) and input (👤 avatar) types, S=24px and M=32px sizes, squace variant, four interactive states."
    >

      {/* ── Section 1: Suggest type, both sizes, all visible states ── */}
      <DemoRow label="Suggest type — size S · size M · disabled · squace" code={`// Default suggest chip (shows ✓ when selected)
<Chip size="s" label="Design" />
<Chip size="m" label="Design" />

// Disabled
<Chip size="s" label="Design" disabled />

// Square corners (no pill rounding)
<Chip size="s" label="Design" squace />`}>
        <Row>
          <Col label="S">
            <Chip size="s" label="Chips" />
          </Col>
          <Col label="M">
            <Chip size="m" label="Chips" />
          </Col>
          <Col label="S disabled">
            <Chip size="s" label="Chips" disabled />
          </Col>
          <Col label="M disabled">
            <Chip size="m" label="Chips" disabled />
          </Col>
          <Col label="S squace">
            <Chip size="s" label="Chips" squace />
          </Col>
          <Col label="M squace">
            <Chip size="m" label="Chips" squace />
          </Col>
        </Row>
      </DemoRow>

      {/* ── Section 2: Input type ── */}
      <DemoRow label="Input type (avatar) — size S · size M · disabled · no-src fallback">
        <Row>
          <Col label="S">
            <Chip type="input" size="s" label="Chips" avatarSrc="https://i.pravatar.cc/64?img=5" />
          </Col>
          <Col label="M">
            <Chip type="input" size="m" label="Chips" avatarSrc="https://i.pravatar.cc/64?img=9" />
          </Col>
          <Col label="S disabled">
            <Chip type="input" size="s" label="Chips" avatarSrc="https://i.pravatar.cc/64?img=5" disabled />
          </Col>
          <Col label="M disabled">
            <Chip type="input" size="m" label="Chips" avatarSrc="https://i.pravatar.cc/64?img=9" disabled />
          </Col>
          <Col label="S squace">
            <Chip type="input" size="s" label="Chips" avatarSrc="https://i.pravatar.cc/64?img=12" squace />
          </Col>
          <Col label="M squace">
            <Chip type="input" size="m" label="Chips" avatarSrc="https://i.pravatar.cc/64?img=12" squace />
          </Col>
          <Col label="No src (S)">
            <Chip type="input" size="s" label="Olivia" />
          </Col>
          <Col label="No src (M)">
            <Chip type="input" size="m" label="Phoenix" />
          </Col>
        </Row>
      </DemoRow>

      {/* ── Section 3: Full Figma grid (4×4: state × size/variant) ── */}
      <DemoRow label="All variants — hover & press any chip to see states · rightmost column is disabled">
        <div style={{
          display: "grid",
          gridTemplateColumns: "max-content 1fr 1fr 1fr 1fr",
          gap: "10px 20px",
          alignItems: "center",
          width: "100%",
        }}>
          {/* Header row */}
          {["", "Suggest S", "Suggest M", "Input S", "Input M"].map(h => (
            <div key={h} style={gridHeaderStyle}>{h}</div>
          ))}

          {/* Enabled rows */}
          {["Default / Hover / Press", "Squace variant", "Disabled", "Squace disabled"].map((rowLabel, ri) => {
            const disabled = ri >= 2;
            const squace   = ri === 1 || ri === 3;
            return (
              <React.Fragment key={rowLabel}>
                <div style={gridRowLabelStyle}>{rowLabel}</div>
                <Chip size="s" type="suggest" label="Chips" disabled={disabled} squace={squace} />
                <Chip size="m" type="suggest" label="Chips" disabled={disabled} squace={squace} />
                <Chip size="s" type="input"   label="Chips" avatarSrc="https://i.pravatar.cc/64?img=5" disabled={disabled} squace={squace} />
                <Chip size="m" type="input"   label="Chips" avatarSrc="https://i.pravatar.cc/64?img=9" disabled={disabled} squace={squace} />
              </React.Fragment>
            );
          })}
        </div>
      </DemoRow>

      {/* ── Section 4: Interactive chip group ── */}
      <DemoRow label="Interactive — click × to remove chips">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 10px", width: "100%" }}>
          {interactiveChips.map(c => (
            <Chip
              key={c.id}
              type={c.type}
              size="m"
              label={c.label}
              avatarSrc={c.src}
              onRemove={() => setInteractiveChips(p => p.filter(x => x.id !== c.id))}
            />
          ))}
          {interactiveChips.length === 0 && (
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9CA3AF" }}>
              All removed.{" "}
              <button
                onClick={() => setInteractiveChips([
                  { id: Date.now(), label: "Restored", type: "suggest", src: undefined },
                  { id: Date.now()+1, label: "Olivia", type: "input", src: "https://i.pravatar.cc/64?img=5" },
                ])}
                style={{ color: "#1D32FF", background: "none", border: "none", cursor: "pointer", fontSize: 13, fontFamily: "Inter, sans-serif", padding: 0 }}
              >
                Reset
              </button>
            </span>
          )}
        </div>
      </DemoRow>

    </DemoShell>
  );
}

// ─── Small layout helpers ─────────────────────────────────────────────────────

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 20px", alignItems: "flex-end" }}>
      {children}
    </div>
  );
}

function Col({ label, children }: { label: string; children: React.ReactNode }) {
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

const gridHeaderStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600,
  letterSpacing: "0.06em", textTransform: "uppercase", color: "#9CA3AF",
};

const gridRowLabelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif", fontSize: 11, color: "#6B7280", whiteSpace: "nowrap",
};
