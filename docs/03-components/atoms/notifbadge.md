# NotifBadge

**Tier:** Atoms  
**Source:** `src/components/atoms/NotifBadge/NotifBadge.tsx`

A notification badge with three visual sizes. The `large` size renders a red pill with a text label; `small` and `size3` render small dot indicators.

## Import

```tsx
import { NotifBadge } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"large"|"small"|"size3"` | `"large"` | Badge size/style variant |
| `label` | `string` | `"1"` | Text displayed inside the `large` pill (ignored for dot variants) |
| `className` | `string` | `""` | Additional CSS class |

### Size variants

| Value | Appearance | Dimensions |
|-------|------------|------------|
| `large` | Red pill with label text | min-width 14px, padding 2px 4px |
| `small` | Solid red dot | 6×6 px |
| `size3` | Blue dot with border, centered in a 16px container | 6×6 px dot in 16×16 px frame |

## Token Usage

This component uses hardcoded color values and does not consume CSS variables.

## Code Example

```tsx
{/* Pill badge showing a count */}
<NotifBadge size="large" label="5" />
<NotifBadge size="large" label="99+" />

{/* Small red dot indicator */}
<NotifBadge size="small" />

{/* Blue dot indicator (size3) */}
<NotifBadge size="size3" />
```
