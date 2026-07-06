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

import BehaviourWordCloud
from "@/components/BehaviourWordCloud";

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

type WordData = {
  text: string;
  value: number;
};

type WordCloudResponse = {
  last7Days: WordData[];
  historical: WordData[];
};

/* ---------------- DEFAULT ---------------- */

const defaultData: InvestorDashboardData = {
  sessionSummary: [],
  completionData: [],
  growthData: [],
  streakData: [],
};

const founderEndpoints = {
  sessionSummary:
    `${API_BASE}/api/founder/session-summary`,

  completionData:
    `${API_BASE}/api/founder/checkin-completion`,

  growthData:
    `${API_BASE}/api/founder/user-growth`,

  streakData:
    `${API_BASE}/api/founder/streak-summary`,

  wordCloud:
    `${API_BASE}/api/summary/word-cloud`, 
};

const FOUNDER_DASHBOARD_TOKEN_KEY =
  "klps.founderDashboard.sessionToken";

function getSecureDashboardHeaders() {
  const token =
    sessionStorage.getItem(FOUNDER_DASHBOARD_TOKEN_KEY);

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
}

/* ---------------- FETCH ---------------- */

async function fetchInvestorResource<T>(
  url: string
): Promise<T[]> {

  const response =
    await fetch(url, {
      credentials: "include",
      headers: getSecureDashboardHeaders(),
    });

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

export default function FounderDashboard() {

  const [data, setData] =
    useState<InvestorDashboardData>(
      defaultData
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [wordCloudData, setWordCloudData] =
  useState<WordCloudResponse>({
    last7Days: [],
    historical: []
  });  

  /* ---------------- LOAD DATA ---------------- */

  useEffect(() => {

    let cancelled = false;

    const loadDashboard = async () => {

      setLoading(true);
      setError("");

      const results =
        await Promise.allSettled([

          fetchInvestorResource<SessionSummaryRow>(
            founderEndpoints.sessionSummary
          ),

          fetchInvestorResource<CompletionRow>(
            founderEndpoints.completionData
          ),

          fetchInvestorResource<GrowthRow>(
            founderEndpoints.growthData
          ),

          fetchInvestorResource<StreakRow>(
            founderEndpoints.streakData
          ),

          fetch(founderEndpoints.wordCloud, {
            credentials: "include",
            headers: getSecureDashboardHeaders(),
          })
            .then(res => {
              if (!res.ok) {
                throw new Error(
                  `${res.status} ${res.statusText}`
                );
              }
              return res.json();
            })
            .catch(() => ({
              last7Days: [],
              historical: []
          }))
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

      setWordCloudData(

        results[4].status === "fulfilled"
          ? results[4].value
          : {
              last7Days: [],
              historical: []
            }

        );

      const protectedResults =
        results.slice(0, 4);

      const failedCount =
        protectedResults.filter(
          r => r.status === "rejected"
        ).length;

      if (failedCount === protectedResults.length) {

        setError(
          "Secure founder metrics are unavailable. Please log out and back into your founder beta account to refresh protected access."
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

  const hasDashboardMetrics =
    data.sessionSummary.length > 0 ||
    data.completionData.length > 0 ||
    data.growthData.length > 0 ||
    data.streakData.length > 0;

  const metricValue = (
    value: string | number
  ) =>
    error && !hasDashboardMetrics
      ? "Unavailable"
      : value;

  const checkInSummary =
    error && !hasDashboardMetrics
      ? "Check-in count unavailable."
      : `${completedCheckins} check-ins recorded so far.`;

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
    "Word Cloud Saturation";

  if (growthIncreasing) {

    growthMessage =
      "User words is trending upward.";

  }

  if (error && !hasDashboardMetrics) {

    tractionHeadline =
      "Secure founder metrics are unavailable.";

    growthMessage =
      "Protected dashboard data is not loaded.";

    retentionMessage =
      "Please log out and back into your founder beta account to refresh protected access.";

  }

  /* ---------------- UI ---------------- */

  return (

<div className="mx-auto max-w-6xl space-y-6 px-5 pt-6">

<h1 className="text-3xl text-purple-900">
Founder Dashboard
</h1>

{error && (
  <Card className="border-amber-300 bg-amber-50">
    <CardContent className="pt-6 text-sm text-amber-900">
      {error}
    </CardContent>
  </Card>
)}

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

<p>{checkInSummary}</p>

</CardContent>

</Card>

{/* KPI GRID */}

<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

<KpiCard
label="Total Users"
value={metricValue(totalUsers)}
loading={loading}
/>

<KpiCard
label="Active Users"
value={metricValue(activeUsers)}
loading={loading}
/>

<KpiCard
label="Day 2 Retention"
value={metricValue(`${day2Retention}%`)}
loading={loading}
/>

<KpiCard
label="Retention Health"
value={metricValue(retentionHealth)}
loading={loading}
/>

<KpiCard
label="Longest Streak"
value={metricValue(longestStreak)}
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

<Card>

<CardHeader>

<CardTitle>
Behaviour Insight — Last 7 Days
</CardTitle>

</CardHeader>

<CardContent>

<BehaviourWordCloud
words={wordCloudData.last7Days}
/>

</CardContent>

</Card>

<Card>

<CardHeader>

<CardTitle>
Behaviour Insight — Historical
</CardTitle>

</CardHeader>

<CardContent>

<BehaviourWordCloud
words={wordCloudData.historical}
/>

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
