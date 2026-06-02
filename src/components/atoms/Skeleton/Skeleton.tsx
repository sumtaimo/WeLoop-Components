import React from 'react';

export interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect';
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
  style?: React.CSSProperties;
}

const SHIMMER_KEYFRAMES = `
@keyframes wl-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

let shimmerInjected = false;
function injectShimmer() {
  if (shimmerInjected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.textContent = SHIMMER_KEYFRAMES;
  document.head.appendChild(style);
  shimmerInjected = true;
}

export function Skeleton({
  variant = 'rect',
  width,
  height,
  borderRadius,
  className,
  style,
}: SkeletonProps) {
  injectShimmer();

  const defaultHeights: Record<string, number> = { text: 14, circle: 40, rect: 20 };
  const defaultRadii: Record<string, string> = {
    text: 'var(--radius-sm, 4px)',
    circle: 'var(--radius-full, 9999px)',
    rect: 'var(--radius-md, 8px)',
  };

  const resolvedHeight = height ?? defaultHeights[variant];
  const resolvedRadius = borderRadius ?? defaultRadii[variant];
  const resolvedWidth = variant === 'circle' ? (width ?? resolvedHeight) : (width ?? '100%');

  return (
    <span
      className={className}
      style={{
        display: 'block',
        width: resolvedWidth,
        height: resolvedHeight,
        borderRadius: resolvedRadius,
        background: 'linear-gradient(90deg, var(--color-bg-surface-emphasized, #E5E7EB) 25%, var(--color-bg-surface-subtle, #F3F4F6) 50%, var(--color-bg-surface-emphasized, #E5E7EB) 75%)',
        backgroundSize: '200% 100%',
        animation: `wl-shimmer var(--motion-duration-slower, 500ms) ease-in-out infinite`,
        flexShrink: 0,
        ...style,
      }}
    />
  );
}
