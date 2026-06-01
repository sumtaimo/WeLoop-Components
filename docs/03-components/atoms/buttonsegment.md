# ButtonSegment

**Tier:** Atoms  
**Source:** `src/components/atoms/ButtonSegment/ButtonSegment.tsx`

A segmented control that acts as a single-select tab strip. Each segment is a button; only one can be active at a time. The active segment is highlighted and the component tracks selection via `activeKey`.

## Import

```tsx
import { ButtonSegment } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `segments` | `SegmentItem[]` | — | Array of segment definitions (required) |
| `activeKey` | `string` | `—` | Key of the currently active segment |
| `disabled` | `boolean` | `false` | Disables all segments |
| `onChange` | `(key: string) => void` | `—` | Called with the `key` of the clicked segment |
| `className` | `string` | `""` | Additional CSS class on the container |

### SegmentItem interface

| Field | Type | Description |
|-------|------|-------------|
| `key` | `string` | Unique identifier used for `activeKey` and `onChange` |
| `label` | `string` | Display text |
| `icon` | `React.ReactNode` | Optional leading icon |

## Token Usage

This component uses hardcoded color values and does not consume CSS variables.

## Code Example

```tsx
const [active, setActive] = React.useState('day');

<ButtonSegment
  segments={[
    { key: 'day',   label: 'Day' },
    { key: 'week',  label: 'Week' },
    { key: 'month', label: 'Month' },
  ]}
  activeKey={active}
  onChange={setActive}
/>

{/* With icons */}
<ButtonSegment
  segments={[
    { key: 'list', label: 'List',  icon: <IconBag16 size={12} color="currentColor" /> },
    { key: 'grid', label: 'Grid',  icon: <IconBall16 size={12} color="currentColor" /> },
  ]}
  activeKey="list"
  onChange={(key) => console.log(key)}
/>

{/* Disabled */}
<ButtonSegment
  segments={[{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }]}
  activeKey="a"
  disabled={true}
  onChange={() => {}}
/>
```
