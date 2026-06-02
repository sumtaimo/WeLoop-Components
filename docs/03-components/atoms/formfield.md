# FormField

**Tier:** Atoms  
**Source:** `src/components/atoms/FormField/FormField.tsx`

A flexible labeled input with five types: text, numeric, comboLeft, comboRight, and textarea. Handles error, success, and disabled states.

## Import

```tsx
import { FormField } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"text"|"numeric"|"comboLeft"|"comboRight"|"textarea"` | `"text"` | Input variant |
| `label` | `string` | `—` | Label above the field |
| `placeholder` | `string` | `"Placeholder"` | Input placeholder text |
| `value` | `string` | `—` | Controlled value |
| `onChange` | `(value: string) => void` | `—` | Called with new text value |
| `selectValue` | `string` | `—` | Value for combo select part |
| `selectOptions` | `string[]` | `["Option 1","Option 2","Option 3"]` | Options for combo dropdown |
| `onSelectChange` | `(value: string) => void` | `—` | Called when combo select changes |
| `prefix` | `React.ReactNode` | `—` | Content rendered inside the field on the left (icon, currency symbol, dialling code, etc.). Not applicable to `comboLeft`/`comboRight`. |
| `suffix` | `React.ReactNode` | `—` | Content rendered inside the field on the right (icon, unit label, etc.). Not applicable to `comboLeft`/`comboRight`. |
| `rows` | `number` | `3` | Number of visible text rows (`textarea` type only) |
| `resize` | `"none"|"vertical"|"both"` | `"vertical"` | CSS resize behaviour (`textarea` type only) |
| `helperText` | `string` | `—` | Helper or validation message below field |
| `error` | `boolean` | `false` | Error state (red border + helper) |
| `success` | `boolean` | `false` | Success state (green border) |
| `disabled` | `boolean` | `false` | Disables the field |
| `required` | `boolean` | `false` | Shows required asterisk |

## Token Usage

CSS variables consumed by this component:

- `--color-border-brand`
- `--color-border-danger`
- `--shadow-input-brand`
- `--shadow-input-warning`
- `--color-text-danger`

## Code Example

```tsx
<FormField
  label="Email address"
  type="text"
  placeholder="user@example.com"
  value={email}
  onChange={setEmail}
  required
/>

<FormField
  label="Amount"
  type="comboLeft"
  selectOptions={['USD', 'IDR', 'EUR']}
  selectValue={currency}
  onSelectChange={setCurrency}
  value={amount}
  onChange={setAmount}
/>
```
