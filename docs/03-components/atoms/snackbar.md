# Snackbar

**Tier:** Atoms  
**Source:** `src/components/atoms/Snackbar/Snackbar.tsx`

A toast-style notification system. Wrap your app in SnackbarContainer and call methods from the useSnackbar() hook to show notifications.

## Import

```tsx
import { Snackbar } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | `—` | App content wrapped by the snackbar container |
| `position` | `"bottom-center"|"bottom-right"|"bottom-left"|"top-center"|"top-right"|"top-left"` | `"bottom-center"` | Where notifications appear |

## Token Usage

This component uses hardcoded color values and does not consume CSS variables.

## Code Example

```tsx
// Setup
<SnackbarContainer position="bottom-center">
  <App />
</SnackbarContainer>

// Usage inside components
const snackbar = useSnackbar();

snackbar.success('File saved successfully');
snackbar.warning('Unsaved changes detected');
snackbar.critical('Upload failed — please retry');
snackbar.info('Theme switched to dark mode');
```
