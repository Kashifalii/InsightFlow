"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Zap, Github, Loader2, BarChart3, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  { icon: BarChart3, label: "Real-time SaaS metrics" },
  { icon: Sparkles, label: "AI-powered business insights" },
  { icon: Users, label: "Role-based team management" },
];

export function LoginCard() {
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    await signIn("github", { callbackUrl: "/dashboard" });
  }

  return (
    <div className="w-full max-w-sm">
      <Card className="shadow-lg">
        <CardHeader className="items-center justify-center text-center pb-4">
          {/* Logo */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary mb-3 mx-auto">
            <Zap className="h-6 w-6 text-primary-foreground" aria-hidden />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            InsightFlow
          </CardTitle>
          <CardDescription className="text-balance">
            AI-powered analytics for indie SaaS founders. Monitor metrics,
            generate insights, and grow faster.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Features list */}
          <ul className="space-y-2" aria-label="Platform features">
            {features.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 text-sm text-muted-foreground"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <Icon className="h-3.5 w-3.5 text-primary" aria-hidden />
                </div>
                {label}
              </li>
            ))}
          </ul>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">
                Continue with
              </span>
            </div>
          </div>

          {/* Sign in button */}
          <Button
            className="w-full gap-2"
            size="lg"
            onClick={handleSignIn}
            disabled={loading}
            aria-label="Sign in with GitHub"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            ) : (
              <Github className="h-5 w-5" aria-hidden />
            )}
            {loading ? "Signing in…" : "Sign in with GitHub"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By signing in you agree to our{" "}
            <span className="underline underline-offset-4 cursor-pointer hover:text-foreground">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="underline underline-offset-4 cursor-pointer hover:text-foreground">
              Privacy Policy
            </span>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
