import React from "react";

/**
 * Official YouTube Studio Icons matched 1:1 with YouTube Studio mobile app
 */

/** 1. Dashboard: official YouTube Studio 4 rounded blocks */
export function DashboardNavIcon({
  active = false,
  className = "size-[22px]",
}: {
  active?: boolean;
  className?: string;
}) {
  if (active) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
        focusable="false"
        aria-hidden="true"
      >
        <rect x="3" y="3.5" width="7" height="7.5" rx="1.8" />
        <rect x="12.5" y="3.5" width="8.5" height="5.5" rx="1.8" />
        <rect x="3" y="13" width="7" height="7.5" rx="1.8" />
        <rect x="12.5" y="11" width="8.5" height="9.5" rx="1.8" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      focusable="false"
      aria-hidden="true"
    >
      <rect x="3.5" y="4" width="6" height="6.5" rx="1.5" />
      <rect x="13" y="4" width="7.5" height="4.5" rx="1.5" />
      <rect x="3.5" y="13.5" width="6" height="6.5" rx="1.5" />
      <rect x="13" y="11.5" width="7.5" height="8.5" rx="1.5" />
    </svg>
  );
}

/** 2. Content: official YouTube Studio two overlapping screens with play triangle */
export function ContentNavIcon({
  active = false,
  className = "size-[22px]",
}: {
  active?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      focusable="false"
      aria-hidden="true"
    >
      {/* Back screen outline */}
      <path
        d="M4 8.5v9a2.5 2.5 0 0 0 2.5 2.5h9"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      {/* Front screen */}
      <rect
        x="7.5"
        y="3.5"
        width="13"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.9"
        fill={active ? "currentColor" : "none"}
      />
      {/* Play button */}
      <polygon
        points="12.5,7.5 16.5,10 12.5,12.5"
        fill={active ? "var(--nav-bg, #fff)" : "currentColor"}
      />
    </svg>
  );
}

/** 3. Analytics: official YouTube Studio square frame with 3 vertical bars (medium, tall, short) */
export function AnalyticsNavIcon({
  active = false,
  className = "size-[22px]",
}: {
  active?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      focusable="false"
      aria-hidden="true"
    >
      {/* Outer rounded square */}
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.9"
        fill={active ? "currentColor" : "none"}
      />
      {/* 3 vertical bars: medium, tall, short */}
      <rect
        x="7.2"
        y="10.5"
        width="2.3"
        height="6.8"
        rx="0.5"
        fill={active ? "var(--nav-bg, #fff)" : "currentColor"}
      />
      <rect
        x="10.8"
        y="7"
        width="2.3"
        height="10.3"
        rx="0.5"
        fill={active ? "var(--nav-bg, #fff)" : "currentColor"}
      />
      <rect
        x="14.4"
        y="12"
        width="2.3"
        height="5.3"
        rx="0.5"
        fill={active ? "var(--nav-bg, #fff)" : "currentColor"}
      />
    </svg>
  );
}

/** 4. Community: official YouTube Studio 3 people icon extracted from icons.html */
export function CommunityNavIcon({
  active = false,
  className = "size-[22px]",
}: {
  active?: boolean;
  className?: string;
}) {
  if (active) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
        focusable="false"
        aria-hidden="true"
      >
        {/* Center person filled */}
        <circle cx="12" cy="8" r="3.2" />
        <path d="M12 13c-3.2 0-5.8 1.8-6 4v2h12v-2c-.2-2.2-2.8-4-6-4Z" />
        {/* Left person filled */}
        <circle cx="5.5" cy="9.5" r="2.5" />
        <path d="M5.5 13.5c-1.8 0-3.5 1-3.5 2.5V18h3.2v-1.8c0-1 .4-1.9 1-2.7-.2 0-.4 0-.7 0Z" />
        {/* Right person filled */}
        <circle cx="18.5" cy="9.5" r="2.5" />
        <path d="M18.5 13.5c-.3 0-.5 0-.7 0 .6.8 1 1.7 1 2.7V18H22v-2c0-1.5-1.7-2.5-3.5-2.5Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
    >
      <path d="M18 3a4 4 0 00-3.25 1.668 6 6 0 011.6 1.202A2 2 0 1118 9l-.084-.002c.112.662.112 1.339.001 2.001A4 4 0 1018 3ZM6 3.001a4 4 0 10.083 8 6 6 0 010-2.001 2 2 0 111.566-3.13A6 6 0 019.25 4.668 4 4 0 006 3.001Zm6 3a4 4 0 100 8 4 4 0 000-8Zm0 2a2 2 0 110 4 2 2 0 010-4Zm-5.656 4.01A6 6 0 000 18a1 1 0 102 0 3.998 3.998 0 015.53-3.694l.057.024.155-.1a6 6 0 01-1.398-2.219ZM18 12c-.115 0-.23.003-.345.01a5.999 5.999 0 01-1.398 2.22l.155.1A3.998 3.998 0 0122 18a1 1 0 002 0 6 6 0 00-6-6Zm-6 3.001a6 6 0 00-6 6 1 1 0 102 0 4 4 0 018 .001 1 1 0 002 0 6 6 0 00-6-6.001Z" />
    </svg>
  );
}

/** 5. Earn: official YouTube Studio circular $ icon */
export function EarnNavIcon({
  active = false,
  className = "size-[22px]",
}: {
  active?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      focusable="false"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9.5"
        stroke="currentColor"
        strokeWidth="1.9"
        fill={active ? "currentColor" : "none"}
      />
      <text
        x="12"
        y="15.8"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="bold"
        fontFamily="Roboto, -apple-system, sans-serif"
        fill={active ? "var(--nav-bg, #fff)" : "currentColor"}
      >
        $
      </text>
    </svg>
  );
}

/** Official YouTube Studio Bell Notification Icon */
export function StudioBellIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      className={className}
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
    >
      <path d="M16 19a4 4 0 11-8 0H4.765C3.21 19 2.25 17.304 3.05 15.97l1.806-3.01A1 1 0 005 12.446V8a7 7 0 0114 0v4.446c0 .181.05.36.142.515l1.807 3.01c.8 1.333-.161 3.029-1.716 3.029H16ZM12 3a5 5 0 00-5 5v4.446a3 3 0 01-.428 1.543L4.765 17h14.468l-1.805-3.01A3 3 0 0117 12.445V8a5 5 0 00-5-5Zm-2 16a2 2 0 104 0h-4Z" />
    </svg>
  );
}

/** Official YouTube Studio Search Icon */
export function StudioSearchIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      className={className}
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
    >
      <path d="M11 2a9 9 0 105.641 16.01.966.966 0 00.152.197l3.5 3.5a1 1 0 101.414-1.414l-3.5-3.5a1 1 0 00-.197-.153A8.96 8.96 0 0020 11a9 9 0 00-9-9Zm0 2a7 7 0 110 14 7 7 0 010-14Z" />
    </svg>
  );
}

/**
 * Exact Stats Views Chart Icon from #viral card: L-bracket + 3 bars (medium, tall, short)
 */
export function StudioAnalyticsIcon({ className = "size-[19px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      focusable="false"
      aria-hidden="true"
    >
      {/* L-bracket axis */}
      <path
        d="M3.5 3.5V20.5H20.5"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="square"
      />
      {/* 3 vertical bars: medium, tall, short */}
      <rect x="7.2" y="9.5" width="2.4" height="8" rx="0.5" fill="currentColor" />
      <rect x="11.5" y="4.5" width="2.4" height="13" rx="0.5" fill="currentColor" />
      <rect x="15.8" y="12" width="2.4" height="5.5" rx="0.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Exact Stats Likes Icon from #viral card: YouTube outline thumbs up 👍
 * Seamless outline without inner cuff divider line, exactly matching YouTube Studio mobile
 */
export function StudioThumbsUp({ className = "size-[19px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      aria-hidden="true"
    >
      <path d="M3.5 12.5a2 2 0 0 1 2-2h2.8l3.6-6.6a1.8 1.8 0 0 1 3 1.4v4.2h4.5a2.2 2.2 0 0 1 2.2 2.6l-1.3 6.6a2.2 2.2 0 0 1-2.2 1.8H5.5a2 2 0 0 1-2-2v-8Z" />
    </svg>
  );
}

/**
 * Exact Stats Comments Icon from #viral card: Chat bubble with 2 lines 💬
 */
export function StudioCommentBubble({ className = "size-[19px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      aria-hidden="true"
    >
      <path d="M20.5 4H3.5a1.5 1.5 0 0 0-1.5 1.5v10.5A1.5 1.5 0 0 0 3.5 17.5h3.5v3.8l4.8-3.8h8.7a1.5 1.5 0 0 0 1.5-1.5V5.5A1.5 1.5 0 0 0 20.5 4Z" />
      <line x1="6.8" y1="8.5" x2="15.2" y2="8.5" strokeWidth="1.9" />
      <line x1="6.8" y1="12.5" x2="11.8" y2="12.5" strokeWidth="1.9" />
    </svg>
  );
}
