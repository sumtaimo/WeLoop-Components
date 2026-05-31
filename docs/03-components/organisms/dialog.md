# Dialog

**Tier:** Organisms  
**Source:** `src/components/organisms/Dialog/Dialog.tsx`

A modal dialog with four variants: simple (confirmation), list (progress/data summary), form (multi-field input), and export (format selection with preview).

## Import

```tsx
import { Dialog } from 'weloop-components/components/organisms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"simple"|"list"|"form"|"export"` | `"simple"` | Dialog layout variant |
| `open` | `boolean` | `false` | Controls dialog visibility |
| `title` | `string` | `—` | Dialog title |
| `description` | `string` | `—` | Body text for simple variant |
| `cancelLabel` | `string` | `"Cancel"` | Cancel button text |
| `actionLabel` | `string` | `"Confirm"` | Primary action button text |
| `onCancel` | `() => void` | `—` | Cancel button handler |
| `onAction` | `() => void` | `—` | Primary action handler |
| `onClose` | `() => void` | `—` | Dismiss via Esc/backdrop click |
| `fields` | `DialogFormField[]` | `—` | Form fields (form variant) |
| `listItems` | `DialogListItem[]` | `—` | Summary items (list variant) |
| `exportFormats` | `DialogExportFormat[]` | `DEFAULT_EXPORT_FORMATS` | Format options (export variant) |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-text-on-bg-primary`
- `--shadow-brand-default`
- `--color-text-brand`
- `--color-border-brand`
- `--shadow-floating-float`

## Code Example

```tsx
// Simple confirmation dialog
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

// Form dialog
<Dialog
  variant="form"
  open={formOpen}
  title="Add team member"
  fields={DEFAULT_FORM_FIELDS}
  actionLabel="Add member"
  onAction={() => submitForm()}
  onClose={() => setFormOpen(false)}
/>
```
