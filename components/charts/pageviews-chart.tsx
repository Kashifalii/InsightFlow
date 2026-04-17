"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ChartData } from "@/types";

interface PageviewsChartProps {
  data: ChartData[];
}

export function PageviewsChart({ data }: PageviewsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="pageviewsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(var(--chart-1))"
              stopOpacity={0.3}
            />
            <stop
              offset="95%"
              stopColor="hsl(var(--chart-1))"
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="sessionsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(var(--chart-3))"
              stopOpacity={0.3}
            />
            <stop
              offset="95%"
              stopColor="hsl(var(--chart-3))"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="hsl(var(--border))"
          vertical={false}
        />
        <XAxis
          dataKey="label"
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={48}
          tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            borderRadius: "0.5rem",
            color: "hsl(var(--foreground))",
            fontSize: 13,
          }}
          formatter={(value: number, name: string) => [
            value.toLocaleString(),
            name === "value" ? "Page Views" : "Sessions",
          ]}
          labelStyle={{ color: "hsl(var(--muted-foreground))" }}
        />
        <Legend
          formatter={(value: string) =>
            value === "value" ? "Page Views" : "Sessions"
          }
          wrapperStyle={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          fill="url(#pageviewsGradient)"
          dot={false}
          activeDot={{ r: 4 }}
          isAnimationActive
          animationDuration={800}
        />
        <Area
          type="monotone"
          dataKey="secondary"
          stroke="hsl(var(--chart-3))"
          strokeWidth={2}
          fill="url(#sessionsGradient)"
          dot={false}
          activeDot={{ r: 4 }}
          isAnimationActive
          animationDuration={900}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
