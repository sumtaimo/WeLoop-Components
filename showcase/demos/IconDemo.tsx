import React, { useState } from "react";
import { DemoShell, DemoRow } from "../DemoShell";
import * as Icons from "../../src/components/atoms/Icon/Icon";
import type { IconProps } from "../../src/components/atoms/Icon/Icon";

type IconComponent = React.ComponentType<IconProps>;

const ALL_ICONS = Object.entries(Icons).filter(
  ([key]) => key.startsWith("Icon") && key !== "IconProps"
) as [string, IconComponent][];

const COLORS = ["#171717", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export function IconDemo() {
  const [search, setSearch] = useState("");
  const [size, setSize]     = useState(24);
  const [color, setColor]   = useState("#171717");

  const filtered = ALL_ICONS.filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DemoShell
      title="Icons"
      description={`${ALL_ICONS.length} tree-shakeable icon components — monochrome icons follow currentColor, brand icons keep their fill. Import individually: import { IconAdd } from 'weloop-components'.`}
    >
      {/* Controls */}
      <DemoRow label="Controls">
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Search icons…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              padding: "6px 12px",
              borderRadius: 8,
              border: "1px solid var(--showcase-shell-border, #E5E5E5)",
              background: "var(--showcase-shell-bg, #fff)",
              color: "var(--showcase-title, #171717)",
              outline: "none",
              width: 220,
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--showcase-label, #A3A3A3)" }}>
              Size
            </span>
            {[16, 20, 24, 32].map(s => (
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
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--showcase-label, #A3A3A3)" }}>
              Color
            </span>
            {COLORS.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                title={c}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: c,
                  border: color === c ? "2px solid #3B82F6" : "2px solid transparent",
                  outline: color === c ? "2px solid #3B82F6" : "none",
                  outlineOffset: 1,
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </DemoRow>

      {/* Grid */}
      <div style={{ marginTop: 8 }}>
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 11,
          color: "var(--showcase-label, #A3A3A3)",
          marginBottom: 12,
        }}>
          {filtered.length} icons
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(88px, 1fr))",
          gap: 4,
        }}>
          {filtered.map(([name, IconComponent]) => (
            <div
              key={name}
              title={name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                padding: "12px 8px 10px",
                borderRadius: 8,
                border: "1px solid var(--showcase-shell-border, #E5E5E5)",
                background: "var(--showcase-shell-bg, #fff)",
                cursor: "default",
                overflow: "hidden",
              }}
            >
              <IconComponent size={size} color={color} />
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 9,
                fontWeight: 500,
                color: "var(--showcase-label, #A3A3A3)",
                textAlign: "center",
                lineHeight: 1.3,
                wordBreak: "break-all",
                maxWidth: "100%",
              }}>
                {name.replace(/^Icon/, "")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DemoShell>
  );
}
