import { PageHeader, Surface } from "@/components/finance/PageHeader";
import { useFinanceModel } from "@/hooks/useFinanceModel";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { EntityEvidenceLinks } from "@/components/finance/EntityEvidenceLinks";
import { GlossaryText } from "@/components/finance/GlossaryTooltip";

export default function RiskRegisterPage() {
  const { topRisks } = useFinanceModel();

  return (
    <div>
      <PageHeader
        eyebrow="Controls"
        title="Risk Register"
        description="Highest financial risks ranked by probability, impact and mitigation status."
      />

      <div className="grid gap-4">
        {topRisks.map((risk) => {
          const score = risk.probability * risk.impact;
          return (
            <Surface key={risk.id}>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-brand-coral" />
                    <h3 className="text-base font-semibold">{risk.risk}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{risk.mitigation}</p>
                </div>
                <span className="rounded-md bg-brand-coral/15 px-2 py-1 text-xs font-medium text-brand-coral">
                  Score {(score * 100).toFixed(0)}
                </span>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-5">
                <Metric label="Category" value={risk.category} />
                <Metric label="Probability" value={`${(risk.probability * 100).toFixed(0)}%`} />
                <Metric label="Impact" value={`${(risk.impact * 100).toFixed(0)}%`} />
                <Metric label="Owner" value={risk.owner} />
                <Metric label="Review" value={risk.reviewDate} />
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-brand-sage/20 bg-brand-sage/10 px-3 py-2 text-xs text-brand-sage">
                <ShieldCheck className="h-3.5 w-3.5" />
                {risk.status}
              </div>
              <div className="mt-4"><EntityEvidenceLinks entityType="risk" entityId={risk.id} /></div>
            </Surface>
          );
        })}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-white/50 p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"><GlossaryText>{label}</GlossaryText></div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}
