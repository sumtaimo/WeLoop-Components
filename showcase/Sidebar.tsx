import React, { useState } from "react";
import type { ThemeName, ColorMode } from "../src/tokens";

export interface NavItem {
  section: string;
  items: { id: string; label: string; icon?: React.ReactNode }[];
}

interface SidebarProps {
  nav: NavItem[];
  active: string;
  onChange: (id: string) => void;
  theme: ThemeName;
  colorMode: ColorMode;
  onThemeChange: (t: ThemeName) => void;
  onModeChange: (m: ColorMode) => void;
}

const THEMES: { id: ThemeName; label: string }[] = [
  { id: "wabooks",   label: "WABOOKS" },
  { id: "webill365", label: "WeBill" },
  { id: "wecafe",    label: "WeCafe" },
];

const TOTAL_COMPONENTS = 37;

export function Sidebar({ nav, active, onChange, theme, colorMode, onThemeChange, onModeChange }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const totalItems = nav.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <aside
      style={{
        width: 248,
        minWidth: 248,
        background: "#ffffff",
        borderRight: "1px solid #E5E5E5",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      {/* Wordmark header */}
      <div
        style={{
          padding: "18px 16px 14px",
          borderBottom: "1px solid #F0F0F0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: "linear-gradient(135deg, #1D32FF 0%, #3B52FF 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(29,50,255,0.25)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="5" stroke="#fff" strokeWidth="1.5" />
              <path d="M8 3.5v9M3.5 8h9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 15,
                lineHeight: "20px",
                color: "#111827",
                letterSpacing: "-0.3px",
              }}
            >
              WeLoop
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 1 }}>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 10,
                  lineHeight: "14px",
                  color: "#ffffff",
                  background: "#1D32FF",
                  borderRadius: 4,
                  padding: "1px 5px",
                  letterSpacing: "0.1px",
                }}
              >
                2.1
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: 10,
                  lineHeight: "14px",
                  color: "#A3A3A3",
                }}
              >
                Component Library
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "10px 8px 4px" }}>
        {nav.map((section) => (
          <div key={section.section} style={{ marginBottom: 2 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 8px 4px",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 10,
                  lineHeight: "14px",
                  letterSpacing: "0.6px",
                  textTransform: "uppercase",
                  color: "#A3A3A3",
                }}
              >
                {section.section}
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: 10,
                  lineHeight: "14px",
                  color: "#D4D4D4",
                  background: "#F5F5F5",
                  borderRadius: 4,
                  padding: "1px 5px",
                }}
              >
                {section.items.length}
              </span>
            </div>
            {section.items.map((item) => {
              const isActive = item.id === active;
              const isHovered = hoveredItem === item.id && !isActive;
              return (
                <button
                  key={item.id}
                  onClick={() => onChange(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "7px 8px",
                    borderRadius: 7,
                    border: "none",
                    background: isActive
                      ? "var(--color-bg-brand-subtle, #EEF0FF)"
                      : isHovered
                      ? "#F9FAFB"
                      : "transparent",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: isActive ? 500 : 400,
                    fontSize: 13,
                    lineHeight: "18px",
                    letterSpacing: "-0.1px",
                    color: isActive
                      ? "var(--color-text-brand, #1D32FF)"
                      : "#404040",
                    textAlign: "left",
                    transition: "background 0.1s, color 0.1s",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 16,
                      height: 16,
                      flexShrink: 0,
                      color: isActive
                        ? "var(--color-text-brand, #1D32FF)"
                        : isHovered ? "#737373" : "#A3A3A3",
                      transition: "color 0.1s",
                    }}
                  >
                    {item.icon ?? (
                      <svg width="6" height="6" viewBox="0 0 6 6" fill="none" aria-hidden="true">
                        <circle cx="3" cy="3" r="2.5"
                          fill={isActive ? "var(--color-text-brand, #1D32FF)" : "transparent"}
                          stroke={isActive ? "var(--color-text-brand, #1D32FF)" : "#D4D4D4"}
                          strokeWidth="1"
                        />
                      </svg>
                    )}
                  </span>
                  {item.label}
                </button>
              );
            })}
            <div style={{ height: 6 }} />
          </div>
        ))}
      </nav>

      {/* Theme + Mode switcher panel */}
      <div
        style={{
          padding: "12px 12px",
          borderTop: "1px solid #F0F0F0",
        }}
      >
        <div style={{ marginBottom: 10 }}>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 10,
              lineHeight: "14px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#A3A3A3",
              marginBottom: 6,
            }}
          >
            Theme
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {THEMES.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => onThemeChange(id)}
                style={{
                  flex: 1,
                  padding: "5px 4px",
                  fontSize: 10,
                  fontWeight: 500,
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  background: theme === id ? "#1D32FF" : "#F5F5F5",
                  color: theme === id ? "#FFFFFF" : "#737373",
                  transition: "all 0.15s",
                  fontFamily: "Inter, sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 10,
              lineHeight: "14px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#A3A3A3",
              marginBottom: 6,
            }}
          >
            Mode
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {(["light", "dark"] as ColorMode[]).map((m) => (
              <button
                key={m}
                onClick={() => onModeChange(m)}
                style={{
                  flex: 1,
                  padding: "5px 0",
                  fontSize: 11,
                  fontWeight: 500,
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  background: colorMode === m ? "#E5E5E5" : "#F5F5F5",
                  color: colorMode === m ? "#111827" : "#737373",
                  transition: "all 0.15s",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {m === "light" ? "☀ Light" : "☾ Dark"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "10px 16px",
          borderTop: "1px solid #F0F0F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            color: "#A3A3A3",
          }}
        >
          WeLoop 2.1
        </span>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            color: "#D4D4D4",
          }}
        >
          {totalItems} / {TOTAL_COMPONENTS} components
        </span>
      </div>
    </aside>
  );
}
