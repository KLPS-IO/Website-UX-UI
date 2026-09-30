import { Banknote, CircleDollarSign, Landmark, ListChecks, PieChart } from "lucide-react";
import { investorDisclosure, type DisclosureStatus } from "@/config/investorDisclosure";

const pounds = (value: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);
const statusLabel: Record<DisclosureStatus, string> = { verified: "Verified", completed: "Established", in_progress: "In progress", planned: "Planned", not_evidenced: "Not published" };
const statusStyle: Record<DisclosureStatus, string> = { verified: "bg-emerald-50 text-emerald-800 border-emerald-200", completed: "bg-emerald-50 text-emerald-800 border-emerald-200", in_progress: "bg-amber-50 text-amber-900 border-amber-200", planned: "bg-blue-50 text-blue-800 border-blue-200", not_evidenced: "bg-slate-50 text-slate-700 border-slate-200" };

export function InvestorFinancialSnapshot() {
  const disclosure = investorDisclosure;
  return <article className="mt-10 space-y-6 text-[#71616a]">
    <section className="rounded-2xl border border-pink-100 bg-pink-50/40 p-6 md:p-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#b52b70]">Company &amp; Capital Snapshot</p>
      <h2 className="mt-3 font-serif text-3xl text-[#241b20]">Founder-owned. Pre-investment. Building deliberately.</h2>
      <p className="mt-3 text-sm">Version {disclosure.version} · information correct as at {disclosure.asOf}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Metric label="Current ownership" value="100% founder" note="No external investors" />
        <Metric label="Founding pilot forecast" value="50 customers" note={`${pounds(disclosure.commercialForecast.forecastSales)} forecast sales`} />
        <Metric label="External capital received" value="£0" note="Applications are not cash" />
      </div>
    </section>

    <Section icon={PieChart} title="Cap table · actual current position">
      <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="border-b border-pink-100 text-xs uppercase tracking-wider text-[#9b8993]"><tr>{["Shareholder", "Class", "Shares", "Ownership", "Nominal value", "Voting rights"].map(value => <th key={value} className="p-3 first:pl-0">{value}</th>)}</tr></thead><tbody>{disclosure.capTable.holdings.map(holding => <tr key={holding.shareholder} className="border-b border-pink-100 text-[#241b20]"><td className="py-4 pr-3 font-medium">{holding.shareholder}</td><td className="p-3">{holding.shareClass}</td><td className="p-3">{holding.shares}</td><td className="p-3">{holding.ownership}%</td><td className="p-3">{pounds(holding.nominalValue)}</td><td className="p-3">{holding.votingRights}%</td></tr>)}</tbody></table></div>
      <p className="mt-4 text-sm">No external investors, option pool or convertibles. {disclosure.capTable.note}</p>
    </Section>

    <div className="grid gap-6 lg:grid-cols-2">
      <Section icon={CircleDollarSign} title="Commercial pilot economics">
        <dl className="grid grid-cols-2 gap-4"><Value label="Pilot cohort" value={`${disclosure.commercialForecast.customers} customers`} /><Value label="Forecast sales" value={pounds(disclosure.commercialForecast.forecastSales)} /><Value label="Direct cost / unit" value={pounds(disclosure.commercialForecast.estimatedDirectCostPerUnit)} /><Value label="Forecast direct costs" value={pounds(disclosure.commercialForecast.forecastDirectCosts)} /><Value label="Gross contribution" value={pounds(disclosure.commercialForecast.forecastGrossContribution)} /></dl>
        <p className="mt-4 text-xs leading-5">{disclosure.commercialForecast.qualification}</p>
      </Section>
      <Section icon={Banknote} title="Funding progress">
        <Status label={`Start Up Loan · ${pounds(disclosure.funding.startUpLoan.amount)}`} status={disclosure.funding.startUpLoan.status} text={disclosure.funding.startUpLoan.statement} />
        <Status label="SEIS readiness" status={disclosure.funding.seis.status} text={disclosure.funding.seis.statement} />
        <p className="mt-4 text-xs leading-5">{disclosure.funding.unconfirmedFundingTreatment}</p>
      </Section>
    </div>

    <Section icon={Landmark} title="£7,000 proposed use of funds">
      <div className="grid gap-3 sm:grid-cols-2">{disclosure.useOfFunds.map(row => <div key={row.item} className="flex items-start justify-between gap-4 rounded-xl bg-pink-50/60 p-4 text-sm"><span>{row.item}</span><strong className="shrink-0 text-[#241b20]">{pounds(row.amount)}</strong></div>)}</div>
    </Section>

    <Section icon={ListChecks} title="Operating readiness">
      <div className="grid gap-3 md:grid-cols-2">{disclosure.operatingReadiness.map(item => <Status key={item.label} label={item.label} status={item.status} text={item.statement} />)}</div>
      <Status label="Cash and runway" status={disclosure.cashPosition.status} text={disclosure.cashPosition.statement} />
    </Section>

    <p className="text-xs leading-5">{disclosure.governanceNote} Supporting evidence and later approved disclosure versions supersede this snapshot.</p>
  </article>;
}

function Section({ icon: Icon, title, children }: { icon: typeof PieChart; title: string; children: React.ReactNode }) { return <section className="rounded-2xl border border-pink-100 p-6"><h2 className="flex items-center gap-2 font-semibold text-[#241b20]"><Icon size={18} /> {title}</h2><div className="mt-5">{children}</div></section>; }
function Metric({ label, value, note }: { label: string; value: string; note: string }) { return <div className="rounded-xl border border-pink-100 bg-white p-4"><p className="text-xs uppercase tracking-wider text-[#9b8993]">{label}</p><p className="mt-2 text-2xl font-semibold text-[#241b20]">{value}</p><p className="mt-1 text-xs">{note}</p></div>; }
function Value({ label, value }: { label: string; value: string }) { return <div><dt className="text-xs uppercase tracking-wider text-[#9b8993]">{label}</dt><dd className="mt-1 font-medium text-[#241b20]">{value}</dd></div>; }
function Status({ label, status, text }: { label: string; status: DisclosureStatus; text: string }) { return <div className="mb-3 rounded-xl border border-pink-100 p-4"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-semibold text-[#241b20]">{label}</h3><span className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${statusStyle[status]}`}>{statusLabel[status]}</span></div><p className="mt-2 text-sm leading-6">{text}</p></div>; }
