# Tabs

**Tier:** Atoms  
**Source:** `src/components/atoms/Tabs/Tabs.tsx`

A tab navigation strip built on Radix Tabs. Supports a `box` variant (pill-style container) and a `line` variant (underline indicator).

## Import

```tsx
import { Tabs } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TabItem[]` | `—` | Tab definitions (required) |
| `value` | `string` | `—` | Active tab id (controlled) |
| `onChange` | `(value: string) => void` | `—` | Called when the active tab changes |
| `defaultValue` | `string` | first item id | Initial active tab for uncontrolled usage |
| `variant` | `"box"|"line"` | `"line"` | Visual style |
| `panels` | `Record<string, React.ReactNode>` | `—` | Optional panel content keyed by tab id |
| `style` | `React.CSSProperties` | `—` | Custom container styles |

### `TabItem` shape

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique tab identifier; used as the active value |
| `label` | `string` | Yes | Display label |
| `count` | `number` | No | Optional count shown beside the label |
| `disabled` | `boolean` | No | Disable this specific tab |

### Variant styles

| Value | Description |
|-------|-------------|
| `"line"` | Flat tab bar; active tab has a blue bottom-border underline |
| `"box"` | Tabs inside a rounded container; active tab gets a blue pill background |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-text-brand`
- `--color-bg-brand-contrast`

## Code Example

```tsx
const [activeTab, setActiveTab] = useState('overview');

{/* Line variant */}
<Tabs
  items={[
    { id: 'overview', label: 'Overview' },
    { id: 'details',  label: 'Details', count: 3 },
    { id: 'history',  label: 'History', disabled: true },
  ]}
  value={activeTab}
  onChange={setActiveTab}
  variant="line"
/>

{/* Box variant with panels */}
<Tabs
  items={[
    { id: 'all',     label: 'All' },
    { id: 'pending', label: 'Pending', count: 12 },
    { id: 'paid',    label: 'Paid' },
  ]}
  defaultValue="all"
  variant="box"
  panels={{
    all:     <AllList />,
    pending: <PendingList />,
    paid:    <PaidList />,
  }}
/>
```
