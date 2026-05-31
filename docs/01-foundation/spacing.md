# Spacing & Layout Tokens

All spacing is expressed in px. Divide by 16 for rem equivalents.

## Spacing Scale

| Group   | Token | px  | rem    | Usage                           |
|---------|-------|-----|--------|---------------------------------|
| micro   | 0     | 0   | 0      | Tight gaps, icon-to-text, button padding |
| micro   | 2     | 2   | 0.125  | Tight gaps, icon-to-text, button padding |
| micro   | 4     | 4   | 0.25   | Tight gaps, icon-to-text, button padding |
| micro   | 6     | 6   | 0.375  | Tight gaps, icon-to-text, button padding |
| inset   | 8     | 8   | 0.5    | Component internal padding |
| inset   | 10    | 10  | 0.625  | Component internal padding |
| inset   | 12    | 12  | 0.75   | Component internal padding |
| inset   | 16    | 16  | 1      | Component internal padding |
| stack   | 20    | 20  | 1.25   | Between related elements, card padding |
| stack   | 24    | 24  | 1.5    | Between related elements, card padding |
| stack   | 28    | 28  | 1.75   | Between related elements, card padding |
| stack   | 32    | 32  | 2      | Between related elements, card padding |
| stack   | 40    | 40  | 2.5    | Between related elements, card padding |
| section | 48    | 48  | 3      | Between sections, large gaps |
| section | 56    | 56  | 3.5    | Between sections, large gaps |
| section | 64    | 64  | 4      | Between sections, large gaps |
| page    | 96    | 96  | 6      | Page-level margins, hero spacing |
| page    | 112   | 112 | 7      | Page-level margins, hero spacing |
| page    | 120   | 120 | 7.5    | Page-level margins, hero spacing |

## Border Radius

| Token | px  | Use case                          |
|-------|-----|-----------------------------------|
| none  | 0   | Sharp corners (tables, dividers) |
| xxs   | 4   | Tiny chips, tags |
| xs    | 6   | Small buttons, badges |
| sm    | 8   | Default inputs, cards |
| md    | 10  | Standard components |
| lg    | 16  | Large cards, modals |
| xl    | 20  | Feature cards, sheets |
| full  | 999 | Pills, avatars, toggles |

## Stroke Widths

| Token         | px  | Use case                     |
|---------------|-----|------------------------------|
| none          | 0   | No border |
| hairline      | 0.5 | Subtle dividers on retina displays |
| thin          | 1   | Default borders |
| thin-hairline | 1.5 | Slightly elevated borders |
| medium        | 2   | Focused/active inputs |
| thick         | 3   | Emphasis borders, progress bars |

## Control Sizes

Minimum touch target heights for interactive controls:

| Token | px  | Example controls                 |
|-------|-----|----------------------------------|
| xxs   | 20  | Compact badges, mini buttons |
| xs    | 24  | Small buttons, icon buttons |
| sm    | 28  | Compact inputs, small selects |
| md    | 32  | Default inputs, buttons |
| lg    | 36  | Comfortable inputs |
| xl    | 40  | Large action areas |
| xxl   | 44  | Mobile-optimized touch targets |
