# Tooltip

**Tier:** Atoms  
**Source:** `src/components/atoms/Tooltip/Tooltip.tsx`

A floating tooltip built on Radix Tooltip. Wraps any trigger element and shows the content on hover/focus.

## Import

```tsx
import { Tooltip } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `React.ReactNode` | `—` | Tooltip body content |
| `side` | `"top"|"right"|"bottom"|"left"` | `"top"` | Preferred tooltip side |
| `align` | `"start"|"center"|"end"` | `"center"` | Alignment relative to trigger |
| `children` | `React.ReactNode` | `—` | Trigger element |

## Token Usage

CSS variables consumed by this component:

- `--shadow-floating-float`

## Code Example

```tsx
<Tooltip content="Copy to clipboard" side="top">
  <button>
    <IconCopy16 />
  </button>
</Tooltip>
```
