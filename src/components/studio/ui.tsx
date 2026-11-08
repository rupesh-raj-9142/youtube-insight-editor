import { useRef, useState, useEffect } from "react";
import type { ComponentType, ReactNode } from "react";
import { CircleArrowDown, CircleArrowUp, CircleCheck, Clock, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStudioStore } from "./store";

/* ---------------------------------- Card ---------------------------------- */

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionCard({
  title,
  subtitle,
  titleIcon,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  titleIcon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-[20px] font-medium leading-[1.3] tracking-tight">{title}</h2>
        {titleIcon}
      </div>
      {subtitle ? <p className="mt-1 text-[14px] text-muted-foreground">{subtitle}</p> : null}
      <div className="mt-4">{children}</div>
    </Card>
  );
}

/* -------------------------------- Carousel -------------------------------- */

export function Carousel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Dots({ count, active = 0 }: { count: number; active?: number }) {
  return (
    <div className="my-4 flex justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={cn("size-2 rounded-full", i === active ? "bg-neutral-500" : "bg-neutral-200")}
        />
      ))}
    </div>
  );
}

/* --------------------------------- Charts --------------------------------- */

export type ChartPoint = [fraction: number, value: number];

export function LineChart({
  points,
  onPointsChange,
  gridlines,
  colorClass,
  shadeFrom,
  xStart,
  xEnd,
  gridLabel,
  className,
}: {
  points: ChartPoint[];
  onPointsChange?: (points: ChartPoint[]) => void;
  gridlines: number[];
  colorClass: string;
  shadeFrom?: number;
  xStart: string;
  xEnd: string;
  gridLabel?: (v: number) => string;
  className?: string;
}) {
  const { editMode } = useStudioStore();
  const svgRef = useRef<SVGSVGElement>(null);
  const initialPointsRef = useRef<ChartPoint[]>(points);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const W = 300;
  const H = 112;
  const PAD_L = 30;
  const PAD_R = 4;
  const PAD_T = 6;
  const PAD_B = 6;
  const max = Math.max(...gridlines);
  const min = Math.min(...gridlines);
  const x = (f: number) => PAD_L + f * (W - PAD_L - PAD_R);
  const y = (v: number) => PAD_T + ((max - v) / (max - min)) * (H - PAD_T - PAD_B);

  const handlePointerDown = (idx: number, e: React.PointerEvent) => {
    if (!editMode || !onPointsChange) return;
    e.preventDefault();
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    setDraggingIdx(idx);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggingIdx === null || !onPointsChange || !svgRef.current) return;
    e.preventDefault();
    const rect = svgRef.current.getBoundingClientRect();
    const svgY = ((e.clientY - rect.top) / rect.height) * H;
    const vRaw = max - ((svgY - PAD_T) / (H - PAD_T - PAD_B)) * (max - min);
    const range = max - min;
    const vClamped = Math.max(min, Math.min(max + range * 0.1, vRaw));
    const vRounded = Math.round(vClamped * 10) / 10;

    const copy = points.map((p, i) =>
      i === draggingIdx ? ([p[0], vRounded] as ChartPoint) : p
    );
    onPointsChange(copy);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingIdx !== null) {
      try {
        (e.target as Element).releasePointerCapture(e.pointerId);
      } catch {}
      setDraggingIdx(null);
    }
  };

  const applyPreset = (type: "viral" | "growth" | "wave" | "flat" | "reset") => {
    if (!onPointsChange) return;
    if (type === "reset") {
      onPointsChange(initialPointsRef.current);
      return;
    }
    const span = max - min;
    if (type === "viral") {
      onPointsChange([
        [0, min],
        [0.35, min],
        [0.55, min + span * 0.08],
        [0.72, min + span * 0.25],
        [0.78, max],
        [0.84, min + span * 0.15],
        [1, min],
      ]);
    } else if (type === "growth") {
      onPointsChange([
        [0, min],
        [0.25, min + span * 0.15],
        [0.5, min + span * 0.4],
        [0.75, min + span * 0.75],
        [1, max],
      ]);
    } else if (type === "wave") {
      onPointsChange([
        [0, min + span * 0.15],
        [0.25, min + span * 0.75],
        [0.5, min + span * 0.3],
        [0.75, max],
        [1, min + span * 0.35],
      ]);
    } else if (type === "flat") {
      onPointsChange([
        [0, min],
        [1, min],
      ]);
    }
  };

  return (
    <div className={className}>
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className={cn("w-full select-none", editMode && "touch-none")}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {shadeFrom !== undefined ? (
            <rect
              x={x(shadeFrom)}
              y={PAD_T - 2}
              width={x(1) - x(shadeFrom)}
              height={H - PAD_T - PAD_B + 4}
              fill="oklch(0.93 0 0 / 0.55)"
            />
          ) : null}
          {gridlines.map((v) => (
            <g key={v}>
              <line
                x1={PAD_L}
                x2={W - PAD_R}
                y1={y(v)}
                y2={y(v)}
                stroke="oklch(0.93 0 0)"
                strokeWidth="1"
              />
              <text
                x={PAD_L - 8}
                y={y(v) + 4}
                textAnchor="end"
                fontSize="11"
                fill="oklch(0.62 0 0)"
              >
                {gridLabel ? gridLabel(v) : v}
              </text>
            </g>
          ))}
          <polyline
            points={points.map(([f, v]) => `${x(f)},${y(v)}`).join(" ")}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            className={colorClass}
          />

          {/* Interactive point handles in Edit Mode */}
          {editMode &&
            points.map(([f, v], idx) => {
              const isDragging = draggingIdx === idx;
              const isHovered = hoverIdx === idx;
              const cx = x(f);
              const cy = y(v);
              return (
                <g key={idx}>
                  {/* Larger transparent hit area */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={12}
                    fill="transparent"
                    className="cursor-ns-resize"
                    onPointerDown={(e) => handlePointerDown(idx, e)}
                    onPointerEnter={() => setHoverIdx(idx)}
                    onPointerLeave={() => setHoverIdx(null)}
                  />
                  {/* Visible point handle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isDragging ? 6.5 : isHovered ? 5.5 : 4}
                    fill="#ffffff"
                    stroke="currentColor"
                    strokeWidth={isDragging ? 2.5 : 2}
                    className={cn(
                      "cursor-ns-resize transition-all pointer-events-none",
                      colorClass
                    )}
                  />
                  {/* Floating value tooltip while dragging or hovering */}
                  {(isDragging || isHovered) && (
                    <g pointerEvents="none">
                      <rect
                        x={cx - 14}
                        y={Math.max(PAD_T, cy - 20)}
                        width={28}
                        height={14}
                        rx={3}
                        fill="#000000"
                        opacity={0.85}
                      />
                      <text
                        x={cx}
                        y={Math.max(PAD_T + 10, cy - 10)}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="bold"
                        fill="#ffffff"
                      >
                        {v}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
        </svg>
      </div>

      <div className="mt-0.5 flex justify-between pl-7 text-[12px] text-muted-foreground">
        <span>{xStart}</span>
        <span>{xEnd}</span>
      </div>

      {/* Quick Shape Presets Toolbar when in Edit Mode */}
      {editMode && onPointsChange && (
        <div className="mt-2.5 flex items-center justify-between gap-1 rounded-lg bg-blue-500/10 border border-blue-500/20 px-2 py-1.5 text-xs text-foreground">
          <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 shrink-0">
            Shape:
          </span>
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            <button
              type="button"
              onClick={() => applyPreset("viral")}
              className="px-2 py-0.5 rounded bg-background border border-border shadow-2xs hover:bg-secondary text-[11px] font-medium shrink-0"
              title="Add a high viral spike"
            >
              ⚡ Spike
            </button>
            <button
              type="button"
              onClick={() => applyPreset("growth")}
              className="px-2 py-0.5 rounded bg-background border border-border shadow-2xs hover:bg-secondary text-[11px] font-medium shrink-0"
              title="Upward growth trend"
            >
              📈 Growth
            </button>
            <button
              type="button"
              onClick={() => applyPreset("wave")}
              className="px-2 py-0.5 rounded bg-background border border-border shadow-2xs hover:bg-secondary text-[11px] font-medium shrink-0"
              title="Multiple waves"
            >
              🌊 Wave
            </button>
            <button
              type="button"
              onClick={() => applyPreset("flat")}
              className="px-2 py-0.5 rounded bg-background border border-border shadow-2xs hover:bg-secondary text-[11px] font-medium shrink-0"
              title="Flat baseline"
            >
              ➖ Flat
            </button>
            <button
              type="button"
              onClick={() => applyPreset("reset")}
              className="px-2 py-0.5 rounded bg-background border border-border shadow-2xs hover:bg-secondary text-[11px] font-medium text-muted-foreground shrink-0"
              title="Reset to default shape"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function SegmentBar({ leftPct }: { leftPct: number }) {
  return (
    <div className="flex h-[10px] w-full overflow-hidden rounded-full">
      <div className="h-full bg-ytpurple" style={{ width: `${leftPct}%` }} />
      <div className="h-full flex-1 bg-ytpurple-light" />
    </div>
  );
}

export function BarRow({
  label,
  pct,
  value,
  colorClass = "bg-ytpurple",
}: {
  label: string;
  pct: number;
  value: string;
  colorClass?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-[15px]">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="mt-2 h-[6px] w-full rounded-full bg-muted">
        <div className={cn("h-full rounded-full", colorClass)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ------------------------------- Info boxes ------------------------------- */

export function InfoBox({
  icon: Icon = Info,
  children,
}: {
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-secondary px-4 py-4">
      <Icon className="size-5 shrink-0 text-muted-foreground" strokeWidth={1.7} />
      <p className="text-[14px] leading-snug text-muted-foreground">{children}</p>
    </div>
  );
}

export function MutedNote({ children }: { children: ReactNode }) {
  return <p className="text-[15px] text-muted-foreground/70">{children}</p>;
}

/* --------------------------------- Badges --------------------------------- */

export function CheckBadge() {
  return <CircleCheck className="size-6 shrink-0 text-ytgreen" strokeWidth={1.5} />;
}

export function UpBadge() {
  return <CircleArrowUp className="size-6 shrink-0 fill-ytgreen text-background" strokeWidth={1.5} />;
}

export function DownBadge() {
  return <CircleArrowDown className="size-6 shrink-0 fill-muted-foreground text-background" strokeWidth={1.5} />;
}

export function ClockBadge() {
  return <Clock className="size-5 shrink-0 text-muted-foreground" strokeWidth={1.7} />;
}

/* ------------------------------- Metric card ------------------------------ */

export function MetricCard({
  title,
  value,
  badge,
  note,
  noteClass = "text-muted-foreground",
  chart,
}: {
  title: string;
  value: ReactNode;
  badge?: ReactNode;
  note?: ReactNode;
  noteClass?: string;
  chart: ReactNode;
}) {
  return (
    <Card className="min-w-[92%] shrink-0 snap-center p-4">
      <p className="text-[15px] text-foreground/85">{title}</p>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-[30px] leading-none">{value}</span>
        {badge}
      </div>
      {note ? <p className={cn("mt-2 text-[14px]", noteClass)}>{note}</p> : null}
      <div className="mt-5">{chart}</div>
    </Card>
  );
}

/* ------------------------------ Content rows ------------------------------ */

export type ContentRowData = { thumb: string; title: string; views: string };

export function ContentRow({ row }: { row: ContentRowData }) {
  return (
    <div className="flex items-center gap-4">
      <img src={row.thumb} alt="" className="h-12 w-[34px] shrink-0 rounded-[4px] object-cover" />
      <p className="min-w-0 flex-1 truncate text-[15px]">{row.title}</p>
      <span className="shrink-0 text-[15px]">{row.views}</span>
    </div>
  );
}

/* ------------------- Swipeable carousel with live dots -------------------- */

export function SwipeCarousel({
  children,
  className,
  dots,
}: {
  children: ReactNode;
  className?: string;
  dots: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setActive(max > 0 ? Math.round((el.scrollLeft / max) * (dots - 1)) : 0);
  };

  return (
    <>
      <div
        ref={ref}
        onScroll={handleScroll}
        className={cn(
          "no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4",
          className,
        )}
      >
        {children}
      </div>
      <Dots count={dots} active={active} />
    </>
  );
}

/* ------------------------- Content summary cards -------------------------- */

export function MetricBarRow({
  label,
  value,
  fill = "none",
}: {
  label: string;
  value: ReactNode;
  fill?: "none" | "full" | "empty";
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-[16px]">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      {fill === "full" ? <div className="mt-3 h-[8px] w-full rounded-full bg-ytindigo" /> : null}
      {fill === "empty" ? <div className="mt-4 h-[3px] w-full rounded-full bg-muted" /> : null}
    </div>
  );
}

export function StackedBar({
  segments,
}: {
  segments: { pct: number; colorClass: string }[];
}) {
  return (
    <div className="flex h-[10px] w-full overflow-hidden rounded-full">
      {segments.map((s, i) => (
        <div key={i} className={cn("h-full", s.colorClass)} style={{ width: `${s.pct}%` }} />
      ))}
    </div>
  );
}

export function LegendRow({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: string;
  colorClass: string;
}) {
  return (
    <div className="flex items-center gap-4 text-[16px]">
      <span className={cn("size-3.5 shrink-0 rounded-full", colorClass)} />
      <span className="min-w-0 flex-1">{label}</span>
      <span className="shrink-0">{value}</span>
    </div>
  );
}
