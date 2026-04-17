import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { auth } from "@/lib/auth";

const schema = z.object({
  type: z.enum(["blog", "email"]),
  topic: z.string().optional(),
  tone: z.string().optional(),
  persona: z.string().optional(),
  productName: z.string().optional(),
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

  const { type, topic, tone, persona, productName } = parsed.data;

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    // Demo mode — return mock content when API key is not configured
    if (type === "blog") {
      const mock = `# ${topic ?? "AI-Powered SaaS Growth"}: The Complete Guide

## 1. Understanding the Core Problem
### 1.1 Why Traditional Approaches Fail
### 1.2 The Cost of Inaction
### 1.3 What Success Looks Like

## 2. Building Your Strategy
### 2.1 Setting Measurable Goals
### 2.2 Identifying Your Ideal Customer Profile
### 2.3 Mapping the Buyer Journey

## 3. Implementing Solutions
### 3.1 Quick Wins for Immediate Impact
### 3.2 Long-Term Structural Changes
### 3.3 Tools and Resources You Will Need

## 4. Measuring and Iterating
### 4.1 Key Metrics to Track
### 4.2 A/B Testing Framework
### 4.3 When to Pivot

## 5. Scaling What Works
### 5.1 Automation Opportunities
### 5.2 Team and Process Alignment
### 5.3 Case Studies and Benchmarks`;
      return NextResponse.json({ content: mock });
    } else {
      const mock = `---EMAIL 1 — AWARENESS---
Subject: The hidden reason your ${productName ?? "product"} churn is so high

Hi [First Name],

I have been talking to ${persona ?? "SaaS founders"} lately, and the same problem keeps coming up: churn that does not make sense on paper.

You have good retention metrics. Your NPS is solid. But month after month, users quietly disappear.

Here is what I have found: it is almost never the product. It is the gap between what users expect and what they experience in week one.

I would love to share what has been working. Reply "yes" and I will send over a short breakdown.

— [Your Name]

---EMAIL 2 — VALUE---
Subject: What 3 high-growth teams did differently (before it clicked)

Hi [First Name],

Yesterday I mentioned the "expectation gap" problem.

Here is the pattern I have seen with ${persona ?? "SaaS founders"} who broke through it:

1. They mapped their ideal user's first 7 days — not 30 days.
2. They made one activation milestone impossible to miss.
3. They triggered human outreach at exactly the right moment.

${productName ?? "Our product"} was built to help with step 3. But the first two steps? Those are decisions only you can make.

Happy to walk you through how others have tackled it. Want a 20-minute call?

— [Your Name]

---EMAIL 3 — CTA---
Subject: Last note from me on this

Hi [First Name],

I have reached out twice now — I will not keep bugging you.

But if reducing churn is a Q2 priority and you are open to a quick conversation, I am here.

Just reply with a time that works, or book directly here: [Calendar Link]

Either way, I hope the frameworks in my last email were useful.

— [Your Name]`;
      return NextResponse.json({ content: mock });
    }
  }

  const { geminiFlash } = await import("@/lib/gemini");

  let systemPrompt = "";
  let userPrompt = "";

  if (type === "blog") {
    systemPrompt =
      "You are an expert SEO content strategist. Generate a structured blog post outline with a compelling H1 title, 5 H2 sections, and 2-3 H3 subtopics under each H2. Use ## for H2 and ### for H3 in Markdown.";
    userPrompt = `Create a detailed SEO blog outline for the topic: "${topic}". Tone: ${tone ?? "Professional"}.`;
  } else {
    systemPrompt =
      "You are an expert B2B cold email copywriter. Generate a 3-part cold email sequence. Separate each email with '---EMAIL [N] — [STAGE]---'. Each email needs a Subject line and Body. Keep emails concise (under 150 words each). Focus on value, not features.";
    userPrompt = `Write a 3-part cold email sequence targeting: "${persona}". Product name: "${productName}". Each email should build on the previous one: Awareness → Value → CTA.`;
  }

  try {
    const { text } = await generateText({
      model: geminiFlash,
      system: systemPrompt,
      prompt: userPrompt,
    });

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("[InsightFlow] Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to generate content. Please try again." },
      { status: 500 }
    );
  }
}
