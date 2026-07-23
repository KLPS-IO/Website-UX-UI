import {
  ArrowRight, BarChart3, CalendarDays, ChevronRight, Clock3, Lightbulb,
  MessageCircle, Play, Sparkles, Target, TrendingUp, Users,
} from "lucide-react";
import { GrowthKpiCard, GrowthPanel } from "@/components/growth/GrowthWidgets";

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="mb-8">
    <div className="text-xs font-bold uppercase tracking-[0.1em] text-[#a91876]">{eyebrow}</div>
    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h1>
    <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">{description}</p>
  </div>;
}

const snapshot = [
  ["Followers", "—", "Awaiting connection", Users, "purple"],
  ["Reach", "—", "Awaiting connection", BarChart3, "turquoise"],
  ["Waitlist", "—", "Not yet measured", TrendingUp, "turquoise"],
  ["Consistency", "—", "Tracking begins here", CalendarDays, "magenta"],
  ["Growth Score", "—", "Not yet calculated", Target, "purple"],
] as const;

const opportunities = [
  ["★★★★★", "Record TikTok", "High impact", "10 min"],
  ["★★★★☆", "Reply to comments", "Build trust", "15 min"],
  ["★★★★☆", "Repurpose Reel", "Extend reach", "20 min"],
  ["★★★☆☆", "Write LinkedIn post", "Founder visibility", "25 min"],
];

export function MissionControlPage() {
  return <div>
    <PageIntro eyebrow="Your daily operating brief" title="Mission Control" description="Know what to do next, why it matters and what needs attention." />

    <section className="overflow-hidden rounded-2xl border border-[#df3fae]/25 bg-white/[0.035] shadow-[0_18px_55px_-34px_rgba(223,63,174,0.5)]">
      <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs font-medium text-[#a91876]"><span className="h-2 w-2 rounded-full bg-[#df3fae]" /> Morning brief</div>
          <h2 className="mt-4 text-2xl font-semibold text-white">Good morning, Emma.</h2>
          <div className="mt-6 text-xs font-bold uppercase tracking-[0.1em] text-white/60">Today’s mission</div>
          <p className="mt-2 max-w-xl text-xl font-semibold leading-8 text-white">Record one TikTok answering “Why does my body change every week?”</p>
          <div className="mt-5 flex flex-wrap gap-4 text-xs text-white/60">
            <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#a91876]" /> 10 minutes</span>
            <span className="inline-flex items-center gap-2"><Target className="h-4 w-4 text-[#a91876]" /> Operation Stop Guessing</span>
          </div>
          <button className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#df3fae] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c8329a]">
            <Play className="h-4 w-4" /> Start today’s mission
          </button>
        </div>
        <div className="border-t border-[#df3fae]/15 bg-[#df3fae]/[0.07] p-6 md:p-8 lg:border-l lg:border-t-0">
          <div className="text-xs font-bold uppercase tracking-[0.1em] text-[#a91876]">Why this matters</div>
          <p className="mt-3 text-sm font-medium leading-6 text-white">Question-based videos currently outperform founder updates.</p>
          <div className="mt-7 text-xs font-bold uppercase tracking-[0.1em] text-[#087f7a]">Expected outcome</div>
          <p className="mt-3 text-sm leading-6 text-white/70">Increase awareness and drive relevant traffic to the KLPS waitlist.</p>
        </div>
      </div>
    </section>

    <div className="mt-8">
      <div className="mb-3 flex items-end justify-between"><div><div className="text-sm font-semibold text-white">Growth snapshot</div><div className="mt-1 text-xs text-white/50">Only the signals needed to orient your day.</div></div><span className="text-[10px] uppercase tracking-wider text-white/40">Mock data</span></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{snapshot.map(([label, value, detail, icon, tone]) => <GrowthKpiCard key={label} label={label} value={value} detail={detail} icon={icon} tone={tone} />)}</div>
    </div>

    <div className="mt-6 grid gap-6 xl:grid-cols-2">
      <GrowthPanel title="Coach" eyebrow="Next best action"><div className="rounded-xl border border-[#35d3c8]/25 bg-[#35d3c8]/[0.07] p-5"><Sparkles className="h-5 w-5 text-[#087f7a]" /><p className="mt-4 text-base font-medium text-white">The next best action is to publish one useful answer before creating anything new.</p><p className="mt-2 text-sm leading-6 text-white/60">Future recommendations will adapt to channel and audience performance.</p><span className="mt-4 inline-block text-[10px] uppercase tracking-[0.18em] text-[#087f7a]">Phase 1 · Static coach</span></div></GrowthPanel>
      <GrowthPanel title="Opportunities" eyebrow="Ranked by likely value"><div className="divide-y divide-white/[0.08]">{opportunities.map(([score, action, reason, time], index) => <div key={action} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"><div className="w-16 text-[10px] tracking-tight text-[#a91876]">{score}</div><div className="min-w-0 flex-1"><div className="text-sm font-medium text-white">{action}</div><div className="mt-0.5 text-xs text-white/50">{reason} · {time}</div></div>{index === 0 && <ChevronRight className="h-4 w-4 text-[#a91876]" />}</div>)}</div></GrowthPanel>
    </div>

    <div className="mt-6"><GrowthPanel title="Progress" eyebrow="This week"><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">{[
      ["Current Sprint", "Operation Stop Guessing", "Active"],
      ["Weekly Progress", "1 of 4 actions", "25%"],
      ["Content Published", "1 piece", "On track"],
      ["Campaign Status", "Preparing", "Needs attention"],
      ["Waitlist Goal", "Not set", "Define next"],
    ].map(([label, value, status]) => <div key={label} className="border-l-2 border-[#35d3c8]/40 pl-4"><div className="text-xs font-bold uppercase tracking-[0.08em] text-white/60">{label}</div><div className="mt-2 text-sm font-semibold text-white">{value}</div><div className="mt-1 text-xs text-[#087f7a]">{status}</div></div>)}</div></GrowthPanel></div>
  </div>;
}

const strategyFields = [
  ["Current Sprint", "Operation Stop Guessing"], ["Campaign", "Founder-led customer education"],
  ["Objective", "Build awareness and qualified waitlist interest"], ["Target Audience", "Women seeking clearer body insight"],
  ["Core Message", "Your body is data, not a mystery"], ["Customer Problem", "Body changes feel unpredictable and unexplained"],
  ["Success Metrics", "Not yet connected"], ["Brand Principles", "Clear · credible · human"],
  ["Content Pillars", "Education · founder journey · smart textiles"], ["Customer Questions", "Why does my body change every week?"],
];

export function StrategyPage() {
  return <div><PageIntro eyebrow="Decide what matters" title="Strategy" description="The single source of truth for the current sprint, campaign and KLPS brand direction." />
    <div className="grid gap-4 md:grid-cols-2">{strategyFields.map(([label, value], index) => <section key={label} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5"><div className="flex items-center justify-between"><div className="text-xs font-bold uppercase tracking-[0.08em] text-white/60">{label}</div>{index < 2 && <span className="rounded-full bg-[#df3fae]/10 px-2 py-1 text-[9px] font-bold uppercase text-[#a91876]">Active</span>}</div><p className="mt-3 text-sm font-medium leading-6 text-white">{value}</p></section>)}</div>
  </div>;
}

const studioSteps = ["Ideas", "Research", "Talking Points", "Script", "Record", "Edit", "Schedule", "Publish", "Results", "Repurpose"];

export function StudioPage() {
  return <div><PageIntro eyebrow="Turn ideas into output" title="Studio" description="Move every piece of content through one clear creation workflow." />
    <GrowthPanel title="Content workflow" eyebrow="One piece · one next step"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{studioSteps.map((step, index) => <div key={step} className={`relative rounded-xl border p-4 ${index === 0 ? "border-[#df3fae]/35 bg-[#df3fae]/[0.08]" : "border-white/[0.08] bg-white/[0.02]"}`}><div className="text-[10px] text-white/40">{String(index + 1).padStart(2, "0")}</div><div className="mt-2 text-sm font-medium text-white">{step}</div>{index < studioSteps.length - 1 && <ArrowRight className="absolute -right-2.5 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-white/30 lg:block" />}</div>)}</div></GrowthPanel>
    <div className="mt-6 grid gap-6 md:grid-cols-2"><GrowthPanel title="Media" eyebrow="Placeholder"><p className="text-sm leading-6 text-white/60">Approved photography, video, audio and brand assets will be available here.</p></GrowthPanel><GrowthPanel title="Calendar" eyebrow="Placeholder"><p className="text-sm leading-6 text-white/60">Scheduled publishing and campaign moments will appear here.</p></GrowthPanel></div>
  </div>;
}

const insights = [
  ["Question videos outperform founder updates.", "Content format", "Use a customer question for the next video."],
  ["Purple thumbnails receive higher engagement.", "Creative pattern", "Retain purple as the visual anchor."],
  ["Women aged 35–44 show longest watch time.", "Audience signal", "Prioritise language relevant to this audience."],
  ["Three waitlist conversions this week.", "Commercial signal", "Review the content journey that led to signup."],
];

export function IntelligencePage() {
  return <div><PageIntro eyebrow="Turn signals into learning" title="Intelligence" description="Recommendations and evidence—not a wall of charts." /><div className="grid gap-5 md:grid-cols-2">{insights.map(([insight, type, action]) => <section key={insight} className="rounded-2xl border border-[#35d3c8]/20 bg-white/[0.035] p-6"><Lightbulb className="h-5 w-5 text-[#087f7a]" /><div className="mt-5 text-xs font-bold uppercase tracking-[0.08em] text-[#087f7a]">{type}</div><h2 className="mt-2 text-lg font-semibold leading-7 text-white">{insight}</h2><div className="mt-5 border-t border-white/[0.08] pt-4"><div className="text-xs font-bold uppercase tracking-[0.08em] text-white/55">Decision</div><p className="mt-2 text-sm text-white/65">{action}</p></div></section>)}</div><p className="mt-5 text-xs text-white/45">Illustrative Phase 1 insights only. No analytics integrations are connected.</p></div>;
}

export function CommunityPage() {
  const areas = ["Waitlist", "Comments", "Newsletter", "Partners", "Investors", "Creators", "Media"];
  return <div><PageIntro eyebrow="Build meaningful relationships" title="Community" description="Know who needs a response, a follow-up or a reason to stay engaged." /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{areas.map(area => <section key={area} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5"><MessageCircle className="h-5 w-5 text-[#704293]" /><h2 className="mt-4 font-semibold text-white">{area}</h2><p className="mt-2 text-sm text-white/55">Workspace prepared for a future connection.</p></section>)}</div></div>;
}

export function SettingsPage() {
  return <div><PageIntro eyebrow="Workspace preferences" title="Settings" description="Prepare how Growth OS should work for you as integrations become available." /><div className="space-y-4">{[
    ["Theme", "Light · calm contrast", "Current preference"],
    ["Notifications", "Not configured", "Future control"],
    ["Connected Accounts", "No accounts connected", "Placeholder"],
    ["Future Integrations", "Social, scheduling, AI and analytics", "Planned"],
  ].map(([title, value, status]) => <section key={title} className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 sm:flex-row sm:items-center"><div className="flex-1"><h2 className="text-sm font-semibold text-white">{title}</h2><p className="mt-1 text-sm text-white/55">{value}</p></div><span className="text-xs text-[#704293]">{status}</span></section>)}</div></div>;
}
