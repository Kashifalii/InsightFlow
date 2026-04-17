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
import Image from "next/image";

const features = [
  { icon: BarChart3, label: "Real-time SaaS metrics" },
  { icon: Sparkles, label: "AI-powered business insights" },
  { icon: Users, label: "Role-based team management" },
];

export function LoginCard() {
  const [loading, setLoading] = useState(false);

  async function handleGitHubSignIn() {
    setLoading(true);
    await signIn("github", { callbackUrl: "/dashboard" });
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 md:p-6">
      <div className="grid w-full max-w-6xl md:grid-cols-2 shadow-lg rounded-xl">
        {/* Left Card – Image */}
        <Card className="overflow-hidden border-none rounded-none shadow-lg py-0 md:block hidden">
          <div className="relative h-full min-h-[300px] w-full md:h-full">
            <Image
              src="/login-image.webp" // Replace with your image path
              alt="Analytics dashboard illustration"
              fill
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </Card>

        {/*  Right Card – Brand, Features & GitHub Button */}
        <Card className="flex flex-col rounded-none text-center border-0 ">
          <CardHeader className="pb-2 pt-2">
            <div className="flex flex-col items-center gap-2">
              <div className="flex size-15 items-center justify-center rounded-sm bg-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">InsightFlow</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                AI-powered analytics
                <br />
                for indie SaaS founders
              </h2>
              <p className="text-muted-foreground">
                Monitor metrics, generate insights, and grow faster.
              </p>
            </div>

            <ul className="space-y-3 w-fit mx-auto text-center">
              {features.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">{label}</span>
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

            {/* GitHub Button – Only OAuth option */}
            <Button
              className="w-full gap-2"
              size="lg"
              onClick={handleGitHubSignIn}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Github className="h-4 w-4" />
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
          <div className="p-6 pt-0 text-xs text-muted-foreground">
            © {new Date().getFullYear()} InsightFlow. All rights reserved.
          </div>
        </Card>
      </div>
    </div>
  );
}
