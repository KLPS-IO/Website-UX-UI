import { FileCheck2, Scale, ShieldCheck } from "lucide-react";
import { investorDisclosure } from "@/config/investorDisclosure";

const Value = ({ label, value }: { label: string; value: string }) => <div><dt className="text-xs uppercase tracking-[0.14em] text-[#9b8993]">{label}</dt><dd className="mt-1 break-words font-medium text-[#241b20]">{value}</dd></div>;

export function CompanyLegalOverview() {
  const disclosure = investorDisclosure;
  return <div className="mt-10 space-y-6">
    <section className="rounded-2xl border border-pink-100 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-[0.18em] text-[#b52b70]">Investor legal disclosure</p><h2 className="mt-2 font-serif text-2xl text-[#241b20]">{disclosure.company.legalName}</h2><p className="mt-2 text-sm text-[#71616a]">Company number {disclosure.company.companyNumber}</p></div><span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800"><ShieldCheck size={15} /> Published v{disclosure.version}</span></div>
      <dl className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"><Value label="Trading name" value={disclosure.company.tradingName} /><Value label="Company type" value={disclosure.company.companyType} /><Value label="Company status" value={disclosure.company.companyStatus} /><Value label="Jurisdiction" value={disclosure.company.jurisdiction} /><Value label="Operating stage" value={disclosure.company.stage} /><Value label="Disclosure date" value={disclosure.asOf} /></dl>
    </section>
    <section className="rounded-2xl border border-pink-100 p-6"><h2 className="flex items-center gap-2 font-semibold text-[#241b20]"><Scale size={18} /> Ownership, IP and governance</h2><div className="mt-5 grid gap-4 md:grid-cols-2"><Status title="Current ownership" text="Emma Mendez holds 1 Ordinary share, representing 100% ownership and voting rights. No external investors, option pool or convertibles are recorded in this disclosure." /><Status title="Intellectual property · strategy in development" text={disclosure.intellectualProperty} /><Status title="Finance & compliance" text={disclosure.financeAndCompliance} /><Status title="Disclosure basis" text={disclosure.disclosureBasis} /></div><p className="mt-5 flex items-center gap-2 text-xs text-[#71616a]"><FileCheck2 size={15} /> Founder-only records, account identifiers, balances, personal credit information and internal scenarios are intentionally excluded.</p></section>
  </div>;
}

function Status({ title, text }: { title: string; text: string }) { return <div className="rounded-xl bg-pink-50/60 p-4"><h3 className="text-sm font-semibold text-[#241b20]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#71616a]">{text}</p></div>; }
