import React from "react";
import { Skeleton } from "../../src/components/atoms/Skeleton";
import { DemoShell, DemoRow } from "../DemoShell";

export function SkeletonDemo() {
  return (
    <DemoShell
      title="Skeleton"
      category="atom"
      description="Animated shimmer placeholder used while content is loading. Three variants: text, circle, and rect. Compose multiple skeletons to replicate real UI shapes."
      importCode={`import { Skeleton } from 'weloop-components';`}
    >

      {/* ── Text variant ── */}
      <DemoRow
        label="Text variant — 3 lines at different widths"
        code={`<Skeleton variant="text" width="100%" />
<Skeleton variant="text" width="80%" />
<Skeleton variant="text" width="60%" />`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 400 }}>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </div>
      </DemoRow>

      {/* ── Circle variant ── */}
      <DemoRow
        label="Circle variant — sizes 24, 32, 40"
        code={`<Skeleton variant="circle" width={24} height={24} />
<Skeleton variant="circle" width={32} height={32} />
<Skeleton variant="circle" width={40} height={40} />`}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Skeleton variant="circle" width={24} height={24} />
          <Skeleton variant="circle" width={32} height={32} />
          <Skeleton variant="circle" width={40} height={40} />
        </div>
      </DemoRow>

      {/* ── Rect variant ── */}
      <DemoRow
        label="Rect variant — card and button shapes"
        code={`{/* Card shape */}
<Skeleton variant="rect" width={260} height={160} />

{/* Button shape */}
<Skeleton variant="rect" width={120} height={36} />

{/* Wide banner shape */}
<Skeleton variant="rect" width="100%" height={64} />`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 400 }}>
          <Skeleton variant="rect" width={260} height={160} />
          <Skeleton variant="rect" width={120} height={36} />
          <Skeleton variant="rect" width="100%" height={64} />
        </div>
      </DemoRow>

      {/* ── Realistic loading card ── */}
      <DemoRow
        label="Realistic loading card — multiple skeletons composed"
        code={`{/* Avatar + two text lines (list item) */}
<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
  <Skeleton variant="circle" width={40} height={40} />
  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="40%" />
  </div>
</div>

{/* Card body */}
<Skeleton variant="rect" width="100%" height={140} />

{/* Footer text + button */}
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <Skeleton variant="text" width="35%" />
  <Skeleton variant="rect" width={88} height={32} />
</div>`}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            padding: 20,
            borderRadius: 12,
            border: "1px solid var(--showcase-shell-border, #E5E5E5)",
            background: "var(--showcase-canvas-bg, #F9FAFB)",
            width: "100%",
            maxWidth: 400,
            boxSizing: "border-box",
          }}
        >
          {/* Header row: avatar + two text lines */}
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Skeleton variant="circle" width={40} height={40} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </div>
          </div>

          {/* Image placeholder */}
          <Skeleton variant="rect" width="100%" height={140} />

          {/* Three body lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="70%" />
          </div>

          {/* Footer: short label + action button */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Skeleton variant="text" width="35%" />
            <Skeleton variant="rect" width={88} height={32} />
          </div>
        </div>
      </DemoRow>

    </DemoShell>
  );
}
