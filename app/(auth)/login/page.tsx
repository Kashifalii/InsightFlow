import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginCard } from "@/components/auth/login-card";

export const metadata: Metadata = {
  title: "Sign In | InsightFlow",
  description: "Sign in to InsightFlow with your GitHub account.",
};

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return <LoginCard />;
}
