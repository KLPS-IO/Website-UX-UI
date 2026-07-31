import { PageHeader, Surface, SectionTitle } from "@/components/finance/PageHeader";
import { useFinance } from "@/contexts/FinanceContext";
import { History } from "lucide-react";
import { EntityEvidenceLinks } from "@/components/finance/EntityEvidenceLinks";

export default function AssumptionsPage() {
  const { assumptions: rows, updateAssumption } = useFinance();
  const categories = Array.from(new Set(rows.map((r) => r.category)));

  return (
    <div>
      <PageHeader
        eyebrow="Model inputs"
        title="Assumptions"
        description="Every input driving the financial model. Editing a value cascades through revenue, expenses, cash flow and KPIs live."
      />

      <div className="space-y-6">
        {categories.map((cat) => (
          <Surface key={cat} padded={false}>
            <div className="border-b border-white/5 px-5 py-3">
              <SectionTitle title={cat} hint={`${rows.filter((r) => r.category === cat).length} inputs`} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th className="px-5 py-2 font-medium">Name</th>
                    <th className="px-5 py-2 font-medium">Value</th>
                    <th className="px-5 py-2 font-medium">Level</th>
                    <th className="px-5 py-2 font-medium">Confidence</th>
                    <th className="px-5 py-2 font-medium">Source</th>
                    <th className="px-5 py-2 font-medium">Owner</th>
                    <th className="px-5 py-2 font-medium">Status</th>
                    <th className="px-5 py-2 font-medium">Evidence</th>
                    <th className="px-5 py-2 font-medium">Version</th>
                    <th className="px-5 py-2 font-medium">Updated</th>
                    <th className="px-5 py-2 font-medium">History</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.filter((r) => r.category === cat).map((a) => (
                    <tr key={a.id} className="border-t border-white/5">
                      <td className="px-5 py-3 font-medium">{a.name}</td>
                      <td className="px-5 py-3">
                        <div className="inline-flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-2 py-1">
                          <input
                            type="number"
                            step="any"
                            value={a.value}
                            onChange={(e) => updateAssumption(a.id, Number(e.target.value))}
                            className="w-28 bg-transparent text-right text-foreground outline-none"
                          />
                          <span className="text-xs text-muted-foreground">{a.unit}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="rounded-md bg-brand-orange/15 px-2 py-1 text-xs font-medium text-brand-orange">
                          {a.confidenceLevel}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/5">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${a.confidence}%`,
                                background:
                                  a.confidence >= 75
                                    ? "var(--brand-sage)"
                                    : a.confidence >= 55
                                      ? "var(--brand-orange)"
                                      : "var(--brand-coral)",
                              }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{a.confidence}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">{a.source}</td>
                      <td className="px-5 py-3 text-muted-foreground">{a.owner}</td>
                      <td className="px-5 py-3 text-muted-foreground">{a.status}</td>
                      <td className="px-5 py-3">
                        <EntityEvidenceLinks entityType="assumption" entityId={a.id} />
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">v{a.version}</td>
                      <td className="px-5 py-3 text-muted-foreground">{a.updated_at}</td>
                      <td className="px-5 py-3">
                        <button className="inline-flex items-center gap-1 rounded-md border border-white/5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground">
                          <History className="h-3 w-3" /> {a.history.length}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Surface>
        ))}
      </div>
    </div>
  );
}
