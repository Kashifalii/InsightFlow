"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ChartData } from "@/types";

interface WeeklyUsersChartProps {
  data: ChartData[];
}

export function WeeklyUsersChart({ data }: WeeklyUsersChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={data}
        margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
      >
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
          width={40}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            borderRadius: "0.5rem",
            color: "hsl(var(--foreground))",
            fontSize: 13,
          }}
          formatter={(value: number) => [value.toLocaleString(), "Active Users"]}
          labelStyle={{ color: "hsl(var(--muted-foreground))" }}
          cursor={{ fill: "hsl(var(--muted))" }}
        />
        <Bar
          dataKey="value"
          fill="hsl(var(--chart-2))"
          radius={[4, 4, 0, 0]}
          isAnimationActive
          animationDuration={800}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
