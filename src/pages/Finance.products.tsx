import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, Surface } from "@/components/finance/PageHeader";
import { chartTheme } from "@/components/finance/ChartCard";
import { products, productMargin, currency, pct } from "@/lib/finance-data";
import { Package } from "lucide-react";
import { EntityEvidenceLinks } from "@/components/finance/EntityEvidenceLinks";
import { GlossaryText } from "@/components/finance/GlossaryTooltip";

export default function ProductsPage() {
  return (
    <div>
      <PageHeader eyebrow="Catalogue" title="Products" description="Unit economics and margin visualisations across the KLPS product line." />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2">
        {products.map((p) => {
          const m = productMargin(p);
          const data = [
            { name: "Manufacturing", value: p.mfgCost, color: "#ef9f32" },
            { name: "Packaging", value: p.packaging, color: "#ec7769" },
            { name: "Shipping", value: p.shipping, color: "#945c8c" },
            { name: "Gross Profit", value: Math.max(0, m.gross), color: "#b6d0ac" },
          ];
          const statusColor = p.status === "Live" ? "bg-brand-sage/20 text-brand-sage" : p.status === "Beta" ? "bg-brand-orange/20 text-brand-orange" : "bg-brand-purple/20 text-brand-purple";
          return (
            <Surface key={p.id}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy to-brand-teal">
                    <Package className="h-5 w-5 text-brand-sage" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">Launch · {p.launchDate || "Not scheduled"}</p>
                  </div>
                </div>
                <span className={`rounded-md px-2 py-1 text-xs font-medium ${statusColor}`}>{p.status}</span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                <Stat label="Price" value={p.confidenceLevel === "Unknown" ? "Not yet evidenced" : currency(p.sellingPrice)} />
                <Stat label="Subscription" value={p.subscriptionMonthly ? `${currency(p.subscriptionMonthly)}/mo` : "—"} />
                <Stat label="Margin" value={p.confidenceLevel === "Unknown" ? "Not calculated" : pct(m.marginPct, 0)} accent />
              </div>

              <div className="mt-4 text-xs text-muted-foreground">Cost breakdown</div>
              <div className="mt-1" style={{ height: 130 }}>
                <ResponsiveContainer>
                  <BarChart layout="vertical" data={data} margin={{ left: 0, right: 10, top: 4, bottom: 4 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} width={90} />
                    <Tooltip {...chartTheme.tooltip} formatter={(v: number) => currency(v)} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                      {data.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                <div className="h-full rounded-full bg-gradient-to-r from-brand-orange via-brand-coral to-brand-sage" style={{ width: `${Math.max(0, m.marginPct * 100)}%` }} />
              </div>
              <div className="mt-4 border-t border-white/5 pt-3">
                <EntityEvidenceLinks entityType="products" entityId={p.id} />
              </div>
            </Surface>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground"><GlossaryText>{label}</GlossaryText></div>
      <div className={`mt-1 text-sm font-semibold ${accent ? "text-brand-orange" : ""}`}>{value}</div>
    </div>
  );
}
