# Custom Themes

WeLoop provides two APIs for customizing brand colors without replacing the entire token set.

## createCustomTheme

Use when you need precise control over specific token slots.

```ts
import { createCustomTheme } from 'weloop-components/tokens';

const tealTheme = createCustomTheme('webill365', 'light', {
  color: {
    bg: {
      brand: {
        primary:     '#0D9488',  // teal-600
        subtle:      '#CCFBF1',  // teal-100
        subtleHover: '#99F6E4',  // teal-200
        subtlePress: '#5EEAD4',  // teal-300
        contrast:    '#F0FDFA',  // teal-50
      },
    },
    text: {
      brand: '#0D9488',
    },
    border: {
      brand:      '#14B8A6',
      emphasized: '#0F766E',
    },
  },
  shadow: {
    brand: {
      default: '0 0 0 1px rgba(13,148,136,1), 0 1px 1px 0 rgba(13,148,136,0.5), 0 2px 3px 0 rgba(13,148,136,0.1)',
      hover:   '0 0 0 1px rgba(20,184,166,1), 0 1px 1px 0 rgba(20,184,166,0.5), 0 2px 3px 0 rgba(20,184,166,0.1)',
      pressed: '0 0 0 1.25px rgba(255,255,255,1), 0 0 1px 1px rgba(13,148,136,0.16), 0 0 0 4px rgba(204,251,241,1)',
      secondary: '0 0 0 1px rgba(245,245,245,1)',
      sm: '0 1px 2px 0 rgba(13,148,136,0.5)',
      md: '0 4px 6px -1px rgba(13,148,136,0.5)',
    },
  },
});
```

## createBrandTheme

Use for quick prototyping — derives subtle/hover/press variants automatically from a single hex.

**Note:** For production use, prefer `createCustomTheme` with manually-tuned values.

```ts
import { createBrandTheme } from 'weloop-components/tokens';

const roseTheme = createBrandTheme(
  'webill365',   // base theme to inherit from
  'light',       // color mode
  '#E11D48',     // brand primary hex (rose-600)
  // optional extra overrides:
  {
    color: {
      border: { emphasized: '#9F1239' },  // rose-900
    },
  }
);
```

The function derives these slots automatically via CSS `color-mix()`:
- `bg.brand.subtle` → brand at 10% over white
- `bg.brand.subtleHover` → brand at 18% over white
- `bg.brand.subtlePress` → brand at 26% over white

## ThemeProvider Integration

Pass the resolved token set as `customTokens`:

```tsx
import { ThemeProvider } from 'weloop-components/tokens';
import { tealTheme } from './themes/teal';

export function App() {
  return (
    <ThemeProvider customTokens={tealTheme} applyToCSSVars>
      {/* All components will use teal brand colors */}
    </ThemeProvider>
  );
}
```

The `customTokens` prop is used as the initial token set. Once the user calls `setTheme()` or `setColorMode()`, the built-in theme map takes over. This means custom themes act as startup overrides.

## Token Override Reference

| Slot                          | Type     | Effect                                          |
|-------------------------------|----------|-------------------------------------------------|
| `color.bg.brand.primary`      | string   | Fill for primary buttons, active states         |
| `color.bg.brand.subtle`       | string   | Background for subtle brand tints               |
| `color.bg.brand.subtleHover`  | string   | Hover fill for outline buttons                  |
| `color.bg.brand.subtlePress`  | string   | Press fill for buttons                          |
| `color.bg.brand.contrast`     | string   | Lightest brand tint for backgrounds             |
| `color.text.brand`            | string   | Brand-colored text and links                    |
| `color.border.brand`          | string   | Brand border (focused inputs, active indicators)|
| `color.border.emphasized`     | string   | Strong brand border variant                     |
| `shadow.brand.default`        | string   | Button resting shadow                           |
| `shadow.brand.hover`          | string   | Button hover shadow                             |
| `shadow.brand.pressed`        | string   | Button pressed shadow                           |
| `shadow.brand.secondary`      | string   | Secondary/neutral brand shadow                  |
| `shadow.brand.sm`             | string   | Small shadow (legacy compat)                    |
| `shadow.brand.md`             | string   | Medium shadow (legacy compat)                   |
