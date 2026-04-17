import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardHeader } from "@/components/layout/header";
import { UsersTable } from "@/components/dashboard/users-table";
import { mockUsers } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users } from "lucide-react";
import type { SessionUser } from "@/types";

export const metadata: Metadata = {
  title: "User Management",
  description: "Manage your team members — view, edit, and remove users with role-based access control.",
};

export default async function UsersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role = (session.user as SessionUser).role ?? "viewer";
  if (role !== "admin") {
    redirect("/dashboard");
  }

  const user: SessionUser = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
    role,
  };

  return (
    <div className="flex flex-col">
      <DashboardHeader user={user} title="User Management" />

      <div className="flex-1 space-y-6 p-4 md:p-6">
        <section aria-label="Team members table">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-4 w-4 text-primary" aria-hidden />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">
                    Team Members
                  </CardTitle>
                  <CardDescription className="mt-0.5">
                    Manage team access, roles, and remove members as needed.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <UsersTable data={mockUsers} />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
