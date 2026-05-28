import React from "react";
import { Tooltip } from "../../src/components/atoms/Tooltip";
import { DemoShell, DemoRow } from "../DemoShell";

// ─── Demo ─────────────────────────────────────────────────────────────────────

export function TooltipDemo() {
  return (
    <DemoShell
      title="Tooltip"
      description="Figma node 215:425 — dark #1E293B pill with ✦ sparkle icon. 9 tail positions (B-L/B-C/B-R, T-L/T-C/T-R, C-L/C-R, None) + enter/exit animations via Radix."
    >

      {/* ── All 9 tail positions ── */}
      <DemoRow label="Tail positions — hover each pill" code={`// Wraps any element — hover/focus shows the bubble
<Tooltip content="Helpful hint" side="top" align="center">
  <button>Hover me</button>
</Tooltip>

// All tail positions via side + align
<Tooltip content="Top left"   side="top"    align="start">…</Tooltip>
<Tooltip content="Top center" side="top"    align="center">…</Tooltip>  {/* default */}
<Tooltip content="Top right"  side="top"    align="end">…</Tooltip>
<Tooltip content="Below"      side="bottom" align="center">…</Tooltip>
<Tooltip content="Right"      side="right"  align="center">…</Tooltip>
<Tooltip content="Left"       side="left"   align="center">…</Tooltip>

// No arrow tail
<Tooltip content="No tail" showArrow={false}>…</Tooltip>

// Custom delay (ms)
<Tooltip content="Slow" delayDuration={800}>…</Tooltip>`}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 16px", alignItems: "center" }}>
          {POSITIONS.map(({ label, side, align }) => (
            <Tooltip key={label} content={label} side={side} align={align}>
              <Pill label={label} />
            </Tooltip>
          ))}
        </div>
      </DemoRow>

      {/* ── No arrow (None) ── */}
      <DemoRow label="No arrow — Tail Position=None">
        <Tooltip content="No tail / arrow" showArrow={false}>
          <Pill label="None" />
        </Tooltip>
      </DemoRow>

      {/* ── Rich content ── */}
      <DemoRow label="Rich content inside tooltip">
        <Tooltip
          side="right"
          sideOffset={10}
          content={
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Keyboard shortcut</div>
              <div style={{ display: "flex", gap: 4 }}>
                {["⌘", "Shift", "P"].map(k => (
                  <span key={k} style={{
                    padding: "1px 6px", borderRadius: 4,
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    fontFamily: "monospace", fontSize: 11,
                  }}>
                    {k}
                  </span>
                ))}
              </div>
            </div>
          }
        >
          <Pill label="Rich content →" />
        </Tooltip>
      </DemoRow>

      {/* ── Works on any element ── */}
      <DemoRow label="Works on any element">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 16px", alignItems: "center" }}>
          <Tooltip content="Open command palette" side="top">
            <button style={{
              height: 32, padding: "0 14px", borderRadius: 8,
              border: "none", background: "#1D32FF", color: "#fff",
              fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500,
              cursor: "pointer",
            }}>
              Button
            </button>
          </Tooltip>

          <Tooltip content="Calendar view" side="top">
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32, borderRadius: 8,
              background: "#F3F4F6", cursor: "default",
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3" width="12" height="11" rx="2" stroke="#6B7280" strokeWidth="1.3"/>
                <path d="M5 1v4M11 1v4M2 7h12" stroke="#6B7280" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </span>
          </Tooltip>

          <Tooltip content="Requires admin access" side="right">
            <span style={{
              fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280",
              borderBottom: "1px dashed #9CA3AF", cursor: "help",
            }}>
              Admin only
            </span>
          </Tooltip>
        </div>
      </DemoRow>

      {/* ── Custom delay ── */}
      <DemoRow label="Custom delay — instant (0ms) vs default (400ms)">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Tooltip content="Shows instantly" delayDuration={0}>
            <Pill label="Instant" />
          </Tooltip>
          <Tooltip content="Default 400ms delay" delayDuration={400}>
            <Pill label="400ms delay" />
          </Tooltip>
          <Tooltip content="Slow 800ms delay" delayDuration={800}>
            <Pill label="800ms delay" />
          </Tooltip>
        </div>
      </DemoRow>

    </DemoShell>
  );
}

// ─── Figma tail position map ──────────────────────────────────────────────────

const POSITIONS = [
  { label: "B-L (top/start)",    side: "top"    as const, align: "start"  as const },
  { label: "B-C (top/center)",   side: "top"    as const, align: "center" as const },
  { label: "B-R (top/end)",      side: "top"    as const, align: "end"    as const },
  { label: "C-L (right/center)", side: "right"  as const, align: "center" as const },
  { label: "C-R (left/center)",  side: "left"   as const, align: "center" as const },
  { label: "T-L (bottom/start)", side: "bottom" as const, align: "start"  as const },
  { label: "T-C (bottom/center)",side: "bottom" as const, align: "center" as const },
  { label: "T-R (bottom/end)",   side: "bottom" as const, align: "end"    as const },
];

// ─── Pill helper ─────────────────────────────────────────────────────────────

function Pill({ label }: { label: string }) {
  return (
    <span style={{
      display:        "inline-flex",
      alignItems:     "center",
      height:         32,
      padding:        "0 14px",
      borderRadius:   8,
      border:         "1px solid #E5E7EB",
      background:     "#FFFFFF",
      fontFamily:     "Inter, sans-serif",
      fontSize:       12,
      fontWeight:     500,
      color:          "#374151",
      cursor:         "default",
      userSelect:     "none",
      whiteSpace:     "nowrap",
    }}>
      {label}
    </span>
  );
}
