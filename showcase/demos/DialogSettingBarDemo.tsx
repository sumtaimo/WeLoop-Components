import React from "react";
import { DialogSettingBar } from "../../src/components/organisms/AppNavigate";
import { DemoShell, DemoBlock } from "../DemoShell";

export function DialogSettingBarDemo() {
  return (
    <DemoShell
      title="DialogSettingBar"
      description="Settings dialog nav bar (48px). Left: back/forward arrows + title. Right: close (X) button."
    >
      <DemoBlock label="Default">
        <DialogSettingBar title="Account Settings" />
      </DemoBlock>
      <DemoBlock label="Custom title">
        <DialogSettingBar title="Notification Preferences" />
      </DemoBlock>
    </DemoShell>
  );
}
