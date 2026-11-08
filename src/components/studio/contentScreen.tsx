import { useState } from "react";
import { ChevronDown, CircleAlert, EllipsisVertical, SlidersHorizontal } from "lucide-react";
import { StudioAnalyticsIcon, StudioThumbsUp } from "./icons";
import { useStudioStore, type MediaItem } from "./store";
import { EditableText, EditableImage } from "./editable";

const FILTERS = ["Type", "Visibility", "Views", "Revenue"];

function VideoCard({
  item,
  index,
  type,
}: {
  item: MediaItem;
  index: number;
  type: "videos" | "live";
}) {
  const { updateVideo, updateLive, removeVideo, removeLive } = useStudioStore();
  const [showMenu, setShowMenu] = useState(false);
  const update = type === "videos" ? updateVideo : updateLive;
  const remove = type === "videos" ? removeVideo : removeLive;

  return (
    <div className="w-[300px] shrink-0">
      <div className="h-[169px] overflow-hidden rounded-xl">
        <EditableImage
          src={item.thumb}
          alt={item.title}
          onImageChange={(val) => update(index, "thumb", val)}
          className="size-full object-cover"
        />
      </div>
      <div className="mt-2.5 flex items-center gap-1">
        <EditableText
          value={item.title}
          onSave={(val) => update(index, "title", val)}
          className="min-w-0 flex-1 truncate text-[17px] font-medium"
        />
        <div className="relative shrink-0">
          <button
            onClick={() => setShowMenu(!showMenu)}
            aria-label="More options"
            className="p-1 hover:bg-secondary rounded-full"
          >
            <EllipsisVertical className="size-5 shrink-0 text-muted-foreground" strokeWidth={1.7} />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 z-50 rounded-lg border border-border bg-popover p-1 shadow-lg text-sm min-w-[130px]">
              <button
                onClick={() => {
                  setShowMenu(false);
                  if (window.confirm("Remove this video?")) {
                    remove(index);
                  }
                }}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-destructive/10 text-destructive text-xs font-medium"
              >
                Remove video
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-1.5 flex items-center gap-5 text-[15px]">
        {item.alert ? (
          <CircleAlert className="size-5 shrink-0 text-ytwarn" strokeWidth={1.7} />
        ) : null}
        <span className="flex items-center gap-1.5">
          <StudioAnalyticsIcon className="size-[19px]" />
          <EditableText
            value={item.views}
            onSave={(val) => update(index, "views", val)}
            className="font-medium"
          />
        </span>
        <span className="flex items-center gap-1.5">
          <StudioThumbsUp className="size-[19px]" />
          <EditableText
            value={item.likes}
            onSave={(val) => update(index, "likes", val)}
            className="font-medium"
          />
        </span>
      </div>
    </div>
  );
}

function ShortCard({
  item,
  index,
}: {
  item: MediaItem;
  index: number;
}) {
  const { updateShort, removeShort } = useStudioStore();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="w-[150px] shrink-0">
      <div className="h-[267px] overflow-hidden rounded-xl">
        <EditableImage
          src={item.thumb}
          alt={item.title}
          onImageChange={(val) => updateShort(index, "thumb", val)}
          className="size-full object-cover"
        />
      </div>
      <div className="mt-2.5 flex items-center justify-between gap-1">
        <EditableText
          value={item.title}
          onSave={(val) => updateShort(index, "title", val)}
          className="truncate text-[17px] font-medium block flex-1"
        />
        <div className="relative shrink-0">
          <button
            onClick={() => setShowMenu(!showMenu)}
            aria-label="More options"
            className="p-0.5 hover:bg-secondary rounded-full"
          >
            <EllipsisVertical className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.7} />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-6 z-50 rounded-lg border border-border bg-popover p-1 shadow-lg text-sm min-w-[120px]">
              <button
                onClick={() => {
                  setShowMenu(false);
                  if (window.confirm("Remove this Short?")) {
                    removeShort(index);
                  }
                }}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-destructive/10 text-destructive text-xs font-medium"
              >
                Remove Short
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-1.5 flex items-center gap-4 text-[15px]">
        <span className="flex items-center gap-1.5">
          <StudioAnalyticsIcon className="size-[18px]" />
          <EditableText
            value={item.views}
            onSave={(val) => updateShort(index, "views", val)}
            className="font-medium"
          />
        </span>
        <span className="flex items-center gap-1.5">
          <StudioThumbsUp className="size-[18px]" />
          <EditableText
            value={item.likes}
            onSave={(val) => updateShort(index, "likes", val)}
            className="font-medium"
          />
        </span>
      </div>
    </div>
  );
}

function RowHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between px-4">
      <h2 className="text-[24px] font-bold tracking-tight">{title}</h2>
      <button className="shrink-0 rounded-full bg-secondary px-4 py-2 text-[15px] font-medium">
        View all
      </button>
    </div>
  );
}

export function ContentScreen() {
  const { state } = useStudioStore();

  return (
    <div className="flex flex-col pb-4">
      <div className="no-scrollbar flex gap-2.5 overflow-x-auto px-4 pt-2">
        <button
          aria-label="Filters"
          className="flex shrink-0 items-center rounded-full bg-secondary px-4 py-2.5"
        >
          <SlidersHorizontal className="size-[22px]" strokeWidth={1.7} />
        </button>
        {FILTERS.map((f) => (
          <button
            key={f}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-4 py-2.5 text-[17px] font-medium"
          >
            {f}
            <ChevronDown className="size-5" strokeWidth={1.7} />
          </button>
        ))}
      </div>

      <div className="mt-7">
        <RowHeader title="Videos" />
        <div className="no-scrollbar mt-4 flex gap-4 overflow-x-auto px-4">
          {state.videos.map((v, i) => (
            <VideoCard key={i} item={v} index={i} type="videos" />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <RowHeader title="Shorts" />
        <div className="no-scrollbar mt-4 flex gap-4 overflow-x-auto px-4">
          {state.shorts.map((s, i) => (
            <ShortCard key={i} item={s} index={i} />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <RowHeader title="Live" />
        <div className="no-scrollbar mt-4 flex gap-4 overflow-x-auto px-4">
          {state.live.map((l, i) => (
            <VideoCard key={i} item={l} index={i} type="live" />
          ))}
        </div>
      </div>
    </div>
  );
}
