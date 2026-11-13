import React, { useState } from "react";
import { ArrowLeft, Info } from "lucide-react";
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
  const [carouselIndex, setCarouselIndex] = useState(0);

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
            aria-label="Back"
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
      <div className="flex border-b border-border/70 px-4 gap-6 overflow-x-auto no-scrollbar">
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

      {/* Carousel of Analytics Cards */}
      <div className="relative mt-2">
        <div
          className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4"
          onScroll={(e) => {
            const el = e.currentTarget;
            const scrollLeft = el.scrollLeft;
            const width = el.clientWidth * 0.8;
            setCarouselIndex(Math.round(scrollLeft / width));
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

        {/* Carousel Dots */}
        <Dots count={2} active={carouselIndex} />
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
  );
}
