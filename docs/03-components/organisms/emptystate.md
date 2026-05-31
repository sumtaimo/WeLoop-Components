# EmptyState

**Tier:** Organisms  
**Source:** `src/components/organisms/EmptyState/EmptyState.tsx`

A full-panel empty state illustration with title, description, and optional call-to-action button.

## Import

```tsx
import { EmptyState } from 'weloop-components/components/organisms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `—` | Primary empty state message |
| `description` | `string` | `—` | Supporting explanation text |
| `icon` | `React.ReactNode` | `—` | Illustration or icon element |
| `action` | `string` | `—` | CTA button label |
| `onAction` | `() => void` | `—` | CTA button click handler |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-text-brand`
- `--color-text-subtle`

## Code Example

```tsx
<EmptyState
  title="No transactions yet"
  description="Your transaction history will appear here once you make your first payment."
  action="Make a payment"
  onAction={() => router.push('/pay')}
/>
```
