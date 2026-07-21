import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, Surface, SectionTitle } from "@/components/finance/PageHeader";
import { chartTheme } from "@/components/finance/ChartCard";
import { currency, currencyShort, monthLabels } from "@/lib/finance-data";
import { useFinanceModel } from "@/hooks/useFinanceModel";
import { Download, FileText } from "lucide-react";

export default function ReportsPage() {
  const model = useFinanceModel();
  const k = model.kpis;
  const series = model.series;
  const revMini = monthLabels().slice(0, 12).map((m, i) => ({ month: m, v: model.monthlyRevenue(i).total }));
  const reports = model.reports;

  return (
    <div>
      <PageHeader
        eyebrow="Outputs"
        title="Reports"
        description="Export-ready investor packs, one-pagers and board reports."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-brand-orange/90">
            <Download className="h-4 w-4" /> Generate pack
          </button>
        }
      />

      <Surface>
        <SectionTitle title="Executive Summary" hint="Current status" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Early-stage model — evidence collection in progress. Cash is <span className="font-semibold text-foreground">{k.cashKnown ? currencyShort(k.cash) : "not yet evidenced"}</span>. Runway, revenue and margins are <span className="font-semibold text-foreground">{k.forecastReady ? "calculated from verified inputs" : "not calculated until minimum inputs are verified"}</span>. Model confidence is <span className="font-semibold text-foreground">{k.confidence > 0 ? `${k.confidence.toFixed(0)}/100` : "not yet evidenced"}</span>.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <SectionTitle title="Cash trajectory" />
            <div style={{ height: 180 }}>
              <ResponsiveContainer>
                <LineChart data={series}>
                  <CartesianGrid stroke={chartTheme.grid} vertical={false} />
                  <XAxis dataKey="month" stroke={chartTheme.axis} fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke={chartTheme.axis} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => currencyShort(v)} />
                  <Tooltip {...chartTheme.tooltip} formatter={(v: number) => currency(v)} />
                  <Line type="monotone" dataKey="cash" stroke="#ef9f32" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <SectionTitle title="Revenue trajectory" />
            <div style={{ height: 180 }}>
              <ResponsiveContainer>
                <BarChart data={revMini}>
                  <CartesianGrid stroke={chartTheme.grid} vertical={false} />
                  <XAxis dataKey="month" stroke={chartTheme.axis} fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke={chartTheme.axis} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => currencyShort(v)} />
                  <Tooltip {...chartTheme.tooltip} formatter={(v: number) => currency(v)} />
                  <Bar dataKey="v" fill="#945c8c" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Surface>

      <Surface className="mt-6" padded={false}>
        <div className="border-b border-white/5 px-5 py-3">
          <SectionTitle title="Report Library" />
        </div>
        <ul>
          {reports.map((r) => (
            <li key={r.id} className="flex items-center justify-between border-t border-white/5 px-5 py-3 first:border-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-navy/50 text-brand-sage">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.period}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-md px-2 py-1 text-xs font-medium ${r.status === "Ready" ? "bg-brand-sage/15 text-brand-sage" : "bg-brand-orange/15 text-brand-orange"}`}>
                  {r.status}
                </span>
                <button className="rounded-md border border-white/5 p-1.5 text-muted-foreground hover:text-foreground">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Surface>
    </div>
  );
}
