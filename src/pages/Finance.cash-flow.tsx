import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, Surface } from "@/components/finance/PageHeader";
import { ChartCard, chartTheme } from "@/components/finance/ChartCard";
import { KpiCard } from "@/components/finance/KpiCard";
import { cashFlowSeries, currency, currencyShort } from "@/lib/finance-data";
import { Banknote, TrendingDown, TrendingUp } from "lucide-react";

export default function CashFlowPage() {
  const series = cashFlowSeries("base");
  const minCash = Math.min(...series.map((s) => s.cash));
  const maxCash = Math.max(...series.map((s) => s.cash));
  const netAvg = series.reduce((s, r) => s + r.net, 0) / series.length;

  return (
    <div>
      <PageHeader eyebrow="Liquidity" title="Cash Flow" description="Auto-derived monthly cash flow from revenue, expenses and funding events." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Peak Cash" value={currencyShort(maxCash)} icon={TrendingUp} accent="sage" />
        <KpiCard label="Trough Cash" value={currencyShort(minCash)} icon={TrendingDown} accent="coral" />
        <KpiCard label="Avg Monthly Net" value={currencyShort(netAvg)} accent="orange" icon={Banknote} />
        <KpiCard label="Ending Cash" value={currencyShort(series[series.length - 1].cash)} accent="purple" />
      </div>

      <div className="mt-6">
        <ChartCard title="Cumulative Cash Balance" hint="18 months" height={340}>
          <ResponsiveContainer>
            <AreaChart data={series}>
              <defs>
                <linearGradient id="cf" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#b6d0ac" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#b6d0ac" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={chartTheme.grid} vertical={false} />
              <XAxis dataKey="month" stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => currencyShort(v)} />
              <Tooltip {...chartTheme.tooltip} formatter={(v: number) => currency(v)} />
              <Area type="monotone" dataKey="cash" stroke="#b6d0ac" strokeWidth={2.5} fill="url(#cf)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Monthly Net Cash" hint="revenue − expenses + funding">
          <ResponsiveContainer>
            <ComposedChart data={series}>
              <CartesianGrid stroke={chartTheme.grid} vertical={false} />
              <XAxis dataKey="month" stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => currencyShort(v)} />
              <Tooltip {...chartTheme.tooltip} formatter={(v: number) => currency(v)} />
              <Bar dataKey="net" radius={[6, 6, 0, 0]}>
                {series.map((r, i) => <Cell key={i} fill={r.net >= 0 ? "#b6d0ac" : "#ec7769"} />)}
              </Bar>
              <Line type="monotone" dataKey="funding" stroke="#ef9f32" strokeWidth={2} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <Surface padded={false}>
          <div className="border-b border-white/5 px-5 py-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Statement</h3>
          </div>
          <div className="max-h-[320px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card">
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-2 font-medium">Month</th>
                  <th className="px-5 py-2 font-medium">Revenue</th>
                  <th className="px-5 py-2 font-medium">Expenses</th>
                  <th className="px-5 py-2 font-medium">Net</th>
                  <th className="px-5 py-2 font-medium">Cash</th>
                </tr>
              </thead>
              <tbody>
                {series.map((r) => (
                  <tr key={r.month} className="border-t border-white/5">
                    <td className="px-5 py-2">{r.month}</td>
                    <td className="px-5 py-2 text-brand-sage">{currency(r.revenue)}</td>
                    <td className="px-5 py-2 text-brand-coral">{currency(r.expenses)}</td>
                    <td className={`px-5 py-2 font-medium ${r.net >= 0 ? "text-brand-sage" : "text-brand-coral"}`}>{currency(r.net)}</td>
                    <td className="px-5 py-2 font-medium">{currency(r.cash)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Surface>
      </div>
    </div>
  );
}
