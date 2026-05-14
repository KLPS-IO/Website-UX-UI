import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, StatCard } from "@/components/Section";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Control Centre — KPLS" },
      { name: "description", content: "Analytics dashboard, visitor tracking, document engagement and access control for the KPLS data room." },
    ],
  }),
  component: Admin,
});

const VISITORS = [
  { fund: "Sequoia", views: 24, time: "1h 12m", interest: 92 },
  { fund: "Atomico", views: 18, time: "47m", interest: 84 },
  { fund: "LocalGlobe", views: 14, time: "32m", interest: 71 },
  { fund: "EQT Ventures", views: 11, time: "28m", interest: 65 },
  { fund: "Index Ventures", views: 7, time: "14m", interest: 48 },
];

function Admin() {
  return (
    <>
      <PageHeader
        eyebrow="Admin Control Centre"
        title="Visibility into every investor signal."
        description="Document engagement, visitor heatmaps, access control and AI-derived insights."
      />

      <Section>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <StatCard value="47" label="Active investors" hint="Last 30 days" />
          <StatCard value="312" label="Doc opens" hint="+18% w/w" />
          <StatCard value="68%" label="Deck completion" hint="Median session" />
          <StatCard value="9" label="Soft commits" hint="In diligence" />
        </div>
      </Section>

      <Section eyebrow="Engagement" title="Investor activity ranking.">
        <div className="glass overflow-hidden rounded-2xl">
          <div className="grid grid-cols-12 border-b border-border px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <div className="col-span-4">Fund</div>
            <div className="col-span-2">Views</div>
            <div className="col-span-2">Time</div>
            <div className="col-span-4">Interest signal</div>
          </div>
          <ul className="divide-y divide-border">
            {VISITORS.map((v) => (
              <li key={v.fund} className="grid grid-cols-12 items-center px-6 py-4 text-sm">
                <div className="col-span-4 text-foreground">{v.fund}</div>
                <div className="col-span-2 font-mono text-xs text-muted-foreground">{v.views}</div>
                <div className="col-span-2 font-mono text-xs text-muted-foreground">{v.time}</div>
                <div className="col-span-4 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-accent shadow-[0_0_8px_var(--accent)]"
                      style={{ width: `${v.interest}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-mono text-[11px] text-foreground">{v.interest}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section eyebrow="AI insights" title="Patterns the room is showing.">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Deck momentum building",
              body: "Series_A_Deck is being shared internally by 3 funds — typical pre–term-sheet pattern.",
            },
            {
              title: "IP audit is the closer",
              body: "Sessions that reach IP_Portfolio_Audit convert to follow-up calls 4× more often.",
            },
            {
              title: "Femtech segment leading",
              body: "Femtech-focused funds spend 2.1× longer in Market_Research than generalists.",
            },
          ].map((i) => (
            <div key={i.title} className="glass rounded-2xl p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                AI · Signal
              </div>
              <div className="mt-3 text-sm font-medium text-foreground">{i.title}</div>
              <p className="mt-2 text-xs text-muted-foreground">{i.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
