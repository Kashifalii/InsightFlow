import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "InsightFlow — AI-Powered SaaS Dashboard",
    template: "%s | InsightFlow",
  },
  description:
    "Monitor your SaaS metrics, get AI-generated business insights, manage team members, and generate marketing content — all from one intelligent dashboard.",
  keywords: ["SaaS", "analytics", "dashboard", "AI", "Next.js", "TypeScript"],
  authors: [{ name: "InsightFlow" }],
  openGraph: {
    title: "InsightFlow — AI-Powered SaaS Dashboard",
    description:
      "Monitor your SaaS metrics, get AI-generated insights, and generate marketing content.",
    type: "website",
    locale: "en_US",
    siteName: "InsightFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "InsightFlow — AI-Powered SaaS Dashboard",
    description: "Monitor your SaaS metrics with AI-powered insights.",
  },
  generator: "Next.js",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
          {process.env.NODE_ENV === "production" && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  );
}
