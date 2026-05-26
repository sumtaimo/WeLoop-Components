export const spacingScale = {
  micro: { 0: 0, 2: 2, 4: 4, 6: 6 },
  inset: { 8: 8, 10: 10, 12: 12, 16: 16 },
  stack: { 20: 20, 24: 24, 28: 28, 32: 32, 40: 40 },
  section: { 48: 48, 56: 56, 64: 64 },
  page: { 96: 96, 112: 112, 120: 120 },
} as const;

export const radius = {
  none: 0,
  xxs: 4,
  xs: 6,
  sm: 8,
  md: 10,
  lg: 16,
  xl: 20,
  full: 999,
} as const;

export const stroke = {
  none: 0,
  hairline: 0.5,
  thin: 1,
  'thin-hairline': 1.5,
  medium: 2,
  thick: 3,
} as const;

export const controlSize = {
  xxs: 20,
  xs: 24,
  sm: 28,
  md: 32,
  lg: 36,
  xl: 40,
  xxl: 44,
} as const;

export type Spacing = typeof spacingScale;
export type Radius = typeof radius;
export type Stroke = typeof stroke;
