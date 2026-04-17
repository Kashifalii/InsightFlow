import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { DashboardHeader } from "@/components/layout/header";
import {
  PageviewsChartClient,
  WeeklyUsersChartClient,
} from "@/components/charts/chart-wrappers";
import { analyticsPageviewsData, weeklyUsersData } from "@/lib/mock-data";
import type { SessionUser } from "@/types";

export const metadata: Metadata = {
  title: "Analytics",
  description:
    "Deep-dive into your SaaS analytics — page views, sessions, and user engagement trends.",
};

const analyticsKpis = [
  {
    id: "pageviews",
    title: "Total Page Views",
    value: "22.6K",
    change: 14.2,
    changeLabel: "vs last month",
    icon: "api" as const,
  },
  {
    id: "sessions",
    title: "Unique Sessions",
    value: "19.4K",
    change: 9.8,
    changeLabel: "vs last month",
    icon: "users" as const,
  },
  {
    id: "bounce",
    title: "Bounce Rate",
    value: "34.2%",
    change: -1.4,
    changeLabel: "vs last month",
    icon: "churn" as const,
  },
  {
    id: "revenue",
    title: "Avg. Session Value",
    value: "$0.64",
    change: 3.2,
    changeLabel: "vs last month",
    icon: "mrr" as const,
  },
];

export default async function AnalyticsPage() {
  const session = await auth();
  const user: SessionUser = {
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
    role: (session?.user as SessionUser)?.role ?? "viewer",
  };

  return (
    <div className="flex flex-col">
      <DashboardHeader user={user} title="Analytics" />

      <div className="flex-1 space-y-6 p-4 md:p-6">
        {/* KPI overview */}
        <section aria-label="Analytics metrics">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {analyticsKpis.map((card) => (
              <MetricCard key={card.id} {...card} />
            ))}
          </div>
        </section>

        {/* Page views vs sessions area chart */}
        <section aria-label="Traffic over time">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Page Views vs Sessions (12 months)
              </CardTitle>
              <CardDescription>
                Tracking traffic growth and session engagement over the past
                year.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PageviewsChartClient data={analyticsPageviewsData} />
            </CardContent>
          </Card>
        </section>

        {/* Day-of-week engagement */}
        <section aria-label="Weekly engagement patterns">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Daily Engagement This Week
              </CardTitle>
              <CardDescription>
                Active users by day — identify your highest-traffic windows.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WeeklyUsersChartClient data={weeklyUsersData} />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
