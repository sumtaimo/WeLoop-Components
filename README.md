# WeLoop 2.1 — Component Library

> **Figma-verified** React + TypeScript component library with a multi-brand design token system.  
> Built by the **Products Operations Dept.**

Live showcase → run `npm run dev` then open `http://localhost:5173`

---

## Repository Structure

```
weloop-components/
├── src/
│   ├── components/
│   │   ├── atoms/          # ButtonSingle · ButtonDropdown · ButtonSegment · Link · NotifBadge · PaymentBadge
│   │   ├── molecules/      # DashboardCard
│   │   └── organisms/
│   │       └── AppNavigate/  # AppBar · DTopBar · DBottomBar · TitleNavBar · DialogSettingBar
│   ├── tokens/
│   │   ├── primitives.ts   # Raw color ramps (blue, orange, gray, green, red …)
│   │   ├── spacing.ts      # spacingScale · radius · stroke · controlSize
│   │   ├── typography.ts   # fontFamily · fontSize · lineHeight · fontWeight
│   │   ├── types.ts        # ThemeTokens · ThemeName · ColorMode
│   │   ├── context.tsx     # ThemeProvider · useTheme · getTheme · applyThemeToCSSVars
│   │   └── themes/
│   │       ├── wabooks-light.ts   # WABOOKS  — purple  #0060B9
│   │       ├── wabooks-dark.ts
│   │       ├── webill365-light.ts # WeBill365 — blue   #1D32FF  (default)
│   │       ├── webill365-dark.ts
│   │       ├── wecafe-light.ts    # WeCafe   — orange  #E7450F
│   │       └── wecafe-dark.ts
│   └── index.ts            # Main barrel export
└── showcase/               # Interactive token inspector (not published)
    ├── App.tsx
    ├── Sidebar.tsx
    ├── TokenPanel.tsx
    ├── DemoShell.tsx
    └── demos/              # One demo file per component
```

---

## Components (12 total — all Figma-verified)

### Atoms

| Component | Props | Sizes | Figma Node |
|---|---|---|---|
| **ButtonSingle** | `buttonType` primary/danger/ghost · `variant` filled/outline/ghost · `size` xs/sm/md · `leadIcon` · `shortcut` · `disabled` | xs=24 sm=32 md=40 | `1212:4702` |
| **ButtonDropdown** | `buttonType` primary/common · `filled` · `size` xs/sm/md · `label` · `open` · `disabled` | xs=24 sm=32 md=36 | `1193:2403` |
| **ButtonSegment** | `segments[]` {key,label,icon} · `activeKey` · `disabled` · `onChange` | h=28 | `726:3581` |
| **Link** | `label` · `href` · `showTrailIcon` · `disabled` · `onClick` | fixed 14px | `7676:81933` |
| **NotifBadge** | `size` large/small/size3 · `label` | — | — |
| **PaymentBadge** | `status` draft/scheduled/inProgress/approvalPending/partiallyPaid/paid/overdue/refunded/cancelled/failed | — | — |

### Molecules

| Component | Props | Figma Node |
|---|---|---|
| **DashboardCard** | `type` toggle/minimal/headline · `headline` · `description` · `subtitle` · `trailText` · `delta` · `period` · `selected` · `disabled` · `onClick` | — |

### Organisms — AppNavigate

| Component | Props |
|---|---|
| **AppBar** | `points` · `notificationCount` · `avatarSrc` · `onNotificationClick` · `onAvatarClick` |
| **DTopBar** | `title` · `showDraftBadge` · `primaryLabel` · `secondaryLabel` · `onPrimaryAction` · `onSecondaryAction` |
| **DBottomBar** | `dropdownLabel` · `learnMoreLabel` · `primaryLabel` · `secondaryLabel` · `hideActions` · onClick handlers |
| **TitleNavBar** | `parentLabel` · `currentLabel` · `childLabel` · `onHomeClick` · `onParentClick` |
| **DialogSettingBar** | `title` · `onBack` · `onForward` · `onClose` |

---

## Design Token System

3 brand themes × 2 modes = **6 token sets**

| Theme | Brand color | Light | Dark |
|---|---|---|---|
| `webill365` | `#1D32FF` blue | ✅ | ✅ |
| `wabooks` | `#0060B9` purple | ✅ | ✅ |
| `wecafe` | `#E7450F` orange | ✅ | ✅ |

### Using tokens

```tsx
import { ThemeProvider, useTheme } from 'weloop-components';

// Wrap your app
<ThemeProvider defaultTheme="webill365" defaultMode="light">
  <App />
</ThemeProvider>

// Inside any component
const { tokens, setTheme, setColorMode } = useTheme();
const brandColor = tokens.color.bg.brand.primary;
```

### Direct token access (no provider)

```tsx
import { getTheme, wecafeLight, webill365Dark } from 'weloop-components';

const tokens = getTheme('wecafe', 'dark');
console.log(tokens.color.text.brand); // '#FFF5ED'
```

### Available token categories

```ts
tokens.color.bg.default              // page background
tokens.color.bg.surface.subtle       // card / panel background
tokens.color.bg.brand.primary        // brand fill color
tokens.color.bg.brand.subtle         // brand tint background
tokens.color.bg.feedback.error.solid // error state
tokens.color.text.default            // primary text
tokens.color.text.brand              // brand-colored text
tokens.color.text.subtle             // secondary text
tokens.color.border.default          // default border
tokens.color.border.brand            // brand border
tokens.shadow.brand.default          // brand box-shadow
```

---

## Quick Start

```bash
# Clone
git clone https://github.com/sumtaimo/WeLoop-Components.git
cd WeLoop-Components

# Install
npm install

# Run interactive showcase
npm run dev
```

---

## Usage in another project

Point directly to this GitHub repo (until the package is published to npm):

```bash
npm install github:sumtaimo/WeLoop-Components
```

Then import:

```tsx
import { ButtonSingle, ThemeProvider } from 'weloop-components';

export function App() {
  return (
    <ThemeProvider defaultTheme="webill365" defaultMode="light">
      <ButtonSingle buttonType="primary" variant="filled" size="md">
        Save
      </ButtonSingle>
    </ThemeProvider>
  );
}
```

---

## Interactive Showcase

The `/showcase` app lets you browse every component with a live **Token Inspector** panel on the right:

- Switch between **WeBill365 · WABOOKS · WeCafe** themes
- Toggle **Light ↔ Dark** mode
- See every design token value used by the component
- Copy token values to clipboard

```
npm run dev   →  http://localhost:5173
```

---

## Figma Source

**WeLoop 2.1 — Re-Update**  
`https://www.figma.com/design/cuzALpr4p7pTkkHe3HqUzF/WeLoop-2.1--Re-Update-`

Components verified against node `215:411` (Buttons & 버튼 page).
