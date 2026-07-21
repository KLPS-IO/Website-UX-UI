import { PageHeader, Surface, SectionTitle } from "@/components/finance/PageHeader";
import { KpiCard } from "@/components/finance/KpiCard";
import { funding, currency, currencyShort } from "@/lib/finance-data";
import { Landmark, PiggyBank, Users2 } from "lucide-react";

export default function FundingPage() {
  const received = funding.filter((f) => f.status === "Received").reduce((s, f) => s + f.amount, 0);
  const committed = funding.filter((f) => f.status === "Committed").reduce((s, f) => s + f.amount, 0);
  const planned = funding.filter((f) => f.status === "Planned").reduce((s, f) => s + f.amount, 0);
  const dilution = funding.reduce((s, f) => s + (f.dilution ?? 0), 0);

  const typeStyle = (t: string) =>
    t === "Grant" ? "bg-brand-sage/15 text-brand-sage" : t === "Investment" ? "bg-brand-orange/15 text-brand-orange" : "bg-brand-purple/15 text-brand-purple";
  const statusStyle = (s: string) =>
    s === "Received" ? "bg-brand-sage/15 text-brand-sage" : s === "Committed" ? "bg-brand-orange/15 text-brand-orange" : "bg-white/5 text-muted-foreground";

  return (
    <div>
      <PageHeader eyebrow="Capital" title="Funding" description="Grants, investments and planned rounds — with runway impact and dilution tracking." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Raised to date" value={funding.length ? currencyShort(received) : "Not yet evidenced"} icon={PiggyBank} accent="sage" />
        <KpiCard label="Committed" value={funding.length ? currencyShort(committed) : "Not yet evidenced"} icon={Landmark} accent="orange" />
        <KpiCard label="Planned" value={funding.length ? currencyShort(planned) : "Not yet evidenced"} icon={Landmark} accent="purple" />
        <KpiCard label="Total dilution" value={funding.length ? `${(dilution * 100).toFixed(1)}%` : "Not yet evidenced"} icon={Users2} accent="coral" />
      </div>

      <Surface className="mt-6" padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Instrument</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Dilution</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {funding.map((f) => (
                <tr key={f.id} className="border-t border-white/5">
                  <td className="px-5 py-3 font-medium">{f.name}</td>
                  <td className="px-5 py-3"><span className={`rounded-md px-2 py-1 text-xs font-medium ${typeStyle(f.type)}`}>{f.type}</span></td>
                  <td className="px-5 py-3">{currency(f.amount)}</td>
                  <td className="px-5 py-3 text-muted-foreground">{f.date}</td>
                  <td className="px-5 py-3 text-muted-foreground">{f.dilution ? `${(f.dilution * 100).toFixed(1)}%` : "—"}</td>
                  <td className="px-5 py-3"><span className={`rounded-md px-2 py-1 text-xs font-medium ${statusStyle(f.status)}`}>{f.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Surface>

      <Surface className="mt-6">
        <SectionTitle title="Runway impact" hint="cumulative capital timeline" />
        <div className="relative pl-3">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10" />
          {funding.map((f) => (
            <div key={f.id} className="relative mb-4 pl-6">
              <div className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-brand-orange shadow-[0_0_8px_var(--brand-orange)]" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold">{f.name}</div>
                  <div className="text-xs text-muted-foreground">{f.date} · {f.type}</div>
                </div>
                <div className="text-sm font-semibold text-brand-sage">+{currency(f.amount)}</div>
              </div>
            </div>
          ))}
        </div>
      </Surface>
    </div>
  );
}
