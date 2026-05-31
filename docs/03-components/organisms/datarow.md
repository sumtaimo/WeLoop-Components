# DataRow

**Tier:** Organisms  
**Source:** `src/components/organisms/DataRow/DataRow.tsx`

A structured data display row for detail views and summary tables. Renders a label-value pair with optional status badge and metadata.

## Import

```tsx
import { DataRow } from 'weloop-components/components/organisms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `—` | Row display variant |
| `title` | `string` | `—` | Row label |
| `value` | `string|number` | `—` | Primary value |
| `label` | `string` | `—` | Secondary label or unit |
| `status` | `string` | `—` | Status indicator text |
| `metadata` | `string` | `—` | Additional metadata line |

## Token Usage

CSS variables consumed by this component:

- `--color-text-brand`
- `--color-border-default`
- `--color-text-subtle`

## Code Example

```tsx
<DataRow
  title="Transaction ID"
  value="TXN-20240115-001234"
  metadata="Processed 15 Jan 2024, 14:32"
/>

<DataRow
  title="Status"
  value="Completed"
  status="success"
/>
```
