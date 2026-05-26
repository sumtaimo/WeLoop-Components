import React from "react";
import { NotifBadge } from "../../src/components/atoms/NotifBadge";
import { DemoShell, DemoRow } from "../DemoShell";

export function NotifBadgeDemo() {
  return (
    <DemoShell
      title="NotifBadge"
      description="Notification badge in 3 sizes: Large (count pill), Small (6px dot), Size3 (16px ring dot for online indicator)."
    >
      <DemoRow label="Large — count pill">
        <NotifBadge size="large" label="1" />
        <NotifBadge size="large" label="9" />
        <NotifBadge size="large" label="99" />
        <NotifBadge size="large" label="999+" />
      </DemoRow>
      <DemoRow label="Small — dot">
        <NotifBadge size="small" />
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f3f4f6", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5A5.5 5.5 0 0 1 13.5 7v.5l.8 1.6a.5.5 0 0 1-.45.7H2.15a.5.5 0 0 1-.45-.7L2.5 7.5V7A5.5 5.5 0 0 1 8 1.5zM6.5 12.5a1.5 1.5 0 0 0 3 0" stroke="#6b7280" strokeWidth="1.25" strokeLinecap="round"/>
          </svg>
          <div style={{ position: "absolute", top: 4, right: 4 }}><NotifBadge size="small" /></div>
        </div>
      </DemoRow>
      <DemoRow label="Size3 — online indicator">
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#e5e7eb", position: "relative", display: "inline-flex" }}>
            <div style={{ position: "absolute", bottom: -2, right: -2 }}><NotifBadge size="size3" /></div>
          </div>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#404040" }}>User online</span>
        </div>
      </DemoRow>
    </DemoShell>
  );
}
