# Banner

**Tier:** Molecules  
**Source:** `src/components/molecules/Banner/Banner.tsx`

An attention-grabbing horizontal notification bar. Supports single-line and multi-line layouts across eight visual types.

## Import

```tsx
import { Banner } from 'weloop-components/components/molecules';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"information"|"success"|"warning"|"critical"|"actionable"|"multiActionable"|"multiCritical"|"multiWarning"` | `—` | Visual style and layout variant |
| `message` | `string` | `—` | Primary message (single-line types) |
| `title` | `string` | `—` | Title text (multi-line types) |
| `description` | `string` | `—` | Description text (multi-line types) |
| `actionLabel` | `string` | `—` | Label for the optional action button |
| `onAction` | `() => void` | `—` | Action button click handler |
| `onClose` | `() => void` | `—` | Close button handler — omit to hide close button |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-subtle`
- `--color-text-brand`
- `--color-border-brand`
- `--color-bg-brand-primary`

## Code Example

```tsx
// Single-line
<Banner
  type="information"
  message="Your data was last synced 5 minutes ago."
  onClose={() => dismiss()}
/>

// Multi-line with action
<Banner
  type="multiCritical"
  title="Payment failed"
  description="We could not charge your card. Please update your payment method."
  actionLabel="Update card"
  onAction={() => openBilling()}
  onClose={() => dismiss()}
/>
```
