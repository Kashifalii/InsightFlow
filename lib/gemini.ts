import { createGoogleGenerativeAI } from "@ai-sdk/google";

if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  // Will fall through to demo mode in route handlers — no hard throw here
  console.warn("[InsightFlow] GOOGLE_GENERATIVE_AI_API_KEY is not set. Running in demo mode.");
}

export const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? "",
});

/** Gemini 2.0 Flash — fast, free-tier friendly */
export const geminiFlash = google("gemini-2.0-flash");
