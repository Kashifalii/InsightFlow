import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  Cpu,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: "mrr" | "users" | "churn" | "api";
}

function MetricIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    mrr: <DollarSign className="h-5 w-5" />,
    users: <Users className="h-5 w-5" />,
    churn: <Activity className="h-5 w-5" />,
    api: <Cpu className="h-5 w-5" />,
  };
  return icons[icon] ?? null;
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
}: MetricCardProps) {
  const isPositive = change >= 0;
  const isBadPositive = icon === "churn" ? !isPositive : isPositive;

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <MetricIcon icon={icon} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="mt-1 flex items-center gap-1">
          {isBadPositive ? (
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" aria-hidden />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-red-500" aria-hidden />
          )}
          <span
            className={cn(
              "text-xs font-medium",
              isBadPositive ? "text-emerald-500" : "text-red-500"
            )}
          >
            {isPositive ? "+" : ""}
            {change}%
          </span>
          <span className="text-xs text-muted-foreground">{changeLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
}
