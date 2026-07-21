import { useState } from "react";
import { PageHeader, Surface, SectionTitle } from "@/components/finance/PageHeader";
import { KpiCard } from "@/components/finance/KpiCard";
import { currentKpis, currency, currencyShort, pct, type Scenario } from "@/lib/finance-data";

const list: { key: Scenario; label: string; color: string }[] = [
  { key: "conservative", label: "Conservative", color: "var(--brand-coral)" },
  { key: "base", label: "Base Case", color: "var(--brand-orange)" },
  { key: "best", label: "Best Case", color: "var(--brand-sage)" },
];

export default function ScenariosPage() {
  const [active, setActive] = useState<Scenario>("base");
  const k = currentKpis(active);

  return (
    <div>
      <PageHeader
        eyebrow="What-if"
        title="Scenarios"
        description="Compare KPIs across scenarios. Every model output re-computes instantly."
        actions={
          <div className="flex rounded-lg border border-white/5 bg-white/[0.03] p-1">
            {list.map((s) => (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  active === s.key ? "bg-white/[0.06] text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                style={active === s.key ? { color: s.color as string } : undefined}
              >
                {s.label}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Runway" value={k.forecastReady ? `${k.runway.toFixed(1)} mo` : "Not calculated"} accent="orange" />
        <KpiCard label="Y1 Revenue" value={k.forecastReady ? currencyShort(k.annualRev) : "Not calculated"} accent="sage" />
        <KpiCard label="Gross Margin" value={k.forecastReady ? pct(k.grossMargin) : "Not calculated"} accent="purple" />
        <KpiCard label="Growth (yr)" value={k.forecastReady ? pct(k.growth) : "Not calculated"} accent="coral" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {list.map((s) => {
          const kx = currentKpis(s.key);
          return (
            <Surface key={s.key}>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                <h3 className="text-sm font-semibold">{s.label}</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <Row k="Runway" v={kx.forecastReady ? `${kx.runway.toFixed(1)} mo` : "Not calculated"} />
                <Row k="Y1 Revenue" v={kx.forecastReady ? currency(kx.annualRev) : "Not calculated"} />
                <Row k="Monthly Burn" v={kx.forecastReady ? currency(kx.burn) : "Not calculated"} />
                <Row k="Gross Margin" v={kx.forecastReady ? pct(kx.grossMargin) : "Not calculated"} />
                <Row k="Net Margin" v={kx.forecastReady ? pct(kx.netMargin) : "Not calculated"} />
                <Row k="ARR" v={kx.forecastReady ? currency(kx.arr) : "Not calculated"} />
                <Row k="Growth (yr)" v={kx.forecastReady ? pct(kx.growth) : "Not calculated"} />
              </ul>
            </Surface>
          );
        })}
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </li>
  );
}
