import React from "react";

export interface NavItem {
  section: string;
  items: { id: string; label: string }[];
}

interface SidebarProps {
  nav: NavItem[];
  active: string;
  onChange: (id: string) => void;
}

export function Sidebar({ nav, active, onChange }: SidebarProps) {
  return (
    <aside
      style={{
        width: 236,
        minWidth: 236,
        background: "#ffffff",
        borderRight: "1px solid #e5e5e5",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 16px 16px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "#1d32ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="4.5" stroke="#fff" strokeWidth="1.5" />
              <path d="M7 2.5v9M2.5 7h9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                lineHeight: "18px",
                color: "#171717",
                letterSpacing: "-0.2px",
              }}
            >
              WeLoop 2.1
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: 11,
                lineHeight: "14px",
                color: "#a3a3a3",
              }}
            >
              Component Library
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px" }}>
        {nav.map((section) => (
          <div key={section.section} style={{ marginBottom: 4 }}>
            <div
              style={{
                padding: "6px 8px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 10,
                lineHeight: "14px",
                letterSpacing: "0.6px",
                textTransform: "uppercase",
                color: "#a3a3a3",
              }}
            >
              {section.section}
            </div>
            {section.items.map((item) => {
              const isActive = item.id === active;
              return (
                <button
                  key={item.id}
                  onClick={() => onChange(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "7px 8px",
                    borderRadius: 7,
                    border: "none",
                    background: isActive ? "#eef0ff" : "transparent",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: isActive ? 500 : 400,
                    fontSize: 13,
                    lineHeight: "18px",
                    letterSpacing: "-0.1px",
                    color: isActive ? "#1d32ff" : "#404040",
                    textAlign: "left",
                    transition: "background 0.1s",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: isActive ? "#1d32ff" : "#d4d4d4",
                      flexShrink: 0,
                      transition: "background 0.1s",
                    }}
                  />
                  {item.label}
                </button>
              );
            })}
            <div style={{ height: 8 }} />
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid #f0f0f0",
          fontFamily: "Inter, sans-serif",
          fontSize: 11,
          color: "#a3a3a3",
        }}
      >
        WeLoop 2.1 · 33 components
      </div>
    </aside>
  );
}
