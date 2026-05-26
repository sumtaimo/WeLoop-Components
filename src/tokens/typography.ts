export const fontFamily = {
  latin: 'Inter, ui-sans-serif, system-ui, sans-serif',
  khmer: "'Kantumruy Pro', sans-serif",
  korean: "'Noto Sans KR', sans-serif",
} as const;

export const fontSize = {
  display: { lg: 64, md: 52, sm: 44 },
  headline: { lg: 42, md: 40, sm: 36 },
  title: { lg: 24, md: 20, sm: 16 },
  body: { lg: 20, md: 16, sm: 14 },
  button: { md: 18, sm: 14, xs: 12 },
  meta: { caption: 12, label: 11, helper: 10 },
} as const;

export const lineHeight = {
  display: { lg: 80, md: 72, sm: 64 },
  headline: { lg: 56, md: 48, sm: 44 },
  title: { lg: 32, md: 28, sm: 24 },
  body: { lg: 28, md: 24, sm: 20 },
  button: { md: 24, sm: 20, xs: 16 },
  meta: { caption: 16, label: 16, helper: 14 },
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const letterSpacing = {
  tight: '-0.02em',
  normal: '0em',
  wide: '0.02em',
  wider: '0.04em',
} as const;

export type FontFamily = typeof fontFamily;
export type FontSize = typeof fontSize;
