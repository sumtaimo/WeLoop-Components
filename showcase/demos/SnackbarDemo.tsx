import React from "react";
import { SnackbarContainer, useSnackbar } from "../../src/components/atoms/Snackbar";
import { DemoShell, DemoRow } from "../DemoShell";

// ─── Outer wrapper — provides the snackbar context ────────────────────────────

export function SnackbarDemo() {
  return (
    <SnackbarContainer position="bottom-center">
      <SnackbarDemoInner />
    </SnackbarContainer>
  );
}

// ─── Inner — can now call useSnackbar() ───────────────────────────────────────

function SnackbarDemoInner() {
  const snackbar = useSnackbar();

  return (
    <DemoShell
      title="Snackbar"
      description="Figma node 1544:1893 — four types: Success (green), Warning (orange), Critical (red), Information (dark). Rounded-rect 48 px, icon + message + optional action button + divider + ×. Powered by @radix-ui/react-toast with slide-up from bottom."
    >

      {/* ── All four types ── */}
      <DemoRow label="Trigger each type">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 12px" }}>
          <TriggerBtn
            label="✓  Success"
            bg="#22C55E"
            onClick={() => snackbar.success("Changes saved successfully")}
          />
          <TriggerBtn
            label="⚠  Warning"
            bg="#F97316"
            onClick={() => snackbar.warning("Disk space is running low")}
          />
          <TriggerBtn
            label="✕  Critical"
            bg="#EF4444"
            onClick={() => snackbar.critical("Failed to save — please retry")}
          />
          <TriggerBtn
            label="ℹ  Information"
            bg="#1E293B"
            onClick={() => snackbar.info("New version available")}
          />
        </div>
      </DemoRow>

      {/* ── With Undo action ── */}
      <DemoRow label="With action button (Undo)">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 12px" }}>
          <TriggerBtn
            label="✓  Success + Undo"
            bg="#22C55E"
            onClick={() =>
              snackbar.success(
                "Message deleted",
                { label: "Undo", onClick: () => snackbar.info("Undo applied") },
              )
            }
          />
          <TriggerBtn
            label="⚠  Warning + Retry"
            bg="#F97316"
            onClick={() =>
              snackbar.warning(
                "Upload failed",
                { label: "Retry", onClick: () => snackbar.info("Retrying…") },
              )
            }
          />
          <TriggerBtn
            label="✕  Critical + Report"
            bg="#EF4444"
            onClick={() =>
              snackbar.critical(
                "Connection lost",
                { label: "Report", onClick: () => snackbar.info("Report sent") },
              )
            }
          />
          <TriggerBtn
            label="ℹ  Info + View"
            bg="#1E293B"
            onClick={() =>
              snackbar.info(
                "New version available",
                { label: "View", onClick: () => snackbar.success("Opening…") },
              )
            }
          />
        </div>
      </DemoRow>

      {/* ── Show all four ── */}
      <DemoRow label="Fire all 4 at once">
        <TriggerBtn
          label="Show all 4"
          bg="#1D32FF"
          onClick={() => {
            snackbar.success("Profile updated");
            setTimeout(() => snackbar.warning("Session expires in 5 min", { label: "Extend", onClick: () => {} }), 180);
            setTimeout(() => snackbar.critical("Payment failed"),            360);
            setTimeout(() => snackbar.info("Tip: use ⌘S to quick-save"),   540);
          }}
        />
      </DemoRow>

      {/* ── Persistent ── */}
      <DemoRow label="Persistent — no auto-dismiss (duration=0), close manually">
        <TriggerBtn
          label="Persistent info"
          bg="#1E293B"
          onClick={() =>
            snackbar.show("information", "This stays until you dismiss it", 0, {
              label:   "Got it",
              onClick: () => {},
            })
          }
        />
      </DemoRow>

      {/* ── Static preview ── */}
      <DemoRow label="Static previews — Figma rounded-rect design">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PREVIEWS.map(p => (
            <StaticSnackbar key={p.type} bg={p.bg} divider={p.divider} label={p.label} />
          ))}
        </div>
      </DemoRow>

    </DemoShell>
  );
}

// ─── Static preview (no Radix, pure visual) ──────────────────────────────────

const PREVIEWS = [
  { type: "success",     bg: "#22C55E", divider: "#16A34A", label: "Changes saved successfully" },
  { type: "warning",     bg: "#F97316", divider: "#EA580C", label: "Disk space is running low"  },
  { type: "critical",    bg: "#EF4444", divider: "#DC2626", label: "Failed to save — please retry" },
  { type: "information", bg: "#1E293B", divider: "#334155", label: "New version available"       },
];

function StaticSnackbar({ bg, divider, label }: { bg: string; divider: string; label: string }) {
  return (
    <div style={{
      display:      "inline-flex",
      alignItems:   "center",
      height:       48,
      borderRadius: 16,
      background:   bg,
      overflow:     "hidden",
      boxShadow:    "0 4px 16px rgba(0,0,0,0.18)",
      width:        320,
      flexShrink:   0,
    }}>
      {/* left: icon + message */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 12px 0 16px", flex: 1 }}>
        <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>●</span>
        <span style={{
          fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500,
          color: "white", whiteSpace: "nowrap",
        }}>{label}</span>
      </div>
      {/* action button */}
      <div style={{
        height: 32, padding: "0 10px", borderRadius: 8, marginRight: 8,
        border: "1px solid rgba(255,255,255,0.55)", background: "rgba(255,255,255,0.14)",
        display: "flex", alignItems: "center",
        fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "white",
      }}>
        Undo
      </div>
      {/* divider + close */}
      <div style={{
        width: 48, height: 48,
        display: "flex", alignItems: "center", justifyContent: "center",
        borderLeft: `1px solid ${divider}`,
        color: "rgba(255,255,255,0.75)", fontSize: 18, flexShrink: 0,
      }}>
        ×
      </div>
    </div>
  );
}

// ─── Trigger button ───────────────────────────────────────────────────────────

function TriggerBtn({ label, bg, onClick }: { label: string; bg: string; onClick: () => void }) {
  const [hov, setHov] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        height:       36,
        padding:      "0 18px",
        borderRadius: 8,
        border:       `1.5px solid ${bg}`,
        background:   hov ? bg : "transparent",
        color:        hov ? "#fff" : bg,
        fontFamily:   "Inter, sans-serif",
        fontSize:     13,
        fontWeight:   500,
        cursor:       "pointer",
        transition:   "background 0.12s, color 0.12s",
        whiteSpace:   "nowrap",
      }}
    >
      {label}
    </button>
  );
}
