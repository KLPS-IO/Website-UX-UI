import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Banknote,
  Flame,
  Timer,
  TrendingUp,
  Percent,
  Target,
  ShieldCheck,
  Sparkles,
  Download,
  FileSpreadsheet,
  Printer,
} from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader, Surface, SectionTitle } from "@/components/finance/PageHeader";
import { KpiCard } from "@/components/finance/KpiCard";
import { ChartCard, chartTheme } from "@/components/finance/ChartCard";
import {
  monthLabels,
  MONTHS,
  currency,
  currencyShort,
  pct,
} from "@/lib/finance-data";
import { useFinanceModel } from "@/hooks/useFinanceModel";
import { useFinance } from "@/contexts/FinanceContext";
import {
  exportFinanceExcel,
  exportFinancePdf,
  printFinanceReport,
  type FinanceExportData,
} from "@/lib/finance-exports";
import { useState } from "react";

export default function DashboardPage() {
  const [excelStatus, setExcelStatus] = useState<"idle" | "preparing">("idle");
  const [exportError, setExportError] = useState("");
  const finance = useFinance();
  const model = useFinanceModel();
  const k = model.kpis;
  const series = model.series;
  const revenueMix = model.revenueMix;
  const expenseBreakdown = model.expenseBreakdown;
  const aiInsights = model.aiInsights;
  const activity = model.recentActivity;
  const exportData = (): FinanceExportData => ({
    generatedAt: new Date(),
    kpis: model.kpis,
    series: model.series,
    revenueMix: model.revenueMix,
    expenseBreakdown: model.expenseBreakdown,
    assumptions: finance.assumptions,
    funding: finance.funding,
    hires: finance.hires,
    risks: finance.risks,
  });

  const exportButton =
    "inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-foreground transition hover:border-brand-orange/40 hover:bg-brand-orange/10";

  const downloadExcel = async () => {
    setExcelStatus("preparing");
    setExportError("");
    try {
      await exportFinanceExcel(exportData());
    } catch (error) {
      console.error("Excel export failed", error);
      setExportError("Excel download failed. Please try again.");
    } finally {
      setExcelStatus("idle");
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Finance OS"
        title="Dashboard"
        description="A live view of the KLPS financial model — every metric flows from the Assumptions ledger."
        actions={
          <>
            <button type="button" onClick={() => exportFinancePdf(exportData())} className={exportButton} title="Download a professionally formatted PDF report">
              <Download className="h-4 w-4 text-brand-orange" /> PDF
            </button>
            <button type="button" onClick={() => void downloadExcel()} disabled={excelStatus === "preparing"} className={`${exportButton} disabled:cursor-wait disabled:opacity-60`} title="Download the full model as an Excel workbook">
              <FileSpreadsheet className="h-4 w-4 text-brand-sage" /> {excelStatus === "preparing" ? "Preparing…" : "Excel"}
            </button>
            <button type="button" onClick={() => printFinanceReport(exportData())} className={exportButton} title="Open a print-ready financial report">
              <Printer className="h-4 w-4 text-brand-purple" /> Print
            </button>
            <span className="inline-flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-sage" />
              Model synced · {new Date().toLocaleString("en-GB")}
            </span>
          </>
        }
      />

      {exportError && (
        <div role="alert" className="mb-4 rounded-lg border border-brand-coral/30 bg-brand-coral/10 px-4 py-3 text-sm text-brand-coral">
          {exportError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Cash on Hand" value={k.cashKnown ? currencyShort(k.cash) : "Not available"} hint={k.cashKnown ? "Verified input" : "Not yet evidenced"} icon={Banknote} accent="orange" index={0} />
        <KpiCard label="Monthly Burn" value={k.forecastReady ? currencyShort(k.burn) : "Not calculated"} hint="Evidence required" icon={Flame} accent="coral" index={1} />
        <KpiCard label="Runway" value={k.forecastReady ? `${k.runway.toFixed(1)} mo` : "Not calculated"} hint="Evidence required" icon={Timer} accent="sage" index={2} />
        <KpiCard label="Forecast Revenue (yr)" value={k.forecastReady ? currencyShort(k.annualRev) : "Not calculated"} hint="Evidence required" icon={TrendingUp} accent="purple" index={3} />
        <KpiCard label="Gross Margin" value={k.forecastReady ? pct(k.grossMargin) : "Not calculated"} hint="Evidence required" icon={Percent} accent="teal" index={4} />
        <KpiCard label="Forecast Accuracy" value={k.forecastAccuracyKnown ? pct(k.forecastAccuracy) : "Not available"} hint="No backtest evidence" icon={Target} accent="navy" index={5} />
        <KpiCard label="Confidence Score" value={k.confidence > 0 ? `${k.confidence.toFixed(0)} / 100` : "Not yet evidenced"} hint="Assumption evidence" icon={ShieldCheck} accent="orange" index={6} />
        <KpiCard label="MRR" value={k.forecastReady ? currencyShort(k.mrr) : "Not calculated"} hint="Evidence required" icon={TrendingUp} accent="coral" index={7} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard title="Cash Position" hint="18-month projection" className="xl:col-span-2" height={320}>
          <ResponsiveContainer>
            <AreaChart data={series} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="cashG" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ef9f32" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#ef9f32" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={chartTheme.grid} vertical={false} />
              <XAxis dataKey="month" stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => currencyShort(v)} />
              <Tooltip {...chartTheme.tooltip} formatter={(v: number) => currency(v)} />
              <Area type="monotone" dataKey="cash" stroke="#ef9f32" strokeWidth={2.5} fill="url(#cashG)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <Surface>
          <SectionTitle title="Revenue Mix" hint="next 12 months" />
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={revenueMix} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {revenueMix.map((_, i) => (
                    <Cell key={i} fill={chartTheme.colors[i]} />
                  ))}
                </Pie>
                <Tooltip {...chartTheme.tooltip} formatter={(v: number) => currency(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-2">
            {revenueMix.map((r, i) => {
              const total = revenueMix.reduce((s, x) => s + x.value, 0);
              return (
                <div key={r.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className="h-2 w-2 rounded-full" style={{ background: chartTheme.colors[i] }} />
                    {r.name}
                  </span>
                  <span className="font-medium">{total > 0 ? pct(r.value / total, 0) : "Not calculated"}</span>
                </div>
              );
            })}
          </div>
        </Surface>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard title="Revenue Forecast" hint="Hardware · Subs · Enterprise" className="xl:col-span-2">
          <ResponsiveContainer>
            <LineChart data={monthLabels().map((m, i) => {
              const r = model.monthlyRevenue(i);
              return { month: m, Hardware: r.hardware, Subscriptions: r.subs, Enterprise: r.enterprise };
            })}>
              <CartesianGrid stroke={chartTheme.grid} vertical={false} />
              <XAxis dataKey="month" stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => currencyShort(v)} />
              <Tooltip {...chartTheme.tooltip} formatter={(v: number) => currency(v)} />
              <Line type="monotone" dataKey="Hardware" stroke="#ef9f32" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Subscriptions" stroke="#945c8c" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Enterprise" stroke="#b6d0ac" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <Surface>
          <SectionTitle title="AI Insight" hint="auto-generated" />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-brand-purple/20 bg-gradient-to-br from-brand-purple/15 to-brand-coral/10 p-4"
          >
            <div className="mb-2 flex items-center gap-2 text-brand-orange">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-widest">Opportunity</span>
            </div>
            <h3 className="text-base font-semibold">{aiInsights[0].title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{aiInsights[0].body}</p>
            <button className="mt-4 rounded-lg bg-brand-orange px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-brand-orange/90">
              Apply recommendation
            </button>
          </motion.div>

          <div className="mt-4 space-y-2">
            {aiInsights.slice(1, 3).map((ai) => (
              <div key={ai.id} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <div className="text-xs font-semibold">{ai.title}</div>
                <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{ai.body}</div>
              </div>
            ))}
          </div>
        </Surface>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard title="Expense Breakdown" hint="next 12 months by category" className="xl:col-span-2">
          <ResponsiveContainer>
            <BarChart data={expenseBreakdown} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={chartTheme.grid} vertical={false} />
              <XAxis dataKey="category" stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => currencyShort(v)} />
              <Tooltip {...chartTheme.tooltip} formatter={(v: number) => currency(v)} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {expenseBreakdown.map((_, i) => (
                  <Cell key={i} fill={chartTheme.colors[i % chartTheme.colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <Surface>
          <SectionTitle title="Recent Activity" hint={`${MONTHS}-mo horizon`} />
          <div className="mb-4 rounded-lg border border-brand-coral/20 bg-brand-coral/10 p-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-brand-coral">Highest Risk</div>
            <div className="mt-1 text-sm font-medium">{model.topRisks[0]?.risk ?? "No verified risks recorded"}</div>
            <div className="mt-1 text-xs text-muted-foreground">{model.topRisks[0]?.mitigation ?? "Add evidence-backed risks to the register."}</div>
          </div>
          <ul className="space-y-3">
            {activity.map((a) => (
              <li key={a.id} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-foreground">{a.what}</div>
                  <div className="text-xs text-muted-foreground">
                    {a.who} · {a.at} ago
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Surface>
      </div>
    </div>
  );
}
