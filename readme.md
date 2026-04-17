# InsightFlow — Setup & Run Guide

## What You Need Before Starting

| Requirement       | Where to Get It                                    |
| ----------------- | -------------------------------------------------- |
| Node.js 18+       | https://nodejs.org                                 |
| pnpm              | Run: npm install -g pnpm                           |
| GitHub OAuth App  | https://github.com/settings/developers             |
| Google Gemini Key | https://aistudio.google.com (free, no card needed) |

---

## Step 1 — Clone or Download the Project

If connected to GitHub:
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

Or download the ZIP from v0 → three dots (top right) → Download ZIP, then unzip it.

---

## Step 2 — Install Dependencies

pnpm install

---

## Step 3 — Create Your Environment File

Create a file named .env.local in the root of the project:

GITHUB_ID=Ov23limxYEdFGzSgq5ME
GITHUB_SECRET=your_github_secret_here
NEXTAUTH_SECRET=any_random_32_char_string
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key_here

### How to get each value:

GITHUB_ID & GITHUB_SECRET

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Application name: InsightFlow
4. Homepage URL: http://localhost:3000
5. Authorization callback URL: http://localhost:3000/api/auth/callback/github
6. Click "Register application"
7. Copy Client ID → GITHUB_ID
8. Click "Generate a new client secret" → GITHUB_SECRET

NEXTAUTH_SECRET
Generate one at: https://generate-secret.vercel.app/32
Paste the result as the value.

GOOGLE_GENERATIVE_AI_API_KEY

1. Go to https://aistudio.google.com
2. Click "Get API key" → "Create API key"
3. Copy the key → GOOGLE_GENERATIVE_AI_API_KEY

---

## Step 4 — Run the Development Server

pnpm dev

Open your browser at: http://localhost:3000

You will be redirected to /login automatically.
Click "Sign in with GitHub" to authenticate.

---

## Step 5 — Navigating the App

/login → GitHub OAuth sign-in page
/dashboard → Overview: KPI cards, MRR chart, AI Insights panel
/analytics → Page views, weekly users, session data charts
/ai-tools → AI Content Generator (blog outlines, cold emails)
/users → User management table (admin role only)

---

## Step 6 — Build for Production

pnpm build
pnpm start

---

## Step 7 — Deploy to Vercel (Recommended)

1. Push the project to a GitHub repository
2. Go to https://vercel.com → New Project → Import your repo
3. Add all four environment variables in the Vercel dashboard:
   GITHUB_ID
   GITHUB_SECRET
   NEXTAUTH_SECRET
   GOOGLE_GENERATIVE_AI_API_KEY
4. Click Deploy

IMPORTANT: After deploying, update your GitHub OAuth App: - Homepage URL → https://your-app.vercel.app - Callback URL → https://your-app.vercel.app/api/auth/callback/github

---

## Tech Stack Reference

Framework Next.js 15 (App Router)
Language TypeScript (strict mode)
Styling Tailwind CSS v4 + shadcn/ui
Auth NextAuth.js v5 (GitHub OAuth)
AI Google Gemini 2.0 Flash via @ai-sdk/google
Charts Recharts (MRR area, bar, line charts)
Tables TanStack Table v8
Theme Dark / Light mode via next-themes

---

## Folder Structure

app/
(auth)/login/ Login page
(dashboard)/
dashboard/ Overview page
analytics/ Analytics page
ai-tools/ AI Content Generator
users/ User Management (admin)
api/
auth/[...nextauth]/ NextAuth route handler
ai/insights/ AI Insights API
ai/generate/ AI Content Generator API
components/
layout/ Sidebar, Header, MobileNav, ThemeToggle
dashboard/ MetricCard, UsersTable
charts/ MRRAreaChart, WeeklyUsersChart, PageViewsChart
ai/ InsightsPanel, ContentGenerator
auth/ LoginCard
lib/
auth.ts NextAuth config
gemini.ts Gemini AI client
mock-data.ts Demo data for charts and tables
types/
index.ts Shared TypeScript types
middleware.ts Route protection

---

## Troubleshooting

Problem: "MissingSecret" error on login
Fix: Make sure NEXTAUTH_SECRET is set in .env.local

Problem: AI features return errors
Fix: Make sure GOOGLE_GENERATIVE_AI_API_KEY is valid and not revoked

Problem: GitHub login fails / redirect mismatch
Fix: Check the callback URL in your GitHub OAuth App matches exactly:
http://localhost:3000/api/auth/callback/github (local)
https://your-app.vercel.app/api/auth/callback/github (production)

Problem: Charts not rendering
Fix: Run pnpm install to ensure recharts is installed, then pnpm dev

---

Guide version: 1.0 | Project: InsightFlow
