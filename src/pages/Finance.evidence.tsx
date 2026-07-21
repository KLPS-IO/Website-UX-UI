import { PageHeader, Surface, SectionTitle } from "@/components/finance/PageHeader";
import { evidence, getAssumption } from "@/lib/finance-data";
import { useFinance } from "@/contexts/FinanceContext";
import { ShieldCheck, FileText, ClipboardList, FlaskConical, Receipt, File } from "lucide-react";

const typeIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  Quote: ClipboardList,
  Survey: FileText,
  Research: FlaskConical,
  Invoice: Receipt,
  Document: File,
};

export default function EvidencePage() {
  const { assumptions } = useFinance();
  const linkedIds = new Set(evidence.map((e) => e.supports));
  const covered = assumptions.filter((a) => linkedIds.has(a.id)).length;
  const coverage = assumptions.length ? covered / assumptions.length : 0;
  const averageConfidence = evidence.length
    ? evidence.reduce((sum, item) => sum + item.confidence, 0) / evidence.length
    : null;

  return (
    <div>
      <PageHeader eyebrow="Traceability" title="Evidence" description="Every material assumption traced to its underlying evidence." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Surface>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Coverage</div>
          <div className="mt-2 text-3xl font-semibold">{(coverage * 100).toFixed(0)}%</div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
            <div className="h-full bg-gradient-to-r from-brand-sage to-brand-orange" style={{ width: `${coverage * 100}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{covered} of {assumptions.length} assumptions linked</p>
        </Surface>
        <Surface>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Evidence Artefacts</div>
          <div className="mt-2 text-3xl font-semibold">{evidence.length}</div>
          <p className="mt-2 text-xs text-muted-foreground">Across quotes, surveys, research and invoices</p>
        </Surface>
        <Surface>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Avg Confidence</div>
          <div className="mt-2 text-3xl font-semibold text-brand-orange">
            {averageConfidence === null ? "Not available" : averageConfidence.toFixed(0)}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Evidence collection in progress</p>
        </Surface>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {evidence.map((e) => {
          const Icon = typeIcon[e.type] ?? File;
          const a = getAssumption(e.supports);
          return (
            <Surface key={e.id}>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy/60 text-brand-sage">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-semibold">{e.title}</h3>
                    <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">{e.type}</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{e.source} · added {e.addedAt}</div>
                  <div className="mt-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-xs">
                    <span className="text-muted-foreground">Supports:</span>{" "}
                    <span className="font-medium">{a.name}</span>{" "}
                    <span className="text-muted-foreground">({a.category})</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full bg-brand-sage" style={{ width: `${e.confidence}%` }} />
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-brand-sage">
                      <ShieldCheck className="h-3 w-3" /> {e.confidence}
                    </span>
                  </div>
                </div>
              </div>
            </Surface>
          );
        })}
      </div>
    </div>
  );
}
