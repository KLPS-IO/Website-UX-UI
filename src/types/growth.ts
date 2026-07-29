export type GrowthRecord = {
  id: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
};

export type GrowthStrategy = {
  id: string;
  objective: string | null;
  target_audience: string | null;
  core_message: string | null;
  customer_problem: string | null;
  brand_principles: string[] | null;
  content_pillars: string[] | null;
  success_metrics: string[] | null;
};

export type GrowthMission = GrowthRecord & {
  title: string;
  description: string | null;
  reason: string | null;
  expected_outcome: string | null;
  estimated_minutes: number | null;
  priority: "low" | "medium" | "high" | "urgent";
  mission_date: string;
  status: "planned" | "active" | "completed" | "skipped";
  sprint_id: string | null;
  campaign_id: string | null;
};

export type MetricValue = {
  latest: number | null;
  absolute_change: number | null;
  percentage_change: number | null;
};

export type MissionControl = {
  active_sprint: GrowthRecord | null;
  active_campaign: GrowthRecord | null;
  today_mission: GrowthMission | null;
  growth_snapshot: {
    followers: number | null;
    reach: number | null;
    engagement_rate: number | null;
    posts_published: number | null;
    waitlist_signups_attributed: number | null;
  };
  metrics_summary: {
    platform_breakdown: Record<string, {
      snapshot_date: string;
      previous_snapshot_date: string | null;
      metrics: Record<string, MetricValue>;
    }>;
    latest_totals: unknown;
    trend_window_days: number;
  };
  current_goals: GrowthRecord[];
  progress_summary: {
    active_goals: number;
    achieved_goals: number;
    goals_with_progress: GrowthRecord[];
  };
  coach_message: {
    title: string;
    explanation: string;
    action_type: string;
    related_record_id: string | null;
    priority: string;
    estimated_minutes: number;
  };
  ranked_opportunities: Array<GrowthRecord & {
    type: string;
    title: string;
    score: number;
    reason: string;
  }>;
};

export type GrowthResource =
  | "sprints" | "campaigns" | "missions" | "content" | "questions"
  | "metrics" | "goals" | "insights" | "calendar" | "media";

export type CommunitySummary = {
  total_waitlist_signups: number;
  signups_this_week: number;
  signups_this_month: number;
  reviewed: number;
  unreviewed: number;
  source_distribution: Record<string, number>;
  meaningful_conversations_this_week: number;
  mvp_interested: number;
  potential_testers: number;
  confirmed_testers: number;
  founding_members: number;
  champions: number;
  overdue_follow_ups: number;
  referrals: number;
};

export type CommunityPerson = {
  waitlist_id: string;
  community_profile_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  source: string | null;
  joined_at: string;
  reviewed: boolean;
  reviewed_at?: string | null;
  relationship_stage: string;
  mvp_interest_status: string;
  tester_status: string;
  founding_member_status: string;
  champion_status: string;
  last_interaction_at: string | null;
  next_action: string | null;
  next_action_due_at: string | null;
  tags: string[];
  status: string;
  founder_notes?: string | null;
  research_interest?: boolean | null;
  research_participant?: boolean;
  stage_history?: GrowthRecord[];
  interactions?: GrowthRecord[];
  follow_ups?: GrowthRecord[];
  referrals?: GrowthRecord[];
  qualification?: GrowthRecord | null;
};

export type CommunityPeopleResponse = {
  people: CommunityPerson[];
  page: number;
  page_size: number;
  total: number;
};
