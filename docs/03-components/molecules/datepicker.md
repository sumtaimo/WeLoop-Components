# DatePicker

**Tier:** Molecules  
**Source:** `src/components/molecules/DatePicker/DatePicker.tsx`

A calendar-based date picker with month/year navigation. Supports single date and date range modes.

## Import

```tsx
import { DatePicker } from 'weloop-components/components/molecules';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date|null` | `null` | Selected date (single mode) |
| `onChange` | `(date: Date) => void` | `—` | Called when a date is selected |
| `placeholder` | `string` | `"Select date"` | Input placeholder |
| `disabled` | `boolean` | `false` | Disables the picker |
| `minDate` | `Date` | `—` | Earliest selectable date |
| `maxDate` | `Date` | `—` | Latest selectable date |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-text-on-bg-primary`
- `--color-text-brand`
- `--shadow-floating-default`

## Code Example

```tsx
const [date, setDate] = useState<Date | null>(null);

<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Select a date"
  minDate={new Date()}
/>
```
