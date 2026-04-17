import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { auth } from "@/lib/auth";

const schema = z.object({
  metrics: z.record(z.number()),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request body", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { metrics } = parsed.data;

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    // Demo mode — return realistic mock insights when API key is not configured
    const mockInsight = `• **Accelerate MRR Growth**: Your MRR of $${metrics.mrr?.toLocaleString() ?? "12,450"} shows strong momentum. Focus on annual plan promotions to boost predictable revenue by 20–30%.\n\n• **Reduce Churn Proactively**: A ${metrics.churnRate ?? 2.4}% churn rate is near the industry benchmark. Implement a 30-day onboarding email sequence targeting users who have not completed key activation milestones.\n\n• **Optimize API Monetization**: With ${metrics.apiCalls?.toLocaleString() ?? "48,200"} API calls, consider introducing tiered API usage plans. Power users consuming 10x the average are prime candidates for an Enterprise upsell conversation.`;
    return NextResponse.json({ insight: mockInsight });
  }

  const { geminiFlash } = await import("@/lib/gemini");

  try {
    const { text } = await generateText({
      model: geminiFlash,
      system:
        "You are a SaaS growth analyst. Return exactly 3 actionable bullet-point recommendations based on the metrics provided. Format each as a bold title followed by a concise explanation. Use • as bullet markers.",
      prompt: `Analyze these SaaS metrics and provide 3 specific growth recommendations: ${JSON.stringify(metrics)}`,
      maxCompletionTokens: 500,
    });

    return NextResponse.json({ insight: text });
  } catch (error) {
    console.error("[InsightFlow] Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to generate insights. Please try again." },
      { status: 500 }
    );
  }
}
