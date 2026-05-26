import React from "react";
import { Link } from "../../src/components/atoms/Link";
import { DemoShell, DemoRow } from "../DemoShell";

export function LinkDemo() {
  return (
    <DemoShell
      title="Link"
      description="Inline text link with optional trailing chevron. Renders as <a> when href is provided, otherwise <button>."
    >
      <DemoRow label="With trailing icon">
        <Link label="Learn more" showTrailIcon />
        <Link label="View details" href="#" showTrailIcon />
      </DemoRow>
      <DemoRow label="Without icon">
        <Link label="See all" showTrailIcon={false} />
      </DemoRow>
      <DemoRow label="Disabled">
        <Link label="Unavailable" disabled />
      </DemoRow>
    </DemoShell>
  );
}
