# Theme Guide

Side-by-side comparison of the three brand themes and their key token values.

## Brand Overview

| Property          | wabooks             | webill365           | wecafe              |
|-------------------|---------------------|---------------------|---------------------|
| Primitive family  | purple              | blue                | orange              |
| bg.brand.primary  | `#0060B9`          | `#1D32FF`          | `#E7450F`          |
| bg.brand.subtle   | `#E0EEFE`          | `#D8E9FF`          | `#FEE9D6`          |
| bg.brand.contrast | `#F0F7FF`          | `#EAF3FF`          | `#FFF5ED`          |
| text.brand        | `#0060B9`          | `#1D32FF`          | `#E7450F`          |
| border.brand      | `#0060B9`          | `#1D32FF`          | `#E7450F`          |
| border.emphasized | `#064786`          | `#1221C1`          | `#982914`          |

## Light Mode Token Values

### wabooks (purple brand)

| Token                   | Value       |
|-------------------------|-------------|
| bg.default              | `#FFFFFF`  |
| bg.brand.primary        | `#0060B9`  |
| bg.brand.subtle         | `#E0EEFE`  |
| bg.brand.subtleHover    | `#0C87EB`  |
| bg.brand.subtlePress    | `#0152A3`  |
| text.brand              | `#0060B9`  |
| border.brand            | `#0060B9`  |
| shadow.brand.default    | `0 0 0 1px rgba(1,82,163,1), ...` |

### webill365 (blue brand)

| Token                   | Value       |
|-------------------------|-------------|
| bg.default              | `#FFFFFF`  |
| bg.brand.primary        | `#1D32FF`  |
| bg.brand.subtle         | `#D8E9FF`  |
| bg.brand.subtleHover    | `#3E60FF`  |
| bg.brand.subtlePress    | `#0F1FEA`  |
| text.brand              | `#1D32FF`  |
| border.brand            | `#1D32FF`  |
| shadow.brand.default    | `0 0 0 1px rgba(18,33,193,1), ...` |

### wecafe (orange brand)

| Token                   | Value       |
|-------------------------|-------------|
| bg.default              | `#FFFFFF`  |
| bg.brand.primary        | `#E7450F`  |
| bg.brand.subtle         | `#FEE9D6`  |
| bg.brand.subtleHover    | `#F65F19`  |
| bg.brand.subtlePress    | `#BF310F`  |
| text.brand              | `#E7450F`  |
| border.brand            | `#E7450F`  |
| shadow.brand.default    | `0 0 0 1px rgba(191,49,15,1), ...` |

## Switching Themes at Runtime

```tsx
import { useTheme } from 'weloop-components/tokens';

function BrandSwitcher() {
  const { setTheme, setColorMode, themeName, colorMode } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme('wabooks')}>wabooks</button>
      <button onClick={() => setTheme('webill365')}>webill365</button>
      <button onClick={() => setTheme('wecafe')}>wecafe</button>
      <button onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}
```

## Shared Tokens (Same Across All Themes)

These tokens are identical in all three brands — only brand-specific slots differ:

| Token                   | Light Value |
|-------------------------|-------------|
| bg.surface.disabled     | `#E5E5E5`  |
| bg.danger.default       | `#E1232E`  |
| text.default            | `#000000`  |
| text.subtle             | `#A3A3A3`  |
| text.disabled           | `#737373`  |
| text.danger             | `#BD1822`  |
| text.success            | `#15803D`  |
| border.danger           | `#E1232E`  |
| border.success          | `#16A34A`  |
| bg.feedback.error       | `#E1232E` / `#FFE1E3` |
| bg.feedback.success     | `#22C55E` / `#DCFCE7` |
