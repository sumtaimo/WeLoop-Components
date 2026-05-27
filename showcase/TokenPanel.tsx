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
  'form-field': [
    { category: 'Background', name: 'default bg',            value: _ => '#FFFFFF' },
    { category: 'Background', name: 'disabled bg',           value: _ => '#F5F5F5' },
    { category: 'Border',     name: 'default',               value: _ => '#D1D5DB' },
    { category: 'Border',     name: 'focus',                 cssVar: '--color-border-brand', value: t => t.color.border.brand },
    { category: 'Border',     name: 'error',                 cssVar: '--color-border-danger', value: t => t.color.border.danger },
    { category: 'Border',     name: 'success',               value: _ => '#22C55E' },
    { category: 'Border',     name: 'disabled',              value: _ => '#E5E7EB' },
    { category: 'Shadow',     name: 'focus ring',            value: _ => '0 0 0 3px rgba(29,50,255,0.10)' },
    { category: 'Shadow',     name: 'error ring',            value: _ => '0 0 0 3px rgba(225,35,46,0.10)' },
    { category: 'Shadow',     name: 'success ring',          value: _ => '0 0 0 3px rgba(34,197,94,0.10)' },
    { category: 'Text',       name: 'value',                 value: _ => '#171717' },
    { category: 'Text',       name: 'placeholder',           value: _ => '#9CA3AF' },
    { category: 'Text',       name: 'disabled',              value: _ => '#A3A3A3' },
    { category: 'Text',       name: 'label',                 value: _ => '#171717' },
    { category: 'Text',       name: 'required asterisk',     cssVar: '--color-text-danger', value: t => t.color.text.danger },
    { category: 'Radius',     name: 'field',                 description: '8px', value: _ => '8px', isNumeric: true },
    { category: 'Size',       name: 'height single-line',    description: '36px', value: _ => '36px', isNumeric: true },
    { category: 'Size',       name: 'height textarea',       description: '72px', value: _ => '72px', isNumeric: true },
  ],
  'checkbox': [
    { category: 'Background', name: 'checked / indeterminate', cssVar: '--color-bg-brand-primary', value: t => t.color.bg.brand.primary },
    { category: 'Background', name: 'unchecked default',       value: _ => '#FFFFFF' },
    { category: 'Background', name: 'disabled filled',         value: _ => '#D4D4D4' },
    { category: 'Background', name: 'disabled unchecked',      value: _ => '#F5F5F5' },
    { category: 'Border',     name: 'default',                 value: _ => '#D4D4D4' },
    { category: 'Border',     name: 'hover',                   value: _ => '#A3A3A3' },
    { category: 'Border',     name: 'focus',                   cssVar: '--color-border-brand', value: t => t.color.border.brand },
    { category: 'Border',     name: 'disabled',                value: _ => '#E5E5E5' },
    { category: 'Shadow',     name: 'focus ring',              value: _ => '0 0 0 3px rgba(29,50,255,0.18)' },
    { category: 'Text',       name: 'label enabled',           value: _ => '#171717' },
    { category: 'Text',       name: 'label disabled',          value: _ => '#A3A3A3' },
    { category: 'Radius',     name: 'sm box',                  description: '4px',  value: _ => '4px',  isNumeric: true },
    { category: 'Radius',     name: 'lg box',                  description: '5px',  value: _ => '5px',  isNumeric: true },
    { category: 'Size',       name: 'sm',                      description: '16×16px', value: _ => '16px', isNumeric: true },
    { category: 'Size',       name: 'lg',                      description: '20×20px', value: _ => '20px', isNumeric: true },
  ],
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
  'datarow': [
    { category: 'Background', name: 'row default',           value: _ => '#FFFFFF' },
    { category: 'Background', name: 'row selected',          cssVar: '--color-bg-brand-subtle', value: t => t.color.bg.brand.subtle },
    { category: 'Background', name: 'row hover',             value: _ => '#F9FAFB' },
    { category: 'Background', name: 'status inProgress bg',  value: _ => '#EAF3FF' },
    { category: 'Background', name: 'status done bg',        value: _ => '#DCFCE7' },
    { category: 'Background', name: 'status pending bg',     value: _ => '#FEF9C3' },
    { category: 'Background', name: 'status cancelled bg',   value: _ => '#FFE1E3' },
    { category: 'Text',       name: 'cell default',          value: _ => '#171717' },
    { category: 'Text',       name: 'cell muted',            value: _ => '#9CA3AF' },
    { category: 'Text',       name: 'status inProgress',     cssVar: '--color-text-brand', value: t => t.color.text.brand },
    { category: 'Border',     name: 'cell divider',          value: _ => '#F0F0F0' },
    { category: 'Border',     name: 'row outline',           value: _ => '#E5E7EB' },
    { category: 'Border',     name: 'status inProgress',     value: _ => '#628AFF' },
    { category: 'Size',       name: 'row height',            description: '64px', value: _ => '64px', isNumeric: true },
    { category: 'Size',       name: 'header height',         description: '44px', value: _ => '44px', isNumeric: true },
    { category: 'Background', name: 'header bg',             value: _ => '#F9FAFB' },
    { category: 'Border',     name: 'notes input',           value: _ => '#E5E7EB' },
    { category: 'Spacing',    name: 'cell padding-x',        description: '12px', value: _ => '12px', isNumeric: true },
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

  'tooltip': [
    { category: 'Background', name: 'bubble',                value: _ => '#1E293B' },
    { category: 'Text',       name: 'content',               value: _ => '#F8FAFC' },
    { category: 'Text',       name: 'sparkle icon',          value: _ => '#94A3B8' },
    { category: 'Shadow',     name: 'bubble elevation',      value: _ => '0 4px 16px rgba(0,0,0,0.30), 0 1px 4px rgba(0,0,0,0.20)' },
    { category: 'Radius',     name: 'bubble',                description: '8px', value: _ => '8px',   isNumeric: true },
    { category: 'Spacing',    name: 'padding-y',             description: '7px',  value: _ => '7px',   isNumeric: true },
    { category: 'Spacing',    name: 'padding-x',             description: '12px', value: _ => '12px',  isNumeric: true },
    { category: 'Size',       name: 'max-width',             description: '280px', value: _ => '280px', isNumeric: true },
    { category: 'Size',       name: 'font-size',             description: '12px', value: _ => '12px',  isNumeric: true },
  ],

  'toggle': [
    { category: 'Background', name: 'track — off',            value: _ => '#D1D5DB' },
    { category: 'Background', name: 'track — on',             cssVar: '--color-bg-brand-primary', value: t => t.color.bg.brand.primary },
    { category: 'Background', name: 'track — disabled off',   value: _ => '#E5E7EB' },
    { category: 'Background', name: 'track — disabled on',    value: _ => '#9CA3AF' },
    { category: 'Background', name: 'thumb — default',        value: _ => '#FFFFFF' },
    { category: 'Background', name: 'thumb — disabled',       value: _ => '#F3F4F6' },
    { category: 'Text',       name: 'label — enabled',        value: _ => '#171717' },
    { category: 'Text',       name: 'label — disabled',       value: _ => '#A3A3A3' },
    { category: 'Shadow',     name: 'focus ring',             value: _ => '0 0 0 2px #FFFFFF, 0 0 0 4px #1D32FF' },
    { category: 'Shadow',     name: 'thumb elevation',        value: _ => '0 1px 3px rgba(0,0,0,0.20), 0 1px 2px rgba(0,0,0,0.12)' },
    { category: 'Radius',     name: 'track (pill)',           description: '999px', value: _ => '999px', isNumeric: true },
    { category: 'Size',       name: 'track sm',               description: '36×20px', value: _ => '20px', isNumeric: true },
    { category: 'Size',       name: 'track md',               description: '44×24px', value: _ => '24px', isNumeric: true },
    { category: 'Size',       name: 'thumb sm',               description: '14px dia', value: _ => '14px', isNumeric: true },
    { category: 'Size',       name: 'thumb md',               description: '18px dia', value: _ => '18px', isNumeric: true },
  ],

  'toast': [
    { category: 'Background', name: 'success',          value: _ => '#22C55E' },
    { category: 'Background', name: 'warning',          value: _ => '#F97316' },
    { category: 'Background', name: 'critical',         value: _ => '#EF4444' },
    { category: 'Background', name: 'information',      value: _ => '#1E293B' },
    { category: 'Text',       name: 'message',          value: _ => '#FFFFFF' },
    { category: 'Text',       name: 'close icon',       value: _ => 'rgba(255,255,255,0.85)' },
    { category: 'Border',     name: 'vertical divider', value: _ => 'rgba(255,255,255,0.30)' },
    { category: 'Shadow',     name: 'pill elevation',   value: _ => '0 4px 14px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.10)' },
    { category: 'Radius',     name: 'pill',             description: '999px', value: _ => '999px', isNumeric: true },
    { category: 'Size',       name: 'height',           description: '36px', value: _ => '36px',  isNumeric: true },
    { category: 'Size',       name: 'close button',     description: '36×36px', value: _ => '36px', isNumeric: true },
    { category: 'Size',       name: 'min-width',        description: '140px', value: _ => '140px', isNumeric: true },
    { category: 'Size',       name: 'max-width',        description: '320px', value: _ => '320px', isNumeric: true },
  ],

  'tabs': [
    { category: 'Background', name: 'box container',        value: _ => '#FFFFFF' },
    { category: 'Background', name: 'tab — selected',       value: _ => '#EEF1FF' },
    { category: 'Background', name: 'tab — hover',          value: _ => '#F3F4F6' },
    { category: 'Border',     name: 'box container',        value: _ => '#E5E7EB' },
    { category: 'Border',     name: 'line bar',             value: _ => '#E5E7EB' },
    { category: 'Border',     name: 'selected underline',   cssVar: '--color-border-brand', value: t => t.color.border.brand },
    { category: 'Text',       name: 'tab — selected',       cssVar: '--color-text-brand',   value: t => t.color.text.brand },
    { category: 'Text',       name: 'tab — default',        value: _ => '#6B7280' },
    { category: 'Text',       name: 'tab — hover',          value: _ => '#374151' },
    { category: 'Text',       name: 'tab — disabled',       value: _ => '#D1D5DB' },
    { category: 'Radius',     name: 'box container',        description: '10px', value: _ => '10px', isNumeric: true },
    { category: 'Radius',     name: 'tab trigger (box)',    description: '7px',  value: _ => '7px',  isNumeric: true },
    { category: 'Spacing',    name: 'box container padding',description: '5px 6px', value: _ => '5px', isNumeric: true },
    { category: 'Size',       name: 'line tab height',      description: '40px', value: _ => '40px', isNumeric: true },
  ],

  'snackbar': [
    { category: 'Background', name: 'success',              value: _ => '#22C55E' },
    { category: 'Background', name: 'warning',              value: _ => '#F97316' },
    { category: 'Background', name: 'critical',             value: _ => '#EF4444' },
    { category: 'Background', name: 'information',          value: _ => '#1E293B' },
    { category: 'Background', name: 'action button',        value: _ => 'rgba(255,255,255,0.12)' },
    { category: 'Text',       name: 'message',              value: _ => '#FFFFFF' },
    { category: 'Text',       name: 'action button label',  value: _ => '#FFFFFF' },
    { category: 'Border',     name: 'vertical divider',     value: _ => 'rgba(255,255,255,0.30)' },
    { category: 'Border',     name: 'action button outline',value: _ => 'rgba(255,255,255,0.55)' },
    { category: 'Shadow',     name: 'bar elevation',        value: _ => '0 4px 14px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.10)' },
    { category: 'Radius',     name: 'bar',                  description: '16px',  value: _ => '16px', isNumeric: true },
    { category: 'Radius',     name: 'action button',        description: '8px',   value: _ => '8px',  isNumeric: true },
    { category: 'Size',       name: 'bar height',           description: '48px',  value: _ => '48px', isNumeric: true },
    { category: 'Size',       name: 'action button height', description: '32px',  value: _ => '32px', isNumeric: true },
    { category: 'Size',       name: 'close button',         description: '48×48px', value: _ => '48px', isNumeric: true },
  ],

  'dialog': [
    { category: 'Background', name: 'overlay',              value: _ => 'rgba(0,0,0,0.45)' },
    { category: 'Background', name: 'card',                 value: _ => '#FFFFFF' },
    { category: 'Background', name: 'cancel btn — hover',   value: _ => '#F3F4F6' },
    { category: 'Background', name: 'action btn',           cssVar: '--color-bg-brand-primary', value: t => t.color.bg.brand.primary },
    { category: 'Background', name: 'action btn — hover',   value: _ => '#1527E0' },
    { category: 'Text',       name: 'title',                value: _ => '#111827' },
    { category: 'Text',       name: 'description',          value: _ => '#6B7280' },
    { category: 'Text',       name: 'cancel btn',           cssVar: '--color-text-brand',       value: t => t.color.text.brand },
    { category: 'Text',       name: 'action btn',           value: _ => '#FFFFFF' },
    { category: 'Text',       name: 'close icon',           value: _ => '#6B7280' },
    { category: 'Border',     name: 'footer divider',       value: _ => '#E5E7EB' },
    { category: 'Border',     name: 'list-row divider',     value: _ => '#F0F0F0' },
    { category: 'Shadow',     name: 'card elevation',       value: _ => '0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.10)' },
    { category: 'Radius',     name: 'card',                 description: '20px', value: _ => '20px', isNumeric: true },
    { category: 'Radius',     name: 'buttons',              description: '8px',  value: _ => '8px',  isNumeric: true },
    { category: 'Spacing',    name: 'body padding',         description: '28px 24px', value: _ => '28px', isNumeric: true },
    { category: 'Size',       name: 'simple / list width',  description: '406px', value: _ => '406px', isNumeric: true },
    { category: 'Size',       name: 'form width',           description: '520px', value: _ => '520px', isNumeric: true },
    { category: 'Size',       name: 'export width',         description: '740px', value: _ => '740px', isNumeric: true },
  ],

  'list-item': [
    { category: 'Background', name: 'circle icon container', value: _ => '#F9FAFB' },
    { category: 'Background', name: 'currency badge',        value: _ => '#FAFAFA' },
    { category: 'Text',       name: 'title',                 value: _ => '#111827' },
    { category: 'Text',       name: 'description',           value: _ => '#A3A3A3' },
    { category: 'Text',       name: 'count',                 value: _ => '#111827' },
    { category: 'Text',       name: 'label (uppercase)',     value: _ => '#A3A3A3' },
    { category: 'Text',       name: 'learn-more link',       cssVar: '--color-text-brand', value: t => t.color.text.brand },
    { category: 'Text',       name: 'chevron (minimal)',     value: _ => '#A3A3A3' },
    { category: 'Border',     name: 'circle icon',           value: _ => '#D1D5DB' },
    { category: 'Border',     name: 'currency badge',        value: _ => '#A3A3A3' },
    { category: 'Border',     name: 'row divider',           value: _ => '#F3F4F6' },
    { category: 'Background', name: 'dot indicator',         value: _ => '#EF4444' },
    { category: 'Radius',     name: 'circle icon',           description: '24px', value: _ => '24px',  isNumeric: true },
    { category: 'Radius',     name: 'currency badge',        description: '999px pill', value: _ => '999px', isNumeric: true },
    { category: 'Radius',     name: 'learn-more button',     description: '6px',  value: _ => '6px',   isNumeric: true },
    { category: 'Size',       name: 'circle icon',           description: '36×36px', value: _ => '36px', isNumeric: true },
    { category: 'Size',       name: 'dot indicator',         description: '8×8px', value: _ => '8px',  isNumeric: true },
    { category: 'Spacing',    name: 'item padding (notifi)', description: '12px 12px 12px 16px', value: _ => '16px', isNumeric: true },
    { category: 'Spacing',    name: 'item padding (minimal)',description: '12px 0', value: _ => '12px', isNumeric: true },
  ],

  'inline-tip': [
    { category: 'Background', name: 'icon — information',    value: _ => '#1F2937' },
    { category: 'Background', name: 'icon — danger',         value: _ => '#EF4444' },
    { category: 'Background', name: 'icon — suggestion',     value: _ => '#22C55E' },
    { category: 'Background', name: 'icon — warning',        value: _ => '#F97316' },
    { category: 'Background', name: 'card (filled)',         value: _ => '#FFFFFF' },
    { category: 'Text',       name: 'icon symbol',           value: _ => '#FFFFFF' },
    { category: 'Text',       name: 'title',                 value: _ => '#111827' },
    { category: 'Text',       name: 'description',           value: _ => '#A3A3A3' },
    { category: 'Text',       name: 'link prefix',           value: _ => '#374151' },
    { category: 'Text',       name: 'learn-more link',       cssVar: '--color-text-brand', value: t => t.color.text.brand },
    { category: 'Border',     name: 'card (filled)',         value: _ => '#D4D4D4' },
    { category: 'Radius',     name: 'card (filled)',         description: '16px', value: _ => '16px', isNumeric: true },
    { category: 'Radius',     name: 'icon circle',          description: '50%',  value: _ => '50%',  isNumeric: false },
    { category: 'Size',       name: 'icon circle',          description: '24×24px', value: _ => '24px', isNumeric: true },
    { category: 'Spacing',    name: 'card padding',         description: '16px', value: _ => '16px', isNumeric: true },
    { category: 'Spacing',    name: 'gap icon → content',   description: '10px', value: _ => '10px', isNumeric: true },
  ],

  'popover': [
    { category: 'Background', name: 'card',              value: _ => '#FFFFFF' },
    { category: 'Background', name: 'cancel btn — hover',value: _ => '#EEF1FF' },
    { category: 'Background', name: 'action btn — hover',value: _ => '#F9FAFB' },
    { category: 'Text',       name: 'title',             value: _ => '#111827' },
    { category: 'Text',       name: 'description',       value: _ => '#6B7280' },
    { category: 'Text',       name: 'cancel btn',        cssVar: '--color-text-brand', value: t => t.color.text.brand },
    { category: 'Text',       name: 'action btn',        value: _ => '#111827' },
    { category: 'Border',     name: 'card',              value: _ => '#E5E7EB' },
    { category: 'Border',     name: 'action btn',        value: _ => '#111827' },
    { category: 'Shadow',     name: 'card elevation',    value: _ => '0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)' },
    { category: 'Shadow',     name: 'arrow',             value: _ => 'drop-shadow(0 1px 1px rgba(0,0,0,0.08))' },
    { category: 'Radius',     name: 'card',              description: '14px', value: _ => '14px', isNumeric: true },
    { category: 'Radius',     name: 'buttons',           description: '8px',  value: _ => '8px',  isNumeric: true },
    { category: 'Size',       name: 'max-width',         description: '260px', value: _ => '260px', isNumeric: true },
    { category: 'Size',       name: 'button height',     description: '32px',  value: _ => '32px',  isNumeric: true },
    { category: 'Spacing',    name: 'card padding',      description: '16px 20px', value: _ => '16px', isNumeric: true },
    { category: 'Spacing',    name: 'gap icon → card',   description: '8px',  value: _ => '8px',  isNumeric: true },
  ],

  'empty-state': [
    { category: 'Background', name: 'no-results icon bg',        value: _ => '#F3F4F6' },
    { category: 'Background', name: 'failed-to-load icon bg',    value: _ => '#FEE2E2' },
    { category: 'Background', name: 'no-clients check circle bg',value: _ => '#DCFCE7' },
    { category: 'Background', name: 'no-clients inner circle',   value: _ => '#22C55E' },
    { category: 'Background', name: 'action btn — default',      value: _ => '#FFFFFF' },
    { category: 'Background', name: 'action btn — retry (filled)',value: _ => '#EF4444' },
    { category: 'Background', name: 'error page — primary btn',  cssVar: '--color-bg-brand-primary', value: t => t.color.bg.brand.primary },
    { category: 'Background', name: 'error steps panel',         value: _ => '#F9FAFB' },
    { category: 'Background', name: 'steps question icon',       value: _ => '#EEF1FF' },
    { category: 'Text',       name: 'title — neutral',           value: _ => '#374151' },
    { category: 'Text',       name: 'title — error',             value: _ => '#EF4444' },
    { category: 'Text',       name: 'title — success',           value: _ => '#22C55E' },
    { category: 'Text',       name: 'description',               value: _ => '#9CA3AF' },
    { category: 'Text',       name: 'error page title',          value: _ => '#111827' },
    { category: 'Text',       name: 'error page description',    value: _ => '#6B7280' },
    { category: 'Text',       name: 'error code',                value: _ => '#9CA3AF' },
    { category: 'Text',       name: 'contact link',              cssVar: '--color-text-brand', value: t => t.color.text.brand },
    { category: 'Text',       name: 'timestamp',                 value: _ => '#C4C4C4' },
    { category: 'Border',     name: 'action btn — outline',      value: _ => '#D1D5DB' },
    { category: 'Border',     name: 'error steps panel',         value: _ => '#E5E7EB' },
    { category: 'Radius',     name: 'action button',             description: '8px',  value: _ => '8px',  isNumeric: true },
    { category: 'Radius',     name: 'error steps panel',         description: '10px', value: _ => '10px', isNumeric: true },
    { category: 'Size',       name: 'inline icon',               description: '32×32px', value: _ => '32px', isNumeric: true },
    { category: 'Size',       name: 'action btn height',         description: '32px', value: _ => '32px',  isNumeric: true },
    { category: 'Size',       name: 'error page primary btn',    description: '36px', value: _ => '36px',  isNumeric: true },
  ],

  'file-upload': [
    { category: 'Background', name: 'card — normal',        value: _ => '#FFFFFF' },
    { category: 'Background', name: 'card — drag-over',     value: _ => '#EEF1FF' },
    { category: 'Background', name: 'card — disabled',      value: _ => '#F9FAFB' },
    { category: 'Background', name: 'upload badge',         cssVar: '--color-bg-brand-primary', value: t => t.color.bg.brand.primary },
    { category: 'Background', name: 'upload badge disabled',value: _ => '#9CA3AF' },
    { category: 'Background', name: 'excel icon — enabled', value: _ => '#FFFFFF' },
    { category: 'Background', name: 'excel green band',     value: _ => '#16A34A' },
    { category: 'Background', name: 'status error',         value: _ => '#EF4444' },
    { category: 'Background', name: 'status completed',     cssVar: '--color-bg-brand-primary', value: t => t.color.bg.brand.primary },
    { category: 'Text',       name: 'title — enabled',      value: _ => '#111827' },
    { category: 'Text',       name: 'title — disabled',     value: _ => '#9CA3AF' },
    { category: 'Text',       name: 'description — enabled',value: _ => '#6B7280' },
    { category: 'Text',       name: 'description — disabled',value: _ => '#C4C4C4' },
    { category: 'Text',       name: 'learn-more link',      cssVar: '--color-text-brand', value: t => t.color.text.brand },
    { category: 'Text',       name: 'filename',             value: _ => '#111827' },
    { category: 'Text',       name: 'file size',            value: _ => '#9CA3AF' },
    { category: 'Border',     name: 'card — normal (dashed)',value: _ => '#D4D4D4' },
    { category: 'Border',     name: 'card — hover (solid)', value: _ => '#D4D4D4' },
    { category: 'Border',     name: 'card — drag-over',     cssVar: '--color-border-brand', value: t => t.color.border.brand },
    { category: 'Border',     name: 'card — disabled',      value: _ => '#D1D5DB' },
    { category: 'Border',     name: 'file list container',  value: _ => '#E5E7EB' },
    { category: 'Border',     name: 'file list row divider',value: _ => '#F3F4F6' },
    { category: 'Border',     name: 'status default ring',  value: _ => '#D1D5DB' },
    { category: 'Border',     name: 'status processing track',value: _ => '#E5E7EB' },
    { category: 'Radius',     name: 'card',                 description: '10px', value: _ => '10px', isNumeric: true },
    { category: 'Radius',     name: 'file list container',  description: '10px', value: _ => '10px', isNumeric: true },
    { category: 'Radius',     name: 'upload badge',         description: '50%',  value: _ => '50%' },
    { category: 'Size',       name: 'card padding',         description: '20px 24px', value: _ => '20px', isNumeric: true },
    { category: 'Size',       name: 'excel icon (card)',    description: '44×52px', value: _ => '44px', isNumeric: true },
    { category: 'Size',       name: 'upload badge',         description: '28×28px', value: _ => '28px', isNumeric: true },
    { category: 'Size',       name: 'excel icon (list)',    description: '28×33px', value: _ => '28px', isNumeric: true },
    { category: 'Size',       name: 'status icon',          description: '24×24px', value: _ => '24px', isNumeric: true },
    { category: 'Size',       name: 'file list row height', description: '~48px', value: _ => '48px', isNumeric: true },
  ],

  'pagination': [
    { category: 'Background', name: 'page-size select',      value: _ => '#FFFFFF' },
    { category: 'Background', name: 'nav btn — hover',       value: _ => '#F3F4F6' },
    { category: 'Background', name: 'active page btn',       value: _ => '#FFFFFF' },
    { category: 'Text',       name: 'info / label text',     value: _ => '#111827' },
    { category: 'Text',       name: 'select value',          value: _ => '#111827' },
    { category: 'Text',       name: 'nav icon — default',    value: _ => '#374151' },
    { category: 'Text',       name: 'nav icon — disabled',   value: _ => '#D1D5DB' },
    { category: 'Text',       name: 'ellipsis',              value: _ => '#9CA3AF' },
    { category: 'Border',     name: 'page-size select',      value: _ => '#E5E5E5' },
    { category: 'Border',     name: 'active page btn',       value: _ => '#E5E7EB' },
    { category: 'Shadow',     name: 'page-size select',      value: _ => '0 0 0 0.5px #E5E5E5, 0 1px 1px rgba(0,0,0,0.06)' },
    { category: 'Shadow',     name: 'active page btn',       value: _ => '0 1px 2px rgba(0,0,0,0.08)' },
    { category: 'Radius',     name: 'page-size select',      description: '8px', value: _ => '8px', isNumeric: true },
    { category: 'Radius',     name: 'nav / page buttons',    description: '6px', value: _ => '6px', isNumeric: true },
    { category: 'Size',       name: 'nav / page button',     description: '28×28px', value: _ => '28px', isNumeric: true },
    { category: 'Size',       name: 'page-size select height',description: '32px', value: _ => '32px', isNumeric: true },
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

const PANEL_BG    = '#FAFAFA';
const PANEL_CARD  = '#F4F4F5';
const PANEL_DIVIDER = '#E4E4E7';
const PANEL_TXT   = '#18181B';
const PANEL_MUTED = '#71717A';
const PANEL_CAT   = '#A1A1AA';

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
                        border: `1px solid ${isLightColor(value) ? '#D4D4D8' : '#00000018'}`,
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
