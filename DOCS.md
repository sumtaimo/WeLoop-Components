# WeLoop Components — Usage Reference

All components are exported from the single package entry point. No deep imports needed.

```ts
import { ComponentName } from 'weloop-components';
```

---

## Table of Contents

- [Atoms](#atoms)
  - [Avatar](#avatar)
  - [ButtonSingle](#buttonsingle)
  - [ButtonDropdown](#buttondropdown)
  - [ButtonSegment](#buttonsegment)
  - [Checkbox](#checkbox)
  - [Chip](#chip)
  - [FormField](#formfield)
  - [InlineTip](#inlinetip)
  - [Link](#link)
  - [ListItem](#listitem)
  - [NotifBadge](#notifbadge)
  - [PaymentBadge](#paymentbadge)
  - [ProgressBar](#progressbar)
  - [Radio / RadioGroup](#radio--radiogroup)
  - [Snackbar](#snackbar)
  - [Tabs](#tabs)
  - [Toast](#toast)
  - [Toggle](#toggle)
  - [Tooltip](#tooltip)
- [Molecules](#molecules)
  - [Banner](#banner)
  - [DashboardCard](#dashboardcard)
  - [DateInput](#dateinput)
  - [DatePicker](#datepicker)
  - [DateRangePickerField](#daterangepickerfield)
  - [DateRangePicker](#daterangepicker)
  - [FileUpload](#fileupload)
  - [Pagination](#pagination)
  - [Popover](#popover)
- [Organisms](#organisms)
  - [DataTable](#datatable)
  - [Dialog](#dialog)
  - [EmptyState / ErrorPage](#emptystate--errorpage)

---

## Atoms

---

### Avatar

Displays a user or entity photo with graceful fallbacks (initials → generic silhouette).

```ts
import { Avatar } from 'weloop-components';
import type { AvatarType, AvatarSize } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"noProfile" \| "noProfileFill" \| "items" \| "bank" \| "office" \| "textProfile" \| "chipLead" \| "addMore"` | `"noProfile"` | Avatar variant |
| `size` | `20 \| 24 \| 32` | `24` | Pixel size |
| `src` | `string` | — | Photo URL (use with `type="office"`) |
| `alt` | `string` | — | Alt text for `src` photo |
| `text` | `string` | — | Initials to display (use with `type="textProfile"`) |
| `onClick` | `() => void` | — | Click handler |

```tsx
// Photo avatar
<Avatar type="office" size={32} src="https://example.com/photo.jpg" alt="Olivia Rhye" />

// Initials fallback
<Avatar type="textProfile" size={24} text="OR" />

// No photo — generic silhouette
<Avatar type="noProfile" size={20} />
```

---

### ButtonSingle

Standard action button. Three types × three variants × three sizes.

```ts
import { ButtonSingle } from 'weloop-components';
import type { ButtonSingleType, ButtonSingleVariant, ButtonSingleSize } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonType` | `"primary" \| "danger" \| "ghost"` | `"primary"` | Colour intent |
| `variant` | `"filled" \| "outline" \| "ghost"` | `"filled"` | Visual style |
| `size` | `"xs" \| "sm" \| "md"` | `"md"` | Button size |
| `leadIcon` | `ReactNode` | — | Icon before the label |
| `shortcut` | `string` | — | Keyboard shortcut label shown inside the button |
| `disabled` | `boolean` | `false` | Inherited from `<button>` |
| `onClick` | `() => void` | — | Inherited from `<button>` |

```tsx
// Primary filled
<ButtonSingle buttonType="primary" variant="filled" size="md" onClick={save}>
  Save
</ButtonSingle>

// Danger outline
<ButtonSingle buttonType="danger" variant="outline" size="sm" onClick={deleteItem}>
  Delete
</ButtonSingle>

// With icon
<ButtonSingle buttonType="primary" leadIcon={<IconPlus16 size={16} />} onClick={add}>
  Add row
</ButtonSingle>
```

---

### ButtonDropdown

Split button — label click + separate chevron click that opens a menu.

```ts
import { ButtonDropdown } from 'weloop-components';
import type { ButtonDropdownType, ButtonDropdownSize, DropdownMenuItem } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonType` | `"primary" \| "common"` | `"primary"` | Colour intent |
| `size` | `"xs" \| "sm" \| "md"` | `"md"` | |
| `filled` | `boolean` | `true` | Filled vs outline style |
| `label` | `string` | — | Button label |
| `menuItems` | `DropdownMenuItem[]` | — | Items shown in dropdown |
| `onLabelClick` | `() => void` | — | Primary action |
| `onMenuSelect` | `(id: string) => void` | — | Called with the selected item id |
| `disabled` | `boolean` | `false` | |

```tsx
<ButtonDropdown
  label="Export"
  menuItems={[
    { id: "csv",  label: "Export as CSV" },
    { id: "pdf",  label: "Export as PDF" },
    { id: "xlsx", label: "Export as Excel" },
  ]}
  onLabelClick={() => exportDefault()}
  onMenuSelect={id => exportAs(id)}
/>
```

---

### ButtonSegment

Segmented control — mutually exclusive options displayed as a connected button group.

```ts
import { ButtonSegment } from 'weloop-components';
import type { SegmentItem } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `segments` | `SegmentItem[]` | required | `{ key, label, icon? }` |
| `activeKey` | `string` | — | Controlled active segment |
| `onChange` | `(key: string) => void` | — | |
| `disabled` | `boolean` | `false` | |

```tsx
const [view, setView] = useState("list");

<ButtonSegment
  segments={[
    { key: "list",  label: "List" },
    { key: "grid",  label: "Grid" },
    { key: "table", label: "Table" },
  ]}
  activeKey={view}
  onChange={setView}
/>
```

---

### Checkbox

Single checkbox with optional label.

```ts
import { Checkbox } from 'weloop-components';
import type { CheckboxSize } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | |
| `indeterminate` | `boolean` | `false` | Shows a dash (partial selection) |
| `disabled` | `boolean` | `false` | |
| `label` | `string` | — | Label text |
| `size` | `"sm" \| "lg"` | `"sm"` | |
| `onChange` | `(checked: boolean) => void` | — | |

```tsx
const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onChange={setChecked}
  label="Send email notification"
  size="lg"
/>

// Indeterminate (e.g. select-all with partial selection)
<Checkbox checked={false} indeterminate onChange={handleSelectAll} />
```

---

### Chip

Small tag/chip — either a suggestion or a removable input tag.

```ts
import { Chip } from 'weloop-components';
import type { ChipType, ChipSize } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Chip text |
| `type` | `"suggest" \| "input"` | `"suggest"` | `"input"` shows a remove × button |
| `size` | `"s" \| "m"` | `"m"` | |
| `avatarSrc` | `string` | — | Optional avatar photo |
| `disabled` | `boolean` | `false` | |
| `onRemove` | `() => void` | — | Called when × is clicked (use with `type="input"`) |

```tsx
// Suggestion chip
<Chip type="suggest" label="Accounting" />

// Removable tag (e.g. selected filter)
<Chip type="input" label="Olivia Rhye" avatarSrc={photoUrl} onRemove={() => removeTag("olivia")} />
```

---

### FormField

Universal form input — handles text, numeric, combo (dropdown + text), and textarea in one component.

```ts
import { FormField } from 'weloop-components';
import type { FormFieldType } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"text" \| "numeric" \| "comboLeft" \| "comboRight" \| "textarea"` | `"text"` | Input variant |
| `label` | `string` | — | Field label |
| `required` | `boolean` | `false` | Shows `*` after label |
| `placeholder` | `string` | — | |
| `value` | `string` | — | Controlled value |
| `onChange` | `(value: string) => void` | — | |
| `error` | `boolean` | `false` | Red border state |
| `success` | `boolean` | `false` | Green border state |
| `disabled` | `boolean` | `false` | |
| `helperText` | `string` | — | Helper/error text below field |
| `tags` | `string[]` | — | Tags shown inside the field |
| `additionalTagCount` | `number` | — | "+N more" badge |
| `onClear` | `() => void` | — | Shows × clear button |
| `selectValue` | `string` | — | Dropdown value (combo types) |
| `onSelectChange` | `(value: string) => void` | — | Dropdown change (combo types) |

```tsx
// Text input with validation
const [email, setEmail] = useState("");
<FormField
  label="Email"
  required
  type="text"
  placeholder="you@example.com"
  value={email}
  onChange={setEmail}
  error={email.length > 0 && !email.includes("@")}
  success={email.includes("@")}
  helperText={email.length > 0 && !email.includes("@") ? "Enter a valid email" : undefined}
/>

// Numeric (right-aligned, tabular numbers)
<FormField
  label="Amount"
  required
  type="numeric"
  placeholder="0.00"
  value={amount}
  onChange={setAmount}
/>

// comboRight — text on left, dropdown selector on right (e.g. amount + currency)
<FormField
  label="Amount"
  type="comboRight"
  placeholder="0.00"
  value={amount}
  onChange={setAmount}
  selectValue={currency}
  onSelectChange={setCurrency}
/>

// comboLeft — dropdown selector on left, text on right (e.g. country code + phone)
<FormField
  label="Phone"
  type="comboLeft"
  placeholder="Enter number"
  selectValue={countryCode}
  onSelectChange={setCountryCode}
  value={phone}
  onChange={setPhone}
/>

// Textarea
<FormField
  label="Remarks"
  required
  type="textarea"
  placeholder="Add notes…"
  value={notes}
  onChange={setNotes}
/>
```

---

### InlineTip

Contextual message strip — information, warning, danger, or suggestion.

```ts
import { InlineTip } from 'weloop-components';
import type { InlineTipType } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"information" \| "danger" \| "suggestion" \| "warning"` | `"information"` | Colour intent |
| `title` | `string` | required | Bold heading text |
| `description` | `string` | — | Body text |
| `fill` | `"filled" \| "outline"` | `"outline"` | Background fill style |
| `showLink` | `boolean` | `false` | Show an action link |
| `linkText` | `string` | — | Link label |
| `onLinkClick` | `() => void` | — | |

```tsx
<InlineTip
  type="warning"
  title="Approaching limit"
  description="You have used 90% of your monthly quota."
  showLink
  linkText="Upgrade plan"
  onLinkClick={() => navigate("/billing")}
/>

<InlineTip type="danger" fill="filled" title="Payment failed" description="Please update your card details." />
```

---

### Link

Inline hyperlink with optional trailing arrow icon.

```ts
import { Link } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Link text |
| `href` | `string` | — | URL (renders `<a>`) |
| `showTrailIcon` | `boolean` | `false` | Arrow icon after text |
| `disabled` | `boolean` | `false` | |
| `onClick` | `() => void` | — | |

```tsx
<Link label="View invoice" href="/invoices/42" showTrailIcon />
<Link label="Cancel" onClick={() => setOpen(false)} />
```

---

### ListItem

Versatile list row — notifications, bill items, bank accounts, minimal rows.

```ts
import { ListItem } from 'weloop-components';
import type { ListItemType } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"notifi-link" \| "notifi-default" \| "notifi-list" \| "bill-list" \| "bank-list" \| "minimal"` | `"minimal"` | Row variant |
| `title` | `string` | required | Primary text |
| `description` | `string` | — | Secondary text |
| `count` | `number \| string` | — | Badge count |
| `label` | `string` | — | Status/category label |
| `currency` | `string` | — | Currency value |
| `showDivider` | `boolean` | `true` | Bottom border |
| `onClick` | `() => void` | — | |
| `linkText` | `string` | — | Inline action link label |
| `onLinkClick` | `() => void` | — | |

```tsx
<ListItem
  type="notifi-default"
  title="Invoice #042 approved"
  description="Approved by Jane on 22 May 2024"
  count={3}
  onClick={() => navigate("/notifications")}
/>

<ListItem
  type="bill-list"
  title="Electricity"
  description="Due 31 May 2024"
  currency="$450.00"
  showDivider={false}
/>
```

---

### NotifBadge

Small notification dot or count bubble.

```ts
import { NotifBadge } from 'weloop-components';
import type { NotifBadgeSize } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"large" \| "small" \| "size3"` | `"small"` | |
| `label` | `string` | — | Count text (e.g. `"5"`, `"99+"`) |

```tsx
<div style={{ position: "relative", display: "inline-flex" }}>
  <IconBell24 />
  <NotifBadge size="small" label="3" />
</div>
```

---

### PaymentBadge

Status badge for payment and document states.

```ts
import { PaymentBadge } from 'weloop-components';
import type { PaymentBadgeStatus, PaymentBadgeSize } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `"draft" \| "scheduled" \| "inProgress" \| "approvalPending" \| "partiallyPaid" \| "paid" \| "overdue" \| "rejected" \| "valid" \| "overpaid" \| "closed" \| "review" \| "submitted"` | required | |
| `size` | `"M" \| "S"` | `"M"` | |
| `showIcon` | `boolean` | `true` | |

```tsx
<PaymentBadge status="paid" size="M" />
<PaymentBadge status="overdue" size="S" showIcon={false} />
<PaymentBadge status="approvalPending" />
```

---

### ProgressBar

Horizontal progress indicator — loading, complete, or failed states.

```ts
import { ProgressBar } from 'weloop-components';
import type { ProgressBarVariant, ProgressBarSize } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current value |
| `max` | `number` | `100` | Maximum value |
| `size` | `"sm" \| "md"` | `"md"` | Bar thickness |
| `variant` | `"loading" \| "fail" \| "complete"` | `"loading"` | |
| `label` | `string` | — | Label above bar |
| `progressText` | `string` | — | Text shown below bar |
| `unit` | `string` | — | Unit appended to value (e.g. `"%"`) |

```tsx
// Uploading file
<ProgressBar label="Uploading…" value={uploadProgress} max={100} unit="%" variant="loading" />

// Completed
<ProgressBar label="Done" value={100} max={100} variant="complete" progressText="Upload complete" />

// Failed
<ProgressBar label="Error" value={45} max={100} variant="fail" progressText="Upload failed — retry?" />
```

---

### Radio / RadioGroup

Single-select radio buttons. Always use `RadioGroup` as the wrapper.

```ts
import { RadioGroup, Radio } from 'weloop-components';
```

| `RadioGroup` prop | Type | Default | Description |
|-------------------|------|---------|-------------|
| `value` | `string` | — | Controlled selected value |
| `onChange` | `(value: string) => void` | — | |
| `name` | `string` | — | HTML `name` attribute |
| `disabled` | `boolean` | `false` | Disables all radios |
| `error` | `boolean` | `false` | Error state on all radios |

| `Radio` prop | Type | Default | Description |
|--------------|------|---------|-------------|
| `value` | `string` | required | This option's value |
| `label` | `string` | — | Display label |
| `size` | `"xs" \| "sm"` | `"sm"` | |
| `disabled` | `boolean` | `false` | Overrides group |

```tsx
const [plan, setPlan] = useState("monthly");

<RadioGroup value={plan} onChange={setPlan} name="billing-plan">
  <Radio value="monthly" label="Monthly — $12/mo" />
  <Radio value="annual"  label="Annual — $99/yr"  />
  <Radio value="enterprise" label="Enterprise" disabled />
</RadioGroup>
```

---

### Snackbar

Ephemeral bottom toast with an optional action button. Requires a provider wrapper.

```ts
import { SnackbarContainer, useSnackbar } from 'weloop-components';
import type { SnackbarType } from 'weloop-components';
```

**Setup** — wrap your app once:
```tsx
// main.tsx / App.tsx
<SnackbarContainer>
  <App />
</SnackbarContainer>
```

**Usage** — call from any child component:
```tsx
function SaveButton() {
  const { show } = useSnackbar();

  return (
    <button onClick={async () => {
      await save();
      show({ type: "success", message: "Changes saved." });
    }}>
      Save
    </button>
  );
}

// With action
show({
  type: "warning",
  message: "Invoice deleted.",
  action: { label: "Undo", onClick: undo },
});

// Types: "success" | "warning" | "critical" | "information"
```

---

### Tabs

Horizontal tab navigation — box or underline variant.

```ts
import { Tabs } from 'weloop-components';
import type { TabItem, TabsVariant } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TabItem[]` | required | `{ id, label, count?, disabled? }` |
| `value` | `string` | — | Controlled active tab id |
| `onChange` | `(id: string) => void` | — | |
| `defaultValue` | `string` | — | Uncontrolled initial tab |
| `variant` | `"box" \| "line"` | `"line"` | Visual style |
| `panels` | `Record<string, ReactNode>` | — | Panel content keyed by tab id |

```tsx
const [tab, setTab] = useState("invoices");

<Tabs
  variant="line"
  value={tab}
  onChange={setTab}
  items={[
    { id: "invoices",  label: "Invoices",  count: 12 },
    { id: "payments",  label: "Payments" },
    { id: "reports",   label: "Reports",   disabled: true },
  ]}
  panels={{
    invoices: <InvoiceList />,
    payments: <PaymentList />,
    reports:  <ReportList />,
  }}
/>
```

---

### Toast

Auto-dismissing notification. Requires a provider wrapper.

```ts
import { ToastContainer, useToast } from 'weloop-components';
import type { ToastType } from 'weloop-components';
```

**Setup** — wrap your app once:
```tsx
<ToastContainer>
  <App />
</ToastContainer>
```

**Usage:**
```tsx
const { show } = useToast();

show({ type: "success",     message: "Invoice sent." });
show({ type: "warning",     message: "Connection unstable." });
show({ type: "critical",    message: "Export failed.", duration: 8000 });
show({ type: "information", message: "New update available." });
```

---

### Toggle

On/off switch.

```ts
import { Toggle } from 'weloop-components';
import type { ToggleSize } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | |
| `onChange` | `(checked: boolean) => void` | — | |
| `size` | `"sm" \| "md"` | `"md"` | |
| `disabled` | `boolean` | `false` | |
| `label` | `string` | — | Label text |
| `showLabel` | `boolean` | `true` | Show/hide label |

```tsx
const [enabled, setEnabled] = useState(false);

<Toggle
  checked={enabled}
  onChange={setEnabled}
  label="Email notifications"
  size="md"
/>
```

---

### Tooltip

Hover tooltip wrapping any trigger element.

```ts
import { Tooltip } from 'weloop-components';
import type { TooltipSide, TooltipAlign } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | The trigger element |
| `content` | `ReactNode` | required | Tooltip content |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"top"` | Preferred position |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment along the side |
| `sideOffset` | `number` | `6` | Gap between trigger and tooltip (px) |
| `showArrow` | `boolean` | `true` | |
| `delayDuration` | `number` | `400` | Hover delay (ms) |
| `disabled` | `boolean` | `false` | |

```tsx
<Tooltip content="Delete this invoice" side="top">
  <button onClick={deleteInvoice}>
    <IconTrash16 />
  </button>
</Tooltip>

// Rich content
<Tooltip content={<span>Last synced: <strong>2 min ago</strong></span>} side="bottom" align="start">
  <IconInfo16 />
</Tooltip>
```

---

## Molecules

---

### Banner

Full-width alert banner — informational, actionable, or multi-action.

```ts
import { Banner } from 'weloop-components';
import type { BannerType } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"information" \| "success" \| "warning" \| "critical" \| "actionable" \| "multiActionable" \| "multiCritical" \| "multiWarning"` | `"information"` | |
| `title` | `string` | — | Bold heading |
| `message` | `string` | — | Body text (simple types) |
| `description` | `string` | — | Body text (multi types) |
| `actionLabel` | `string` | — | Primary CTA button label |
| `onAction` | `() => void` | — | Primary CTA handler |
| `onClose` | `() => void` | — | Dismisses the banner |

```tsx
<Banner
  type="warning"
  title="Subscription expiring soon"
  message="Your plan expires in 3 days. Renew now to avoid service interruption."
  actionLabel="Renew plan"
  onAction={() => navigate("/billing")}
  onClose={() => setShowBanner(false)}
/>

<Banner type="success" message="Invoice #042 sent successfully." onClose={dismiss} />
```

---

### DashboardCard

KPI / navigation card — toggle, minimal, or headline (stat) variant.

```ts
import { DashboardCard } from 'weloop-components';
import type { DashboardCardType } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"toggle" \| "minimal" \| "headline"` | `"toggle"` | Card variant |
| `headline` | `string` | — | Main text / stat value |
| `description` | `string` | — | Body text (toggle, minimal) |
| `subtitle` | `string` | — | Small label above headline (headline) |
| `trailText` | `string` | — | Secondary count (headline) |
| `delta` | `string` | — | Change indicator e.g. `"5%"` (headline) |
| `period` | `string` | — | Period label e.g. `"vs last week"` (headline) |
| `selected` | `boolean` | `false` | Blue selected state |
| `disabled` | `boolean` | `false` | |
| `onClick` | `() => void` | — | |

```tsx
// Navigation card (toggle)
const [activeCard, setActiveCard] = useState<string | null>(null);

<DashboardCard
  type="toggle"
  headline="Invoices"
  description="Track and manage your invoices."
  selected={activeCard === "invoices"}
  onClick={() => setActiveCard(activeCard === "invoices" ? null : "invoices")}
/>

// KPI stat card (headline)
<DashboardCard
  type="headline"
  subtitle="Total Revenue"
  trailText="10K"
  headline="$24,500"
  delta="5%"
  period="vs last week"
  selected={activeCard === "revenue"}
  onClick={() => setActiveCard("revenue")}
/>
```

---

### DateInput

A styled date field — display-only, no calendar. Use `DatePicker` for an interactive field with a calendar popover.

```ts
import { DateInput } from 'weloop-components';
import type { DateInputVariant } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| null` | — | Selected date |
| `label` | `string` | — | Field label |
| `required` | `boolean` | `false` | |
| `placeholder` | `string` | `"DD MMM YYYY"` | |
| `disabled` | `boolean` | `false` | |
| `variant` | `"date" \| "due-date"` | `"date"` | `"due-date"` adds a left duration dropdown |
| `durationOptions` | `string[]` | `["7 Days","14 Days",…]` | Options for the duration dropdown |
| `durationValue` | `string` | — | Controlled duration value |
| `onDurationChange` | `(v: string) => void` | — | |

```tsx
// Simple date display field
<DateInput variant="date" label="Invoice Date" required placeholder="DD / MM / YYYY" />

// Due-date with configurable duration on the left
<DateInput
  variant="due-date"
  label="Due Date"
  durationOptions={["7 Days", "14 Days", "30 Days"]}
  durationValue={duration}
  onDurationChange={setDuration}
  value={dueDate}
/>
```

---

### DatePicker

Interactive single-date field with calendar popover.

```ts
import { DatePicker } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| null` | — | Controlled date |
| `defaultValue` | `Date \| null` | `null` | Uncontrolled initial date |
| `onChange` | `(date: Date \| null) => void` | — | |
| `label` | `string` | — | |
| `required` | `boolean` | `false` | |
| `placeholder` | `string` | — | |
| `disabled` | `boolean` | `false` | |
| `minDate` | `Date` | — | Earliest selectable date |
| `maxDate` | `Date` | — | Latest selectable date |

```tsx
const [invoiceDate, setInvoiceDate] = useState<Date | null>(null);

<DatePicker
  label="Invoice Date"
  required
  placeholder="DD / MM / YYYY"
  value={invoiceDate}
  onChange={setInvoiceDate}
/>

// With date constraints
<DatePicker
  label="Due Date"
  value={dueDate}
  onChange={setDueDate}
  minDate={new Date()}          // can't select past dates
  maxDate={addDays(new Date(), 90)}
/>
```

---

### DateRangePickerField

**Recommended for forms.** A compact trigger field that opens the dual-calendar range picker in a popover — same interaction pattern as `DatePicker`.

```ts
import { DateRangePickerField } from 'weloop-components';
import type { DateRange } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `DateRange` | — | Controlled range `{ start, end }` |
| `onChange` | `(range: DateRange) => void` | — | |
| `label` | `string` | — | |
| `required` | `boolean` | `false` | |
| `placeholder` | `string` | `"Select date range"` | |
| `disabled` | `boolean` | `false` | |
| `minDate` | `Date` | — | |
| `maxDate` | `Date` | — | |

```tsx
const [period, setPeriod] = useState<DateRange>({ start: null, end: null });

<DateRangePickerField
  label="Reporting period"
  required
  placeholder="Select date range"
  value={period}
  onChange={setPeriod}
/>

// In a filter bar (no label, full width)
<DateRangePickerField
  value={dateFilter}
  onChange={setDateFilter}
  style={{ width: "100%" }}
/>
```

---

### DateRangePicker

**For panels and sidebars.** Always-visible dual-calendar with 14 preset chips. Embed this directly when the calendar should always be visible (e.g. a filter drawer). For forms, use `DateRangePickerField` instead.

```ts
import { DateRangePicker } from 'weloop-components';
import type { DateRange } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `DateRange` | — | Controlled range |
| `onChange` | `(range: DateRange) => void` | — | Called on every day click / preset |
| `onSave` | `(range: DateRange) => void` | — | Called when Save is clicked |
| `onClear` | `() => void` | — | Called when Clear is clicked |
| `minDate` | `Date` | — | |
| `maxDate` | `Date` | — | |

```tsx
const [range, setRange] = useState<DateRange>({ start: null, end: null });

// Inside a filter drawer
<DateRangePicker
  value={range}
  onChange={setRange}
  onSave={r => { setRange(r); applyFilter(r); }}
  onClear={() => { setRange({ start: null, end: null }); clearFilter(); }}
/>
```

**Preset chips** (built-in, no configuration needed):
Today · Yesterday · This week · Last week · This month · Last month · Last 3 months · 1st half · 2nd half · Q1 · Q2 · Q3 · Q4 · Custom

---

### FileUpload

Drag-and-drop upload card + file list row.

```ts
import { FileUploadCard, FileListItem } from 'weloop-components';
import type { FileUploadStatus } from 'weloop-components';
```

| `FileUploadCard` prop | Type | Default | Description |
|-----------------------|------|---------|-------------|
| `title` | `string` | — | Card heading |
| `description` | `string` | — | Helper text |
| `accept` | `string` | — | MIME types e.g. `"image/*,.pdf"` |
| `onFilesSelected` | `(files: File[]) => void` | — | Called with selected files |
| `disabled` | `boolean` | `false` | |
| `showLink` | `boolean` | `false` | Show a "browse" link |
| `linkText` | `string` | — | |
| `onLinkClick` | `() => void` | — | |

| `FileListItem` prop | Type | Default | Description |
|---------------------|------|---------|-------------|
| `filename` | `string` | required | |
| `fileSize` | `string` | — | e.g. `"2.4 MB"` |
| `status` | `"default" \| "processing" \| "error" \| "completed"` | `"default"` | |
| `showDivider` | `boolean` | `true` | |

```tsx
const [files, setFiles] = useState<File[]>([]);

<FileUploadCard
  title="Upload attachments"
  description="PDF, PNG or JPG up to 10 MB"
  accept=".pdf,image/*"
  onFilesSelected={f => setFiles(prev => [...prev, ...f])}
  showLink
  linkText="browse files"
/>

{files.map(f => (
  <FileListItem
    key={f.name}
    filename={f.name}
    fileSize={`${(f.size / 1024 / 1024).toFixed(1)} MB`}
    status="processing"
  />
))}
```

---

### Pagination

Page navigation with optional page-size selector.

```ts
import { Pagination } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `page` | `number` | required | Current page (1-based) |
| `totalPages` | `number` | required | |
| `pageSize` | `number` | required | Rows per page |
| `totalItems` | `number` | — | Total record count for display |
| `totalLabel` | `string` | — | Label appended to total (e.g. `"invoices"`) |
| `pageSizeOptions` | `number[]` | `[10, 25, 50]` | |
| `variant` | `"simple" \| "paged"` | `"paged"` | `"simple"` shows Prev/Next only |
| `onPageChange` | `(page: number) => void` | required | |
| `onPageSizeChange` | `(size: number) => void` | — | |

```tsx
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(25);

<Pagination
  page={page}
  totalPages={Math.ceil(totalItems / pageSize)}
  pageSize={pageSize}
  totalItems={totalItems}
  totalLabel="invoices"
  pageSizeOptions={[10, 25, 50, 100]}
  onPageChange={setPage}
  onPageSizeChange={size => { setPageSize(size); setPage(1); }}
/>
```

---

### Popover

Confirmation or info popover anchored to a trigger element.

```ts
import { Popover } from 'weloop-components';
import type { PopoverSide, PopoverAlign } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Trigger element |
| `title` | `string` | — | Bold heading |
| `description` | `string` | — | Body text |
| `cancelLabel` | `string` | `"Cancel"` | |
| `actionLabel` | `string` | `"Confirm"` | |
| `onCancel` | `() => void` | — | |
| `onAction` | `() => void` | — | |
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Preferred side |
| `align` | `"start" \| "center" \| "end"` | `"start"` | |
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | |

```tsx
<Popover
  title="Delete invoice?"
  description="This action cannot be undone."
  actionLabel="Delete"
  onAction={deleteInvoice}
  onCancel={() => {}}
  side="top"
>
  <button>Delete</button>
</Popover>
```

---

## Organisms

---

### DataTable

Spreadsheet-style table with sticky header, sortable columns, inline notes, checkbox selection, and row actions.

```ts
import { DataTable } from 'weloop-components';
import type { DataTableRow, DataTableProps } from 'weloop-components';
```

#### `DataTableRow` shape

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | **Required.** Unique row identifier |
| `date` | `string` | Date cell text e.g. `"22 May 2024"` |
| `amount` | `string \| number` | Numeric cell (right-aligned) |
| `selectValue` | `string` | Dropdown current value |
| `assignee` | `{ name: string; avatarSrc?: string; initials?: string }` | Assignee avatar + name |
| `notes` | `string` | Inline text input value |
| `status` | `string` | Status badge display text |
| `statusVariant` | `"inProgress" \| "done" \| "pending" \| "cancelled"` | Status badge colour |
| `checked` | `boolean` | Checkbox state |
| `selected` | `boolean` | Row highlight (blue tint) |

#### `DataTableProps`

| Prop | Type | Description |
|------|------|-------------|
| `rows` | `DataTableRow[]` | Row data |
| `maxHeight` | `number \| string` | When set, header sticks and body scrolls within this height |
| `onRowCheck` | `(id, checked) => void` | Checkbox toggled |
| `onRowNotesChange` | `(id, value) => void` | Notes input changed |
| `onRowEdit` | `(id) => void` | Edit action clicked (hover to reveal) |
| `onRowCopy` | `(id) => void` | Copy action clicked |
| `onRowDelete` | `(id) => void` | Delete action clicked |
| `onRowSelectClick` | `(id) => void` | Dropdown cell clicked |
| `sortKey` | `string` | Controlled sort column key |
| `sortDir` | `"asc" \| "desc"` | Controlled sort direction |
| `onSort` | `(key, dir) => void` | Sort header clicked |
| `style` | `CSSProperties` | |

```tsx
import { DataTable } from 'weloop-components';
import type { DataTableRow } from 'weloop-components';

const [rows, setRows] = useState<DataTableRow[]>([
  {
    id: "r1",
    date: "18 May 2024",
    amount: "125.50",
    selectValue: "Option A",
    assignee: { name: "Olivia Rhye", avatarSrc: "https://example.com/olivia.jpg" },
    notes: "Review required",
    status: "In Progress",
    statusVariant: "inProgress",
    checked: false,
    selected: false,
  },
  {
    id: "r2",
    date: "19 May 2024",
    amount: "750.00",
    assignee: { name: "Phoenix Baker", initials: "PB" },
    notes: "",
    status: "Done",
    statusVariant: "done",
    checked: false,
    selected: false,
  },
]);

<DataTable
  rows={rows}
  maxHeight={400}   // enables sticky header + scrollable body

  onRowCheck={(id, checked) =>
    setRows(p => p.map(r => r.id === id ? { ...r, checked } : r))
  }
  onRowNotesChange={(id, value) =>
    setRows(p => p.map(r => r.id === id ? { ...r, notes: value } : r))
  }
  onRowEdit={id => openEditPanel(id)}
  onRowCopy={id => setRows(p => {
    const src = p.find(r => r.id === id)!;
    const clone = { ...src, id: `${id}-copy`, selected: false, checked: false };
    const idx = p.findIndex(r => r.id === id);
    const next = [...p];
    next.splice(idx + 1, 0, clone);
    return next;
  })}
  onRowDelete={id => setRows(p => p.filter(r => r.id !== id))}
  onRowSelectClick={id => openDropdown(id)}
  style={{ width: "100%" }}
/>
```

**`statusVariant` colour mapping:**

| Value | Colour | When to use |
|-------|--------|-------------|
| `"inProgress"` | Blue | Active / in-progress |
| `"done"` | Green | Completed |
| `"pending"` | Yellow | Waiting / pending |
| `"cancelled"` | Red | Cancelled / rejected |

---

### Dialog

Modal dialog — simple confirmation, list summary, multi-field form, or file export.

```ts
import { Dialog } from 'weloop-components';
import type { DialogVariant, DialogFormField, DialogListItem, DialogExportFormat } from 'weloop-components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | |
| `variant` | `"simple" \| "list" \| "form" \| "export"` | `"simple"` | |
| `title` | `string` | — | |
| `description` | `string` | — | |
| `cancelLabel` | `string` | `"Cancel"` | |
| `actionLabel` | `string` | `"Confirm"` | |
| `onCancel` | `() => void` | — | Also called when backdrop is clicked |
| `onAction` | `() => void` | — | For `"simple"` variant |
| `onClose` | `() => void` | — | |
| `listItems` | `DialogListItem[]` | — | `{ label, count? }` (for `"list"`) |
| `fields` | `DialogFormField[]` | — | Form fields (for `"form"`) |
| `onSubmit` | `(values) => void` | — | Form submit (for `"form"`) |
| `exportFormats` | `DialogExportFormat[]` | — | (for `"export"`) |
| `progressValue` | `number` | — | 0-100, shows a progress bar |

```tsx
// Simple confirmation
const [open, setOpen] = useState(false);

<Dialog
  open={open}
  variant="simple"
  title="Delete client?"
  description="All associated invoices will also be removed. This cannot be undone."
  actionLabel="Delete"
  cancelLabel="Keep"
  onAction={() => { deleteClient(); setOpen(false); }}
  onCancel={() => setOpen(false)}
/>

// Form dialog
<Dialog
  open={open}
  variant="form"
  title="Invite team member"
  actionLabel="Send invite"
  fields={[
    { id: "name",  label: "Full name",  placeholder: "Jane Doe", required: true },
    { id: "email", label: "Email",      placeholder: "jane@co.com", type: "email", required: true },
    { id: "role",  label: "Role",       type: "select", options: ["Admin", "Editor", "Viewer"] },
  ]}
  onSubmit={values => { inviteUser(values); setOpen(false); }}
  onCancel={() => setOpen(false)}
/>
```

---

### EmptyState / ErrorPage

Empty state illustrations and full-page error screens.

```ts
import { EmptyState, ErrorPage } from 'weloop-components';
import type { EmptyStateType } from 'weloop-components';
```

#### EmptyState

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"no-results" \| "failed-to-load" \| "no-clients" \| "no-documents" \| "custom"` | `"no-results"` | Chooses the illustration |
| `title` | `string` | — | Heading |
| `description` | `string` | — | Body text |
| `actionLabel` | `string` | — | CTA button label |
| `onAction` | `() => void` | — | |
| `icon` | `ReactNode` | — | Custom icon (use with `type="custom"`) |

```tsx
// No search results
<EmptyState
  type="no-results"
  title="No invoices found"
  description="Try adjusting your filters or search term."
  actionLabel="Clear filters"
  onAction={clearFilters}
/>

// Load error
<EmptyState
  type="failed-to-load"
  title="Couldn't load data"
  description="Check your connection and try again."
  actionLabel="Retry"
  onAction={retry}
/>
```

#### ErrorPage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `errorCode` | `string` | — | e.g. `"404"`, `"500"` |
| `title` | `string` | — | |
| `description` | `string` | — | |
| `primaryLabel` | `string` | — | Primary action button |
| `onPrimary` | `() => void` | — | |
| `secondaryLabel` | `string` | — | Secondary action button |
| `onSecondary` | `() => void` | — | |
| `variant` | `"default" \| "general"` | `"default"` | |

```tsx
<ErrorPage
  errorCode="404"
  title="Page not found"
  description="The page you're looking for doesn't exist or has been moved."
  primaryLabel="Go to dashboard"
  onPrimary={() => navigate("/")}
  secondaryLabel="Go back"
  onSecondary={() => history.back()}
/>
```

---

## Common Patterns

### Controlled vs uncontrolled

Components that accept both `value` + `onChange` (controlled) and `defaultValue` (uncontrolled):
- `DatePicker` — `value` / `defaultValue`
- `DateRangePicker` — `value` / `defaultValue`
- `Tabs` — `value` / `defaultValue`
- `ButtonSegment` — `activeKey`

All other components are controlled — pass `value` and `onChange`.

### Inline styles

All components accept a `style?: React.CSSProperties` prop for layout overrides (width, margin, etc.). Do not override colours or spacing tokens through `style` — use the component's built-in props (`variant`, `size`, etc.) instead.

### Icons

Icons are exported individually from `weloop-components`. Naming convention: `Icon{Name}{Size}`.

```ts
import { IconPen16, IconTrash16, IconDate16, IconCheck16, IconInfo16 } from 'weloop-components';

<IconPen16 size={16} color="#6B7280" />
```
