import { ChevronLeft, ChevronRight, Clock3, Copy, Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { growthService } from "@/services/growth/growth.service";
import type { CommunityPerson, CommunitySummary, GrowthRecord } from "@/types/growth";

const tabs = ["Overview", "People", "Waitlist", "Conversations", "MVP Interest", "Follow-ups", "Champions"] as const;
const stages = ["new","reviewed","engaged","waitlist","research_participant","mvp_interested","potential_tester","confirmed_tester","founding_member","champion","advocate","inactive","opted_out"];
const label = (value: string) => value.replaceAll("_", " ").replace(/\b\w/g, character => character.toUpperCase());
const date = (value: unknown) => typeof value === "string" && !Number.isNaN(Date.parse(value))
  ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(value))
  : "Not recorded";
const dateTime = (value: unknown) => typeof value === "string" && !Number.isNaN(Date.parse(value))
  ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value))
  : "Not recorded";
const filterControlClassName =
  "w-full rounded-xl border border-[#c7ced4] bg-[#f7f8f9] px-3 py-3 text-sm font-medium text-[#1f2b35] shadow-sm outline-none transition focus:border-[#c5268d] focus:ring-2 focus:ring-[#df3fae]/20";

export function CommunityWorkspace() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  const [summary, setSummary] = useState<CommunitySummary | null>(null);
  const [people, setPeople] = useState<CommunityPerson[]>([]);
  const [selected, setSelected] = useState<CommunityPerson | null>(null);
  const [followUps, setFollowUps] = useState<GrowthRecord[]>([]);
  const [interactions, setInteractions] = useState<GrowthRecord[]>([]);
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("");
  const [reviewed, setReviewed] = useState("");
  const [order, setOrder] = useState("newest");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const filters: Record<string,string> = { page: String(page), page_size: "20", order };
      if (search.trim()) filters.search = search.trim();
      if (stage) filters.relationship_stage = stage;
      if (reviewed) filters.reviewed = reviewed;
      if (tab === "Waitlist" && !reviewed) filters.reviewed = "false";
      if (tab === "MVP Interest") filters.mvp_interest_status = "interested";
      if (tab === "Champions") filters.champion_status = "active";
      const [nextSummary, nextPeople, nextFollowUps, nextInteractions] = await Promise.all([
        growthService.communitySummary(),
        growthService.communityPeople(filters),
        growthService.communityFollowUps(),
        growthService.communityInteractions(),
      ]);
      setSummary(nextSummary); setPeople(nextPeople.people); setTotal(nextPeople.total); setFollowUps(nextFollowUps); setInteractions(nextInteractions);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Community data could not be loaded.");
    } finally { setLoading(false); }
  }, [page, search, stage, reviewed, order, tab]);
  useEffect(() => { void load(); }, [load]);

  const open = async (person: CommunityPerson) => {
    try { setSelected(await growthService.communityPerson(person.waitlist_id)); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Person detail could not be loaded."); }
  };

  const metrics = summary ? [
    ["Total people", summary.total_waitlist_signups],
    ["New this week", summary.signups_this_week],
    ["Unreviewed", summary.unreviewed],
    ["Conversations this week", summary.meaningful_conversations_this_week],
    ["MVP interested", summary.mvp_interested],
    ["Potential testers", summary.potential_testers],
    ["Confirmed testers", summary.confirmed_testers],
    ["Founding members", summary.founding_members],
    ["Champions", summary.champions],
    ["Overdue follow-ups", summary.overdue_follow_ups],
    ["Referrals", summary.referrals],
  ] : [];

  return <div className="space-y-5">
    <nav aria-label="Community views" className="flex gap-2 overflow-x-auto pb-1">
      {tabs.map(item => <button key={item} type="button" onClick={() => { setTab(item); setPage(1); }} aria-current={tab === item ? "page" : undefined} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${tab === item ? "bg-[#df3fae] text-white" : "border border-white/15 bg-white/[.04] text-white/70 hover:text-white"}`}>{item}</button>)}
    </nav>
    {error && <div role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">{error} <button type="button" onClick={() => void load()} className="ml-2 underline">Try again</button></div>}

    {tab === "Overview" && <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {loading && !summary ? <p className="text-sm text-white/60">Loading community overview…</p> : metrics.map(([name,value]) => <section key={name} className="rounded-2xl border border-white/10 bg-white/[.035] p-5"><div className="text-xs font-bold uppercase tracking-[.08em] text-[#35d3c8]">{name}</div><div className="mt-3 text-3xl font-bold text-white">{value}</div></section>)}
      {summary && <section className="rounded-2xl border border-white/10 bg-white/[.035] p-5 sm:col-span-2"><div className="text-xs font-bold uppercase tracking-[.08em] text-[#35d3c8]">Acquisition sources</div><div className="mt-3 flex flex-wrap gap-2">{Object.entries(summary.source_distribution).length ? Object.entries(summary.source_distribution).map(([source,count]) => <span key={source} className="rounded-full bg-white/10 px-3 py-2 text-sm text-white/75">{source}: {count}</span>) : <span className="text-sm text-white/55">No source data recorded.</span>}</div></section>}
    </div>}

    {["People","Waitlist","MVP Interest","Champions"].includes(tab) && <section className="rounded-2xl border border-white/10 bg-white/[.025]">
      <div className="grid gap-3 border-b border-white/10 p-4 md:grid-cols-[1fr_auto_auto_auto]">
        <label className="relative"><span className="sr-only">Search people</span><Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[#52616d]" /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search name or email" className={`${filterControlClassName} pl-10 placeholder:font-normal placeholder:text-[#78858f]`} /></label>
        <select aria-label="Relationship stage" value={stage} onChange={event => { setStage(event.target.value); setPage(1); }} className={filterControlClassName}><option value="">All stages</option>{stages.map(item => <option key={item} value={item}>{label(item)}</option>)}</select>
        <select aria-label="Reviewed status" value={reviewed} onChange={event => { setReviewed(event.target.value); setPage(1); }} className={filterControlClassName}><option value="">Any review state</option><option value="false">Unreviewed</option><option value="true">Reviewed</option></select>
        <select aria-label="Sort people" value={order} onChange={event => setOrder(event.target.value)} className={filterControlClassName}><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="next_action_due">Next action due</option></select>
      </div>
      {loading ? <p className="p-6 text-sm text-white/55">Loading people…</p> : people.length ? <div className="divide-y divide-white/10">{people.map(person => <button type="button" key={person.waitlist_id} onClick={() => void open(person)} className="grid w-full gap-3 p-4 text-left hover:bg-white/[.04] md:grid-cols-[1.3fr_.8fr_.8fr_1fr] md:items-center"><div><div className="font-semibold text-white">{person.name}</div><div className="mt-1 text-sm text-white/50">{person.email}</div></div><div><div className="text-xs uppercase text-white/40">Stage</div><div className="mt-1 text-sm text-white/75">{label(person.relationship_stage)}</div></div><div><div className="text-xs uppercase text-white/40">Joined</div><div className="mt-1 text-sm text-white/75">{date(person.joined_at)}</div></div><div><div className="text-xs uppercase text-white/40">Next action</div><div className="mt-1 text-sm text-white/75">{person.next_action ?? (person.reviewed ? "Not set" : "Review member")}</div></div></button>)}</div> : <p className="p-6 text-sm text-white/55">No people match these filters. Future waitlist sign-ups will appear automatically.</p>}
      <div className="flex items-center justify-between border-t border-white/10 p-4 text-sm text-white/55"><span>{total} {total === 1 ? "person" : "people"}</span><div className="flex gap-2"><button disabled={page === 1} onClick={() => setPage(value => value - 1)} aria-label="Previous page" className="rounded-lg border border-white/15 p-2 disabled:opacity-30"><ChevronLeft className="h-4 w-4" /></button><button disabled={page * 20 >= total} onClick={() => setPage(value => value + 1)} aria-label="Next page" className="rounded-lg border border-white/15 p-2 disabled:opacity-30"><ChevronRight className="h-4 w-4" /></button></div></div>
    </section>}

    {tab === "Conversations" && <Timeline items={interactions} empty="Open a person to record the first meaningful conversation." />}
    {tab === "Follow-ups" && <FollowUps items={followUps} reload={load} />}
    {selected && <PersonDrawer person={selected} close={() => setSelected(null)} refreshed={async () => { const person = await growthService.communityPerson(selected.waitlist_id); setSelected(person); await load(); }} />}
  </div>;
}

function Timeline({ items, empty }: { items: GrowthRecord[]; empty: string }) {
  return <section className="rounded-2xl border border-white/10 bg-white/[.025] p-5"><h2 className="font-bold text-white">Conversation record</h2>{items.length ? <div className="mt-4 space-y-3">{items.map(item => <div key={item.id} className="rounded-xl border border-white/10 p-4"><div className="text-sm font-semibold text-white">{String(item.person_name ?? item.interaction_type)}</div><p className="mt-1 text-sm text-white/60">{String(item.summary ?? "")}</p><div className="mt-2 text-xs text-white/40">{dateTime(item.occurred_at)}</div></div>)}</div> : <p className="mt-3 text-sm text-white/55">{empty}</p>}</section>;
}

function FollowUps({ items, reload }: { items: GrowthRecord[]; reload: () => Promise<void> }) {
  return <section className="rounded-2xl border border-white/10 bg-white/[.025] p-5"><h2 className="font-bold text-white">Follow-up queue</h2>{items.length ? <div className="mt-4 space-y-3">{items.map(item => <div key={item.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 p-4"><Clock3 className="h-4 w-4 text-[#35d3c8]" /><div className="min-w-0 flex-1"><div className="font-semibold text-white">{String(item.title)}</div><div className="text-sm text-white/50">{String(item.person_name ?? "Person")} · due {dateTime(item.due_at)}</div></div>{item.status === "pending" && <button type="button" onClick={async () => { await growthService.updateCommunityFollowUp(item.id, { status:"completed" }); await reload(); }} className="rounded-xl bg-[#df3fae] px-4 py-2 text-sm font-semibold text-white">Complete</button>}</div>)}</div> : <p className="mt-3 text-sm text-white/55">No follow-ups recorded. Nothing is inferred from passive activity.</p>}</section>;
}

function PersonDrawer({ person, close, refreshed }: { person: CommunityPerson; close: () => void; refreshed: () => Promise<void> }) {
  const [notes, setNotes] = useState(person.founder_notes ?? "");
  const [nextAction, setNextAction] = useState(person.next_action ?? "");
  const [stage, setStage] = useState(person.relationship_stage);
  const [form, setForm] = useState<"interaction"|"followup"|"qualification"|"draft"|null>(null);
  const [draft, setDraft] = useState("");
  const [notice, setNotice] = useState("");
  const history = person.stage_history ?? [];
  return <div className="fixed inset-0 z-50 bg-black/60" onMouseDown={event => { if (event.target === event.currentTarget) close(); }}>
    <aside role="dialog" aria-modal="true" aria-labelledby="community-person-title" className="ml-auto h-full w-full max-w-2xl overflow-y-auto border-l border-white/10 bg-[#151019] p-5 shadow-2xl">
      <div className="flex items-start justify-between gap-4"><div><div className="text-xs font-bold uppercase tracking-[.1em] text-[#35d3c8]">Canonical waitlist member</div><h2 id="community-person-title" className="mt-2 text-2xl font-bold text-white">{person.name}</h2><p className="mt-1 text-sm text-white/55">{person.email}{person.phone ? ` · ${person.phone}` : ""}</p></div><button onClick={close} aria-label="Close person detail" className="rounded-lg p-2 text-white/60 hover:bg-white/10"><X className="h-5 w-5" /></button></div>
      {notice && <div role="status" className="mt-4 rounded-xl bg-[#35d3c8]/10 p-3 text-sm text-[#8ff4ed]">{notice}</div>}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">{[["Source",person.source ?? "Not recorded"],["Joined",date(person.joined_at)],["Reviewed",person.reviewed ? "Yes" : "No"]].map(([name,value]) => <div key={name} className="rounded-xl border border-white/10 p-3"><div className="text-xs uppercase text-white/40">{name}</div><div className="mt-1 text-sm text-white">{value}</div></div>)}</div>
      <div className="mt-5 rounded-2xl border border-white/10 p-4"><label className="text-sm font-semibold text-white">Relationship stage<select value={stage} onChange={event => setStage(event.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-black/20 p-3 text-white">{stages.map(item => <option key={item} value={item}>{label(item)}</option>)}</select></label><button onClick={async () => { await growthService.changeCommunityStage(person.waitlist_id,stage,"Founder-confirmed stage change"); setNotice("Relationship stage saved."); await refreshed(); }} className="mt-3 rounded-xl bg-[#df3fae] px-4 py-2 text-sm font-semibold text-white">Save stage</button>{!person.reviewed && <button onClick={async () => { await growthService.reviewCommunityPerson(person.waitlist_id); setNotice("Member marked as reviewed."); await refreshed(); }} className="ml-2 mt-3 rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white">Mark reviewed</button>}</div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-white">Founder notes<textarea value={notes} onChange={event => setNotes(event.target.value)} className="mt-2 min-h-28 w-full rounded-xl border border-white/15 bg-black/20 p-3 text-white" /></label><label className="text-sm font-semibold text-white">Next action<textarea value={nextAction} onChange={event => setNextAction(event.target.value)} className="mt-2 min-h-28 w-full rounded-xl border border-white/15 bg-black/20 p-3 text-white" /></label></div>
      <button onClick={async () => { await growthService.updateCommunityPerson(person.waitlist_id,{ founder_notes:notes,next_action:nextAction }); setNotice("Relationship notes saved."); await refreshed(); }} className="mt-3 rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white">Save notes and action</button>
      <div className="mt-5 flex flex-wrap gap-2">{[["interaction","Record conversation"],["followup","Add follow-up"],["qualification","Qualify MVP interest"],["draft","Prepare message draft"]].map(([key,name]) => <button key={key} onClick={async () => { setForm(key as typeof form); if (key === "draft") setDraft(await growthService.communityDraft(person.waitlist_id,"welcome")); }} className="rounded-xl border border-white/15 bg-white/[.04] px-4 py-2 text-sm font-semibold text-white">{name}</button>)}<button onClick={async () => { await growthService.updateCommunityPerson(person.waitlist_id,{ status:"archived" }); setNotice("Growth profile archived. The original waitlist sign-up remains unchanged."); await refreshed(); }} className="rounded-xl border border-red-400/30 px-4 py-2 text-sm font-semibold text-red-200">Archive Growth profile</button></div>
      {form && <CommunityForm mode={form} person={person} draft={draft} setDraft={setDraft} close={() => setForm(null)} saved={async message => { setForm(null); setNotice(message); await refreshed(); }} />}
      <section className="mt-6"><h3 className="font-bold text-white">Stage timeline</h3>{history.length ? <ol className="mt-3 border-l border-white/15 pl-5">{history.map(item => <li key={item.id} className="relative pb-4"><span className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-[#df3fae]" /><div className="text-sm font-semibold text-white">{label(String(item.new_stage))}</div><div className="text-xs text-white/45">{dateTime(item.changed_at)}{item.reason ? ` · ${String(item.reason)}` : ""}</div></li>)}</ol> : <p className="mt-2 text-sm text-white/50">No stage changes recorded yet.</p>}</section>
      <Timeline items={person.interactions ?? []} empty="No conversations recorded." />
    </aside>
  </div>;
}

function CommunityForm({ mode, person, draft, setDraft, close, saved }: { mode: "interaction"|"followup"|"qualification"|"draft"; person: CommunityPerson; draft: string; setDraft: (value: string) => void; close: () => void; saved: (message: string) => Promise<void> }) {
  const [value, setValue] = useState<Record<string,string>>({ occurred_at:new Date().toISOString().slice(0,16), due_at:new Date(Date.now()+86400000).toISOString().slice(0,16), interaction_type:"email", channel:"email", follow_up_type:"welcome", priority:"medium", founder_assessment:"not_assessed" });
  const field = (key: string, name: string, type = "text") => <label className="text-sm font-semibold text-white">{name}<input type={type} value={value[key] ?? ""} onChange={event => setValue(current => ({...current,[key]:event.target.value}))} className="mt-2 w-full rounded-xl border border-white/15 bg-black/20 p-3 text-white" /></label>;
  if (mode === "draft") return <section className="mt-5 rounded-2xl border border-[#35d3c8]/20 p-4"><div className="flex items-center justify-between"><h3 className="font-bold text-white">Editable draft</h3><button onClick={close} aria-label="Close draft"><X className="h-4 w-4 text-white/60" /></button></div><textarea value={draft} onChange={event => setDraft(event.target.value)} className="mt-3 min-h-40 w-full rounded-xl border border-white/15 bg-black/20 p-3 text-white" /><button onClick={async () => { await navigator.clipboard.writeText(draft); await saved("Draft copied. Nothing was sent."); }} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#df3fae] px-4 py-2 text-sm font-semibold text-white"><Copy className="h-4 w-4" />Copy draft</button></section>;
  return <form onSubmit={async event => { event.preventDefault(); if (mode === "interaction") await growthService.createCommunityInteraction(person.waitlist_id,{...value,occurred_at:new Date(value.occurred_at).toISOString()}); else if (mode === "followup") await growthService.createCommunityFollowUp(person.waitlist_id,{...value,due_at:new Date(value.due_at).toISOString()}); else await growthService.saveCommunityQualification(person.waitlist_id,value); await saved(mode === "interaction" ? "Conversation recorded." : mode === "followup" ? "Follow-up added." : "Founder assessment saved."); }} className="mt-5 grid gap-3 rounded-2xl border border-[#35d3c8]/20 p-4"><div className="flex justify-between"><h3 className="font-bold text-white">{mode === "interaction" ? "Record conversation" : mode === "followup" ? "Add follow-up" : "MVP qualification"}</h3><button type="button" onClick={close} aria-label="Close form"><X className="h-4 w-4 text-white/60" /></button></div>{mode === "interaction" && <>{field("summary","Summary")}{field("exact_customer_language","Exact customer language")}{field("occurred_at","Occurred at","datetime-local")}</>}{mode === "followup" && <>{field("title","Follow-up title")}{field("reason","Why this matters")}{field("due_at","Due at","datetime-local")}</>}{mode === "qualification" && <>{field("primary_problem","Primary problem")}{field("assessment_notes","Founder assessment notes")}</>}<button className="justify-self-start rounded-xl bg-[#df3fae] px-4 py-2 text-sm font-semibold text-white">Save</button></form>;
}
