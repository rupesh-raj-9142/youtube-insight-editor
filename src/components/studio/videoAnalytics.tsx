import React, { useState } from "react";
import { ArrowLeft, Info, Clock } from "lucide-react";
import { useStudioStore } from "./store";
import { EditableText, EditableImage } from "./editable";
import { Card, LineChart, Dots } from "./ui";
import { cn } from "@/lib/utils";

interface VideoAnalyticsScreenProps {
  onBack: () => void;
  initialTab?: "Overview" | "Reach" | "Engagement" | "Audience";
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
    </svg>
  );
}

export function VideoAnalyticsScreen({ onBack, initialTab = "Overview" }: VideoAnalyticsScreenProps) {
  const { state, updateField, updateChartPoints } = useStudioStore();
  const [activeTab, setActiveTab] = useState<"Overview" | "Reach" | "Engagement" | "Audience">(initialTab);
  const [overviewCarouselIndex, setOverviewCarouselIndex] = useState(0);
  const [reachCarouselIndex, setReachCarouselIndex] = useState(0);
  const [engagementCarouselIndex, setEngagementCarouselIndex] = useState(0);
  const [audienceCarouselIndex, setAudienceCarouselIndex] = useState(0);

  const tabs: Array<"Overview" | "Reach" | "Engagement" | "Audience"> = [
    "Overview",
    "Reach",
    "Engagement",
    "Audience",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pb-8">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-background/95 backdrop-blur px-4 py-3 border-b border-border/40">
        <div className="flex items-center gap-3.5 min-w-0">
          <button
            onClick={onBack}
            aria-label="Back to dashboard"
            className="p-1 -ml-1 rounded-full hover:bg-secondary active:scale-95 transition"
          >
            <ArrowLeft className="size-6 text-foreground" strokeWidth={2} />
          </button>
          <div className="w-[20px] h-[32px] shrink-0 rounded-[3px] overflow-hidden bg-muted">
            <EditableImage
              src={state.videoAnalyticsThumb || state.latestPublished[0]?.thumb || ""}
              alt="Short thumbnail"
              onImageChange={(val) => updateField("videoAnalyticsThumb", val)}
              className="w-full h-full object-cover"
            />
          </div>
          <EditableText
            value={state.videoAnalyticsTitle || "#viral"}
            onSave={(val) => updateField("videoAnalyticsTitle", val)}
            className="text-[19px] font-bold tracking-tight truncate block"
          />
        </div>
        <button
          aria-label="Inspiration"
          className="p-1 rounded-full hover:bg-secondary active:scale-95 transition text-foreground"
        >
          <SparkleIcon className="size-6" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border/70 px-4 gap-6 overflow-x-auto no-scrollbar sticky top-[57px] bg-background/95 backdrop-blur z-20">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-2.5 pt-2 text-[15px] font-semibold whitespace-nowrap transition-colors relative",
                isActive ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-foreground rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 1. OVERVIEW TAB */}
      {/* ========================================================================= */}
      {activeTab === "Overview" && (
        <div className="flex flex-col">
          {/* Headline */}
          <div className="px-4 pt-5 pb-3">
            <EditableText
              value={state.videoAnalyticsHeadline || "This Short has had 6 views since it was published"}
              onSave={(val) => updateField("videoAnalyticsHeadline", val)}
              as="h1"
              className="text-[23px] font-bold tracking-tight text-foreground leading-[1.25] block"
              multiline
            />
          </div>

          {/* Carousel */}
          <div className="relative mt-2">
            <div
              className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4"
              onScroll={(e) => {
                const el = e.currentTarget;
                const scrollLeft = el.scrollLeft;
                const width = el.clientWidth * 0.8;
                setOverviewCarouselIndex(Math.round(scrollLeft / width));
              }}
            >
              {/* Card 1: Views */}
              <Card className="min-w-[88%] shrink-0 snap-start p-4">
                <EditableText
                  value="Views"
                  onSave={() => {}}
                  className="text-[15px] text-muted-foreground font-medium block"
                />
                <div className="mt-0.5">
                  <EditableText
                    value={state.videoAnalyticsViews || "6"}
                    onSave={(val) => updateField("videoAnalyticsViews", val)}
                    className="text-[32px] font-bold text-foreground leading-none block"
                  />
                </div>
                <LineChart
                  points={state.videoAnalyticsViewsPoints}
                  onPointsChange={(pts) => updateChartPoints("videoAnalyticsViewsPoints", pts)}
                  gridlines={[0, 2, 4, 6]}
                  colorClass="stroke-[#00a8e8] text-[#00a8e8]"
                  xStart="0"
                  xEnd={state.videoAnalyticsViewsPeriod || "22 days"}
                  className="mt-4"
                />
              </Card>

              {/* Card 2: Shown in feed */}
              <Card className="min-w-[88%] shrink-0 snap-start p-4">
                <EditableText
                  value="Shown in feed"
                  onSave={() => {}}
                  className="text-[15px] text-muted-foreground font-medium block"
                />
                <div className="mt-0.5">
                  <EditableText
                    value={state.videoAnalyticsShownInFeed || "0"}
                    onSave={(val) => updateField("videoAnalyticsShownInFeed", val)}
                    className="text-[32px] font-bold text-foreground leading-none block"
                  />
                </div>
                <LineChart
                  points={state.videoAnalyticsShownInFeedPoints}
                  onPointsChange={(pts) => updateChartPoints("videoAnalyticsShownInFeedPoints", pts)}
                  gridlines={[0, 1, 2, 3]}
                  colorClass="stroke-[#00a8e8] text-[#00a8e8]"
                  xStart="0"
                  xEnd={state.videoAnalyticsViewsPeriod || "22 days"}
                  className="mt-4"
                />
              </Card>
            </div>
            <Dots count={2} active={overviewCarouselIndex} />
          </div>

          {/* Audience retention Card */}
          <div className="px-4 mt-2">
            <Card className="p-4">
              <EditableText
                value={state.videoAnalyticsRetentionTitle || "Audience retention"}
                onSave={(val) => updateField("videoAnalyticsRetentionTitle", val)}
                className="text-[18.5px] font-bold tracking-tight text-foreground block"
              />
              <EditableText
                value={state.videoAnalyticsRetentionSubtitle || "Average view duration · Lifetime"}
                onSave={(val) => updateField("videoAnalyticsRetentionSubtitle", val)}
                className="text-[14px] text-muted-foreground mt-0.5 block"
              />

              <div className="mt-4 flex items-start gap-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 p-4">
                <Info className="size-5 shrink-0 text-muted-foreground mt-0.5" strokeWidth={1.8} />
                <EditableText
                  value={
                    state.videoAnalyticsRetentionNotice ||
                    "Not enough information to display audience retention data."
                  }
                  onSave={(val) => updateField("videoAnalyticsRetentionNotice", val)}
                  className="text-[14px] text-foreground leading-snug block"
                  multiline
                />
              </div>
            </Card>
          </div>

          {/* Real time Card */}
          <div className="px-4 mt-4">
            <Card className="p-4">
              <EditableText
                value={state.videoAnalyticsRealtimeTitle || "Real time"}
                onSave={(val) => updateField("videoAnalyticsRealtimeTitle", val)}
                className="text-[19px] font-bold tracking-tight text-foreground block"
              />
              <div className="mt-2">
                <EditableText
                  value={state.videoAnalyticsRealtimeViews || "0"}
                  onSave={(val) => updateField("videoAnalyticsRealtimeViews", val)}
                  className="text-[28px] font-bold text-foreground leading-none block"
                />
              </div>

              <div className="mt-3 flex items-center justify-between border-b border-border/60 pb-3">
                <EditableText
                  value={state.videoAnalyticsRealtimePeriod || "Views · 48 hours"}
                  onSave={(val) => updateField("videoAnalyticsRealtimePeriod", val)}
                  className="text-[14.5px] text-muted-foreground block"
                />
              </div>

              <div className="mt-4">
                <EditableText
                  value={state.videoAnalyticsRealtimeNotice || "Nothing to show for these dates"}
                  onSave={(val) => updateField("videoAnalyticsRealtimeNotice", val)}
                  className="text-[14px] text-muted-foreground block"
                />
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. REACH TAB */}
      {/* ========================================================================= */}
      {activeTab === "Reach" && (
        <div className="flex flex-col pt-3">
          {/* Carousel */}
          <div className="relative">
            <div
              className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4"
              onScroll={(e) => {
                const el = e.currentTarget;
                const scrollLeft = el.scrollLeft;
                const width = el.clientWidth * 0.8;
                setReachCarouselIndex(Math.round(scrollLeft / width));
              }}
            >
              {/* Card 1: Shown in feed */}
              <Card className="min-w-[88%] shrink-0 snap-start p-4">
                <EditableText
                  value="Shown in feed"
                  onSave={() => {}}
                  className="text-[15px] text-muted-foreground font-medium block"
                />
                <div className="mt-0.5">
                  <EditableText
                    value={state.reachShownInFeed || "0"}
                    onSave={(val) => updateField("reachShownInFeed", val)}
                    className="text-[32px] font-bold text-foreground leading-none block"
                  />
                </div>
                <LineChart
                  points={state.videoAnalyticsShownInFeedPoints}
                  onPointsChange={(pts) => updateChartPoints("videoAnalyticsShownInFeedPoints", pts)}
                  gridlines={[0, 1, 2, 3]}
                  colorClass="stroke-[#00a8e8] text-[#00a8e8]"
                  xStart="0"
                  xEnd={state.videoAnalyticsViewsPeriod || "22 days"}
                  className="mt-4"
                />
              </Card>

              {/* Card 2: How many chose to view */}
              <Card className="min-w-[88%] shrink-0 snap-start p-4">
                <h3 className="text-[16px] font-bold text-foreground">How many chose to view</h3>
                <p className="text-[13px] text-muted-foreground mt-0.5">Lifetime</p>

                <div className="mt-5 space-y-4">
                  <div>
                    <div className="flex justify-between text-[14.5px] font-medium mb-1.5">
                      <span>Viewed</span>
                      <EditableText
                        value={state.reachViewedPct || "100.0%"}
                        onSave={(val) => updateField("reachViewedPct", val)}
                        className="font-bold"
                      />
                    </div>
                    <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-[#00a8e8] rounded-full w-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[14.5px] font-medium mb-1.5">
                      <span>Swiped away</span>
                      <EditableText
                        value={state.reachSwipedAwayPct || "0.0%"}
                        onSave={(val) => updateField("reachSwipedAwayPct", val)}
                        className="font-bold text-muted-foreground"
                      />
                    </div>
                    <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-muted-foreground/30 rounded-full w-0" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <Dots count={2} active={reachCarouselIndex} />
          </div>

          {/* Traffic Sources */}
          <div className="px-4 mt-2">
            <Card className="p-4">
              <h2 className="text-[18.5px] font-bold tracking-tight text-foreground">
                How viewers find this Short
              </h2>
              <p className="text-[13.5px] text-muted-foreground mt-0.5">Views · Lifetime</p>

              <div className="mt-4 space-y-3.5">
                <div className="flex items-center justify-between text-[14.5px]">
                  <span className="text-foreground">Channel pages</span>
                  <EditableText
                    value={state.reachTrafficChannelPages || "66.7%"}
                    onSave={(val) => updateField("reachTrafficChannelPages", val)}
                    className="font-semibold tabular-nums"
                  />
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-[#00a8e8] rounded-full w-[66.7%]" />
                </div>

                <div className="flex items-center justify-between text-[14.5px] pt-1">
                  <span className="text-foreground">Shorts feed</span>
                  <EditableText
                    value={state.reachTrafficShortsFeed || "33.3%"}
                    onSave={(val) => updateField("reachTrafficShortsFeed", val)}
                    className="font-semibold tabular-nums"
                  />
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-sky-400 rounded-full w-[33.3%]" />
                </div>

                <div className="flex items-center justify-between text-[14.5px] pt-1">
                  <span className="text-foreground">Other YouTube features</span>
                  <EditableText
                    value={state.reachTrafficOther || "0.0%"}
                    onSave={(val) => updateField("reachTrafficOther", val)}
                    className="font-semibold tabular-nums text-muted-foreground"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* YouTube Search terms */}
          <div className="px-4 mt-4">
            <Card className="p-4">
              <h2 className="text-[18px] font-bold tracking-tight text-foreground">
                YouTube search terms
              </h2>
              <p className="text-[13.5px] text-muted-foreground mt-0.5">Views · Lifetime</p>
              <div className="mt-6 mb-2 flex items-center gap-3 text-muted-foreground text-[14.5px]">
                <Clock className="size-5 shrink-0" strokeWidth={1.8} />
                <span>Not enough traffic data to show this report</span>
              </div>
            </Card>
          </div>

          {/* External sites or apps */}
          <div className="px-4 mt-4">
            <Card className="p-4">
              <h2 className="text-[18px] font-bold tracking-tight text-foreground">
                External sites or apps
              </h2>
              <p className="text-[13.5px] text-muted-foreground mt-0.5">Views · Lifetime</p>
              <div className="mt-6 mb-2 flex items-center gap-3 text-muted-foreground text-[14.5px]">
                <Clock className="size-5 shrink-0" strokeWidth={1.8} />
                <span>Not enough traffic data to show this report</span>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. ENGAGEMENT TAB */}
      {/* ========================================================================= */}
      {activeTab === "Engagement" && (
        <div className="flex flex-col pt-3">
          {/* Carousel */}
          <div className="relative">
            <div
              className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4"
              onScroll={(e) => {
                const el = e.currentTarget;
                const scrollLeft = el.scrollLeft;
                const width = el.clientWidth * 0.8;
                setEngagementCarouselIndex(Math.round(scrollLeft / width));
              }}
            >
              {/* Card 1: Watch time */}
              <Card className="min-w-[88%] shrink-0 snap-start p-4">
                <EditableText
                  value="Watch time (hours)"
                  onSave={() => {}}
                  className="text-[15px] text-muted-foreground font-medium block"
                />
                <div className="mt-0.5">
                  <EditableText
                    value={state.engagementWatchTime || "0.0"}
                    onSave={(val) => updateField("engagementWatchTime", val)}
                    className="text-[32px] font-bold text-foreground leading-none block"
                  />
                </div>
                <LineChart
                  points={state.videoAnalyticsShownInFeedPoints}
                  onPointsChange={(pts) => updateChartPoints("videoAnalyticsShownInFeedPoints", pts)}
                  gridlines={[0, 0.5, 1]}
                  colorClass="stroke-[#00a8e8] text-[#00a8e8]"
                  xStart="0"
                  xEnd={state.videoAnalyticsViewsPeriod || "22 days"}
                  className="mt-4"
                />
              </Card>

              {/* Card 2: Average percentage viewed */}
              <Card className="min-w-[88%] shrink-0 snap-start p-4">
                <EditableText
                  value="Average percentage viewed"
                  onSave={() => {}}
                  className="text-[15px] text-muted-foreground font-medium block"
                />
                <div className="mt-0.5">
                  <EditableText
                    value={state.engagementAvgPctViewed || "61.0%"}
                    onSave={(val) => updateField("engagementAvgPctViewed", val)}
                    className="text-[32px] font-bold text-foreground leading-none block"
                  />
                </div>
                <div className="mt-4 flex flex-col gap-2 pt-2 border-t border-border/60">
                  <div className="flex justify-between text-[14px]">
                    <span className="text-muted-foreground">Average view duration</span>
                    <EditableText
                      value={state.engagementAvgViewDuration || "0:05"}
                      onSave={(val) => updateField("engagementAvgViewDuration", val)}
                      className="font-bold text-foreground"
                    />
                  </div>
                </div>
              </Card>
            </div>
            <Dots count={2} active={engagementCarouselIndex} />
          </div>

          {/* Audience retention Card */}
          <div className="px-4 mt-2">
            <Card className="p-4">
              <EditableText
                value={state.videoAnalyticsRetentionTitle || "Audience retention"}
                onSave={(val) => updateField("videoAnalyticsRetentionTitle", val)}
                className="text-[18.5px] font-bold tracking-tight text-foreground block"
              />
              <EditableText
                value={state.videoAnalyticsRetentionSubtitle || "Average view duration · Lifetime"}
                onSave={(val) => updateField("videoAnalyticsRetentionSubtitle", val)}
                className="text-[14px] text-muted-foreground mt-0.5 block"
              />

              <div className="mt-4 flex items-start gap-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 p-4">
                <Info className="size-5 shrink-0 text-muted-foreground mt-0.5" strokeWidth={1.8} />
                <EditableText
                  value={
                    state.videoAnalyticsRetentionNotice ||
                    "Not enough information to display audience retention data."
                  }
                  onSave={(val) => updateField("videoAnalyticsRetentionNotice", val)}
                  className="text-[14px] text-foreground leading-snug block"
                  multiline
                />
              </div>
            </Card>
          </div>

          {/* Likes vs Dislikes Card */}
          <div className="px-4 mt-4">
            <Card className="p-4">
              <h2 className="text-[18.5px] font-bold tracking-tight text-foreground">
                Likes (vs. dislikes)
              </h2>
              <p className="text-[13.5px] text-muted-foreground mt-0.5">Lifetime</p>

              <div className="mt-5 space-y-3">
                <div className="flex justify-between items-center text-[15px]">
                  <span className="font-semibold text-foreground">This Short</span>
                  <EditableText
                    value={state.engagementLikesPct || "100.0%"}
                    onSave={(val) => updateField("engagementLikesPct", val)}
                    className="font-bold tabular-nums"
                  />
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-[#00a8e8] rounded-full w-full" />
                </div>

                <div className="flex justify-between items-center text-[14px] pt-2 text-muted-foreground">
                  <span>Channel average</span>
                  <EditableText
                    value={state.engagementLikesVsChannel || "100.0%"}
                    onSave={(val) => updateField("engagementLikesVsChannel", val)}
                    className="font-medium tabular-nums"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. AUDIENCE TAB */}
      {/* ========================================================================= */}
      {activeTab === "Audience" && (
        <div className="flex flex-col pt-3">
          {/* Carousel */}
          <div className="relative">
            <div
              className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4"
              onScroll={(e) => {
                const el = e.currentTarget;
                const scrollLeft = el.scrollLeft;
                const width = el.clientWidth * 0.8;
                setAudienceCarouselIndex(Math.round(scrollLeft / width));
              }}
            >
              {/* Card 1: Returning viewers */}
              <Card className="min-w-[88%] shrink-0 snap-start p-4">
                <EditableText
                  value="Returning viewers"
                  onSave={() => {}}
                  className="text-[15px] text-muted-foreground font-medium block"
                />
                <div className="mt-0.5">
                  <EditableText
                    value={state.audienceReturningViewers || "0"}
                    onSave={(val) => updateField("audienceReturningViewers", val)}
                    className="text-[32px] font-bold text-foreground leading-none block"
                  />
                </div>
                <LineChart
                  points={state.videoAnalyticsShownInFeedPoints}
                  onPointsChange={(pts) => updateChartPoints("videoAnalyticsShownInFeedPoints", pts)}
                  gridlines={[0, 1, 2]}
                  colorClass="stroke-[#00a8e8] text-[#00a8e8]"
                  xStart="0"
                  xEnd={state.videoAnalyticsViewsPeriod || "22 days"}
                  className="mt-4"
                />
              </Card>

              {/* Card 2: Unique viewers */}
              <Card className="min-w-[88%] shrink-0 snap-start p-4">
                <EditableText
                  value="Unique viewers"
                  onSave={() => {}}
                  className="text-[15px] text-muted-foreground font-medium block"
                />
                <div className="mt-0.5">
                  <EditableText
                    value={state.audienceUniqueViewers || "5"}
                    onSave={(val) => updateField("audienceUniqueViewers", val)}
                    className="text-[32px] font-bold text-foreground leading-none block"
                  />
                </div>
                <LineChart
                  points={state.videoAnalyticsViewsPoints}
                  onPointsChange={(pts) => updateChartPoints("videoAnalyticsViewsPoints", pts)}
                  gridlines={[0, 2, 4, 6]}
                  colorClass="stroke-[#00a8e8] text-[#00a8e8]"
                  xStart="0"
                  xEnd={state.videoAnalyticsViewsPeriod || "22 days"}
                  className="mt-4"
                />
              </Card>

              {/* Card 3: Subscribers */}
              <Card className="min-w-[88%] shrink-0 snap-start p-4">
                <EditableText
                  value="Subscribers"
                  onSave={() => {}}
                  className="text-[15px] text-muted-foreground font-medium block"
                />
                <div className="mt-0.5">
                  <EditableText
                    value={state.audienceSubscribersGained || "+0"}
                    onSave={(val) => updateField("audienceSubscribersGained", val)}
                    className="text-[32px] font-bold text-foreground leading-none block"
                  />
                </div>
                <LineChart
                  points={state.videoAnalyticsShownInFeedPoints}
                  onPointsChange={(pts) => updateChartPoints("videoAnalyticsShownInFeedPoints", pts)}
                  gridlines={[0, 1]}
                  colorClass="stroke-[#00a8e8] text-[#00a8e8]"
                  xStart="0"
                  xEnd={state.videoAnalyticsViewsPeriod || "22 days"}
                  className="mt-4"
                />
              </Card>
            </div>
            <Dots count={3} active={audienceCarouselIndex} />
          </div>

          {/* Watch time from subscribers */}
          <div className="px-4 mt-2">
            <Card className="p-4">
              <h2 className="text-[18.5px] font-bold tracking-tight text-foreground">
                Watch time from subscribers
              </h2>
              <p className="text-[13.5px] text-muted-foreground mt-0.5">Watch time · Lifetime</p>

              <div className="mt-4 space-y-3.5">
                <div className="flex items-center justify-between text-[14.5px]">
                  <span>Not subscribed</span>
                  <EditableText
                    value={state.audienceWatchTimeNotSubscribed || "100.0%"}
                    onSave={(val) => updateField("audienceWatchTimeNotSubscribed", val)}
                    className="font-semibold tabular-nums"
                  />
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-[#00a8e8] rounded-full w-full" />
                </div>

                <div className="flex items-center justify-between text-[14.5px] pt-1 text-muted-foreground">
                  <span>Subscribed</span>
                  <EditableText
                    value={state.audienceWatchTimeSubscribed || "0.0%"}
                    onSave={(val) => updateField("audienceWatchTimeSubscribed", val)}
                    className="font-medium tabular-nums"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Age demographics */}
          <div className="px-4 mt-4">
            <Card className="p-4">
              <h2 className="text-[18px] font-bold tracking-tight text-foreground">Age</h2>
              <p className="text-[13.5px] text-muted-foreground mt-0.5">Views · Lifetime</p>
              <div className="mt-6 mb-2 flex items-center gap-3 text-muted-foreground text-[14.5px]">
                <Clock className="size-5 shrink-0" strokeWidth={1.8} />
                <span>Not enough demographic data to show this report</span>
              </div>
            </Card>
          </div>

          {/* Gender demographics */}
          <div className="px-4 mt-4">
            <Card className="p-4">
              <h2 className="text-[18px] font-bold tracking-tight text-foreground">Gender</h2>
              <p className="text-[13.5px] text-muted-foreground mt-0.5">Views · Lifetime</p>
              <div className="mt-6 mb-2 flex items-center gap-3 text-muted-foreground text-[14.5px]">
                <Clock className="size-5 shrink-0" strokeWidth={1.8} />
                <span>Not enough demographic data to show this report</span>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
