# Shadow Tokens

Shadow tokens encode box-shadow values that communicate elevation, focus, and interaction state.

## Brand Shadows

Used on primary and brand-colored interactive elements.

| CSS Variable              | State     | Description                                | Use Case                    |
|---------------------------|-----------|--------------------------------------------|-----------------------------|
| `--shadow-brand-default`  | Default   | 1px outline + drop shadow in brand color   | Primary filled buttons      |
| `--shadow-brand-hover`    | Hover     | Elevated brand shadow                      | Button hover state          |
| `--shadow-brand-pressed`  | Pressed   | White ring + brand glow + light tint ring  | Button pressed / active     |
| `--shadow-brand-secondary`| Secondary | Neutral hairline outline                   | Secondary brand surfaces    |
| `--shadow-brand-sm`       | —         | Small brand drop shadow                    | Legacy / compat             |
| `--shadow-brand-md`       | —         | Medium brand drop shadow                   | Legacy / compat             |

## Default (Neutral) Shadows

Used on neutral/ghost interactive elements.

| CSS Variable               | State   | Description                              | Use Case                  |
|----------------------------|---------|------------------------------------------|---------------------------|
| `--shadow-default-default` | Default | Hairline outline + subtle drop shadow    | Ghost/outline buttons     |
| `--shadow-default-hover`   | Hover   | 1px outline + elevated drop             | Ghost button hover        |
| `--shadow-default-pressed` | Pressed | White ring + neutral glow + gray ring   | Ghost button pressed      |

## Danger Shadows

Used on destructive action controls.

| CSS Variable             | State   | Description                                | Use Case                  |
|--------------------------|---------|--------------------------------------------|---------------------------|
| `--shadow-danger-default` | Default | 1px red outline + red tinted drop shadow  | Danger filled buttons     |
| `--shadow-danger-hover`   | Hover   | Red outline with elevated shadow          | Danger button hover       |
| `--shadow-danger-pressed` | Pressed | Red glow + light pink ring                | Danger button pressed     |

## Toggle Shadows

Used on toggle/switch components.

| CSS Variable             | State   | Description                               | Use Case               |
|--------------------------|---------|-------------------------------------------|------------------------|
| `--shadow-toggle-default` | Off     | Subtle depth shadow                       | Toggle unchecked        |
| `--shadow-toggle-hover`   | Hover   | Brand-tinted glow                         | Toggle hover state      |
| `--shadow-toggle-pressed` | Pressed | White ring + brand glow + tint            | Toggle press state      |
| `--shadow-toggle-checked` | On      | Brand outline glow                        | Toggle checked state    |

## Input Shadows

Used on form field controls.

| CSS Variable           | State   | Description                          | Use Case                     |
|------------------------|---------|--------------------------------------|------------------------------|
| `--shadow-input-default` | Default | Single-px neutral border shadow     | Unfocused input              |
| `--shadow-input-brand`   | Focus   | Brand outline + tint ring           | Focused input                |
| `--shadow-input-warning` | Error   | Red outline + light red ring        | Validation error state       |
| `--shadow-input-success` | Success | Green outline + green glow          | Validation success state     |

## Miscellaneous Shadows

| CSS Variable                  | Description                              | Use Case                     |
|-------------------------------|------------------------------------------|------------------------------|
| `--shadow-disabled`           | Neutral hairline only                    | Disabled control borders     |
| `--shadow-floating-default`   | Soft multi-layer elevation               | Dropdowns, popovers          |
| `--shadow-floating-gen-card`  | Card-style border with micro elevation  | Data cards, list surfaces    |
| `--shadow-floating-float`     | High elevation with blur                | Floating panels, tooltips    |
