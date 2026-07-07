import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, Surface, SectionTitle } from "@/components/finance/PageHeader";
import { ChartCard, chartTheme } from "@/components/finance/ChartCard";
import { KpiCard } from "@/components/finance/KpiCard";
import { A, currency, currencyShort, monthLabels, monthlyRevenue, MONTHS } from "@/lib/finance-data";
import { TrendingUp, Users, Repeat, Building2 } from "lucide-react";

export default function RevenuePage() {
  const data = monthLabels().map((m, i) => {
    const r = monthlyRevenue(i);
    return { month: m, Hardware: r.hardware, Subscriptions: r.subs, Enterprise: r.enterprise, Total: r.total };
  });
  const annual = data.slice(0, 12).reduce((s, r) => s + r.Total, 0);
  const year2 = data.slice(12, MONTHS).reduce((s, r) => s + r.Total, 0);

  return (
    <div>
      <PageHeader eyebrow="Top-line" title="Revenue" description="Driven by waitlist, conversion, ASP, subscription uptake and enterprise contracts." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Year 1 Revenue" value={currencyShort(annual)} hint="12-mo projection" icon={TrendingUp} accent="orange" />
        <KpiCard label="Waitlist" value={A("waitlist").toLocaleString()} hint={`${(A("conv") * 100).toFixed(1)}% conversion`} icon={Users} accent="coral" />
        <KpiCard label="Subscription Uptake" value={`${(A("sub_uptake") * 100).toFixed(0)}%`} hint={`${currency(A("sub_price"))}/mo ARPU`} icon={Repeat} accent="purple" />
        <KpiCard label="Enterprise ARR" value={currencyShort(A("ent_rev") * A("ent_count"))} hint={`${A("ent_count")} contracts`} icon={Building2} accent="sage" />
      </div>

      <div className="mt-6">
        <ChartCard title="Monthly Revenue" hint="stacked by stream" height={340}>
          <ResponsiveContainer>
            <AreaChart data={data}>
              <defs>
                {chartTheme.colors.slice(0, 3).map((c, i) => (
                  <linearGradient key={i} id={`rg${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={c} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={c} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid stroke={chartTheme.grid} vertical={false} />
              <XAxis dataKey="month" stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => currencyShort(v)} />
              <Tooltip {...chartTheme.tooltip} formatter={(v: number) => currency(v)} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" stackId="1" dataKey="Hardware" stroke="#ef9f32" fill="url(#rg0)" />
              <Area type="monotone" stackId="1" dataKey="Subscriptions" stroke="#ec7769" fill="url(#rg1)" />
              <Area type="monotone" stackId="1" dataKey="Enterprise" stroke="#945c8c" fill="url(#rg2)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Surface>
          <SectionTitle title="Annual Projection" hint="year 1 vs year 2" />
          <div className="space-y-4">
            <YearBar label="Year 1" value={annual} max={annual + year2} />
            <YearBar label="Year 2 (partial)" value={year2} max={annual + year2} />
          </div>
        </Surface>
        <Surface>
          <SectionTitle title="Revenue Model" hint="from Assumptions" />
          <ul className="space-y-2 text-sm">
            <Row k="Waitlist" v={A("waitlist").toLocaleString()} />
            <Row k="Conversion" v={`${(A("conv") * 100).toFixed(1)}%`} />
            <Row k="ASP" v={currency(A("asp"))} />
            <Row k="Subscription price" v={`${currency(A("sub_price"))}/mo`} />
            <Row k="Subscription uptake" v={`${(A("sub_uptake") * 100).toFixed(0)}%`} />
            <Row k="Enterprise ARR / contract" v={currency(A("ent_rev"))} />
            <Row k="Enterprise contracts / yr" v={A("ent_count").toString()} />
            <Row k="Monthly growth" v={`${(A("growth_mom") * 100).toFixed(1)}%`} />
          </ul>
        </Surface>
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

function YearBar({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{currency(value)}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/5">
        <div className="h-full bg-gradient-to-r from-brand-orange to-brand-coral" style={{ width: `${(value / max) * 100}%` }} />
      </div>
    </div>
  );
}
