import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, Surface, SectionTitle } from "@/components/finance/PageHeader";
import { ChartCard, chartTheme } from "@/components/finance/ChartCard";
import { cashFlowSeries, currency, currencyShort, currentKpis, monthLabels, type Scenario } from "@/lib/finance-data";

const scenarios: { key: Scenario; label: string; color: string; desc: string }[] = [
  { key: "conservative", label: "Conservative", color: "#ec7769", desc: "No adjustment configured" },
  { key: "base", label: "Base Case", color: "#ef9f32", desc: "Current assumptions as-is" },
  { key: "best", label: "Best Case", color: "#b6d0ac", desc: "No adjustment configured" },
];

export default function ForecastsPage() {
  const series = scenarios.map((s) => ({ s, data: cashFlowSeries(s.key) }));
  const merged = monthLabels().map((m, i) => {
    const row: Record<string, number | string> = { month: m };
    series.forEach(({ s, data }) => (row[s.label] = data[i].cash));
    return row;
  });
  const revMerged = monthLabels().map((m, i) => {
    const row: Record<string, number | string> = { month: m };
    series.forEach(({ s, data }) => (row[s.label] = data[i].revenue));
    return row;
  });

  return (
    <div>
      <PageHeader eyebrow="Modelling" title="Forecasts" description="Side-by-side scenario comparisons across cash, revenue and runway." />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {series.map(({ s, data }) => {
          const ready = currentKpis(s.key).forecastReady;
          const rev = data.slice(0, 12).reduce((x, r) => x + r.revenue, 0);
          const end = data[data.length - 1].cash;
          return (
            <Surface key={s.key} className="border-l-4" >
              <div className="mb-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                <h3 className="text-sm font-semibold">{s.label}</h3>
              </div>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Year 1 Rev</div>
                  <div className="text-lg font-semibold">{ready ? currencyShort(rev) : "Not calculated"}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Ending Cash</div>
                  <div className="text-lg font-semibold" style={{ color: s.color }}>{ready ? currencyShort(end) : "Not calculated"}</div>
                </div>
              </div>
            </Surface>
          );
        })}
      </div>

      <div className="mt-6">
        <ChartCard title="Cash Balance — 3 Scenarios" height={340}>
          <ResponsiveContainer>
            <LineChart data={merged}>
              <CartesianGrid stroke={chartTheme.grid} vertical={false} />
              <XAxis dataKey="month" stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => currencyShort(v)} />
              <Tooltip {...chartTheme.tooltip} formatter={(v: number) => currency(v)} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {scenarios.map((s) => (
                <Line key={s.key} type="monotone" dataKey={s.label} stroke={s.color} strokeWidth={2.25} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-6">
        <ChartCard title="Monthly Revenue — 3 Scenarios" height={320}>
          <ResponsiveContainer>
            <LineChart data={revMerged}>
              <CartesianGrid stroke={chartTheme.grid} vertical={false} />
              <XAxis dataKey="month" stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => currencyShort(v)} />
              <Tooltip {...chartTheme.tooltip} formatter={(v: number) => currency(v)} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {scenarios.map((s) => (
                <Line key={s.key} type="monotone" dataKey={s.label} stroke={s.color} strokeWidth={2.25} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
