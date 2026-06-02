# Skeleton

**Tier:** Atoms  
**Source:** `src/components/atoms/Skeleton/Skeleton.tsx`

A shimmer-animated placeholder that communicates loading state before real content is available. Three shape variants cover the most common loading patterns: inline text, circular avatars, and rectangular blocks.

## Import

```tsx
import { Skeleton } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"text"|"circle"|"rect"` | `"rect"` | Shape preset — affects default height, width, and border-radius |
| `width` | `string\|number` | `"100%"` (text/rect), equals height (circle) | Explicit width; accepts CSS strings (`"120px"`) or numeric pixels |
| `height` | `string\|number` | `14` (text), `40` (circle), `20` (rect) | Explicit height; accepts CSS strings or numeric pixels |
| `borderRadius` | `string` | Variant default (see below) | Override the corner radius |
| `className` | `string` | `—` | Extra class names passed to the root `<span>` |
| `style` | `React.CSSProperties` | `—` | Inline style overrides applied after all computed styles |

### Variant defaults

| Variant | Default height | Default width | Default border-radius |
|---------|---------------|---------------|----------------------|
| `text` | 14px | 100% | `--radius-sm` (4px) |
| `circle` | 40px | equals height | `--radius-full` (9999px) |
| `rect` | 20px | 100% | `--radius-md` (8px) |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-surface-emphasized` — shimmer base color
- `--color-bg-surface-subtle` — shimmer highlight color
- `--motion-duration-slower` — shimmer animation duration (default 500ms)
- `--radius-sm` — text variant border-radius fallback
- `--radius-md` — rect variant border-radius fallback
- `--radius-full` — circle variant border-radius fallback

## Code Example

```tsx
{/* Paragraph text placeholder */}
<Skeleton variant="text" width="80%" />

{/* Avatar placeholder */}
<Skeleton variant="circle" height={48} />

{/* Card image placeholder */}
<Skeleton variant="rect" height={160} />

{/* Custom size */}
<Skeleton variant="rect" width={200} height={12} borderRadius="var(--radius-lg)" />
```
