# Pagination

**Tier:** Molecules  
**Source:** `src/components/molecules/Pagination/Pagination.tsx`

Page navigation control with two layout variants: simple (previous/next) and paged (numbered pages with ellipsis).

## Import

```tsx
import { Pagination } from 'weloop-components/components/molecules';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"simple"|"paged"` | `"paged"` | Layout variant |
| `page` | `number` | `1` | Current page (1-indexed) |
| `totalPages` | `number` | `1` | Total number of pages |
| `pageSize` | `number` | `10` | Items per page (for display) |
| `totalItems` | `number` | `0` | Total item count (for display) |
| `pageSizeOptions` | `number[]` | `[10,25,50]` | Page size options in dropdown |
| `onPageChange` | `(page: number) => void` | `—` | Called when page changes |
| `onPageSizeChange` | `(size: number) => void` | `—` | Called when page size changes |
| `totalLabel` | `string` | `"items"` | Noun used in total count display |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-text-on-bg-primary`
- `--color-text-brand`

## Code Example

```tsx
<Pagination
  variant="paged"
  page={currentPage}
  totalPages={Math.ceil(total / pageSize)}
  totalItems={total}
  pageSize={pageSize}
  onPageChange={setCurrentPage}
  onPageSizeChange={setPageSize}
  totalLabel="transactions"
/>
```
