import React, { useState } from "react";
import { Banner } from "../../src/components/molecules/Banner";
import { DemoShell, DemoRow } from "../DemoShell";

export function BannerDemo() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  function dismiss(id: string) {
    setDismissed(prev => new Set([...prev, id]));
  }
  function reset() {
    setDismissed(new Set());
  }

  return (
    <DemoShell
      title="Banner"
      description="8 types from Figma node 7218:13085 — single-line (48 px) and multi-line variants covering information, success, warning, critical, and actionable states."
    >

      {/* ── Single-line ── */}
      <DemoRow label="Information — subtle bg" code={`<Banner
  type="information"
  message="Your account plan renews in 7 days."
  actionLabel="View plan"
  onAction={() => handleAction()}
  onClose={() => setVisible(false)}
/>`}>
        <div style={{ width: "100%", maxWidth: 640 }}>
          <Banner
            type="information"
            message="Your account plan renews in 7 days."
            actionLabel="View plan"
            onAction={() => alert("View plan")}
            onClose={() => undefined}
          />
        </div>
      </DemoRow>

      <DemoRow label="Success — solid bg" code={`<Banner
  type="success"
  message="Payment processed successfully."
  onClose={() => setVisible(false)}
/>`}>
        <div style={{ width: "100%", maxWidth: 640 }}>
          <Banner
            type="success"
            message="Payment processed successfully."
            onClose={() => undefined}
          />
        </div>
      </DemoRow>

      <DemoRow label="Warning — solid bg" code={`<Banner
  type="warning"
  message="Some items in your order are out of stock."
  actionLabel="Edit order"
  onAction={() => handleAction()}
  onClose={() => setVisible(false)}
/>`}>
        <div style={{ width: "100%", maxWidth: 640 }}>
          <Banner
            type="warning"
            message="Some items in your order are out of stock."
            actionLabel="Edit order"
            onAction={() => alert("Edit order")}
            onClose={() => undefined}
          />
        </div>
      </DemoRow>

      <DemoRow label="Critical — solid bg">
        <div style={{ width: "100%", maxWidth: 640 }}>
          <Banner
            type="critical"
            message="Payment failed. Please update your billing details."
            actionLabel="Update billing"
            onAction={() => alert("Update billing")}
            onClose={() => undefined}
          />
        </div>
      </DemoRow>

      <DemoRow label="Actionable — solid yellow bg">
        <div style={{ width: "100%", maxWidth: 640 }}>
          <Banner
            type="actionable"
            message="New features are available. Update now to unlock them."
            actionLabel="Update"
            onAction={() => alert("Update")}
            onClose={() => undefined}
          />
        </div>
      </DemoRow>

      {/* ── Multi-line ── */}
      <DemoRow label="Multi-Actionable — subtle yellow, bottom accent">
        <div style={{ width: "100%", maxWidth: 640 }}>
          <Banner
            type="multiActionable"
            title="Action required"
            description="Your subscription expires in 3 days. Renew now to keep access to all features and avoid interruptions."
            actionLabel="Renew subscription"
            onAction={() => alert("Renew")}
            onClose={() => undefined}
          />
        </div>
      </DemoRow>

      <DemoRow label="Multi-Critical — subtle red, bottom accent">
        <div style={{ width: "100%", maxWidth: 640 }}>
          <Banner
            type="multiCritical"
            title="Critical error detected"
            description="We could not process your last payment. Please review your billing information and try again to avoid service disruption."
            actionLabel="Fix now"
            onAction={() => alert("Fix now")}
            onClose={() => undefined}
          />
        </div>
      </DemoRow>

      <DemoRow label="Multi-Warning — subtle orange, bottom accent">
        <div style={{ width: "100%", maxWidth: 640 }}>
          <Banner
            type="multiWarning"
            title="Stock running low"
            description="Several items in your saved cart are nearly out of stock. Complete your order soon to avoid missing out."
            actionLabel="Check cart"
            onAction={() => alert("Check cart")}
            onClose={() => undefined}
          />
        </div>
      </DemoRow>

      {/* ── Dismissible (live state) ── */}
      <DemoRow label="Dismissible — live close interaction">
        <div style={{ width: "100%", maxWidth: 640, display: "flex", flexDirection: "column", gap: 10 }}>
          {!dismissed.has("info") && (
            <Banner
              type="information"
              message="Click × to dismiss this banner."
              onClose={() => dismiss("info")}
            />
          )}
          {!dismissed.has("success") && (
            <Banner
              type="success"
              message="Your profile has been updated."
              onClose={() => dismiss("success")}
            />
          )}
          {!dismissed.has("critical") && (
            <Banner
              type="critical"
              message="Unable to connect to server."
              onClose={() => dismiss("critical")}
            />
          )}
          {dismissed.size > 0 && (
            <button
              onClick={reset}
              style={{
                marginTop: 4,
                padding: "6px 14px",
                borderRadius: 8,
                border: "1.5px solid #D4D4D4",
                background: "transparent",
                color: "#525252",
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              Reset banners
            </button>
          )}
        </div>
      </DemoRow>

      {/* ── No close button ── */}
      <DemoRow label="Without close button">
        <div style={{ width: "100%", maxWidth: 640, display: "flex", flexDirection: "column", gap: 10 }}>
          <Banner type="information" message="This banner has no close button." />
          <Banner type="success"     message="Operation completed successfully." />
        </div>
      </DemoRow>

    </DemoShell>
  );
}
