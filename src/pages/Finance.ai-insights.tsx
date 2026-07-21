import { motion } from "framer-motion";
import { PageHeader, Surface, SectionTitle } from "@/components/finance/PageHeader";
import { useFinance } from "@/contexts/FinanceContext";
import { useFinanceModel } from "@/hooks/useFinanceModel";
import { AlertTriangle, Lightbulb, Sparkles, TrendingUp, ArrowRight } from "lucide-react";

export default function AIInsightsPage() {
  const { assumptions } = useFinance();
  const { aiInsights } = useFinanceModel();
  const weak = [...assumptions].sort((a, b) => a.confidence - b.confidence).slice(0, 5);

  const meta = (sev: string) =>
    sev === "opportunity"
      ? { color: "text-brand-sage", bg: "border-brand-sage/20 bg-brand-sage/10", icon: Lightbulb, label: "Opportunity" }
      : sev === "risk"
        ? { color: "text-brand-coral", bg: "border-brand-coral/20 bg-brand-coral/10", icon: AlertTriangle, label: "Risk" }
        : { color: "text-brand-orange", bg: "border-brand-orange/20 bg-brand-orange/10", icon: TrendingUp, label: "Notable change" };

  return (
    <div>
      <PageHeader
        eyebrow="Autonomous analyst"
        title="AI Insights"
        description="Auto-generated recommendations, weaknesses and forecast risks — refreshed as the model changes."
        actions={
          <span className="inline-flex items-center gap-2 rounded-lg border border-brand-purple/30 bg-brand-purple/10 px-3 py-1.5 text-xs text-brand-purple">
            <Sparkles className="h-3.5 w-3.5" /> Evidence-gated V1
          </span>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {aiInsights.map((ai, i) => {
          const m = meta(ai.severity);
          const Icon = m.icon;
          return (
            <motion.div
              key={ai.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className={`rounded-2xl border p-5 ${m.bg}`}
            >
              <div className="flex items-center justify-between">
                <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest ${m.color}`}>
                  <Icon className="h-4 w-4" /> {m.label}
                </div>
                <span className="text-[10px] text-muted-foreground">just now</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold">{ai.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ai.body}</p>
              <button className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-foreground hover:underline">
                Apply suggestion <ArrowRight className="h-3 w-3" />
              </button>
            </motion.div>
          );
        })}
      </div>

      <Surface className="mt-6">
        <SectionTitle title="Assumption Weaknesses" hint="lowest confidence" />
        <ul className="space-y-3">
          {weak.map((a) => (
            <li key={a.id} className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{a.name}</div>
                <div className="text-xs text-muted-foreground">{a.category} · source: {a.source}</div>
              </div>
              <div className="w-32">
                <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full bg-brand-coral" style={{ width: `${a.confidence}%` }} />
                </div>
              </div>
              <div className="w-10 text-right text-sm font-semibold">{a.confidence}</div>
            </li>
          ))}
        </ul>
      </Surface>

      <Surface className="mt-6">
        <SectionTitle title="Suggested Actions" />
        <ol className="space-y-3 text-sm">
          <li className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
            <span className="mr-2 rounded-md bg-brand-orange/15 px-2 py-0.5 text-xs font-medium text-brand-orange">1</span>
            Add verified current cash evidence and mark the assumption Actual or Verified.
          </li>
          <li className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
            <span className="mr-2 rounded-md bg-brand-orange/15 px-2 py-0.5 text-xs font-medium text-brand-orange">2</span>
            Link evidence for pricing, demand, conversion and every intended revenue stream.
          </li>
          <li className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
            <span className="mr-2 rounded-md bg-brand-orange/15 px-2 py-0.5 text-xs font-medium text-brand-orange">3</span>
            Add verified unit costs and operating expenses before activating a forecast.
          </li>
        </ol>
      </Surface>
    </div>
  );
}
