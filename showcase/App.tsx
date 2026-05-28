import React, { useState, useEffect } from "react";
import { Sidebar, type NavItem } from "./Sidebar";
import { TokenPanel } from "./TokenPanel";
import { ButtonSingleDemo } from "./demos/ButtonSingleDemo";
import { ButtonDropdownDemo } from "./demos/ButtonDropdownDemo";
import { ButtonSegmentDemo } from "./demos/ButtonSegmentDemo";
import { LinkDemo } from "./demos/LinkDemo";
import { PaymentBadgeDemo } from "./demos/PaymentBadgeDemo";
import { NotifBadgeDemo } from "./demos/NotifBadgeDemo";
import { DataRowDemo } from "./demos/DataRowDemo";
import { DTopBarDemo } from "./demos/DTopBarDemo";
import { DBottomBarDemo } from "./demos/DBottomBarDemo";
import { AppBarDemo } from "./demos/AppBarDemo";
import { TitleNavBarDemo } from "./demos/TitleNavBarDemo";
import { DialogSettingBarDemo } from "./demos/DialogSettingBarDemo";
import { DashboardCardDemo } from "./demos/DashboardCardDemo";
import { BannerDemo } from "./demos/BannerDemo";
import { AvatarDemo } from "./demos/AvatarDemo";
import { CheckboxDemo } from "./demos/CheckboxDemo";
import { FormFieldDemo } from "./demos/FormFieldDemo";
import { ChipDemo } from "./demos/ChipDemo";
import { TooltipDemo } from "./demos/TooltipDemo";
import { ToggleDemo } from "./demos/ToggleDemo";
import { DialogDemo } from "./demos/DialogDemo";
import { ToastDemo } from "./demos/ToastDemo";
import { TabsDemo } from "./demos/TabsDemo";
import { SnackbarDemo } from "./demos/SnackbarDemo";
import { ListItemDemo } from "./demos/ListItemDemo";
import { InlineTipDemo } from "./demos/InlineTipDemo";
import { PaginationDemo } from "./demos/PaginationDemo";
import { FileUploadDemo } from "./demos/FileUploadDemo";
import { PopoverDemo }    from "./demos/PopoverDemo";
import { EmptyStateDemo } from "./demos/EmptyStateDemo";
import { RadioDemo }        from "./demos/RadioDemo";
import { ProgressBarDemo }  from "./demos/ProgressBarDemo";
import { DatePickerDemo }   from "./demos/DatePickerDemo";
import { IconDemo }         from "./demos/IconDemo";
import { BankLogoDemo }     from "./demos/BankLogoDemo";
import { FlagDemo }         from "./demos/FlagDemo";
import { LogoDemo }         from "./demos/LogoDemo";
import { TokensPage }       from "./TokensPage";
import { OverviewPage }     from "./demos/OverviewPage";
import type { ThemeName, ColorMode } from "../src/tokens";
import {
  IconDashboard16, IconBolt, IconUser16, IconBag16, IconInfo16, IconCircle16,
  IconCheck16, IconDoc16, IconCursor16, IconCategory, IconArrow161, IconCard16,
  IconBell16, IconBell161, IconList16, IconCircle161, IconStar16, IconBanking16,
  IconFlag16, IconWarning16, IconGrid16, IconArrow16, IconAttach16, IconDate16,
  IconCell, IconDoc162, IconBuilding16, IconBuilding161, IconBuilding162,
  IconGear16, IconSearch16,
} from "../src/components/atoms/Icon/Icon";

const NAV: NavItem[] = [
  {
    section: "Home",
    items: [
      { id: "overview",      label: "Overview",      icon: <IconDashboard16 size={14} /> },
      { id: "design-tokens", label: "Design Tokens", icon: <IconBolt size={14} /> },
    ],
  },
  {
    section: "Atoms",
    items: [
      { id: "avatar",          label: "Avatar",         icon: <IconUser16 size={14} /> },
      { id: "chip",            label: "Chip",           icon: <IconBag16 size={14} /> },
      { id: "tooltip",         label: "Tooltip",        icon: <IconInfo16 size={14} /> },
      { id: "toggle",          label: "Toggle",         icon: <IconCircle16 size={14} /> },
      { id: "checkbox",        label: "Checkbox",       icon: <IconCheck16 size={14} /> },
      { id: "form-field",      label: "FormField",      icon: <IconDoc16 size={14} /> },
      { id: "button-single",   label: "ButtonSingle",   icon: <IconCursor16 size={14} /> },
      { id: "button-dropdown", label: "ButtonDropdown", icon: <IconCursor16 size={14} /> },
      { id: "button-segment",  label: "ButtonSegment",  icon: <IconCategory size={14} /> },
      { id: "link",            label: "Link",           icon: <IconArrow161 size={14} /> },
      { id: "payment-badge",   label: "PaymentBadge",   icon: <IconCard16 size={14} /> },
      { id: "notif-badge",     label: "NotifBadge",     icon: <IconBell16 size={14} /> },
      { id: "toast",           label: "Toast",          icon: <IconBell161 size={14} /> },
      { id: "tabs",            label: "Tabs",           icon: <IconGrid16 size={14} /> },
      { id: "snackbar",        label: "Snackbar",       icon: <IconBell161 size={14} /> },
      { id: "list-item",       label: "ListItem",       icon: <IconList16 size={14} /> },
      { id: "inline-tip",      label: "InlineTip",      icon: <IconInfo16 size={14} /> },
      { id: "radio",           label: "Radio",          icon: <IconCircle161 size={14} /> },
      { id: "progress-bar",    label: "ProgressBar",    icon: <IconBolt size={14} /> },
      { id: "icon",            label: "Icons",          icon: <IconStar16 size={14} /> },
      { id: "bank-logo",       label: "BankLogo",       icon: <IconBanking16 size={14} /> },
      { id: "flag",            label: "Flag",           icon: <IconFlag16 size={14} /> },
      { id: "logo",            label: "Logo",           icon: <IconStar16 size={14} /> },
    ],
  },
  {
    section: "Molecules",
    items: [
      { id: "banner",          label: "Banner",         icon: <IconWarning16 size={14} /> },
      { id: "dashboard-card",  label: "DashboardCard",  icon: <IconDashboard16 size={14} /> },
      { id: "pagination",      label: "Pagination",     icon: <IconArrow16 size={14} /> },
      { id: "file-upload",     label: "FileUpload",     icon: <IconAttach16 size={14} /> },
      { id: "popover",         label: "Popover",        icon: <IconInfo16 size={14} /> },
      { id: "date-picker",     label: "DatePicker",     icon: <IconDate16 size={14} /> },
    ],
  },
  {
    section: "Organisms",
    items: [
      { id: "datarow",          label: "DataTable",       icon: <IconCell size={14} /> },
      { id: "dialog",           label: "Dialog",          icon: <IconDoc162 size={14} /> },
      { id: "dtopbar",          label: "DTopBar",         icon: <IconBuilding16 size={14} /> },
      { id: "dbottombar",       label: "DBottomBar",      icon: <IconBuilding161 size={14} /> },
      { id: "appbar",           label: "AppBar",          icon: <IconBuilding162 size={14} /> },
      { id: "titlenavbar",      label: "TitleNavBar",     icon: <IconBuilding16 size={14} /> },
      { id: "dialogsettingbar", label: "DialogSettingBar",icon: <IconGear16 size={14} /> },
      { id: "empty-state",      label: "EmptyState",      icon: <IconSearch16 size={14} /> },
    ],
  },
];

function DemoContent({
  id,
  theme,
  mode,
  onNavigate,
}: {
  id: string;
  theme: ThemeName;
  mode: ColorMode;
  onNavigate: (id: string) => void;
}) {
  if (id === "overview") {
    return <OverviewPage onChange={onNavigate} />;
  }
  if (id === "design-tokens") {
    return <TokensPage themeName={theme} colorMode={mode} />;
  }
  const DEMOS: Record<string, React.ReactNode> = {
    "avatar":          <AvatarDemo />,
    "chip":            <ChipDemo />,
    "tooltip":         <TooltipDemo />,
    "toggle":          <ToggleDemo />,
    "checkbox":        <CheckboxDemo />,
    "form-field":      <FormFieldDemo />,
    "button-single":   <ButtonSingleDemo />,
    "button-dropdown": <ButtonDropdownDemo />,
    "button-segment":  <ButtonSegmentDemo />,
    "link":            <LinkDemo />,
    "payment-badge":   <PaymentBadgeDemo />,
    "notif-badge":     <NotifBadgeDemo />,
    "toast":           <ToastDemo />,
    "tabs":            <TabsDemo />,
    "snackbar":        <SnackbarDemo />,
    "list-item":       <ListItemDemo />,
    "inline-tip":      <InlineTipDemo />,
    "pagination":      <PaginationDemo />,
    "file-upload":     <FileUploadDemo />,
    "popover":         <PopoverDemo />,
    "empty-state":     <EmptyStateDemo />,
    "radio":           <RadioDemo />,
    "progress-bar":    <ProgressBarDemo />,
    "date-picker":     <DatePickerDemo />,
    "icon":            <IconDemo />,
    "bank-logo":       <BankLogoDemo />,
    "flag":            <FlagDemo />,
    "logo":            <LogoDemo />,
    "banner":          <BannerDemo />,
    "dashboard-card":  <DashboardCardDemo />,
    "datarow":         <DataRowDemo />,
    "dialog":          <DialogDemo />,
    "dtopbar":         <DTopBarDemo />,
    "dbottombar":      <DBottomBarDemo />,
    "appbar":          <AppBarDemo />,
    "titlenavbar":     <TitleNavBarDemo />,
    "dialogsettingbar":<DialogSettingBarDemo />,
  };
  return <>{DEMOS[id] ?? <p style={{ color: "#a3a3a3" }}>Select a component.</p>}</>;
}

const SHOWCASE_VARS: Record<ColorMode, Record<string, string>> = {
  light: {
    "--showcase-canvas-bg":    "#F9FAFB",
    "--showcase-shell-bg":     "#FFFFFF",
    "--showcase-shell-border": "#E5E5E5",
    "--showcase-title":        "#171717",
    "--showcase-text-subtle":  "#737373",
    "--showcase-label":        "#A3A3A3",
  },
  dark: {
    "--showcase-canvas-bg":    "#111827",
    "--showcase-shell-bg":     "#1E293B",
    "--showcase-shell-border": "rgba(255, 255, 255, 0.08)",
    "--showcase-title":        "#F1F5F9",
    "--showcase-text-subtle":  "rgba(255, 255, 255, 0.56)",
    "--showcase-label":        "#64748B",
  },
};

export function App() {
  const [active, setActive] = useState("overview");
  const [theme,  setTheme]  = useState<ThemeName>("webill365");
  const [mode,   setMode]   = useState<ColorMode>("light");

  useEffect(() => {
    const vars = SHOWCASE_VARS[mode];
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [mode]);

  const bgMain = `var(--showcase-canvas-bg, ${mode === "dark" ? "#111827" : "#F9FAFB"})`;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar
        nav={NAV}
        active={active}
        onChange={setActive}
        theme={theme}
        colorMode={mode}
        onThemeChange={setTheme}
        onModeChange={setMode}
      />

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "40px 48px",
          background: bgMain,
          transition: "background 0.2s",
        }}
      >
        <DemoContent id={active} theme={theme} mode={mode} onNavigate={setActive} />
      </main>

      {active !== "design-tokens" && active !== "overview" && (
        <TokenPanel
          componentId={active}
          themeName={theme}
          colorMode={mode}
          onThemeChange={setTheme}
          onModeChange={setMode}
        />
      )}
    </div>
  );
}
