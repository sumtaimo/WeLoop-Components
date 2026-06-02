import React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  defaultValue?: string;
  variant?: 'default' | 'flush';
  className?: string;
  style?: React.CSSProperties;
}

// ─── CSS injection ────────────────────────────────────────────────────────────

const ACCORDION_KEYFRAMES = `
@keyframes wl-accordion-open {
  from { height: 0; }
  to   { height: var(--radix-accordion-content-height); }
}
@keyframes wl-accordion-close {
  from { height: var(--radix-accordion-content-height); }
  to   { height: 0; }
}
.wl-accordion-content[data-state="open"] {
  animation: wl-accordion-open var(--motion-duration-normal, 200ms) ease-out;
}
.wl-accordion-content[data-state="closed"] {
  animation: wl-accordion-close var(--motion-duration-normal, 200ms) ease-out;
}
.wl-accordion-chevron {
  transition: transform var(--motion-duration-normal, 200ms) ease;
  flex-shrink: 0;
}
.wl-accordion-trigger[data-state="open"] .wl-accordion-chevron {
  transform: rotate(180deg);
}
`;

let accordionStyleInjected = false;
function injectAccordionStyles() {
  if (accordionStyleInjected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.textContent = ACCORDION_KEYFRAMES;
  document.head.appendChild(style);
  accordionStyleInjected = true;
}

// ─── Chevron icon ─────────────────────────────────────────────────────────────

function ChevronDown({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="wl-accordion-chevron"
      aria-hidden="true"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Accordion ────────────────────────────────────────────────────────────────

export function Accordion({
  items,
  type = 'single',
  defaultValue,
  variant = 'default',
  className,
  style,
}: AccordionProps) {
  injectAccordionStyles();

  const isDefault = variant === 'default';

  const rootStyle: React.CSSProperties = {
    width: '100%',
    borderRadius: isDefault ? 'var(--radius-lg, 12px)' : undefined,
    border: isDefault ? '1px solid var(--color-border-default, #E5E7EB)' : undefined,
    background: isDefault ? 'var(--color-bg-surface-default, #FFFFFF)' : undefined,
    overflow: 'hidden',
    fontFamily: 'Inter, sans-serif',
    ...style,
  };

  // Radix Root accepts either single or multiple, with differing prop shapes.
  const sharedRootProps = {
    className,
    style: rootStyle,
    defaultValue: type === 'single' ? defaultValue : (defaultValue ? [defaultValue] : undefined),
  };

  const itemElements = items.map((item, index) => (
    <AccordionItemEl
      key={item.id}
      item={item}
      isLast={index === items.length - 1}
      variant={variant}
    />
  ));

  if (type === 'multiple') {
    return (
      <RadixAccordion.Root type="multiple" {...sharedRootProps} defaultValue={defaultValue ? [defaultValue] : undefined}>
        {itemElements}
      </RadixAccordion.Root>
    );
  }

  return (
    <RadixAccordion.Root type="single" collapsible {...sharedRootProps} defaultValue={defaultValue}>
      {itemElements}
    </RadixAccordion.Root>
  );
}

// ─── Item ─────────────────────────────────────────────────────────────────────

interface AccordionItemElProps {
  item: AccordionItem;
  isLast: boolean;
  variant: 'default' | 'flush';
}

function AccordionItemEl({ item, isLast, variant }: AccordionItemElProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <RadixAccordion.Item
      value={item.id}
      disabled={item.disabled}
      onAnimationStart={() => {}}
      style={{
        borderBottom: isLast ? 'none' : '1px solid var(--color-border-default, #E5E7EB)',
        opacity: item.disabled ? 0.45 : 1,
      }}
    >
      <RadixAccordion.Header style={{ margin: 0 }}>
        <RadixAccordion.Trigger
          className="wl-accordion-trigger"
          data-wl-open={isOpen ? 'true' : undefined}
          onPointerDown={() => setIsOpen(prev => !prev)}
          style={{
            all: 'unset',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '14px 16px',
            cursor: item.disabled ? 'not-allowed' : 'pointer',
            boxSizing: 'border-box',
            userSelect: 'none',
            outline: 'none',
            background: 'transparent',
          }}
        >
          {/* Title — color via CSS data-state on parent trigger */}
          <TriggerTitle title={item.title} />
          <ChevronDown />
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>

      <RadixAccordion.Content
        className="wl-accordion-content"
        style={{ overflow: 'hidden' }}
      >
        <div
          style={{
            padding: '0 16px 16px',
            fontSize: 13,
            lineHeight: '20px',
            color: 'var(--color-text-subtle, #6B7280)',
          }}
        >
          {item.content}
        </div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
}

// ─── Trigger title — reads its own open state via closest [data-state] ────────

function TriggerTitle({ title }: { title: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Walk up to find the Radix trigger button which carries data-state
    const trigger = el.closest('[data-state]') as HTMLElement | null;
    if (!trigger) return;

    const observer = new MutationObserver(() => {
      setOpen(trigger.getAttribute('data-state') === 'open');
    });

    observer.observe(trigger, { attributes: true, attributeFilter: ['data-state'] });
    // sync initial value
    setOpen(trigger.getAttribute('data-state') === 'open');

    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      style={{
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '20px',
        color: open
          ? 'var(--color-text-brand, #1D32FF)'
          : 'var(--color-text-default, #111827)',
        transition: `color var(--motion-duration-normal, 200ms) ease`,
      }}
    >
      {title}
    </span>
  );
}
