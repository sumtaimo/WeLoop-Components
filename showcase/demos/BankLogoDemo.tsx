import React, { useState } from "react";
import { DemoShell, DemoRow } from "../DemoShell";
import { BankLogo } from "../../src/components/atoms/BankLogo/BankLogo";
import type { BankName } from "../../src/components/atoms/BankLogo/BankLogo";

const BANKS: BankName[] = [
  "acleda", "acb", "agribank", "anz", "bangkok", "bidv", "bongloy", "bred",
  "cake", "cathay", "chase", "chip-mong", "cimb", "city", "dbs", "deutsche",
  "eximbank", "hana", "hsbc", "icbc", "kb", "ncb", "oriental", "public",
  "rhb", "sathapana", "scb", "scotiabank", "shinhan", "standard-chartered",
  "techcom", "truemoney", "vietcombank", "vietinbank", "vpbank", "wing",
];

export function BankLogoDemo() {
  const [size, setSize] = useState(40);

  return (
    <DemoShell
      title="BankLogo"
      description="124 bank and payment provider logos — brand colors preserved. Size prop controls height; width scales automatically via viewBox aspect ratio."
    >
      <DemoRow label="Controls">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--showcase-label, #A3A3A3)" }}>
            Height
          </span>
          {[24, 32, 40, 48, 64].map(s => (
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

      <div style={{ marginTop: 8 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: 8,
        }}>
          {BANKS.map(bank => (
            <div
              key={bank}
              title={bank}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "16px 12px 12px",
                borderRadius: 8,
                border: "1px solid var(--showcase-shell-border, #E5E5E5)",
                background: "var(--showcase-shell-bg, #fff)",
                minHeight: 80,
              }}
            >
              <BankLogo name={bank} size={size} />
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                fontWeight: 500,
                color: "var(--showcase-label, #A3A3A3)",
                textAlign: "center",
                lineHeight: 1.3,
                wordBreak: "break-all",
              }}>
                {bank}
              </span>
            </div>
          ))}
        </div>
      </div>

      <DemoRow label="Inline usage">
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <BankLogo name="acleda" size={32} />
          <BankLogo name="bidv" size={32} />
          <BankLogo name="vietcombank" size={32} />
          <BankLogo name="bangkok" size={32} />
          <BankLogo name="scb" size={32} />
          <BankLogo name="hsbc" size={32} />
          <BankLogo name="dbs" size={32} />
          <BankLogo name="anz" size={32} />
        </div>
      </DemoRow>
    </DemoShell>
  );
}
