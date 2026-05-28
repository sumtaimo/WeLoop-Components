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

const NAV: NavItem[] = [
  {
    section: "Home",
    items: [
      { id: "overview",      label: "Overview" },
      { id: "design-tokens", label: "Design Tokens" },
    ],
  },
  {
    section: "Atoms",
    items: [
      { id: "avatar",          label: "Avatar" },
      { id: "chip",            label: "Chip" },
      { id: "tooltip",         label: "Tooltip" },
      { id: "toggle",          label: "Toggle" },
      { id: "checkbox",        label: "Checkbox" },
      { id: "form-field",      label: "FormField" },
      { id: "button-single",   label: "ButtonSingle" },
      { id: "button-dropdown", label: "ButtonDropdown" },
      { id: "button-segment",  label: "ButtonSegment" },
      { id: "link",            label: "Link" },
      { id: "payment-badge",   label: "PaymentBadge" },
      { id: "notif-badge",     label: "NotifBadge" },
      { id: "toast",           label: "Toast" },
      { id: "tabs",            label: "Tabs" },
      { id: "snackbar",        label: "Snackbar" },
      { id: "list-item",       label: "ListItem" },
      { id: "inline-tip",      label: "InlineTip" },
      { id: "radio",           label: "Radio" },
      { id: "progress-bar",    label: "ProgressBar" },
      { id: "icon",            label: "Icons" },
      { id: "bank-logo",       label: "BankLogo" },
      { id: "flag",            label: "Flag" },
      { id: "logo",            label: "Logo" },
    ],
  },
  {
    section: "Molecules",
    items: [
      { id: "banner",        label: "Banner" },
      { id: "dashboard-card", label: "DashboardCard" },
      { id: "pagination",    label: "Pagination" },
      { id: "file-upload",   label: "FileUpload" },
      { id: "popover",       label: "Popover" },
      { id: "date-picker",   label: "DatePicker" },
    ],
  },
  {
    section: "Organisms",
    items: [
      { id: "datarow",           label: "DataTable" },
      { id: "dialog",            label: "Dialog" },
      { id: "dtopbar",           label: "DTopBar" },
      { id: "dbottombar",        label: "DBottomBar" },
      { id: "appbar",            label: "AppBar" },
      { id: "titlenavbar",       label: "TitleNavBar" },
      { id: "dialogsettingbar",  label: "DialogSettingBar" },
      { id: "empty-state",       label: "EmptyState" },
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
