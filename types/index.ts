export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "admin" | "viewer";
  status: "active" | "inactive";
  joinedAt: string;
}

export interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  trend: "up" | "down";
}

export interface ChartData {
  label: string;
  value: number;
  secondary?: number;
}

export interface AIInsight {
  id: string;
  text: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  adminOnly?: boolean;
}

export interface DashboardMetrics {
  mrr: number;
  activeUsers: number;
  churnRate: number;
  apiCalls: number;
}

export interface GenerateRequest {
  type: "blog" | "email";
  topic?: string;
  tone?: string;
  persona?: string;
  productName?: string;
}

export interface SessionUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: "admin" | "viewer";
}
