import { useState } from "react";
import { ChevronDown, ChevronRight, ChevronUp, EllipsisVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CheckBadge } from "./ui";
import { useStudioStore, type LatestItem, type CommentItemData } from "./store";
import { EditableText, EditableImage } from "./editable";
import {
  StudioAnalyticsIcon,
  StudioThumbsUp,
  StudioCommentBubble,
} from "./icons";

function LatestCard({
  item,
  index,
  open,
  onToggle,
  onOpenRanking,
  onOpenViews,
  onOpenAvgViewed,
  onOpenLikes,
}: {
  item: LatestItem;
  index: number;
  open: boolean;
  onToggle: () => void;
  onOpenRanking?: (() => void) | undefined;
  onOpenViews?: (() => void) | undefined;
  onOpenAvgViewed?: (() => void) | undefined;
  onOpenLikes?: (() => void) | undefined;
}) {
  const { updateLatest } = useStudioStore();

  return (
    <Card className="mx-4 mt-4 px-4">
      <div className="flex items-start gap-3.5 py-3.5">
        <EditableImage
          src={item.thumb}
          alt={item.title}
          onImageChange={(val) => updateLatest(index, "thumb", val)}
          className="h-[105px] w-[64px] shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0 pt-0.5 flex-1">
          <EditableText
            value={item.title}
            onSave={(val) => updateLatest(index, "title", val)}
            className="text-[19px] font-medium leading-snug block"
          />
          <EditableText
            value={item.period}
            onSave={(val) => updateLatest(index, "period", val)}
            className="mt-1 text-[15px] text-muted-foreground block"
          />
        </div>
      </div>
      <div className="flex items-center gap-7 border-t border-b border-border/70 py-2.5">
        <span
          onClick={onOpenViews}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          title="View analytics for this Short"
        >
          <StudioAnalyticsIcon className="size-[19px] text-foreground" />
          <EditableText
            value={item.views}
            onSave={(val) => updateLatest(index, "views", val)}
            className="text-[16px] font-normal"
          />
        </span>
        <span
          onClick={onOpenLikes || onOpenViews}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          title="View likes"
        >
          <StudioThumbsUp className="size-[19px] text-foreground" />
          <EditableText
            value={item.likes}
            onSave={(val) => updateLatest(index, "likes", val)}
            className="text-[16px] font-normal"
          />
        </span>
        <span className="flex items-center gap-2">
          <StudioCommentBubble className="size-[19px] text-foreground" />
          <EditableText
            value={item.comments}
            onSave={(val) => updateLatest(index, "comments", val)}
            className="text-[16px] font-normal"
          />
        </span>
        <button onClick={onToggle} aria-label={open ? "Collapse" : "Expand"} className="ml-auto p-1 text-muted-foreground">
          {open ? (
            <ChevronUp className="size-5" strokeWidth={1.8} />
          ) : (
            <ChevronDown className="size-5" strokeWidth={1.8} />
          )}
        </button>
      </div>
      {open ? (
        <div>
          <div
            onClick={onOpenRanking}
            className="flex items-center justify-between py-3.5 text-[15.5px] border-b border-border/70 cursor-pointer hover:bg-muted/40 active:bg-muted/60 transition-colors -mx-4 px-4 select-none"
            role="button"
            tabIndex={0}
            title="View top recent videos ranking"
          >
            <EditableText
              value={item.rankingLabel || "Ranking by views"}
              onSave={(val) => updateLatest(index, "rankingLabel", val)}
              className="font-normal"
            />
            <span className="flex items-center gap-2">
              <EditableText
                value={item.ranking || "9 of 10"}
                onSave={(val) => updateLatest(index, "ranking", val)}
                className="font-normal"
              />
              <ChevronRight className="size-4 text-muted-foreground" strokeWidth={1.8} />
            </span>
          </div>
          <div
            onClick={onOpenViews}
            className="flex items-center justify-between py-3.5 text-[15.5px] border-b border-border/70 cursor-pointer hover:bg-muted/40 active:bg-muted/60 transition-colors -mx-4 px-4 select-none"
            role="button"
            tabIndex={0}
            title="View analytics for this Short"
          >
            <EditableText
              value={item.viewsLabel || "Views"}
              onSave={(val) => updateLatest(index, "viewsLabel", val)}
              className="font-normal"
            />
            <EditableText
              value={item.views}
              onSave={(val) => updateLatest(index, "views", val)}
              className="font-normal"
            />
          </div>
          <div
            onClick={onOpenAvgViewed || onOpenViews}
            className="flex items-center justify-between py-3.5 text-[15.5px] border-b border-border/70 cursor-pointer hover:bg-muted/40 active:bg-muted/60 transition-colors -mx-4 px-4 select-none"
            role="button"
            tabIndex={0}
            title="View average percentage viewed"
          >
            <EditableText
              value={item.avgViewedLabel || "Average percentage viewed"}
              onSave={(val) => updateLatest(index, "avgViewedLabel", val)}
              className="font-normal"
            />
            <EditableText
              value={item.avgViewed || "61.0%"}
              onSave={(val) => updateLatest(index, "avgViewed", val)}
              className="font-normal"
            />
          </div>
          <div
            onClick={onOpenLikes || onOpenViews}
            className="flex items-center justify-between py-3.5 text-[15.5px] cursor-pointer hover:bg-muted/40 active:bg-muted/60 transition-colors -mx-4 px-4 select-none"
            role="button"
            tabIndex={0}
            title="View likes"
          >
            <EditableText
              value={item.likesLabel || "Likes"}
              onSave={(val) => updateLatest(index, "likesLabel", val)}
              className="font-normal"
            />
            <EditableText
              value={item.likes}
              onSave={(val) => updateLatest(index, "likes", val)}
              className="font-normal"
            />
          </div>
        </div>
      ) : null}
    </Card>
  );
}

function DashboardCommentItem({
  c,
  idx,
}: {
  c: CommentItemData;
  idx: number;
}) {
  const { updateDashboardComment, removeDashboardComment } = useStudioStore();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Card className="mx-4 mt-4 p-4">
      <div className="flex items-start gap-4">
        <EditableText
          value={c.video}
          onSave={(val) => updateDashboardComment(idx, "video", val)}
          className="min-w-0 flex-1 text-[17px] font-medium leading-snug"
        />
        <EditableImage
          src={c.thumb}
          alt=""
          onImageChange={(val) => updateDashboardComment(idx, "thumb", val)}
          className="h-[80px] w-[157px] shrink-0 rounded-lg object-cover"
        />
      </div>
      <div className="mt-4 flex items-start gap-3 border-t border-border pt-4">
        <EditableImage
          src={c.avatar}
          alt=""
          onImageChange={(val) => updateDashboardComment(idx, "avatar", val)}
          className="size-10 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] text-muted-foreground flex items-center gap-1.5 flex-wrap">
            <EditableText
              value={c.handle}
              onSave={(val) => updateDashboardComment(idx, "handle", val)}
              className="font-medium"
            />
            <span className="shrink-0">•</span>
            <EditableText
              value={c.when}
              onSave={(val) => updateDashboardComment(idx, "when", val)}
            />
          </div>
          <EditableText
            value={c.text}
            onSave={(val) => updateDashboardComment(idx, "text", val)}
            multiline
            className="mt-1 text-[18px] leading-snug block"
          />
        </div>
        <div className="relative shrink-0">
          <button
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Comment options"
            className="p-1 hover:bg-secondary rounded-full"
          >
            <EllipsisVertical className="size-5 text-muted-foreground" strokeWidth={1.7} />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 z-50 rounded-lg border border-border bg-popover p-1 shadow-lg text-sm min-w-[130px]">
              <button
                onClick={() => {
                  setShowMenu(false);
                  if (window.confirm("Remove this comment?")) {
                    removeDashboardComment(idx);
                  }
                }}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-destructive/10 text-destructive text-xs font-medium"
              >
                Remove comment
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export function DashboardScreen({
  onOpenRanking,
  onOpenViews,
  onOpenAvgViewed,
  onOpenLikes,
}: {
  onOpenRanking?: (() => void) | undefined;
  onOpenViews?: (() => void) | undefined;
  onOpenAvgViewed?: (() => void) | undefined;
  onOpenLikes?: (() => void) | undefined;
} = {}) {
  const { state, updateField } = useStudioStore();
  const [open, setOpen] = useState<Record<string, boolean>>({ viral: true });

  return (
    <div className="flex flex-col pb-4">
      <div className="flex items-center gap-6 px-4 pt-4">
        <EditableImage
          src={state.channelAvatar}
          alt="Channel avatar"
          onImageChange={(val) => updateField("channelAvatar", val)}
          className="size-[130px] shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <EditableText
            value={state.channelName}
            onSave={(val) => updateField("channelName", val)}
            className="text-[26px] font-bold leading-tight tracking-tight block truncate"
          />
          <EditableText
            value={state.totalSubscribers}
            onSave={(val) => updateField("totalSubscribers", val)}
            className="text-[32px] font-bold leading-tight tracking-tight block"
          />
          <EditableText
            value={state.subscribersLabel}
            onSave={(val) => updateField("subscribersLabel", val)}
            className="mt-1 text-[18px] text-muted-foreground block"
          />
        </div>
      </div>

      <div className="mt-8 flex items-end justify-between px-4">
        <EditableText
          value={state.channelAnalyticsTitle || "Channel analytics"}
          onSave={(val) => updateField("channelAnalyticsTitle", val)}
          className="text-[26px] font-bold tracking-tight block"
        />
        <EditableText
          value={state.periodLabel}
          onSave={(val) => updateField("periodLabel", val)}
          className="text-[17px] text-muted-foreground"
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 px-4">
        <Card className="p-4">
          <EditableText
            value={state.channelViewsLabel || "Views"}
            onSave={(val) => updateField("channelViewsLabel", val)}
            className="text-[17px] text-muted-foreground block"
          />
          <div className="mt-2 flex items-center gap-2">
            <EditableText
              value={state.channelViews}
              onSave={(val) => updateField("channelViews", val)}
              className="text-[24px] font-bold leading-none"
            />
            <button
              onClick={() => updateField("channelViewsBadge", !state.channelViewsBadge)}
              title="Click to toggle checkmark"
              className="p-0.5 rounded hover:bg-secondary transition-colors"
            >
              {state.channelViewsBadge !== false ? (
                <CheckBadge />
              ) : (
                <span className="size-4 rounded-full border border-dashed border-muted-foreground/40 inline-block" />
              )}
            </button>
          </div>
        </Card>
        <Card className="p-4">
          <EditableText
            value={state.channelWatchTimeLabel || "Watch time (hours)"}
            onSave={(val) => updateField("channelWatchTimeLabel", val)}
            className="text-[17px] text-muted-foreground block"
          />
          <div className="mt-2 flex items-center gap-2">
            <EditableText
              value={state.channelWatchTime}
              onSave={(val) => updateField("channelWatchTime", val)}
              className="text-[24px] font-bold leading-none"
            />
          </div>
        </Card>
      </div>

      <EditableText
        value={state.latestContentTitle || "Latest published content"}
        onSave={(val) => updateField("latestContentTitle", val)}
        className="mt-9 px-4 text-[26px] font-bold tracking-tight block"
      />
      {state.latestPublished.map((item, idx) => (
        <LatestCard
          key={item.key || idx}
          item={item}
          index={idx}
          open={!!open[item.key]}
          onToggle={() => setOpen((s) => ({ ...s, [item.key]: !s[item.key] }))}
          onOpenRanking={onOpenRanking}
          onOpenViews={onOpenViews}
          onOpenAvgViewed={onOpenAvgViewed}
          onOpenLikes={onOpenLikes}
        />
      ))}

      <EditableText
        value={state.dashboardCommentsTitle || "Comments"}
        onSave={(val) => updateField("dashboardCommentsTitle", val)}
        className="mt-9 px-4 text-[26px] font-bold tracking-tight block"
      />
      {state.dashboardComments.map((c, idx) => (
        <DashboardCommentItem key={idx} c={c} idx={idx} />
      ))}
    </div>
  );
}
