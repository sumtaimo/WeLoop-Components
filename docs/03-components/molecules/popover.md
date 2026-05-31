# Popover

**Tier:** Molecules  
**Source:** `src/components/molecules/Popover/Popover.tsx`

A floating content panel that appears relative to a trigger element. Built on Radix Popover with controlled open state.

## Import

```tsx
import { Popover } from 'weloop-components/components/molecules';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `React.ReactNode` | `—` | Element that triggers the popover |
| `content` | `React.ReactNode` | `—` | Popover panel content |
| `side` | `"top"|"right"|"bottom"|"left"` | `"bottom"` | Preferred side |
| `align` | `"start"|"center"|"end"` | `"start"` | Alignment relative to trigger |
| `open` | `boolean` | `—` | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | `—` | Called when open state changes |

## Token Usage

CSS variables consumed by this component:

- `--shadow-floating-default`
- `--color-bg-surface-default`
- `--color-border-default`

## Code Example

```tsx
<Popover
  trigger={<button>Open menu</button>}
  side="bottom"
  align="start"
>
  <div style={{ padding: 16 }}>
    <p>Popover content here</p>
  </div>
</Popover>
```
