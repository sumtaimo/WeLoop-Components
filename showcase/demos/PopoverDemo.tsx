import React from "react";
import { Popover } from "../../src/components/molecules/Popover";
import { DemoShell, DemoRow } from "../DemoShell";

function Trigger({ label }: { label: string }) {
  return (
    <button style={{
      padding: "6px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB",
      background: "#FFFFFF", fontFamily: "Inter, sans-serif", fontSize: 13,
      fontWeight: 500, color: "#374151", cursor: "pointer",
    }}>
      {label}
    </button>
  );
}

export function PopoverDemo() {
  return (
    <DemoShell
      title="Popover"
      description='Floating card with title, description, and two buttons. 8 tail positions via "side" + "align" props.'
      category="molecule"
      importCode={`import { Popover } from 'weloop-components';`}
    >
      <DemoRow label="Tail at bottom (popover appears above trigger)">
        <div style={{ paddingBottom: 16 }}>
          <p style={{ fontSize: 11, color: "#A3A3A3", marginBottom: 32, marginTop: 0, fontFamily: "Inter, sans-serif" }}>B-L · side=top, align=start</p>
          <Popover side="top" align="start" cancelLabel="Cancel" actionLabel="Confirm" onAction={() => alert("action")} onCancel={() => {}}>
            <Trigger label="Open ↑ left" />
          </Popover>
        </div>
        <div style={{ paddingBottom: 16 }}>
          <p style={{ fontSize: 11, color: "#A3A3A3", marginBottom: 32, marginTop: 0, fontFamily: "Inter, sans-serif" }}>B-C · side=top, align=center</p>
          <Popover side="top" align="center" cancelLabel="Cancel" actionLabel="Confirm">
            <Trigger label="Open ↑ center" />
          </Popover>
        </div>
        <div style={{ paddingBottom: 16 }}>
          <p style={{ fontSize: 11, color: "#A3A3A3", marginBottom: 32, marginTop: 0, fontFamily: "Inter, sans-serif" }}>B-R · side=top, align=end</p>
          <Popover side="top" align="end" cancelLabel="Cancel" actionLabel="Confirm">
            <Trigger label="Open ↑ right" />
          </Popover>
        </div>
      </DemoRow>

      <DemoRow label="Tail at top (popover appears below trigger)">
        <div>
          <p style={{ fontSize: 11, color: "#A3A3A3", marginBottom: 8, marginTop: 0, fontFamily: "Inter, sans-serif" }}>T-L · side=bottom, align=start</p>
          <Popover side="bottom" align="start" cancelLabel="Cancel" actionLabel="Confirm">
            <Trigger label="Open ↓ left" />
          </Popover>
        </div>
        <div>
          <p style={{ fontSize: 11, color: "#A3A3A3", marginBottom: 8, marginTop: 0, fontFamily: "Inter, sans-serif" }}>T-C · side=bottom, align=center</p>
          <Popover side="bottom" align="center" cancelLabel="Cancel" actionLabel="Confirm">
            <Trigger label="Open ↓ center" />
          </Popover>
        </div>
        <div>
          <p style={{ fontSize: 11, color: "#A3A3A3", marginBottom: 8, marginTop: 0, fontFamily: "Inter, sans-serif" }}>T-R · side=bottom, align=end</p>
          <Popover side="bottom" align="end" cancelLabel="Cancel" actionLabel="Confirm">
            <Trigger label="Open ↓ right" />
          </Popover>
        </div>
      </DemoRow>

      <DemoRow label="Side tails">
        <div>
          <p style={{ fontSize: 11, color: "#A3A3A3", marginBottom: 8, marginTop: 0, fontFamily: "Inter, sans-serif" }}>C-R · side=left (popover to the left)</p>
          <Popover side="left" align="center" cancelLabel="Cancel" actionLabel="Confirm">
            <Trigger label="Open ← left" />
          </Popover>
        </div>
        <div>
          <p style={{ fontSize: 11, color: "#A3A3A3", marginBottom: 8, marginTop: 0, fontFamily: "Inter, sans-serif" }}>C-L · side=right (popover to the right)</p>
          <Popover side="right" align="center" cancelLabel="Cancel" actionLabel="Confirm">
            <Trigger label="Open → right" />
          </Popover>
        </div>
      </DemoRow>

      <DemoRow label="Custom content">
        <Popover
          side="bottom"
          align="start"
          title="Delete record"
          description="This action is permanent and cannot be undone. All associated data will be removed."
          cancelLabel="Never mind"
          actionLabel="Delete"
        >
          <Trigger label="Delete action" />
        </Popover>

        <Popover
          side="top"
          align="center"
          title="Export data"
          description="Your export will be sent to your registered email once it's ready."
          cancelLabel="Cancel"
          actionLabel="Export"
        >
          <Trigger label="Export" />
        </Popover>
      </DemoRow>
    </DemoShell>
  );
}
