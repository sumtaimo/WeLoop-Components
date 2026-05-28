import React, { useState } from "react";
import { DemoShell, DemoRow } from "../DemoShell";
import { BankLogo } from "../../src/components/atoms/BankLogo/BankLogo";
import type { BankName } from "../../src/components/atoms/BankLogo/BankLogo";

const MARK_BANKS: BankName[] = [
  "acleda", "acb", "agribank", "amk", "anz", "asia",
  "bangkok_bank", "bank_of_china", "bidv", "bongloy", "bred_bank",
  "cake", "canadia_bank_plc", "cathay", "chase", "chip_mong_bank",
  "cimb_bank", "citibank", "commonwealth", "dbs", "deutsche",
  "dong_a_bank", "eximbank", "ftb", "hana", "hattha_bank",
  "hd_bank", "heng_feng_bank", "hongleong_bank", "hsbc", "ibk",
  "icbc", "ipay88", "kb_prasac_bank", "lolc", "maybank",
  "mbcambodia", "mega_icb", "mizuho", "msb", "nam_a_bank",
  "napas", "ncb", "ocb", "ocean_bank", "oriental_bank",
  "pi_pay", "ppcbank", "public_bank", "sathapana_bank",
  "scotiabank", "sea_bank", "shinhan_bank", "shinhan_kr",
  "smfg", "standard_chartered", "techcombank", "truemoney",
  "tyme_bank", "ucb", "vib", "viet_capital", "vietcombank",
  "vietinbank", "vpbank", "wing_bank", "woori_bank",
];

const WORDMARK_BANKS: BankName[] = [
  "acleda_wordmark", "agricultural_wordmark", "bank_of_china_wordmark",
  "bic_bank_wordmark", "canadia_bank_plc_wordmark", "cheif_bank_wordmark",
  "chip_mong_bank_wordmark", "cimb_bank_wordmark", "heng_feng_bank_wordmark",
  "hongleong_bank_wordmark", "icbc_wordmark", "kb_prasac_bank_wordmark",
  "maybank_wordmark", "mbcambodia_wordmark", "oriental_bank_wordmark",
  "pi_pay_wordmark", "ppcbank_wordmark", "public_bank_wordmark",
  "sathapana_bank_wordmark", "shinhan_bank_wordmark", "woori_bank_wordmark",
];

export function BankLogoDemo() {
  const [size, setSize] = useState(40);
  const [tab, setTab] = useState<"mark" | "wordmark">("mark");

  const banks = tab === "mark" ? MARK_BANKS : WORDMARK_BANKS;

  return (
    <DemoShell
      title="BankLogo"
      category="atom"
      description="127 bank and payment provider logos — brand colors preserved. Marks (square icons) and Wordmarks (full name banners) available for most banks."
      importCode={`import { BankLogo } from 'weloop-components';\nimport type { BankName } from 'weloop-components';`}
    >
      <DemoRow label="Controls">
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 6 }}>
            {(["mark", "wordmark"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  padding: "5px 12px",
                  borderRadius: 6,
                  border: "1px solid var(--showcase-shell-border, #E5E5E5)",
                  background: tab === t ? "var(--color-bg-brand-primary, #1D32FF)" : "var(--showcase-shell-bg, #fff)",
                  color: tab === t ? "#fff" : "var(--showcase-title, #171717)",
                  cursor: "pointer",
                  fontWeight: 500,
                  textTransform: "capitalize",
                }}
              >
                {t} ({t === "mark" ? MARK_BANKS.length : WORDMARK_BANKS.length})
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, borderLeft: "1px solid var(--showcase-shell-border, #E5E5E5)", paddingLeft: 12 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--showcase-label, #A3A3A3)", alignSelf: "center" }}>
              Size
            </span>
            {[24, 32, 40, 48].map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  padding: "4px 10px",
                  borderRadius: 6,
                  border: "1px solid var(--showcase-shell-border, #E5E5E5)",
                  background: size === s ? "#6366F1" : "var(--showcase-shell-bg, #fff)",
                  color: size === s ? "#fff" : "var(--showcase-title, #171717)",
                  cursor: "pointer",
                  fontWeight: size === s ? 600 : 400,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </DemoRow>

      <div style={{
        display: "grid",
        gridTemplateColumns: tab === "wordmark"
          ? "repeat(auto-fill, minmax(200px, 1fr))"
          : "repeat(auto-fill, minmax(120px, 1fr))",
        gap: 8,
        marginTop: 4,
      }}>
        {banks.map(bank => (
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

      <DemoRow label="Inline usage">
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <BankLogo name="acleda" size={32} />
          <BankLogo name="bidv" size={32} />
          <BankLogo name="vietcombank" size={32} />
          <BankLogo name="bangkok_bank" size={32} />
          <BankLogo name="hsbc" size={32} />
          <BankLogo name="dbs" size={32} />
          <BankLogo name="anz" size={32} />
          <BankLogo name="shinhan_bank" size={32} />
        </div>
      </DemoRow>
    </DemoShell>
  );
}
