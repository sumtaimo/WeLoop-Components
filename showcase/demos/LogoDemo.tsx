import React, { useState } from "react";
import { DemoShell, DemoRow } from "../DemoShell";
import { Logo } from "../../src/components/atoms/Logo/Logo";
import type { LogoName } from "../../src/components/atoms/Logo/Logo";

const BRAND_LOGOS: { name: LogoName; label: string; desc: string }[] = [
  { name: "webill365-wordmark", label: "WeBill365 Wordmark",  desc: "Full brand name — nav headers, login screens" },
  { name: "webill365-compact",  label: "WeBill365 Compact",   desc: "16×16 — tight spaces, badges" },
  { name: "webill365-mark",     label: "WeBill365 Mark",      desc: "18×18 square — favicon, avatar, app icon" },
  { name: "wabooks",            label: "WABOOKS Mark",        desc: "17×17 — WABOOKS brand mark" },
  { name: "webcash-group",      label: "Webcash Group",       desc: "Wide wordmark — brand header" },
  { name: "webcash",            label: "Webcash",             desc: "Compact wordmark" },
  { name: "caminv",             label: "Caminv",              desc: "17×17 — Cambodia Invest mark" },
];

const PAYMENT_LOGOS: { name: LogoName; label: string }[] = [
  { name: "mastercard", label: "Mastercard" },
  { name: "visa",       label: "Visa" },
  { name: "khqr",       label: "KHQR" },
  { name: "ppcb",       label: "PPCB" },
  { name: "ppcb-wordmark", label: "PPCB Wordmark" },
  { name: "new",        label: "New" },
];

export function LogoDemo() {
  const [height, setHeight] = useState(32);

  return (
    <DemoShell
      title="Logo"
      category="atom"
      description="Brand wordmarks and payment badge marks — hardcoded colors (Tier 3), never use currentColor. Scale by height; width adjusts via viewBox aspect ratio."
      importCode={`import { Logo } from 'weloop-components';\nimport type { LogoName } from 'weloop-components';`}
    >
      <DemoRow label="Size">
        <div style={{ display: "flex", gap: 6 }}>
          {[16, 24, 32, 40, 48].map(s => (
            <button
              key={s}
              onClick={() => setHeight(s)}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                padding: "4px 10px",
                borderRadius: 6,
                border: "1px solid var(--showcase-shell-border, #E5E5E5)",
                background: height === s ? "var(--color-bg-brand-primary, #1D32FF)" : "var(--showcase-shell-bg, #fff)",
                color: height === s ? "#fff" : "var(--showcase-title, #171717)",
                cursor: "pointer",
                fontWeight: height === s ? 600 : 400,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </DemoRow>

      <DemoRow label="Brand logos">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 8,
          width: "100%",
        }}>
          {BRAND_LOGOS.map(({ name, label, desc }) => (
            <div
              key={name}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: "20px 16px 14px",
                borderRadius: 10,
                border: "1px solid var(--showcase-shell-border, #E5E5E5)",
                background: "var(--showcase-shell-bg, #fff)",
              }}
            >
              <Logo name={name} height={height} />
              <div>
                <div style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--showcase-title, #171717)",
                }}>
                  {label}
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "var(--color-bg-brand-primary, #1D32FF)",
                  marginTop: 2,
                }}>
                  {name}
                </div>
                <div style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  color: "var(--showcase-label, #A3A3A3)",
                  marginTop: 4,
                  lineHeight: "14px",
                }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DemoRow>

      <DemoRow label="Payment & badge marks">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 8,
          width: "100%",
        }}>
          {PAYMENT_LOGOS.map(({ name, label }) => (
            <div
              key={name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                padding: "20px 16px 14px",
                borderRadius: 10,
                border: "1px solid var(--showcase-shell-border, #E5E5E5)",
                background: "var(--showcase-shell-bg, #fff)",
                minHeight: 80,
              }}
            >
              <Logo name={name} height={height} />
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--showcase-title, #171717)",
                }}>
                  {label}
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "var(--color-bg-brand-primary, #1D32FF)",
                  marginTop: 2,
                }}>
                  {name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DemoRow>

      <DemoRow label="Inline with text">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--showcase-title, #171717)" }}>
            <Logo name="webill365-wordmark" height={24} />
            <span style={{ color: "var(--showcase-label, #A3A3A3)" }}>·</span>
            <span>Powered by WeBill365</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--showcase-title, #171717)" }}>
            <span>Pay with</span>
            <Logo name="visa" height={18} />
            <Logo name="mastercard" height={18} />
            <Logo name="khqr" height={18} />
          </div>
        </div>
      </DemoRow>
    </DemoShell>
  );
}
