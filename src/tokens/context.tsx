import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ThemeTokens, ThemeName, ColorMode } from './types';
import { wabooksLight } from './themes/wabooks-light';
import { wabooksDark } from './themes/wabooks-dark';
import { webill365Light } from './themes/webill365-light';
import { webill365Dark } from './themes/webill365-dark';
import { wecafeLight } from './themes/wecafe-light';
import { wecafeDark } from './themes/wecafe-dark';

const themeMap: Record<ThemeName, Record<ColorMode, ThemeTokens>> = {
  wabooks: { light: wabooksLight, dark: wabooksDark },
  webill365: { light: webill365Light, dark: webill365Dark },
  wecafe: { light: wecafeLight, dark: wecafeDark },
};

export function getTheme(name: ThemeName, mode: ColorMode): ThemeTokens {
  return themeMap[name][mode];
}

export function applyThemeToCSSVars(tokens: ThemeTokens, root: HTMLElement = document.documentElement): void {
  const { color } = tokens;

  const vars: Record<string, string> = {
    '--color-bg-default': color.bg.default,
    '--color-bg-surface-default': color.bg.surface.default,
    '--color-bg-surface-subtle': color.bg.surface.subtle,
    '--color-bg-surface-ghost': color.bg.surface.ghost,
    '--color-bg-surface-emphasized': color.bg.surface.emphasized,
    '--color-bg-surface-inverse': color.bg.surface.inverse,
    '--color-bg-surface-disabled': color.bg.surface.disabled,
    '--color-bg-brand-primary': color.bg.brand.primary,
    '--color-bg-brand-subtle': color.bg.brand.subtle,
    '--color-bg-brand-subtle-hover': color.bg.brand.subtleHover,
    '--color-bg-brand-subtle-press': color.bg.brand.subtlePress,
    '--color-bg-brand-contrast': color.bg.brand.contrast,
    '--color-bg-danger-default': color.bg.danger.default,
    '--color-bg-danger-subtle': color.bg.danger.subtle,
    '--color-bg-danger-subtle-hover': color.bg.danger.subtleHover,
    '--color-text-default': color.text.default,
    '--color-text-on-bg-primary': color.text.onBgPrimary,
    '--color-text-subtle': color.text.subtle,
    '--color-text-brand': color.text.brand,
    '--color-text-disabled': color.text.disabled,
    '--color-text-inverse': color.text.inverse,
    '--color-text-danger': color.text.danger,
    '--color-text-success': color.text.success,
    '--color-text-warning': color.text.warning,
    '--color-border-default': color.border.default,
    '--color-border-brand': color.border.brand,
    '--color-border-subtle': color.border.subtle,
    '--color-border-strong': color.border.strong,
    '--color-border-danger': color.border.danger,
    '--color-border-success': color.border.success,
    '--color-border-disabled': color.border.disabled,
    '--color-border-emphasized': color.border.emphasized,
    '--shadow-brand-default': tokens.shadow.brand.default,
    '--shadow-brand-sm': tokens.shadow.brand.sm,
    '--shadow-brand-md': tokens.shadow.brand.md,
  };

  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  root.setAttribute('data-theme', tokens.name);
  root.setAttribute('data-color-mode', tokens.mode);
}

interface ThemeContextValue {
  tokens: ThemeTokens;
  themeName: ThemeName;
  colorMode: ColorMode;
  setTheme: (name: ThemeName) => void;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  defaultMode?: ColorMode;
  applyToCSSVars?: boolean;
  /**
   * Fully-resolved custom tokens from `createCustomTheme()` or `createBrandTheme()`.
   * When provided, overrides `defaultTheme`/`defaultMode` as the active token set.
   * Theme-switching via `setTheme` / `setColorMode` still works and will override this.
   */
  customTokens?: ThemeTokens;
}

export function ThemeProvider({
  children,
  defaultTheme = 'webill365',
  defaultMode = 'light',
  applyToCSSVars = true,
  customTokens,
}: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);
  const [colorMode, setColorModeState] = useState<ColorMode>(defaultMode);
  // If customTokens is provided and no runtime switch has happened yet, use it as the base
  const [hasUserSwitched, setHasUserSwitchedState] = useState(false);

  const resolvedTokens = hasUserSwitched || !customTokens
    ? getTheme(themeName, colorMode)
    : customTokens;

  const tokens = resolvedTokens;

  useEffect(() => {
    if (applyToCSSVars) applyThemeToCSSVars(tokens);
  }, [tokens, applyToCSSVars]);

  const setTheme = useCallback((name: ThemeName) => {
    setThemeName(name);
    setHasUserSwitchedState(true);
  }, []);
  const setColorMode = useCallback((mode: ColorMode) => {
    setColorModeState(mode);
    setHasUserSwitchedState(true);
  }, []);
  const toggleColorMode = useCallback(
    () => setColorModeState(m => (m === 'light' ? 'dark' : 'light')),
    []
  );

  return (
    <ThemeContext.Provider value={{ tokens, themeName, colorMode, setTheme, setColorMode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
