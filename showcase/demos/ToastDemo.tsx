import React from "react";
import { ToastContainer, useToast } from "../../src/components/atoms/Toast";
import { DemoShell, DemoRow } from "../DemoShell";

// ─── Outer wrapper — provides the toast context ───────────────────────────────

export function ToastDemo() {
  return (
    <ToastContainer position="bottom-right">
      <ToastDemoInner />
    </ToastContainer>
  );
}

// ─── Inner — can now call useToast() ─────────────────────────────────────────

function ToastDemoInner() {
  const toast = useToast();

  return (
    <DemoShell
      title="Toast"
      description="Figma node 7218:13086 — four types: Success (green), Warning (orange), Critical (red), Information (dark). Pill shape 36px, icon + label + divider + ×. Powered by @radix-ui/react-toast with swipe-to-dismiss."
    >
      {/* ── All four types ── */}
      <DemoRow label="Trigger each type" code={`// 1. Wrap your app (or page) with ToastContainer
<ToastContainer position="bottom-right">
  <App />
</ToastContainer>

// 2. Inside any child component, use the hook
const toast = useToast();

toast.success("Changes saved successfully");
toast.warning("Disk space is running low");
toast.critical("Failed to save — please retry");
toast.info("New version available");

// Stagger multiple toasts
toast.success("Profile updated");
setTimeout(() => toast.warning("Session expires in 5 min"), 150);`}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 12px" }}>
          <TriggerBtn
            label="✓  Success"
            bg="#22C55E"
            onClick={() => toast.success("Changes saved successfully")}
          />
          <TriggerBtn
            label="⚠  Warning"
            bg="#F97316"
            onClick={() => toast.warning("Disk space is running low")}
          />
          <TriggerBtn
            label="✕  Critical"
            bg="#EF4444"
            onClick={() => toast.critical("Failed to save — please retry")}
          />
          <TriggerBtn
            label="ℹ  Information"
            bg="#1E293B"
            onClick={() => toast.info("New version available")}
          />
        </div>
      </DemoRow>

      {/* ── Custom messages ── */}
      <DemoRow label="Fire multiple at once">
        <TriggerBtn
          label="Show all 4"
          bg="#1D32FF"
          onClick={() => {
            toast.success("Profile updated");
            setTimeout(() => toast.warning("Session expires in 5 min"), 150);
            setTimeout(() => toast.critical("Connection lost"),          300);
            setTimeout(() => toast.info("Tip: use ⌘S to quick-save"),   450);
          }}
        />
      </DemoRow>

      {/* ── Persistent (no auto-dismiss) ── */}
      <DemoRow label="Persistent — no auto-dismiss (duration=0), close manually">
        <TriggerBtn
          label="Persistent info"
          bg="#1E293B"
          onClick={() => toast.show("information", "This stays until you close it", 0)}
        />
      </DemoRow>

      {/* ── Static preview (always visible) ── */}
      <DemoRow label="Static previews — Figma pill design">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PREVIEWS.map(p => (
            <StaticPill key={p.type} bg={p.bg} label={p.label} icon={p.icon} />
          ))}
        </div>
      </DemoRow>
    </DemoShell>
  );
}

// ─── Static pill preview (no Radix, pure visual) ─────────────────────────────

const PREVIEWS = [
  { type: "success",     bg: "#22C55E", label: "Toast",  icon: "✓" },
  { type: "warning",     bg: "#F97316", label: "Toast",  icon: "⚠" },
  { type: "critical",    bg: "#EF4444", label: "Toast",  icon: "✕" },
  { type: "information", bg: "#1E293B", label: "Toast",  icon: "ℹ" },
];

function StaticPill({ bg, label, icon }: { bg: string; label: string; icon: string }) {
  return (
    <div style={{
      display:      "inline-flex",
      alignItems:   "center",
      height:       36,
      borderRadius: 999,
      background:   bg,
      overflow:     "hidden",
      width:        140,
      boxShadow:    "0 4px 14px rgba(0,0,0,0.18)",
      flexShrink:   0,
    }}>
      <div style={{
        display:    "flex",
        alignItems: "center",
        gap:        6,
        padding:    "0 12px",
        flex:       1,
      }}>
        <span style={{ fontSize: 11, color: "white", opacity: 0.9 }}>{icon}</span>
        <span style={{
          fontFamily:   "Inter, sans-serif",
          fontSize:     13,
          fontWeight:   500,
          color:        "white",
          whiteSpace:   "nowrap",
        }}>
          {label}
        </span>
      </div>
      <div style={{ width: 1, alignSelf: "stretch", background: "rgba(255,255,255,0.3)" }} />
      <div style={{
        width:          36,
        height:         36,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        color:          "rgba(255,255,255,0.8)",
        fontSize:       11,
      }}>
        ×
      </div>
    </div>
  );
}

// ─── Trigger button ───────────────────────────────────────────────────────────

function TriggerBtn({
  label, bg, onClick,
}: {
  label: string; bg: string; onClick: () => void;
}) {
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
