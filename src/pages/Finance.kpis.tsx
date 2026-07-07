import { PageHeader, Surface } from "@/components/finance/PageHeader";
import { KpiCard } from "@/components/finance/KpiCard";
import { currentKpis, currency, currencyShort, pct } from "@/lib/finance-data";
import { Banknote, Flame, Timer, Percent, TrendingUp, Users, Repeat, Target, Gauge, ShieldCheck } from "lucide-react";

export default function KPIsPage() {
  const k = currentKpis("base");
  return (
    <div>
      <PageHeader eyebrow="Metrics" title="KPIs" description="A single pane for every headline metric investors expect to see." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <KpiCard label="Burn Rate" value={currencyShort(k.burn)} icon={Flame} accent="coral" />
        <KpiCard label="Runway" value={`${k.runway.toFixed(1)} mo`} icon={Timer} accent="orange" />
        <KpiCard label="Gross Margin" value={pct(k.grossMargin)} icon={Percent} accent="sage" />
        <KpiCard label="Net Margin" value={pct(k.netMargin)} icon={Percent} accent="purple" />
        <KpiCard label="CAC" value={currency(k.cac)} icon={Users} accent="coral" />
        <KpiCard label="LTV" value={currency(k.ltv)} icon={Repeat} accent="sage" />
        <KpiCard label="LTV / CAC" value={`${(k.ltv / k.cac).toFixed(1)}×`} icon={Target} accent="orange" />
        <KpiCard label="ARR" value={currencyShort(k.arr)} icon={TrendingUp} accent="purple" />
        <KpiCard label="MRR" value={currencyShort(k.mrr)} icon={TrendingUp} accent="coral" />
        <KpiCard label="Revenue Growth (yr)" value={pct(k.growth)} icon={Gauge} accent="sage" />
        <KpiCard label="Forecast Accuracy" value={pct(k.forecastAccuracy)} icon={Target} accent="orange" />
        <KpiCard label="Confidence Index" value={`${k.confidence.toFixed(0)} / 100`} icon={ShieldCheck} accent="purple" />
      </div>

      <Surface className="mt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Definitions</h3>
        <div className="mt-3 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <Def k="Burn Rate" v="Trailing 3-month average of expenses less revenue." />
          <Def k="Runway" v="Cash on hand divided by burn rate." />
          <Def k="CAC" v="Blended marketing spend per acquired customer." />
          <Def k="LTV" v="Average customer lifetime revenue, gross margin adjusted." />
          <Def k="ARR / MRR" v="Annualised / monthly recurring revenue including enterprise contracts." />
          <Def k="Confidence Index" v="Weighted mean of assumption confidence across the model." />
        </div>
      </Surface>
    </div>
  );
}

function Def({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
      <div className="font-medium">{k}</div>
      <div className="mt-1 text-xs text-muted-foreground">{v}</div>
    </div>
  );
}
