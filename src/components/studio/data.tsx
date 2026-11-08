import type { ChartPoint, ContentRowData } from "./ui";
import t1 from "@/assets/thumb1.png";
import t2 from "@/assets/thumb2.png";
import t3 from "@/assets/thumb3.png";
import t4 from "@/assets/thumb4.png";
import t5 from "@/assets/thumb5.png";

/* Line shapes traced from the screenshots. X is a 0..1 fraction across the chart. */

export const viewsPoints: ChartPoint[] = [
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
];

export const audiencePoints: ChartPoint[] = [
  [0, 4],
  [0.68, 4],
  [0.71, 3],
  [0.74, 3],
  [0.76, 2],
  [0.88, 2],
  [1, 2],
];

export const flatZeroPoints: ChartPoint[] = [
  [0, 0],
  [1, 0],
];

/* Watch time: flat with a tiny bump, then one narrow spike near 25 Oct. */
export const watchTimePoints: ChartPoint[] = [
  [0, 0],
  [0.6, 0],
  [0.63, 0.12],
  [0.66, 0],
  [0.72, 0],
  [0.78, 2.9],
  [0.82, 0],
  [1, 0],
];

/* Subscribers: flat at 0 with one narrow dip to -1. */
export const subscribersPoints: ChartPoint[] = [
  [0, 0],
  [0.4, 0],
  [0.43, -1],
  [0.46, 0],
  [1, 0],
];

export const topContentRows: ContentRowData[] = [
  { thumb: t1, title: "#viral", views: "6" },
  { thumb: t2, title: "17 October 2025", views: "2" },
  { thumb: t3, title: "always be positive", views: "2" },
  { thumb: t4, title: "only four lines ..full of motivation a...", views: "1" },
  { thumb: t5, title: "#shorts marriage 💍💍💍💍💍 vid...", views: "1" },
];
