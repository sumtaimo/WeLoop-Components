# Color Tokens

Semantic color tokens map abstract roles to brand-specific values. Components use CSS variables that are set by `ThemeProvider`.

## Background Tokens

| CSS Variable                        | Description                                  | Light Example (webill365) |
|-------------------------------------|----------------------------------------------|---------------------------|
| `--color-bg-default`                | Page/app background                          | `#FFFFFF`               |
| `--color-bg-surface-default`        | Card, panel surface                          | `#FFFFFF`               |
| `--color-bg-surface-subtle`         | Slightly elevated surface                    | `#F5F5F5`               |
| `--color-bg-surface-ghost`          | Transparent overlay                          | `rgba(255,255,255,0.08)` |
| `--color-bg-surface-emphasized`     | Highlighted surface                          | `#F3F4F6`               |
| `--color-bg-surface-inverse`        | Inverted (dark on light, light on dark)      | `#1F2937`               |
| `--color-bg-surface-disabled`       | Disabled control fill                        | `#E5E5E5`               |
| `--color-bg-brand-primary`          | Primary brand fill (buttons, active states)  | `#1D32FF`               |
| `--color-bg-brand-subtle`           | Light brand tint (hover backgrounds)         | `#D8E9FF`               |
| `--color-bg-brand-subtle-hover`     | Brand hover state fill                       | `#3E60FF`               |
| `--color-bg-brand-subtle-press`     | Brand pressed state fill                     | `#0F1FEA`               |
| `--color-bg-brand-contrast`         | Very light brand tint                        | `#EAF3FF`               |
| `--color-bg-danger-default`         | Danger/error fill (destructive buttons)      | `#E1232E`               |
| `--color-bg-danger-subtle`          | Light danger tint                            | `#FFE1E3`               |
| `--color-bg-danger-subtle-hover`    | Danger hover state fill                      | `#FC6D75`               |

## Text Tokens

| CSS Variable                    | Description                              | Light Example |
|---------------------------------|------------------------------------------|---------------|
| `--color-text-default`          | Primary text                             | `#000000`   |
| `--color-text-on-bg-primary`    | Text on brand primary backgrounds        | `#FAFAFA`   |
| `--color-text-subtle`           | Secondary/muted text                     | `#A3A3A3`   |
| `--color-text-brand`            | Brand-colored text, links                | `#1D32FF`   |
| `--color-text-disabled`         | Text in disabled controls                | `#737373`   |
| `--color-text-inverse`          | Text on inverse surfaces                 | `#F5F5F5`   |
| `--color-text-danger`           | Error/danger text                        | `#BD1822`   |
| `--color-text-success`          | Success text                             | `#15803D`   |
| `--color-text-warning`          | Warning text                             | `#BF310F`   |

## Border Tokens

| CSS Variable                    | Description                              | Light Example |
|---------------------------------|------------------------------------------|---------------|
| `--color-border-default`        | Default border on surfaces               | `#E5E5E5`   |
| `--color-border-brand`          | Brand-colored border (focused inputs)    | `#1D32FF`   |
| `--color-border-subtle`         | Subtler dividers                         | `#D4D4D4`   |
| `--color-border-strong`         | High-contrast borders                    | `#000000`   |
| `--color-border-danger`         | Error state borders                      | `#E1232E`   |
| `--color-border-success`        | Success state borders                    | `#16A34A`   |
| `--color-border-disabled`       | Disabled control borders                 | `#E5E5E5`   |
| `--color-border-emphasized`     | Strong brand border (focus rings)        | `#1221C1`   |

## Feedback Palette

Feedback colors are available as semantic token objects in TypeScript but are not exposed as individual CSS variables (they are used directly in component logic):

| Feedback Type | Solid BG    | Subtle BG   | Solid Text  | Border      |
|---------------|-------------|-------------|-------------|-------------|
| neutral       | `#6B7280`  | `#F5F5F5`  | `#374151`  | `#6B7280`  |
| info          | `#3E60FF`  | `#D8E9FF`  | `#1221C1`  | `#1221C1`  |
| error         | `#E1232E`  | `#FFE1E3`  | `#BD1822`  | `#E1232E`  |
| success       | `#22C55E`  | `#DCFCE7`  | `#15803D`  | `#16A34A`  |
| warning       | `#F65F19`  | `#FDCFAB`  | `#BF310F`  | `#E7450F`  |
| caution       | `#EAB308`  | `#FEF9C3`  | `#A16207`  | `#CA8A04`  |
| accent        | Brand       | Brand-100   | Brand-800   | Brand-600   |
