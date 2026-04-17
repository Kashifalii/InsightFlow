import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { InsightsPanel } from "@/components/ai/insights-panel";
import { DashboardHeader } from "@/components/layout/header";
import {
  MrrAreaChartClient,
  WeeklyUsersChartClient,
} from "@/components/charts/chart-wrappers";
import { auth } from "@/lib/auth";
import {
  dashboardMetrics,
  mrrChartData,
  weeklyUsersData,
} from "@/lib/mock-data";
import type { SessionUser } from "@/types";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Overview of your SaaS metrics — MRR, active users, churn rate, and API usage.",
};

const kpiCards = [
  {
    id: "mrr",
    title: "Monthly Recurring Revenue",
    value: "$12,450",
    change: 8.2,
    changeLabel: "vs last month",
    icon: "mrr" as const,
  },
  {
    id: "users",
    title: "Active Users",
    value: "1,284",
    change: 5.4,
    changeLabel: "vs last month",
    icon: "users" as const,
  },
  {
    id: "churn",
    title: "Churn Rate",
    value: "2.4%",
    change: -0.3,
    changeLabel: "vs last month",
    icon: "churn" as const,
  },
  {
    id: "api",
    title: "API Calls",
    value: "48.2K",
    change: 12.7,
    changeLabel: "vs last month",
    icon: "api" as const,
  },
];

export default async function DashboardPage() {
  const session = await auth();
  const user: SessionUser = {
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
    role: (session?.user as SessionUser)?.role ?? "viewer",
  };

  return (
    <div className="flex flex-col">
      <DashboardHeader user={user} title="Dashboard" />

      <div className="flex-1 space-y-6 p-4 md:p-6">
        {/* KPI Cards */}
        <section aria-label="Key performance indicators">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpiCards.map((card) => (
              <MetricCard key={card.id} {...card} />
            ))}
          </div>
        </section>

        {/* AI Insights */}
        <section aria-label="AI business insights">
          <InsightsPanel metrics={dashboardMetrics} />
        </section>

        {/* Charts */}
        <section aria-label="Performance charts">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  MRR Trend (12 months)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MrrAreaChartClient data={mrrChartData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Weekly Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <WeeklyUsersChartClient data={weeklyUsersData} />
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
