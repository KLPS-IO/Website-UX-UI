import {
  AlertCircle, ArrowRight, BarChart3, CalendarDays, ChevronRight, Clock3, Lightbulb,
  MessageCircle, Play, Sparkles, Target, TrendingUp, Users, X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { GrowthKpiCard, GrowthPanel } from "@/components/growth/GrowthWidgets";
import { CommunityWorkspace } from "@/components/growth/CommunityWorkspace";
import { SocialConnections } from "@/components/growth/SocialConnections";
import { ApiError } from "@/lib/authenticated-api";
import { growthService } from "@/services/growth/growth.service";
import type { GrowthMission, GrowthRecord, GrowthStrategy, MissionControl } from "@/types/growth";

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="mb-8">
    <div className="text-xs font-bold uppercase tracking-[0.1em] text-[#a91876]">{eyebrow}</div>
    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h1>
    <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">{description}</p>
  </div>;
}

export function MissionControlPage() {
  const [data, setData] = useState<MissionControl | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [missionForm, setMissionForm] = useState(false);
  const [manualCloseOpen, setManualCloseOpen] = useState(false);
  const [completionWarning, setCompletionWarning] = useState("");
  const [missionDate, setMissionDate] = useState(new Date().toISOString().slice(0, 10));

  const load = async () => {
    setLoading(true);
    setError("");
    try { setData(await growthService.missionControl()); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Mission Control could not be loaded."); }
    finally { setLoading(false); }
  };
  useEffect(() => { void load(); }, []);

  const missionAction = async (status: GrowthMission["status"], extra: Record<string, unknown> = {}) => {
    if (!data?.today_mission) return;
    setSaving(true); setNotice(""); setError("");
    try {
      if (status === "completed") await growthService.completeMission(data.today_mission.id);
      else await growthService.updateMission(data.today_mission.id, { status, ...extra });
      setNotice(status === "completed" ? "Mission completed and its saved outcome verified." : status === "skipped" ? "Mission skipped. The next current recommendation is ready." : "Mission updated.");
      await load();
    } catch (reason) {
      if (reason instanceof ApiError && reason.code === "mission_completion_confirmation_required") {
        setCompletionWarning(reason.message);
        setManualCloseOpen(true);
      } else setError(reason instanceof Error ? reason.message : "Mission could not be updated.");
    }
    finally { setSaving(false); }
  };

  const createMission = async (suggested = false) => {
    if (!data) return;
    setSaving(true); setError(""); setNotice("");
    try {
      if (suggested && data.recommended_candidate) {
        await growthService.acceptMissionCandidate(data.recommended_candidate, missionDate);
      } else {
        await growthService.create("missions", {
          title: "Plan today’s growth priority",
          description: "Define and complete the most valuable evidence-backed growth action for today.",
          reason: "Keep the daily growth plan focused and accountable.",
          expected_outcome: "A founder-defined growth priority completed with its outcome recorded.",
          estimated_minutes: 20,
          priority: "medium",
          mission_date: missionDate,
          status: "planned",
          ...(data.active_sprint?.id ? { sprint_id: data.active_sprint.id } : {}),
          ...(data.active_campaign?.id ? { campaign_id: data.active_campaign.id } : {}),
        });
      }
      setMissionForm(false);
      setNotice(suggested ? "Suggested mission saved." : "Mission created.");
      await load();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Mission could not be created."); }
    finally { setSaving(false); }
  };

  const dismissRecommendation = async () => {
    if (!data?.recommended_candidate) return;
    setSaving(true); setError(""); setNotice("");
    try {
      await growthService.dismissMissionCandidate(data.recommended_candidate);
      setNotice("Recommendation dismissed for now. Mission Control has recalculated the next action.");
      await load();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Recommendation could not be dismissed.");
    } finally { setSaving(false); }
  };

  if (loading && !data) return <GrowthState text="Loading your Funnel OS brief…" />;
  if (error && !data) return <GrowthError message={error} retry={() => void load()} />;
  const mission = data?.today_mission;
  const recommendation = data?.recommended_candidate;
  const snapshot = [
    ["Followers", valueOrDash(data?.growth_snapshot.followers), reportingDetail(data, "followers"), Users, "purple"],
    ["Reach", valueOrDash(data?.growth_snapshot.reach), reportingDetail(data, "reach"), BarChart3, "turquoise"],
    ["Waitlist", valueOrDash(data?.growth_snapshot.waitlist_signups_attributed), reportingDetail(data, "waitlist_signups_attributed"), TrendingUp, "turquoise"],
    ["Consistency", valueOrDash(data?.growth_snapshot.posts_published), "Published posts in latest combined snapshot", CalendarDays, "magenta"],
    ["Engagement", data?.growth_snapshot.engagement_rate == null ? "—" : `${data.growth_snapshot.engagement_rate}%`, reportingDetail(data, "engagement_rate"), Target, "purple"],
  ] as const;
  const opportunities = data?.ranked_opportunities ?? [];

  return <div>
    <PageIntro eyebrow="Your daily operating brief" title="Mission Control" description="Know what to do next, why it matters and what needs attention." />
    {error && <InlineMessage tone="error">{error}</InlineMessage>}
    {notice && <InlineMessage tone="success">{notice}</InlineMessage>}

    <section className="overflow-hidden rounded-2xl border border-[#df3fae]/25 bg-white/[0.035] shadow-[0_18px_55px_-34px_rgba(223,63,174,0.5)]">
      <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs font-medium text-[#a91876]"><span className="h-2 w-2 rounded-full bg-[#df3fae]" /> Morning brief</div>
          <h2 className="mt-4 text-2xl font-semibold text-white">Good morning, Emma.</h2>
          <div className="mt-6 text-xs font-bold uppercase tracking-[0.1em] text-white/60">{mission ? "Today’s saved mission" : recommendation ? "Recommended next action" : "Today’s mission"}</div>
          {mission ? <>
            <p className="mt-2 max-w-xl text-xl font-semibold leading-8 text-white">{mission.title}</p>
            {mission.description && <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">{mission.description}</p>}
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-white/60">
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#a91876]" /> {mission.estimated_minutes ?? "Not set"} minutes</span>
              <span className="inline-flex items-center gap-2"><Target className="h-4 w-4 text-[#a91876]" /> {String(data?.active_sprint?.name ?? "No active sprint")}</span>
              <span className="capitalize">{mission.status}</span>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {mission.status === "planned" && <ActionButton disabled={saving} onClick={() => void missionAction("active")}><Play className="h-4 w-4" /> Start mission</ActionButton>}
              {mission.status === "active" && <ActionButton disabled={saving} onClick={() => void missionAction("completed")}>Mark complete</ActionButton>}
              {!["completed", "skipped"].includes(mission.status) && <SecondaryButton disabled={saving} onClick={() => void missionAction("skipped")}>Skip</SecondaryButton>}
              {!["completed", "skipped"].includes(mission.status) && <SecondaryButton disabled={saving} onClick={() => setMissionForm(true)}>Reschedule</SecondaryButton>}
            </div>
          </> : recommendation ? <>
            <p className="mt-2 max-w-xl text-xl font-semibold leading-8 text-white">{recommendation.title}</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">{recommendation.description}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-white/60">
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#a91876]" /> {recommendation.estimated_minutes} minutes</span>
              <span className="capitalize">{recommendation.source_module}</span>
              <span className="capitalize">{recommendation.urgency} priority</span>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              <ActionButton disabled={saving} onClick={() => void createMission(true)}>Use suggested mission</ActionButton>
              <SecondaryButton disabled={saving} onClick={() => setMissionForm(true)}>Choose another date</SecondaryButton>
              <SecondaryButton disabled={saving} onClick={() => void dismissRecommendation()}>Dismiss for now</SecondaryButton>
            </div>
          </> : <>
            <p className="mt-2 max-w-xl text-xl font-semibold leading-8 text-white">No current action is supported by saved Funnel OS data.</p>
            <div className="mt-7"><ActionButton onClick={() => setMissionForm(true)}>Create a founder-defined mission</ActionButton></div>
          </>}
        </div>
        <div className="border-t border-[#df3fae]/15 bg-[#df3fae]/[0.07] p-6 md:p-8 lg:border-l lg:border-t-0">
          <div className="text-xs font-bold uppercase tracking-[0.1em] text-[#a91876]">Why this matters</div>
          <p className="mt-3 text-sm font-medium leading-6 text-white">{mission?.reason ?? recommendation?.why_it_matters ?? "No reason has been recorded yet."}</p>
          <div className="mt-7 text-xs font-bold uppercase tracking-[0.1em] text-[#087f7a]">Expected outcome</div>
          <p className="mt-3 text-sm leading-6 text-white/70">{mission?.expected_outcome ?? recommendation?.expected_outcome ?? "Not yet defined."}</p>
        </div>
      </div>
    </section>

    <div className="mt-8">
      <div className="mb-3 flex items-end justify-between"><div><div className="text-sm font-semibold text-white">Growth snapshot</div><div className="mt-1 text-xs text-white/50">Only the signals needed to orient your day.</div></div><span className="text-[10px] uppercase tracking-wider text-white/40">Manual snapshots</span></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{snapshot.map(([label, value, detail, icon, tone]) => <GrowthKpiCard key={label} label={label} value={value} detail={detail} icon={icon} tone={tone} />)}</div>
    </div>

    <div className="mt-6 grid gap-6 xl:grid-cols-2">
      <GrowthPanel title="Coach" eyebrow="Next best action"><div className="rounded-xl border border-[#35d3c8]/25 bg-[#35d3c8]/[0.07] p-5"><Sparkles className="h-5 w-5 text-[#087f7a]" /><p className="mt-4 text-base font-medium text-white">{data?.coach_message.title ?? "No recommendation available"}</p><p className="mt-2 text-sm leading-6 text-white/60">{data?.coach_message.explanation}</p><span className="mt-4 inline-block text-[10px] uppercase tracking-[0.18em] text-[#087f7a]">Deterministic · saved data</span></div></GrowthPanel>
      <GrowthPanel title="Opportunities" eyebrow="Ranked by saved-data rule"><div className="divide-y divide-white/[0.08]">{opportunities.length ? opportunities.map((opportunity, index) => <div key={opportunity.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"><div className="w-14 text-xs font-bold text-[#a91876]">{opportunity.score} pts</div><div className="min-w-0 flex-1"><div className="text-sm font-medium text-white">{opportunity.title}</div><div className="mt-0.5 text-xs text-white/50">{opportunity.reason}</div></div>{index === 0 && <ChevronRight className="h-4 w-4 text-[#a91876]" />}</div>) : <p className="text-sm text-white/55">No ranked content opportunities yet.</p>}</div></GrowthPanel>
    </div>

    <div className="mt-6"><GrowthPanel title="Progress" eyebrow="This week"><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">{[
      ["Current Sprint", String(data?.active_sprint?.name ?? "None active"), String(data?.active_sprint?.status ?? "Not set")],
      ["Goals", `${data?.progress_summary.achieved_goals ?? 0} achieved`, `${data?.progress_summary.active_goals ?? 0} active`],
      ["Content Published", valueOrDash(data?.growth_snapshot.posts_published), "Latest snapshot"],
      ["Campaign Status", String(data?.active_campaign?.name ?? "None active"), String(data?.active_campaign?.status ?? "Not set")],
      ["Waitlist", valueOrDash(data?.growth_snapshot.waitlist_signups_attributed), "Latest attributed sign-ups"],
    ].map(([label, value, status]) => <div key={label} className="border-l-2 border-[#35d3c8]/40 pl-4"><div className="text-xs font-bold uppercase tracking-[0.08em] text-white/60">{label}</div><div className="mt-2 text-sm font-semibold text-white">{value}</div><div className="mt-1 text-xs text-[#087f7a]">{status}</div></div>)}</div></GrowthPanel></div>
    {missionForm && <MissionDateDialog date={missionDate} setDate={setMissionDate} close={() => setMissionForm(false)} save={() => mission ? void missionAction("planned", { mission_date: missionDate }) : void createMission(Boolean(recommendation))} saving={saving} />}
    {manualCloseOpen && mission && <ManualCloseDialog
      warning={completionWarning}
      saving={saving}
      close={() => setManualCloseOpen(false)}
      confirm={async (reason) => {
        setSaving(true); setError("");
        try {
          await growthService.completeMission(mission.id, {
            manual_close: true,
            manual_close_reason: reason,
          });
          setManualCloseOpen(false);
          setNotice("Mission manually closed with the founder reason recorded.");
          await load();
        } catch (failure) {
          setError(failure instanceof Error ? failure.message : "Mission could not be manually closed.");
        } finally { setSaving(false); }
      }}
    />}
  </div>;
}

export function StrategyPage() {
  const [strategy, setStrategy] = useState<GrowthStrategy | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [sprint, setSprint] = useState<GrowthRecord | null>(null);
  const [campaign, setCampaign] = useState<GrowthRecord | null>(null);
  const [question, setQuestion] = useState<GrowthRecord | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const dirty = editing !== null;

  const load = async () => {
    setLoading(true); setError("");
    try {
      const [savedStrategy, sprints, campaigns, questions] = await Promise.all([
        growthService.strategy(),
        growthService.list("sprints", { status: "active" }),
        growthService.list("campaigns", { status: "active" }),
        growthService.list("questions"),
      ]);
      setStrategy(savedStrategy);
      setSprint(sprints[0] ?? null);
      setCampaign(campaigns[0] ?? null);
      setQuestion(questions.find((item) => item.status === "approved") ?? questions[0] ?? null);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Strategy could not be loaded."); }
    finally { setLoading(false); }
  };
  useEffect(() => { void load(); }, []);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const cards = useMemo(() => strategy ? [
    { key: "sprint", label: "Current Sprint", value: String(sprint?.name ?? "No active sprint"), record: sprint, field: "name" },
    { key: "campaign", label: "Campaign", value: String(campaign?.name ?? "No active campaign"), record: campaign, field: "name" },
    { key: "objective", label: "Objective", value: strategy.objective ?? "Not yet defined" },
    { key: "target_audience", label: "Target Audience", value: strategy.target_audience ?? "Not yet defined" },
    { key: "core_message", label: "Core Message", value: strategy.core_message ?? "Not yet defined" },
    { key: "customer_problem", label: "Customer Problem", value: strategy.customer_problem ?? "Not yet defined" },
    { key: "success_metrics", label: "Success Metrics", value: listText(strategy.success_metrics) },
    { key: "brand_principles", label: "Brand Principles", value: listText(strategy.brand_principles) },
    { key: "content_pillars", label: "Content Pillars", value: listText(strategy.content_pillars) },
    { key: "question", label: "Customer Questions", value: String(question?.question ?? "No customer question recorded"), record: question, field: "question" },
  ] : [], [campaign, question, sprint, strategy]);

  const begin = (key: string, value: string) => {
    if (editing && editing !== key && !window.confirm("Discard the unsaved change?")) return;
    setDraft({ [key]: value === "Not yet defined" || value.startsWith("No ") ? "" : value });
    setEditing(key); setNotice(""); setError("");
  };
  const save = async (card: typeof cards[number]) => {
    const value = draft[card.key]?.trim() ?? "";
    setSaving(true); setError("");
    try {
      if (card.key === "sprint" || card.key === "campaign") {
        if (card.record) await growthService.update(card.key === "sprint" ? "sprints" : "campaigns", card.record.id, { name: value });
        else await growthService.create(card.key === "sprint" ? "sprints" : "campaigns", { name: value, status: "active" });
      } else if (card.key === "question") {
        if (card.record) await growthService.update("questions", card.record.id, { question: value });
        else await growthService.create("questions", { question: value, status: "approved", priority: "medium" });
      } else {
        const payload = ["success_metrics", "brand_principles", "content_pillars"].includes(card.key)
          ? { [card.key]: value.split(/[,\n·]+/).map((item) => item.trim()).filter(Boolean) }
          : { [card.key]: value || null };
        await growthService.updateStrategy(payload);
      }
      setEditing(null); setNotice(`${card.label} saved.`); await load();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Strategy could not be saved."); }
    finally { setSaving(false); }
  };

  if (loading && !strategy) return <GrowthState text="Loading saved strategy…" />;
  if (error && !strategy) return <GrowthError message={error} retry={() => void load()} />;
  return <div><PageIntro eyebrow="Decide what matters" title="Strategy" description="The single source of truth for the current sprint, campaign and KLPS brand direction." />
    {error && <InlineMessage tone="error">{error}</InlineMessage>}
    {notice && <InlineMessage tone="success">{notice}</InlineMessage>}
    <div className="grid gap-4 md:grid-cols-2">{cards.map((card, index) => <section key={card.key} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5">
      <div className="flex items-center justify-between gap-3"><div className="text-xs font-bold uppercase tracking-[0.08em] text-white/60">{card.label}</div>{index < 2 && <span className="rounded-full bg-[#df3fae]/10 px-2 py-1 text-[9px] font-bold uppercase text-[#a91876]">Active</span>}</div>
      {editing === card.key ? <div className="mt-3">
        <textarea autoFocus value={draft[card.key] ?? ""} onChange={(event) => setDraft({ [card.key]: event.target.value })} className="min-h-24 w-full rounded-xl border border-white/15 bg-black/20 p-3 text-sm leading-6 text-white outline-none focus:border-[#df3fae]" />
        <div className="mt-3 flex gap-2"><ActionButton disabled={saving || !draft[card.key]?.trim()} onClick={() => void save(card)}>{saving ? "Saving…" : "Save"}</ActionButton><SecondaryButton disabled={saving} onClick={() => setEditing(null)}>Cancel</SecondaryButton></div>
      </div> : <><p className="mt-3 whitespace-pre-line text-sm font-medium leading-6 text-white">{card.value}</p><button type="button" onClick={() => begin(card.key, card.value)} className="mt-4 text-xs font-bold text-[#35d3c8] underline underline-offset-4">Edit</button></>}
    </section>)}</div>
  </div>;
}

const studioSteps = [
  ["Ideas", "idea"], ["Research", "research"], ["Talking Points", "talking_points"],
  ["Script", "script"], ["Record", "record"], ["Edit", "edit"],
  ["Schedule", "scheduled"], ["Publish", "published"], ["Results", "results"],
  ["Repurpose", "repurpose"],
] as const;

export function StudioPage() {
  const [items, setItems] = useState<GrowthRecord[]>([]);
  const [selected, setSelected] = useState<GrowthRecord | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = async () => {
    setLoading(true); setError("");
    try { setItems(await growthService.list("content")); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Studio content could not be loaded."); }
    finally { setLoading(false); }
  };
  useEffect(() => { void load(); }, []);
  return <div><PageIntro eyebrow="Turn ideas into output" title="Studio" description="Move every piece of content through one clear creation workflow." />
    {error && <InlineMessage tone="error">{error}</InlineMessage>}
    <GrowthPanel title="Content workflow" eyebrow="One piece · one next step" action={<ActionButton onClick={() => setCreating(true)}>Create content idea</ActionButton>}><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{studioSteps.map(([label, status], index) => {
      const count = items.filter((item) => item.status === status).length;
      return <div key={status} className={`relative rounded-xl border p-4 ${count ? "border-[#df3fae]/35 bg-[#df3fae]/[0.08]" : "border-white/[0.08] bg-white/[0.02]"}`}><div className="flex justify-between text-[10px] text-white/40"><span>{String(index + 1).padStart(2, "0")}</span><span>{count}</span></div><div className="mt-2 text-sm font-medium text-white">{label}</div>{index < studioSteps.length - 1 && <ArrowRight className="absolute -right-2.5 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-white/30 lg:block" />}</div>;
    })}</div></GrowthPanel>
    <div className="mt-6"><GrowthPanel title="Content items" eyebrow={loading ? "Loading saved work…" : `${items.length} saved`}>
      {loading ? <p className="text-sm text-white/55">Loading content…</p> : items.length ? <div className="grid gap-3 md:grid-cols-2">{items.map((item) => <button type="button" key={item.id} onClick={() => setSelected(item)} className="rounded-xl border border-white/10 bg-white/[.025] p-4 text-left hover:border-[#df3fae]/40"><div className="text-xs font-bold uppercase text-[#35d3c8]">{String(item.status ?? "idea").replaceAll("_", " ")}</div><div className="mt-2 font-semibold text-white">{String(item.title)}</div><div className="mt-1 text-xs text-white/50">{String(item.platform ?? "Platform not selected")} · {String(item.content_type ?? "Type not selected")}</div></button>)}</div> : <p className="text-sm text-white/55">No content items yet. Create the first idea when it is ready.</p>}
    </GrowthPanel></div>
    <div className="mt-6 grid gap-6 md:grid-cols-2"><GrowthPanel title="Media" eyebrow="Placeholder"><p className="text-sm leading-6 text-white/60">Approved photography, video, audio and brand assets will be available here.</p></GrowthPanel><GrowthPanel title="Calendar" eyebrow="Placeholder"><p className="text-sm leading-6 text-white/60">Scheduled publishing and campaign moments will appear here.</p></GrowthPanel></div>
    {(creating || selected) && <ContentDialog item={selected} close={() => { setCreating(false); setSelected(null); }} saved={async () => { setCreating(false); setSelected(null); await load(); }} />}
  </div>;
}

export function IntelligencePage() {
  const [insights, setInsights] = useState<GrowthRecord[]>([]);
  const [voice, setVoice] = useState<GrowthRecord[]>([]);
  const [metricsOpen, setMetricsOpen] = useState(false);
  const [insightOpen, setInsightOpen] = useState(false);
  const [error, setError] = useState("");
  const load = async () => { try { const [nextInsights,nextVoice] = await Promise.all([growthService.list("insights", { status: "active" }),growthService.communityVoice()]); setInsights(nextInsights); setVoice(nextVoice); } catch (reason) { setError(reason instanceof Error ? reason.message : "Insights could not be loaded."); } };
  useEffect(() => { void load(); }, []);
  return <div><PageIntro eyebrow="Turn signals into learning" title="Intelligence" description="Recommendations and evidence—not a wall of charts." />
    {error && <InlineMessage tone="error">{error}</InlineMessage>}
    <div className="mb-5 flex flex-wrap gap-2"><ActionButton onClick={() => setMetricsOpen(true)}>Update metrics</ActionButton><SecondaryButton onClick={() => setInsightOpen(true)}>Add insight</SecondaryButton></div>
    {insights.length ? <div className="grid gap-5 md:grid-cols-2">{insights.map((insight) => <section key={insight.id} className="rounded-2xl border border-[#35d3c8]/20 bg-white/[0.035] p-6"><Lightbulb className="h-5 w-5 text-[#087f7a]" /><div className="mt-5 text-xs font-bold uppercase tracking-[0.08em] text-[#087f7a]">{String(insight.category)}</div><h2 className="mt-2 text-lg font-semibold leading-7 text-white">{String(insight.title)}</h2><p className="mt-2 text-sm text-white/55">{String(insight.evidence ?? "Evidence not yet described")}</p><div className="mt-5 border-t border-white/[0.08] pt-4"><div className="text-xs font-bold uppercase tracking-[0.08em] text-white/55">Decision</div><p className="mt-2 text-sm text-white/65">{String(insight.recommended_decision ?? "Not yet decided")}</p><p className="mt-2 text-xs text-white/40">{String(insight.source_type ?? "manual")} · confidence {insight.confidence == null ? "not recorded" : `${Math.round(Number(insight.confidence) * 100)}%`}</p></div><button type="button" onClick={async () => { await growthService.update("insights", insight.id, { status: "archived" }); await load(); }} className="mt-4 text-xs font-bold text-white/50 underline">Archive</button></section>)}</div> : <GrowthPanel title="No evidence-led insights yet" eyebrow="Honest empty state"><p className="text-sm text-white/55">Add a founder observation after recording the supporting evidence, or enter metrics to establish a measurable baseline.</p></GrowthPanel>}
    <div className="mt-6"><GrowthPanel title="Voice of the Customer" eyebrow={`${voice.length} permission-aware record${voice.length === 1 ? "" : "s"}`}>{voice.length ? <div className="space-y-3">{voice.map(item => <blockquote key={item.id} className="rounded-xl border border-white/10 p-4"><p className="text-sm leading-6 text-white/75">“{String(item.exact_customer_language)}”</p><footer className="mt-2 text-xs font-bold uppercase tracking-[.06em] text-[#35d3c8]">{String(item.use_status).replaceAll("_"," ")}</footer></blockquote>)}</div> : <p className="text-sm text-white/55">No exact customer language has been recorded. Quotes remain internal unless explicit external-use permission is stored.</p>}</GrowthPanel></div>
    {metricsOpen && <QuickRecordDialog title="Update weekly metrics" fields={[["platform","Platform"],["snapshot_date","Snapshot date","date"],["followers","Followers","number"],["reach","Reach","number"],["engagement_rate","Engagement rate","number"],["posts_published","Posts published","number"],["waitlist_signups_attributed","Attributed waitlist sign-ups","number"],["notes","Notes"]]} defaults={{ snapshot_date: new Date().toISOString().slice(0,10), platform: "instagram" }} save={async (value) => { await growthService.create("metrics", numericPayload(value)); setMetricsOpen(false); }} close={() => setMetricsOpen(false)} />}
    {insightOpen && <QuickRecordDialog title="Add evidence-led insight" fields={[["title","Title"],["category","Category"],["evidence","Evidence"],["recommended_decision","Recommended decision"],["confidence","Confidence 0–1","number"],["source_type","Source type"]]} defaults={{ source_type: "manual", status: "active" }} save={async (value) => { await growthService.create("insights", { ...numericPayload(value), status:"active" }); setInsightOpen(false); await load(); }} close={() => setInsightOpen(false)} />}
  </div>;
}

export function CommunityPage() {
  const [questions, setQuestions] = useState<GrowthRecord[]>([]);
  const [open, setOpen] = useState(false);
  const load = async () => setQuestions(await growthService.list("questions"));
  useEffect(() => { void load(); }, []);
  return <div><PageIntro eyebrow="Build meaningful relationships" title="Community" description="Know who needs a response, a follow-up or a reason to stay engaged." /><CommunityWorkspace />
    <div className="mt-6"><GrowthPanel title="Customer questions" eyebrow={`${questions.length} saved`} action={<ActionButton onClick={() => setOpen(true)}>Add question</ActionButton>}>{questions.length ? <div className="space-y-2">{questions.map((question) => <div key={question.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 p-3"><div className="min-w-0 flex-1"><div className="font-semibold text-white">{String(question.question)}</div><div className="text-xs capitalize text-white/50">{String(question.priority ?? "medium")} · {String(question.status ?? "new")}</div></div>{question.status !== "approved" && <SecondaryButton onClick={async () => { await growthService.update("questions", question.id, { status:"approved" }); await load(); }}>Approve</SecondaryButton>}{question.status !== "used" && <SecondaryButton onClick={async () => { await growthService.update("questions", question.id, { status:"used", usage_count:Number(question.usage_count ?? 0)+1 }); await load(); }}>Mark used</SecondaryButton>}<button onClick={async () => { await growthService.update("questions", question.id, { status:"archived" }); await load(); }} className="text-xs text-white/50 underline">Archive</button></div>)}</div> : <p className="text-sm text-white/55">No customer questions recorded.</p>}</GrowthPanel></div>
    {open && <QuickRecordDialog title="Add customer question" fields={[["question","Question"],["theme","Theme"],["source","Source"],["priority","Priority"]]} defaults={{ priority:"medium", status:"new" }} save={async (value) => { await growthService.create("questions", { ...value, status:"new" }); setOpen(false); await load(); }} close={() => setOpen(false)} />}
  </div>;
}

export function SettingsPage({ reviewerMode = false }: { reviewerMode?: boolean }) {
  const [workspace, setWorkspace] = useState<GrowthRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [links, setLinks] = useState<GrowthRecord[]>([]);
  const [linkForm, setLinkForm] = useState({ label:"",destination_url:"",source:"",medium:"social",campaign:"" });
  useEffect(() => {
    if (reviewerMode) return;
    void Promise.all([growthService.workspace().then(setWorkspace),growthService.trackedLinks().then(setLinks)]).catch(() => undefined);
  }, [reviewerMode]);
  const update = async (payload: Record<string, unknown>) => { setSaving(true); setWorkspace(await growthService.updateWorkspace(payload)); setNotice("Settings saved."); setSaving(false); };
  if (reviewerMode) return <div>
    <PageIntro eyebrow="Meta App Review Workspace" title="Settings" description="Review the isolated Facebook connection flow." />
    <SocialConnections allowedProviders={["facebook"]} />
  </div>;
  return <div><PageIntro eyebrow="Workspace preferences" title="Settings" description="Prepare how Funnel OS should work for you as integrations become available." />{notice && <InlineMessage tone="success">{notice}</InlineMessage>}<div className="space-y-4">
    <section className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5"><h2 className="text-sm font-semibold text-white">Timezone</h2><input defaultValue={String(workspace?.timezone ?? "Europe/London")} onBlur={(event) => void update({ timezone:event.target.value })} className="mt-3 w-full rounded-xl border border-white/15 bg-black/20 p-3 text-white" /><span className="mt-2 block text-xs text-[#704293]">{saving ? "Saving…" : "Saved on change"}</span></section>
    <section className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5"><h2 className="text-sm font-semibold text-white">Default platforms</h2><input defaultValue={Array.isArray(workspace?.default_platforms) ? workspace.default_platforms.join(", ") : ""} onBlur={(event) => void update({ default_platforms:event.target.value.split(",").map(v=>v.trim()).filter(Boolean) })} placeholder="Instagram, TikTok, LinkedIn" className="mt-3 w-full rounded-xl border border-white/15 bg-black/20 p-3 text-white" /></section>
    <section className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5"><h2 className="text-sm font-semibold text-white">Tracked links</h2><p className="mt-1 text-sm text-white/55">Build truthful UTM links for owned-demand attribution. Public URLs use a safe code, not an internal record ID.</p><div className="mt-4 grid gap-3 md:grid-cols-2">{Object.entries(linkForm).map(([key,value]) => <label key={key} className="text-xs font-bold uppercase text-white/50">{key.replaceAll("_"," ")}<input value={value} onChange={event => setLinkForm(current => ({...current,[key]:event.target.value}))} className="mt-1 w-full rounded-xl border border-white/15 bg-black/20 p-3 text-sm font-normal normal-case text-white" /></label>)}</div><div className="mt-5"><ActionButton onClick={async () => { const created=await growthService.createTrackedLink(linkForm); setLinks(current => [created,...current]); setLinkForm({ label:"",destination_url:"",source:"",medium:"social",campaign:"" }); setNotice("Tracked link created."); }}>Create tracked link</ActionButton></div>{links.length ? <div className="mt-5 space-y-2">{links.map(item => <div key={item.id} className="rounded-xl border border-white/10 p-3"><div className="font-semibold text-white">{String(item.label)}</div><button onClick={() => navigator.clipboard.writeText(String(item.generated_url))} className="mt-1 break-all text-left text-xs text-[#35d3c8] underline">{String(item.generated_url)}</button></div>)}</div> : <p className="mt-5 text-sm text-white/50">No tracked links created.</p>}</section>
    <SocialConnections />
    <section className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 sm:flex-row sm:items-center"><div className="flex-1"><h2 className="text-sm font-semibold text-white">Future Integrations</h2><p className="mt-1 text-sm text-white/55">Scheduling workers and live platform metrics activate only after official provider approval.</p></div><span className="text-xs text-[#704293]">Planned</span></section>
  </div></div>;
}

function valueOrDash(value: number | null | undefined) {
  return value == null ? "—" : new Intl.NumberFormat("en-GB").format(value);
}

function reportingDetail(data: MissionControl | null, metric: string) {
  if (!data) return "Unavailable";
  const combined = data.metrics_summary.platform_breakdown.combined;
  if (!combined?.metrics?.[metric] || combined.metrics[metric].latest == null) return "Not yet recorded";
  return `Snapshot: ${combined.snapshot_date}`;
}

function listText(value: string[] | null) {
  return value?.length ? value.join(" · ") : "Not yet defined";
}

function GrowthState({ text }: { text: string }) {
  return <div className="flex min-h-[50vh] items-center justify-center text-sm font-medium text-white/60">{text}</div>;
}

function GrowthError({ message, retry }: { message: string; retry: () => void }) {
  const readableMessage = message === "Request failed with 500"
    ? "Mission Control could not load. The Funnel OS database update may still be pending."
    : message;
  return <section role="alert" aria-live="assertive" className="rounded-2xl border border-[#d96666] bg-[#fff4f4] p-6 shadow-[0_12px_35px_-28px_rgba(133,24,24,0.45)] md:p-8">
    <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8dada] text-[#9e2525]"><AlertCircle className="h-6 w-6" aria-hidden="true" /></span>
      <h2 className="mt-4 text-xl font-bold text-[#231f25]">Mission Control is temporarily unavailable</h2>
      <p className="mt-2 text-base font-medium leading-7 text-[#5b3434]">{readableMessage}</p>
      <button type="button" onClick={retry} className="mt-5 rounded-xl bg-[#df3fae] px-6 py-3 text-base font-bold text-white shadow-sm transition hover:bg-[#c8329a] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#df3fae]/25">Try again</button>
    </div>
  </section>;
}

function InlineMessage({ tone, children }: { tone: "error" | "success"; children: React.ReactNode }) {
  return <div role={tone === "error" ? "alert" : "status"} className={`mb-4 rounded-xl border p-4 text-sm font-semibold ${tone === "error" ? "border-[#c73b3b]/30 bg-[#fff1f1] text-[#941f1f]" : "border-[#087f7a]/25 bg-[#d9f1ef] text-[#075e5a]"}`}>{children}</div>;
}

function ActionButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} type={props.type ?? (props.onClick ? "button" : "submit")} className="inline-flex items-center gap-2 rounded-xl bg-[#df3fae] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c8329a] disabled:cursor-not-allowed disabled:opacity-50">{children}</button>;
}

function SecondaryButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" {...props} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[.04] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/[.08] disabled:cursor-not-allowed disabled:opacity-50">{children}</button>;
}

function MissionDateDialog({ date, setDate, close, save, saving }: { date: string; setDate: (value: string) => void; close: () => void; save: () => void; saving: boolean }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="mission-date-title" className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151019] p-6 shadow-2xl">
      <div className="flex items-start justify-between gap-4"><div><div className="text-xs font-bold uppercase tracking-[.12em] text-[#a91876]">Daily mission</div><h2 id="mission-date-title" className="mt-2 text-xl font-bold text-white">Choose mission date</h2></div><button type="button" onClick={close} aria-label="Close mission dialog" className="rounded-lg p-2 text-white/60 hover:bg-white/10"><X className="h-5 w-5" /></button></div>
      <label className="mt-5 block text-sm font-semibold text-white/70">Mission date<input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-black/25 px-3 py-3 text-white" /></label>
      <div className="mt-5 flex justify-end gap-2"><SecondaryButton onClick={close}>Cancel</SecondaryButton><ActionButton disabled={saving || !date} onClick={save}>{saving ? "Saving…" : "Save mission"}</ActionButton></div>
    </section>
  </div>;
}

function ManualCloseDialog({ warning, saving, close, confirm }: {
  warning: string;
  saving: boolean;
  close: () => void;
  confirm: (reason: string) => Promise<void>;
}) {
  const [reason, setReason] = useState("");
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f2b35]/45 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="manual-close-title" className="w-full max-w-lg rounded-2xl border border-[#c7ced4] bg-[#f7f8f9] p-6 shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-bold uppercase tracking-[0.08em] text-[#a91876]">Outcome not yet verified</div>
          <h2 id="manual-close-title" className="mt-2 text-2xl font-bold text-[#1f2b35]">Confirm manual close</h2>
        </div>
        <button type="button" onClick={close} aria-label="Close manual mission confirmation" className="rounded-lg border border-[#c7ced4] bg-white p-2 text-[#354550] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#df3fae]/25"><X className="h-5 w-5" /></button>
      </div>
      <p className="mt-4 text-base font-medium leading-7 text-[#52616d]">{warning}</p>
      <label className="mt-5 block text-[15px] font-bold text-[#26343f]">
        Why are you closing this mission manually?
        <textarea value={reason} onChange={(event) => setReason(event.target.value)} className="mt-2 min-h-28 w-full rounded-xl border border-[#bfc8cf] bg-white p-3.5 text-base text-[#1f2b35] outline-none focus:border-[#c5268d] focus:ring-2 focus:ring-[#df3fae]/20" />
      </label>
      <p className="mt-2 text-sm leading-6 text-[#52616d]">This reason is saved with the mission. It does not mark the operational outcome as verified.</p>
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <SecondaryButton disabled={saving} onClick={close}>Cancel</SecondaryButton>
        <ActionButton disabled={saving || reason.trim().length < 5} onClick={() => void confirm(reason.trim())}>{saving ? "Closing…" : "Confirm manual close"}</ActionButton>
      </div>
    </section>
  </div>;
}

const contentStatuses = studioSteps.map(([, status]) => status);
const contentFields = [
  ["title", "Title"], ["content_type", "Content type"], ["platform", "Platform"],
  ["pillar", "Content pillar"], ["hook", "Hook / opening line"],
  ["research_notes", "Research notes"], ["talking_points", "Talking points"],
  ["script", "Script"], ["caption", "Caption"], ["call_to_action", "Call to action"],
  ["scheduled_at", "Internal schedule", "datetime-local"], ["published_at", "Published date", "datetime-local"],
  ["external_post_url", "External post URL"], ["result_summary", "Results"],
  ["repurpose_notes", "Repurpose notes"],
] as const;

function ContentDialog({ item, close, saved }: { item: GrowthRecord | null; close: () => void; saved: () => Promise<void> }) {
  const [value, setValue] = useState<Record<string, string>>(() => Object.fromEntries(contentFields.map(([key]) => {
    const current = item?.[key];
    return [key, typeof current === "string" ? current.replace(/Z$/, "").slice(0, key.endsWith("_at") ? 16 : undefined) : ""];
  })));
  const [status, setStatus] = useState(String(item?.status ?? "idea"));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const dirty = true;
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  const save = async (nextStatus = status) => {
    if (!value.title.trim() || !value.content_type.trim()) { setError("Title and content type are required."); return; }
    setSaving(true); setError("");
    const payload: Record<string, unknown> = { ...value, status: nextStatus };
    for (const key of ["scheduled_at", "published_at"]) payload[key] = value[key] ? new Date(value[key]).toISOString() : null;
    try {
      if (item) await growthService.update("content", item.id, payload);
      else await growthService.create("content", payload);
      await saved();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Content could not be saved."); }
    finally { setSaving(false); }
  };
  const move = (direction: -1 | 1) => {
    const index = contentStatuses.indexOf(status as typeof contentStatuses[number]);
    const next = contentStatuses[Math.max(0, Math.min(contentStatuses.length - 1, index + direction))];
    setStatus(next);
  };
  const prepareBrief = () => {
    const subject = value.title || "this customer question";
    setValue({
      ...value,
      hook: value.hook || `What if ${subject.toLowerCase()} is not something you have to guess?`,
      talking_points: value.talking_points || "Name the problem\nExplain the useful insight\nConnect it to the KLPS mission",
      call_to_action: value.call_to_action || "Join the KLPS waitlist to follow the journey.",
      script: value.script || `Opening: ${subject}\n\nExplain the problem clearly, share one useful insight, then invite the audience to learn more.`,
      research_notes: value.research_notes || "Suggested duration: 30–45 seconds\nCover text: Stop guessing\nAssets: founder video, captions and KLPS mark",
    });
  };
  return <div className="fixed inset-0 z-50 flex justify-end bg-[#1f2b35]/45" onMouseDown={(event) => { if (event.target === event.currentTarget && window.confirm("Close without saving?")) close(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="content-title" className="h-full w-full max-w-2xl overflow-y-auto border-l border-[#c7ced4] bg-[#f7f8f9] p-5 shadow-2xl md:p-7">
      <div className="flex items-start justify-between gap-4"><div><div className="text-sm font-bold uppercase tracking-wider text-[#087f7a]">Persisted content workflow</div><h2 id="content-title" className="mt-2 text-2xl font-bold text-[#1f2b35]">{item ? "Edit content" : "Create content idea"}</h2></div><button type="button" onClick={() => { if (window.confirm("Close without saving?")) close(); }} aria-label="Close content editor" className="rounded-lg border border-[#c7ced4] bg-white p-2 text-[#354550] transition hover:border-[#c5268d] hover:text-[#a91876] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#df3fae]/25"><X className="h-5 w-5" /></button></div>
      {error && <InlineMessage tone="error">{error}</InlineMessage>}
      <label className="mt-6 block text-[15px] font-bold text-[#26343f]">Workflow stage<select value={status} onChange={(event) => setStatus(event.target.value)} className="mt-2 w-full rounded-xl border border-[#bfc8cf] bg-white p-3.5 text-base font-medium text-[#1f2b35] outline-none transition focus:border-[#c5268d] focus:ring-2 focus:ring-[#df3fae]/20">{studioSteps.map(([label, key]) => <option value={key} key={key}>{label}</option>)}</select></label>
      <div className="mt-5 grid gap-5">{contentFields.map(([key, label, type]) => <label key={key} className="text-[15px] font-bold text-[#26343f]">{label}{["research_notes", "talking_points", "script", "caption", "result_summary", "repurpose_notes"].includes(key) ? <textarea value={value[key]} onChange={(event) => setValue({ ...value, [key]: event.target.value })} className="mt-2 min-h-24 w-full rounded-xl border border-[#bfc8cf] bg-white p-3.5 text-base font-medium text-[#1f2b35] outline-none transition focus:border-[#c5268d] focus:ring-2 focus:ring-[#df3fae]/20" /> : <input type={type ?? "text"} value={value[key]} onChange={(event) => setValue({ ...value, [key]: event.target.value })} className="mt-2 w-full rounded-xl border border-[#bfc8cf] bg-white p-3.5 text-base font-medium text-[#1f2b35] outline-none transition focus:border-[#c5268d] focus:ring-2 focus:ring-[#df3fae]/20" />}</label>)}</div>
      <div className="mt-5 flex flex-wrap gap-2"><SecondaryButton onClick={prepareBrief}>Prepare content brief</SecondaryButton><SecondaryButton disabled={contentStatuses.indexOf(status as never) <= 0} onClick={() => move(-1)}>Move back</SecondaryButton><SecondaryButton disabled={contentStatuses.indexOf(status as never) >= contentStatuses.length - 1} onClick={() => move(1)}>Move forward</SecondaryButton>{item && <SecondaryButton onClick={() => setStatus("archived")}>Archive</SecondaryButton>}<ActionButton disabled={saving} onClick={() => void save()}>{saving ? "Saving…" : "Save content"}</ActionButton></div>
      <p className="mt-4 text-sm font-medium leading-6 text-[#52616d]">Scheduling is internal planning only. Funnel OS does not automatically publish to social platforms.</p>
    </section>
  </div>;
}

function numericPayload(value: Record<string, string>) {
  const numericFields = new Set(["followers","reach","engagement_rate","posts_published","waitlist_signups_attributed","confidence"]);
  return Object.fromEntries(Object.entries(value).map(([key, field]) => {
    if (!field.trim()) return [key, null];
    return [key, numericFields.has(key) ? Number(field) : field];
  }));
}

function QuickRecordDialog({ title, fields, defaults, save, close }: { title: string; fields: ReadonlyArray<readonly [string,string,string?]>; defaults: Record<string,string>; save: (value: Record<string,string>) => Promise<void>; close: () => void }) {
  const [value, setValue] = useState(defaults);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f2b35]/45 p-4">
    <form
      onSubmit={async (event) => { event.preventDefault(); setSaving(true); setError(""); try { await save(value); } catch (reason) { setError(reason instanceof Error ? reason.message : "Record could not be saved."); } finally { setSaving(false); } }}
      className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#c7ced4] bg-[#f7f8f9] p-6 shadow-2xl"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-[#1f2b35]">{title}</h2>
        <button type="button" onClick={close} aria-label={`Close ${title}`} className="rounded-lg border border-[#c7ced4] bg-white p-2 text-[#354550] transition hover:border-[#c5268d] hover:text-[#a91876] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#df3fae]/25">
          <X className="h-5 w-5" />
        </button>
      </div>
      {error && <InlineMessage tone="error">{error}</InlineMessage>}
      <div className="mt-6 grid gap-4">
        {fields.map(([key,label,type]) => <label key={key} className="text-[15px] font-bold text-[#26343f]">
          {label}
          <input
            required={["platform","snapshot_date","title","category","question"].includes(key)}
            type={type ?? "text"}
            value={value[key] ?? ""}
            onChange={(event) => setValue({ ...value, [key]:event.target.value })}
            className="mt-2 w-full rounded-xl border border-[#bfc8cf] bg-white p-3.5 text-base font-medium text-[#1f2b35] outline-none transition placeholder:text-[#78858f] focus:border-[#c5268d] focus:ring-2 focus:ring-[#df3fae]/20"
          />
        </label>)}
      </div>
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <SecondaryButton onClick={close}>Cancel</SecondaryButton>
        <ActionButton disabled={saving}>{saving ? "Saving…" : "Save"}</ActionButton>
      </div>
    </form>
  </div>;
}
