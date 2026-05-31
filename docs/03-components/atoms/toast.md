# Toast

**Tier:** Atoms  
**Source:** `src/components/atoms/Toast/Toast.tsx`

A low-level toast notification component built on Radix Toast. Prefer using the Snackbar system (SnackbarContainer + useSnackbar) for application-level notifications.

## Import

```tsx
import { Toast } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Whether the toast is visible |
| `title` | `string` | `—` | Toast title |
| `description` | `string` | `—` | Toast body text |
| `onClose` | `() => void` | `—` | Called when the toast closes |
| `duration` | `number` | `4000` | Auto-dismiss delay in ms |

## Token Usage

CSS variables consumed by this component:

- `--shadow-floating-float`

## Code Example

```tsx
const [open, setOpen] = useState(false);

<Toast
  open={open}
  title="Saved"
  description="Your changes have been saved."
  onClose={() => setOpen(false)}
  duration={3000}
/>
```
