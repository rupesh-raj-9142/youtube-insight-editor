import React from "react";
import { ArrowLeft } from "lucide-react";
import { useStudioStore, type RankedVideoItem } from "./store";
import { EditableText, EditableImage } from "./editable";
import { cn } from "@/lib/utils";

interface TopRecentVideosScreenProps {
  onBack: () => void;
}

export function TopRecentVideosScreen({ onBack }: TopRecentVideosScreenProps) {
  const { state, updateField, updateTopRecentVideo } = useStudioStore();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pb-8">
      {/* Top Header */}
      <div className="sticky top-0 z-30 flex items-center gap-4 bg-background/95 backdrop-blur px-4 py-3.5 border-b border-border/40">
        <button
          onClick={onBack}
          aria-label="Back to dashboard"
          className="p-1 -ml-1 rounded-full hover:bg-secondary active:scale-95 transition"
        >
          <ArrowLeft className="size-6 text-foreground" strokeWidth={2} />
        </button>
        <EditableText
          value={state.topRecentVideosTitle || "Top recent videos"}
          onSave={(val) => updateField("topRecentVideosTitle", val)}
          className="text-[20px] font-semibold tracking-tight block"
        />
      </div>

      {/* Overview title & subheader */}
      <div className="px-5 pt-6 pb-4">
        <EditableText
          value={state.topRecentVideosPeriod || "First 22 days, 8 hours"}
          onSave={(val) => updateField("topRecentVideosPeriod", val)}
          className="text-[24px] font-bold tracking-tight block leading-tight text-foreground"
        />
        <EditableText
          value={state.topRecentVideosSubtitle || "Comparing views of previous 10 Shorts"}
          onSave={(val) => updateField("topRecentVideosSubtitle", val)}
          className="mt-1.5 text-[14.5px] text-muted-foreground block"
        />
      </div>

      {/* Ranked videos list */}
      <div className="flex flex-col mt-2">
        {state.topRecentVideos.map((item: RankedVideoItem, idx: number) => {
          const isCurrent = !!item.isCurrent;

          return (
            <div
              key={idx}
              className={cn(
                "flex items-center px-4 py-2.5 transition-colors",
                isCurrent
                  ? "bg-zinc-100 dark:bg-zinc-800/80 font-semibold"
                  : "hover:bg-muted/40 font-normal"
              )}
            >
              {/* Rank */}
              <div className="w-8 shrink-0 flex items-center justify-center text-[15.5px]">
                <EditableText
                  value={item.rank}
                  onSave={(val) => updateTopRecentVideo(idx, "rank", val)}
                  className={cn(
                    isCurrent ? "font-bold text-foreground" : "text-muted-foreground"
                  )}
                />
              </div>

              {/* Thumbnail (Shorts aspect 9:16) */}
              <div className="shrink-0 ml-3 mr-4">
                <div className="w-[34px] h-[58px] rounded-[4px] overflow-hidden bg-muted shadow-sm">
                  <EditableImage
                    src={item.thumb}
                    alt={item.title}
                    onImageChange={(val) => updateTopRecentVideo(idx, "thumb", val)}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Title */}
              <div className="flex-1 min-w-0 pr-3">
                <EditableText
                  value={item.title}
                  onSave={(val) => updateTopRecentVideo(idx, "title", val)}
                  className={cn(
                    "text-[15px] leading-snug block truncate",
                    isCurrent ? "font-bold text-foreground" : "text-foreground"
                  )}
                />
              </div>

              {/* Views */}
              <div className="shrink-0 text-right min-w-[44px]">
                <EditableText
                  value={item.views}
                  onSave={(val) => updateTopRecentVideo(idx, "views", val)}
                  className={cn(
                    "text-[15.5px] block tabular-nums",
                    isCurrent ? "font-bold text-foreground" : "text-foreground"
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

