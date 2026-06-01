# Snackbar

**Tier:** Atoms  
**Source:** `src/components/atoms/Snackbar/Snackbar.tsx`

A toast-style notification system built on Radix Toast. Wrap your app in `SnackbarContainer` and trigger notifications from anywhere using the `useSnackbar()` hook. Supports optional action buttons and swipe-to-dismiss.

## Import

```tsx
import { SnackbarContainer, useSnackbar } from 'weloop-components/components/atoms';
```

## SnackbarContainer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | `—` | App content to wrap (required) |
| `position` | `SnackbarPosition` | `"bottom-center"` | Where notifications appear on screen |

### `SnackbarPosition` values

`"bottom-center"` | `"bottom-right"` | `"bottom-left"` | `"top-center"` | `"top-right"` | `"top-left"`

## useSnackbar() Hook

Must be called inside a component that is a descendant of `SnackbarContainer`.

```ts
const snackbar = useSnackbar();
```

| Method | Signature | Description |
|--------|-----------|-------------|
| `show` | `(type, message, duration?, action?) => void` | Show a notification with explicit type |
| `success` | `(message, action?, duration?) => void` | Green success notification |
| `warning` | `(message, action?, duration?) => void` | Orange warning notification |
| `critical` | `(message, action?, duration?) => void` | Red critical notification |
| `info` | `(message, action?, duration?) => void` | Dark information notification |

### `SnackbarType` values

`"success"` | `"warning"` | `"critical"` | `"information"`

### `SnackbarAction`

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Button label shown inside the snackbar |
| `onClick` | `() => void` | Called when the action button is clicked |

### Duration

Pass `duration` in milliseconds (default `4000`). Pass `0` for a persistent notification that must be manually dismissed.

## Token Usage

This component uses hardcoded color values and does not consume CSS variables.

## Code Example

```tsx
// 1. Wrap your app
<SnackbarContainer position="bottom-center">
  <App />
</SnackbarContainer>

// 2. Trigger notifications from any descendant component
function SaveButton() {
  const snackbar = useSnackbar();

  const handleSave = async () => {
    try {
      await save();
      snackbar.success('File saved successfully');
    } catch {
      snackbar.critical('Save failed — please retry');
    }
  };

  return <button onClick={handleSave}>Save</button>;
}

// With an action button
snackbar.warning('Unsaved changes detected', {
  label: 'Discard',
  onClick: () => discardChanges(),
});

// Persistent (no auto-dismiss)
snackbar.info('Processing in background...', undefined, 0);
```
