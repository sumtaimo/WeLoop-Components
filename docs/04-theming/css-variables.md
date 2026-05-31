# CSS Variables Reference

All CSS variables set by `ThemeProvider` via `applyThemeToCSSVars()`. Variables are written to `:root` (or a custom root element) and update automatically when the theme or color mode changes.

## Background Variables

| Variable                         | Category     | Description                              | Theme-specific |
|----------------------------------|--------------|------------------------------------------|----------------|
| `--color-bg-default`             | bg           | App page background                      | No             |
| `--color-bg-surface-default`     | bg.surface   | Default surface (cards, panels)          | No             |
| `--color-bg-surface-subtle`      | bg.surface   | Slightly elevated surface                | No             |
| `--color-bg-surface-ghost`       | bg.surface   | Transparent overlay surface              | No             |
| `--color-bg-surface-emphasized`  | bg.surface   | Highlighted / selected surface           | No             |
| `--color-bg-surface-inverse`     | bg.surface   | Inverted surface (dark bar on light)     | No             |
| `--color-bg-surface-disabled`    | bg.surface   | Disabled control fill                    | No             |
| `--color-bg-brand-primary`       | bg.brand     | Primary brand button fill                | **Yes**        |
| `--color-bg-brand-subtle`        | bg.brand     | Light brand tint                         | **Yes**        |
| `--color-bg-brand-subtle-hover`  | bg.brand     | Brand hover state fill                   | **Yes**        |
| `--color-bg-brand-subtle-press`  | bg.brand     | Brand pressed state fill                 | **Yes**        |
| `--color-bg-brand-contrast`      | bg.brand     | Lightest brand background                | **Yes**        |
| `--color-bg-danger-default`      | bg.danger    | Danger button/alert fill                 | No             |
| `--color-bg-danger-subtle`       | bg.danger    | Light danger tint                        | No             |
| `--color-bg-danger-subtle-hover` | bg.danger    | Danger hover fill                        | No             |

## Text Variables

| Variable                      | Category  | Description                           | Theme-specific |
|-------------------------------|-----------|---------------------------------------|----------------|
| `--color-text-default`        | text      | Primary text color                    | No             |
| `--color-text-on-bg-primary`  | text      | Text on brand-primary backgrounds     | No             |
| `--color-text-subtle`         | text      | Muted / secondary text                | No             |
| `--color-text-brand`          | text      | Brand-colored text and inline links   | **Yes**        |
| `--color-text-disabled`       | text      | Disabled control text                 | No             |
| `--color-text-inverse`        | text      | Text on inverse surfaces              | No             |
| `--color-text-danger`         | text      | Danger/error text                     | No             |
| `--color-text-success`        | text      | Success confirmation text             | No             |
| `--color-text-warning`        | text      | Warning text                          | No             |

## Border Variables

| Variable                       | Category | Description                              | Theme-specific |
|--------------------------------|----------|------------------------------------------|----------------|
| `--color-border-default`       | border   | Default surface borders                  | No             |
| `--color-border-brand`         | border   | Brand border (focus rings, active tabs)  | **Yes**        |
| `--color-border-subtle`        | border   | Subtle dividers                          | No             |
| `--color-border-strong`        | border   | High-contrast borders                    | No             |
| `--color-border-danger`        | border   | Error/danger borders                     | No             |
| `--color-border-success`       | border   | Success borders                          | No             |
| `--color-border-disabled`      | border   | Disabled control borders                 | No             |
| `--color-border-emphasized`    | border   | Strong brand/focus borders               | **Yes**        |

## Shadow Variables

| Variable                       | Category        | Description                          | Theme-specific |
|--------------------------------|-----------------|--------------------------------------|----------------|
| `--shadow-brand-default`       | shadow.brand    | Brand button resting shadow          | **Yes**        |
| `--shadow-brand-hover`         | shadow.brand    | Brand button hover shadow            | **Yes**        |
| `--shadow-brand-pressed`       | shadow.brand    | Brand button pressed state           | **Yes**        |
| `--shadow-brand-secondary`     | shadow.brand    | Secondary brand shadow               | No             |
| `--shadow-brand-sm`            | shadow.brand    | Small brand shadow (compat)          | **Yes**        |
| `--shadow-brand-md`            | shadow.brand    | Medium brand shadow (compat)         | **Yes**        |
| `--shadow-default-default`     | shadow.default  | Neutral button resting shadow        | No             |
| `--shadow-default-hover`       | shadow.default  | Neutral button hover shadow          | No             |
| `--shadow-default-pressed`     | shadow.default  | Neutral button pressed state         | No             |
| `--shadow-danger-default`      | shadow.danger   | Danger button resting shadow         | No             |
| `--shadow-danger-hover`        | shadow.danger   | Danger button hover shadow           | No             |
| `--shadow-danger-pressed`      | shadow.danger   | Danger button pressed state          | No             |
| `--shadow-toggle-default`      | shadow.toggle   | Toggle unchecked shadow              | No             |
| `--shadow-toggle-hover`        | shadow.toggle   | Toggle hover state                   | **Yes**        |
| `--shadow-toggle-pressed`      | shadow.toggle   | Toggle pressed state                 | **Yes**        |
| `--shadow-toggle-checked`      | shadow.toggle   | Toggle checked/on state              | **Yes**        |
| `--shadow-input-default`       | shadow.input    | Input default border shadow          | No             |
| `--shadow-input-brand`         | shadow.input    | Input focused border shadow          | **Yes**        |
| `--shadow-input-warning`       | shadow.input    | Input error state shadow             | No             |
| `--shadow-input-success`       | shadow.input    | Input success state shadow           | No             |
| `--shadow-disabled`            | shadow          | Disabled control border              | No             |
| `--shadow-floating-default`    | shadow.floating | Dropdown / popover elevation         | No             |
| `--shadow-floating-gen-card`   | shadow.floating | Card border with micro elevation     | No             |
| `--shadow-floating-float`      | shadow.floating | High-elevation floating panel        | No             |

## HTML Attributes

`ThemeProvider` also sets two HTML attributes on the root element for use in CSS selectors:

| Attribute          | Values                               | Example CSS                          |
|--------------------|--------------------------------------|--------------------------------------|
| `data-theme`       | `"wabooks"` | `"webill365"` | `"wecafe"` | `[data-theme="wecafe"] .logo { ... }` |
| `data-color-mode`  | `"light"` | `"dark"`                | `[data-color-mode="dark"] { ... }`  |

## Applying to a Custom Root

By default, CSS variables are applied to `document.documentElement`. You can target a different element:

```ts
import { applyThemeToCSSVars, getTheme } from 'weloop-components/tokens';

const myRoot = document.getElementById('my-app');
const tokens = getTheme('wecafe', 'light');
applyThemeToCSSVars(tokens, myRoot);
```
