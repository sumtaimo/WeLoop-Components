# NotifBadge

**Tier:** Atoms  
**Source:** `src/components/atoms/NotifBadge/NotifBadge.tsx`

A notification count badge. Shows a number with optional maximum clamp (e.g. "99+").

## Import

```tsx
import { NotifBadge } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | `0` | Notification count to display |
| `max` | `number` | `99` | Maximum before showing "max+" |
| `variant` | `"default"|"brand"|"danger"` | `"default"` | Color variant |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-text-on-bg-primary`
- `--color-bg-danger-default`

## Code Example

```tsx
<NotifBadge count={5} variant="brand" />
<NotifBadge count={120} max={99} variant="danger" />
```
