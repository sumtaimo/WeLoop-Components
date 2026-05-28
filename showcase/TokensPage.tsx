import React, { useState } from "react";
import {
  primitives,
  fontFamily, fontSize, lineHeight, fontWeight, letterSpacing,
  spacingScale, radius, stroke, controlSize,
  wabooksLight, wabooksDark, webill365Light, webill365Dark, wecafeLight, wecafeDark,
} from "../src/tokens";
import type { ThemeName, ColorMode, ThemeTokens } from "../src/tokens";

const themeMap: Record<ThemeName, Record<ColorMode, ThemeTokens>> = {
  webill365: { light: webill365Light, dark: webill365Dark },
  wabooks:   { light: wabooksLight,   dark: wabooksDark   },
  wecafe:    { light: wecafeLight,    dark: wecafeDark    },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "color-primitive" | "color-semantic" | "typography" | "spacing" | "radius" | "effects";

interface Props {
  themeName: ThemeName;
  colorMode: ColorMode;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isLight(hex: string) {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return true;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        });
      }}
      title="Copy"
      style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: "2px 4px",
        borderRadius: 4,
        fontSize: 11,
        color: copied ? "#22C55E" : "#A3A3A3",
        fontFamily: "Inter, sans-serif",
        flexShrink: 0,
      }}
    >
      {copied ? "✓" : "⎘"}
    </button>
  );
}

// ─── Tab styles ───────────────────────────────────────────────────────────────

const TAB_LIST: { id: Tab; label: string }[] = [
  { id: "color-primitive", label: "Color Primitives" },
  { id: "color-semantic",  label: "Semantic Colors"  },
  { id: "typography",      label: "Typography"       },
  { id: "spacing",         label: "Spacing"          },
  { id: "radius",          label: "Radius"           },
  { id: "effects",         label: "Effects"          },
];

// ─── Color Primitives tab ─────────────────────────────────────────────────────

function ColorPrimitivesTab() {
  const palettes = Object.entries(primitives) as [string, Record<string | number, string>][];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {palettes.map(([name, shades]) => (
        <div key={name}>
          <h3 style={sectionTitle}>{name}</h3>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {Object.entries(shades).map(([step, value]) => (
              <div
                key={step}
                title={`${name}.${step}: ${value}`}
                style={{
                  width: 64,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    height: 48,
                    borderRadius: 8,
                    background: value,
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxSizing: "border-box",
                  }}
                />
                <div style={{ textAlign: "center" }}>
                  <div style={tokenLabel}>{step}</div>
                  <div style={tokenValue}>{value.replace("rgba", "").replace(/[()]/g, "").slice(0, 7)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Semantic Colors tab ──────────────────────────────────────────────────────

function flatten(obj: object, prefix = ""): [string, string][] {
  const result: [string, string][] = [];
  for (const [key, val] of Object.entries(obj)) {
    const k = prefix ? `${prefix}.${key}` : key;
    if (typeof val === "string") result.push([k, val]);
    else if (typeof val === "object" && val !== null) result.push(...flatten(val, k));
  }
  return result;
}

function SemanticColorsTab({ themeName, colorMode }: Props) {
  const tokens = themeMap[themeName][colorMode];
  const bgTokens = flatten(tokens.color.bg, "bg");
  const textTokens = flatten(tokens.color.text, "text");
  const borderTokens = flatten(tokens.color.border, "border");

  const groups = [
    { label: "Background", tokens: bgTokens },
    { label: "Text",       tokens: textTokens },
    { label: "Border",     tokens: borderTokens },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {groups.map(({ label, tokens: toks }) => (
        <div key={label}>
          <h3 style={sectionTitle}>{label}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {toks.map(([name, value]) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "6px 12px",
                  borderRadius: 8,
                  background: "var(--showcase-shell-bg, #fff)",
                  border: "1px solid var(--showcase-shell-border, #E5E5E5)",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background: value,
                    border: "1px solid rgba(0,0,0,0.08)",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--showcase-title, #171717)", fontWeight: 500 }}>
                    color.{name}
                  </div>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--showcase-text-subtle, #737373)" }}>
                  {value}
                </div>
                <CopyButton value={value} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Typography tab ───────────────────────────────────────────────────────────

function TypographyTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* Font Families */}
      <div>
        <h3 style={sectionTitle}>Font Family</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {Object.entries(fontFamily).map(([name, value]) => (
            <div key={name} style={tokenRow}>
              <div style={{ flex: 1 }}>
                <div style={{ ...tokenLabel, textTransform: "none", fontSize: 13, fontWeight: 500, fontFamily: value }}>
                  {name} — {value.split(",")[0]}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--showcase-text-subtle, #737373)", marginTop: 2 }}>
                  {value}
                </div>
              </div>
              <CopyButton value={value} />
            </div>
          ))}
        </div>
      </div>

      {/* Font Sizes */}
      <div>
        <h3 style={sectionTitle}>Font Size</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {(Object.entries(fontSize) as [string, Record<string, number>][]).map(([group, sizes]) =>
            Object.entries(sizes).map(([variant, size]) => (
              <div key={`${group}-${variant}`} style={tokenRow}>
                <div
                  style={{
                    fontSize: Math.min(size, 32),
                    fontFamily: "Inter, sans-serif",
                    color: "var(--showcase-title, #171717)",
                    lineHeight: 1.2,
                    minWidth: 120,
                    flexShrink: 0,
                  }}
                >
                  {group}.{variant}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--showcase-text-subtle, #737373)" }}>
                    fontSize.{group}.{variant}
                  </div>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--showcase-title, #171717)", fontWeight: 600 }}>
                  {size}px
                </div>
                <CopyButton value={`${size}`} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Font Weights */}
      <div>
        <h3 style={sectionTitle}>Font Weight</h3>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {Object.entries(fontWeight).map(([name, weight]) => (
            <div key={name} style={{
              padding: "16px 20px",
              borderRadius: 10,
              background: "var(--showcase-shell-bg, #fff)",
              border: "1px solid var(--showcase-shell-border, #E5E5E5)",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              minWidth: 120,
            }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 28, fontWeight: weight, color: "var(--showcase-title, #171717)", lineHeight: 1 }}>
                Ag
              </div>
              <div style={tokenLabel}>{name}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--showcase-text-subtle, #737373)" }}>{weight}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Letter Spacing */}
      <div>
        <h3 style={sectionTitle}>Letter Spacing</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {Object.entries(letterSpacing).map(([name, value]) => (
            <div key={name} style={tokenRow}>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 16, letterSpacing: value, color: "var(--showcase-title, #171717)", minWidth: 180, flexShrink: 0 }}>
                The quick brown fox
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--showcase-text-subtle, #737373)", flex: 1 }}>
                letterSpacing.{name}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--showcase-title, #171717)", fontWeight: 600 }}>
                {value}
              </div>
              <CopyButton value={value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Spacing tab ──────────────────────────────────────────────────────────────

function SpacingTab() {
  const groups = Object.entries(spacingScale) as [string, Record<string | number, number>][];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {groups.map(([group, values]) => (
        <div key={group}>
          <h3 style={sectionTitle}>{group}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {Object.entries(values).map(([step, px]) => (
              <div key={step} style={{ display: "flex", alignItems: "center", gap: 16, padding: "8px 12px", borderRadius: 8, background: "var(--showcase-shell-bg, #fff)", border: "1px solid var(--showcase-shell-border, #E5E5E5)" }}>
                <div style={{ width: 80, flexShrink: 0, display: "flex", alignItems: "center" }}>
                  <div style={{
                    height: 16,
                    width: Math.min(px * 2, 120),
                    background: "var(--showcase-title, #171717)",
                    opacity: 0.15,
                    borderRadius: 2,
                    minWidth: 2,
                  }} />
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--showcase-title, #171717)", fontWeight: 600, minWidth: 32 }}>
                  {px}px
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--showcase-text-subtle, #737373)", flex: 1 }}>
                  spacingScale.{group}.{step}
                </div>
                <CopyButton value={`${px}px`} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Control sizes */}
      <div>
        <h3 style={sectionTitle}>Control Size</h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-end" }}>
          {Object.entries(controlSize).map(([name, px]) => (
            <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                width: px,
                height: px,
                borderRadius: 6,
                background: "var(--showcase-title, #171717)",
                opacity: 0.1,
                border: "1px dashed var(--showcase-text-subtle, #737373)",
              }} />
              <div style={tokenLabel}>{name}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--showcase-text-subtle, #737373)" }}>{px}px</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Radius tab ───────────────────────────────────────────────────────────────

function RadiusTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <h3 style={sectionTitle}>Border Radius</h3>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end" }}>
          {Object.entries(radius).map(([name, px]) => (
            <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: Math.min(px, 32),
                background: "var(--showcase-shell-bg, #fff)",
                border: "2px solid var(--showcase-title, #171717)",
                opacity: 0.7,
              }} />
              <div style={tokenLabel}>{name}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--showcase-text-subtle, #737373)" }}>
                {px === 999 ? "999px" : `${px}px`}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={sectionTitle}>Stroke Width</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {Object.entries(stroke).map(([name, px]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 16px", borderRadius: 8, background: "var(--showcase-shell-bg, #fff)", border: "1px solid var(--showcase-shell-border, #E5E5E5)" }}>
              <div style={{ width: 120, height: Math.max(px, 0.5), background: "var(--showcase-title, #171717)", flexShrink: 0, borderRadius: 1 }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, color: "var(--showcase-title, #171717)", minWidth: 40 }}>
                {px}px
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--showcase-text-subtle, #737373)", flex: 1 }}>
                stroke.{name}
              </div>
              <CopyButton value={`${px}px`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Effects tab ─────────────────────────────────────────────────────────────

function ShadowRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px", borderRadius: 10, background: "var(--showcase-shell-bg, #fff)", border: "1px solid var(--showcase-shell-border, #E5E5E5)" }}>
      <div style={{ width: 56, height: 56, borderRadius: 10, background: "var(--showcase-shell-bg, #fff)", boxShadow: value, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--showcase-title, #171717)", fontWeight: 500 }}>
          {label}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--showcase-text-subtle, #737373)", marginTop: 3, wordBreak: "break-all" }}>
          {value}
        </div>
      </div>
      <CopyButton value={value} />
    </div>
  );
}

function ShadowSection({ title, entries }: { title: string; entries: [string, string][] }) {
  return (
    <div>
      <h3 style={sectionTitle}>{title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {entries.map(([name, value]) => (
          <ShadowRow key={name} label={name} value={value} />
        ))}
      </div>
    </div>
  );
}

function EffectsTab({ themeName, colorMode }: Props) {
  const tokens = themeMap[themeName][colorMode];
  const s = tokens.shadow;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <ShadowSection title="Brand" entries={Object.entries(s.brand).map(([k, v]) => [`shadow.brand.${k}`, v])} />
      <ShadowSection title="Default" entries={Object.entries(s.default).map(([k, v]) => [`shadow.default.${k}`, v])} />
      <ShadowSection title="Danger" entries={Object.entries(s.danger).map(([k, v]) => [`shadow.danger.${k}`, v])} />
      <ShadowSection title="Toggle" entries={Object.entries(s.toggle).map(([k, v]) => [`shadow.toggle.${k}`, v])} />
      <ShadowSection title="Input" entries={Object.entries(s.input).map(([k, v]) => [`shadow.input.${k}`, v])} />
      <ShadowSection title="Disabled" entries={[["shadow.disabled", s.disabled]]} />
      <ShadowSection title="Floating" entries={Object.entries(s.floating).map(([k, v]) => [`shadow.floating.${k}`, v])} />
    </div>
  );
}

// ─── Shared micro-styles ──────────────────────────────────────────────────────

const sectionTitle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 600,
  fontSize: 13,
  color: "var(--showcase-title, #171717)",
  marginBottom: 12,
  letterSpacing: "-0.1px",
};

const tokenLabel: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: 10,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "var(--showcase-label, #A3A3A3)",
};

const tokenValue: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  fontSize: 9,
  color: "var(--showcase-text-subtle, #737373)",
  marginTop: 2,
};

const tokenRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "8px 12px",
  borderRadius: 8,
  background: "var(--showcase-shell-bg, #fff)",
  border: "1px solid var(--showcase-shell-border, #E5E5E5)",
};

// ─── Main TokensPage ──────────────────────────────────────────────────────────

export function TokensPage({ themeName, colorMode }: Props) {
  const [tab, setTab] = useState<Tab>("color-primitive");

  return (
    <div>
      {/* Page header */}
      <h1 style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 600,
        fontSize: 22,
        lineHeight: "28px",
        letterSpacing: "-0.4px",
        color: "var(--showcase-title, #171717)",
        marginBottom: 6,
      }}>
        Design Tokens
      </h1>
      <p style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 14,
        lineHeight: "22px",
        color: "var(--showcase-text-subtle, #737373)",
        marginBottom: 24,
        maxWidth: 560,
      }}>
        All design decisions codified. Primitive palettes, semantic aliases, typography, spacing, and effects — theme-aware.
      </p>

      {/* Tab bar */}
      <div style={{
        display: "flex",
        gap: 2,
        borderBottom: "1px solid var(--showcase-shell-border, #E5E5E5)",
        marginBottom: 28,
        overflowX: "auto",
      }}>
        {TAB_LIST.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              fontWeight: tab === t.id ? 600 : 400,
              padding: "8px 14px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: tab === t.id ? "var(--showcase-title, #171717)" : "var(--showcase-text-subtle, #737373)",
              borderBottom: tab === t.id ? "2px solid #1D32FF" : "2px solid transparent",
              marginBottom: -1,
              whiteSpace: "nowrap",
              transition: "color 0.12s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "color-primitive" && <ColorPrimitivesTab />}
      {tab === "color-semantic"  && <SemanticColorsTab themeName={themeName} colorMode={colorMode} />}
      {tab === "typography"      && <TypographyTab />}
      {tab === "spacing"         && <SpacingTab />}
      {tab === "radius"          && <RadiusTab />}
      {tab === "effects"         && <EffectsTab themeName={themeName} colorMode={colorMode} />}
    </div>
  );
}
