import { useState } from "react";
import {
  EllipsisVertical,
  Heart,
  Info,
  MessageCircle,
  SlidersHorizontal,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./ui";
import { useStudioStore, type CommentItemData } from "./store";
import { EditableText, EditableImage } from "./editable";

function CommentItem({
  c,
  index,
}: {
  c: CommentItemData;
  index: number;
}) {
  const { updateCommunityComment, removeCommunityComment } = useStudioStore();
  const [liked, setLiked] = useState(false);
  const [hearted, setHearted] = useState(false);
  const [hindi, setHindi] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="py-5 first:pt-0">
      <div className="flex items-start gap-4">
        <EditableText
          value={c.video}
          onSave={(val) => updateCommunityComment(index, "video", val)}
          className="min-w-0 flex-1 text-[17px] font-medium leading-snug"
        />
        <EditableImage
          src={c.thumb}
          alt=""
          onImageChange={(val) => updateCommunityComment(index, "thumb", val)}
          className="h-[56px] w-[100px] shrink-0 rounded-lg object-cover"
        />
      </div>
      <div className="mt-4 flex items-start gap-3">
        <EditableImage
          src={c.avatar}
          alt=""
          onImageChange={(val) => updateCommunityComment(index, "avatar", val)}
          className="size-10 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[15px] text-muted-foreground flex-wrap">
            <EditableText
              value={c.handle}
              onSave={(val) => updateCommunityComment(index, "handle", val)}
              className="truncate font-medium"
            />
            {c.badges ? (
              <>
                <span
                  className="inline-block size-[18px] shrink-0 rounded-[4px]"
                  style={{ background: "#7b61ff" }}
                />
                <span
                  className="inline-flex size-[18px] shrink-0 items-center justify-center rounded-[4px] text-[10px] font-bold text-white"
                  style={{ background: "#e53935" }}
                >
                  •
                </span>
              </>
            ) : null}
            <span className="shrink-0">•</span>
            <EditableText
              value={c.when}
              onSave={(val) => updateCommunityComment(index, "when", val)}
              className="shrink-0"
            />
          </div>

          <div className="mt-0.5">
            {hindi && c.hindi ? (
              <EditableText
                value={c.hindi}
                onSave={(val) => updateCommunityComment(index, "hindi", val)}
                multiline
                className="text-[17px] leading-snug block"
              />
            ) : (
              <EditableText
                value={c.text}
                onSave={(val) => updateCommunityComment(index, "text", val)}
                multiline
                className="text-[17px] leading-snug block"
              />
            )}
          </div>

          {c.hindi ? (
            <button
              onClick={() => setHindi(!hindi)}
              className="mt-3 text-[15px] text-muted-foreground hover:text-foreground transition-colors"
            >
              {hindi ? "Show original" : "Translate to Hindi"}
            </button>
          ) : null}
        </div>
        <div className="relative shrink-0">
          <button
            onClick={() => setShowMenu(!showMenu)}
            aria-label="More options"
            className="p-1 hover:bg-secondary rounded-full"
          >
            <EllipsisVertical className="size-5 text-muted-foreground" strokeWidth={1.7} />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 z-50 rounded-lg border border-border bg-popover p-1 shadow-lg text-sm min-w-[120px]">
              <button
                onClick={() => {
                  setShowMenu(false);
                  if (window.confirm("Remove this comment?")) {
                    removeCommunityComment(index);
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
      <div className="ml-[52px] mt-4 flex items-center gap-12">
        <button onClick={() => setLiked(!liked)} aria-label="Like comment">
          <ThumbsUp className={cn("size-[22px]", liked && "fill-foreground")} strokeWidth={1.7} />
        </button>
        <button aria-label="Dislike comment">
          <ThumbsDown className="size-[22px]" strokeWidth={1.7} />
        </button>
        <button aria-label="Reply to comment">
          <MessageCircle className="size-[22px]" strokeWidth={1.7} />
        </button>
        <button onClick={() => setHearted(!hearted)} aria-label="Heart comment">
          <Heart className={cn("size-[22px]", hearted && "fill-foreground")} strokeWidth={1.7} />
        </button>
      </div>
    </div>
  );
}

function ViewAllButton() {
  return (
    <button className="shrink-0 rounded-full bg-secondary px-4 py-2 text-[15px] font-medium">
      View all
    </button>
  );
}

export function CommunityScreen() {
  const { state, updateField } = useStudioStore();

  return (
    <div className="flex flex-col gap-6 pb-4 pt-4">
      <div className="grid grid-cols-2 gap-3 px-4">
        <Card className="p-4">
          <p className="text-[15px] text-muted-foreground">Comments 28D</p>
          <EditableText
            value={state.comments28D}
            onSave={(val) => updateField("comments28D", val)}
            className="mt-1.5 text-[24px] font-bold leading-none block"
          />
        </Card>
        <Card className="p-4">
          <p className="text-[15px] text-muted-foreground">Monthly audience 28D</p>
          <EditableText
            value={state.monthlyAudience}
            onSave={(val) => updateField("monthlyAudience", val)}
            className="mt-1.5 text-[24px] font-bold leading-none block"
          />
        </Card>
      </div>

      <section>
        <div className="flex items-center justify-between px-4">
          <h2 className="text-[24px] font-bold tracking-tight">Comments</h2>
          <ViewAllButton />
        </div>
        <Card className="mx-4 mt-3 flex flex-col gap-6 p-4">
          {state.communityComments.map((c, i) => (
            <CommentItem key={i} c={c} index={i} />
          ))}
        </Card>
      </section>

      <section>
        <div className="flex items-center justify-between px-4">
          <h2 className="text-[24px] font-bold tracking-tight">Viewer posts</h2>
          <ViewAllButton />
        </div>
        <Card className="mx-4 mt-3 p-4">
          <div className="flex h-[72px] items-center rounded-lg bg-secondary px-6 text-[17px] text-foreground/80">
            Your community is off
          </div>
        </Card>
      </section>

      <section>
        <h2 className="px-4 text-[24px] font-bold tracking-tight">Moderation</h2>
        <Card className="mx-4 mt-3 px-4 py-2">
          <button className="flex w-full items-center gap-5 py-4 text-left">
            <SlidersHorizontal className="size-6 shrink-0" strokeWidth={1.7} />
            <span className="text-[17px] font-medium">Content controls</span>
          </button>
          <button className="flex w-full items-center gap-5 py-4 text-left">
            <Info className="size-6 shrink-0" strokeWidth={1.7} />
            <span className="text-[17px] font-medium">Learn about comment settings</span>
          </button>
        </Card>
      </section>
    </div>
  );
}
