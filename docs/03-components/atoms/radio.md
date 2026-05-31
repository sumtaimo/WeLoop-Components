# Radio

**Tier:** Atoms  
**Source:** `src/components/atoms/Radio/Radio.tsx`

A single radio button. Use multiple Radio components within a RadioGroup for mutually exclusive selection.

## Import

```tsx
import { Radio } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `—` | This radio option value |
| `checked` | `boolean` | `false` | Whether this option is selected |
| `onChange` | `(value: string) => void` | `—` | Called when this radio is selected |
| `label` | `string` | `—` | Label text |
| `disabled` | `boolean` | `false` | Disable interaction |
| `size` | `"sm"|"md"` | `"sm"` | Radio button size — sm=16px, md=20px |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-border-brand`
- `--shadow-input-brand`

## Code Example

```tsx
const [plan, setPlan] = useState('monthly');

<Radio value="monthly" checked={plan === 'monthly'} onChange={setPlan} label="Monthly" />
<Radio value="annual"  checked={plan === 'annual'}  onChange={setPlan} label="Annual"  />
```
