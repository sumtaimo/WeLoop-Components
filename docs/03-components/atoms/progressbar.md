# ProgressBar

**Tier:** Atoms  
**Source:** `src/components/atoms/ProgressBar/ProgressBar.tsx`

A horizontal progress bar built on Radix Progress. Supports four color variants and three size options.

## Import

```tsx
import { ProgressBar } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Progress value 0–100 |
| `size` | `"sm"|"md"|"lg"` | `"md"` | Bar height — sm=4px, md=6px, lg=8px |
| `variant` | `"default"|"brand"|"success"|"danger"` | `"default"` | Color scheme |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-bg-danger-default`

## Code Example

```tsx
<ProgressBar value={65} size="md" variant="brand" />
<ProgressBar value={100} variant="success" />
<ProgressBar value={30} variant="danger" />
```
