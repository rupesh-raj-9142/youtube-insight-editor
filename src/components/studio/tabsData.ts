export const TABS = ["Overview", "Content", "Audience", "Trends"] as const;
export type Tab = (typeof TABS)[number];

