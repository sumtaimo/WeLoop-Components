# DataTable

**Tier:** Organisms  
**Source:** `src/components/organisms/DataTable/DataTable.tsx`

A full-featured data table that renders a sticky header row and a list of `DataRow` components. Supports controlled or uncontrolled column sorting, a select-all checkbox, per-row callbacks for check, notes, edit, copy, delete, and an optional `maxHeight` that turns the body into a scrollable container with a fixed sticky header.

## Import

```tsx
import { DataTable } from 'weloop-components/components/organisms';
```

## Types

```ts
export interface DataTableRow {
  id: string;
  checked?: boolean;
  date?: string;
  amount?: string | number;
  selectValue?: string;
  assignee?: DataRowAssignee;
  notes?: string;
  status?: string;
  statusVariant?: DataRowStatus;
  selected?: boolean;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rows` | `DataTableRow[]` | `[]` | Array of row data objects to render |
| `onRowCheck` | `(id: string, checked: boolean) => void` | `—` | Called when an individual row checkbox is toggled |
| `onRowNotesChange` | `(id: string, value: string) => void` | `—` | Called when a row's inline notes input changes |
| `onRowEdit` | `(id: string) => void` | `—` | Called when the edit (pen) action button is clicked on a row |
| `onRowCopy` | `(id: string) => void` | `—` | Called when the copy action button is clicked on a row |
| `onRowDelete` | `(id: string) => void` | `—` | Called when the delete action button is clicked on a row |
| `onRowSelectClick` | `(id: string) => void` | `—` | Called when the select/dropdown cell is clicked on a row |
| `sortKey` | `string` | `—` | Controlled sort column key; uncontrolled when omitted |
| `sortDir` | `"asc" \| "desc"` | `—` | Controlled sort direction; uncontrolled when omitted |
| `onSort` | `(key: string, dir: "asc" \| "desc") => void` | `—` | Called when a sortable column header is clicked |
| `maxHeight` | `number \| string` | `—` | When set, the table body scrolls inside this height and the header sticks to the top |
| `style` | `React.CSSProperties` | `—` | Additional inline styles applied to the table wrapper |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-text-brand`
- `--color-bg-brand-contrast`
- `--color-border-brand`

## Code Example

```tsx
import { DataTable, type DataTableRow } from 'weloop-components/components/organisms';

const [rows, setRows] = useState<DataTableRow[]>([
  {
    id: "1",
    date: "15 Jan 2025",
    amount: "1,234.00",
    selectValue: "Invoice",
    assignee: { name: "Jane Doe", initials: "JD" },
    notes: "",
    status: "Done",
    statusVariant: "done",
  },
  {
    id: "2",
    date: "20 Jan 2025",
    amount: "500.00",
    selectValue: "Receipt",
    assignee: { name: "John Smith", initials: "JS" },
    notes: "Pending review",
    status: "In Progress",
    statusVariant: "inProgress",
  },
]);

<DataTable
  rows={rows}
  maxHeight={480}
  onRowCheck={(id, checked) =>
    setRows(prev => prev.map(r => r.id === id ? { ...r, checked } : r))
  }
  onRowNotesChange={(id, value) =>
    setRows(prev => prev.map(r => r.id === id ? { ...r, notes: value } : r))
  }
  onRowEdit={(id) => console.log('edit', id)}
  onRowCopy={(id) => console.log('copy', id)}
  onRowDelete={(id) => setRows(prev => prev.filter(r => r.id !== id))}
  onSort={(key, dir) => console.log('sort', key, dir)}
/>
```
