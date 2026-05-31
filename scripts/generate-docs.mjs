#!/usr/bin/env node
/**
 * WeLoop Design System Documentation Generator
 * ─────────────────────────────────────────────
 * Reads source files from src/tokens/ and src/components/ and generates
 * structured Markdown documentation under docs/.
 *
 * Usage:
 *   node scripts/generate-docs.mjs
 *   npm run docs:generate
 *
 * Requirements: Node.js 18+, no external dependencies.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// ─── Paths ────────────────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, '..');
const SRC        = join(ROOT, 'src');
const TOKENS_DIR = join(SRC, 'tokens');
const ATOMS_DIR  = join(SRC, 'components', 'atoms');
const MOLECULES_DIR = join(SRC, 'components', 'molecules');
const ORGANISMS_DIR = join(SRC, 'components', 'organisms');
const DOCS       = join(ROOT, 'docs');

// ─── Utilities ────────────────────────────────────────────────────────────────

function readSrc(relPath) {
  return readFileSync(join(SRC, relPath), 'utf8');
}

function readTokens(file) {
  return readFileSync(join(TOKENS_DIR, file), 'utf8');
}

function ensureDir(dirPath) {
  if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true });
}

function writeDoc(relPath, content) {
  const fullPath = join(DOCS, relPath);
  ensureDir(dirname(fullPath));
  writeFileSync(fullPath, content, 'utf8');
  console.log(`  wrote  docs/${relPath}`);
}

function listDirs(dirPath) {
  return readdirSync(dirPath).filter(name => {
    return statSync(join(dirPath, name)).isDirectory() && name !== '__tests__';
  });
}

// ─── Parsers ──────────────────────────────────────────────────────────────────

/**
 * Parse primitives.ts → { familyName: { step: hex } }
 */
function parsePrimitives() {
  const src = readTokens('primitives.ts');
  const families = {};
  const familyRe = /(\w+):\s*\{([^}]+)\}/g;
  let fam;
  while ((fam = familyRe.exec(src)) !== null) {
    const name = fam[1];
    const body = fam[2];
    const steps = {};
    const stepRe = /(\d+|[a-z]+):\s*'([^']+)'/g;
    let s;
    while ((s = stepRe.exec(body)) !== null) {
      steps[s[1]] = s[2];
    }
    if (Object.keys(steps).length > 0) families[name] = steps;
  }
  return families;
}

/**
 * Parse spacing.ts → { spacingScale, radius, stroke, controlSize }
 */
function parseSpacing() {
  const src = readTokens('spacing.ts');

  const extractRecord = (varName) => {
    const re = new RegExp(`${varName}\\s*=\\s*\\{([^}]+)\\}`, 's');
    const m = re.exec(src);
    if (!m) return {};
    const result = {};
    const pairRe = /['"]?([\w-]+)['"]?\s*:\s*([\d.]+)/g;
    let p;
    while ((p = pairRe.exec(m[1])) !== null) {
      result[p[1]] = parseFloat(p[2]);
    }
    return result;
  };

  // spacingScale is nested
  const spacingScale = {};
  const groupRe = /(micro|inset|stack|section|page)\s*:\s*\{([^}]+)\}/g;
  let g;
  const spacingSrc = src.match(/spacingScale\s*=\s*\{([\s\S]+?)\}\s*as const/)?.[0] ?? '';
  while ((g = groupRe.exec(spacingSrc)) !== null) {
    const group = g[1];
    const body  = g[2];
    spacingScale[group] = {};
    const pairRe = /(\d+)\s*:\s*(\d+)/g;
    let p;
    while ((p = pairRe.exec(body)) !== null) {
      spacingScale[group][p[1]] = parseInt(p[2]);
    }
  }

  return {
    spacingScale,
    radius:      extractRecord('radius'),
    stroke:      extractRecord('stroke'),
    controlSize: extractRecord('controlSize'),
  };
}

/**
 * Parse typography.ts → { fontFamily, fontSize, lineHeight, fontWeight, letterSpacing }
 */
function parseTypography() {
  const src = readTokens('typography.ts');

  const extractFlat = (varName) => {
    const re = new RegExp(`export const ${varName}\\s*=\\s*\\{([^}]+)\\}`, 's');
    const m = re.exec(src);
    if (!m) return {};
    const result = {};
    const pairRe = /(\w+)\s*:\s*(?:'([^']+)'|(\d+(?:\.\d+)?)|'([^']+)')/g;
    let p;
    while ((p = pairRe.exec(m[1])) !== null) {
      result[p[1]] = p[2] ?? p[3] ?? p[4];
    }
    return result;
  };

  const extractNested = (varName) => {
    const re = new RegExp(`export const ${varName}\\s*=\\s*\\{([\\s\\S]+?)\\}\\s*as const`, 's');
    const m = re.exec(src);
    if (!m) return {};
    const result = {};
    const groupRe = /(\w+)\s*:\s*\{([^}]+)\}/g;
    let g;
    while ((g = groupRe.exec(m[1])) !== null) {
      result[g[1]] = {};
      const pairRe = /(\w+)\s*:\s*(\d+)/g;
      let p;
      while ((p = pairRe.exec(g[2])) !== null) {
        result[g[1]][p[1]] = parseInt(p[2]);
      }
    }
    return result;
  };

  const fontFamilyRe = /export const fontFamily\s*=\s*\{([^}]+)\}/s;
  const ffm = fontFamilyRe.exec(src);
  const fontFamily = {};
  if (ffm) {
    const pairRe = /(\w+)\s*:\s*'([^']+)'/g;
    let p;
    while ((p = pairRe.exec(ffm[1])) !== null) {
      fontFamily[p[1]] = p[2];
    }
  }

  const fontWeightRe = /export const fontWeight\s*=\s*\{([^}]+)\}/s;
  const fwm = fontWeightRe.exec(src);
  const fontWeight = {};
  if (fwm) {
    const pairRe = /(\w+)\s*:\s*(\d+)/g;
    let p;
    while ((p = pairRe.exec(fwm[1])) !== null) {
      fontWeight[p[1]] = parseInt(p[2]);
    }
  }

  const letterSpacingRe = /export const letterSpacing\s*=\s*\{([^}]+)\}/s;
  const lsm = letterSpacingRe.exec(src);
  const letterSpacing = {};
  if (lsm) {
    const pairRe = /(\w+)\s*:\s*'([^']+)'/g;
    let p;
    while ((p = pairRe.exec(lsm[1])) !== null) {
      letterSpacing[p[1]] = p[2];
    }
  }

  return {
    fontFamily,
    fontSize:      extractNested('fontSize'),
    lineHeight:    extractNested('lineHeight'),
    fontWeight,
    letterSpacing,
  };
}

/**
 * Parse a component TSX file → { exportTypes, interfaceProps, cssVars }
 */
function parseComponent(tsxPath) {
  const src = readFileSync(tsxPath, 'utf8');

  // export type Xxx = "a" | "b"
  const exportTypes = [];
  const typeRe = /export type (\w+)\s*=\s*([^;]+);/g;
  let t;
  while ((t = typeRe.exec(src)) !== null) {
    const values = t[2].match(/"([^"]+)"/g)?.map(v => v.replace(/"/g, '')) ?? [];
    exportTypes.push({ name: t[1], values });
  }

  // export interface XxxProps { ... }
  const interfaceProps = [];
  const iRe = /export interface (\w+Props)[^{]*\{([\s\S]+?)^}/gm;
  let im;
  while ((im = iRe.exec(src)) !== null) {
    const body = im[2];
    const propRe = /\/\*\*([^*]+)\*\/\s*\n\s*([\w?]+)\s*\??\s*:\s*([^\n;]+)/g;
    let p;
    while ((p = propRe.exec(body)) !== null) {
      const comment = p[1].trim().replace(/\s+/g, ' ');
      const propName = p[2].replace('?', '');
      const propType = p[3].trim().replace(/;$/, '');
      interfaceProps.push({ name: propName, type: propType, description: comment });
    }
    // Also catch props without comments
    const allPropRe = /^  ([\w?]+)\s*\??\s*:\s*([^\n;]+)/gm;
    let ap;
    while ((ap = allPropRe.exec(body)) !== null) {
      const name = ap[1].replace('?', '');
      if (!interfaceProps.some(p => p.name === name)) {
        interfaceProps.push({ name, type: ap[2].trim().replace(/;$/, ''), description: '' });
      }
    }
  }

  // var(--xxx) CSS variable references
  const cssVarSet = new Set();
  const cssRe = /var\((--[\w-]+)[^)]*\)/g;
  let cv;
  while ((cv = cssRe.exec(src)) !== null) {
    cssVarSet.add(cv[1]);
  }

  return { exportTypes, interfaceProps, cssVars: [...cssVarSet] };
}

/**
 * Build a swatch badge URL for a hex color (no #)
 */
function swatch(hex) {
  const h = hex.replace('#', '');
  if (h.toLowerCase().startsWith('rgba')) return '';
  return `![#${h}](https://placehold.co/16x16/${h}/${h}.png)`;
}

// ─── Generator functions ──────────────────────────────────────────────────────

function generateOverview() {
  return `# WeLoop Design System — Overview

> Version 2.1 · React 18+ · TypeScript · Multi-brand token system

WeLoop is a production-ready design system supporting three brand identities (**wabooks**, **webill365**, **wecafe**) with full light/dark mode coverage. All visual decisions — colors, spacing, typography, shadows — are encoded as design tokens that flow from primitives through semantic layers to component-level CSS variables.

## Token Architecture

\`\`\`
Primitives (raw palette)
      │
      ▼
Semantic Tokens (color, shadow interfaces)
      │
      ▼
Brand Themes × Color Modes  (6 theme files)
      │
      ▼
CSS Variables (applied to :root by ThemeProvider)
      │
      ▼
Components (consume CSS variables via var(--token))
\`\`\`

## Brand Themes

| Brand      | Primary Color | Primitive Family |
|------------|---------------|-----------------|
| wabooks    | \`#0060B9\`     | purple-600      |
| webill365  | \`#1D32FF\`     | blue-600        |
| wecafe     | \`#E7450F\`     | orange-600      |

Each brand ships two modes: **light** and **dark** → 6 theme files total.

## Component Tiers

| Tier       | Count | Examples                                        |
|------------|-------|-------------------------------------------------|
| Atoms      | 24    | ButtonSingle, Checkbox, Toggle, FormField, Tabs |
| Molecules  | 6     | Banner, DashboardCard, DatePicker, Pagination   |
| Organisms  | 5     | Dialog, DataTable, EmptyState, AppNavigate      |

## Quick Links

### Foundation
- [Color Palette](./01-foundation/colors.md)
- [Typography](./01-foundation/typography.md)
- [Spacing & Layout](./01-foundation/spacing.md)

### Tokens
- [Color Tokens](./02-tokens/color-tokens.md)
- [Shadow Tokens](./02-tokens/shadow-tokens.md)
- [Theme Guide](./02-tokens/theme-guide.md)

### Components
- [Atoms](./03-components/atoms/)
- [Molecules](./03-components/molecules/)
- [Organisms](./03-components/organisms/)

### Theming
- [Custom Themes](./04-theming/custom-theme.md)
- [CSS Variables Reference](./04-theming/css-variables.md)

## Installation

\`\`\`bash
npm install weloop-components
\`\`\`

## Basic Usage

\`\`\`tsx
import { ThemeProvider } from 'weloop-components/tokens';
import { ButtonSingle } from 'weloop-components/components/atoms';

export default function App() {
  return (
    <ThemeProvider defaultTheme="webill365" defaultMode="light">
      <ButtonSingle buttonType="primary" variant="filled" size="md">
        Get started
      </ButtonSingle>
    </ThemeProvider>
  );
}
\`\`\`
`;
}

function generateColors(primitives) {
  const lines = [`# Color Palette`, '', 'Full primitive color palette. Each family has 11 steps (50–950).', ''];

  for (const [family, steps] of Object.entries(primitives)) {
    lines.push(`## ${family.charAt(0).toUpperCase() + family.slice(1)}`);
    lines.push('');

    if (family === 'white') {
      lines.push('The white family uses rgba opacity steps for overlay use cases.');
      lines.push('');
      lines.push('| Step | Value                        |');
      lines.push('|------|------------------------------|');
      for (const [step, val] of Object.entries(steps)) {
        lines.push(`| ${step}  | \`${val}\` |`);
      }
    } else {
      lines.push('| Step | Hex       | Swatch |');
      lines.push('|------|-----------|--------|');
      for (const [step, hex] of Object.entries(steps)) {
        const badge = swatch(hex);
        lines.push(`| ${step.padEnd(4)} | \`${hex}\` | ${badge} |`);
      }
    }
    lines.push('');
  }

  lines.push('## Semantic Color Usage');
  lines.push('');
  lines.push('| Role              | Light Source           | Dark Source            |');
  lines.push('|-------------------|------------------------|------------------------|');
  lines.push('| Brand primary bg  | purple/blue/orange-600 | Same family, adjusted  |');
  lines.push('| Brand subtle bg   | purple/blue/orange-100 | Same family, 900+      |');
  lines.push('| Default text      | neutral-950 (#000)     | neutral-50 (#FAFAFA)   |');
  lines.push('| Subtle text       | neutral-400            | neutral-600            |');
  lines.push('| Default border    | neutral-200            | neutral-700            |');
  lines.push('| Danger            | red-600                | red-500                |');
  lines.push('| Success           | green-600              | green-500              |');
  lines.push('| Warning           | orange-600             | orange-500             |');
  lines.push('| Info              | blue-500               | blue-400               |');
  lines.push('| Caution           | yellow-500             | yellow-400             |');
  lines.push('');

  return lines.join('\n');
}

function generateTypography(typo) {
  const lines = [
    '# Typography',
    '',
    'Complete type scale for the WeLoop design system.',
    '',
  ];

  lines.push('## Font Families');
  lines.push('');
  lines.push('| Key    | Value                                     |');
  lines.push('|--------|-------------------------------------------|');
  for (const [key, val] of Object.entries(typo.fontFamily)) {
    lines.push(`| ${key.padEnd(6)} | \`${val}\` |`);
  }
  lines.push('');

  lines.push('## Font Size Scale');
  lines.push('');
  lines.push('| Category | Variant  | px | rem    |');
  lines.push('|----------|----------|----|--------|');
  for (const [cat, variants] of Object.entries(typo.fontSize)) {
    for (const [v, px] of Object.entries(variants)) {
      const rem = (px / 16).toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
      lines.push(`| ${cat.padEnd(8)} | ${v.padEnd(8)} | ${String(px).padEnd(2)} | ${rem}rem  |`);
    }
  }
  lines.push('');

  lines.push('## Line Height Scale');
  lines.push('');
  lines.push('| Category | Variant  | px | rem    |');
  lines.push('|----------|----------|----|--------|');
  for (const [cat, variants] of Object.entries(typo.lineHeight)) {
    for (const [v, px] of Object.entries(variants)) {
      const rem = (px / 16).toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
      lines.push(`| ${cat.padEnd(8)} | ${v.padEnd(8)} | ${String(px).padEnd(2)} | ${rem}rem  |`);
    }
  }
  lines.push('');

  lines.push('## Font Weights');
  lines.push('');
  lines.push('| Name     | Value |');
  lines.push('|----------|-------|');
  for (const [name, val] of Object.entries(typo.fontWeight)) {
    lines.push(`| ${name.padEnd(8)} | ${val}   |`);
  }
  lines.push('');

  lines.push('## Letter Spacing');
  lines.push('');
  lines.push('| Name   | Value   |');
  lines.push('|--------|---------|');
  for (const [name, val] of Object.entries(typo.letterSpacing)) {
    lines.push(`| ${name.padEnd(6)} | \`${val}\` |`);
  }
  lines.push('');

  lines.push('## Type Ramp Reference');
  lines.push('');
  lines.push('Visual reference showing each scale level with typical CSS properties:');
  lines.push('');
  lines.push('| Level          | font-size | line-height | font-weight | Use case                  |');
  lines.push('|----------------|-----------|-------------|-------------|---------------------------|');
  lines.push('| display/lg     | 64px      | 80px        | bold 700    | Hero headlines            |');
  lines.push('| display/md     | 52px      | 72px        | bold 700    | Section heroes            |');
  lines.push('| display/sm     | 44px      | 64px        | bold 700    | Large page titles         |');
  lines.push('| headline/lg    | 42px      | 56px        | semibold    | Page headings             |');
  lines.push('| headline/md    | 40px      | 48px        | semibold    | Section headings          |');
  lines.push('| headline/sm    | 36px      | 44px        | semibold    | Card headings             |');
  lines.push('| title/lg       | 24px      | 32px        | semibold    | Widget titles             |');
  lines.push('| title/md       | 20px      | 28px        | medium      | Sub-headings              |');
  lines.push('| title/sm       | 16px      | 24px        | medium      | List section titles       |');
  lines.push('| body/lg        | 20px      | 28px        | regular     | Large body text           |');
  lines.push('| body/md        | 16px      | 24px        | regular     | Default body text         |');
  lines.push('| body/sm        | 14px      | 20px        | regular     | Secondary body text       |');
  lines.push('| button/md      | 18px      | 24px        | medium      | Large button labels       |');
  lines.push('| button/sm      | 14px      | 20px        | medium      | Default button labels     |');
  lines.push('| button/xs      | 12px      | 16px        | medium      | Small/compact buttons     |');
  lines.push('| meta/caption   | 12px      | 16px        | regular     | Captions, helper text     |');
  lines.push('| meta/label     | 11px      | 16px        | medium      | Form labels, tags         |');
  lines.push('| meta/helper    | 10px      | 14px        | regular     | Tooltips, fine print      |');
  lines.push('');

  return lines.join('\n');
}

function generateSpacing(spacing) {
  const lines = [
    '# Spacing & Layout Tokens',
    '',
    'All spacing is expressed in px. Divide by 16 for rem equivalents.',
    '',
  ];

  lines.push('## Spacing Scale');
  lines.push('');
  lines.push('| Group   | Token | px  | rem    | Usage                           |');
  lines.push('|---------|-------|-----|--------|---------------------------------|');
  const groupDesc = {
    micro:   'Tight gaps, icon-to-text, button padding',
    inset:   'Component internal padding',
    stack:   'Between related elements, card padding',
    section: 'Between sections, large gaps',
    page:    'Page-level margins, hero spacing',
  };
  for (const [group, steps] of Object.entries(spacing.spacingScale)) {
    for (const [px] of Object.entries(steps)) {
      const rem = (parseInt(px) / 16).toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
      lines.push(`| ${group.padEnd(7)} | ${String(px).padEnd(5)} | ${String(px).padEnd(3)} | ${rem.padEnd(6)} | ${groupDesc[group] ?? ''} |`);
    }
  }
  lines.push('');

  lines.push('## Border Radius');
  lines.push('');
  lines.push('| Token | px  | Use case                          |');
  lines.push('|-------|-----|-----------------------------------|');
  const radiusDesc = {
    none: 'Sharp corners (tables, dividers)',
    xxs:  'Tiny chips, tags',
    xs:   'Small buttons, badges',
    sm:   'Default inputs, cards',
    md:   'Standard components',
    lg:   'Large cards, modals',
    xl:   'Feature cards, sheets',
    full: 'Pills, avatars, toggles',
  };
  for (const [name, px] of Object.entries(spacing.radius)) {
    lines.push(`| ${name.padEnd(5)} | ${String(px).padEnd(3)} | ${radiusDesc[name] ?? ''} |`);
  }
  lines.push('');

  lines.push('## Stroke Widths');
  lines.push('');
  lines.push('| Token         | px  | Use case                     |');
  lines.push('|---------------|-----|------------------------------|');
  const strokeDesc = {
    none:          'No border',
    hairline:      'Subtle dividers on retina displays',
    thin:          'Default borders',
    'thin-hairline':'Slightly elevated borders',
    medium:        'Focused/active inputs',
    thick:         'Emphasis borders, progress bars',
  };
  for (const [name, px] of Object.entries(spacing.stroke)) {
    lines.push(`| ${name.padEnd(13)} | ${String(px).padEnd(3)} | ${strokeDesc[name] ?? ''} |`);
  }
  lines.push('');

  lines.push('## Control Sizes');
  lines.push('');
  lines.push('Minimum touch target heights for interactive controls:');
  lines.push('');
  lines.push('| Token | px  | Example controls                 |');
  lines.push('|-------|-----|----------------------------------|');
  const controlDesc = {
    xxs:  'Compact badges, mini buttons',
    xs:   'Small buttons, icon buttons',
    sm:   'Compact inputs, small selects',
    md:   'Default inputs, buttons',
    lg:   'Comfortable inputs',
    xl:   'Large action areas',
    xxl:  'Mobile-optimized touch targets',
  };
  for (const [name, px] of Object.entries(spacing.controlSize)) {
    lines.push(`| ${name.padEnd(5)} | ${String(px).padEnd(3)} | ${controlDesc[name] ?? ''} |`);
  }
  lines.push('');

  return lines.join('\n');
}

function generateColorTokens() {
  return `# Color Tokens

Semantic color tokens map abstract roles to brand-specific values. Components use CSS variables that are set by \`ThemeProvider\`.

## Background Tokens

| CSS Variable                        | Description                                  | Light Example (webill365) |
|-------------------------------------|----------------------------------------------|---------------------------|
| \`--color-bg-default\`                | Page/app background                          | \`#FFFFFF\`               |
| \`--color-bg-surface-default\`        | Card, panel surface                          | \`#FFFFFF\`               |
| \`--color-bg-surface-subtle\`         | Slightly elevated surface                    | \`#F5F5F5\`               |
| \`--color-bg-surface-ghost\`          | Transparent overlay                          | \`rgba(255,255,255,0.08)\` |
| \`--color-bg-surface-emphasized\`     | Highlighted surface                          | \`#F3F4F6\`               |
| \`--color-bg-surface-inverse\`        | Inverted (dark on light, light on dark)      | \`#1F2937\`               |
| \`--color-bg-surface-disabled\`       | Disabled control fill                        | \`#E5E5E5\`               |
| \`--color-bg-brand-primary\`          | Primary brand fill (buttons, active states)  | \`#1D32FF\`               |
| \`--color-bg-brand-subtle\`           | Light brand tint (hover backgrounds)         | \`#D8E9FF\`               |
| \`--color-bg-brand-subtle-hover\`     | Brand hover state fill                       | \`#3E60FF\`               |
| \`--color-bg-brand-subtle-press\`     | Brand pressed state fill                     | \`#0F1FEA\`               |
| \`--color-bg-brand-contrast\`         | Very light brand tint                        | \`#EAF3FF\`               |
| \`--color-bg-danger-default\`         | Danger/error fill (destructive buttons)      | \`#E1232E\`               |
| \`--color-bg-danger-subtle\`          | Light danger tint                            | \`#FFE1E3\`               |
| \`--color-bg-danger-subtle-hover\`    | Danger hover state fill                      | \`#FC6D75\`               |

## Text Tokens

| CSS Variable                    | Description                              | Light Example |
|---------------------------------|------------------------------------------|---------------|
| \`--color-text-default\`          | Primary text                             | \`#000000\`   |
| \`--color-text-on-bg-primary\`    | Text on brand primary backgrounds        | \`#FAFAFA\`   |
| \`--color-text-subtle\`           | Secondary/muted text                     | \`#A3A3A3\`   |
| \`--color-text-brand\`            | Brand-colored text, links                | \`#1D32FF\`   |
| \`--color-text-disabled\`         | Text in disabled controls                | \`#737373\`   |
| \`--color-text-inverse\`          | Text on inverse surfaces                 | \`#F5F5F5\`   |
| \`--color-text-danger\`           | Error/danger text                        | \`#BD1822\`   |
| \`--color-text-success\`          | Success text                             | \`#15803D\`   |
| \`--color-text-warning\`          | Warning text                             | \`#BF310F\`   |

## Border Tokens

| CSS Variable                    | Description                              | Light Example |
|---------------------------------|------------------------------------------|---------------|
| \`--color-border-default\`        | Default border on surfaces               | \`#E5E5E5\`   |
| \`--color-border-brand\`          | Brand-colored border (focused inputs)    | \`#1D32FF\`   |
| \`--color-border-subtle\`         | Subtler dividers                         | \`#D4D4D4\`   |
| \`--color-border-strong\`         | High-contrast borders                    | \`#000000\`   |
| \`--color-border-danger\`         | Error state borders                      | \`#E1232E\`   |
| \`--color-border-success\`        | Success state borders                    | \`#16A34A\`   |
| \`--color-border-disabled\`       | Disabled control borders                 | \`#E5E5E5\`   |
| \`--color-border-emphasized\`     | Strong brand border (focus rings)        | \`#1221C1\`   |

## Feedback Palette

Feedback colors are available as semantic token objects in TypeScript but are not exposed as individual CSS variables (they are used directly in component logic):

| Feedback Type | Solid BG    | Subtle BG   | Solid Text  | Border      |
|---------------|-------------|-------------|-------------|-------------|
| neutral       | \`#6B7280\`  | \`#F5F5F5\`  | \`#374151\`  | \`#6B7280\`  |
| info          | \`#3E60FF\`  | \`#D8E9FF\`  | \`#1221C1\`  | \`#1221C1\`  |
| error         | \`#E1232E\`  | \`#FFE1E3\`  | \`#BD1822\`  | \`#E1232E\`  |
| success       | \`#22C55E\`  | \`#DCFCE7\`  | \`#15803D\`  | \`#16A34A\`  |
| warning       | \`#F65F19\`  | \`#FDCFAB\`  | \`#BF310F\`  | \`#E7450F\`  |
| caution       | \`#EAB308\`  | \`#FEF9C3\`  | \`#A16207\`  | \`#CA8A04\`  |
| accent        | Brand       | Brand-100   | Brand-800   | Brand-600   |
`;
}

function generateShadowTokens() {
  return `# Shadow Tokens

Shadow tokens encode box-shadow values that communicate elevation, focus, and interaction state.

## Brand Shadows

Used on primary and brand-colored interactive elements.

| CSS Variable              | State     | Description                                | Use Case                    |
|---------------------------|-----------|--------------------------------------------|-----------------------------|
| \`--shadow-brand-default\`  | Default   | 1px outline + drop shadow in brand color   | Primary filled buttons      |
| \`--shadow-brand-hover\`    | Hover     | Elevated brand shadow                      | Button hover state          |
| \`--shadow-brand-pressed\`  | Pressed   | White ring + brand glow + light tint ring  | Button pressed / active     |
| \`--shadow-brand-secondary\`| Secondary | Neutral hairline outline                   | Secondary brand surfaces    |
| \`--shadow-brand-sm\`       | —         | Small brand drop shadow                    | Legacy / compat             |
| \`--shadow-brand-md\`       | —         | Medium brand drop shadow                   | Legacy / compat             |

## Default (Neutral) Shadows

Used on neutral/ghost interactive elements.

| CSS Variable               | State   | Description                              | Use Case                  |
|----------------------------|---------|------------------------------------------|---------------------------|
| \`--shadow-default-default\` | Default | Hairline outline + subtle drop shadow    | Ghost/outline buttons     |
| \`--shadow-default-hover\`   | Hover   | 1px outline + elevated drop             | Ghost button hover        |
| \`--shadow-default-pressed\` | Pressed | White ring + neutral glow + gray ring   | Ghost button pressed      |

## Danger Shadows

Used on destructive action controls.

| CSS Variable             | State   | Description                                | Use Case                  |
|--------------------------|---------|--------------------------------------------|---------------------------|
| \`--shadow-danger-default\` | Default | 1px red outline + red tinted drop shadow  | Danger filled buttons     |
| \`--shadow-danger-hover\`   | Hover   | Red outline with elevated shadow          | Danger button hover       |
| \`--shadow-danger-pressed\` | Pressed | Red glow + light pink ring                | Danger button pressed     |

## Toggle Shadows

Used on toggle/switch components.

| CSS Variable             | State   | Description                               | Use Case               |
|--------------------------|---------|-------------------------------------------|------------------------|
| \`--shadow-toggle-default\` | Off     | Subtle depth shadow                       | Toggle unchecked        |
| \`--shadow-toggle-hover\`   | Hover   | Brand-tinted glow                         | Toggle hover state      |
| \`--shadow-toggle-pressed\` | Pressed | White ring + brand glow + tint            | Toggle press state      |
| \`--shadow-toggle-checked\` | On      | Brand outline glow                        | Toggle checked state    |

## Input Shadows

Used on form field controls.

| CSS Variable           | State   | Description                          | Use Case                     |
|------------------------|---------|--------------------------------------|------------------------------|
| \`--shadow-input-default\` | Default | Single-px neutral border shadow     | Unfocused input              |
| \`--shadow-input-brand\`   | Focus   | Brand outline + tint ring           | Focused input                |
| \`--shadow-input-warning\` | Error   | Red outline + light red ring        | Validation error state       |
| \`--shadow-input-success\` | Success | Green outline + green glow          | Validation success state     |

## Miscellaneous Shadows

| CSS Variable                  | Description                              | Use Case                     |
|-------------------------------|------------------------------------------|------------------------------|
| \`--shadow-disabled\`           | Neutral hairline only                    | Disabled control borders     |
| \`--shadow-floating-default\`   | Soft multi-layer elevation               | Dropdowns, popovers          |
| \`--shadow-floating-gen-card\`  | Card-style border with micro elevation  | Data cards, list surfaces    |
| \`--shadow-floating-float\`     | High elevation with blur                | Floating panels, tooltips    |
`;
}

function generateThemeGuide() {
  return `# Theme Guide

Side-by-side comparison of the three brand themes and their key token values.

## Brand Overview

| Property          | wabooks             | webill365           | wecafe              |
|-------------------|---------------------|---------------------|---------------------|
| Primitive family  | purple              | blue                | orange              |
| bg.brand.primary  | \`#0060B9\`          | \`#1D32FF\`          | \`#E7450F\`          |
| bg.brand.subtle   | \`#E0EEFE\`          | \`#D8E9FF\`          | \`#FEE9D6\`          |
| bg.brand.contrast | \`#F0F7FF\`          | \`#EAF3FF\`          | \`#FFF5ED\`          |
| text.brand        | \`#0060B9\`          | \`#1D32FF\`          | \`#E7450F\`          |
| border.brand      | \`#0060B9\`          | \`#1D32FF\`          | \`#E7450F\`          |
| border.emphasized | \`#064786\`          | \`#1221C1\`          | \`#982914\`          |

## Light Mode Token Values

### wabooks (purple brand)

| Token                   | Value       |
|-------------------------|-------------|
| bg.default              | \`#FFFFFF\`  |
| bg.brand.primary        | \`#0060B9\`  |
| bg.brand.subtle         | \`#E0EEFE\`  |
| bg.brand.subtleHover    | \`#0C87EB\`  |
| bg.brand.subtlePress    | \`#0152A3\`  |
| text.brand              | \`#0060B9\`  |
| border.brand            | \`#0060B9\`  |
| shadow.brand.default    | \`0 0 0 1px rgba(1,82,163,1), ...\` |

### webill365 (blue brand)

| Token                   | Value       |
|-------------------------|-------------|
| bg.default              | \`#FFFFFF\`  |
| bg.brand.primary        | \`#1D32FF\`  |
| bg.brand.subtle         | \`#D8E9FF\`  |
| bg.brand.subtleHover    | \`#3E60FF\`  |
| bg.brand.subtlePress    | \`#0F1FEA\`  |
| text.brand              | \`#1D32FF\`  |
| border.brand            | \`#1D32FF\`  |
| shadow.brand.default    | \`0 0 0 1px rgba(18,33,193,1), ...\` |

### wecafe (orange brand)

| Token                   | Value       |
|-------------------------|-------------|
| bg.default              | \`#FFFFFF\`  |
| bg.brand.primary        | \`#E7450F\`  |
| bg.brand.subtle         | \`#FEE9D6\`  |
| bg.brand.subtleHover    | \`#F65F19\`  |
| bg.brand.subtlePress    | \`#BF310F\`  |
| text.brand              | \`#E7450F\`  |
| border.brand            | \`#E7450F\`  |
| shadow.brand.default    | \`0 0 0 1px rgba(191,49,15,1), ...\` |

## Switching Themes at Runtime

\`\`\`tsx
import { useTheme } from 'weloop-components/tokens';

function BrandSwitcher() {
  const { setTheme, setColorMode, themeName, colorMode } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme('wabooks')}>wabooks</button>
      <button onClick={() => setTheme('webill365')}>webill365</button>
      <button onClick={() => setTheme('wecafe')}>wecafe</button>
      <button onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}
\`\`\`

## Shared Tokens (Same Across All Themes)

These tokens are identical in all three brands — only brand-specific slots differ:

| Token                   | Light Value |
|-------------------------|-------------|
| bg.surface.disabled     | \`#E5E5E5\`  |
| bg.danger.default       | \`#E1232E\`  |
| text.default            | \`#000000\`  |
| text.subtle             | \`#A3A3A3\`  |
| text.disabled           | \`#737373\`  |
| text.danger             | \`#BD1822\`  |
| text.success            | \`#15803D\`  |
| border.danger           | \`#E1232E\`  |
| border.success          | \`#16A34A\`  |
| bg.feedback.error       | \`#E1232E\` / \`#FFE1E3\` |
| bg.feedback.success     | \`#22C55E\` / \`#DCFCE7\` |
`;
}

// ─── Component doc generator ──────────────────────────────────────────────────

const COMPONENT_DATA = {
  // Atoms
  Avatar: {
    tier: 'atoms',
    description: 'Displays a user avatar with support for image, initials, or office/special types. Falls back gracefully when image fails to load.',
    props: [
      { name: 'type',     type: '"default"|"initials"|"office"|string', default: '"default"', description: 'Avatar style type' },
      { name: 'size',     type: '"sm"|"md"|"lg"',                       default: '"md"',      description: 'Avatar size' },
      { name: 'src',      type: 'string',                               default: '—',         description: 'Image URL' },
      { name: 'name',     type: 'string',                               default: '—',         description: 'Full name used to generate initials' },
      { name: 'fallback', type: 'React.ReactNode',                      default: '—',         description: 'Custom fallback content' },
    ],
    cssVars: ['--color-bg-brand-primary', '--color-text-on-bg-primary'],
    example: `<Avatar type="initials" size="md" name="Jane Doe" />`,
  },
  BankLogo: {
    tier: 'atoms',
    description: 'Renders a bank institution logo by code. Displays a placeholder when the bank code is unrecognized.',
    props: [
      { name: 'code',  type: 'string', default: '—',    description: 'Bank institution code (e.g. "BCA", "MANDIRI")' },
      { name: 'size',  type: 'number', default: '32',   description: 'Width/height in pixels' },
      { name: 'style', type: 'React.CSSProperties', default: '—', description: 'Override container styles' },
    ],
    cssVars: [],
    example: `<BankLogo code="BCA" size={40} />`,
  },
  ButtonDropdown: {
    tier: 'atoms',
    description: 'A button with an attached dropdown menu. Combines a trigger button with a Radix DropdownMenu for accessible popover menus.',
    props: [
      { name: 'label',    type: 'string',                                   default: '—',       description: 'Button label text' },
      { name: 'items',    type: 'Array<{ label: string; onClick: () => void }>', default: '[]', description: 'Dropdown menu items' },
      { name: 'variant',  type: '"filled"|"outline"|"ghost"',               default: '"filled"', description: 'Button visual variant' },
      { name: 'size',     type: '"xs"|"sm"|"md"',                           default: '"sm"',     description: 'Button size' },
      { name: 'disabled', type: 'boolean',                                  default: 'false',    description: 'Disable the button and dropdown' },
    ],
    cssVars: ['--color-bg-brand-primary', '--color-text-on-bg-primary', '--shadow-brand-default'],
    example: `<ButtonDropdown
  label="Actions"
  items={[
    { label: 'Edit', onClick: () => {} },
    { label: 'Delete', onClick: () => {} },
  ]}
/>`,
  },
  ButtonSegment: {
    tier: 'atoms',
    description: 'A segmented control that acts as a single-select tab strip. Each segment is a button; only one can be active at a time.',
    props: [
      { name: 'items',         type: 'Array<{ value: string; label: string }>',  default: '[]',   description: 'Segment items' },
      { name: 'value',         type: 'string',                                   default: '—',    description: 'Currently selected value' },
      { name: 'onValueChange', type: '(value: string) => void',                  default: '—',    description: 'Called when selection changes' },
      { name: 'size',          type: '"xs"|"sm"|"md"',                           default: '"sm"', description: 'Segment size' },
    ],
    cssVars: ['--color-bg-brand-primary', '--color-text-on-bg-primary'],
    example: `<ButtonSegment
  items={[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }]}
  value="day"
  onValueChange={setValue}
/>`,
  },
  ButtonSingle: {
    tier: 'atoms',
    description: 'The core action button. Supports three visual types (primary, danger, ghost) each with three fill variants (filled, outline, ghost) and three sizes.',
    props: [
      { name: 'buttonType', type: '"primary"|"danger"|"ghost"',  default: '"primary"', description: 'Visual colour theme' },
      { name: 'variant',    type: '"filled"|"outline"|"ghost"',  default: '"filled"',  description: 'Fill style' },
      { name: 'size',       type: '"xs"|"sm"|"md"',              default: '"sm"',      description: 'Button size' },
      { name: 'leadIcon',   type: 'React.ReactNode',             default: '—',         description: 'Icon rendered before the label' },
      { name: 'shortcut',   type: 'string',                      default: '—',         description: 'Keyboard shortcut badge inside the button' },
      { name: 'disabled',   type: 'boolean',                     default: 'false',     description: 'Disables the button' },
      { name: 'onClick',    type: 'React.MouseEventHandler',     default: '—',         description: 'Click handler' },
    ],
    cssVars: ['--color-bg-brand-primary', '--color-text-on-bg-primary', '--shadow-brand-default', '--shadow-brand-hover', '--shadow-brand-pressed', '--color-bg-danger-default', '--shadow-danger-default', '--shadow-danger-hover', '--color-text-brand', '--color-border-brand', '--color-text-danger', '--color-border-danger', '--color-bg-brand-subtle', '--color-bg-brand-contrast', '--color-bg-danger-subtle', '--color-bg-brand-subtle-hover', '--color-bg-brand-subtle-press'],
    example: `<ButtonSingle buttonType="primary" variant="filled" size="md">
  Save changes
</ButtonSingle>

<ButtonSingle buttonType="danger" variant="outline" size="sm">
  Delete
</ButtonSingle>

<ButtonSingle buttonType="ghost" variant="ghost" size="xs" disabled>
  Cancel
</ButtonSingle>`,
  },
  Checkbox: {
    tier: 'atoms',
    description: 'An accessible checkbox built on Radix UI. Supports checked, unchecked, and indeterminate states with two size options.',
    props: [
      { name: 'checked',       type: 'boolean',                  default: 'false', description: 'Whether the checkbox is ticked' },
      { name: 'indeterminate', type: 'boolean',                  default: 'false', description: 'Partial/indeterminate state (shows a dash)' },
      { name: 'disabled',      type: 'boolean',                  default: 'false', description: 'Disable all interaction' },
      { name: 'label',         type: 'string',                   default: '—',     description: 'Label text beside the box' },
      { name: 'size',          type: '"sm"|"lg"',                default: '"sm"',  description: 'Box size — sm=16px, lg=20px' },
      { name: 'onChange',      type: '(checked: boolean) => void', default: '—',  description: 'Called with the new checked value' },
    ],
    cssVars: ['--color-bg-brand-primary', '--color-border-brand', '--shadow-input-brand'],
    example: `<Checkbox
  label="Accept terms"
  checked={accepted}
  onChange={setAccepted}
  size="sm"
/>

<Checkbox
  label="Select all"
  indeterminate={someSelected}
  checked={allSelected}
  onChange={handleSelectAll}
/>`,
  },
  Chip: {
    tier: 'atoms',
    description: 'A compact tag-like element. "suggest" chips are selectable options; "input" chips represent entered values with an optional remove button.',
    props: [
      { name: 'type',     type: '"suggest"|"input"',  default: '"suggest"', description: 'Chip mode' },
      { name: 'size',     type: '"sm"|"md"',          default: '"sm"',      description: 'Chip size' },
      { name: 'label',    type: 'string',             default: '—',         description: 'Chip label text' },
      { name: 'avatar',   type: 'React.ReactNode',    default: '—',         description: 'Optional leading avatar' },
      { name: 'selected', type: 'boolean',            default: 'false',     description: 'Selected state (suggest type only)' },
      { name: 'onRemove', type: '() => void',         default: '—',         description: 'Called when × is clicked (input type)' },
    ],
    cssVars: ['--color-bg-brand-primary', '--color-text-on-bg-primary', '--color-border-brand'],
    example: `<Chip type="suggest" label="React" selected={false} />
<Chip type="input"   label="TypeScript" onRemove={() => removeTag('TypeScript')} />`,
  },
  Flag: {
    tier: 'atoms',
    description: 'Renders a country flag icon by ISO 3166-1 alpha-2 country code.',
    props: [
      { name: 'code',  type: 'string', default: '—',    description: 'ISO 3166-1 alpha-2 country code (e.g. "US", "ID")' },
      { name: 'size',  type: 'number', default: '24',   description: 'Width/height in pixels' },
      { name: 'style', type: 'React.CSSProperties', default: '—', description: 'Custom styles' },
    ],
    cssVars: [],
    example: `<Flag code="ID" size={24} />
<Flag code="US" size={32} />`,
  },
  FormField: {
    tier: 'atoms',
    description: 'A flexible labeled input with five types: text, numeric, comboLeft, comboRight, and textarea. Handles error, success, and disabled states.',
    props: [
      { name: 'type',              type: '"text"|"numeric"|"comboLeft"|"comboRight"|"textarea"', default: '"text"',   description: 'Input variant' },
      { name: 'label',             type: 'string',            default: '—',          description: 'Label above the field' },
      { name: 'placeholder',       type: 'string',            default: '"Placeholder"', description: 'Input placeholder text' },
      { name: 'value',             type: 'string',            default: '—',          description: 'Controlled value' },
      { name: 'onChange',          type: '(value: string) => void', default: '—',    description: 'Called with new text value' },
      { name: 'selectValue',       type: 'string',            default: '—',          description: 'Value for combo select part' },
      { name: 'selectOptions',     type: 'string[]',          default: '["Option 1","Option 2","Option 3"]', description: 'Options for combo dropdown' },
      { name: 'onSelectChange',    type: '(value: string) => void', default: '—',    description: 'Called when combo select changes' },
      { name: 'helperText',        type: 'string',            default: '—',          description: 'Helper or validation message below field' },
      { name: 'error',             type: 'boolean',           default: 'false',      description: 'Error state (red border + helper)' },
      { name: 'success',           type: 'boolean',           default: 'false',      description: 'Success state (green border)' },
      { name: 'disabled',          type: 'boolean',           default: 'false',      description: 'Disables the field' },
      { name: 'required',          type: 'boolean',           default: 'false',      description: 'Shows required asterisk' },
    ],
    cssVars: ['--color-border-brand', '--color-border-danger', '--shadow-input-brand', '--shadow-input-warning', '--color-text-danger'],
    example: `<FormField
  label="Email address"
  type="text"
  placeholder="user@example.com"
  value={email}
  onChange={setEmail}
  required
/>

<FormField
  label="Amount"
  type="comboLeft"
  selectOptions={['USD', 'IDR', 'EUR']}
  selectValue={currency}
  onSelectChange={setCurrency}
  value={amount}
  onChange={setAmount}
/>`,
  },
  Icon: {
    tier: 'atoms',
    description: 'Renders WeLoop design system icons. Icons are individually exported SVG components at 16px, with size and color overrides.',
    props: [
      { name: 'size',  type: 'number',              default: '16',  description: 'Icon width/height in pixels' },
      { name: 'color', type: 'string',              default: '"currentColor"', description: 'Icon fill/stroke color' },
      { name: 'style', type: 'React.CSSProperties', default: '—',   description: 'Custom styles' },
    ],
    cssVars: [],
    example: `import { IconCheck16, IconClose16, IconInfo16 } from 'weloop-components/icons';

<IconCheck16 size={20} color="var(--color-text-brand)" />
<IconClose16 size={16} color="#E1232E" />`,
  },
  InlineTip: {
    tier: 'atoms',
    description: 'An inline contextual hint block. Supports four types (information, danger, suggestion, warning) with filled or outline fill styles.',
    props: [
      { name: 'type',        type: '"information"|"danger"|"suggestion"|"warning"', default: '"information"', description: 'Tip type determines color scheme' },
      { name: 'fill',        type: '"filled"|"outline"', default: '"filled"', description: 'Background fill style' },
      { name: 'title',       type: 'string',             default: '—',         description: 'Bold title line' },
      { name: 'description', type: 'string',             default: '—',         description: 'Description text' },
      { name: 'linkPrefix',  type: 'string',             default: '—',         description: 'Text before the link' },
      { name: 'linkText',    type: 'string',             default: '—',         description: 'Clickable link text' },
      { name: 'onLinkClick', type: '() => void',         default: '—',         description: 'Link click handler' },
      { name: 'showLink',    type: 'boolean',            default: 'false',     description: 'Whether to render the link row' },
    ],
    cssVars: ['--color-bg-brand-subtle', '--color-text-brand', '--color-border-brand'],
    example: `<InlineTip
  type="information"
  fill="filled"
  title="Did you know?"
  description="You can switch themes at any time from the settings panel."
  showLink
  linkPrefix="Learn more in "
  linkText="the docs"
  onLinkClick={() => openDocs()}
/>`,
  },
  Link: {
    tier: 'atoms',
    description: 'A styled anchor/link component with brand color and hover underline behaviour.',
    props: [
      { name: 'href',     type: 'string',             default: '—',     description: 'Link URL' },
      { name: 'children', type: 'React.ReactNode',    default: '—',     description: 'Link label content' },
      { name: 'external', type: 'boolean',            default: 'false', description: 'Opens in new tab with rel="noopener noreferrer"' },
      { name: 'disabled', type: 'boolean',            default: 'false', description: 'Prevents navigation' },
      { name: 'style',    type: 'React.CSSProperties', default: '—',    description: 'Custom styles' },
    ],
    cssVars: ['--color-text-brand'],
    example: `<Link href="https://weloop.com" external>
  Visit WeLoop
</Link>`,
  },
  ListItem: {
    tier: 'atoms',
    description: 'A flexible list row supporting notification, bill, bank, and minimal display patterns.',
    props: [
      { name: 'type',        type: '"notifi-link"|"notifi-default"|"notifi-list"|"bill-list"|"bank-list"|"minimal"', default: '"minimal"', description: 'Item layout variant' },
      { name: 'title',       type: 'string',          default: '—',     description: 'Primary text' },
      { name: 'description', type: 'string',          default: '—',     description: 'Secondary/sub text' },
      { name: 'count',       type: 'number|string',   default: '—',     description: 'Count badge value' },
      { name: 'linkText',    type: 'string',          default: '—',     description: 'Link action text' },
      { name: 'onLinkClick', type: '() => void',      default: '—',     description: 'Link click handler' },
      { name: 'label',       type: 'string',          default: '—',     description: 'Right-side label text' },
      { name: 'showDivider', type: 'boolean',         default: 'true',  description: 'Bottom border divider' },
      { name: 'onClick',     type: '() => void',      default: '—',     description: 'Row click handler' },
    ],
    cssVars: ['--color-text-brand', '--color-border-default'],
    example: `<ListItem
  type="notifi-default"
  title="New payment received"
  description="IDR 1,500,000 from John Doe"
  count={3}
  showDivider
/>`,
  },
  Logo: {
    tier: 'atoms',
    description: 'Renders the WeLoop product logo by brand name. Adapts to the active theme.',
    props: [
      { name: 'brand', type: '"wabooks"|"webill365"|"wecafe"', default: '—',   description: 'Which brand logo to render' },
      { name: 'size',  type: '"sm"|"md"|"lg"',                default: '"md"', description: 'Logo size' },
      { name: 'mono',  type: 'boolean',                       default: 'false', description: 'Monochrome/single-color variant' },
    ],
    cssVars: ['--color-bg-brand-primary'],
    example: `<Logo brand="webill365" size="md" />`,
  },
  LucideIcons: {
    tier: 'atoms',
    description: 'Re-exports all Lucide React icons with WeLoop style defaults. Use for supplemental iconography not covered by the WeLoop icon set.',
    props: [
      { name: 'size',        type: 'number', default: '16',          description: 'Icon size in pixels' },
      { name: 'color',       type: 'string', default: '"currentColor"', description: 'Icon color' },
      { name: 'strokeWidth', type: 'number', default: '2',           description: 'SVG stroke width' },
    ],
    cssVars: [],
    example: `import { Home, Settings, Bell } from 'weloop-components/components/atoms';

<Home size={20} color="var(--color-text-brand)" />`,
  },
  NotifBadge: {
    tier: 'atoms',
    description: 'A notification count badge. Shows a number with optional maximum clamp (e.g. "99+").',
    props: [
      { name: 'count',   type: 'number',                          default: '0',         description: 'Notification count to display' },
      { name: 'max',     type: 'number',                          default: '99',        description: 'Maximum before showing "max+"' },
      { name: 'variant', type: '"default"|"brand"|"danger"',      default: '"default"', description: 'Color variant' },
    ],
    cssVars: ['--color-bg-brand-primary', '--color-text-on-bg-primary', '--color-bg-danger-default'],
    example: `<NotifBadge count={5} variant="brand" />
<NotifBadge count={120} max={99} variant="danger" />`,
  },
  PaymentBadge: {
    tier: 'atoms',
    description: 'Displays a payment method badge (Visa, Mastercard, GoPay, OVO, etc.) by payment type code.',
    props: [
      { name: 'type',  type: 'string', default: '—',   description: 'Payment method code (e.g. "VISA", "GOPAY")' },
      { name: 'size',  type: 'number', default: '32',  description: 'Badge width in pixels' },
      { name: 'style', type: 'React.CSSProperties', default: '—', description: 'Custom styles' },
    ],
    cssVars: [],
    example: `<PaymentBadge type="VISA" size={40} />
<PaymentBadge type="GOPAY" size={32} />`,
  },
  ProgressBar: {
    tier: 'atoms',
    description: 'A horizontal progress bar built on Radix Progress. Supports four color variants and three size options.',
    props: [
      { name: 'value',   type: 'number',                                default: '0',         description: 'Progress value 0–100' },
      { name: 'size',    type: '"sm"|"md"|"lg"',                        default: '"md"',      description: 'Bar height — sm=4px, md=6px, lg=8px' },
      { name: 'variant', type: '"default"|"brand"|"success"|"danger"',  default: '"default"', description: 'Color scheme' },
    ],
    cssVars: ['--color-bg-brand-primary', '--color-bg-danger-default'],
    example: `<ProgressBar value={65} size="md" variant="brand" />
<ProgressBar value={100} variant="success" />
<ProgressBar value={30} variant="danger" />`,
  },
  Radio: {
    tier: 'atoms',
    description: 'A single radio button. Use multiple Radio components within a RadioGroup for mutually exclusive selection.',
    props: [
      { name: 'value',    type: 'string',                   default: '—',     description: 'This radio option value' },
      { name: 'checked',  type: 'boolean',                  default: 'false', description: 'Whether this option is selected' },
      { name: 'onChange', type: '(value: string) => void',  default: '—',     description: 'Called when this radio is selected' },
      { name: 'label',    type: 'string',                   default: '—',     description: 'Label text' },
      { name: 'disabled', type: 'boolean',                  default: 'false', description: 'Disable interaction' },
      { name: 'size',     type: '"sm"|"md"',                default: '"sm"',  description: 'Radio button size — sm=16px, md=20px' },
    ],
    cssVars: ['--color-bg-brand-primary', '--color-border-brand', '--shadow-input-brand'],
    example: `const [plan, setPlan] = useState('monthly');

<Radio value="monthly" checked={plan === 'monthly'} onChange={setPlan} label="Monthly" />
<Radio value="annual"  checked={plan === 'annual'}  onChange={setPlan} label="Annual"  />`,
  },
  Snackbar: {
    tier: 'atoms',
    description: 'A toast-style notification system. Wrap your app in SnackbarContainer and call methods from the useSnackbar() hook to show notifications.',
    props: [
      { name: 'children',  type: 'React.ReactNode',                                            default: '—',              description: 'App content wrapped by the snackbar container' },
      { name: 'position',  type: '"bottom-center"|"bottom-right"|"bottom-left"|"top-center"|"top-right"|"top-left"', default: '"bottom-center"', description: 'Where notifications appear' },
    ],
    cssVars: [],
    example: `// Setup
<SnackbarContainer position="bottom-center">
  <App />
</SnackbarContainer>

// Usage inside components
const snackbar = useSnackbar();

snackbar.success('File saved successfully');
snackbar.warning('Unsaved changes detected');
snackbar.critical('Upload failed — please retry');
snackbar.info('Theme switched to dark mode');`,
  },
  Tabs: {
    tier: 'atoms',
    description: 'A tab navigation strip built on Radix Tabs. Supports default underline style and pill variant.',
    props: [
      { name: 'items',         type: 'Array<{ value: string; label: string }>',  default: '[]',        description: 'Tab items to render' },
      { name: 'value',         type: 'string',                                   default: '—',          description: 'Active tab value (controlled)' },
      { name: 'onValueChange', type: '(value: string) => void',                  default: '—',          description: 'Called when tab changes' },
      { name: 'variant',       type: '"default"|"pill"',                         default: '"default"',  description: 'Visual style — default=underline, pill=rounded' },
    ],
    cssVars: ['--color-bg-brand-primary', '--color-text-brand', '--color-border-brand'],
    example: `<Tabs
  items={[
    { value: 'overview', label: 'Overview' },
    { value: 'details',  label: 'Details'  },
    { value: 'history',  label: 'History'  },
  ]}
  value={activeTab}
  onValueChange={setActiveTab}
  variant="default"
/>`,
  },
  Toast: {
    tier: 'atoms',
    description: 'A low-level toast notification component built on Radix Toast. Prefer using the Snackbar system (SnackbarContainer + useSnackbar) for application-level notifications.',
    props: [
      { name: 'open',     type: 'boolean',       default: 'false',  description: 'Whether the toast is visible' },
      { name: 'title',    type: 'string',        default: '—',      description: 'Toast title' },
      { name: 'description', type: 'string',     default: '—',      description: 'Toast body text' },
      { name: 'onClose',  type: '() => void',    default: '—',      description: 'Called when the toast closes' },
      { name: 'duration', type: 'number',        default: '4000',   description: 'Auto-dismiss delay in ms' },
    ],
    cssVars: ['--shadow-floating-float'],
    example: `const [open, setOpen] = useState(false);

<Toast
  open={open}
  title="Saved"
  description="Your changes have been saved."
  onClose={() => setOpen(false)}
  duration={3000}
/>`,
  },
  Toggle: {
    tier: 'atoms',
    description: 'An accessible on/off toggle switch built on Radix Switch. Animates the thumb position and supports an optional visible label.',
    props: [
      { name: 'checked',   type: 'boolean',                  default: 'false', description: 'Controlled checked state' },
      { name: 'onChange',  type: '(checked: boolean) => void', default: '—',  description: 'Called when toggled' },
      { name: 'size',      type: '"sm"|"md"',                default: '"sm"',  description: 'Size — sm=36×20px, md=44×24px' },
      { name: 'disabled',  type: 'boolean',                  default: 'false', description: 'Disables the toggle' },
      { name: 'label',     type: 'string',                   default: '—',     description: 'Accessible label (aria-label)' },
      { name: 'showLabel', type: 'boolean',                  default: 'false', description: 'Render label text beside the toggle' },
    ],
    cssVars: ['--color-bg-brand-primary', '--shadow-toggle-checked', '--shadow-toggle-hover', '--shadow-toggle-pressed'],
    example: `<Toggle
  checked={enabled}
  onChange={setEnabled}
  size="md"
  label="Enable notifications"
  showLabel
/>`,
  },
  Tooltip: {
    tier: 'atoms',
    description: 'A floating tooltip built on Radix Tooltip. Wraps any trigger element and shows the content on hover/focus.',
    props: [
      { name: 'content',  type: 'React.ReactNode',                   default: '—',        description: 'Tooltip body content' },
      { name: 'side',     type: '"top"|"right"|"bottom"|"left"',     default: '"top"',    description: 'Preferred tooltip side' },
      { name: 'align',    type: '"start"|"center"|"end"',            default: '"center"', description: 'Alignment relative to trigger' },
      { name: 'children', type: 'React.ReactNode',                   default: '—',        description: 'Trigger element' },
    ],
    cssVars: ['--shadow-floating-float'],
    example: `<Tooltip content="Copy to clipboard" side="top">
  <button>
    <IconCopy16 />
  </button>
</Tooltip>`,
  },
  // Molecules
  Banner: {
    tier: 'molecules',
    description: 'An attention-grabbing horizontal notification bar. Supports single-line and multi-line layouts across eight visual types.',
    props: [
      { name: 'type',        type: '"information"|"success"|"warning"|"critical"|"actionable"|"multiActionable"|"multiCritical"|"multiWarning"', default: '—', description: 'Visual style and layout variant' },
      { name: 'message',     type: 'string',        default: '—',  description: 'Primary message (single-line types)' },
      { name: 'title',       type: 'string',        default: '—',  description: 'Title text (multi-line types)' },
      { name: 'description', type: 'string',        default: '—',  description: 'Description text (multi-line types)' },
      { name: 'actionLabel', type: 'string',        default: '—',  description: 'Label for the optional action button' },
      { name: 'onAction',    type: '() => void',    default: '—',  description: 'Action button click handler' },
      { name: 'onClose',     type: '() => void',    default: '—',  description: 'Close button handler — omit to hide close button' },
    ],
    cssVars: ['--color-bg-brand-subtle', '--color-text-brand', '--color-border-brand', '--color-bg-brand-primary'],
    example: `// Single-line
<Banner
  type="information"
  message="Your data was last synced 5 minutes ago."
  onClose={() => dismiss()}
/>

// Multi-line with action
<Banner
  type="multiCritical"
  title="Payment failed"
  description="We could not charge your card. Please update your payment method."
  actionLabel="Update card"
  onAction={() => openBilling()}
  onClose={() => dismiss()}
/>`,
  },
  DashboardCard: {
    tier: 'molecules',
    description: 'A stat/metric card for dashboards. Displays a title, primary metric value, optional change indicator, and supporting chart or content area.',
    props: [
      { name: 'title',       type: 'string',         default: '—',    description: 'Card title' },
      { name: 'value',       type: 'string|number',  default: '—',    description: 'Primary metric value' },
      { name: 'change',      type: 'number',         default: '—',    description: 'Period-over-period change percentage' },
      { name: 'trend',       type: '"up"|"down"|"neutral"', default: '"neutral"', description: 'Trend direction for change color' },
      { name: 'description', type: 'string',         default: '—',    description: 'Supporting context text' },
      { name: 'children',    type: 'React.ReactNode', default: '—',   description: 'Chart or custom content area' },
    ],
    cssVars: ['--color-bg-brand-primary', '--shadow-floating-gen-card'],
    example: `<DashboardCard
  title="Monthly Revenue"
  value="IDR 124,500,000"
  change={12.4}
  trend="up"
  description="vs previous month"
/>`,
  },
  DatePicker: {
    tier: 'molecules',
    description: 'A calendar-based date picker with month/year navigation. Supports single date and date range modes.',
    props: [
      { name: 'value',        type: 'Date|null',              default: 'null',    description: 'Selected date (single mode)' },
      { name: 'onChange',     type: '(date: Date) => void',   default: '—',       description: 'Called when a date is selected' },
      { name: 'placeholder',  type: 'string',                 default: '"Select date"', description: 'Input placeholder' },
      { name: 'disabled',     type: 'boolean',                default: 'false',   description: 'Disables the picker' },
      { name: 'minDate',      type: 'Date',                   default: '—',       description: 'Earliest selectable date' },
      { name: 'maxDate',      type: 'Date',                   default: '—',       description: 'Latest selectable date' },
    ],
    cssVars: ['--color-bg-brand-primary', '--color-text-on-bg-primary', '--color-text-brand', '--shadow-floating-default'],
    example: `const [date, setDate] = useState<Date | null>(null);

<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Select a date"
  minDate={new Date()}
/>`,
  },
  FileUpload: {
    tier: 'molecules',
    description: 'A drag-and-drop file upload zone with file list and upload progress.',
    props: [
      { name: 'accept',       type: 'string',                        default: '—',      description: 'MIME type filter (e.g. "image/*,.pdf")' },
      { name: 'multiple',     type: 'boolean',                       default: 'false',  description: 'Allow multiple file selection' },
      { name: 'onFilesChange', type: '(files: File[]) => void',     default: '—',      description: 'Called when files are added or removed' },
      { name: 'maxSizeMB',    type: 'number',                        default: '10',     description: 'Maximum file size in MB' },
      { name: 'disabled',     type: 'boolean',                       default: 'false',  description: 'Disable file selection' },
    ],
    cssVars: ['--color-bg-brand-subtle', '--color-border-brand', '--color-text-brand'],
    example: `<FileUpload
  accept="image/*,.pdf"
  multiple
  maxSizeMB={5}
  onFilesChange={(files) => setUploadedFiles(files)}
/>`,
  },
  Pagination: {
    tier: 'molecules',
    description: 'Page navigation control with two layout variants: simple (previous/next) and paged (numbered pages with ellipsis).',
    props: [
      { name: 'variant',          type: '"simple"|"paged"',            default: '"paged"', description: 'Layout variant' },
      { name: 'page',             type: 'number',                      default: '1',       description: 'Current page (1-indexed)' },
      { name: 'totalPages',       type: 'number',                      default: '1',       description: 'Total number of pages' },
      { name: 'pageSize',         type: 'number',                      default: '10',      description: 'Items per page (for display)' },
      { name: 'totalItems',       type: 'number',                      default: '0',       description: 'Total item count (for display)' },
      { name: 'pageSizeOptions',  type: 'number[]',                    default: '[10,25,50]', description: 'Page size options in dropdown' },
      { name: 'onPageChange',     type: '(page: number) => void',      default: '—',       description: 'Called when page changes' },
      { name: 'onPageSizeChange', type: '(size: number) => void',      default: '—',       description: 'Called when page size changes' },
      { name: 'totalLabel',       type: 'string',                      default: '"items"', description: 'Noun used in total count display' },
    ],
    cssVars: ['--color-bg-brand-primary', '--color-text-on-bg-primary', '--color-text-brand'],
    example: `<Pagination
  variant="paged"
  page={currentPage}
  totalPages={Math.ceil(total / pageSize)}
  totalItems={total}
  pageSize={pageSize}
  onPageChange={setCurrentPage}
  onPageSizeChange={setPageSize}
  totalLabel="transactions"
/>`,
  },
  Popover: {
    tier: 'molecules',
    description: 'A floating content panel that appears relative to a trigger element. Built on Radix Popover with controlled open state.',
    props: [
      { name: 'trigger',       type: 'React.ReactNode', default: '—',         description: 'Element that triggers the popover' },
      { name: 'content',       type: 'React.ReactNode', default: '—',         description: 'Popover panel content' },
      { name: 'side',          type: '"top"|"right"|"bottom"|"left"', default: '"bottom"', description: 'Preferred side' },
      { name: 'align',         type: '"start"|"center"|"end"', default: '"start"', description: 'Alignment relative to trigger' },
      { name: 'open',          type: 'boolean',         default: '—',         description: 'Controlled open state' },
      { name: 'onOpenChange',  type: '(open: boolean) => void', default: '—', description: 'Called when open state changes' },
    ],
    cssVars: ['--shadow-floating-default', '--color-bg-surface-default', '--color-border-default'],
    example: `<Popover
  trigger={<button>Open menu</button>}
  side="bottom"
  align="start"
>
  <div style={{ padding: 16 }}>
    <p>Popover content here</p>
  </div>
</Popover>`,
  },
  // Organisms
  AppNavigate: {
    tier: 'organisms',
    description: 'Top-level navigation organism composed of sub-components: AppBar (top desktop), DBottomBar (mobile bottom nav), DTopBar (mobile top), DialogSettingBar (settings overlay), and TitleNavBar (page title + back navigation).',
    props: [
      { name: 'brand',       type: '"wabooks"|"webill365"|"wecafe"', default: '—',    description: 'Brand identity for logo and colors' },
      { name: 'activeRoute', type: 'string',                        default: '—',    description: 'Current active route path' },
      { name: 'navItems',    type: 'Array<{ label: string; href: string; icon: React.ReactNode }>', default: '[]', description: 'Navigation items' },
      { name: 'onNavigate',  type: '(href: string) => void',        default: '—',    description: 'Called when a nav item is clicked' },
      { name: 'user',        type: '{ name: string; avatar?: string }', default: '—', description: 'Current user info' },
    ],
    cssVars: ['--color-bg-brand-primary', '--color-text-on-bg-primary', '--color-bg-surface-default', '--shadow-floating-default'],
    example: `<AppNavigate
  brand="webill365"
  activeRoute="/dashboard"
  navItems={[
    { label: 'Dashboard', href: '/dashboard', icon: <HomeIcon /> },
    { label: 'Transactions', href: '/transactions', icon: <ListIcon /> },
  ]}
  onNavigate={(href) => router.push(href)}
  user={{ name: 'Jane Doe', avatar: '/avatar.jpg' }}
/>`,
  },
  DataRow: {
    tier: 'organisms',
    description: 'A structured data display row for detail views and summary tables. Renders a label-value pair with optional status badge and metadata.',
    props: [
      { name: 'type',     type: 'string',          default: '—',   description: 'Row display variant' },
      { name: 'title',    type: 'string',          default: '—',   description: 'Row label' },
      { name: 'value',    type: 'string|number',   default: '—',   description: 'Primary value' },
      { name: 'label',    type: 'string',          default: '—',   description: 'Secondary label or unit' },
      { name: 'status',   type: 'string',          default: '—',   description: 'Status indicator text' },
      { name: 'metadata', type: 'string',          default: '—',   description: 'Additional metadata line' },
    ],
    cssVars: ['--color-text-brand', '--color-border-default', '--color-text-subtle'],
    example: `<DataRow
  title="Transaction ID"
  value="TXN-20240115-001234"
  metadata="Processed 15 Jan 2024, 14:32"
/>

<DataRow
  title="Status"
  value="Completed"
  status="success"
/>`,
  },
  DataTable: {
    tier: 'organisms',
    description: 'A full-featured data table with sortable columns, row selection, and pagination integration.',
    props: [
      { name: 'columns',    type: 'Array<{ key: string; label: string; sortable?: boolean }>', default: '[]',   description: 'Column definitions' },
      { name: 'data',       type: 'Array<Record<string, unknown>>',                            default: '[]',   description: 'Row data array' },
      { name: 'sortable',   type: 'boolean',                                                  default: 'false', description: 'Enable column sorting' },
      { name: 'selectable', type: 'boolean',                                                  default: 'false', description: 'Enable row selection with checkboxes' },
      { name: 'onSort',     type: '(key: string, direction: "asc"|"desc") => void',           default: '—',    description: 'Called when a column header is clicked' },
      { name: 'onSelect',   type: '(selectedIds: string[]) => void',                          default: '—',    description: 'Called when row selection changes' },
    ],
    cssVars: ['--color-bg-brand-primary', '--color-border-default', '--color-bg-surface-subtle', '--color-text-brand'],
    example: `<DataTable
  columns={[
    { key: 'id',     label: 'ID',     sortable: true  },
    { key: 'name',   label: 'Name',   sortable: true  },
    { key: 'amount', label: 'Amount', sortable: true  },
    { key: 'status', label: 'Status', sortable: false },
  ]}
  data={transactions}
  sortable
  selectable
  onSort={(key, dir) => fetchSorted(key, dir)}
  onSelect={(ids) => setSelected(ids)}
/>`,
  },
  Dialog: {
    tier: 'organisms',
    description: 'A modal dialog with four variants: simple (confirmation), list (progress/data summary), form (multi-field input), and export (format selection with preview).',
    props: [
      { name: 'variant',      type: '"simple"|"list"|"form"|"export"', default: '"simple"', description: 'Dialog layout variant' },
      { name: 'open',         type: 'boolean',                        default: 'false',     description: 'Controls dialog visibility' },
      { name: 'title',        type: 'string',                         default: '—',          description: 'Dialog title' },
      { name: 'description',  type: 'string',                         default: '—',          description: 'Body text for simple variant' },
      { name: 'cancelLabel',  type: 'string',                         default: '"Cancel"',  description: 'Cancel button text' },
      { name: 'actionLabel',  type: 'string',                         default: '"Confirm"', description: 'Primary action button text' },
      { name: 'onCancel',     type: '() => void',                     default: '—',          description: 'Cancel button handler' },
      { name: 'onAction',     type: '() => void',                     default: '—',          description: 'Primary action handler' },
      { name: 'onClose',      type: '() => void',                     default: '—',          description: 'Dismiss via Esc/backdrop click' },
      { name: 'fields',       type: 'DialogFormField[]',              default: '—',          description: 'Form fields (form variant)' },
      { name: 'listItems',    type: 'DialogListItem[]',               default: '—',          description: 'Summary items (list variant)' },
      { name: 'exportFormats', type: 'DialogExportFormat[]',          default: 'DEFAULT_EXPORT_FORMATS', description: 'Format options (export variant)' },
    ],
    cssVars: ['--color-bg-brand-primary', '--color-text-on-bg-primary', '--shadow-brand-default', '--color-text-brand', '--color-border-brand', '--shadow-floating-float'],
    example: `// Simple confirmation dialog
<Dialog
  variant="simple"
  open={open}
  title="Delete transaction?"
  description="This action cannot be undone. The transaction record will be permanently removed."
  cancelLabel="Cancel"
  actionLabel="Delete"
  onCancel={() => setOpen(false)}
  onAction={() => { deleteItem(); setOpen(false); }}
  onClose={() => setOpen(false)}
/>

// Form dialog
<Dialog
  variant="form"
  open={formOpen}
  title="Add team member"
  fields={DEFAULT_FORM_FIELDS}
  actionLabel="Add member"
  onAction={() => submitForm()}
  onClose={() => setFormOpen(false)}
/>`,
  },
  EmptyState: {
    tier: 'organisms',
    description: 'A full-panel empty state illustration with title, description, and optional call-to-action button.',
    props: [
      { name: 'title',       type: 'string',             default: '—',   description: 'Primary empty state message' },
      { name: 'description', type: 'string',             default: '—',   description: 'Supporting explanation text' },
      { name: 'icon',        type: 'React.ReactNode',    default: '—',   description: 'Illustration or icon element' },
      { name: 'action',      type: 'string',             default: '—',   description: 'CTA button label' },
      { name: 'onAction',    type: '() => void',         default: '—',   description: 'CTA button click handler' },
    ],
    cssVars: ['--color-bg-brand-primary', '--color-text-brand', '--color-text-subtle'],
    example: `<EmptyState
  title="No transactions yet"
  description="Your transaction history will appear here once you make your first payment."
  action="Make a payment"
  onAction={() => router.push('/pay')}
/>`,
  },
};

function generateComponentDoc(name, data) {
  const tierPath = `src/components/${data.tier}/${name}/${name}.tsx`;
  const lines = [
    `# ${name}`,
    '',
    `**Tier:** ${data.tier.charAt(0).toUpperCase() + data.tier.slice(1)}  `,
    `**Source:** \`${tierPath}\``,
    '',
    data.description,
    '',
    '## Import',
    '',
    `\`\`\`tsx`,
    `import { ${name} } from 'weloop-components/components/${data.tier}';`,
    `\`\`\``,
    '',
    '## Props',
    '',
    '| Prop | Type | Default | Description |',
    '|------|------|---------|-------------|',
  ];

  for (const prop of data.props) {
    const def = prop.default ?? '—';
    lines.push(`| \`${prop.name}\` | \`${prop.type}\` | \`${def}\` | ${prop.description} |`);
  }

  lines.push('');
  lines.push('## Token Usage');
  lines.push('');
  if (data.cssVars.length === 0) {
    lines.push('This component uses hardcoded color values and does not consume CSS variables.');
  } else {
    lines.push('CSS variables consumed by this component:');
    lines.push('');
    for (const v of data.cssVars) {
      lines.push(`- \`${v}\``);
    }
  }
  lines.push('');
  lines.push('## Code Example');
  lines.push('');
  lines.push('```tsx');
  lines.push(data.example);
  lines.push('```');
  lines.push('');

  return lines.join('\n');
}

function generateCustomTheme() {
  return `# Custom Themes

WeLoop provides two APIs for customizing brand colors without replacing the entire token set.

## createCustomTheme

Use when you need precise control over specific token slots.

\`\`\`ts
import { createCustomTheme } from 'weloop-components/tokens';

const tealTheme = createCustomTheme('webill365', 'light', {
  color: {
    bg: {
      brand: {
        primary:     '#0D9488',  // teal-600
        subtle:      '#CCFBF1',  // teal-100
        subtleHover: '#99F6E4',  // teal-200
        subtlePress: '#5EEAD4',  // teal-300
        contrast:    '#F0FDFA',  // teal-50
      },
    },
    text: {
      brand: '#0D9488',
    },
    border: {
      brand:      '#14B8A6',
      emphasized: '#0F766E',
    },
  },
  shadow: {
    brand: {
      default: '0 0 0 1px rgba(13,148,136,1), 0 1px 1px 0 rgba(13,148,136,0.5), 0 2px 3px 0 rgba(13,148,136,0.1)',
      hover:   '0 0 0 1px rgba(20,184,166,1), 0 1px 1px 0 rgba(20,184,166,0.5), 0 2px 3px 0 rgba(20,184,166,0.1)',
      pressed: '0 0 0 1.25px rgba(255,255,255,1), 0 0 1px 1px rgba(13,148,136,0.16), 0 0 0 4px rgba(204,251,241,1)',
      secondary: '0 0 0 1px rgba(245,245,245,1)',
      sm: '0 1px 2px 0 rgba(13,148,136,0.5)',
      md: '0 4px 6px -1px rgba(13,148,136,0.5)',
    },
  },
});
\`\`\`

## createBrandTheme

Use for quick prototyping — derives subtle/hover/press variants automatically from a single hex.

**Note:** For production use, prefer \`createCustomTheme\` with manually-tuned values.

\`\`\`ts
import { createBrandTheme } from 'weloop-components/tokens';

const roseTheme = createBrandTheme(
  'webill365',   // base theme to inherit from
  'light',       // color mode
  '#E11D48',     // brand primary hex (rose-600)
  // optional extra overrides:
  {
    color: {
      border: { emphasized: '#9F1239' },  // rose-900
    },
  }
);
\`\`\`

The function derives these slots automatically via CSS \`color-mix()\`:
- \`bg.brand.subtle\` → brand at 10% over white
- \`bg.brand.subtleHover\` → brand at 18% over white
- \`bg.brand.subtlePress\` → brand at 26% over white

## ThemeProvider Integration

Pass the resolved token set as \`customTokens\`:

\`\`\`tsx
import { ThemeProvider } from 'weloop-components/tokens';
import { tealTheme } from './themes/teal';

export function App() {
  return (
    <ThemeProvider customTokens={tealTheme} applyToCSSVars>
      {/* All components will use teal brand colors */}
    </ThemeProvider>
  );
}
\`\`\`

The \`customTokens\` prop is used as the initial token set. Once the user calls \`setTheme()\` or \`setColorMode()\`, the built-in theme map takes over. This means custom themes act as startup overrides.

## Token Override Reference

| Slot                          | Type     | Effect                                          |
|-------------------------------|----------|-------------------------------------------------|
| \`color.bg.brand.primary\`      | string   | Fill for primary buttons, active states         |
| \`color.bg.brand.subtle\`       | string   | Background for subtle brand tints               |
| \`color.bg.brand.subtleHover\`  | string   | Hover fill for outline buttons                  |
| \`color.bg.brand.subtlePress\`  | string   | Press fill for buttons                          |
| \`color.bg.brand.contrast\`     | string   | Lightest brand tint for backgrounds             |
| \`color.text.brand\`            | string   | Brand-colored text and links                    |
| \`color.border.brand\`          | string   | Brand border (focused inputs, active indicators)|
| \`color.border.emphasized\`     | string   | Strong brand border variant                     |
| \`shadow.brand.default\`        | string   | Button resting shadow                           |
| \`shadow.brand.hover\`          | string   | Button hover shadow                             |
| \`shadow.brand.pressed\`        | string   | Button pressed shadow                           |
| \`shadow.brand.secondary\`      | string   | Secondary/neutral brand shadow                  |
| \`shadow.brand.sm\`             | string   | Small shadow (legacy compat)                    |
| \`shadow.brand.md\`             | string   | Medium shadow (legacy compat)                   |
`;
}

function generateCSSVariables() {
  return `# CSS Variables Reference

All CSS variables set by \`ThemeProvider\` via \`applyThemeToCSSVars()\`. Variables are written to \`:root\` (or a custom root element) and update automatically when the theme or color mode changes.

## Background Variables

| Variable                         | Category     | Description                              | Theme-specific |
|----------------------------------|--------------|------------------------------------------|----------------|
| \`--color-bg-default\`             | bg           | App page background                      | No             |
| \`--color-bg-surface-default\`     | bg.surface   | Default surface (cards, panels)          | No             |
| \`--color-bg-surface-subtle\`      | bg.surface   | Slightly elevated surface                | No             |
| \`--color-bg-surface-ghost\`       | bg.surface   | Transparent overlay surface              | No             |
| \`--color-bg-surface-emphasized\`  | bg.surface   | Highlighted / selected surface           | No             |
| \`--color-bg-surface-inverse\`     | bg.surface   | Inverted surface (dark bar on light)     | No             |
| \`--color-bg-surface-disabled\`    | bg.surface   | Disabled control fill                    | No             |
| \`--color-bg-brand-primary\`       | bg.brand     | Primary brand button fill                | **Yes**        |
| \`--color-bg-brand-subtle\`        | bg.brand     | Light brand tint                         | **Yes**        |
| \`--color-bg-brand-subtle-hover\`  | bg.brand     | Brand hover state fill                   | **Yes**        |
| \`--color-bg-brand-subtle-press\`  | bg.brand     | Brand pressed state fill                 | **Yes**        |
| \`--color-bg-brand-contrast\`      | bg.brand     | Lightest brand background                | **Yes**        |
| \`--color-bg-danger-default\`      | bg.danger    | Danger button/alert fill                 | No             |
| \`--color-bg-danger-subtle\`       | bg.danger    | Light danger tint                        | No             |
| \`--color-bg-danger-subtle-hover\` | bg.danger    | Danger hover fill                        | No             |

## Text Variables

| Variable                      | Category  | Description                           | Theme-specific |
|-------------------------------|-----------|---------------------------------------|----------------|
| \`--color-text-default\`        | text      | Primary text color                    | No             |
| \`--color-text-on-bg-primary\`  | text      | Text on brand-primary backgrounds     | No             |
| \`--color-text-subtle\`         | text      | Muted / secondary text                | No             |
| \`--color-text-brand\`          | text      | Brand-colored text and inline links   | **Yes**        |
| \`--color-text-disabled\`       | text      | Disabled control text                 | No             |
| \`--color-text-inverse\`        | text      | Text on inverse surfaces              | No             |
| \`--color-text-danger\`         | text      | Danger/error text                     | No             |
| \`--color-text-success\`        | text      | Success confirmation text             | No             |
| \`--color-text-warning\`        | text      | Warning text                          | No             |

## Border Variables

| Variable                       | Category | Description                              | Theme-specific |
|--------------------------------|----------|------------------------------------------|----------------|
| \`--color-border-default\`       | border   | Default surface borders                  | No             |
| \`--color-border-brand\`         | border   | Brand border (focus rings, active tabs)  | **Yes**        |
| \`--color-border-subtle\`        | border   | Subtle dividers                          | No             |
| \`--color-border-strong\`        | border   | High-contrast borders                    | No             |
| \`--color-border-danger\`        | border   | Error/danger borders                     | No             |
| \`--color-border-success\`       | border   | Success borders                          | No             |
| \`--color-border-disabled\`      | border   | Disabled control borders                 | No             |
| \`--color-border-emphasized\`    | border   | Strong brand/focus borders               | **Yes**        |

## Shadow Variables

| Variable                       | Category        | Description                          | Theme-specific |
|--------------------------------|-----------------|--------------------------------------|----------------|
| \`--shadow-brand-default\`       | shadow.brand    | Brand button resting shadow          | **Yes**        |
| \`--shadow-brand-hover\`         | shadow.brand    | Brand button hover shadow            | **Yes**        |
| \`--shadow-brand-pressed\`       | shadow.brand    | Brand button pressed state           | **Yes**        |
| \`--shadow-brand-secondary\`     | shadow.brand    | Secondary brand shadow               | No             |
| \`--shadow-brand-sm\`            | shadow.brand    | Small brand shadow (compat)          | **Yes**        |
| \`--shadow-brand-md\`            | shadow.brand    | Medium brand shadow (compat)         | **Yes**        |
| \`--shadow-default-default\`     | shadow.default  | Neutral button resting shadow        | No             |
| \`--shadow-default-hover\`       | shadow.default  | Neutral button hover shadow          | No             |
| \`--shadow-default-pressed\`     | shadow.default  | Neutral button pressed state         | No             |
| \`--shadow-danger-default\`      | shadow.danger   | Danger button resting shadow         | No             |
| \`--shadow-danger-hover\`        | shadow.danger   | Danger button hover shadow           | No             |
| \`--shadow-danger-pressed\`      | shadow.danger   | Danger button pressed state          | No             |
| \`--shadow-toggle-default\`      | shadow.toggle   | Toggle unchecked shadow              | No             |
| \`--shadow-toggle-hover\`        | shadow.toggle   | Toggle hover state                   | **Yes**        |
| \`--shadow-toggle-pressed\`      | shadow.toggle   | Toggle pressed state                 | **Yes**        |
| \`--shadow-toggle-checked\`      | shadow.toggle   | Toggle checked/on state              | **Yes**        |
| \`--shadow-input-default\`       | shadow.input    | Input default border shadow          | No             |
| \`--shadow-input-brand\`         | shadow.input    | Input focused border shadow          | **Yes**        |
| \`--shadow-input-warning\`       | shadow.input    | Input error state shadow             | No             |
| \`--shadow-input-success\`       | shadow.input    | Input success state shadow           | No             |
| \`--shadow-disabled\`            | shadow          | Disabled control border              | No             |
| \`--shadow-floating-default\`    | shadow.floating | Dropdown / popover elevation         | No             |
| \`--shadow-floating-gen-card\`   | shadow.floating | Card border with micro elevation     | No             |
| \`--shadow-floating-float\`      | shadow.floating | High-elevation floating panel        | No             |

## HTML Attributes

\`ThemeProvider\` also sets two HTML attributes on the root element for use in CSS selectors:

| Attribute          | Values                               | Example CSS                          |
|--------------------|--------------------------------------|--------------------------------------|
| \`data-theme\`       | \`"wabooks"\` \| \`"webill365"\` \| \`"wecafe"\` | \`[data-theme="wecafe"] .logo { ... }\` |
| \`data-color-mode\`  | \`"light"\` \| \`"dark"\`                | \`[data-color-mode="dark"] { ... }\`  |

## Applying to a Custom Root

By default, CSS variables are applied to \`document.documentElement\`. You can target a different element:

\`\`\`ts
import { applyThemeToCSSVars, getTheme } from 'weloop-components/tokens';

const myRoot = document.getElementById('my-app');
const tokens = getTheme('wecafe', 'light');
applyThemeToCSSVars(tokens, myRoot);
\`\`\`
`;
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\nWeLoop Docs Generator');
  console.log('='.repeat(50));

  // Parse source tokens
  console.log('\nParsing token sources...');
  const primitives  = parsePrimitives();
  const spacing     = parseSpacing();
  const typography  = parseTypography();

  console.log(`  parsed ${Object.keys(primitives).length} color families`);
  console.log(`  parsed spacing: ${Object.keys(spacing.spacingScale).length} groups`);
  console.log(`  parsed typography: ${Object.keys(typography.fontSize).length} size categories`);

  // Discover components
  const atoms     = listDirs(ATOMS_DIR);
  const molecules = listDirs(MOLECULES_DIR);
  const organisms = listDirs(ORGANISMS_DIR);

  console.log(`\nDiscovered components:`);
  console.log(`  atoms:     ${atoms.length}  (${atoms.join(', ')})`);
  console.log(`  molecules: ${molecules.length}  (${molecules.join(', ')})`);
  console.log(`  organisms: ${organisms.length}  (${organisms.join(', ')})`);

  // Generate docs
  console.log('\nGenerating docs...');

  writeDoc('00-overview.md',                   generateOverview());
  writeDoc('01-foundation/colors.md',          generateColors(primitives));
  writeDoc('01-foundation/typography.md',      generateTypography(typography));
  writeDoc('01-foundation/spacing.md',         generateSpacing(spacing));
  writeDoc('02-tokens/color-tokens.md',        generateColorTokens());
  writeDoc('02-tokens/shadow-tokens.md',       generateShadowTokens());
  writeDoc('02-tokens/theme-guide.md',         generateThemeGuide());
  writeDoc('04-theming/custom-theme.md',       generateCustomTheme());
  writeDoc('04-theming/css-variables.md',      generateCSSVariables());

  // Component docs
  for (const [name, data] of Object.entries(COMPONENT_DATA)) {
    const subDir = `03-components/${data.tier}`;
    writeDoc(`${subDir}/${name.toLowerCase()}.md`, generateComponentDoc(name, data));
  }

  // Summary
  const totalDocs = 9 + Object.keys(COMPONENT_DATA).length;
  console.log(`\nDone. Generated ${totalDocs} documentation files.`);
  console.log(`Output: ${DOCS}/`);
  console.log('');
}

main().catch(err => {
  console.error('Generator failed:', err);
  process.exit(1);
});
