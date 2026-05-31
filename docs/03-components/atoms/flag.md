# Flag

**Tier:** Atoms  
**Source:** `src/components/atoms/Flag/Flag.tsx`

Renders a country flag icon by ISO 3166-1 alpha-2 country code.

## Import

```tsx
import { Flag } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | `—` | ISO 3166-1 alpha-2 country code (e.g. "US", "ID") |
| `size` | `number` | `24` | Width/height in pixels |
| `style` | `React.CSSProperties` | `—` | Custom styles |

## Token Usage

This component uses hardcoded color values and does not consume CSS variables.

## Code Example

```tsx
<Flag code="ID" size={24} />
<Flag code="US" size={32} />
```
