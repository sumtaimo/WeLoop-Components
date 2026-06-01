# Dialog

**Tier:** Organisms  
**Source:** `src/components/organisms/Dialog/Dialog.tsx`

A modal dialog built on Radix UI with four variants: `simple` (confirmation prompt), `list` (progress bar + data summary), `form` (multi-field input with two-column layout), and `export` (format selection with live data preview). Also exports `DialogCard` — the same body without a Radix backdrop, suitable for inline demos or embedded panels.

## Import

```tsx
import { Dialog, DialogCard } from 'weloop-components/components/organisms';
// Useful type and default-data exports:
import {
  DEFAULT_EXPORT_FORMATS,
  DEFAULT_LIST_ITEMS,
  DEFAULT_FORM_FIELDS,
} from 'weloop-components/components/organisms';
```

## Types

```ts
export type DialogVariant = "simple" | "list" | "form" | "export";

export interface DialogFormField {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "textarea" | "select";
  options?: string[];     // for select type
  fullWidth?: boolean;    // spans both columns in the 2-col grid
  required?: boolean;
}

export interface DialogListItem {
  label: string;
  count?: number | string;
}

export interface DialogExportFormat {
  id: string;
  label: string;
  ext: string;      // e.g. ".csv"
  color: string;    // accent hex colour
  iconBg: string;   // icon background hex colour
}
```

## Props — Dialog

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `DialogVariant` | `"simple"` | Dialog layout variant |
| `open` | `boolean` | `true` | Controls dialog visibility |
| `title` | `string` | `—` | Dialog title text |
| `description` | `string` | `—` | Supporting body text (simple and list variants) |
| `cancelLabel` | `string` | `"Cancel"` | Cancel button label |
| `actionLabel` | `string` | `"Confirm"` | Primary action button label |
| `onCancel` | `() => void` | `—` | Cancel button click handler |
| `onAction` | `() => void` | `—` | Primary action button click handler |
| `onClose` | `() => void` | `—` | Called on Esc key, backdrop click, or × button |
| `onSubmit` | `(values: Record<string, string>) => void` | `—` | Called with form field values when the action button is clicked in the form variant |
| `progressValue` | `number` | `72` | Progress bar fill percentage (list variant) |
| `progressLabel` | `string` | `—` | Overrides the default `"{n}%"` progress label (list variant) |
| `listItems` | `DialogListItem[]` | `DEFAULT_LIST_ITEMS` | Summary rows shown in the list variant |
| `fields` | `DialogFormField[]` | `DEFAULT_FORM_FIELDS` | Form field definitions for the form variant |
| `exportFormats` | `DialogExportFormat[]` | `DEFAULT_EXPORT_FORMATS` | Format options shown in the export variant |
| `exportPreviewRows` | `Array<Record<string, string \| number>>` | `—` | Data rows shown in the export preview table |
| `exportPreviewColumns` | `string[]` | `—` | Column headers for the export preview table |

## Props — DialogCard (additional / changed)

`DialogCard` accepts all `DialogProps` except `open`, plus the following controlled props for the embedded (non-Radix) context:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `formValues` | `Record<string, string>` | `{}` | Controlled form field values |
| `onFieldChange` | `(id: string, val: string) => void` | `—` | Called on every form field change |
| `selectedExportFormat` | `string` | first format id | Controlled selected export format id |
| `onSelectExportFormat` | `(id: string) => void` | `—` | Called when an export format option is selected |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-bg-brand-subtle-press`
- `--color-text-brand`
- `--color-border-brand`
- `--shadow-input-brand`

## Code Example

```tsx
import { useState } from 'react';
import { Dialog, DEFAULT_FORM_FIELDS } from 'weloop-components/components/organisms';

// Simple confirmation dialog
const [open, setOpen] = useState(false);

<Dialog
  variant="simple"
  open={open}
  title="Delete transaction?"
  description="This action cannot be undone. The transaction record will be permanently removed."
  cancelLabel="Cancel"
  actionLabel="Delete"
  onCancel={() => setOpen(false)}
  onAction={() => { deleteItem(); setOpen(false); }}
  onClose={() => setOpen(false)}
/>

// Form dialog with submit handler
const [formOpen, setFormOpen] = useState(false);

<Dialog
  variant="form"
  open={formOpen}
  title="Add team member"
  description="Fill in the details below."
  fields={DEFAULT_FORM_FIELDS}
  actionLabel="Add member"
  onSubmit={(values) => console.log('submitted', values)}
  onAction={() => setFormOpen(false)}
  onClose={() => setFormOpen(false)}
/>

// List variant with progress
<Dialog
  variant="list"
  open={open}
  title="Export Summary"
  progressValue={45}
  progressLabel="45 / 100 records"
  onClose={() => setOpen(false)}
/>

// Export variant
<Dialog
  variant="export"
  open={open}
  title="Export Data"
  actionLabel="Export"
  onAction={() => triggerExport()}
  onClose={() => setOpen(false)}
/>
```
