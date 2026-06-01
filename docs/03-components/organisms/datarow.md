# DataRow

**Tier:** Organisms  
**Source:** `src/components/organisms/DataRow/DataRow.tsx`

A single table row for data grids. Renders a checkbox, date, numeric amount, a dropdown select cell, assignee avatar + name, inline action buttons (edit/copy/delete), a freeform notes input, a status badge, and a drag handle — all in a fixed-height 44 px row.

## Import

```tsx
import { DataRow } from 'weloop-components/components/organisms';
```

## Types

```ts
export type DataRowStatus = "inProgress" | "done" | "pending" | "cancelled";

export interface DataRowAssignee {
  name: string;
  avatarSrc?: string;   // Photo URL — falls back to initials or silhouette
  initials?: string;    // Two-letter initials for textProfile fallback
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the row checkbox is checked |
| `onCheck` | `(checked: boolean) => void` | `—` | Checkbox change handler |
| `date` | `string` | `"22 May 2024"` | Primary date value displayed in the date cell |
| `amount` | `string \| number` | `"0.00"` | Numeric value displayed right-aligned with tabular figures |
| `selectValue` | `string` | `—` | Current value of the select cell; shows "Choose" placeholder when absent |
| `onSelectClick` | `() => void` | `—` | Called when the select cell button is clicked |
| `assignee` | `DataRowAssignee` | `—` | Assignee object; renders avatar + name |
| `notes` | `string` | `""` | Current value of the inline notes text input |
| `onNotesChange` | `(val: string) => void` | `—` | Called on every notes input change |
| `status` | `string` | `"In Progress"` | Status badge label text |
| `statusVariant` | `DataRowStatus` | `"inProgress"` | Controls status badge colour scheme |
| `selected` | `boolean` | `false` | Highlights the entire row with a brand-subtle blue background |
| `onEdit` | `() => void` | `—` | Edit action handler; button shown only when provided |
| `onCopy` | `() => void` | `—` | Copy action handler; button shown only when provided |
| `onDelete` | `() => void` | `—` | Delete action handler; button shown only when provided |
| `style` | `React.CSSProperties` | `—` | Additional inline styles applied to the row wrapper |

## Status variants

| Value | Colour |
|-------|--------|
| `"inProgress"` | Blue (brand) |
| `"done"` | Green |
| `"pending"` | Yellow |
| `"cancelled"` | Red |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-contrast`
- `--color-text-brand`
- `--color-border-brand`
- `--color-bg-brand-primary`

## Code Example

```tsx
import { DataRow } from 'weloop-components/components/organisms';

<DataRow
  checked={false}
  onCheck={(v) => console.log('checked', v)}
  date="15 Jan 2025"
  amount="1,234.00"
  selectValue="Invoice"
  onSelectClick={() => openDropdown()}
  assignee={{ name: "Jane Doe", initials: "JD" }}
  notes="Follow up next week"
  onNotesChange={(val) => setNotes(val)}
  status="Done"
  statusVariant="done"
  selected={false}
  onEdit={() => handleEdit()}
  onCopy={() => handleCopy()}
  onDelete={() => handleDelete()}
/>
```
