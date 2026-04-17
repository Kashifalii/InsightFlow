"use client";

import { useState } from "react";
import { Sparkles, RefreshCw, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardMetrics } from "@/types";

interface InsightsPanelProps {
  metrics: DashboardMetrics;
}

function parseInsights(text: string): string[] {
  // Split by bullet markers or numbered lines
  return text
    .split(/(?=•|\n\n•)/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function InsightItem({ text }: { text: string }) {
  // Bold **text** pattern
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <div className="flex gap-3">
      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
      <p className="text-sm leading-relaxed text-foreground">
        {parts.map((part, i) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={i}>{part.slice(2, -2)}</strong>
          ) : (
            <span key={i}>{part.replace(/^•\s*/, "")}</span>
          )
        )}
      </p>
    </div>
  );
}

export function InsightsPanel({ metrics }: InsightsPanelProps) {
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateInsights() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metrics }),
      });

      const data = await res.json() as { insight?: string; error?: string };

      if (!res.ok || data.error) {
        throw new Error(data.error ?? "Failed to generate insights");
      }

      setInsights(parseInsights(data.insight ?? ""));
      toast.success("Insights generated successfully");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-accent/30 to-transparent">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden />
          </div>
          <CardTitle className="text-base font-semibold">
            AI Business Insights
          </CardTitle>
        </div>
        <Button
          size="sm"
          onClick={generateInsights}
          disabled={loading}
          className="gap-2"
          aria-label="Generate AI business insights"
        >
          {loading ? (
            <RefreshCw className="h-3.5 w-3.5 animate-spin" aria-hidden />
          ) : (
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
          )}
          {loading ? "Analyzing…" : insights.length ? "Refresh" : "Generate Insights"}
        </Button>
      </CardHeader>

      <CardContent>
        {loading && (
          <div className="space-y-3" aria-live="polite" aria-busy="true">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && insights.length > 0 && (
          <div className="space-y-4" aria-live="polite">
            {insights.map((insight, i) => (
              <InsightItem key={i} text={insight} />
            ))}
          </div>
        )}

        {!loading && !error && insights.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            Click &quot;Generate Insights&quot; to get AI-powered recommendations based on your current metrics.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
