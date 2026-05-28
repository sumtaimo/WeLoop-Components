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

// ─── Upload file icon (Excel doc + blue upload badge) ─────────────────────────

function UploadFileIcon({ disabled }: { disabled?: boolean }) {
  const greenColor = disabled ? "#9CA3AF" : "#15803D";
  const blueColor  = disabled ? "#C4C4C4" : "#1D32FF";
  const blueStroke = disabled ? "#C4C4C4" : "#1221C1";
  const gradId = "ufig_grad";
  return (
    <svg width="65" height="58" viewBox="0 0 65 58" fill="none" aria-hidden="true">
      <path d="M41 0.5L41.4375 0.510742C45.9286 0.738437 49.5 4.45231 49.5 9V49C49.5 53.6944 45.6944 57.5 41 57.5H9C4.30558 57.5 0.5 53.6944 0.5 49V9C0.5 4.30558 4.30558 0.5 9 0.5H41Z" fill={`url(#${gradId})`} stroke="#E5E5E5"/>
      <path d="M21.4449 23H8.55508C8.14362 22.9968 7.74992 22.8299 7.45897 22.5354C7.16802 22.2409 7.00316 21.8424 7 21.4259V8.57412C7.00316 8.15763 7.16802 7.7591 7.45897 7.46459C7.74992 7.17007 8.14362 7.0032 8.55508 7H21.4449C21.8564 7.0032 22.2501 7.17007 22.541 7.46459C22.832 7.7591 22.9968 8.15763 23 8.57412V21.4224C23.0005 21.6294 22.9606 21.8345 22.8826 22.0259C22.8047 22.2172 22.6902 22.3912 22.5457 22.5377C22.4013 22.6843 22.2297 22.8005 22.0408 22.8798C21.8519 22.9592 21.6494 23 21.4449 23Z" fill={greenColor}/>
      <path d="M17.1242 19.4427L15.9645 17.6836C15.4892 16.9905 15.1914 16.5208 14.8639 16.0001H14.8344C14.5661 16.5278 14.2999 16.9905 13.8542 17.6836L12.8128 19.4427H10.5547L13.7655 14.9622L10.6434 10.5556H12.9332L14.0929 12.3868C14.4499 12.9322 14.7266 13.3772 14.9843 13.8715H15.0435C15.3413 13.3262 15.5484 12.9304 15.9053 12.3868L17.065 10.5556H19.3253L16.144 14.8883L19.4436 19.4445L17.1242 19.4427Z" fill="#FAFAFA"/>
      <rect x="34" y="26" width="30" height="30" rx="15" fill={blueColor} stroke={blueStroke} strokeWidth="2"/>
      <path d="M48.9932 47.5791C48.4873 47.5791 48.1455 47.2305 48.1455 46.7109L48.1455 38.6104L48.2002 37.127L46.5801 38.959L45.042 40.4902C44.8848 40.6406 44.6797 40.7432 44.4336 40.7432C43.9687 40.7432 43.6201 40.4014 43.6201 39.9229C43.6201 39.6973 43.709 39.4854 43.8867 39.3076L48.3643 34.8232C48.5283 34.6523 48.7607 34.5566 48.9932 34.5566C49.2256 34.5566 49.4648 34.6523 49.6289 34.8232L54.1064 39.3076C54.2842 39.4854 54.373 39.6973 54.373 39.9229C54.373 40.4014 54.0244 40.7432 53.5596 40.7432C53.3135 40.7432 53.1084 40.6406 52.9512 40.4902L51.4062 38.959L49.7861 37.127L49.8477 38.6104L49.8477 46.7109C49.8477 47.2305 49.499 47.5791 48.9932 47.5791Z" fill="#FAFAFA"/>
      <defs>
        <radialGradient id={gradId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10 14.5) rotate(90) scale(49.5 49.5)">
          <stop offset="0.0103718" stopColor="#E5E5E5"/>
          <stop offset="1" stopColor="#F5F5F5"/>
        </radialGradient>
      </defs>
    </svg>
  );
}

// ─── Small Excel file icon (used in file list items) ─────────────────────────

function ExcelFileIcon({ size = 28 }: { size?: number }) {
  const h = Math.round(size * 34 / 28);
  return (
    <svg width={size} height={h} viewBox="0 0 28 34" fill="none" aria-hidden="true">
      <rect width="28" height="34" rx="3" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8"/>
      <rect width="9" height="34" rx="3" fill="#16A34A"/>
      <rect x="3" width="6" height="34" fill="#16A34A"/>
      <text x="6" y="21" fontSize="7" fontWeight="800" fill="white" fontFamily="Arial,sans-serif" textAnchor="middle">X</text>
      <line x1="12" y1="13" x2="24" y2="13" stroke="#E2E8F0" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="12" y1="17" x2="22" y2="17" stroke="#E2E8F0" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="12" y1="21" x2="24" y2="21" stroke="#E2E8F0" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="12" y1="25" x2="21" y2="25" stroke="#E2E8F0" strokeWidth="0.9" strokeLinecap="round"/>
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

      <UploadFileIcon disabled={disabled} />

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
