import React, { useState } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DemoShell, DemoRow } from "../DemoShell";

// ─── Curated categories ───────────────────────────────────────────────────────

const CATEGORIES: { label: string; icons: string[] }[] = [
  {
    label: "Arrows & Navigation",
    icons: [
      "ArrowUp","ArrowDown","ArrowLeft","ArrowRight",
      "ArrowUpRight","ArrowDownLeft","ArrowUpLeft","ArrowDownRight",
      "ChevronUp","ChevronDown","ChevronLeft","ChevronRight",
      "ChevronsUp","ChevronsDown","ChevronsLeft","ChevronsRight",
      "MoveUp","MoveDown","MoveLeft","MoveRight","Move",
      "CornerUpLeft","CornerUpRight","CornerDownLeft","CornerDownRight",
    ],
  },
  {
    label: "Actions",
    icons: [
      "Plus","Minus","X","Check","Search","Filter","SortAsc","SortDesc",
      "Edit","Edit2","Edit3","Pencil","Trash","Trash2","Copy","Clipboard",
      "Save","Upload","Download","RefreshCw","RefreshCcw","RotateCcw","RotateCw",
      "Undo","Undo2","Redo","Redo2","Scissors","Wand","Wand2","Link","Link2","Unlink",
    ],
  },
  {
    label: "Files & Documents",
    icons: [
      "File","FileText","FilePlus","FileMinus","FileCheck","FileX","FileEdit",
      "Files","Folder","FolderOpen","FolderPlus","FolderMinus","FolderCheck",
      "Archive","Book","BookOpen","BookMarked","Bookmark","Paperclip","Newspaper",
      "Receipt","FileSpreadsheet","FileCode","FilePdf",
    ],
  },
  {
    label: "Communication",
    icons: [
      "Mail","MailOpen","MailPlus","MailCheck","MessageSquare","MessageCircle",
      "MessageSquarePlus","Send","Bell","BellOff","BellRing","Phone","PhoneCall",
      "PhoneOff","PhoneIncoming","PhoneOutgoing","Video","VideoOff","Voicemail",
      "AtSign","Hash","Rss",
    ],
  },
  {
    label: "Users & People",
    icons: [
      "User","UserPlus","UserMinus","UserCheck","UserX","UserCog","Users",
      "UserCircle","UserCircle2","Contact","Contacts","PersonStanding",
      "Baby","Shield","ShieldCheck","ShieldAlert","ShieldOff","Lock","LockOpen","Key","KeyRound",
    ],
  },
  {
    label: "Commerce & Finance",
    icons: [
      "ShoppingBag","ShoppingCart","ShoppingBasket","CreditCard","Wallet","Banknote",
      "BadgeDollarSign","DollarSign","Euro","PoundSterling","Currency","Coins","Percent",
      "TrendingUp","TrendingDown","BarChart","BarChart2","BarChart3","BarChart4",
      "PieChart","LineChart","CandlestickChart","Receipt","HandCoins",
    ],
  },
  {
    label: "Status & Feedback",
    icons: [
      "Info","AlertCircle","AlertTriangle","AlertOctagon","CheckCircle","CheckCircle2",
      "XCircle","HelpCircle","Ban","OctagonX","CircleDashed","Clock","Clock1","Timer",
      "Loader","Loader2","RefreshCw","Hourglass","Zap","ZapOff","Star","StarOff","Heart","HeartOff",
    ],
  },
  {
    label: "Layout & UI",
    icons: [
      "LayoutDashboard","LayoutGrid","LayoutList","LayoutTemplate","Layout",
      "Sidebar","SidebarOpen","SidebarClose","Table","Table2","Grid","Grid2X2",
      "Grid3X3","List","ListOrdered","ListChecks","Menu","MoreHorizontal","MoreVertical",
      "Maximize","Maximize2","Minimize","Minimize2","Expand","Shrink","PanelLeft","PanelRight",
    ],
  },
  {
    label: "Media & Content",
    icons: [
      "Image","ImagePlus","Images","Camera","Video","Play","Pause","Stop",
      "SkipBack","SkipForward","Rewind","FastForward","Volume","Volume1","Volume2","VolumeX",
      "Music","Music2","Mic","MicOff","Headphones","Radio","Tv","Monitor","Projector",
    ],
  },
  {
    label: "Settings & Tools",
    icons: [
      "Settings","Settings2","Sliders","SlidersHorizontal","SlidersVertical",
      "Wrench","Hammer","Screwdriver","Tool","Cog","Gauge","Code","Code2","Terminal",
      "Bug","Cpu","Database","Server","HardDrive","Globe","Wifi","WifiOff","Bluetooth",
    ],
  },
  {
    label: "Dates & Time",
    icons: [
      "Calendar","CalendarDays","CalendarCheck","CalendarX","CalendarPlus","CalendarMinus",
      "CalendarClock","CalendarRange","CalendarHeart","Clock","Clock1","Clock2","Clock3",
      "Clock4","Clock5","Clock6","Clock7","Clock8","Clock9","Clock10","Clock11","Clock12",
      "AlarmClock","AlarmClockOff","Timer","TimerOff","Watch",
    ],
  },
  {
    label: "Miscellaneous",
    icons: [
      "MapPin","Map","Navigation","Compass","Globe","Globe2","Plane","Car","Truck",
      "Package","PackageOpen","PackagePlus","PackageCheck","PackageX","Tag","Tags",
      "Ticket","Award","Trophy","Crown","Medal","Gift","Smile","Frown","Meh","Laugh",
    ],
  },
];

// ─── Icon tile ────────────────────────────────────────────────────────────────

function IconTile({ name, size }: { name: string; size: number }) {
  const [copied, setCopied] = useState(false);
  const IconComp = (LucideIcons as unknown as Record<string, LucideIcon>)[name];
  if (!IconComp) return null;

  const copy = () => {
    navigator.clipboard.writeText(`<${name} size={${size}} />`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  return (
    <div
      onClick={copy}
      title={`Click to copy <${name} />`}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 6,
        padding: "10px 6px", borderRadius: 8, cursor: "pointer",
        background: copied ? "#EEF1FF" : "#FAFAFA",
        border: `1px solid ${copied ? "#C7CFFF" : "#F0F0F0"}`,
        transition: "background 0.12s, border-color 0.12s",
        minWidth: 72,
      }}
    >
      <IconComp size={size} color={copied ? "#1D32FF" : "#374151"} />
      <span style={{
        fontFamily: "Inter, sans-serif", fontSize: 10, color: copied ? "#1D32FF" : "#9CA3AF",
        textAlign: "center", wordBreak: "break-word", lineHeight: "13px",
        maxWidth: 68,
      }}>
        {copied ? "Copied!" : name}
      </span>
    </div>
  );
}

// ─── Main demo ────────────────────────────────────────────────────────────────

export function LucideIconsDemo() {
  const [query, setQuery]   = useState("");
  const [size,  setSize]    = useState(20);

  // All icon names available (filter to only ones that exist in this lucide version)
  const allIconNames = CATEGORIES.flatMap(c => c.icons).filter(
    n => !!(LucideIcons as Record<string, unknown>)[n]
  );

  const q = query.trim().toLowerCase();
  const filteredCategories = q
    ? [{ label: `Search results for "${query}"`, icons: allIconNames.filter(n => n.toLowerCase().includes(q)) }]
    : CATEGORIES;

  return (
    <DemoShell
      title="Lucide Icons"
      description="1400+ open-source icons from lucide.dev — MIT licence, available alongside the built-in WeLoop icon set. Click any icon to copy its JSX."
      category="atom"
      importCode={`// lucide-react is bundled with weloop-components — no extra install needed
import { Pencil, Trash2, ChevronDown, CalendarDays } from 'lucide-react';
import type { LucideIcon, LucideProps } from 'lucide-react';

// Use in components
<Pencil size={16} color="#374151" />
<Trash2 size={20} strokeWidth={1.5} />

// Type a prop that accepts any Lucide icon
function MyBtn({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon size={16} />;
}`}
    >
      {/* Controls */}
      <DemoRow label="Search & size">
        <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
          <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
            <LucideIcons.Search
              size={14} color="#9CA3AF"
              style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search icons…"
              style={{
                width: "100%", height: 36, paddingLeft: 32, paddingRight: 12,
                border: "1px solid #E5E7EB", borderRadius: 8, outline: "none",
                fontFamily: "Inter, sans-serif", fontSize: 13, color: "#374151",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF" }}>Size</span>
            {[14, 16, 20, 24].map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  height: 28, padding: "0 10px", borderRadius: 6,
                  border: `1px solid ${size === s ? "#1D32FF" : "#E5E7EB"}`,
                  background: size === s ? "#EEF1FF" : "#FFF",
                  color: size === s ? "#1D32FF" : "#374151",
                  fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </DemoRow>

      {/* Icon grid */}
      {filteredCategories.map(cat => {
        const validIcons = cat.icons.filter(n => !!(LucideIcons as Record<string, unknown>)[n]);
        if (validIcons.length === 0) return null;
        return (
          <DemoRow key={cat.label} label={cat.label} fullWidth>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {validIcons.map(name => (
                <IconTile key={name} name={name} size={size} />
              ))}
            </div>
          </DemoRow>
        );
      })}

      {/* Usage reference */}
      <DemoRow
        label="Props reference"
        code={`// Every Lucide icon accepts these props:
interface LucideProps {
  size?:        number | string;  // px — default 24
  color?:       string;           // CSS color — default "currentColor"
  strokeWidth?: number | string;  // default 2
  absoluteStrokeWidth?: boolean;  // keep stroke width independent of size
  className?:   string;
  style?:       React.CSSProperties;
}

// Examples
<Pencil size={16} />
<Trash2 size={20} color="#EF4444" />
<ChevronDown size={12} strokeWidth={2.5} />
<Loader2 size={18} className="animate-spin" />

// Dynamic icon via type
import type { LucideIcon } from 'lucide-react';
function IconButton({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <button>
      <Icon size={16} />
      {label}
    </button>
  );
}

// Use in ButtonSingle leadIcon prop
import { ButtonSingle } from 'weloop-components';
import { Pencil } from 'lucide-react';
<ButtonSingle leadIcon={<Pencil size={14} />}>Edit</ButtonSingle>`}
      >
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          {["Pencil","Trash2","ChevronDown","Calendar","Search","Settings2","User","Bell","Download","Upload"].map(name => {
            const I = (LucideIcons as unknown as Record<string, LucideIcon>)[name];
            return I ? (
              <div key={name} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "6px 10px", borderRadius: 7, border: "1px solid #E5E7EB",
                fontFamily: "Inter, sans-serif", fontSize: 12, color: "#374151",
              }}>
                <I size={14} color="#6B7280" />
                {name}
              </div>
            ) : null;
          })}
        </div>
      </DemoRow>

    </DemoShell>
  );
}
