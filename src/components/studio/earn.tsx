import type { ComponentType, ReactNode } from "react";
import {
  ChevronRight,
  Copyright,
  Info,
  Lock,
  MessagesSquare,
  RectangleEllipsis,
} from "lucide-react";
import { Card, SwipeCarousel } from "./ui";
import { useStudioStore } from "./store";
import { EditableText } from "./editable";
import ilMemberships from "@/assets/il_memberships.png";
import ilSupers from "@/assets/il_supers.png";
import ilShopping from "@/assets/il_shopping.png";
import ilWatchAds from "@/assets/il_watchads.png";
import ilShortsAds from "@/assets/il_shortsads.png";

function BenefitCard({ img, title, text }: { img: string; title: string; text: string }) {
  return (
    <Card className="w-[54%] min-w-[54%] shrink-0 snap-center px-5 py-6 text-center">
      <img src={img} alt="" className="mx-auto h-[150px] w-auto object-contain" />
      <h3 className="mt-5 text-[20px] font-medium">{title}</h3>
      <p className="mt-2 text-[15px] leading-snug text-muted-foreground">{text}</p>
    </Card>
  );
}

function MilestoneLock({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-[15px] text-muted-foreground">
      {label}
      <span className="flex size-7 items-center justify-center rounded-full bg-secondary">
        <Lock className="size-3.5" strokeWidth={2} />
      </span>
    </div>
  );
}

function Meter({
  label,
  period,
  target,
  pct,
}: {
  label: ReactNode;
  period: string;
  target: ReactNode;
  pct: number;
}) {
  return (
    <div>
      <div className="h-[8px] w-full rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-ytlink"
          style={{ width: pct > 0 ? `${Math.max(pct, 1.2)}%` : "0%" }}
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <span className="text-[17px] font-medium">{label}</span>
        <span className="shrink-0 text-[17px] text-muted-foreground">{target}</span>
      </div>
      <p className="text-[15px] text-muted-foreground">{period}</p>
    </div>
  );
}

function EligibilityBox() {
  const { state, updateField } = useStudioStore();

  return (
    <div className="rounded-xl bg-secondary px-4 py-4">
      <div className="flex items-center gap-3">
        <Info className="size-6 shrink-0 text-muted-foreground" strokeWidth={1.7} />
        <p className="text-[16px]">
          Showing data as of:{" "}
          <EditableText
            value={state.asOfDate}
            onSave={(val) => updateField("asOfDate", val)}
            className="font-medium underline underline-offset-2"
          />
        </p>
      </div>
      <p className="ml-9 mt-1">
        <button className="text-[16px] underline underline-offset-2">Learn more</button>
      </p>
    </div>
  );
}

function ResourceRow({
  icon: Icon,
  label,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
}) {
  return (
    <button className="flex w-full items-center gap-5 py-5 text-left">
      <Icon className="size-6 shrink-0" strokeWidth={1.7} />
      <span className="flex-1 text-[17px] font-medium">{label}</span>
      <ChevronRight className="size-5 shrink-0 text-muted-foreground" strokeWidth={1.7} />
    </button>
  );
}

export function EarnScreen() {
  const { state, updateField } = useStudioStore();

  return (
    <div className="flex flex-col gap-4 pb-6">
      <h1 className="px-4 pt-5 text-[38px] font-bold leading-[1.15] tracking-tight">
        Become a YouTube partner
      </h1>

      <div className="px-4">
        <MilestoneLock label="Next milestone" />
        <h2 className="mt-1 text-[21px] font-bold">Start your earning journey</h2>
        <p className="mt-1 text-[17px] leading-snug text-muted-foreground">
          Earn income while connecting with your fans and gain access to support forums and creator
          tools
        </p>
      </div>

      <SwipeCarousel dots={3}>
        <BenefitCard
          img={ilMemberships}
          title="Memberships"
          text="Create a fan club of members paying monthly for access to exclusive perks"
        />
        <BenefitCard
          img={ilSupers}
          title="Supers"
          text="Engage with fans who show support through one-time, interactive purchases"
        />
        <BenefitCard
          img={ilShopping}
          title="Shopping"
          text="Share products that you love and help viewers shop"
        />
      </SwipeCarousel>

      <section className="px-4">
        <h2 className="text-[24px] font-bold tracking-tight">Eligibility</h2>
        <div className="mt-3">
          <EligibilityBox />
        </div>
        <div className="mt-9">
          <Meter
            label={
              <span>
                <EditableText
                  value={state.videoUploads}
                  onSave={(val) => updateField("videoUploads", val)}
                />{" "}
                video upload
              </span>
            }
            period="last 90 days"
            target={
              <EditableText
                value={state.videoUploadsTarget}
                onSave={(val) => updateField("videoUploadsTarget", val)}
              />
            }
            pct={33}
          />
        </div>
        <p className="mt-8 text-center text-[15px]">and one of the following</p>
        <div className="mt-8">
          <Meter
            label={
              <span>
                <EditableText
                  value={state.watchHours}
                  onSave={(val) => updateField("watchHours", val)}
                />{" "}
                qualified watch hours
              </span>
            }
            period="last 365 days"
            target={
              <EditableText
                value={state.watchHoursTarget}
                onSave={(val) => updateField("watchHoursTarget", val)}
              />
            }
            pct={0}
          />
        </div>
        <div className="mt-9">
          <Meter
            label={
              <span>
                <EditableText
                  value={state.shortsViews}
                  onSave={(val) => updateField("shortsViews", val)}
                />{" "}
                qualified Shorts views
              </span>
            }
            period="last 90 days"
            target={
              <EditableText
                value={state.shortsViewsTarget}
                onSave={(val) => updateField("shortsViewsTarget", val)}
              />
            }
            pct={0.6}
          />
        </div>
        <p className="mt-9 text-center text-[16px] text-muted-foreground">
          Some benefits may have additional eligibility criteria
        </p>

        <h2 className="mt-11 text-[24px] font-bold tracking-tight">Next steps</h2>
        <div className="mt-5 flex flex-col gap-3.5">
          <button className="rounded-full bg-secondary py-3.5 text-[16px] font-medium">
            Learn more about applying
          </button>
          <button
            disabled
            className="rounded-full bg-muted py-3.5 text-[16px] font-medium text-muted-foreground/50"
          >
            Apply now
          </button>
          <p className="mt-2 text-center text-[16px]">
            {"We'll let you know when you're eligible"}
          </p>
        </div>

        <div className="mt-7 border-t border-border pt-7">
          <MilestoneLock label="Future milestone" />
          <h2 className="mt-1 text-[21px] font-bold">Continue to grow</h2>
          <p className="mt-1 text-[17px] leading-snug text-muted-foreground">
            Unlock even more ways to earn, including the option to show ads on videos
          </p>
        </div>
      </section>

      <SwipeCarousel dots={2}>
        <BenefitCard
          img={ilWatchAds}
          title="Watch page ads"
          text="Earn from ads and YouTube Premium on the watch page"
        />
        <BenefitCard
          img={ilShortsAds}
          title="Shorts Feed ads"
          text="Earn from ads and YouTube Premium in the Shorts Feed"
        />
      </SwipeCarousel>

      <section className="px-4">
        <h2 className="text-[24px] font-bold tracking-tight">Eligibility</h2>
        <div className="mt-3">
          <EligibilityBox />
        </div>
        <div className="mt-9">
          <Meter
            label={
              <span>
                <EditableText
                  value={state.futureWatchHours}
                  onSave={(val) => updateField("futureWatchHours", val)}
                />{" "}
                qualified watch hours
              </span>
            }
            period="last 365 days"
            target={
              <EditableText
                value={state.futureWatchHoursTarget}
                onSave={(val) => updateField("futureWatchHoursTarget", val)}
              />
            }
            pct={0}
          />
        </div>
        <div className="mt-9">
          <Meter
            label={
              <span>
                <EditableText
                  value={state.futureShortsViews}
                  onSave={(val) => updateField("futureShortsViews", val)}
                />{" "}
                qualified Shorts views
              </span>
            }
            period="last 90 days"
            target={
              <EditableText
                value={state.futureShortsViewsTarget}
                onSave={(val) => updateField("futureShortsViewsTarget", val)}
              />
            }
            pct={0.6}
          />
        </div>

        <h2 className="mt-11 text-[24px] font-bold tracking-tight">
          Creator resources and tools
        </h2>
        <div className="mt-2 flex flex-col">
          <ResourceRow icon={MessagesSquare} label="YouTube Creator Support" />
          <ResourceRow icon={Copyright} label="Copyright Match Tool" />
          <ResourceRow icon={RectangleEllipsis} label="Video end screens" />
        </div>
      </section>
    </div>
  );
}
