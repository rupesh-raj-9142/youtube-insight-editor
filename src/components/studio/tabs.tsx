import { useState } from "react";
import { CircleHelp, Clock, Heart, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BarRow,
  Card,
  CheckBadge,
  ClockBadge,
  ContentRow,
  DownBadge,
  InfoBox,
  LegendRow,
  LineChart,
  MetricBarRow,
  MetricCard,
  MutedNote,
  SectionCard,
  StackedBar,
  SwipeCarousel,
  UpBadge,
} from "./ui";
import {
  audiencePoints,
  flatZeroPoints,
  subscribersPoints,
  topContentRows,
  viewsPoints,
  watchTimePoints,
} from "./data";
import { useStudioStore } from "./store";
import { EditableText, EditableImage } from "./editable";

const X_START = "28 Sept";
const X_END = "25 Oct";

export function OverviewTab() {
  const { state, updateField, updateChartPoints, updateTopContent, removeTopContent } = useStudioStore();

  return (
    <div className="flex flex-col pt-4">
      <SwipeCarousel dots={3}>
        <MetricCard
          title="Views"
          value={
            <EditableText
              value={state.overviewViews}
              onSave={(val) => updateField("overviewViews", val)}
            />
          }
          badge={<CheckBadge />}
          note={
            <EditableText
              value={state.overviewViewsNote}
              onSave={(val) => updateField("overviewViewsNote", val)}
            />
          }
          chart={
            <LineChart
              points={state.viewsPoints}
              onPointsChange={(pts) => updateChartPoints("viewsPoints", pts)}
              gridlines={[0, 3, 6, 9]}
              colorClass="text-ytblue"
              xStart={X_START}
              xEnd={X_END}
            />
          }
        />
        <MetricCard
          title="Watch time (hours)"
          value={
            <EditableText
              value={state.overviewWatchTime}
              onSave={(val) => updateField("overviewWatchTime", val)}
            />
          }
          badge={<DownBadge />}
          note={
            <EditableText
              value={state.overviewWatchTimeNote}
              onSave={(val) => updateField("overviewWatchTimeNote", val)}
            />
          }
          chart={
            <LineChart
              points={state.watchTimePoints}
              onPointsChange={(pts) => updateChartPoints("watchTimePoints", pts)}
              gridlines={[0, 1, 2, 3]}
              gridLabel={() => "0.0"}
              colorClass="text-ytblue"
              xStart={X_START}
              xEnd={X_END}
            />
          }
        />
        <MetricCard
          title="Subscribers"
          value={
            <EditableText
              value={state.overviewSubscribers}
              onSave={(val) => updateField("overviewSubscribers", val)}
            />
          }
          chart={
            <LineChart
              points={state.subscribersPoints}
              onPointsChange={(pts) => updateChartPoints("subscribersPoints", pts)}
              gridlines={[0, -1, -2, -3]}
              colorClass="text-ytblue"
              xStart={X_START}
              xEnd={X_END}
            />
          }
        />
      </SwipeCarousel>

      <SectionCard title="Top content" subtitle="Views · Last 28 days">
        <div className="flex flex-col gap-4">
          {state.topContent.map((row, idx) => (
            <div key={idx} className="flex items-center gap-4 group">
              <EditableImage
                src={row.thumb}
                alt=""
                onImageChange={(val) => updateTopContent(idx, "thumb", val)}
                className="h-12 w-[34px] shrink-0 rounded-[4px] object-cover"
              />
              <EditableText
                value={row.title}
                onSave={(val) => updateTopContent(idx, "title", val)}
                className="min-w-0 flex-1 truncate text-[15px]"
              />
              <EditableText
                value={row.views}
                onSave={(val) => updateTopContent(idx, "views", val)}
                className="shrink-0 text-[15px] font-medium"
              />
              <button
                onClick={() => {
                  if (window.confirm("Remove this row?")) {
                    removeTopContent(idx);
                  }
                }}
                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive text-sm px-1.5 transition-opacity"
                title="Remove row"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

      <Card className="mt-3 p-4">
        <h2 className="text-[20px] font-medium tracking-tight">Real time</h2>
        <div className="mt-3">
          <EditableText
            value={state.realtimeViews}
            onSave={(val) => updateField("realtimeViews", val)}
            className="text-[30px] font-bold leading-none block"
          />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <p className="shrink-0 text-[14px] text-muted-foreground">Views · 48 hours</p>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="mt-4 h-px w-full bg-border" />
        <p className="mt-8 text-[15px] text-muted-foreground">Nothing to show for these dates</p>
      </Card>
    </div>
  );
}

/* ================================ Content ================================ */

const FILTERS = ["All", "Videos", "Shorts", "Live", "Posts"];

const FIND_SEGMENTS = [
  { pct: 42.9, colorClass: "bg-ytfind1" },
  { pct: 28.6, colorClass: "bg-ytfind2" },
  { pct: 14.3, colorClass: "bg-ytfind3" },
  { pct: 7.1, colorClass: "bg-ytfind4" },
  { pct: 7.1, colorClass: "bg-ytfind5" },
];

const FIND_ROWS = [
  { label: "Channel pages", value: "42.9%", colorClass: "bg-ytfind1" },
  { label: "Notifications", value: "28.6%", colorClass: "bg-ytfind2" },
  { label: "YouTube search", value: "14.3%", colorClass: "bg-ytfind3" },
  { label: "Other YouTube features", value: "7.1%", colorClass: "bg-ytfind4" },
  { label: "Shorts feed", value: "7.1%", colorClass: "bg-ytfind5" },
];

function AllContent() {
  return (
    <>
      <SwipeCarousel dots={3}>
        <Card className="min-w-[92%] shrink-0 snap-center p-4">
          <h2 className="text-[20px] font-bold leading-[1.3] tracking-tight">New viewers</h2>
          <p className="mt-1 text-[14px] text-muted-foreground">Last 28 days</p>
          <div className="mt-5">
            <MetricBarRow label="Shorts" value="0" fill="empty" />
          </div>
        </Card>
        <Card className="min-w-[92%] shrink-0 snap-center p-4">
          <h2 className="text-[20px] font-bold leading-[1.3] tracking-tight">Regular viewers</h2>
          <p className="mt-1 text-[14px] text-muted-foreground">Last 28 days</p>
          <div className="mt-5">
            <MetricBarRow label="Shorts" value="0" fill="empty" />
          </div>
        </Card>
        <Card className="min-w-[92%] shrink-0 snap-center p-4">
          <h2 className="text-[20px] font-bold leading-[1.3] tracking-tight">Subscribers</h2>
          <p className="mt-1 text-[14px] text-muted-foreground">Last 28 days</p>
          <div className="mt-5">
            <MetricBarRow label="Shorts" value="0" fill="empty" />
          </div>
        </Card>
      </SwipeCarousel>

      <SectionCard title="Views" subtitle="Last 28 days">
        <MetricBarRow label="Shorts" value="14" fill="full" />
      </SectionCard>

      <SectionCard title="Published content" subtitle="Last 28 days">
        <MetricBarRow label="Shorts" value="1" fill="full" />
      </SectionCard>

      <SectionCard title="Viewers across formats" subtitle="Returning viewers · Last 28 days">
        <InfoBox>Not enough data</InfoBox>
      </SectionCard>

      <SectionCard title="Typical views" subtitle="First 28 days">
        <MetricBarRow label="Videos" value="3–8" />
      </SectionCard>

      <SectionCard title="How viewers find you" subtitle="Views · Last 28 days">
        <StackedBar segments={FIND_SEGMENTS} />
        <div className="mt-5 flex flex-col gap-4">
          {FIND_ROWS.map((row) => (
            <LegendRow key={row.label} label={row.label} value={row.value} colorClass={row.colorClass} />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Top remixed"
        subtitle="Your content used to create Shorts · Last 28 days"
      >
        <InfoBox icon={Clock}>Nothing to show for these dates</InfoBox>
      </SectionCard>
    </>
  );
}

function ShortsContent() {
  const { state, updateChartPoints } = useStudioStore();

  return (
    <>
      <SwipeCarousel dots={4}>
        <MetricCard
          title="Views"
          value="14"
          badge={<UpBadge />}
          note="55% more than previous 28 days"
          noteClass="text-ytgreen"
          chart={
            <LineChart
              points={state.viewsPoints}
              onPointsChange={(pts) => updateChartPoints("viewsPoints", pts)}
              gridlines={[0, 3, 6, 9]}
              colorClass="text-ytindigo"
              xStart={X_START}
              xEnd={X_END}
            />
          }
        />
        <MetricCard
          title="Estimated revenue"
          value="₹6.00"
          badge={<UpBadge />}
          note="About the same as usual"
          chart={
            <LineChart
              points={flatZeroPoints}
              gridlines={[0, 3, 6, 9]}
              colorClass="text-ytindigo"
              xStart={X_START}
              xEnd={X_END}
            />
          }
        />
        <MetricCard
          title="Likes added"
          value="10"
          badge={<UpBadge />}
          note="About the same as usual"
          chart={
            <LineChart
              points={flatZeroPoints}
              gridlines={[0, 3, 6, 9]}
              colorClass="text-ytindigo"
              xStart={X_START}
              xEnd={X_END}
            />
          }
        />
        <MetricCard
          title="Subscribers"
          value="0"
          badge={<UpBadge />}
          note="About the same as usual"
          chart={
            <LineChart
              points={flatZeroPoints}
              gridlines={[0, 3, 6, 9]}
              colorClass="text-ytindigo"
              xStart={X_START}
              xEnd={X_END}
            />
          }
        />
      </SwipeCarousel>

      <SectionCard title="How viewers engaged" subtitle="Last 28 days">
        <SegmentBar leftPct={60} />
        <div className="mt-4 flex justify-between text-[15px]">
          <div>
            <p className="text-[20px] font-medium leading-tight">60.0%</p>
            <p>Stayed to watch</p>
          </div>
          <div className="text-right">
            <p className="text-[20px] font-medium leading-tight">40.0%</p>
            <p>Swiped away</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Top Shorts" subtitle="Views · Last 28 days">
        <div className="flex flex-col gap-4">
          {topContentRows.map((row) => (
            <ContentRow key={row.title} row={row} />
          ))}
        </div>
      </SectionCard>

      <SwipeCarousel className="mt-3" dots={2}>
        <SectionCard
          title="How viewers find your Shorts"
          subtitle="Views · Last 28 days"
          className="min-w-[92%] shrink-0 snap-center"
        >
          <div className="flex flex-col gap-5">
            <BarRow label="Channel pages" value="42.9%" pct={43} />
            <BarRow label="Notifications" value="28.6%" pct={29} />
            <BarRow label="YouTube search" value="14.3%" pct={14} />
          </div>
        </SectionCard>
        <SectionCard
          title="Your subscribers"
          subtitle="Views · Last 28 days"
          className="min-w-[92%] shrink-0 snap-center"
        >
          <InfoBox>Nothing to show for these dates</InfoBox>
        </SectionCard>
      </SwipeCarousel>

      <SectionCard
        title="Top remixed"
        subtitle="Your content used to create Shorts · Last 28 days"
      >
        <InfoBox icon={Clock}>Nothing to show for these dates</InfoBox>
      </SectionCard>
    </>
  );
}

function SegmentBar({ leftPct }: { leftPct: number }) {
  return (
    <div className="flex h-[10px] w-full overflow-hidden rounded-full">
      <div className="h-full bg-ytpurple" style={{ width: `${leftPct}%` }} />
      <div className="h-full flex-1 bg-ytpurple-light" />
    </div>
  );
}

export function ContentTab() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="flex flex-col gap-3 pt-4">
      <div className="no-scrollbar flex gap-2.5 overflow-x-auto px-4">
        {FILTERS.map((chip) => (
          <button
            key={chip}
            onClick={() => setFilter(chip)}
            className={
              chip === filter
                ? "shrink-0 rounded-lg bg-foreground px-4 py-2 text-[14px] font-medium text-background"
                : "shrink-0 rounded-lg bg-secondary px-4 py-2 text-[14px] font-medium text-foreground"
            }
          >
            {chip}
          </button>
        ))}
      </div>

      {filter === "All" && <AllContent />}
      {filter === "Shorts" && <ShortsContent />}
      {filter !== "All" && filter !== "Shorts" && (
        <SectionCard title={filter} subtitle="Last 28 days">
          <InfoBox>Nothing to show for these dates</InfoBox>
        </SectionCard>
      )}
    </div>
  );
}

/* =============================== Audience ================================ */

export function AudienceTab() {
  const { state, updateChartPoints } = useStudioStore();

  return (
    <div className="flex flex-col gap-2 pt-4">
      <SwipeCarousel dots={2}>
        <MetricCard
          title="Monthly audience"
          value="2"
          badge={<ClockBadge />}
          chart={
            <LineChart
              points={state.audiencePoints}
              onPointsChange={(pts) => updateChartPoints("audiencePoints", pts)}
              gridlines={[0, 2, 4, 6]}
              colorClass="text-ytpurple"
              shadeFrom={0.93}
              xStart={X_START}
              xEnd={X_END}
            />
          }
        />
        <MetricCard
          title="Subscribers"
          value="-1"
          chart={
            <LineChart
              points={state.subscribersPoints}
              onPointsChange={(pts) => updateChartPoints("subscribersPoints", pts)}
              gridlines={[0, -1, -2, -3]}
              colorClass="text-ytpurple"
              xStart={X_START}
              xEnd={X_END}
            />
          }
        />
      </SwipeCarousel>

      <SectionCard
        title="Audience by watch behaviour"
        subtitle="Monthly audience · 25 Oct 2026"
        titleIcon={<ClockBadge />}
      >
        <InfoBox>Not enough data to show this report</InfoBox>
      </SectionCard>

      <SwipeCarousel className="mt-3" dots={3}>
        <SectionCard
          title="Popular with new viewers"
          subtitle="Views · Last 28 days"
          className="min-w-[92%] shrink-0 snap-center"
        >
          <InfoBox>Nothing to show for these dates</InfoBox>
        </SectionCard>
        <SectionCard
          title="Popular with returning viewers"
          subtitle="Views · Last 28 days"
          className="min-w-[92%] shrink-0 snap-center"
        >
          <InfoBox>Nothing to show for these dates</InfoBox>
        </SectionCard>
        <SectionCard
          title="Popular with subscribers"
          subtitle="Views · Last 28 days"
          className="min-w-[92%] shrink-0 snap-center"
        >
          <InfoBox>Nothing to show for these dates</InfoBox>
        </SectionCard>
      </SwipeCarousel>

      <SectionCard
        title="When your viewers are on YouTube"
        subtitle="Your local time (GMT +0530) · Last 28 days"
      >
        <MutedNote>Not enough data to show this report</MutedNote>
      </SectionCard>

      <SectionCard title="Device type" subtitle="Watch time (hours) · Last 28 days">
        <div className="h-[10px] w-full rounded-full bg-ytpurple" />
        <div className="mt-4 flex items-center gap-3 text-[15px]">
          <span className="size-3 rounded-full bg-ytpurple" />
          <span>Mobile</span>
          <span className="ml-auto">100.0%</span>
        </div>
      </SectionCard>

      <SectionCard title="Age" subtitle="Last 28 days · Views">
        <InfoBox>Nothing to show for these dates</InfoBox>
      </SectionCard>

      <SectionCard title="Gender" subtitle="Last 28 days · Views">
        <InfoBox>Nothing to show for these dates</InfoBox>
      </SectionCard>

      <SectionCard title="Geography" subtitle="Views · Last 28 days">
        <InfoBox>Nothing to show for these dates</InfoBox>
      </SectionCard>

      <SectionCard title="Top subtitle/CC languages" subtitle="Views · Last 28 days">
        <BarRow label="No subtitles/CC" value="100.0%" pct={100} />
      </SectionCard>

      <SectionCard
        title="Watch time from subscribers"
        subtitle="Watch time (hours) · Last 28 days"
      >
        <div className="flex flex-col gap-5">
          <BarRow label="Not subscribed" value="76.2%" pct={76} />
          <BarRow label="Subscribed" value="23.8%" pct={24} />
        </div>
      </SectionCard>

      <SectionCard title="What your audience watches" subtitle="Last 7 days">
        <MutedNote>Not enough data to show this report</MutedNote>
      </SectionCard>

      <SectionCard title="Channels that your audience watches" subtitle="Last 28 days">
        <MutedNote>Not enough data to show this report</MutedNote>
      </SectionCard>

      <SectionCard
        title="Formats that your viewers watch on YouTube"
        subtitle="Last 28 days"
      >
        <InfoBox>Not enough data to show this report</InfoBox>
      </SectionCard>
    </div>
  );
}

const EXAMPLES = [
  "Virtual reality",
  "Yoga stretch",
  "Beauty products",
  "Making bread",
  "Knitting",
  "Nuclear physics",
  "Personal finance",
  "Portrait photography",
];

export function TrendsTab() {
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col pt-5">
      <div className="flex items-center gap-3 px-4">
        <h1 className="text-[26px] font-bold tracking-tight">Explore topics</h1>
        <CircleHelp className="size-6 shrink-0" strokeWidth={1.7} />
        <button
          onClick={() => setSaved(!saved)}
          aria-label="Saved topics"
          className="ml-auto flex items-center gap-2"
        >
          <Heart className={cn("size-7", saved && "fill-foreground")} strokeWidth={1.7} />
          <span className="text-[20px]">{saved ? 1 : 0}</span>
        </button>
      </div>

      <div className="mt-6 px-4">
        <div className="flex items-center gap-3 rounded-full bg-secondary px-5 py-3.5">
          <Search className="size-6 shrink-0" strokeWidth={1.7} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent text-[17px] outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <h2 className="mt-10 px-4 text-[24px] font-bold tracking-tight">Or start with an example</h2>
      <div className="mt-5 flex flex-wrap gap-3 px-4">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => setQuery(ex)}
            className="rounded-lg bg-secondary px-4 py-2.5 text-[16px] font-medium"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}
