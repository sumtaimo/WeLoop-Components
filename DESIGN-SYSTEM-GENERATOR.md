# Design System Documentation Generator

This repository includes a documentation generator that reads source files and produces structured Markdown documentation for the WeLoop Design System.

## What Is This?

The generator is a Node.js ESM script (`scripts/generate-docs.mjs`) that parses the token files and component source in `src/` and writes comprehensive Markdown documentation to `docs/`. It requires no build step, no extra dependencies, and runs in under one second.

## Quick Start

```bash
# Using npm
npm run docs:generate

# Using node directly
node scripts/generate-docs.mjs
```

Output is written to the `docs/` directory, which is committed alongside the source code.

## What Gets Generated

44 files across 5 sections:

```
docs/
├── 00-overview.md                          # System overview and quick links
│
├── 01-foundation/
│   ├── colors.md                           # Full primitive color palette with swatches
│   ├── typography.md                       # Font families, size/line-height scales
│   └── spacing.md                          # Spacing, radius, stroke, control size tables
│
├── 02-tokens/
│   ├── color-tokens.md                     # Semantic color token reference (CSS vars)
│   ├── shadow-tokens.md                    # Shadow token reference (all 22 vars)
│   └── theme-guide.md                      # Side-by-side brand theme comparison
│
├── 03-components/
│   ├── atoms/                              # 24 atom component docs
│   │   ├── avatar.md
│   │   ├── banklogo.md
│   │   ├── buttondropdown.md
│   │   ├── buttonsegment.md
│   │   ├── buttonsingle.md
│   │   ├── checkbox.md
│   │   ├── chip.md
│   │   ├── flag.md
│   │   ├── formfield.md
│   │   ├── icon.md
│   │   ├── inlinetip.md
│   │   ├── link.md
│   │   ├── listitem.md
│   │   ├── logo.md
│   │   ├── lucideicons.md
│   │   ├── notifbadge.md
│   │   ├── paymentbadge.md
│   │   ├── progressbar.md
│   │   ├── radio.md
│   │   ├── snackbar.md
│   │   ├── tabs.md
│   │   ├── toast.md
│   │   ├── toggle.md
│   │   └── tooltip.md
│   │
│   ├── molecules/                          # 6 molecule component docs
│   │   ├── banner.md
│   │   ├── dashboardcard.md
│   │   ├── datepicker.md
│   │   ├── fileupload.md
│   │   ├── pagination.md
│   │   └── popover.md
│   │
│   └── organisms/                          # 5 organism component docs
│       ├── appnavigate.md
│       ├── datarow.md
│       ├── datatable.md
│       ├── dialog.md
│       └── emptystate.md
│
└── 04-theming/
    ├── custom-theme.md                     # createCustomTheme and createBrandTheme guide
    └── css-variables.md                    # Complete CSS variable reference table
```

**Total: 44 Markdown files**

## How the Generator Works

```
src/tokens/*.ts      ──parse──▶ token data objects
src/components/**/*.tsx  ──parse──▶ component metadata

token data + component metadata ──generate──▶ Markdown strings

Markdown strings ──write──▶ docs/**/*.md
```

The script is split into three logical sections:

1. **Parsers** — Read source files as plain text and extract data with regex:
   - `parsePrimitives()` — extracts color families and hex values from `primitives.ts`
   - `parseSpacing()` — extracts spacing/radius/stroke/controlSize from `spacing.ts`
   - `parseTypography()` — extracts font scales from `typography.ts`
   - `parseComponent()` — extracts export types, interface props, and CSS variable references from any `.tsx` file

2. **Generators** — Pure functions that receive data objects and return Markdown strings. One function per output file.

3. **Main** — Orchestrates parsing, then calls each generator and writes the results using `writeDoc()`.

## Output Details

### Foundation Docs

- `colors.md` — one table per color family with Step, Hex, and a GitHub-renderable swatch badge (`![#hex](https://placehold.co/16x16/HEX/HEX.png)`)
- `typography.md` — separate tables for font size, line height, font weight, and letter spacing, plus a type ramp reference
- `spacing.md` — tables for spacing scale (grouped by micro/inset/stack/section/page), radius, stroke, and control size

### Token Docs

- `color-tokens.md` — all CSS variables organized by category (bg, text, border) with descriptions and light-mode example values
- `shadow-tokens.md` — all shadow CSS variables organized by brand/default/danger/toggle/input/floating categories
- `theme-guide.md` — side-by-side comparison of all three brands in light mode, plus runtime switching code example

### Component Docs

Each component doc follows a consistent structure:

```markdown
# ComponentName

**Tier:** atoms/molecules/organisms
**Source:** `src/components/.../ComponentName.tsx`

[Description]

## Import
[import statement]

## Props
| Prop | Type | Default | Description |
...

## Token Usage
[list of CSS variables consumed]

## Code Example
[working TSX example]
```

### Theming Docs

- `custom-theme.md` — full guide for both `createCustomTheme` (precise) and `createBrandTheme` (quick) with code examples and a token override reference table
- `css-variables.md` — complete table of all 37 CSS variables with category, description, and whether the value changes per brand theme

## How to Extend

### Adding a New Component

1. Create the component under `src/components/{tier}/{Name}/{Name}.tsx`
2. Add an entry to the `COMPONENT_DATA` object in `scripts/generate-docs.mjs`:

```js
MyComponent: {
  tier: 'atoms',         // or 'molecules' / 'organisms'
  description: 'One or two sentence description.',
  props: [
    { name: 'myProp', type: 'string', default: '—', description: 'What this prop does' },
  ],
  cssVars: ['--color-bg-brand-primary'],
  example: `<MyComponent myProp="hello" />`,
},
```

3. Run `npm run docs:generate`

### Adding a New Token Category

1. Create the token file under `src/tokens/`
2. Write a new parser function (following the `parsePrimitives` / `parseSpacing` pattern)
3. Write a new generator function that returns a Markdown string
4. Call both from `main()` and pass the result to `writeDoc()`

### Adding a New Doc Section

1. Create the target subdirectory under `docs/` (or let `writeDoc` create it)
2. Write a generator function
3. Call `writeDoc('my-section/my-file.md', generateMySection(data))` from `main()`

## Data Sources

| Generator input            | Source file(s)                                   |
|----------------------------|--------------------------------------------------|
| Color primitive palette    | `src/tokens/primitives.ts`                       |
| Spacing / radius / stroke  | `src/tokens/spacing.ts`                          |
| Typography scale           | `src/tokens/typography.ts`                       |
| Token interface shape      | `src/tokens/types.ts`                            |
| Theme values               | `src/tokens/themes/wabooks-light.ts` + 5 others  |
| CSS variable list          | `src/tokens/context.tsx` (`applyThemeToCSSVars`) |
| Component prop interfaces  | `src/components/**/*.tsx`                        |
| Custom theme API           | `src/tokens/createCustomTheme.ts`                |

## Requirements

- **Node.js 18+** (uses ES modules, `fs`, `path`, `url` — no external dependencies)
- Run from the repository root

```bash
node scripts/generate-docs.mjs
# or
npm run docs:generate
```
