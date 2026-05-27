import React from 'react';
import { wabooksLight, wabooksDark, webill365Light, webill365Dark, wecafeLight, wecafeDark } from '../src/tokens';
import type { ThemeName, ColorMode, ThemeTokens } from '../src/tokens';
import { radius as radiusScale, spacingScale } from '../src/tokens';

// ─── Token map: which tokens does each component use? ──────────────────────────
export interface TokenEntry {
  category: string;
  name: string;
  cssVar?: string;
  description?: string;
  value: (t: ThemeTokens) => string;
  isNumeric?: boolean;
}

export const COMPONENT_TOKENS: Record<string, TokenEntry[]> = {
  'avatar': [
    { category: 'Background', name: 'surface.default (ring types)', value: _ => '#F9FAFB' },
    { category: 'Background', name: 'surface.disabled (fill types)', value: _ => '#E5E5E5' },
    { category: 'Border',     name: 'border-selected-onselected',   value: _ => '#9CA3AF' },
    { category: 'Text',       name: 'text-default-secondary',       value: _ => '#A3A3A3' },
    { category: 'Radius',     name: 'full (circular)',              value: _ => '9999px', isNumeric: true },
    { category: 'Size',       name: 'sm',   description: '20×20px', value: _ => '20px', isNumeric: true },
    { category: 'Size',       name: 'md',   description: '24×24px', value: _ => '24px', isNumeric: true },
    { category: 'Size',       name: 'lg',   description: '32×32px', value: _ => '32px', isNumeric: true },
  ],
  'button-single': [
    { category: 'Background', name: 'brand.primary',      cssVar: '--color-bg-brand-primary',    value: t => t.color.bg.brand.primary },
    { category: 'Background', name: 'brand.subtle',       cssVar: '--color-bg-brand-subtle',     value: t => t.color.bg.brand.subtle },
    { category: 'Background', name: 'brand.subtle-hover', cssVar: '--color-bg-brand-subtle-hover', value: t => t.color.bg.brand.subtleHover },
    { category: 'Background', name: 'danger.default',     cssVar: '--color-bg-danger-default',   value: t => t.color.bg.danger.default },
    { category: 'Background', name: 'surface.disabled',   cssVar: '--color-bg-surface-disabled', value: t => t.color.bg.surface.disabled },
    { category: 'Text',       name: 'on-bg-primary',      cssVar: '--color-text-on-bg-primary',  value: t => t.color.text.onBgPrimary },
    { category: 'Text',       name: 'brand',              cssVar: '--color-text-brand',          value: t => t.color.text.brand },
    { category: 'Text',       name: 'danger',             cssVar: '--color-text-danger',         value: t => t.color.text.danger },
    { category: 'Text',       name: 'disabled',           cssVar: '--color-text-disabled',       value: t => t.color.text.disabled },
    { category: 'Border',     name: 'brand',              cssVar: '--color-border-brand',        value: t => t.color.border.brand },
    { category: 'Border',     name: 'emphasized',         cssVar: '--color-border-emphasized',   value: t => t.color.border.emphasized },
    { category: 'Border',     name: 'danger',             cssVar: '--color-border-danger',       value: t => t.color.border.danger },
    { category: 'Radius',     name: 'md',                 description: 'Button radius',         value: _ => '10px', isNumeric: true },
    { category: 'Spacing',    name: 'inset-8',            description: 'XS padding',            value: _ => '8px',  isNumeric: true },
    { category: 'Spacing',    name: 'inset-10',           description: 'SM padding',            value: _ => '10px', isNumeric: true },
    { category: 'Spacing',    name: 'inset-12',           description: 'MD padding',            value: _ => '12px', isNumeric: true },
    { category: 'Shadow',     name: 'brand.default',      cssVar: '--shadow-brand-default',     value: t => t.shadow.brand.default },
  ],
  'button-dropdown': [
    { category: 'Background', name: 'brand.primary',   value: t => t.color.bg.brand.primary },
    { category: 'Background', name: 'brand.subtle',    value: t => t.color.bg.brand.subtle },
    { category: 'Background', name: 'danger.default',  value: t => t.color.bg.danger.default },
    { category: 'Text',       name: 'on-bg-primary',   value: t => t.color.text.onBgPrimary },
    { category: 'Text',       name: 'brand',           value: t => t.color.text.brand },
    { category: 'Border',     name: 'brand',           value: t => t.color.border.brand },
    { category: 'Border',     name: 'default',         value: t => t.color.border.default },
    { category: 'Radius',     name: 'md',              description: '10px', value: _ => '10px', isNumeric: true },
  ],
  'button-segment': [
    { category: 'Background', name: 'brand.primary',     value: t => t.color.bg.brand.primary },
    { category: 'Background', name: 'brand.contrast',    value: t => t.color.bg.brand.contrast },
    { category: 'Background', name: 'surface.default',   value: t => t.color.bg.surface.default },
    { category: 'Text',       name: 'brand',             value: t => t.color.text.brand },
    { category: 'Text',       name: 'on-bg-primary',     value: t => t.color.text.onBgPrimary },
    { category: 'Text',       name: 'subtle',            value: t => t.color.text.subtle },
    { category: 'Radius',     name: 'full',              description: '999px pill', value: _ => '999px', isNumeric: true },
  ],
  'link': [
    { category: 'Text', name: 'brand',    value: t => t.color.text.brand },
    { category: 'Text', name: 'default',  value: t => t.color.text.default },
    { category: 'Text', name: 'subtle',   value: t => t.color.text.subtle },
    { category: 'Text', name: 'danger',   value: t => t.color.text.danger },
    { category: 'Text', name: 'disabled', value: t => t.color.text.disabled },
  ],
  'payment-badge': [
    { category: 'Background', name: 'feedback.success.solid',  value: t => t.color.bg.feedback.success.solid },
    { category: 'Background', name: 'feedback.success.subtle', value: t => t.color.bg.feedback.success.subtle },
    { category: 'Background', name: 'feedback.error.solid',    value: t => t.color.bg.feedback.error.solid },
    { category: 'Background', name: 'feedback.error.subtle',   value: t => t.color.bg.feedback.error.subtle },
    { category: 'Background', name: 'feedback.warning.solid',  value: t => t.color.bg.feedback.warning.solid },
    { category: 'Background', name: 'feedback.warning.subtle', value: t => t.color.bg.feedback.warning.subtle },
    { category: 'Background', name: 'feedback.caution.solid',  value: t => t.color.bg.feedback.caution.solid },
    { category: 'Background', name: 'feedback.caution.subtle', value: t => t.color.bg.feedback.caution.subtle },
    { category: 'Background', name: 'feedback.neutral.solid',  value: t => t.color.bg.feedback.neutral.solid },
    { category: 'Background', name: 'feedback.neutral.subtle', value: t => t.color.bg.feedback.neutral.surface },
    { category: 'Background', name: 'feedback.info.solid',     value: t => t.color.bg.feedback.info.solid },
    { category: 'Background', name: 'feedback.info.subtle',    value: t => t.color.bg.feedback.info.subtle },
    { category: 'Radius',     name: 'full',                    description: '999px pill', value: _ => '999px', isNumeric: true },
  ],
  'notif-badge': [
    { category: 'Background', name: 'brand.primary',          value: t => t.color.bg.brand.primary },
    { category: 'Background', name: 'feedback.error.solid',   value: t => t.color.bg.feedback.error.solid },
    { category: 'Background', name: 'surface.subtle',         value: t => t.color.bg.surface.subtle },
    { category: 'Text',       name: 'on-bg-primary',          value: t => t.color.text.onBgPrimary },
    { category: 'Text',       name: 'default',                value: t => t.color.text.default },
    { category: 'Radius',     name: 'full',                   description: '999px pill', value: _ => '999px', isNumeric: true },
  ],
  'banner': [
    { category: 'Background', name: 'information bg',       value: _ => '#D8E9FF' },
    { category: 'Background', name: 'success bg',           value: _ => '#22C55E' },
    { category: 'Background', name: 'warning bg',           value: _ => '#F65F19' },
    { category: 'Background', name: 'critical bg',          value: _ => '#E1232E' },
    { category: 'Background', name: 'actionable bg',        value: _ => '#EAB308' },
    { category: 'Background', name: 'multi-actionable bg',  value: _ => '#FEF9C3' },
    { category: 'Background', name: 'multi-critical bg',    value: _ => '#FFE1E3' },
    { category: 'Background', name: 'multi-warning bg',     value: _ => '#FDCFAB' },
    { category: 'Text',       name: 'information text',     value: _ => '#1D32FF' },
    { category: 'Text',       name: 'success text',         value: _ => '#F0FDF4' },
    { category: 'Text',       name: 'warning text',         value: _ => '#FEE9D6' },
    { category: 'Text',       name: 'critical text',        value: _ => '#FEF2F3' },
    { category: 'Text',       name: 'actionable text',      value: _ => '#FEF9C3' },
    { category: 'Text',       name: 'multi-actionable text',value: _ => '#CA8A04' },
    { category: 'Text',       name: 'multi-warning text',   value: _ => '#BF310F' },
    { category: 'Border',     name: 'info close-separator', value: _ => '#628AFF' },
    { category: 'Border',     name: 'success close-sep',    value: _ => '#16A34A' },
    { category: 'Border',     name: 'warning close-sep',    value: _ => '#BF310F' },
    { category: 'Border',     name: 'multi-action accent',  value: _ => '#EAB308' },
    { category: 'Border',     name: 'multi-critical accent',value: _ => '#FC6D75' },
    { category: 'Radius',     name: 'md',                   description: '10px', value: _ => '10px', isNumeric: true },
    { category: 'Spacing',    name: 'single-line height',   description: '48px', value: _ => '48px', isNumeric: true },
    { category: 'Spacing',    name: 'horizontal padding',   description: '16px', value: _ => '16px', isNumeric: true },
  ],
  'dashboard-card': [
    { category: 'Background', name: 'default',          value: t => t.color.bg.default },
    { category: 'Background', name: 'surface.default',  value: t => t.color.bg.surface.default },
    { category: 'Background', name: 'surface.subtle',   value: t => t.color.bg.surface.subtle },
    { category: 'Background', name: 'brand.primary',    value: t => t.color.bg.brand.primary },
    { category: 'Background', name: 'brand.subtle',     value: t => t.color.bg.brand.subtle },
    { category: 'Background', name: 'danger.default',   value: t => t.color.bg.danger.default },
    { category: 'Text',       name: 'default',          value: t => t.color.text.default },
    { category: 'Text',       name: 'subtle',           value: t => t.color.text.subtle },
    { category: 'Text',       name: 'brand',            value: t => t.color.text.brand },
    { category: 'Text',       name: 'on-bg-primary',    value: t => t.color.text.onBgPrimary },
    { category: 'Border',     name: 'default',          value: t => t.color.border.default },
    { category: 'Border',     name: 'brand',            value: t => t.color.border.brand },
    { category: 'Shadow',     name: 'brand.default',    value: t => t.shadow.brand.default },
    { category: 'Radius',     name: 'lg',               description: '16px card', value: _ => '16px', isNumeric: true },
    { category: 'Spacing',    name: 'inset-16',         description: 'Card padding', value: _ => '16px', isNumeric: true },
  ],
  'dtopbar': [
    { category: 'Background', name: 'surface.default',  value: t => t.color.bg.surface.default },
    { category: 'Background', name: 'brand.primary',    value: t => t.color.bg.brand.primary },
    { category: 'Text',       name: 'default',          value: t => t.color.text.default },
    { category: 'Text',       name: 'brand',            value: t => t.color.text.brand },
    { category: 'Text',       name: 'on-bg-primary',    value: t => t.color.text.onBgPrimary },
    { category: 'Border',     name: 'default',          value: t => t.color.border.default },
    { category: 'Shadow',     name: 'brand.sm',         value: t => t.shadow.brand.sm },
    { category: 'Radius',     name: 'none',             description: 'No radius', value: _ => '0px', isNumeric: true },
  ],
  'dbottombar': [
    { category: 'Background', name: 'surface.default',  value: t => t.color.bg.surface.default },
    { category: 'Background', name: 'brand.primary',    value: t => t.color.bg.brand.primary },
    { category: 'Text',       name: 'default',          value: t => t.color.text.default },
    { category: 'Text',       name: 'brand',            value: t => t.color.text.brand },
    { category: 'Border',     name: 'default',          value: t => t.color.border.default },
    { category: 'Radius',     name: 'none',             description: 'No radius', value: _ => '0px', isNumeric: true },
  ],
  'appbar': [
    { category: 'Background', name: 'brand.primary',    value: t => t.color.bg.brand.primary },
    { category: 'Background', name: 'surface.default',  value: t => t.color.bg.surface.default },
    { category: 'Text',       name: 'on-bg-primary',    value: t => t.color.text.onBgPrimary },
    { category: 'Text',       name: 'default',          value: t => t.color.text.default },
    { category: 'Text',       name: 'subtle',           value: t => t.color.text.subtle },
    { category: 'Border',     name: 'default',          value: t => t.color.border.default },
  ],
  'titlenavbar': [
    { category: 'Background', name: 'surface.default',  value: t => t.color.bg.surface.default },
    { category: 'Text',       name: 'default',          value: t => t.color.text.default },
    { category: 'Text',       name: 'brand',            value: t => t.color.text.brand },
    { category: 'Border',     name: 'default',          value: t => t.color.border.default },
    { category: 'Radius',     name: 'md',               description: 'Icon buttons', value: _ => '10px', isNumeric: true },
  ],
  'dialogsettingbar': [
    { category: 'Background', name: 'surface.default',  value: t => t.color.bg.surface.default },
    { category: 'Background', name: 'surface.subtle',   value: t => t.color.bg.surface.subtle },
    { category: 'Background', name: 'brand.primary',    value: t => t.color.bg.brand.primary },
    { category: 'Text',       name: 'default',          value: t => t.color.text.default },
    { category: 'Text',       name: 'brand',            value: t => t.color.text.brand },
    { category: 'Border',     name: 'default',          value: t => t.color.border.default },
    { category: 'Radius',     name: 'lg',               description: 'Dialog radius', value: _ => '16px', isNumeric: true },
  ],
};

// ─── helpers ──────────────────────────────────────────────────────────────────
function isLightColor(hex: string): boolean {
  if (hex.startsWith('rgba') || hex.startsWith('rgb')) {
    const match = hex.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return true;
    const [, r, g, b] = match.map(Number);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128;
  }
  if (!hex.startsWith('#') || hex.length < 7) return true;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

const themeMap: Record<ThemeName, Record<ColorMode, ThemeTokens>> = {
  wabooks:   { light: wabooksLight,   dark: wabooksDark   },
  webill365: { light: webill365Light, dark: webill365Dark },
  wecafe:    { light: wecafeLight,    dark: wecafeDark    },
};

// ─── TokenPanel ──────────────────────────────────────────────────────────────
interface TokenPanelProps {
  componentId: string;
  themeName: ThemeName;
  colorMode: ColorMode;
  onThemeChange: (t: ThemeName) => void;
  onModeChange: (m: ColorMode) => void;
}

const PANEL_BG    = '#0F172A';
const PANEL_CARD  = '#1E293B';
const PANEL_DIVIDER = '#334155';
const PANEL_TXT   = '#E2E8F0';
const PANEL_MUTED = '#94A3B8';
const PANEL_CAT   = '#64748B';

export function TokenPanel({ componentId, themeName, colorMode, onThemeChange, onModeChange }: TokenPanelProps) {
  const tokens   = themeMap[themeName][colorMode];
  const entries  = COMPONENT_TOKENS[componentId] ?? [];

  const categories = Array.from(new Set(entries.map(e => e.category)));

  return (
    <aside
      style={{
        width: 280,
        minWidth: 280,
        height: '100%',
        overflowY: 'auto',
        background: PANEL_BG,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ padding: '20px 16px 16px', borderBottom: `1px solid ${PANEL_DIVIDER}` }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: PANEL_CAT, marginBottom: 12 }}>
          Design Tokens
        </div>

        {/* Theme switcher */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 500, color: PANEL_CAT, marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Theme
          </div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {([
              { id: 'webill365', label: 'WeBill365' },
              { id: 'wabooks',   label: 'WABOOKS'   },
              { id: 'wecafe',    label: 'WeCafe'    },
            ] as { id: ThemeName; label: string }[]).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => onThemeChange(id)}
                style={{
                  flex: '1 1 60px',
                  padding: '5px 4px',
                  fontSize: 10,
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  background: themeName === id ? tokens.color.bg.brand.primary : PANEL_CARD,
                  color: themeName === id ? tokens.color.text.onBgPrimary : PANEL_MUTED,
                  transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Mode switcher */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 500, color: PANEL_CAT, marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Mode
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['light', 'dark'] as ColorMode[]).map(m => (
              <button
                key={m}
                onClick={() => onModeChange(m)}
                style={{
                  flex: 1,
                  padding: '5px 0',
                  fontSize: 11,
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  background: colorMode === m ? PANEL_DIVIDER : PANEL_CARD,
                  color: colorMode === m ? PANEL_TXT : PANEL_MUTED,
                  transition: 'all 0.15s',
                }}
              >
                {m === 'light' ? '☀ Light' : '☾ Dark'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Token list */}
      <div style={{ flex: 1, padding: '12px 0' }}>
        {entries.length === 0 ? (
          <p style={{ color: PANEL_MUTED, fontSize: 12, padding: '8px 16px' }}>No tokens mapped for this component.</p>
        ) : (
          categories.map((cat, ci) => (
            <div key={cat} style={{ marginBottom: ci < categories.length - 1 ? 0 : 0 }}>
              {/* Category header */}
              <div style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: PANEL_CAT,
                padding: '10px 16px 5px',
              }}>
                {cat}
              </div>

              {entries.filter(e => e.category === cat).map((entry, i) => {
                const value = entry.value(tokens);
                const isColor = !entry.isNumeric && !value.startsWith('0 ');
                const isShadow = value.includes('px') && value.includes('rgba');

                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '7px 16px',
                      cursor: 'default',
                    }}
                    title={`${entry.cssVar ?? entry.name}: ${value}`}
                  >
                    {/* Swatch / chip */}
                    {isShadow ? (
                      <div style={{
                        width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                        background: PANEL_CARD,
                        boxShadow: value,
                        border: `1px solid ${PANEL_DIVIDER}`,
                      }} />
                    ) : isColor ? (
                      <div style={{
                        width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                        background: value,
                        border: `1px solid ${isLightColor(value) ? '#33415540' : '#ffffff18'}`,
                        boxSizing: 'border-box',
                      }} />
                    ) : (
                      <div style={{
                        width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                        background: PANEL_CARD,
                        border: `1px solid ${PANEL_DIVIDER}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 9,
                        fontWeight: 600,
                        color: PANEL_MUTED,
                        letterSpacing: '-0.02em',
                      }}>
                        {value.replace('px', '')}
                      </div>
                    )}

                    {/* Name + value */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: PANEL_TXT,
                        lineHeight: '14px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {entry.name}
                      </div>
                      <div style={{
                        fontSize: 10,
                        color: PANEL_MUTED,
                        lineHeight: '14px',
                        marginTop: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                      }}>
                        {isShadow ? 'box-shadow …' : entry.description ?? value}
                      </div>
                    </div>

                    {/* Copy button */}
                    <CopyButton value={value} />
                  </div>
                );
              })}

              {ci < categories.length - 1 && (
                <div style={{ height: 1, background: PANEL_DIVIDER, margin: '6px 16px' }} />
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer: theme identity */}
      <div style={{
        padding: '12px 16px',
        borderTop: `1px solid ${PANEL_DIVIDER}`,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <div style={{
          width: 12, height: 12, borderRadius: 3,
          background: tokens.color.bg.brand.primary,
          flexShrink: 0,
        }} />
        <div>
          <div style={{ fontSize: 11, color: PANEL_TXT, fontWeight: 500 }}>
            {themeName === 'webill365' ? 'WeBill365' : themeName === 'wabooks' ? 'WABOOKS TA' : 'WeCafe'}
          </div>
          <div style={{ fontSize: 10, color: PANEL_MUTED, fontFamily: 'monospace' }}>
            {tokens.color.bg.brand.primary} · {colorMode}
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Tiny copy-to-clipboard button ───────────────────────────────────────────
function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };
  return (
    <button
      onClick={copy}
      title="Copy value"
      style={{
        width: 22,
        height: 22,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        background: copied ? '#22c55e22' : 'transparent',
        color: copied ? '#22c55e' : PANEL_CAT,
        fontSize: 11,
        transition: 'all 0.12s',
        padding: 0,
      }}
    >
      {copied ? '✓' : '⎘'}
    </button>
  );
}
