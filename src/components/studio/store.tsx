import React, { createContext, useContext, useState, useEffect } from "react";
import avatarAsset from "@/assets/avatar.png";
import viral from "@/assets/dash_viral.png";
import chill from "@/assets/dash_chill.png";
import motiv from "@/assets/dash_motiv_part.png";
import police from "@/assets/dash_police.png";
import asus from "@/assets/dash_asus.png";
import studyvlog from "@/assets/dash_studyvlog.png";
import studyias from "@/assets/dash_studyias.png";
import av1 from "@/assets/av1.png";
import av2 from "@/assets/av2.png";
import av3 from "@/assets/av3.png";
import cm1 from "@/assets/cm1.png";
import cm2 from "@/assets/cm2.png";
import cm3 from "@/assets/cm3.png";
import t1 from "@/assets/thumb1.png";
import t2 from "@/assets/thumb2.png";
import t3 from "@/assets/thumb3.png";
import t4 from "@/assets/thumb4.png";
import t5 from "@/assets/thumb5.png";

export type ChartPoint = [fraction: number, value: number];

export interface MediaItem {
  thumb: string;
  title: string;
  views: string;
  likes: string;
  alert?: boolean;
  menu?: boolean;
}

export interface LatestItem {
  key: string;
  thumb: string;
  title: string;
  period: string;
  views: string;
  likes: string;
  comments: string;
  ranking?: string;
  rankingLabel?: string;
  viewsLabel?: string;
  avgViewed?: string;
  avgViewedLabel?: string;
  likesLabel?: string;
}

export interface CommentItemData {
  video: string;
  thumb: string;
  avatar: string;
  handle: string;
  when: string;
  text: string;
  hindi?: string;
  badges?: boolean;
}

export interface ContentRowItem {
  thumb: string;
  title: string;
  views: string;
}

export interface RankedVideoItem {
  rank: string;
  thumb: string;
  title: string;
  views: string;
  isCurrent?: boolean;
}

export interface StudioState {
  channelAvatar: string;
  channelName: string;
  totalSubscribers: string;
  subscribersLabel: string;
  periodLabel: string;
  channelViews: string;
  channelViewsLabel: string;
  channelViewsBadge: boolean;
  channelWatchTime: string;
  channelWatchTimeLabel: string;
  channelAnalyticsTitle: string;
  latestContentTitle: string;
  dashboardCommentsTitle: string;

  latestPublished: LatestItem[];
  dashboardComments: CommentItemData[];

  topRecentVideosTitle: string;
  topRecentVideosPeriod: string;
  topRecentVideosSubtitle: string;
  topRecentVideos: RankedVideoItem[];

  videos: MediaItem[];
  shorts: MediaItem[];
  live: MediaItem[];

  overviewViews: string;
  overviewViewsNote: string;
  overviewWatchTime: string;
  overviewWatchTimeNote: string;
  overviewSubscribers: string;
  realtimeViews: string;
  topContent: ContentRowItem[];

  viewsPoints: ChartPoint[];
  watchTimePoints: ChartPoint[];
  subscribersPoints: ChartPoint[];
  audiencePoints: ChartPoint[];

  comments28D: string;
  monthlyAudience: string;
  communityComments: CommentItemData[];

  asOfDate: string;
  videoUploads: string;
  videoUploadsTarget: string;
  watchHours: string;
  watchHoursTarget: string;
  shortsViews: string;
  shortsViewsTarget: string;
  futureWatchHours: string;
  futureWatchHoursTarget: string;
  futureShortsViews: string;
  futureShortsViewsTarget: string;

  videoUploadsPct?: number;
  watchHoursPct?: number;
  shortsViewsPct?: number;
  futureWatchHoursPct?: number;
  futureShortsViewsPct?: number;
}

const getDefaultState = (): StudioState => ({
  channelAvatar: avatarAsset,
  channelName: "IAS BABU @",
  totalSubscribers: "1,435",
  subscribersLabel: "Total subscribers",
  periodLabel: "Last 28 days",
  channelViews: "23",
  channelViewsLabel: "Views",
  channelViewsBadge: true,
  channelWatchTime: "0.0",
  channelWatchTimeLabel: "Watch time (hours)",
  channelAnalyticsTitle: "Channel analytics",
  latestContentTitle: "Latest published content",
  dashboardCommentsTitle: "Comments",

  latestPublished: [
    {
      key: "viral",
      thumb: viral,
      title: "#viral",
      period: "First 12 days, 19 hours",
      views: "6",
      likes: "2",
      comments: "0",
      ranking: "9 of 10",
      rankingLabel: "Ranking by views",
      viewsLabel: "Views",
      avgViewed: "61.0%",
      avgViewedLabel: "Average percentage viewed",
      likesLabel: "Likes",
    },
    {
      key: "july15",
      thumb: chill,
      title: "15 July 2026",
      period: "First 111 days, 14 hours",
      views: "9",
      likes: "2",
      comments: "0",
      ranking: "4 of 10",
      rankingLabel: "Ranking by views",
      viewsLabel: "Views",
      avgViewed: "45.0%",
      avgViewedLabel: "Average percentage viewed",
      likesLabel: "Likes",
    },
    {
      key: "motiv",
      thumb: motiv,
      title: "#motivational #power",
      period: "First 363 days, 19 hours",
      views: "612",
      likes: "9",
      comments: "0",
      ranking: "1 of 10",
      avgViewed: "78.0%",
    },
  ],

  dashboardComments: [
    {
      video: "23 December 2023",
      thumb: cm1,
      avatar: av1,
      handle: "@cricketloverskingkoliandsk4217",
      when: "2 yr ago",
      text: "Nya laptop",
    },
    {
      video: "#shorts arjun sir and shrusti maim marriage short video 🎵♫…",
      thumb: cm2,
      avatar: av2,
      handle: "@armytiger668",
      when: "2 yr ago",
      text: "Maat❤️",
    },
    {
      video: "ind lady singham 🔥🔥🔥🔥🔥💪💪💪💪⚡⚡⚡",
      thumb: cm3,
      avatar: av3,
      handle: "@rkshortcreationvi…",
      when: "3 yr ago",
      text: "Don't judge the power of girl",
    },
  ],

  topRecentVideosTitle: "Top recent videos",
  topRecentVideosPeriod: "First 22 days, 8 hours",
  topRecentVideosSubtitle: "Comparing views of previous 10 Shorts",
  topRecentVideos: [
    { rank: "1", thumb: t3, title: "always be positive", views: "16.7k" },
    { rank: "2", thumb: t2, title: "18 July 2025", views: "620" },
    { rank: "3", thumb: motiv, title: "#motivational #power", views: "598" },
    { rank: "4", thumb: studyias, title: "22 May 2025", views: "151" },
    { rank: "5", thumb: asus, title: "why time is everything", views: "119" },
    { rank: "6", thumb: studyvlog, title: "true line says", views: "115" },
    { rank: "7", thumb: police, title: "#power of ias officer", views: "107" },
    { rank: "8", thumb: t4, title: "only four lines ..full of motivati...", views: "9" },
    { rank: "9", thumb: viral, title: "#viral", views: "6", isCurrent: true },
    { rank: "9", thumb: chill, title: "15 July 2026", views: "6" },
  ],

  videos: [
    { thumb: police, title: "12 September 2024", views: "23", likes: "2" },
    { thumb: asus, title: "Ashush laptop don't op…", views: "17", likes: "3" },
  ],

  shorts: [
    { thumb: viral, title: "#viral", views: "6", likes: "2" },
    { thumb: chill, title: "15 July 2026", views: "9", likes: "2" },
    { thumb: motiv, title: "#motivational #power", views: "612", likes: "9" },
  ],

  live: [
    { thumb: studyvlog, title: "IAS BABU @ is live", views: "4", likes: "1", menu: true },
    { thumb: studyias, title: "study with ias babu wh…", views: "23", likes: "4", alert: true },
  ],

  overviewViews: "14",
  overviewViewsNote: "About the same as usual",
  overviewWatchTime: "0.0",
  overviewWatchTimeNote: "15% less than previous 28 days",
  overviewSubscribers: "-1",
  realtimeViews: "0",
  topContent: [
    { thumb: t1, title: "#viral", views: "6" },
    { thumb: t2, title: "17 October 2025", views: "2" },
    { thumb: t3, title: "always be positive", views: "2" },
    { thumb: t4, title: "only four lines ..full of motivation a...", views: "1" },
    { thumb: t5, title: "#shorts marriage 💍💍💍💍💍 vid...", views: "1" },
  ],

  viewsPoints: [
    [0, 0],
    [0.4, 0],
    [0.44, 1],
    [0.47, 0],
    [0.58, 0],
    [0.61, 1],
    [0.64, 0],
    [0.74, 0],
    [0.78, 8],
    [0.83, 0],
    [1, 0],
  ],
  watchTimePoints: [
    [0, 0],
    [0.6, 0],
    [0.63, 0.12],
    [0.66, 0],
    [0.72, 0],
    [0.78, 2.9],
    [0.82, 0],
    [1, 0],
  ],
  subscribersPoints: [
    [0, 0],
    [0.4, 0],
    [0.43, -1],
    [0.46, 0],
    [1, 0],
  ],
  audiencePoints: [
    [0, 4],
    [0.68, 4],
    [0.71, 3],
    [0.74, 3],
    [0.76, 2],
    [0.88, 2],
    [1, 2],
  ],

  comments28D: "0",
  monthlyAudience: "2",
  communityComments: [
    {
      video: "23 December 2023",
      thumb: cm1,
      avatar: av1,
      handle: "@cricketloverskingkolian...",
      when: "2 years ago",
      text: "Nya laptop",
      hindi: "नया लैपटॉप",
    },
    {
      video: "#shorts arjun sir and shrusti maim marriage short video 🎵♫…",
      thumb: cm2,
      avatar: av2,
      handle: "@armytiger668",
      when: "2 years ago",
      text: "Maat❤️",
      hindi: "मात❤️",
    },
    {
      video: "ipd lady singham 🔥🔥🔥🔥🔥💪💪💪💪⚡⚡⚡",
      thumb: cm3,
      avatar: av3,
      handle: "@rkshortcreationvi...",
      when: "3 years ago",
      text: "Don't judge the power of girl",
      hindi: "लड़की की ताकत को कम मत समझो",
      badges: true,
    },
  ],

  asOfDate: "21 Oct 2026",
  videoUploads: "1",
  videoUploadsTarget: "3",
  watchHours: "0",
  watchHoursTarget: "3,000",
  shortsViews: "19",
  shortsViewsTarget: "3m",
  futureWatchHours: "0",
  futureWatchHoursTarget: "4,000",
  futureShortsViews: "19",
  futureShortsViewsTarget: "10m",
});

const STORAGE_KEY = "yt_studio_custom_data_v2";

interface StudioContextType {
  state: StudioState;
  editMode: boolean;
  setEditMode: (val: boolean) => void;
  toggleEditMode: () => void;
  updateField: <K extends keyof StudioState>(field: K, value: StudioState[K]) => void;
  updateVideo: (index: number, field: keyof MediaItem, value: any) => void;
  updateShort: (index: number, field: keyof MediaItem, value: any) => void;
  updateLive: (index: number, field: keyof MediaItem, value: any) => void;
  updateLatest: (index: number, field: keyof LatestItem, value: any) => void;
  updateDashboardComment: (index: number, field: keyof CommentItemData, value: any) => void;
  updateCommunityComment: (index: number, field: keyof CommentItemData, value: any) => void;
  updateTopContent: (index: number, field: keyof ContentRowItem, value: any) => void;
  updateTopRecentVideo: (index: number, field: keyof RankedVideoItem, value: any) => void;
  updateChartPoints: (
    key: "viewsPoints" | "watchTimePoints" | "subscribersPoints" | "audiencePoints",
    points: ChartPoint[]
  ) => void;
  removeVideo: (index: number) => void;
  removeShort: (index: number) => void;
  removeLive: (index: number) => void;
  removeLatest: (index: number) => void;
  removeDashboardComment: (index: number) => void;
  removeCommunityComment: (index: number) => void;
  removeTopContent: (index: number) => void;
  resetAll: () => void;
}

const StudioContext = createContext<StudioContextType | null>(null);

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StudioState>(getDefaultState);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  const toggleEditMode = () => setEditMode((prev) => !prev);

  // Safely hydrate from localStorage on client mount (prevents SSR hydration crash)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState((prev) => ({ ...prev, ...parsed }));
      }
    } catch (err) {
      console.error("Failed to load saved studio data", err);
    }
    setHydrated(true);
  }, []);

  // Only persist to localStorage after hydration is complete
  useEffect(() => {
    if (hydrated && typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (err) {
        console.error("Failed to persist studio data", err);
      }
    }
  }, [state, hydrated]);

  const updateField = <K extends keyof StudioState>(field: K, value: StudioState[K]) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const updateVideo = (index: number, field: keyof MediaItem, value: any) => {
    setState((prev) => {
      const copy = [...prev.videos];
      const current = copy[index];
      if (current) copy[index] = { ...current, [field]: value } as MediaItem;
      return { ...prev, videos: copy };
    });
  };

  const updateShort = (index: number, field: keyof MediaItem, value: any) => {
    setState((prev) => {
      const copy = [...prev.shorts];
      const current = copy[index];
      if (current) copy[index] = { ...current, [field]: value } as MediaItem;
      return { ...prev, shorts: copy };
    });
  };

  const updateLive = (index: number, field: keyof MediaItem, value: any) => {
    setState((prev) => {
      const copy = [...prev.live];
      const current = copy[index];
      if (current) copy[index] = { ...current, [field]: value } as MediaItem;
      return { ...prev, live: copy };
    });
  };

  const updateLatest = (index: number, field: keyof LatestItem, value: any) => {
    setState((prev) => {
      const copy = [...prev.latestPublished];
      const current = copy[index];
      if (current) copy[index] = { ...current, [field]: value } as LatestItem;
      return { ...prev, latestPublished: copy };
    });
  };

  const updateDashboardComment = (index: number, field: keyof CommentItemData, value: any) => {
    setState((prev) => {
      const copy = [...prev.dashboardComments];
      const current = copy[index];
      if (current) copy[index] = { ...current, [field]: value } as CommentItemData;
      return { ...prev, dashboardComments: copy };
    });
  };

  const updateCommunityComment = (index: number, field: keyof CommentItemData, value: any) => {
    setState((prev) => {
      const copy = [...prev.communityComments];
      const current = copy[index];
      if (current) copy[index] = { ...current, [field]: value } as CommentItemData;
      return { ...prev, communityComments: copy };
    });
  };

  const updateTopContent = (index: number, field: keyof ContentRowItem, value: any) => {
    setState((prev) => {
      const copy = [...prev.topContent];
      const current = copy[index];
      if (current) copy[index] = { ...current, [field]: value } as ContentRowItem;
      return { ...prev, topContent: copy };
    });
  };

  const updateTopRecentVideo = (index: number, field: keyof RankedVideoItem, value: any) => {
    setState((prev) => {
      const copy = [...prev.topRecentVideos];
      const current = copy[index];
      if (current) copy[index] = { ...current, [field]: value } as RankedVideoItem;
      return { ...prev, topRecentVideos: copy };
    });
  };

  const updateChartPoints = (
    key: "viewsPoints" | "watchTimePoints" | "subscribersPoints" | "audiencePoints",
    points: ChartPoint[]
  ) => {
    setState((prev) => ({ ...prev, [key]: points }));
  };

  const removeVideo = (index: number) => {
    setState((prev) => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }));
  };

  const removeShort = (index: number) => {
    setState((prev) => ({
      ...prev,
      shorts: prev.shorts.filter((_, i) => i !== index),
    }));
  };

  const removeLive = (index: number) => {
    setState((prev) => ({
      ...prev,
      live: prev.live.filter((_, i) => i !== index),
    }));
  };

  const removeLatest = (index: number) => {
    setState((prev) => ({
      ...prev,
      latestPublished: prev.latestPublished.filter((_, i) => i !== index),
    }));
  };

  const removeDashboardComment = (index: number) => {
    setState((prev) => ({
      ...prev,
      dashboardComments: prev.dashboardComments.filter((_, i) => i !== index),
    }));
  };

  const removeCommunityComment = (index: number) => {
    setState((prev) => ({
      ...prev,
      communityComments: prev.communityComments.filter((_, i) => i !== index),
    }));
  };

  const removeTopContent = (index: number) => {
    setState((prev) => ({
      ...prev,
      topContent: prev.topContent.filter((_, i) => i !== index),
    }));
  };

  const resetAll = () => {
    const defaults = getDefaultState();
    setState(defaults);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <StudioContext.Provider
      value={{
        state,
        editMode,
        setEditMode,
        toggleEditMode,
        updateField,
        updateVideo,
        updateShort,
        updateLive,
        updateLatest,
        updateDashboardComment,
        updateCommunityComment,
        updateTopContent,
        updateTopRecentVideo,
        updateChartPoints,
        removeVideo,
        removeShort,
        removeLive,
        removeLatest,
        removeDashboardComment,
        removeCommunityComment,
        removeTopContent,
        resetAll,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}

export function useStudioStore() {
  const ctx = useContext(StudioContext);
  if (!ctx) {
    throw new Error("useStudioStore must be used within a StudioProvider");
  }
  return ctx;
}

