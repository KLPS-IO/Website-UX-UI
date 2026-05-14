import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, StatCard } from "@/components/Section";

export const Route = createFileRoute("/funding")({
  head: () => ({
    meta: [
      { title: "Funding & Growth — KPLS" },
      { name: "description", content: "Investment ask, use of funds, TAM/SAM/SOM, revenue projections and strategic milestones for KPLS." },
    ],
  }),
  component: Funding,
});

const USE_OF_FUNDS = [
  { label: "R&D / IP", pct: 42, color: "var(--accent)" },
  { label: "Manufacturing", pct: 24, color: "color-mix(in oklab, var(--accent) 70%, white 30%)" },
  { label: "Clinical & Regulatory", pct: 18, color: "color-mix(in oklab, var(--accent) 50%, white 50%)" },
  { label: "Team", pct: 12, color: "color-mix(in oklab, var(--accent) 30%, white 70%)" },
  { label: "Reserve", pct: 4, color: "color-mix(in oklab, var(--accent) 15%, white 85%)" },
];

function Funding() {
  return (
    <>
      <PageHeader
        eyebrow="Funding & Growth"
        title="Capital deployed with engineering precision."
        description="The Series A ask, where it goes, and the milestones it unlocks."
      />

      <Section>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <StatCard value="£6.0M" label="Series A Ask" hint="35% committed" />
          <StatCard value="£18M" label="Pre-money" hint="Soft term sheet" />
          <StatCard value="24 mo" label="Runway" hint="Post-close" />
          <StatCard value="3.2×" label="Projected ARR (Y2)" hint="Pilot revenue base" />
        </div>
      </Section>

      <Section eyebrow="Use of funds" title="Where the £6M goes.">
        <div className="glass rounded-2xl p-8">
          <div className="flex h-3 overflow-hidden rounded-full">
            {USE_OF_FUNDS.map((u) => (
              <div
                key={u.label}
                style={{ width: `${u.pct}%`, background: u.color }}
                className="h-full"
              />
            ))}
          </div>
          <ul className="mt-6 grid gap-4 md:grid-cols-5">
            {USE_OF_FUNDS.map((u) => (
              <li key={u.label} className="flex items-start gap-3">
                <span className="mt-1 size-2 rounded-full" style={{ background: u.color }} />
                <div>
                  <div className="text-sm text-foreground">{u.label}</div>
                  <div className="font-mono text-[11px] text-muted-foreground">{u.pct}%</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section eyebrow="Market" title="TAM · SAM · SOM.">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { label: "TAM", value: "£82B", body: "Global smart textiles & wearables by 2030." },
            { label: "SAM", value: "£14B", body: "Femtech-adjacent intelligent apparel in EU + UK + US." },
            { label: "SOM", value: "£420M", body: "5-year capture in target premium and clinical segments." },
          ].map((m) => (
            <div key={m.label} className="glass rounded-2xl p-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                {m.label}
              </div>
              <div className="mt-3 text-4xl font-light italic">{m.value}</div>
              <p className="mt-4 text-sm text-muted-foreground">{m.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Roadmap" title="Milestones unlocked by this round.">
        <div className="glass rounded-2xl p-8">
          <ol className="space-y-6">
            {[
              { q: "Q4 2026", t: "Close Series A", b: "£6M deployed, manufacturing partner signed." },
              { q: "Q2 2027", t: "Clinical pilot scale", b: "5,000-unit deployment across EU partners." },
              { q: "Q4 2027", t: "DTC launch (UK)", b: "First commercial K-Series garment." },
              { q: "Q3 2028", t: "Tier-1 brand partnership", b: "Embedded textile platform licensed in athletic wear." },
            ].map((m) => (
              <li key={m.q} className="flex gap-6">
                <div className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
                  {m.q}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{m.t}</div>
                  <p className="text-xs text-muted-foreground">{m.b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section eyebrow="Investor FAQ" title="Most asked, succinctly answered.">
        <div className="glass divide-y divide-border rounded-2xl">
          {[
            { q: "What's defensible?", a: "14+ patents across material, weave architecture and sensor integration. Three-year R&D head start." },
            { q: "Why now?", a: "Femtech demand, regulatory tailwinds, and material science breakthroughs converging." },
            { q: "Manufacturing risk?", a: "Tier-1 EU knit partner secured. Wash-stability validated under ISO protocols." },
            { q: "Path to revenue?", a: "Three-track: DTC, B2B licensing, and clinical partnerships." },
          ].map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-foreground">
                {f.q}
                <span className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
