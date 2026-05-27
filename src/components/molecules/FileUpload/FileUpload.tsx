import React, { useState, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type FileUploadStatus = "default" | "processing" | "error" | "completed";

export interface FileUploadCardProps {
  title?:           string;
  description?:     string;
  showLink?:        boolean;
  linkText?:        string;
  onLinkClick?:     () => void;
  /** Called with the File objects when the user drops or browses */
  onFilesSelected?: (files: File[]) => void;
  /** MIME / extension filter forwarded to the hidden <input> */
  accept?:          string;
  disabled?:        boolean;
  style?:           React.CSSProperties;
}

export interface FileListItemProps {
  filename:     string;
  fileSize?:    string;
  status?:      FileUploadStatus;
  /** Show a 1px bottom divider */
  showDivider?: boolean;
  style?:       React.CSSProperties;
}

// ─── Excel document icon ──────────────────────────────────────────────────────

function ExcelFileIcon({ size = 44, disabled }: { size?: number; disabled?: boolean }) {
  const h         = Math.round(size * 52 / 44);
  const greenBg   = disabled ? "#9CA3AF" : "#16A34A";
  const docBg     = disabled ? "#F3F4F6" : "#FFFFFF";
  const docBorder = disabled ? "#E5E7EB" : "#E2E8F0";
  const lineClr   = disabled ? "#D1D5DB" : "#E2E8F0";
  const foldClr   = disabled ? "#D1D5DB" : "#CBD5E1";

  return (
    <svg width={size} height={h} viewBox="0 0 44 52" fill="none" aria-hidden="true">
      {/* Document body */}
      <rect width="44" height="52" rx="4" fill={docBg} />
      <rect width="44" height="52" rx="4" stroke={docBorder} strokeWidth="0.8" />
      {/* Page-fold top-right */}
      <path d="M31 0H40C42.2 0 44 1.8 44 4V13L31 0Z" fill={foldClr} />
      <path d="M31 0V9C31 11.2 32.8 13 35 13H44" stroke={disabled ? "#C4C4C4" : "#94A3B8"} strokeWidth="0.7" />
      {/* Left green Excel band */}
      <rect width="14" height="52" rx="4" fill={greenBg} />
      <rect x="4" width="10" height="52" fill={greenBg} />
      {/* "X" branding */}
      <text x="7" y="32" fontSize="11" fontWeight="800" fill="white" fontFamily="Arial,sans-serif" textAnchor="middle">X</text>
      {/* Spreadsheet lines */}
      <line x1="18" y1="20" x2="38" y2="20" stroke={lineClr} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="18" y1="26" x2="35" y2="26" stroke={lineClr} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="18" y1="32" x2="38" y2="32" stroke={lineClr} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="18" y1="38" x2="33" y2="38" stroke={lineClr} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Upload badge (blue circle with up-arrow) ─────────────────────────────────

function UploadBadgeIcon({ disabled }: { disabled?: boolean }) {
  const bg = disabled ? "#9CA3AF" : "#1D32FF";
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="14" fill={bg} />
      <path d="M14 8v12M10 12.5l4-4.5 4 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Status icons ─────────────────────────────────────────────────────────────

function StatusDefaultIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="#D1D5DB" strokeWidth="1.5" />
      <path d="M12 7v5.5l3 1.8" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatusProcessingIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="#E5E7EB" strokeWidth="1.5" />
      <path d="M12 2.5C6.75 2.5 2.5 6.75 2.5 12" stroke="#1D32FF" strokeWidth="2" strokeLinecap="round">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

function StatusErrorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#EF4444" />
      <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function StatusCompletedIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#1D32FF" />
      <path d="M8 12l3.2 3.2 5.3-5.9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Learn-more chevron ───────────────────────────────────────────────────────

function ChevronRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M4.5 3L7.5 6L4.5 9" stroke="#1D32FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── FileUploadCard ───────────────────────────────────────────────────────────

export function FileUploadCard({
  title           = "Import Files",
  description     = "Upload only the downloaded client form (max 3,000 entries). Only clients registered with the agency can be uploaded.",
  showLink        = true,
  linkText        = "Learn more",
  onLinkClick,
  onFilesSelected,
  accept          = ".xlsx,.xls,.csv",
  disabled        = false,
  style,
}: FileUploadCardProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isHovered,  setIsHovered]  = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList || disabled) return;
    onFilesSelected?.(Array.from(fileList));
  }, [disabled, onFilesSelected]);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  // Resolve visual state
  let border: string;
  let background: string;

  if (disabled) {
    border     = "1.5px dashed #D1D5DB";
    background = "#F9FAFB";
  } else if (isDragOver) {
    border     = "2px solid #1D32FF";
    background = "#EEF1FF";
  } else if (isHovered) {
    border     = "1.5px solid #D4D4D4";
    background = "#FFFFFF";
  } else {
    border     = "1.5px dashed #D4D4D4";
    background = "#FFFFFF";
  }

  return (
    <div
      role={disabled ? undefined : "button"}
      tabIndex={disabled ? undefined : 0}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={e => { if (!disabled && (e.key === "Enter" || e.key === " ")) inputRef.current?.click(); }}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        display:    "flex",
        alignItems: "center",
        gap:        20,
        padding:    "20px 24px",
        borderRadius: 10,
        border,
        background,
        cursor:     disabled ? "not-allowed" : "pointer",
        transition: "border 0.15s, background 0.15s",
        boxSizing:  "border-box",
        width:      "100%",
        outline:    "none",
        userSelect: "none",
        ...style,
      }}
    >
      {/* Hidden native file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        disabled={disabled}
        style={{ display: "none" }}
        onChange={e => { handleFiles(e.target.files); e.target.value = ""; }}
      />

      {/* Icon stack: Excel doc + upload badge */}
      <div style={{ position: "relative", width: 54, height: 58, flexShrink: 0 }}>
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <ExcelFileIcon size={44} disabled={disabled} />
        </div>
        <div style={{ position: "absolute", bottom: 0, right: 0 }}>
          <UploadBadgeIcon disabled={disabled} />
        </div>
      </div>

      {/* Text block */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize:   16,
            fontWeight: 600,
            color:      disabled ? "#9CA3AF" : "#111827",
            lineHeight: "24px",
          }}>
            {title}
          </span>
          {description && (
            <span style={{
              fontFamily: "Inter, sans-serif",
              fontSize:   13,
              fontWeight: 400,
              color:      disabled ? "#C4C4C4" : "#6B7280",
              lineHeight: "20px",
            }}>
              {description}
            </span>
          )}
        </div>

        {showLink && (
          <button
            onClick={e => { e.stopPropagation(); if (!disabled) onLinkClick?.(); }}
            disabled={disabled}
            style={{
              display:    "inline-flex",
              alignItems: "center",
              gap:        4,
              background: "none",
              border:     "none",
              padding:    0,
              cursor:     disabled ? "not-allowed" : "pointer",
              fontFamily: "Inter, sans-serif",
              fontSize:   13,
              fontWeight: 500,
              color:      disabled ? "#D1D5DB" : "#1D32FF",
              lineHeight: "16px",
              width:      "fit-content",
            }}
          >
            {linkText}
            {!disabled && <ChevronRight />}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── FileListItem ─────────────────────────────────────────────────────────────

const STATUS_LABEL: Record<FileUploadStatus, string> = {
  default:    "Pending",
  processing: "Uploading",
  error:      "Failed",
  completed:  "Uploaded",
};

export function FileListItem({
  filename,
  fileSize,
  status      = "default",
  showDivider = false,
  style,
}: FileListItemProps) {
  const icon = {
    default:    <StatusDefaultIcon />,
    processing: <StatusProcessingIcon />,
    error:      <StatusErrorIcon />,
    completed:  <StatusCompletedIcon />,
  }[status];

  return (
    <div
      style={{
        display:      "flex",
        alignItems:   "center",
        gap:          12,
        padding:      "10px 4px",
        borderBottom: showDivider ? "1px solid #F3F4F6" : undefined,
        boxSizing:    "border-box",
        width:        "100%",
        ...style,
      }}
    >
      {/* File icon */}
      <div style={{ flexShrink: 0 }}>
        <ExcelFileIcon size={28} />
      </div>

      {/* Filename + size */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{
          fontFamily:   "Inter, sans-serif",
          fontSize:     14,
          fontWeight:   500,
          color:        "#111827",
          lineHeight:   "20px",
          whiteSpace:   "nowrap",
          overflow:     "hidden",
          textOverflow: "ellipsis",
        }}>
          {filename}
        </span>
        {fileSize && (
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize:   12,
            fontWeight: 400,
            color:      "#9CA3AF",
            lineHeight: "16px",
          }}>
            {fileSize}
          </span>
        )}
      </div>

      {/* Status icon with accessible label */}
      <div style={{ flexShrink: 0 }} aria-label={STATUS_LABEL[status]}>
        {icon}
      </div>
    </div>
  );
}
