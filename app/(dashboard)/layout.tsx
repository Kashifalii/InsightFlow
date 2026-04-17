import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AppSidebar } from "@/components/layout/sidebar";
import type { SessionUser } from "@/types";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user: SessionUser = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
    role: (session.user as SessionUser).role ?? "viewer",
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar — full */}
      <div className="hidden lg:flex lg:shrink-0">
        <AppSidebar user={user} collapsed={false} />
      </div>

      {/* Tablet sidebar — icon-only */}
      <div className="hidden md:flex lg:hidden shrink-0">
        <AppSidebar user={user} collapsed={true} />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
