# BankLogo

**Tier:** Atoms  
**Source:** `src/components/atoms/BankLogo/BankLogo.tsx`

Renders a bank institution logo by code. Displays a placeholder when the bank code is unrecognized.

## Import

```tsx
import { BankLogo } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | `—` | Bank institution code (e.g. "BCA", "MANDIRI") |
| `size` | `number` | `32` | Width/height in pixels |
| `style` | `React.CSSProperties` | `—` | Override container styles |

## Token Usage

This component uses hardcoded color values and does not consume CSS variables.

## Code Example

```tsx
<BankLogo code="BCA" size={40} />
```
