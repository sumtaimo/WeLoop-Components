#!/usr/bin/env node
/**
 * Generates React icon components from SVG files.
 * Run: node scripts/generate-icons.mjs
 */
import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ICONS_DIR = '/tmp/icons-raw/ICONS';
const OUT_ICON  = path.join(__dirname, '../src/components/atoms/Icon/Icon.tsx');
const OUT_BANK  = path.join(__dirname, '../src/components/atoms/BankLogo/BankLogo.tsx');
const OUT_FLAG  = path.join(__dirname, '../src/components/atoms/Flag/Flag.tsx');

// ─── SVG kebab → JSX camelCase attribute map ─────────────────────────────────
const ATTR = {
  'clip-path':        'clipPath',
  'fill-rule':        'fillRule',
  'clip-rule':        'clipRule',
  'fill-opacity':     'fillOpacity',
  'stroke-width':     'strokeWidth',
  'stroke-linecap':   'strokeLinecap',
  'stroke-linejoin':  'strokeLinejoin',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-miterlimit':'strokeMiterlimit',
  'stroke-opacity':   'strokeOpacity',
  'stop-color':       'stopColor',
  'stop-opacity':     'stopOpacity',
  'font-family':      'fontFamily',
  'font-size':        'fontSize',
  'font-weight':      'fontWeight',
  'text-anchor':      'textAnchor',
};

// ─── Icons with intentional brand colors (do NOT convert to currentColor) ────
const KEEP_COLORS = new Set([
  'ico_figma.svg','ico_excel.svg','ico_aba.svg','ico_bakong.svg',
  'Ico_caminv.svg','ico_APIs.svg',
]);
// Also keep color for file-type icons
function shouldKeepColor(filename, content) {
  if (KEEP_COLORS.has(filename)) return true;
  if (/ico_file/.test(filename)) return true;
  // Keep if it has more than 1 non-black/white fill
  const fills = [...content.matchAll(/fill="([^"]+)"/g)].map(m => m[1])
    .filter(f => f !== 'none' && f !== 'black' && f !== 'white' && f !== '#000000' && f !== '#ffffff' && f !== '#FFFFFF' && !/^currentColor/.test(f));
  const uniqueColored = new Set(fills);
  return uniqueColored.size > 1;
}

// ─── Core SVG → JSX transformer ──────────────────────────────────────────────
function toJsx(raw, { currentColor = true, uniqueId = false } = {}) {
  let s = raw;
  // Strip ALL style attributes — they're either P3 fallbacks or redundant CSS
  s = s.replace(/\s+style="[^"]*"/g, '');
  // Strip xmlns from inner elements
  s = s.replace(/\s+xmlns(?::[a-z]+)?="[^"]*"/g, '');
  // Convert deprecated xlink:href to xlinkHref
  s = s.replace(/\bxlink:href=/g, 'xlinkHref=');
  // Convert monochrome fills
  if (currentColor) {
    s = s.replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"');
    s = s.replace(/stroke="(?:black|#000000|#171717|#0d0d0d)"/gi, 'stroke="currentColor"');
  } else {
    // For brand / flag SVGs — just strip the P3 fill from style attrs
    // Keep original fill values
  }
  // Handle clipPath IDs uniquely when uniqueId=true
  if (uniqueId) {
    const ids = [...s.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
    ids.forEach((id, i) => {
      const safe = id.replace(/[^a-zA-Z0-9]/g, '_');
      s = s.replace(new RegExp(`id="${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g'),
        `id={\`${safe}_\${uid}\`}`);
      s = s.replace(new RegExp(`url\\(#${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'),
        `__URLREF_${safe}__`);
    });
    s = s.replace(/__URLREF_([^_]+(?:_[^_]+)*)__/g, (_, n) => `url(#${n}_\${uid})`);
    // Now convert url(...) text that sits inside an attribute value to JSX expr
    s = s.replace(/"url\(#([^)]+)\)"/g, (_, ref) => `{\`url(#${ref})\`}`);
  }
  // Convert kebab SVG attrs → camelCase JSX props
  for (const [from, to] of Object.entries(ATTR)) {
    s = s.replace(new RegExp(`\\b${from}=`, 'g'), `${to}=`);
  }
  // Remove empty style attrs
  s = s.replace(/\s+style=""/g, '');
  return s;
}

function extractParts(raw) {
  const m = raw.match(/<svg([^>]*)>([\s\S]*?)<\/svg>\s*$/);
  if (!m) return null;
  const viewBox = (m[1].match(/viewBox="([^"]+)"/) || ['','0 0 16 16'])[1];
  return { viewBox, inner: m[2].trim() };
}

function toPascal(str) {
  return str.split(/[-_\s.]+/).filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

// ─── 1. UI Icons ─────────────────────────────────────────────────────────────
{
  const files = fs.readdirSync(ICONS_DIR)
    .filter(f => /^[Ii]co_|^[Ii]con_/.test(f) && f.endsWith('.svg'))
    .sort();

  const seen = new Map();
  const lines = [
    'import React, { useId } from "react";',
    '',
    '// ─── Shared prop type ────────────────────────────────────────────────────────',
    '',
    'export interface IconProps {',
    '  /** Icon size in px (default 16) */',
    '  size?: number;',
    '  /** CSS color — sets currentColor on monochrome icons */',
    '  color?: string;',
    '  className?: string;',
    '  style?: React.CSSProperties;',
    '}',
    '',
    '// ─── Icon components ─────────────────────────────────────────────────────────',
    '',
  ];

  const exported = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(ICONS_DIR, file), 'utf8');
    const keepColor = shouldKeepColor(file, raw);
    const hasIds = /\bid="/.test(raw);
    const jsx = toJsx(raw, { currentColor: !keepColor, uniqueId: hasIds });
    const parts = extractParts(jsx);
    if (!parts) { console.warn('skip', file); continue; }

    const base = file.replace(/\.svg$/i,'').replace(/^[Ii]co_/,'').replace(/^[Ii]con_/,'');
    let name = 'Icon' + toPascal(base);
    if (seen.has(name)) { seen.set(name, seen.get(name)+1); name += seen.get(name); }
    else seen.set(name, 1);
    exported.push(name);

    const needsId = hasIds;
    if (needsId) {
      lines.push(
        `export function ${name}({ size = 16, color, className, style }: IconProps) {`,
        `  const uid = useId().replace(/:/g, '');`,
        `  return (`,
        `    <svg width={size} height={size} viewBox="${parts.viewBox}" fill="none" aria-hidden="true" className={className} style={{ color, ...style }}>`,
        `      ${parts.inner}`,
        `    </svg>`,
        `  );`,
        `}`,
        ``,
      );
    } else {
      lines.push(
        `export function ${name}({ size = 16, color, className, style }: IconProps) {`,
        `  return (`,
        `    <svg width={size} height={size} viewBox="${parts.viewBox}" fill="none" aria-hidden="true" className={className} style={{ color, ...style }}>`,
        `      ${parts.inner}`,
        `    </svg>`,
        `  );`,
        `}`,
        ``,
      );
    }
  }

  fs.writeFileSync(OUT_ICON, lines.join('\n'));
  console.log(`✓ Icon.tsx — ${exported.length} icon components`);
}

// ─── 2. Bank Logos ───────────────────────────────────────────────────────────
{
  // Only include SVGs under 25KB with clean names (no "-1" duplicates)
  const allFiles = fs.readdirSync(ICONS_DIR)
    .filter(f => {
      if (/^[Ii]co_|^[Ii]con_|Style=|catalog|\.html$|zitZ/.test(f)) return false;
      if (f.endsWith('-1.svg') || f.endsWith('-2.svg') || f.endsWith('-3.svg')) return false;
      if (!f.endsWith('.svg')) return false;
      const size = fs.statSync(path.join(ICONS_DIR, f)).size;
      return size < 25000;
    })
    .sort();

  const bankMap = {};

  for (const file of allFiles) {
    const raw = fs.readFileSync(path.join(ICONS_DIR, file), 'utf8');
    // For bank logos: strip P3 styles but keep brand colors
    let inner = raw.replace(/\s+style="[^"]*"/g, '');
    inner = inner.replace(/\s+xmlns(?::[a-z]+)?="[^"]*"/g, '');
    const parts = extractParts(inner);
    if (!parts) continue;

    const key = file.replace(/\.svg$/i,'')
      .replace(/bank\s+logo\s*/gi, '')
      .replace(/\bbank\b\s*/gi, '')
      .replace(/\s+logo\s*/gi, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '')
      .toLowerCase()
      .replace(/^-+|-+$/g, '');

    const rawWMatch = raw.match(/width="([^"]+)"/);
    const rawHMatch = raw.match(/height="([^"]+)"/);
    bankMap[key] = {
      viewBox: parts.viewBox,
      inner:   parts.inner.replace(/`/g, "'").replace(/\\/g, '\\\\'),
      w: rawWMatch ? rawWMatch[1] : '40',
      h: rawHMatch ? rawHMatch[1] : '40',
    };
  }

  const keys = Object.keys(bankMap).sort();

  const lines = [
    'import React from "react";',
    '',
    'export type BankName =',
    `  | ${keys.map(k => `"${k}"`).join('\n  | ')};`,
    '',
    'export interface BankLogoProps {',
    '  name: BankName;',
    '  /** Height in px — width scales via viewBox aspect ratio (default 32) */',
    '  size?: number;',
    '  className?: string;',
    '  style?: React.CSSProperties;',
    '}',
    '',
    'interface LogoDef { vb: string; w: number; h: number; html: string; }',
    '',
    'const LOGOS: Record<BankName, LogoDef> = {',
  ];

  for (const key of keys) {
    const d = bankMap[key];
    // Use JSON.stringify so the string is safely escaped
    lines.push(
      `  ${JSON.stringify(key)}: { vb: ${JSON.stringify(d.viewBox)}, w: ${parseFloat(d.w)||40}, h: ${parseFloat(d.h)||40}, html: ${JSON.stringify(d.inner)} },`
    );
  }

  lines.push(
    '};',
    '',
    'export function BankLogo({ name, size = 32, className, style }: BankLogoProps) {',
    '  const def = LOGOS[name];',
    '  if (!def) return null;',
    '  const w = Math.round(size * (def.w / def.h));',
    '  return (',
    '    <svg',
    '      width={w} height={size} viewBox={def.vb} fill="none"',
    '      className={className} style={style} aria-label={name}',
    '      dangerouslySetInnerHTML={{ __html: def.html }}',
    '    />',
    '  );',
    '}',
    '',
  );

  fs.writeFileSync(OUT_BANK, lines.join('\n'));
  console.log(`✓ BankLogo.tsx — ${keys.length} bank logos`);
}

// ─── 3. Flags ────────────────────────────────────────────────────────────────
{
  const files = fs.readdirSync(ICONS_DIR)
    .filter(f => f.startsWith('Style=') && f.endsWith('.svg'))
    .sort();

  // Extract: Style=Circle (Vietnam).svg → style=circle, country=vietnam
  const flagMap = {}; // `${style}-${country}` → { viewBox, inner }

  for (const file of files) {
    const m = file.match(/Style=(\w+)\s+\(([^)]+)\)\.svg/);
    if (!m) continue;
    const style   = m[1].toLowerCase();
    const country = m[2].toLowerCase().replace(/\s+/g, '-');
    const key = `${style}-${country}`;

    const raw = fs.readFileSync(path.join(ICONS_DIR, file), 'utf8');
    const hasIds = /\bid="/.test(raw);
    const jsx = toJsx(raw, { currentColor: false, uniqueId: hasIds });
    const parts = extractParts(jsx);
    if (!parts) continue;
    flagMap[key] = { viewBox: parts.viewBox, inner: parts.inner, hasIds };
  }

  const styles    = [...new Set(Object.keys(flagMap).map(k => k.split('-')[0]))].sort();
  const countries = [...new Set(Object.keys(flagMap).map(k => k.split('-').slice(1).join('-')))].sort();
  const keys      = Object.keys(flagMap).sort();

  const lines = [
    'import React from "react";',
    '',
    '// ─── Types ───────────────────────────────────────────────────────────────────',
    '',
    `export type FlagStyle   = ${styles.map(s => `"${s}"`).join(' | ')};`,
    `export type FlagCountry = ${countries.map(c => `"${c}"`).join(' | ')};`,
    `export type FlagKey     = ${keys.map(k => `"${k}"`).join('\n  | ')};`,
    '',
    'export interface FlagProps {',
    '  /** Flag visual style */',
    '  flagStyle?: FlagStyle;',
    '  /** Country identifier */',
    '  country: FlagCountry;',
    '  /** Height in px (default 24) */',
    '  size?: number;',
    '  className?: string;',
    '  style?: React.CSSProperties;',
    '}',
    '',
    '// ─── Flag SVG map ────────────────────────────────────────────────────────────',
    '',
    'interface FlagDef { vb: string; html: string; }',
    '',
    'const FLAGS: Partial<Record<FlagKey, FlagDef>> = {',
  ];

  for (const key of keys) {
    const def = flagMap[key];
    lines.push(
      `  ${JSON.stringify(key)}: { vb: ${JSON.stringify(def.viewBox)}, html: ${JSON.stringify(def.inner)} },`
    );
  }

  lines.push(
    '};',
    '',
    '// ─── Flag ────────────────────────────────────────────────────────────────────',
    '',
    'export function Flag({ flagStyle = "circle", country, size = 24, className, style }: FlagProps) {',
    `  const key = \`\${flagStyle}-\${country}\` as FlagKey;`,
    '  const def = FLAGS[key];',
    '  if (!def) return null;',
    '  return (',
    '    <svg width={size} height={size} viewBox={def.vb} fill="none" className={className} style={style} aria-label={country}',
    '      dangerouslySetInnerHTML={{ __html: def.html }}',
    '    />',
    '  );',
    '}',
    '',
  );

  fs.writeFileSync(OUT_FLAG, lines.join('\n'));
  console.log(`✓ Flag.tsx — ${keys.length} flag variants (${countries.length} countries × ${styles.length} styles)`);
}

console.log('\nDone!');
