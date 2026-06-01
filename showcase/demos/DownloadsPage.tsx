import React, { useState } from "react";
import { IconAttach16, IconDoc16, IconBolt, IconCheck16 } from "../../src/components/atoms/Icon/Icon";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Package {
  id: string;
  filename: string;
  title: string;
  subtitle: string;
  description: string;
  size: string;
  color: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
  includes: string[];
  badge?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PACKAGES: Package[] = [
  {
    id: "full",
    filename: "weloop-library-full.zip",
    title: "Full Library",
    subtitle: "Everything in one folder",
    description: "Complete package — components, tokens, themes, and all documentation combined into one clean folder structure.",
    size: "1.6 MB",
    color: "#1D32FF",
    bg: "#EAF3FF",
    border: "#B9D3FF",
    badge: "Recommended",
    icon: <IconAttach16 size={20} />,
    includes: [
      "35 components (atoms · molecules · organisms)",
      "6 brand themes (webill365 · wabooks · wecafe × light/dark)",
      "44 markdown documentation files",
      "Design token system (primitives · spacing · typography)",
      "ThemeProvider + CSS variable map",
      "Tailwind · PostCSS · TypeScript config",
    ],
  },
  {
    id: "components",
    filename: "weloop-components-src.zip",
    title: "Components Only",
    subtitle: "Source files · TSX + index.ts",
    description: "Just the component source files. Atoms, molecules, organisms — each in its own folder with TypeScript interfaces.",
    size: "1.6 MB",
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    icon: <IconDoc16 size={20} />,
    includes: [
      "24 atom components",
      "6 molecule components",
      "5 organism components",
      "All TypeScript interfaces",
      "index.ts barrel exports",
    ],
  },
  {
    id: "styles",
    filename: "weloop-style-effects.zip",
    title: "Style & Tokens",
    subtitle: "Themes · CSS vars · config",
    description: "The complete token and theme system. Color primitives, semantic tokens, 6 brand themes, and the CSS variable mapper.",
    size: "18 KB",
    color: "#9333EA",
    bg: "#FAF5FF",
    border: "#E9D5FF",
    icon: <IconBolt size={20} />,
    includes: [
      "Color primitives (blue · gray · green · red · orange…)",
      "Spacing scale + typography scale",
      "6 brand theme files",
      "ThemeProvider + applyThemeToCSSVars (60+ CSS vars)",
      "createCustomTheme utility",
      "tailwind.config.js · postcss.config.js · tsconfig.json",
    ],
  },
  {
    id: "docs",
    filename: "weloop-docs.zip",
    title: "Documentation",
    subtitle: "44 markdown files",
    description: "All markdown docs — foundation, tokens, component APIs, theming guides. Verified against the actual source code.",
    size: "54 KB",
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    icon: <IconDoc16 size={20} />,
    includes: [
      "Foundation: colors · spacing · typography",
      "Tokens: color-tokens · shadow-tokens · theme-guide",
      "35 component API docs (props, types, defaults, examples)",
      "Theming: css-variables · custom-theme guide",
    ],
  },
];

// ─── PackageCard ──────────────────────────────────────────────────────────────

function PackageCard({ pkg, mode }: { pkg: Package; mode: "light" | "dark" }) {
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);

  const isDark = mode === "dark";

  function handleDownload() {
    setDownloading(true);
    const a = document.createElement("a");
    a.href = `/downloads/${pkg.filename}`;
    a.download = pkg.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => {
      setDownloading(false);
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    }, 800);
  }

  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "#E5E7EB";
  const titleColor = isDark ? "#F1F5F9" : "#111827";
  const subtitleColor = isDark ? "#94A3B8" : "#6B7280";
  const descColor = isDark ? "#CBD5E1" : "#4B5563";
  const listItemColor = isDark ? "#94A3B8" : "#6B7280";
  const includeBg = isDark ? "rgba(255,255,255,0.04)" : "#F9FAFB";
  const includeBorder = isDark ? "rgba(255,255,255,0.06)" : "#F3F4F6";

  return (
    <div
      style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        borderRadius: 16,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.2s",
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: pkg.color,
          borderRadius: "16px 16px 0 0",
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: pkg.bg,
              border: `1px solid ${pkg.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: pkg.color,
              flexShrink: 0,
            }}
          >
            {pkg.icon}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700, color: titleColor }}>
                {pkg.title}
              </span>
              {pkg.badge && (
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: pkg.color,
                    background: pkg.bg,
                    border: `1px solid ${pkg.border}`,
                    borderRadius: 20,
                    padding: "2px 8px",
                  }}
                >
                  {pkg.badge}
                </span>
              )}
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: subtitleColor, marginTop: 2 }}>
              {pkg.subtitle}
            </div>
          </div>
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 600,
            color: subtitleColor,
            background: includeBg,
            border: `1px solid ${includeBorder}`,
            borderRadius: 6,
            padding: "4px 8px",
            flexShrink: 0,
          }}
        >
          {pkg.size}
        </div>
      </div>

      {/* Description */}
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, lineHeight: 1.6, color: descColor, margin: 0 }}>
        {pkg.description}
      </p>

      {/* Includes list */}
      <div
        style={{
          background: includeBg,
          border: `1px solid ${includeBorder}`,
          borderRadius: 10,
          padding: "14px 16px",
        }}
      >
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: subtitleColor, marginBottom: 10 }}>
          Includes
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {pkg.includes.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: pkg.color, marginTop: 6, flexShrink: 0 }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: listItemColor, lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "11px 20px",
          borderRadius: 10,
          border: "none",
          background: done ? "#16A34A" : downloading ? `${pkg.color}99` : pkg.color,
          color: "#FFFFFF",
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          fontWeight: 600,
          cursor: downloading ? "wait" : "pointer",
          transition: "background 0.2s, transform 0.1s",
          transform: "scale(1)",
        }}
        onMouseEnter={e => { if (!downloading) (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
      >
        {done ? (
          <>
            <IconCheck16 size={14} />
            Downloaded
          </>
        ) : downloading ? (
          <>
            <span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
            Preparing…
          </>
        ) : (
          <>
            <IconAttach16 size={14} />
            Download {pkg.filename}
          </>
        )}
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface DownloadsPageProps {
  colorMode: "light" | "dark";
}

export function DownloadsPage({ colorMode }: DownloadsPageProps) {
  const isDark = colorMode === "dark";
  const headingColor = isDark ? "#F1F5F9" : "#111827";
  const subtitleColor = isDark ? "#94A3B8" : "#6B7280";
  const dividerColor = isDark ? "rgba(255,255,255,0.08)" : "#E5E7EB";
  const noteBg = isDark ? "rgba(29,50,255,0.12)" : "#EAF3FF";
  const noteBorder = isDark ? "rgba(29,50,255,0.3)" : "#B9D3FF";
  const noteText = isDark ? "#93B4FF" : "#1D32FF";

  return (
    <div style={{ maxWidth: 900, paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: 28, fontWeight: 700, color: headingColor, margin: "0 0 10px" }}>
          Downloads
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: subtitleColor, margin: 0, lineHeight: 1.6 }}>
          Download the WeLoop component library packages. All files are verified against the source code and include the latest documentation.
        </p>
      </div>

      {/* Info note */}
      <div
        style={{
          background: noteBg,
          border: `1px solid ${noteBorder}`,
          borderRadius: 10,
          padding: "12px 16px",
          marginBottom: 32,
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <IconDoc16 size={14} style={{ color: noteText, marginTop: 2, flexShrink: 0 }} />
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: noteText, lineHeight: 1.6 }}>
          All packages contain the source code exactly as it appears in this repository. Start with <strong>Full Library</strong> if you want everything, or pick individual packages for a specific need.
        </span>
      </div>

      <hr style={{ border: "none", borderTop: `1px solid ${dividerColor}`, margin: "0 0 32px" }} />

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
          gap: 20,
        }}
      >
        {PACKAGES.map(pkg => (
          <PackageCard key={pkg.id} pkg={pkg} mode={colorMode} />
        ))}
      </div>

      {/* Footer note */}
      <div style={{ marginTop: 40, paddingTop: 28, borderTop: `1px solid ${dividerColor}` }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: subtitleColor, margin: 0, lineHeight: 1.7 }}>
          <strong style={{ color: isDark ? "#CBD5E1" : "#374151" }}>Install via GitHub:</strong>{" "}
          <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, background: isDark ? "rgba(255,255,255,0.08)" : "#F3F4F6", padding: "2px 6px", borderRadius: 4, color: isDark ? "#E2E8F0" : "#374151" }}>
            npm install github:sumtaimo/WeLoop-Components
          </code>
          {"  ·  "}
          <strong style={{ color: isDark ? "#CBD5E1" : "#374151" }}>Scaffold a project:</strong>{" "}
          <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, background: isDark ? "rgba(255,255,255,0.08)" : "#F3F4F6", padding: "2px 6px", borderRadius: 4, color: isDark ? "#E2E8F0" : "#374151" }}>
            npx weloop-init
          </code>
        </p>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
