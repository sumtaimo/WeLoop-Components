// ─── Primitive ramps (raw color values) ──────────────────────────────────────
export { primitives } from './primitives';
export type { PrimitiveColor } from './primitives';

// ─── Spacing, radius, stroke, size ───────────────────────────────────────────
export { spacingScale, radius, stroke, controlSize } from './spacing';
export type { Spacing, Radius, Stroke } from './spacing';

// ─── Typography ───────────────────────────────────────────────────────────────
export { fontFamily, fontSize, lineHeight, fontWeight, letterSpacing } from './typography';
export type { FontFamily, FontSize } from './typography';

// ─── Theme types ──────────────────────────────────────────────────────────────
export type { ThemeName, ColorMode, ThemeTokens, ColorTokens, FeedbackPair } from './types';

// ─── Theme token objects ──────────────────────────────────────────────────────
export { wabooksLight } from './themes/wabooks-light';
export { wabooksDark } from './themes/wabooks-dark';
export { webill365Light } from './themes/webill365-light';
export { webill365Dark } from './themes/webill365-dark';
export { wecafeLight } from './themes/wecafe-light';
export { wecafeDark } from './themes/wecafe-dark';

// ─── React ThemeContext ───────────────────────────────────────────────────────
export { getTheme, applyThemeToCSSVars, ThemeProvider, useTheme } from './context';

// ─── Custom theme utilities ───────────────────────────────────────────────────
export { createCustomTheme, createBrandTheme } from './createCustomTheme';

// ─── Legacy tokens (kept for backward compatibility with existing components) ─
export const colors = {
  primary: {
    50: '#EAF3FF', 100: '#D8E9FF', 200: '#B9D3FF', 300: '#8EB6FF',
    400: '#628AFF', 500: '#3E60FF', 600: '#1D32FF', 700: '#0F1FEA',
    800: '#1221C1', 900: '#182697', 950: '#0F1657',
  },
  neutral: {
    0: '#FFFFFF', 50: '#FAFAFA', 100: '#F5F5F5', 200: '#E5E5E5',
    300: '#D4D4D4', 400: '#A3A3A3', 500: '#737373', 600: '#525252',
    700: '#404040', 800: '#262626', 900: '#171717', 950: '#000000',
  },
  semantic: {
    success: '#22C55E', warning: '#F65F19', error: '#E1232E', info: '#3E60FF',
  },
} as const;

export const typography = {
  fontFamily: {
    sans: "'Inter', system-ui, -apple-system, sans-serif",
    khmer: "'Kantumruy Pro', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  fontSize: {
    xs: '12px', sm: '14px', base: '16px', lg: '18px', xl: '20px',
    '2xl': '24px', '3xl': '30px', '4xl': '36px',
  },
  fontWeight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  lineHeight: { tight: 1.25, snug: 1.375, normal: 1.5, relaxed: 1.625 },
} as const;

export const spacing = {
  0: '0px', 1: '4px', 2: '8px', 3: '12px', 4: '16px',
  5: '20px', 6: '24px', 8: '32px', 10: '40px', 12: '48px', 16: '64px',
} as const;

export const radii = {
  none: '0px', sm: '4px', md: '8px', lg: '12px', xl: '16px', full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

export const breakpoints = {
  sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px',
} as const;
