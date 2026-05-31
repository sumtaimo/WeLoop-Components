# DataTable

**Tier:** Organisms  
**Source:** `src/components/organisms/DataTable/DataTable.tsx`

A full-featured data table with sortable columns, row selection, and pagination integration.

## Import

```tsx
import { DataTable } from 'weloop-components/components/organisms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `Array<{ key: string; label: string; sortable?: boolean }>` | `[]` | Column definitions |
| `data` | `Array<Record<string, unknown>>` | `[]` | Row data array |
| `sortable` | `boolean` | `false` | Enable column sorting |
| `selectable` | `boolean` | `false` | Enable row selection with checkboxes |
| `onSort` | `(key: string, direction: "asc"|"desc") => void` | `—` | Called when a column header is clicked |
| `onSelect` | `(selectedIds: string[]) => void` | `—` | Called when row selection changes |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-border-default`
- `--color-bg-surface-subtle`
- `--color-text-brand`

## Code Example

```tsx
<DataTable
  columns={[
    { key: 'id',     label: 'ID',     sortable: true  },
    { key: 'name',   label: 'Name',   sortable: true  },
    { key: 'amount', label: 'Amount', sortable: true  },
    { key: 'status', label: 'Status', sortable: false },
  ]}
  data={transactions}
  sortable
  selectable
  onSort={(key, dir) => fetchSorted(key, dir)}
  onSelect={(ids) => setSelected(ids)}
/>
```
