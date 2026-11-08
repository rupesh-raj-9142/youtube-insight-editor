import { useState } from "react";
import {
  CirclePlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStudioStore } from "./store";
import { EditableImage } from "./editable";
import {
  DashboardNavIcon,
  ContentNavIcon,
  AnalyticsNavIcon,
  CommunityNavIcon,
  EarnNavIcon,
  StudioBellIcon,
  StudioSearchIcon,
} from "./icons";
import { TABS, type Tab } from "./tabsData";

/** Top-bar variant per screen: matches the reference screenshots. */
export type TopBarVariant = "analytics" | "dashboard" | "content";

/** Four-point "Ask Studio" star (Gemini-style sparkle). */
function AskStudioIcon({ active = false }: { active?: boolean }) {
  if (active) {
    return (
      <svg viewBox="0 0 24 24" className="size-6 transition-transform hover:scale-110" aria-hidden="true">
        <defs>
          <linearGradient id="gemini-active-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="50%" stopColor="#9B72CB" />
            <stop offset="100%" stopColor="#D96570" />
          </linearGradient>
        </defs>
        <path
          d="M12 1.5C12.7 7 17 11.3 22.5 12 17 12.7 12.7 17 12 22.5 11.3 17 7 12.7 1.5 12 7 11.3 11.3 7 12 1.5Z"
          fill="url(#gemini-active-grad)"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="size-6 transition-transform hover:scale-110" aria-hidden="true">
      <path
        d="M12 1.5C12.7 7 17 11.3 22.5 12 17 12.7 12.7 17 12 22.5 11.3 17 7 12.7 1.5 12 7 11.3 11.3 7 12 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function YouTubeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 20" className={className} aria-hidden="true">
      <rect width="28" height="20" rx="5" fill="#FF0000" />
      <path d="M11 5.5v9l8-4.5z" fill="#fff" />
    </svg>
  );
}

export function StudioTopBar({ variant = "analytics" }: { variant?: TopBarVariant }) {
  const { state, updateField, resetAll, editMode, toggleEditMode } = useStudioStore();

  return (
    <>
      <header className="flex items-center justify-between px-4 pb-2 pt-3">
        <div
          className="flex items-center gap-1.5 cursor-pointer select-none"
          onDoubleClick={() => {
            if (window.confirm("Reset all Studio data to default?")) {
              resetAll();
            }
          }}
          title="Double-click to reset data"
        >
          <YouTubeLogo className="h-[19px] w-[27px]" />
          <span className="text-[21px] font-medium tracking-tight">Studio</span>
        </div>
        <div className="flex items-center gap-5">
          <button aria-label="Create">
            <CirclePlus className="size-6" strokeWidth={1.7} />
          </button>
          {variant === "content" ? (
            <button aria-label="Search">
              <StudioSearchIcon className="size-6 text-foreground" />
            </button>
          ) : null}
          <button aria-label="Notifications">
            <StudioBellIcon className="size-6 text-foreground" />
          </button>
          <button
            onClick={toggleEditMode}
            aria-label={editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
            title={
              editMode
                ? "Edit Mode Active (Click to finish)"
                : "Click Gemini logo to edit views, likes, thumbnails, comments & analytics"
            }
            className={cn(
              "relative p-1 rounded-full transition-all duration-200",
              editMode
                ? "bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 ring-2 ring-blue-500 scale-105"
                : "hover:bg-secondary text-foreground"
            )}
          >
            <AskStudioIcon active={editMode} />
            {editMode && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
            )}
          </button>
          <EditableImage
            src={state.channelAvatar}
            alt="Profile"
            onImageChange={(val) => updateField("channelAvatar", val)}
            className="size-8 rounded-full object-cover"
          />
        </div>
      </header>
      {editMode && (
        <div className="mx-4 mb-2 flex items-center justify-between rounded-lg bg-blue-500/10 border border-blue-500/30 px-3 py-1.5 text-xs text-blue-600 dark:text-blue-400">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="inline-block size-2 rounded-full bg-blue-500 animate-pulse" />
            Edit Mode ON — Tap any text, number, thumbnail or comment to edit
          </span>
          <button
            onClick={toggleEditMode}
            className="text-[11px] font-semibold underline hover:no-underline ml-2"
          >
            Done
          </button>
        </div>
      )}
    </>
  );
}

export function TabsBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <div className="sticky top-0 z-30 bg-background">
      <nav className="no-scrollbar flex overflow-x-auto px-3">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => onChange(t)}
            className="relative shrink-0 px-3 pb-3 pt-2"
          >
            <span
              className={cn(
                "text-[17px]",
                active === t ? "font-medium text-foreground" : "text-muted-foreground",
              )}
            >
              {t}
            </span>
            {active === t ? (
              <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-foreground" />
            ) : null}
          </button>
        ))}
      </nav>
    </div>
  );
}

/** Studio-style analytics icon: axis with rising bars (used in nav + stat rows). */
export function AnalyticsIcon({
  active = false,
  className,
}: {
  active?: boolean;
  className?: string;
}) {
  const stroke = active ? 2.1 : 1.7;
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M4 3.5v16.5a.5.5 0 0 0 .5.5H21"
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      <rect x="9.4" y="13.4" width="2.7" height="6.8" rx="0.7" fill="currentColor" />
      <rect x="13.9" y="9.6" width="2.7" height="10.6" rx="0.7" fill="currentColor" />
      <rect x="18.4" y="5.8" width="2.7" height="14.4" rx="0.7" fill="currentColor" />
    </svg>
  );
}

const NAV_ITEMS = [
  { id: "Dashboard", label: "Dashboa...", Icon: DashboardNavIcon },
  { id: "Content", label: "Content", Icon: ContentNavIcon },
  { id: "Analytics", label: "Analytics", Icon: AnalyticsNavIcon },
  { id: "Community", label: "Commun...", Icon: CommunityNavIcon },
  { id: "Earn", label: "Earn", Icon: EarnNavIcon },
];

export function BottomNav({
  active,
  onSelect,
}: {
  active: string;
  onSelect?: (label: string) => void;
}) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-[480px] -translate-x-1/2 border-t border-border bg-background">
      <div className="flex items-center justify-around px-1 py-1.5">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = label === active || id === active;
          return (
            <button
              key={id}
              onClick={() => onSelect?.(label)}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-1 text-foreground transition-colors select-none",
                isActive ? "font-semibold" : "font-normal"
              )}
            >
              <Icon active={isActive} className="size-[22px]" />
              <span className="text-[10.5px] leading-none tracking-tight">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
