# DatePicker

**Tier:** Molecules  
**Source:** `src/components/molecules/DatePicker/DatePicker.tsx`

A calendar-based single-date picker. Opens a popover calendar on click, supports controlled and uncontrolled modes, and includes optional label and required-field marking. For date ranges use `DateRangePickerField` (also exported from the same file).

## Import

```tsx
import { DatePicker } from 'weloop-components/components/molecules';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| null` | `—` | Controlled selected date |
| `defaultValue` | `Date \| null` | `null` | Uncontrolled initial date |
| `onChange` | `(date: Date \| null) => void` | `—` | Called when a date is selected |
| `disabled` | `boolean` | `false` | Disables the picker |
| `required` | `boolean` | `false` | Shows a red `*` next to the label |
| `label` | `string` | `—` | Label rendered above the input field |
| `placeholder` | `string` | `"DD MMM YYYY"` | Placeholder text shown when no date is selected |
| `minDate` | `Date` | `—` | Earliest selectable date |
| `maxDate` | `Date` | `—` | Latest selectable date |
| `style` | `React.CSSProperties` | `—` | Inline styles applied to the trigger wrapper |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-text-on-bg-primary`
- `--color-text-brand`
- `--color-border-brand`
- `--shadow-input-brand`
- `--color-bg-brand-contrast`

## Code Example

```tsx
const [date, setDate] = useState<Date | null>(null);

<DatePicker
  label="Start Date"
  required
  value={date}
  onChange={setDate}
  minDate={new Date()}
  placeholder="DD MMM YYYY"
/>
```
