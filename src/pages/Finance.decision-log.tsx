import { PageHeader, Surface, SectionTitle } from "@/components/finance/PageHeader";
import { useFinance } from "@/contexts/FinanceContext";
import { currency } from "@/lib/finance-data";
import { CheckCircle2, Clock, FileText } from "lucide-react";
import type { ComponentType } from "react";
import { EntityEvidenceLinks } from "@/components/finance/EntityEvidenceLinks";

export default function DecisionLogPage() {
  const { decisions } = useFinance();

  return (
    <div>
      <PageHeader
        eyebrow="Governance"
        title="Decision Log"
        description="Financial decisions linked to evidence, owners, outcomes and impact."
      />

      <div className="space-y-4">
        {decisions.map((decision) => (
          <Surface key={decision.id}>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold">{decision.title}</h3>
                  <span className="rounded-md bg-brand-orange/15 px-2 py-1 text-xs font-medium text-brand-orange">
                    {decision.status}
                  </span>
                </div>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {decision.description}
                </p>
              </div>
              <div className="text-right text-sm">
                <div className="font-semibold text-brand-sage">{currency(decision.financialImpact)}</div>
                <div className="text-xs text-muted-foreground">financial impact</div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Detail icon={Clock} label="Owner / Date" value={`${decision.owner} · ${decision.date}`} />
              <div className="rounded-lg border border-border bg-white/50 p-3">
                <SectionTitle title="Linked Evidence" />
                <div className="flex items-start gap-2"><FileText className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" /><EntityEvidenceLinks entityType="decision" entityId={decision.id} /></div>
              </div>
              <Detail icon={CheckCircle2} label="Outcome" value={decision.outcome} />
            </div>
          </Surface>
        ))}
      </div>
    </div>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-white/50 p-3">
      <SectionTitle title={label} />
      <div className="flex items-start gap-2 text-sm text-muted-foreground">
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
        <span>{value}</span>
      </div>
    </div>
  );
}
