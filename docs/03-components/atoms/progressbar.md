# ProgressBar

**Tier:** Atoms  
**Source:** `src/components/atoms/ProgressBar/ProgressBar.tsx`

A horizontal progress bar built on Radix Progress. Supports loading, fail, and complete color variants with optional label and auto-generated progress text.

## Import

```tsx
import { ProgressBar } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Progress value 0–100 (clamped automatically) |
| `max` | `number` | `—` | Denominator for auto-generated progress text (e.g. `200` produces "128MB of 200MB") |
| `size` | `"sm"|"md"` | `"md"` | Bar height — sm=2px, md=8px |
| `variant` | `"loading"|"fail"|"complete"` | `"loading"` | Color scheme |
| `label` | `string` | `—` | Field label rendered above the bar |
| `required` | `boolean` | `false` | Show a red asterisk after the label |
| `progressText` | `string` | `—` | Override the progress text below the bar; auto-generated when `max` is set |
| `unit` | `string` | `"MB"` | Unit string appended to the auto-generated progress text |
| `style` | `React.CSSProperties` | `—` | Custom container styles |

### Variant colors

| Value | Fill color |
|-------|------------|
| `"loading"` | Brand blue (`--color-bg-brand-primary`, fallback `#1D32FF`) |
| `"fail"` | Red `#EF4444` |
| `"complete"` | Green `#16A34A` |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`

## Code Example

```tsx
{/* Basic loading bar */}
<ProgressBar value={65} />

{/* With label and auto progress text */}
<ProgressBar
  value={64}
  max={200}
  unit="MB"
  label="Upload progress"
  required
/>

{/* Complete state */}
<ProgressBar value={100} variant="complete" label="Done" />

{/* Fail state */}
<ProgressBar value={45} variant="fail" progressText="Upload failed" />
```
