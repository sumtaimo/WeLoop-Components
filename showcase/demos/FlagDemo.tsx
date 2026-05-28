import React, { useState } from "react";
import { DemoShell, DemoRow } from "../DemoShell";
import { Flag } from "../../src/components/atoms/Flag/Flag";
import type { FlagCountry, FlagStyle } from "../../src/components/atoms/Flag/Flag";

const COUNTRIES: FlagCountry[] = [
  "canbodia",
  "china",
  "south-korea",
  "united-kingdom",
  "united-states-of-america",
  "vietnam",
];

const STYLES: FlagStyle[] = ["circle", "rounded", "shape"];

const COUNTRY_LABELS: Record<FlagCountry, string> = {
  canbodia: "Cambodia",
  china: "China",
  "south-korea": "South Korea",
  "united-kingdom": "United Kingdom",
  "united-states-of-america": "USA",
  vietnam: "Vietnam",
};

export function FlagDemo() {
  const [size, setSize] = useState(32);

  return (
    <DemoShell
      title="Flag"
      description="6 countries × 3 styles = 18 flag variants. Use flagStyle prop to switch between circle, rounded, and shape variants."
    >
      <DemoRow label="Controls">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--showcase-label, #A3A3A3)" }}>
            Size
          </span>
          {[16, 24, 32, 48].map(s => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                padding: "4px 10px",
                borderRadius: 6,
                border: "1px solid var(--showcase-shell-border, #E5E5E5)",
                background: size === s ? "#3B82F6" : "var(--showcase-shell-bg, #fff)",
                color: size === s ? "#fff" : "var(--showcase-title, #171717)",
                cursor: "pointer",
                fontWeight: size === s ? 600 : 400,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </DemoRow>

      {STYLES.map(flagStyle => (
        <DemoRow key={flagStyle} label={`style="${flagStyle}"`}>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-end", flexWrap: "wrap" }}>
            {COUNTRIES.map(country => (
              <div
                key={country}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Flag flagStyle={flagStyle} country={country} size={size} />
                <span style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  fontWeight: 500,
                  color: "var(--showcase-label, #A3A3A3)",
                  whiteSpace: "nowrap",
                }}>
                  {COUNTRY_LABELS[country]}
                </span>
              </div>
            ))}
          </div>
        </DemoRow>
      ))}

      <DemoRow label="All sizes — Vietnam circle">
        <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
          {[16, 20, 24, 32, 40, 48, 64].map(s => (
            <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <Flag country="vietnam" size={s} />
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                color: "var(--showcase-label, #A3A3A3)",
              }}>
                {s}px
              </span>
            </div>
          ))}
        </div>
      </DemoRow>
    </DemoShell>
  );
}
