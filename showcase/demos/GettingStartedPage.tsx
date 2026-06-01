import React, { useState } from "react";
import { ButtonSingle } from "../../src/components/atoms/ButtonSingle";
import { InlineTip } from "../../src/components/atoms/InlineTip";
import { Tabs } from "../../src/components/atoms/Tabs";
import { Toggle } from "../../src/components/atoms/Toggle";
import {
  IconCheck16,
  IconDoc16,
  IconBolt,
  IconArrow161,
  IconGear16,
  IconAdd,
} from "../../src/components/atoms/Icon";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{ position: "relative", margin: "12px 0" }}>
      {label && (
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#6B7280",
            marginBottom: 6,
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          background: "#1E293B",
          borderRadius: 10,
          padding: "14px 16px",
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          justifyContent: "space-between",
        }}
      >
        <pre
          style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: 13,
            lineHeight: 1.7,
            color: "#E2E8F0",
            margin: 0,
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            flex: 1,
          }}
        >
          {code}
        </pre>
        <button
          onClick={copy}
          style={{
            flexShrink: 0,
            background: copied ? "rgba(34,197,94,0.16)" : "rgba(255,255,255,0.08)",
            border: "1px solid " + (copied ? "rgba(34,197,94,0.32)" : "rgba(255,255,255,0.12)"),
            borderRadius: 6,
            color: copied ? "#4ADE80" : "#94A3B8",
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            fontWeight: 600,
            padding: "4px 10px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "all 0.15s",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: 20, marginBottom: 40 }}>
      <div style={{ flexShrink: 0 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "var(--color-bg-brand-primary, #1D32FF)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          {number}
        </div>
      </div>
      <div style={{ flex: 1, paddingTop: 4 }}>
        <h3
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: 16,
            color: "var(--color-text-default, #111827)",
            marginBottom: 10,
          }}
        >
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 700,
        fontSize: 20,
        color: "var(--color-text-default, #111827)",
        marginBottom: 20,
        marginTop: 48,
        paddingBottom: 12,
        borderBottom: "1px solid var(--color-border-default, #E5E5E5)",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {children}
    </h2>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 13,
        color: "var(--color-text-subtle, #6B7280)",
        lineHeight: 1.6,
        margin: "8px 0",
      }}
    >
      {children}
    </p>
  );
}

function FileTree({ lines }: { lines: { indent: number; name: string; note?: string }[] }) {
  return (
    <div
      style={{
        background: "#F9FAFB",
        border: "1px solid #E5E5E5",
        borderRadius: 10,
        padding: "14px 18px",
        margin: "12px 0",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12.5,
        lineHeight: 1.8,
      }}
    >
      {lines.map((l, i) => (
        <div key={i} style={{ display: "flex", gap: 8 }}>
          <span style={{ color: "#9CA3AF" }}>
            {"  ".repeat(l.indent)}
            {l.indent > 0 ? "├── " : ""}
          </span>
          <span style={{ color: "#1E293B", fontWeight: l.note ? 500 : 400 }}>{l.name}</span>
          {l.note && (
            <span style={{ color: "#9CA3AF", fontSize: 11, paddingLeft: 4 }}>← {l.note}</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function GettingStartedPage() {
  const [flow, setFlow] = useState<"new" | "existing">("new");
  const [theme, setTheme] = useState<"webill365" | "wabooks" | "wecafe">("webill365");

  const themeColor: Record<string, string> = {
    webill365: "#1D32FF",
    wabooks:   "#0060B9",
    wecafe:    "#E7450F",
  };

  return (
    <div style={{ maxWidth: 760, paddingBottom: 80, fontFamily: "Inter, sans-serif" }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--color-bg-brand-contrast, #EAF3FF) 0%, #fff 100%)",
          border: "1px solid var(--color-border-brand, #B9D3FF)",
          borderRadius: 16,
          padding: "32px 36px",
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "var(--color-bg-brand-primary, #1D32FF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconBolt size={22} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "var(--color-text-default, #111827)" }}>
              Getting Started
            </div>
            <div style={{ fontSize: 13, color: "var(--color-text-subtle, #6B7280)", marginTop: 2 }}>
              WeLoop Components · v2.1 · React 18+ · TypeScript
            </div>
          </div>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--color-text-default, #374151)", margin: 0 }}>
          WeLoop is a multi-brand design system with 35+ production-ready React components.
          Run <code style={{ background: "rgba(0,0,0,0.06)", borderRadius: 4, padding: "1px 6px", fontSize: 13, fontWeight: 600 }}>npx weloop-init</code> once
          and your project is fully wired — theme provider, animation CSS, and a starter page —
          ready to build in under a minute.
        </p>
      </div>

      {/* ── Requirements ─────────────────────────────────────────────────── */}
      <SectionTitle>
        <IconCheck16 size={18} color="var(--color-text-brand, #1D32FF)" />
        Before you start
      </SectionTitle>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        {[
          { label: "Node.js", version: "18+", icon: "🟢" },
          { label: "React",   version: "18+", icon: "⚛️" },
          { label: "TypeScript", version: "5+", icon: "🔷" },
          { label: "Vite or Next.js", version: "", icon: "⚡" },
        ].map((r) => (
          <div
            key={r.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#F9FAFB",
              border: "1px solid #E5E5E5",
              borderRadius: 8,
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 500,
              color: "#374151",
            }}
          >
            <span>{r.icon}</span>
            {r.label}
            {r.version && (
              <span style={{ color: "#9CA3AF", fontWeight: 400 }}>{r.version}</span>
            )}
          </div>
        ))}
      </div>

      <Note>
        GitHub access to <strong>sumtaimo/WeLoop-Components</strong> is required before installing.
        Ask your team lead to add you as a collaborator if you cannot access the repo.
      </Note>

      {/* ── Install ───────────────────────────────────────────────────────── */}
      <SectionTitle>
        <IconAdd size={18} color="var(--color-text-brand, #1D32FF)" />
        Installation
      </SectionTitle>

      <Step number={1} title="Install from GitHub">
        <Note>
          WeLoop is hosted as a private GitHub package. Install it directly from the repo:
        </Note>
        <CodeBlock
          label="terminal"
          code="npm install github:sumtaimo/WeLoop-Components"
        />
        <Note>
          Once published to npm, this becomes: <code style={{ background: "#F3F4F6", borderRadius: 3, padding: "1px 5px", fontSize: 12 }}>npm install weloop-components</code>
        </Note>
      </Step>

      <Step number={2} title="Run the scaffold tool">
        <Note>
          This interactive CLI sets up everything your project needs — no manual config required.
        </Note>
        <CodeBlock label="terminal" code="npx weloop-init" />

        <div
          style={{
            background: "#F9FAFB",
            border: "1px solid #E5E5E5",
            borderRadius: 10,
            padding: "16px 20px",
            marginTop: 16,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
            CLI Preview
          </div>
          {[
            { q: "What would you like to do?", a: "1. New Vite + React project  2. Add to existing project" },
            { q: "Choose your brand theme:",    a: "1. webill365 (blue)  2. wabooks (purple)  3. wecafe (orange)" },
            { q: "Default color mode:",         a: "1. Light  2. Dark" },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontFamily: "monospace", fontSize: 12.5, color: "#374151", fontWeight: 600 }}>
                ◆ {item.q}
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 12, color: "#6B7280", paddingLeft: 14, marginTop: 2 }}>
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </Step>

      {/* ── Two flows ─────────────────────────────────────────────────────── */}
      <SectionTitle>
        <IconDoc16 size={18} color="var(--color-text-brand, #1D32FF)" />
        What gets created
      </SectionTitle>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["new", "existing"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFlow(f)}
            style={{
              padding: "7px 16px",
              borderRadius: 8,
              border: "1.5px solid " + (flow === f ? "var(--color-border-brand, #1D32FF)" : "#E5E5E5"),
              background: flow === f ? "var(--color-bg-brand-contrast, #EAF3FF)" : "#fff",
              color: flow === f ? "var(--color-text-brand, #1D32FF)" : "#6B7280",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {f === "new" ? "New project" : "Existing project"}
          </button>
        ))}
      </div>

      {flow === "new" ? (
        <>
          <Note>Creates a complete Vite + React + TypeScript project — 8 files, ready to run.</Note>
          <FileTree
            lines={[
              { indent: 0, name: "my-app/" },
              { indent: 1, name: "package.json", note: "react + weloop-components pre-added" },
              { indent: 1, name: "vite.config.ts" },
              { indent: 1, name: "tsconfig.json" },
              { indent: 1, name: "index.html", note: "Toast & Snackbar animation CSS included" },
              { indent: 1, name: "src/" },
              { indent: 2, name: "main.tsx", note: "<WeLoopProvider> already wraps <App>" },
              { indent: 2, name: "App.tsx", note: "starter page with real components" },
              { indent: 2, name: "weloop/" },
              { indent: 3, name: "theme.ts", note: "your chosen brand + mode" },
              { indent: 3, name: "Provider.tsx", note: "<ThemeProvider> wrapper" },
            ]}
          />
          <CodeBlock
            label="then just run"
            code={`cd my-app\nnpm install\nnpm run dev`}
          />
        </>
      ) : (
        <>
          <Note>Writes 2 files into your src folder and prints step-by-step wiring instructions.</Note>
          <FileTree
            lines={[
              { indent: 0, name: "src/" },
              { indent: 1, name: "weloop/" },
              { indent: 2, name: "theme.ts", note: "your chosen brand + mode" },
              { indent: 2, name: "Provider.tsx", note: "<ThemeProvider> wrapper" },
            ]}
          />
          <Note>The CLI then prints exactly what to add to your main.tsx and index.html — no guesswork.</Note>
          <CodeBlock
            label="main.tsx — add this wrap"
            code={`import { WeLoopProvider } from './weloop/Provider';\n\nroot.render(\n  <WeLoopProvider theme="webill365" mode="light">\n    <App />\n  </WeLoopProvider>\n);`}
          />
        </>
      )}

      {/* ── Using components ──────────────────────────────────────────────── */}
      <SectionTitle>
        <IconArrow161 size={18} color="var(--color-text-brand, #1D32FF)" />
        Using components
      </SectionTitle>

      <Note>Import directly from the package root — never from internal paths.</Note>

      <CodeBlock
        label="✅ correct"
        code={`import { ButtonSingle, Toggle, Dialog, Pagination } from 'weloop-components';\nimport { applyThemeToCSSVars } from 'weloop-components/tokens';`}
      />
      <CodeBlock
        label="❌ never do this"
        code={`import { ButtonSingle } from 'weloop-components/src/components/atoms/ButtonSingle';`}
      />

      {/* ── Theme switcher demo ───────────────────────────────────────────── */}
      <SectionTitle>
        <IconGear16 size={18} color="var(--color-text-brand, #1D32FF)" />
        Brand themes
      </SectionTitle>

      <Note>
        WeLoop ships three brand themes. Pick yours at init time — or switch at runtime.
      </Note>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {(["webill365", "wabooks", "wecafe"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              border: "1.5px solid " + (theme === t ? themeColor[t] : "#E5E5E5"),
              borderRadius: 8,
              background: theme === t ? themeColor[t] + "14" : "#fff",
              color: theme === t ? themeColor[t] : "#6B7280",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: themeColor[t],
                display: "inline-block",
              }}
            />
            {t}
          </button>
        ))}
      </div>

      <CodeBlock
        label="apply theme at startup"
        code={`import { getTheme, applyThemeToCSSVars } from 'weloop-components/tokens';\n\nconst tokens = getTheme('${theme}', 'light');\napplyThemeToCSSVars(tokens); // writes CSS vars to :root`}
      />

      <CodeBlock
        label="or use ThemeProvider (React)"
        code={`import { ThemeProvider } from 'weloop-components/tokens';\n\n<ThemeProvider defaultTheme="${theme}" defaultMode="light">\n  <App />\n</ThemeProvider>`}
      />

      <InlineTip
        type="information"
        fill="outline"
        title="All components read CSS variables automatically."
        description={`Once ThemeProvider is mounted with theme="${theme}", every WeLoop component uses the correct colors — no props needed.`}
        showLink={false}
      />

      {/* ── Animation CSS ─────────────────────────────────────────────────── */}
      <SectionTitle>
        <IconBolt size={18} color="var(--color-text-brand, #1D32FF)" />
        Animation CSS (Toast &amp; Snackbar)
      </SectionTitle>

      <Note>
        Add this once to your <code style={{ background: "#F3F4F6", borderRadius: 3, padding: "1px 5px", fontSize: 12 }}>index.html</code> — required for Toast and Snackbar transitions.
        <strong> The init tool adds this automatically</strong> when it creates index.html.
      </Note>

      <CodeBlock
        label="index.html — inside <style>"
        code={`@keyframes wl-toast-in  { from { opacity:0; transform:translateY(8px) scale(0.95); } to { opacity:1; transform:none; } }
@keyframes wl-toast-out { from { opacity:1; } to { opacity:0; transform:translateY(8px) scale(0.95); } }
.wl-toast[data-state="open"]   { animation: wl-toast-in  0.25s ease; }
.wl-toast[data-state="closed"] { animation: wl-toast-out 0.18s ease; }

@keyframes wl-snackbar-in-up    { from{opacity:0;transform:translateY(14px) scale(.97)} to{opacity:1;transform:none} }
@keyframes wl-snackbar-out-down { from{opacity:1;} to{opacity:0;transform:translateY(14px) scale(.97)} }
@keyframes wl-snackbar-in-down  { from{opacity:0;transform:translateY(-14px) scale(.97)} to{opacity:1;transform:none} }
@keyframes wl-snackbar-out-up   { from{opacity:1;} to{opacity:0;transform:translateY(-14px) scale(.97)} }
.wl-snackbar[data-state="open"][data-pos^="bottom"]   { animation: wl-snackbar-in-up    0.30s cubic-bezier(.34,1.26,.64,1); }
.wl-snackbar[data-state="closed"][data-pos^="bottom"] { animation: wl-snackbar-out-down 0.20s ease; }
.wl-snackbar[data-state="open"][data-pos^="top"]      { animation: wl-snackbar-in-down  0.30s cubic-bezier(.34,1.26,.64,1); }
.wl-snackbar[data-state="closed"][data-pos^="top"]    { animation: wl-snackbar-out-up   0.20s ease; }`}
      />

      {/* ── Next steps ───────────────────────────────────────────────────── */}
      <SectionTitle>
        <IconArrow161 size={18} color="var(--color-text-brand, #1D32FF)" />
        Next steps
      </SectionTitle>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { icon: "🎨", title: "Explore the component demos",      desc: "Browse every component in the sidebar — live previews with all variants and props." },
          { icon: "🪙", title: "Read the Design Tokens",           desc: "Open Design Tokens in the sidebar to see your active theme's full token set." },
          { icon: "📖", title: "Read the full documentation",      desc: "Click Design System Docs in the sidebar for foundation, token, and theming guides." },
          { icon: "🎯", title: "Create a custom brand theme",      desc: "Use createCustomTheme() or createBrandTheme() to derive a new theme from any base." },
          { icon: "♻️", title: "Regenerate docs after updates",    desc: "Run npm run docs:generate any time you add components or change tokens." },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              display: "flex",
              gap: 14,
              padding: "14px 18px",
              background: "#F9FAFB",
              border: "1px solid #E5E5E5",
              borderRadius: 10,
            }}
          >
            <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#111827", marginBottom: 3 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 40 }} />
    </div>
  );
}
