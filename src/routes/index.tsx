import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BottomNav, StudioTopBar, TabsBar } from "@/components/studio/shell";
import { AudienceTab, ContentTab, OverviewTab, TrendsTab } from "@/components/studio/tabs";
import { CommunityScreen } from "@/components/studio/community";
import { EarnScreen } from "@/components/studio/earn";
import { DashboardScreen } from "@/components/studio/dashboard";
import { ContentScreen } from "@/components/studio/contentScreen";
import { StudioProvider } from "@/components/studio/store";
import type { Tab } from "@/components/studio/tabsData";

type Screen = "dashboard" | "content" | "analytics" | "community" | "earn";

const NAV_TO_SCREEN: Record<string, Screen> = {
  "Dashboa...": "dashboard",
  Dashboard: "dashboard",
  Content: "content",
  Analytics: "analytics",
  "Commun...": "community",
  Community: "community",
  Earn: "earn",
};

const SCREEN_TO_NAV: Record<Screen, string> = {
  dashboard: "Dashboa...",
  content: "Content",
  analytics: "Analytics",
  community: "Commun...",
  earn: "Earn",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Studio — Analytics & Channel Editor" },
      {
        name: "description",
        content: "Channel analytics: overview, content, audience, community and earning reports.",
      },
      { property: "og:title", content: "Studio — Analytics" },
      {
        property: "og:description",
        content: "Channel analytics: overview, content, audience, community and earning reports.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: IndexWrapper,
});

function IndexWrapper() {
  return (
    <StudioProvider>
      <Index />
    </StudioProvider>
  );
}

function Index() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [screen, setScreen] = useState<Screen>("dashboard");

  const handleNav = (label: string) => {
    const next = NAV_TO_SCREEN[label];
    if (next) {
      setScreen(next);
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-[480px] bg-background pb-[76px] md:border-x md:border-border">
      <StudioTopBar
        variant={
          screen === "dashboard" ? "dashboard" : screen === "content" ? "content" : "analytics"
        }
      />
      {screen === "analytics" ? <TabsBar active={tab} onChange={setTab} /> : null}
      <main>
        {screen === "analytics" && (
          <>
            {tab === "Overview" && <OverviewTab />}
            {tab === "Content" && <ContentTab />}
            {tab === "Audience" && <AudienceTab />}
            {tab === "Trends" && <TrendsTab />}
          </>
        )}
        {screen === "dashboard" && <DashboardScreen />}
        {screen === "content" && <ContentScreen />}
        {screen === "community" && <CommunityScreen />}
        {screen === "earn" && <EarnScreen />}
      </main>
      <BottomNav active={SCREEN_TO_NAV[screen]} onSelect={handleNav} />
    </div>
  );
}
