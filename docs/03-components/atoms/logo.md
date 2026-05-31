# Logo

**Tier:** Atoms  
**Source:** `src/components/atoms/Logo/Logo.tsx`

Renders the WeLoop product logo by brand name. Adapts to the active theme.

## Import

```tsx
import { Logo } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `brand` | `"wabooks"|"webill365"|"wecafe"` | `—` | Which brand logo to render |
| `size` | `"sm"|"md"|"lg"` | `"md"` | Logo size |
| `mono` | `boolean` | `false` | Monochrome/single-color variant |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`

## Code Example

```tsx
<Logo brand="webill365" size="md" />
```
