# Pagination

**Tier:** Molecules  
**Source:** `src/components/molecules/Pagination/Pagination.tsx`

Page navigation control with two layout variants: `simple` (page-size selector + item count text + first/prev/next/last buttons) and `paged` (page-size selector + first/prev + numbered page buttons with ellipsis + next/last + info text).

## Import

```tsx
import { Pagination } from 'weloop-components/components/molecules';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `page` | `number` | *(required)* | Current page, 1-based |
| `totalPages` | `number` | *(required)* | Total number of pages |
| `pageSize` | `number` | *(required)* | Items shown per page; also controls the page-size selector |
| `totalItems` | `number` | `—` | Total item count; when provided, renders `"X–Y of Z"` instead of `"page of totalPages"` |
| `totalLabel` | `string` | `—` | Extra right-hand label appended to the info text in the `paged` variant (e.g. `"Total Amt: £689,429"`) |
| `pageSizeOptions` | `number[]` | `[10, 25, 50, 100]` | Options shown in the page-size dropdown |
| `variant` | `"simple" \| "paged"` | `"simple"` | Layout variant |
| `onPageChange` | `(page: number) => void` | *(required)* | Called with the new page number when navigation occurs |
| `onPageSizeChange` | `(size: number) => void` | `—` | Called with the new page size when the dropdown changes |
| `style` | `React.CSSProperties` | `—` | Inline styles applied to the outer container |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-text-on-bg-primary`
- `--color-text-brand`

## Code Example

```tsx
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(25);
const total = 342;

{/* Simple variant */}
<Pagination
  variant="simple"
  page={page}
  totalPages={Math.ceil(total / pageSize)}
  pageSize={pageSize}
  totalItems={total}
  onPageChange={setPage}
  onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
/>

{/* Paged variant with a totals label */}
<Pagination
  variant="paged"
  page={page}
  totalPages={Math.ceil(total / pageSize)}
  pageSize={pageSize}
  totalItems={total}
  totalLabel="Total Amt: £689,429"
  onPageChange={setPage}
  onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
/>
```
