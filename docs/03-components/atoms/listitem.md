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
| `type` | `"notifi-link"|"notifi-default"|"notifi-list"|"bill-list"|"bank-list"|"minimal"` | `"notifi-default"` | Item layout variant |
| `title` | `string` | `—` | Primary text (required) |
| `description` | `string` | `—` | Secondary/sub text |
| `count` | `number|string` | `—` | Count value shown on the right (most types) |
| `label` | `string` | `—` | Uppercase meta label below description (`notifi-list`, `bill-list`) |
| `currency` | `string` | `"USD"` | Currency badge text shown on the right (`bank-list`) |
| `icon` | `React.ReactNode` | `—` | Custom 24×24 icon replacing the default lead icon |
| `linkText` | `string` | `"Learn more"` | Link text shown below description (`notifi-link`) |
| `onLinkClick` | `() => void` | `—` | Called when the link button is clicked |
| `showDivider` | `boolean` | `false` | Show a 1px bottom border divider |
| `style` | `React.CSSProperties` | `—` | Custom container styles |
| `onClick` | `() => void` | `—` | Row click handler |

### Type variants

| Value | Lead icon | Right element | Extras |
|-------|-----------|---------------|--------|
| `notifi-link` | Circle icon (36px) | Count | "Learn more" link below description |
| `notifi-default` | Circle icon (36px) | Count | — |
| `notifi-list` | Circle icon (36px) | Red dot indicator | Uppercase label below description |
| `bill-list` | Small inline icon (16px) | Count | Uppercase label below description |
| `bank-list` | Small inline icon (16px) | Currency badge | — |
| `minimal` | None | Count + chevron | — |

## Token Usage

CSS variables consumed by this component:

- `--color-text-brand`

## Code Example

```tsx
<ListItem
  type="notifi-default"
  title="New payment received"
  description="IDR 1,500,000 from John Doe"
  count={3}
  showDivider={false}
/>

<ListItem
  type="bank-list"
  title="Main Account"
  description="Savings account"
  currency="USD"
/>

<ListItem
  type="notifi-link"
  title="Invoice overdue"
  description="Invoice #1042 is 3 days overdue"
  onLinkClick={() => router.push('/invoices/1042')}
/>
```
