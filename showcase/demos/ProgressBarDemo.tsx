import React, { useState, useEffect } from "react";
import { ProgressBar } from "../../src/components/atoms/ProgressBar/ProgressBar";
import { DemoShell, DemoRow } from "../DemoShell";

export function ProgressBarDemo() {
  const [liveVal, setLiveVal] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setLiveVal(v => v >= 100 ? 0 : v + 2), 80);
    return () => clearInterval(id);
  }, []);

  return (
    <DemoShell
      title="ProgressBar"
      description="Horizontal progress bar. Variants: loading, fail, complete. Sizes: md (8px) and sm (2px)."
      category="atom"
      importCode={`import { ProgressBar } from 'weloop-components';`}
    >
      <DemoRow label="Variants — md (8px)" fullWidth>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 480 }}>
          <ProgressBar variant="loading"  value={60}  label="Loading"  progressText="60%" />
          <ProgressBar variant="fail"     value={40}  label="Failed"   progressText="Failed at 40%" />
          <ProgressBar variant="complete" value={100} label="Complete" progressText="Done!" />
        </div>
      </DemoRow>

      <DemoRow label="sm (2px track)" fullWidth>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 480 }}>
          <ProgressBar variant="loading"  value={70}  size="sm" />
          <ProgressBar variant="fail"     value={30}  size="sm" />
          <ProgressBar variant="complete" value={100} size="sm" />
        </div>
      </DemoRow>

      <DemoRow label="With max + unit (auto text)" fullWidth>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 480 }}>
          <ProgressBar variant="loading" value={54} max={200} unit=" MB" label="Uploading file" required />
          <ProgressBar variant="loading" value={20} max={100} unit="%" label="Syncing data" />
        </div>
      </DemoRow>

      <DemoRow label="Animated" fullWidth>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 480 }}>
          <ProgressBar variant="loading" value={liveVal} label="Live upload" progressText={`${liveVal}%`} />
        </div>
      </DemoRow>

      <DemoRow label="Edge cases" fullWidth>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 480 }}>
          <ProgressBar variant="loading" value={0}   label="0%" />
          <ProgressBar variant="loading" value={1}   label="1%" progressText="Just started" />
          <ProgressBar variant="loading" value={100} label="100%" progressText="Full" />
        </div>
      </DemoRow>
    </DemoShell>
  );
}
