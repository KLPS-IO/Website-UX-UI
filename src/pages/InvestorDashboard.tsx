import { useEffect, useState } from "react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { API_BASE } from "@/config/api";

/* ---------------- TYPES ---------------- */

type SessionSummaryRow = {
  total_users?: number;
  active_users?: number;
  completed_checkins?: number;
  avg_completion_rate?: number;
};

type CompletionRow = {
  label?: string;
  completed?: number;
};

type GrowthRow = {
  label?: string;
  users?: number;
};

type StreakRow = {
  label?: string;
  users?: number;
};

type InvestorDashboardData = {
  sessionSummary: SessionSummaryRow[];
  completionData: CompletionRow[];
  growthData: GrowthRow[];
  streakData: StreakRow[];
};

/* ---------------- DEFAULT ---------------- */

const defaultData: InvestorDashboardData = {
  sessionSummary: [],
  completionData: [],
  growthData: [],
  streakData: [],
};

const investorEndpoints = {
  sessionSummary:
    `${API_BASE}/api/founder/session-summary`,

  completionData:
    `${API_BASE}/api/founder/checkin-completion`,

  growthData:
    `${API_BASE}/api/founder/user-growth`,

  streakData:
    `${API_BASE}/api/founder/streak-summary`,
};

/* ---------------- FETCH ---------------- */

async function fetchInvestorResource<T>(
  url: string
): Promise<T[]> {

  const response = await fetch(url);

  if (!response.ok) {

    throw new Error(
      `${response.status} ${response.statusText}`
    );

  }

  const result =
    await response.json();

  if (Array.isArray(result)) {

    return result;

  }

  if (Array.isArray(result.data)) {

    return result.data;

  }

  return [];

}

/* ---------------- COMPONENT ---------------- */

export default function InvestorDashboard() {

  const [data, setData] =
    useState<InvestorDashboardData>(
      defaultData
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* ---------------- LOAD DATA ---------------- */

  useEffect(() => {

    let cancelled = false;

    const loadDashboard = async () => {

      setLoading(true);
      setError("");

      const results =
        await Promise.allSettled([

          fetchInvestorResource<SessionSummaryRow>(
            investorEndpoints.sessionSummary
          ),

          fetchInvestorResource<CompletionRow>(
            investorEndpoints.completionData
          ),

          fetchInvestorResource<GrowthRow>(
            investorEndpoints.growthData
          ),

          fetchInvestorResource<StreakRow>(
            investorEndpoints.streakData
          ),

        ]);

      if (cancelled) return;

      setData({

        sessionSummary:
          results[0].status === "fulfilled"
            ? results[0].value
            : [],

        completionData:
          results[1].status === "fulfilled"
            ? results[1].value
            : [],

        growthData:
          results[2].status === "fulfilled"
            ? results[2].value
            : [],

        streakData:
          results[3].status === "fulfilled"
            ? results[3].value
            : [],

      });

      const failedCount =
        results.filter(
          r => r.status === "rejected"
        ).length;

      if (failedCount === results.length) {

        setError(
          "Investor metrics not returning yet."
        );

      }

      setLoading(false);

    };

    loadDashboard();

    return () => {
      cancelled = true;
    };

  }, []);

  /* ---------------- SUMMARY ---------------- */

  const summary =
    data.sessionSummary[0] || {};

  const totalUsers =
    Number(summary.total_users ?? 0);

  const activeUsers =
    Number(summary.active_users ?? 0);

  const completedCheckins =
    Number(
      summary.completed_checkins ?? 0
    );

  /* ---------------- RETENTION KPI ---------------- */

  const completionChartData =
    data.completionData.map(item => ({

      label:
        item.label || "Day",

      completed:
        Number(item.completed) || 0,

    }));

  const day1Users =
    completionChartData[0]?.completed || 0;

  const day2Users =
    completionChartData[1]?.completed || 0;

  const day2Retention =
    day1Users > 0
      ? Math.round(
          (day2Users / day1Users) * 100
        )
      : 0;

  /* ---------------- RETENTION HEALTH ---------------- */

  let retentionHealth =
    "Forming";

  if (day2Retention >= 40) {

    retentionHealth =
      "Strong";

  }
  else if (day2Retention >= 25) {

    retentionHealth =
      "Emerging";

  }
  else if (day2Retention > 0) {

    retentionHealth =
      "Weak";

  }

  /* ---------------- LONGEST STREAK ---------------- */

  const longestStreak =
    Math.max(
      ...data.streakData.map(
        s => Number(s.users) || 0
      ),
      0
    );

  /* ---------------- GROWTH TREND ---------------- */

  const growthChartData =
    data.growthData.map(item => ({

      label:
        item.label || "Period",

      users:
        Number(item.users) || 0,

    }));

  const growthValues =
    growthChartData.map(g => g.users);

  const growthIncreasing =
    growthValues.length > 1 &&
    growthValues[
      growthValues.length - 1
    ] >
    growthValues[0];

  /* ---------------- NARRATIVE ---------------- */

  let tractionHeadline =
    "Waiting for enough data.";

  if (totalUsers > 0) {

    tractionHeadline =
      `${totalUsers} users have joined during early testing.`;

  }

  let retentionMessage =
    "Retention forming.";

  if (day2Retention >= 30) {

    retentionMessage =
      "Early retention signals look healthy.";

  }

  let growthMessage =
    "Growth stabilising.";

  if (growthIncreasing) {

    growthMessage =
      "User growth is trending upward.";

  }

  /* ---------------- UI ---------------- */

  return (

<div className="mx-auto max-w-6xl space-y-6 px-5 pt-6">

<h1 className="text-3xl text-purple-900">
Investor Dashboard
</h1>

{/* STORY */}

<Card>

<CardHeader>

<CardTitle>
Early Traction Story
</CardTitle>

</CardHeader>

<CardContent className="space-y-2 text-sm">

<p>{tractionHeadline}</p>

<p>{growthMessage}</p>

<p>{retentionMessage}</p>

<p>

{completedCheckins}
{" "}
check-ins recorded so far.

</p>

</CardContent>

</Card>

{/* KPI HEADER */}

<div className="space-y-1">

<h2 className="text-sm font-medium text-muted-foreground">

KPI Summary
<span className="text-xs text-muted-foreground ml-1">
(Key Performance Indicators)
</span>

</h2>

</div>

{/* KPI GRID */}

<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

<KpiCard
label="Total Users"
value={totalUsers}
loading={loading}
/>

<KpiCard
label="Active Users"
value={activeUsers}
loading={loading}
/>

<KpiCard
label="Day 2 Retention"
value={`${day2Retention}%`}
loading={loading}
/>

<KpiCard
label="Retention Health"
value={retentionHealth}
loading={loading}
/>

<KpiCard
label="Longest Streak"
value={longestStreak}
loading={loading}
/>

</div>

{/* GROWTH */}

<Card>

<CardHeader>

<CardTitle>
Growth Trend
</CardTitle>

</CardHeader>

<CardContent>

<div className="h-72">

<ResponsiveContainer>

<AreaChart
data={growthChartData}
>

<CartesianGrid />

<XAxis dataKey="label" />

<YAxis />

<Tooltip />

<Area
type="monotone"
dataKey="users"
stroke="#9333ea"
fill="#e9d5ff"
strokeWidth={3}
/>

</AreaChart>

</ResponsiveContainer>

</div>

</CardContent>

</Card>

{/* COMPLETION */}

<Card>

<CardHeader>

<CardTitle>
Completion Momentum
</CardTitle>

</CardHeader>

<CardContent>

<div className="h-72">

<ResponsiveContainer>

<BarChart
data={completionChartData}
>

<CartesianGrid />

<XAxis dataKey="label" />

<YAxis />

<Tooltip />

<Bar
dataKey="completed"
fill="#22c55e"
radius={[8,8,0,0]}
/>

</BarChart>

</ResponsiveContainer>

</div>

</CardContent>

</Card>

</div>

  );

}

/* KPI COMPONENT */

function KpiCard({
  label,
  value,
  loading
}: {
  label: string;
  value: string | number;
  loading: boolean;
}) {

  return (

<Card>

<CardHeader>

<CardDescription>

{label}

</CardDescription>

<CardTitle>

{loading ? "..." : value}

</CardTitle>

</CardHeader>

</Card>

  );

}