# WeLoop Design System — Overview

> Version 2.1 · React 18+ · TypeScript · Multi-brand token system

WeLoop is a production-ready design system supporting three brand identities (**wabooks**, **webill365**, **wecafe**) with full light/dark mode coverage. All visual decisions — colors, spacing, typography, shadows — are encoded as design tokens that flow from primitives through semantic layers to component-level CSS variables.

## Token Architecture

```
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
```

## Brand Themes

| Brand      | Primary Color | Primitive Family |
|------------|---------------|-----------------|
| wabooks    | `#0060B9`     | purple-600      |
| webill365  | `#1D32FF`     | blue-600        |
| wecafe     | `#E7450F`     | orange-600      |

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

```bash
npm install weloop-components
```

## Basic Usage

```tsx
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
```
