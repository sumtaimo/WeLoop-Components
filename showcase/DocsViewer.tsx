import React, { useMemo } from "react";

// ─── Inline formatting ────────────────────────────────────────────────────────

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(raw: string): string {
  return raw
    // swatch images: ![alt](url)
    .replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<img src="$2" alt="$1" width="14" height="14" style="display:inline;vertical-align:middle;border-radius:2px;border:1px solid rgba(0,0,0,0.08);"/>',
    )
    // links: [label](href)
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" style="color:var(--color-text-brand,#1D32FF);text-decoration:none;font-weight:500">$1</a>',
    )
    // bold
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    // inline code
    .replace(
      /`([^`]+)`/g,
      '<code style="font-family:\'JetBrains Mono\',monospace;font-size:11px;background:var(--ds-code-bg,#F3F4F6);border-radius:3px;padding:1px 5px;color:var(--ds-code-fg,#374151)">$1</code>',
    );
}

// ─── Table renderer ───────────────────────────────────────────────────────────

function renderTable(lines: string[]): string {
  const rows = lines.map((l) => {
    const parts = l.split("|");
    return parts.slice(1, parts.length - 1).map((c) => c.trim());
  });
  if (rows.length < 2) return "";

  const headers = rows[0];
  const dataRows = rows.slice(2); // skip separator row

  const thStyle =
    "padding:8px 12px;text-align:left;font-size:11px;font-weight:600;color:var(--ds-th-fg,#6B7280);text-transform:uppercase;letter-spacing:0.04em;border-bottom:1px solid var(--ds-border,#E5E5E5);white-space:nowrap;background:var(--ds-th-bg,#F9FAFB)";
  const tdStyle =
    "padding:8px 12px;font-size:13px;color:var(--ds-td-fg,#374151);border-bottom:1px solid var(--ds-border,#F3F4F6);vertical-align:middle";

  let html = `<div style="overflow-x:auto;margin:16px 0"><table style="width:100%;border-collapse:collapse;border:1px solid var(--ds-border,#E5E5E5);border-radius:8px;overflow:hidden;font-family:Inter,sans-serif"><thead><tr>`;
  headers.forEach((h) => {
    html += `<th style="${thStyle}">${inline(h)}</th>`;
  });
  html += "</tr></thead><tbody>";
  dataRows.forEach((row, ri) => {
    const bg = ri % 2 === 1 ? "background:var(--ds-row-alt,#FAFAFA)" : "";
    html += `<tr style="${bg}">`;
    row.forEach((cell) => {
      html += `<td style="${tdStyle}">${inline(cell)}</td>`;
    });
    html += "</tr>";
  });
  html += "</tbody></table></div>";
  return html;
}

// ─── Code block renderer ──────────────────────────────────────────────────────

function renderCode(lang: string, lines: string[]): string {
  const code = escHtml(lines.join("\n"));
  return `<pre style="margin:16px 0;padding:16px;background:var(--ds-pre-bg,#1E293B);border-radius:8px;overflow-x:auto;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.7;color:var(--ds-pre-fg,#E2E8F0)"><code data-lang="${escHtml(lang)}">${code}</code></pre>`;
}

// ─── Full markdown → HTML ─────────────────────────────────────────────────────

function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      out.push(renderCode(lang, codeLines));
      i++;
      continue;
    }

    // Table: collect all consecutive | lines
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      out.push(renderTable(tableLines));
      continue;
    }

    // h4
    const m4 = line.match(/^#### (.+)/);
    if (m4) {
      out.push(
        `<h4 style="margin:20px 0 8px;font-size:13px;font-weight:600;color:var(--ds-h-fg,#374151);font-family:Inter,sans-serif">${inline(m4[1])}</h4>`,
      );
      i++;
      continue;
    }

    // h3
    const m3 = line.match(/^### (.+)/);
    if (m3) {
      out.push(
        `<h3 style="margin:28px 0 10px;font-size:15px;font-weight:600;color:var(--ds-h-fg,#111827);font-family:Inter,sans-serif">${inline(m3[1])}</h3>`,
      );
      i++;
      continue;
    }

    // h2
    const m2 = line.match(/^## (.+)/);
    if (m2) {
      out.push(
        `<h2 style="margin:36px 0 12px;font-size:18px;font-weight:600;color:var(--ds-h-fg,#111827);padding-bottom:8px;border-bottom:1px solid var(--ds-border,#E5E5E5);font-family:Inter,sans-serif">${inline(m2[1])}</h2>`,
      );
      i++;
      continue;
    }

    // h1
    const m1 = line.match(/^# (.+)/);
    if (m1) {
      out.push(
        `<h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:var(--ds-h-fg,#111827);font-family:Inter,sans-serif">${inline(m1[1])}</h1>`,
      );
      i++;
      continue;
    }

    // HR
    if (line.trim() === "---") {
      out.push(
        `<hr style="margin:28px 0;border:none;border-top:1px solid var(--ds-border,#E5E5E5)"/>`,
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      out.push(
        `<blockquote style="margin:16px 0;padding:10px 16px;border-left:3px solid var(--color-border-brand,#1D32FF);background:var(--color-bg-brand-contrast,#EAF3FF);border-radius:0 6px 6px 0;font-size:13px;color:var(--color-text-brand,#1D32FF);font-family:Inter,sans-serif">${inline(line.slice(2))}</blockquote>`,
      );
      i++;
      continue;
    }

    // Unordered list — collect consecutive items
    if (line.match(/^- /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^- /)) {
        items.push(lines[i].slice(2));
        i++;
      }
      out.push(
        `<ul style="margin:12px 0;padding-left:20px;list-style:disc">${items.map((it) => `<li style="margin:4px 0;font-size:13px;color:var(--ds-p-fg,#374151);font-family:Inter,sans-serif;line-height:1.6">${inline(it)}</li>`).join("")}</ul>`,
      );
      continue;
    }

    // Ordered list — collect consecutive items
    if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      out.push(
        `<ol style="margin:12px 0;padding-left:20px;list-style:decimal">${items.map((it) => `<li style="margin:4px 0;font-size:13px;color:var(--ds-p-fg,#374151);font-family:Inter,sans-serif;line-height:1.6">${inline(it)}</li>`).join("")}</ol>`,
      );
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      out.push(`<div style="height:8px"></div>`);
      i++;
      continue;
    }

    // Paragraph
    out.push(
      `<p style="margin:6px 0;font-size:14px;line-height:1.7;color:var(--ds-p-fg,#374151);font-family:Inter,sans-serif">${inline(line)}</p>`,
    );
    i++;
  }

  return out.join("\n");
}

// ─── Component ────────────────────────────────────────────────────────────────

interface DocsViewerProps {
  content: string;
  mode: "light" | "dark";
}

export function DocsViewer({ content, mode }: DocsViewerProps) {
  const html = useMemo(() => renderMarkdown(content), [content]);

  const isDark = mode === "dark";

  return (
    <div
      style={{
        // light/dark CSS variable overrides
        ["--ds-h-fg" as string]: isDark ? "#F1F5F9" : "#111827",
        ["--ds-p-fg" as string]: isDark ? "#CBD5E1" : "#374151",
        ["--ds-th-fg" as string]: isDark ? "#94A3B8" : "#6B7280",
        ["--ds-th-bg" as string]: isDark ? "#1E293B" : "#F9FAFB",
        ["--ds-td-fg" as string]: isDark ? "#CBD5E1" : "#374151",
        ["--ds-border" as string]: isDark ? "rgba(255,255,255,0.08)" : "#E5E5E5",
        ["--ds-row-alt" as string]: isDark ? "rgba(255,255,255,0.02)" : "#FAFAFA",
        ["--ds-code-bg" as string]: isDark ? "rgba(255,255,255,0.08)" : "#F3F4F6",
        ["--ds-code-fg" as string]: isDark ? "#E2E8F0" : "#374151",
        ["--ds-pre-bg" as string]: isDark ? "#0F172A" : "#1E293B",
        ["--ds-pre-fg" as string]: "#E2E8F0",
        maxWidth: 860,
        paddingBottom: 64,
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
