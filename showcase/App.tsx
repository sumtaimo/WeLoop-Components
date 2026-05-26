import React, { useState } from "react";
import { Sidebar, type NavItem } from "./Sidebar";
import { ButtonSingleDemo } from "./demos/ButtonSingleDemo";
import { ButtonDropdownDemo } from "./demos/ButtonDropdownDemo";
import { ButtonSegmentDemo } from "./demos/ButtonSegmentDemo";
import { LinkDemo } from "./demos/LinkDemo";
import { PaymentBadgeDemo } from "./demos/PaymentBadgeDemo";
import { NotifBadgeDemo } from "./demos/NotifBadgeDemo";
import { DTopBarDemo } from "./demos/DTopBarDemo";
import { DBottomBarDemo } from "./demos/DBottomBarDemo";
import { AppBarDemo } from "./demos/AppBarDemo";
import { TitleNavBarDemo } from "./demos/TitleNavBarDemo";
import { DialogSettingBarDemo } from "./demos/DialogSettingBarDemo";
import { DashboardCardDemo } from "./demos/DashboardCardDemo";

const NAV: NavItem[] = [
  {
    section: "Atoms",
    items: [
      { id: "button-single",   label: "ButtonSingle" },
      { id: "button-dropdown", label: "ButtonDropdown" },
      { id: "button-segment",  label: "ButtonSegment" },
      { id: "link",            label: "Link" },
      { id: "payment-badge",   label: "PaymentBadge" },
      { id: "notif-badge",     label: "NotifBadge" },
    ],
  },
  {
    section: "Molecules",
    items: [
      { id: "dashboard-card", label: "DashboardCard" },
    ],
  },
  {
    section: "Organisms",
    items: [
      { id: "dtopbar",           label: "DTopBar" },
      { id: "dbottombar",        label: "DBottomBar" },
      { id: "appbar",            label: "AppBar" },
      { id: "titlenavbar",       label: "TitleNavBar" },
      { id: "dialogsettingbar",  label: "DialogSettingBar" },
    ],
  },
];

const DEMOS: Record<string, React.ReactNode> = {
  "button-single":   <ButtonSingleDemo />,
  "button-dropdown": <ButtonDropdownDemo />,
  "button-segment":  <ButtonSegmentDemo />,
  "link":            <LinkDemo />,
  "payment-badge":   <PaymentBadgeDemo />,
  "notif-badge":     <NotifBadgeDemo />,
  "dashboard-card":  <DashboardCardDemo />,
  "dtopbar":         <DTopBarDemo />,
  "dbottombar":      <DBottomBarDemo />,
  "appbar":          <AppBarDemo />,
  "titlenavbar":     <TitleNavBarDemo />,
  "dialogsettingbar":<DialogSettingBarDemo />,
};

export function App() {
  const [active, setActive] = useState("button-single");

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar nav={NAV} active={active} onChange={setActive} />
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "40px 48px",
          background: "#f9fafb",
        }}
      >
        {DEMOS[active] ?? <p style={{ color: "#a3a3a3" }}>Select a component.</p>}
      </main>
    </div>
  );
}
