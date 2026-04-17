"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

export const MrrAreaChartClient = dynamic(
  () => import("@/components/charts/mrr-area-chart").then((m) => m.MrrAreaChart),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[260px] w-full" />,
  }
);

export const WeeklyUsersChartClient = dynamic(
  () =>
    import("@/components/charts/weekly-users-chart").then(
      (m) => m.WeeklyUsersChart
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[260px] w-full" />,
  }
);

export const PageviewsChartClient = dynamic(
  () =>
    import("@/components/charts/pageviews-chart").then(
      (m) => m.PageviewsChart
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[300px] w-full" />,
  }
);
