import React from "react";
import { DBottomBar } from "../../src/components/organisms/AppNavigate";
import { DemoShell, DemoBlock } from "../DemoShell";

export function DBottomBarDemo() {
  return (
    <DemoShell
      title="DBottomBar"
      description="Dialog bottom bar (56px). Left: dropdown button + 'Learn more' link. Right: ghost + solid action buttons."
    >
      <DemoBlock label="Default">
        <DBottomBar />
      </DemoBlock>
      <DemoBlock label="Custom labels">
        <DBottomBar
          dropdownLabel="Export as"
          learnMoreLabel="Documentation"
          primaryLabel="Publish"
          secondaryLabel="Preview"
        />
      </DemoBlock>
    </DemoShell>
  );
}
