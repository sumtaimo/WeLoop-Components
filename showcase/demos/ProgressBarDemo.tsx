import React, { useState, useEffect } from "react";
import { ProgressBar } from "../../src/components/atoms/ProgressBar/ProgressBar";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 480 }}>
        {children}
      </div>
    </div>
  );
}

export function ProgressBarDemo() {
  const [liveVal, setLiveVal] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setLiveVal(v => v >= 100 ? 0 : v + 2), 80);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", padding: 8 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 4 }}>ProgressBar</h2>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 32 }}>
        Horizontal progress bar. Variants: loading, fail, complete. Sizes: md (8px) and sm (2px).
      </p>

      <Section title="Variants — md (8px)">
        <ProgressBar variant="loading"  value={60}  label="Loading"   progressText="60%" />
        <ProgressBar variant="fail"     value={40}  label="Failed"    progressText="Failed at 40%" />
        <ProgressBar variant="complete" value={100} label="Complete"  progressText="Done!" />
      </Section>

      <Section title="sm (2px track)">
        <ProgressBar variant="loading"  value={70}  size="sm" />
        <ProgressBar variant="fail"     value={30}  size="sm" />
        <ProgressBar variant="complete" value={100} size="sm" />
      </Section>

      <Section title="With max + unit (auto text)">
        <ProgressBar variant="loading" value={54} max={200} unit=" MB" label="Uploading file" required />
        <ProgressBar variant="loading" value={20} max={100} unit="%" label="Syncing data" />
      </Section>

      <Section title="Animated">
        <ProgressBar variant="loading" value={liveVal} label="Live upload" progressText={`${liveVal}%`} />
      </Section>

      <Section title="Edge cases">
        <ProgressBar variant="loading" value={0}   label="0%" />
        <ProgressBar variant="loading" value={1}   label="1%" progressText="Just started" />
        <ProgressBar variant="loading" value={100} label="100%" progressText="Full" />
      </Section>
    </div>
  );
}
