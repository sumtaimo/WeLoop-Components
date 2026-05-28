import React, { useState } from "react";
import { DemoShell } from "../DemoShell";
import * as Icons from "../../src/components/atoms/Icon/Icon";
import type { IconProps } from "../../src/components/atoms/Icon/Icon";

type IconComponent = React.ComponentType<IconProps>;

// ─── Category map ─────────────────────────────────────────────────────────────
// Each entry: [componentName, displayLabel]

const CATEGORIES: { label: string; emoji: string; icons: string[] }[] = [
  {
    label: "Arrows & Direction",
    emoji: "↗",
    icons: [
      "IconArrow16","IconArrow161","IconArrow162","IconArrow163","IconArrow164",
      "IconArrow165","IconArrow166","IconArrow167","IconArrow168","IconArrow169",
      "IconArrow1610","IconArrow1611","IconArrow1612","IconArrow1613","IconArrow1614",
      "IconArrow1615","IconArrow1616","IconArrow1617","IconArrow1618","IconArrow1619",
      "IconArrow1620","IconArrow1621","IconArrow1622","IconArrow1623",
      "IconChevron16","IconChevron161","IconChevron162","IconChevron163","IconChevron164",
      "IconChevron165","IconChevron166","IconChevron167","IconChevron168","IconChevron169",
      "IconDown16","IconMove16",
    ],
  },
  {
    label: "Actions",
    emoji: "⚡",
    icons: [
      "IconAdd","IconPlus","IconPlus16","IconPlus161","IconPlusminus16","IconPlusminus161",
      "IconMinus16","IconMinus161","IconClose16","IconClose161","IconClose162",
      "IconCheck","IconCheck16","IconCheck161","IconSearch16","IconSearch161","IconSearch162",
      "IconFilter16","IconCopy16","IconPen16","IconPen161","IconDrag16","IconRoll16",
      "IconRestart16","IconSave","IconSave16","IconSave161","IconScissor16","IconTrash16",
      "IconTrash161","IconTrash162","IconWand16","IconLink16",
    ],
  },
  {
    label: "Navigation & Layout",
    emoji: "⊞",
    icons: [
      "IconGrid16","IconGrid161","IconGrid162","IconGrip416","IconGrip616",
      "IconList16","IconList161","IconCategory","IconCategory1","IconCategory2",
      "IconCategory3","IconCategory4","IconSidebar16","IconHash16","IconWindow16",
      "IconCell","IconDashboard16","IconSlider",
    ],
  },
  {
    label: "Commerce & Finance",
    emoji: "💳",
    icons: [
      "IconBag16","IconBag161","IconBag162","IconBag163","IconBag164","IconBag165",
      "IconBag166","IconBag167","IconBasket","IconCart16","IconCart161",
      "IconCard16","IconCard161","IconCard162","IconCurrency16","IconCurrency161",
      "IconCurrency162","IconCurrency163","IconDollar","IconPercent16","IconPercent161",
      "IconPig","IconRiels","IconBanking16","IconMastercard","IconVisa",
    ],
  },
  {
    label: "Communication",
    emoji: "💬",
    icons: [
      "IconMail16","IconMail161","IconMail162","IconMail163","IconAt16",
      "IconMessage16","IconMessage161","IconMessage162","IconMessage163",
      "IconCall","IconMic16","IconMicrophone16","IconMicrophone161",
      "IconNotification","IconBell16","IconBell161","IconPaperplan16","IconInbox16",
      "IconInbox161","IconInbox162","IconInbox163",
    ],
  },
  {
    label: "Files & Documents",
    emoji: "📄",
    icons: [
      "IconDoc16","IconDoc161","IconDoc162","IconDoc163","IconDoc164","IconDoc165",
      "IconDoc166","IconDoc167","IconDoc168","IconDoc169","IconFile","IconFile1",
      "IconFile2","IconFile3","IconFile4","IconFile5","IconFile6","IconFolder16",
      "IconAttach16","IconClipboard16","IconDraft","IconNote16","IconSticky",
      "IconSticky1","IconSticky2","IconSticky3","IconSticky4","IconSticky5",
      "IconQuote16","IconBook16","IconSignature16","IconText16",
    ],
  },
  {
    label: "Media",
    emoji: "🎬",
    icons: [
      "IconCamera16","IconImage16","IconImage161","IconImage162","IconVideo",
      "IconVideo16","IconMedia16","IconMedia161","IconMedia162","IconFlashOn",
      "IconFlashOff","IconPallette16",
    ],
  },
  {
    label: "People & Identity",
    emoji: "👤",
    icons: [
      "IconUser16","IconUser161","IconUser162","IconUser163","IconUser164",
      "IconUser165","IconUser166","IconContacts","IconFaceid16","IconFinger16",
      "IconAvatar",
    ],
  },
  {
    label: "Security",
    emoji: "🔐",
    icons: [
      "IconKeylock16","IconKeylock161","IconKeylock162","IconKeylock163",
      "IconKeylock164","IconKeylock165","IconShield16","IconShield161",
      "IconShield162","IconShield163","IconPass","IconLogin",
    ],
  },
  {
    label: "Devices & Platform",
    emoji: "💻",
    icons: [
      "IconDevice16","IconDevice161","IconDevice162","IconDevice163","IconDevice164",
      "IconDevice165","IconDevice166","IconCloud","IconCommand16","IconController16",
      "IconCursor16","IconNetwork16","IconWifi","IconWindow16","IconCar16",
    ],
  },
  {
    label: "Location & Map",
    emoji: "📍",
    icons: [
      "IconLocation16","IconMap16","IconPin16","IconGlobal16","IconGlobal161",
      "IconFlag16","IconFlag161",
    ],
  },
  {
    label: "Time & Calendar",
    emoji: "🕐",
    icons: [
      "IconClock16","IconClock161","IconClock162","IconDate16","IconDate161","IconDate162",
    ],
  },
  {
    label: "Analytics & Data",
    emoji: "📊",
    icons: [
      "IconGraph16","IconPie16","IconBarcode16","IconBarcode161","IconStack16",
      "IconStack161","IconStack162","IconStack163","IconStack164","IconLoading",
      "IconLoading16","IconSplash16",
    ],
  },
  {
    label: "Status & Feedback",
    emoji: "⚠",
    icons: [
      "IconWarning","IconWarning16","IconWarning161","IconWarning162","IconWarning163",
      "IconInfo16","IconHelp16","IconHelp161","IconUrgent16","IconNosign16",
      "IconPartial","IconReddot","IconCheck","IconApproval","IconBolt",
    ],
  },
  {
    label: "Shapes & Objects",
    emoji: "◯",
    icons: [
      "IconCircle16","IconCircle161","IconCircle162","IconCircle163","IconCircle164",
      "IconCircle165","IconStar","IconStar16","IconBall16","IconBall161",
      "IconBuilding16","IconBuilding161","IconBuilding162","IconCube16","IconCylinder16",
      "IconEclipse16","IconRay16","IconRay161","IconRay162","IconLamp16",
      "IconEnergy","IconInfinity","IconBolt",
    ],
  },
  {
    label: "Social & Dev",
    emoji: "🔗",
    icons: [
      "IconFacebook","IconLinkedin","IconGithub","IconTelegram","IconZalo",
      "IconMessenger","IconReactJs","IconReactJsEx","IconJavascript",
    ],
  },
  {
    label: "Brand & App Logos",
    emoji: "🏷",
    icons: [
      "IconCaminv","IconAPIs","IconAba","IconBakong","IconFigma","IconExcel",
      "IconKhqr","IconPpcb","IconLogoPPCB","IconLogoWeBill365","IconShinhan",
      "IconShinhanlogo","IconWabooks","IconWebcash","IconWebcashGroup",
      "IconWebcashVietnam","IconWebill365","IconWebill365small","IconNew",
    ],
  },
  {
    label: "Miscellaneous",
    emoji: "✦",
    icons: [
      "IconAlphabet16","IconAsterisk16","IconChampion16","IconDislike16",
      "IconEqual","IconGift16","IconGift161","IconHammer16","IconHandpointing",
      "IconHash16","IconHeart16","IconItem","IconLike16","IconMug16","IconMug161",
      "IconMugFilled16","IconNumber16","IconPurpose","IconQrcode16",
      "IconQuestionmark","IconTag16","IconWand16","IconDollar","IconRiels",
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const ALL_ICONS = Object.entries(Icons).filter(
  ([key]) => key.startsWith("Icon") && key !== "IconProps"
) as [string, IconComponent][];

const ICON_MAP = Object.fromEntries(ALL_ICONS) as Record<string, IconComponent>;

const SIZES = [16, 20, 24, 32] as const;
const COLORS = [
  { label: "Default",  value: "#171717" },
  { label: "Brand",    value: "#1D32FF" },
  { label: "Success",  value: "#16A34A" },
  { label: "Warning",  value: "#F65F19" },
  { label: "Danger",   value: "#E1232E" },
  { label: "Muted",    value: "#9CA3AF" },
];

export function IconDemo() {
  const [search,       setSearch]       = useState("");
  const [size,         setSize]         = useState<number>(24);
  const [colorIndex,   setColorIndex]   = useState(0);
  const [openCats,     setOpenCats]     = useState<Set<string>>(
    new Set(["Arrows & Direction", "Actions"])
  );

  const activeColor = COLORS[colorIndex].value;
  const searchLc    = search.toLowerCase();

  // Flatten all icons for search mode
  const allWithCat = CATEGORIES.flatMap(cat =>
    cat.icons
      .filter(name => ICON_MAP[name])
      .map(name => ({ name, cat: cat.label }))
  );

  const isSearching  = searchLc.length > 0;
  const searchResult = isSearching
    ? allWithCat.filter(({ name }) =>
        name.toLowerCase().replace("icon", "").includes(searchLc)
      )
    : [];

  const totalUnique = new Set(CATEGORIES.flatMap(c => c.icons).filter(n => ICON_MAP[n])).size;

  function toggleCat(label: string) {
    setOpenCats(prev => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  function expandAll() { setOpenCats(new Set(CATEGORIES.map(c => c.label))); }
  function collapseAll() { setOpenCats(new Set()); }

  return (
    <div>
      {/* ─── Page header ─────────────────────────────────── */}
      <h1 style={{
        fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 22,
        letterSpacing: "-0.4px", color: "var(--showcase-title, #171717)", marginBottom: 6,
      }}>
        Icons
      </h1>
      <p style={{
        fontFamily: "Inter, sans-serif", fontSize: 14, lineHeight: "22px",
        color: "var(--showcase-text-subtle, #737373)", marginBottom: 24, maxWidth: 540,
      }}>
        {totalUnique} tree-shakeable components across {CATEGORIES.length} categories.
        Monochrome icons follow <code style={{ fontFamily: "monospace", fontSize: 12 }}>currentColor</code>
        ; brand icons keep their fills.
      </p>

      {/* ─── Controls bar ────────────────────────────────── */}
      <div style={{
        display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap",
        padding: "12px 16px",
        background: "var(--showcase-shell-bg, #fff)",
        border: "1px solid var(--showcase-shell-border, #E5E5E5)",
        borderRadius: 12, marginBottom: 24,
      }}>
        {/* Search */}
        <input
          type="text"
          placeholder="Search icons…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            fontFamily: "Inter, sans-serif", fontSize: 13,
            padding: "7px 12px", borderRadius: 8, outline: "none",
            border: "1px solid var(--showcase-shell-border, #E5E5E5)",
            background: "var(--showcase-canvas-bg, #F9FAFB)",
            color: "var(--showcase-title, #171717)",
            width: 200,
          }}
        />

        {/* Size */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--showcase-label, #A3A3A3)", fontWeight: 500 }}>
            SIZE
          </span>
          {SIZES.map(s => (
            <button key={s} onClick={() => setSize(s)} style={{
              fontFamily: "Inter, sans-serif", fontSize: 12,
              padding: "4px 10px", borderRadius: 6, cursor: "pointer",
              border: "1px solid var(--showcase-shell-border, #E5E5E5)",
              background: size === s ? "#1D32FF" : "var(--showcase-canvas-bg, #F9FAFB)",
              color: size === s ? "#fff" : "var(--showcase-title, #171717)",
              fontWeight: size === s ? 600 : 400, transition: "all 0.1s",
            }}>{s}</button>
          ))}
        </div>

        {/* Color */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--showcase-label, #A3A3A3)", fontWeight: 500 }}>
            COLOR
          </span>
          {COLORS.map((c, i) => (
            <button key={c.label} onClick={() => setColorIndex(i)} title={c.label} style={{
              width: 22, height: 22, borderRadius: "50%", background: c.value,
              border: colorIndex === i ? "2px solid #1D32FF" : "2px solid transparent",
              outline: colorIndex === i ? "2px solid rgba(29,50,255,0.3)" : "none",
              outlineOffset: 1, cursor: "pointer", padding: 0,
            }} />
          ))}
        </div>

        {/* Expand/collapse all */}
        {!isSearching && (
          <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            <button onClick={expandAll} style={ctrlBtn}>Expand all</button>
            <button onClick={collapseAll} style={ctrlBtn}>Collapse all</button>
          </div>
        )}
      </div>

      {/* ─── Search results ──────────────────────────────── */}
      {isSearching && (
        <div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--showcase-label, #A3A3A3)", marginBottom: 10 }}>
            {searchResult.length} result{searchResult.length !== 1 ? "s" : ""} for "{search}"
          </p>
          <IconGrid icons={searchResult.map(r => r.name)} size={size} color={activeColor} />
        </div>
      )}

      {/* ─── Category sections ───────────────────────────── */}
      {!isSearching && CATEGORIES.map(cat => {
        const available = cat.icons.filter(n => ICON_MAP[n]);
        if (available.length === 0) return null;
        const isOpen = openCats.has(cat.label);
        return (
          <div key={cat.label} style={{ marginBottom: 8 }}>
            {/* Category header (clickable) */}
            <button
              onClick={() => toggleCat(cat.label)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 16px", borderRadius: isOpen ? "10px 10px 0 0" : 10,
                border: "1px solid var(--showcase-shell-border, #E5E5E5)",
                background: "var(--showcase-shell-bg, #fff)",
                cursor: "pointer", textAlign: "left",
                borderBottom: isOpen ? "1px solid var(--showcase-shell-border, #E5E5E5)" : undefined,
              }}
            >
              <span style={{ fontSize: 16, lineHeight: 1 }}>{cat.emoji}</span>
              <span style={{
                fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13,
                color: "var(--showcase-title, #171717)", flex: 1,
              }}>
                {cat.label}
              </span>
              <span style={{
                fontFamily: "Inter, sans-serif", fontSize: 11,
                color: "var(--showcase-label, #A3A3A3)", marginRight: 8,
              }}>
                {available.length}
              </span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s", flexShrink: 0 }}>
                <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Icon grid */}
            {isOpen && (
              <div style={{
                padding: "16px",
                border: "1px solid var(--showcase-shell-border, #E5E5E5)",
                borderTop: "none",
                borderRadius: "0 0 10px 10px",
                background: "var(--showcase-canvas-bg, #F9FAFB)",
              }}>
                <IconGrid icons={available} size={size} color={activeColor} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Grid sub-component ───────────────────────────────────────────────────────

function IconGrid({ icons, size, color }: { icons: string[]; size: number; color: string }) {
  const ICON_MAP = Object.fromEntries(
    Object.entries(Icons).filter(([k]) => k.startsWith("Icon") && k !== "IconProps")
  ) as Record<string, IconComponent>;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
      gap: 4,
    }}>
      {icons.map(name => {
        const Comp = ICON_MAP[name];
        if (!Comp) return null;
        const label = name.replace(/^Icon/, "").replace(/(\d+)$/, " $1").trim();
        return (
          <div
            key={name}
            title={name}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 6, padding: "10px 6px 8px",
              borderRadius: 8, cursor: "default",
              background: "var(--showcase-shell-bg, #fff)",
              border: "1px solid var(--showcase-shell-border, #E5E5E5)",
              transition: "border-color 0.1s",
            }}
          >
            <Comp size={size} color={color} />
            <span style={{
              fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 500,
              color: "var(--showcase-label, #A3A3A3)",
              textAlign: "center", lineHeight: 1.3, wordBreak: "break-word",
              maxWidth: "100%",
            }}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const ctrlBtn: React.CSSProperties = {
  fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 500,
  padding: "4px 10px", borderRadius: 6, cursor: "pointer",
  border: "1px solid var(--showcase-shell-border, #E5E5E5)",
  background: "var(--showcase-canvas-bg, #F9FAFB)",
  color: "var(--showcase-text-subtle, #737373)",
};
