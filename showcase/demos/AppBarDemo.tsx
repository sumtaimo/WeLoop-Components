import React from "react";
import { AppBar } from "../../src/components/organisms/AppNavigate";
import { DemoShell, DemoBlock } from "../DemoShell";

export function AppBarDemo() {
  return (
    <DemoShell
      title="AppBar"
      description="Application top bar (48px). Right side: points badge, bell notification, avatar."
    >
      <DemoBlock label="Default">
        <AppBar />
      </DemoBlock>
      <DemoBlock label="With high notification count">
        <AppBar points="2400P" notificationCount="12" />
      </DemoBlock>
      <DemoBlock label="No notifications">
        <AppBar points="0P" notificationCount="0" />
      </DemoBlock>
    </DemoShell>
  );
}
