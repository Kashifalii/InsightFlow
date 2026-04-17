import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import type { SessionUser } from "@/types";

interface HeaderProps {
  user?: SessionUser;
  title: string;
}

export function DashboardHeader({ user, title }: HeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-card px-4 md:px-6">
      <MobileNav user={user} />
      <div className="flex-1">
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>
      <div className="flex items-center gap-2 lg:hidden">
        <ThemeToggle />
      </div>
    </header>
  );
}
