# ListItem

**Tier:** Atoms  
**Source:** `src/components/atoms/ListItem/ListItem.tsx`

A flexible list row supporting notification, bill, bank, and minimal display patterns.

## Import

```tsx
import { ListItem } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"notifi-link"|"notifi-default"|"notifi-list"|"bill-list"|"bank-list"|"minimal"` | `"minimal"` | Item layout variant |
| `title` | `string` | `—` | Primary text |
| `description` | `string` | `—` | Secondary/sub text |
| `count` | `number|string` | `—` | Count badge value |
| `linkText` | `string` | `—` | Link action text |
| `onLinkClick` | `() => void` | `—` | Link click handler |
| `label` | `string` | `—` | Right-side label text |
| `showDivider` | `boolean` | `true` | Bottom border divider |
| `onClick` | `() => void` | `—` | Row click handler |

## Token Usage

CSS variables consumed by this component:

- `--color-text-brand`
- `--color-border-default`

## Code Example

```tsx
<ListItem
  type="notifi-default"
  title="New payment received"
  description="IDR 1,500,000 from John Doe"
  count={3}
  showDivider
/>
```
