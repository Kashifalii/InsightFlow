import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { DashboardHeader } from "@/components/layout/header";
import { ContentGenerator } from "@/components/ai/content-generator";
import { InsightsPanel } from "@/components/ai/insights-panel";
import { dashboardMetrics } from "@/lib/mock-data";
import type { SessionUser } from "@/types";

export const metadata: Metadata = {
  title: "AI Tools",
  description:
    "Generate blog outlines, cold email sequences, and business insights powered by Gemini 2.0 Flash.",
};

export default async function AIToolsPage() {
  const session = await auth();
  const user: SessionUser = {
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
    role: (session?.user as SessionUser)?.role ?? "viewer",
  };

  return (
    <div className="flex flex-col">
      <DashboardHeader user={user} title="AI Tools" />

      <div className="flex-1 space-y-6 p-4 md:p-6">
        <section aria-label="AI content generator">
          <ContentGenerator />
        </section>

        <section aria-label="AI insights">
          <InsightsPanel metrics={dashboardMetrics} />
        </section>
      </div>
    </div>
  );
}
