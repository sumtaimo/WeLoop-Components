# Tabs

**Tier:** Atoms  
**Source:** `src/components/atoms/Tabs/Tabs.tsx`

A tab navigation strip built on Radix Tabs. Supports default underline style and pill variant.

## Import

```tsx
import { Tabs } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Array<{ value: string; label: string }>` | `[]` | Tab items to render |
| `value` | `string` | `—` | Active tab value (controlled) |
| `onValueChange` | `(value: string) => void` | `—` | Called when tab changes |
| `variant` | `"default"|"pill"` | `"default"` | Visual style — default=underline, pill=rounded |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-text-brand`
- `--color-border-brand`

## Code Example

```tsx
<Tabs
  items={[
    { value: 'overview', label: 'Overview' },
    { value: 'details',  label: 'Details'  },
    { value: 'history',  label: 'History'  },
  ]}
  value={activeTab}
  onValueChange={setActiveTab}
  variant="default"
/>
```
