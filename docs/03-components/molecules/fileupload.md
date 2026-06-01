# FileUpload

**Tier:** Molecules  
**Source:** `src/components/molecules/FileUpload/FileUpload.tsx`

This module exports two components used together for file import flows:

- **`FileUploadCard`** — a drag-and-drop drop zone that triggers a native file browser on click.
- **`FileListItem`** — a single row in a list of queued/uploading files, showing filename, size, and a status icon.

## Import

```tsx
import { FileUploadCard, FileListItem } from 'weloop-components/components/molecules';
```

---

## FileUploadCard

A styled drop zone that accepts dragged files or opens a native file dialog on click. Displays an upload icon, title, description text, and an optional "learn more" link.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Import Files"` | Heading text inside the drop zone |
| `description` | `string` | `"Upload only the downloaded client form…"` | Supporting description text |
| `showLink` | `boolean` | `true` | Whether to render the helper link below the description |
| `linkText` | `string` | `"Learn more"` | Label for the helper link |
| `onLinkClick` | `() => void` | `—` | Called when the helper link is clicked |
| `onFilesSelected` | `(files: File[]) => void` | `—` | Called with the selected `File` objects when the user drops or browses |
| `accept` | `string` | `".xlsx,.xls,.csv"` | MIME type / extension filter forwarded to the hidden `<input>` |
| `disabled` | `boolean` | `false` | Disables all interactions and renders a muted appearance |
| `style` | `React.CSSProperties` | `—` | Inline styles applied to the outer container |

---

## FileListItem

A single row showing the status of an individual file that has been queued or uploaded.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `filename` | `string` | *(required)* | Display name of the file |
| `fileSize` | `string` | `—` | Human-readable file size, e.g. `"128 KB"` |
| `status` | `"default" \| "processing" \| "error" \| "completed"` | `"default"` | Upload status; controls the trailing status icon |
| `showDivider` | `boolean` | `false` | Renders a 1 px bottom border below the row |
| `style` | `React.CSSProperties` | `—` | Inline styles applied to the row container |

Status icon mapping:

| Status | Icon | Colour |
|--------|------|--------|
| `default` | Clock | Gray |
| `processing` | Spinner | Gray |
| `error` | X | Red |
| `completed` | Checkmark | Green |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-contrast`
- `--color-border-brand`
- `--color-text-brand`

## Code Example

```tsx
const [files, setFiles] = useState<File[]>([]);

{/* Drop zone */}
<FileUploadCard
  title="Import Client List"
  description="Only .xlsx or .csv files accepted. Maximum 3,000 entries."
  accept=".xlsx,.csv"
  onFilesSelected={(selected) => setFiles(selected)}
  onLinkClick={() => window.open('/help/import')}
/>

{/* File list */}
{files.map((file) => (
  <FileListItem
    key={file.name}
    filename={file.name}
    fileSize={`${(file.size / 1024).toFixed(0)} KB`}
    status="processing"
    showDivider
  />
))}
```
