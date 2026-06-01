# Toast

**Tier:** Atoms  
**Source:** `src/components/atoms/Toast/Toast.tsx`

A compact toast notification system built on Radix Toast. Wrap your app in `ToastContainer` and trigger toasts from anywhere using the `useToast()` hook.

## Import

```tsx
import { ToastContainer, useToast } from 'weloop-components/components/atoms';
```

## ToastContainer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | `—` | App content to wrap (required) |
| `position` | `ToastPosition` | `"bottom-right"` | Where toasts appear on screen |

### `ToastPosition` values

`"bottom-right"` | `"bottom-left"` | `"bottom-center"` | `"top-right"` | `"top-left"` | `"top-center"`

## useToast() Hook

Must be called inside a component that is a descendant of `ToastContainer`.

```ts
const toast = useToast();
```

| Method | Signature | Description |
|--------|-----------|-------------|
| `show` | `(type, message, duration?) => void` | Show a toast with explicit type |
| `success` | `(message, duration?) => void` | Green success toast |
| `warning` | `(message, duration?) => void` | Orange warning toast |
| `critical` | `(message, duration?) => void` | Red critical toast |
| `info` | `(message, duration?) => void` | Dark information toast |

### `ToastType` values

`"success"` | `"warning"` | `"critical"` | `"information"`

### Duration

Pass `duration` in milliseconds (default `4000`). Pass `0` for a persistent toast that must be manually dismissed.

## Token Usage

This component uses hardcoded color values and does not consume CSS variables.

## Code Example

```tsx
// 1. Wrap your app
<ToastContainer position="bottom-right">
  <App />
</ToastContainer>

// 2. Trigger toasts from any descendant component
function DeleteButton({ id }: { id: string }) {
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await deleteItem(id);
      toast.success('Item deleted');
    } catch {
      toast.critical('Delete failed');
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}

// Custom duration
toast.info('Syncing data...', 2000);

// Persistent
toast.warning('No internet connection', 0);
```
