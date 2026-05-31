# FileUpload

**Tier:** Molecules  
**Source:** `src/components/molecules/FileUpload/FileUpload.tsx`

A drag-and-drop file upload zone with file list and upload progress.

## Import

```tsx
import { FileUpload } from 'weloop-components/components/molecules';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `string` | `—` | MIME type filter (e.g. "image/*,.pdf") |
| `multiple` | `boolean` | `false` | Allow multiple file selection |
| `onFilesChange` | `(files: File[]) => void` | `—` | Called when files are added or removed |
| `maxSizeMB` | `number` | `10` | Maximum file size in MB |
| `disabled` | `boolean` | `false` | Disable file selection |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-subtle`
- `--color-border-brand`
- `--color-text-brand`

## Code Example

```tsx
<FileUpload
  accept="image/*,.pdf"
  multiple
  maxSizeMB={5}
  onFilesChange={(files) => setUploadedFiles(files)}
/>
```
