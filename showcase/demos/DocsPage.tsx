import React, { useState } from "react";
import { DocsViewer } from "../DocsViewer";
import type { ColorMode } from "../../src/tokens";

// Vite ?raw imports — each file comes in as a plain string
// @ts-ignore
import overviewMd      from "../../docs/00-overview.md?raw";
// @ts-ignore
import colorsMd        from "../../docs/01-foundation/colors.md?raw";
// @ts-ignore
import typographyMd    from "../../docs/01-foundation/typography.md?raw";
// @ts-ignore
import spacingMd       from "../../docs/01-foundation/spacing.md?raw";
// @ts-ignore
import colorTokensMd   from "../../docs/02-tokens/color-tokens.md?raw";
// @ts-ignore
import shadowTokensMd  from "../../docs/02-tokens/shadow-tokens.md?raw";
// @ts-ignore
import themeGuideMd    from "../../docs/02-tokens/theme-guide.md?raw";
// @ts-ignore
import customThemeMd   from "../../docs/04-theming/custom-theme.md?raw";
// @ts-ignore
import cssVarsMd       from "../../docs/04-theming/css-variables.md?raw";

// ─── Doc registry ─────────────────────────────────────────────────────────────

interface DocEntry {
  id: string;
  label: string;
  content: string;
}

interface DocGroup {
  group: string;
  items: DocEntry[];
}

const DOC_GROUPS: DocGroup[] = [
  {
    group: "Getting Started",
    items: [
      { id: "overview",   label: "Overview",      content: overviewMd },
    ],
  },
  {
    group: "Foundation",
    items: [
      { id: "colors",     label: "Color Palette", content: colorsMd },
      { id: "typography", label: "Typography",    content: typographyMd },
      { id: "spacing",    label: "Spacing",       content: spacingMd },
    ],
  },
  {
    group: "Design Tokens",
    items: [
      { id: "color-tokens",  label: "Color Tokens",  content: colorTokensMd },
      { id: "shadow-tokens", label: "Shadow Tokens",  content: shadowTokensMd },
      { id: "theme-guide",   label: "Theme Guide",    content: themeGuideMd },
    ],
  },
  {
    group: "Theming",
    items: [
      { id: "custom-theme",  label: "Custom Themes",  content: customThemeMd },
      { id: "css-variables", label: "CSS Variables",  content: cssVarsMd },
    ],
  },
];

const ALL_DOCS = DOC_GROUPS.flatMap((g) => g.items);

// ─── Component ────────────────────────────────────────────────────────────────

interface DocsPageProps {
  colorMode: ColorMode;
  initialDoc?: string;
}

export function DocsPage({ colorMode, initialDoc = "overview" }: DocsPageProps) {
  const [activeId, setActiveId] = useState(initialDoc);
  const activeDoc = ALL_DOCS.find((d) => d.id === activeId) ?? ALL_DOCS[0];
  const isDark = colorMode === "dark";

  const sidebarBg    = isDark ? "#1E293B" : "#F9FAFB";
  const sidebarBorder = isDark ? "rgba(255,255,255,0.06)" : "#E5E5E5";
  const groupLabel   = isDark ? "#64748B" : "#A3A3A3";
  const itemFg       = isDark ? "#CBD5E1" : "#374151";
  const itemHoverBg  = isDark ? "rgba(255,255,255,0.04)" : "#F3F4F6";
  const activeItemBg = isDark ? "rgba(29,50,255,0.14)" : "#EAF3FF";
  const activeItemFg = isDark ? "#93B4FF" : "#1D32FF";

  return (
    <div style={{ display: "flex", gap: 0, minHeight: "100%", fontFamily: "Inter, sans-serif" }}>

      {/* ── Left nav ───────────────────────────────────────────────────────── */}
      <nav
        style={{
          width: 200,
          flexShrink: 0,
          background: sidebarBg,
          borderRight: `1px solid ${sidebarBorder}`,
          padding: "20px 0",
          position: "sticky",
          top: 0,
          alignSelf: "flex-start",
          height: "calc(100vh - 80px)",
          overflowY: "auto",
          borderRadius: "10px 0 0 10px",
        }}
      >
        {DOC_GROUPS.map((group) => (
          <div key={group.group} style={{ marginBottom: 20 }}>
            <div
              style={{
                padding: "2px 16px 6px",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: groupLabel,
              }}
            >
              {group.group}
            </div>
            {group.items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  style={{
                    display: "block",
                    width: "calc(100% - 8px)",
                    textAlign: "left",
                    padding: "6px 16px",
                    border: "none",
                    background: isActive ? activeItemBg : "transparent",
                    color: isActive ? activeItemFg : itemFg,
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    cursor: "pointer",
                    borderRadius: 6,
                    margin: "1px 4px",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = itemHoverBg;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, padding: "0 0 0 40px", minWidth: 0 }}>
        <DocsViewer content={activeDoc.content} mode={colorMode} />
      </div>
    </div>
  );
}
