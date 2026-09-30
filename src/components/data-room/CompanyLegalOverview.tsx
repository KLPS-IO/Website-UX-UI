import { Building2, CalendarDays, FileCheck2, Scale, ShieldCheck } from "lucide-react";

export type CompanyLegalSnapshot = {
  legalName: string;
  tradingName: string;
  companyNumber: string;
  companyType: string;
  companyStatus: string;
  incorporationDate: string;
  country: string;
  sicCodes: string[];
  registeredOffice: string[];
  financialYearEnd: string;
  firstAccountsPeriodEnd: string;
  firstAccountsFilingDeadline: string;
  corporationTaxStatus: string;
  icoStatus: string;
  vatStatus: string;
  dataStatus: string;
  lastReviewed: string;
};

const formatDate = (value: string) => {
  if (!value) return "Not confirmed";
  const parsed = new Date(value.length === 10 ? `${value}T00:00:00` : value);
  return Number.isNaN(parsed.getTime())
    ? "Not confirmed"
    : parsed.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
};

const Value = ({ label, value }: { label: string; value: string }) => (
  <div>
    <dt className="text-xs uppercase tracking-[0.14em] text-[#9b8993]">{label}</dt>
    <dd className="mt-1 break-words font-medium text-[#241b20]">{value || "Not confirmed"}</dd>
  </div>
);

export function CompanyLegalOverview({
  company,
  loading,
}: {
  company: CompanyLegalSnapshot | null;
  loading: boolean;
}) {
  if (loading) {
    return <p className="mt-8 text-sm text-[#71616a]">Loading the verified company record…</p>;
  }

  if (!company) {
    return (
      <p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        The canonical company record is temporarily unavailable. No legal details have been inferred.
      </p>
    );
  }

  return (
    <div className="mt-10 space-y-6">
      <section className="rounded-2xl border border-pink-100 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#b52b70]">Legal identity</p>
            <h2 className="mt-2 font-serif text-2xl text-[#241b20]">{company.legalName}</h2>
            <p className="mt-2 text-sm text-[#71616a]">Company number {company.companyNumber}</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">
            <ShieldCheck size={15} /> {company.dataStatus || "Canonical"} FOS record
          </span>
        </div>
        <dl className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Value label="Trading name" value={company.tradingName} />
          <Value label="Company type" value={company.companyType} />
          <Value label="Company status" value={company.companyStatus} />
          <Value label="Incorporated" value={formatDate(company.incorporationDate)} />
          <Value label="Jurisdiction" value={company.country} />
          <Value label="SIC codes" value={company.sicCodes.join(" · ")} />
        </dl>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-pink-100 p-6">
          <h2 className="flex items-center gap-2 font-semibold text-[#241b20]"><Building2 size={18} /> Registered office</h2>
          <address className="mt-4 not-italic text-sm leading-7 text-[#71616a]">
            {company.registeredOffice.length
              ? company.registeredOffice.map((line) => <div key={line}>{line}</div>)
              : "Not confirmed"}
          </address>
        </section>
        <section className="rounded-2xl border border-pink-100 p-6">
          <h2 className="flex items-center gap-2 font-semibold text-[#241b20]"><CalendarDays size={18} /> Accounts and filing</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <Value label="Financial year end" value={company.financialYearEnd} />
            <Value label="First accounts period end" value={formatDate(company.firstAccountsPeriodEnd)} />
            <Value label="First filing deadline" value={formatDate(company.firstAccountsFilingDeadline)} />
            <Value label="Corporation Tax" value={company.corporationTaxStatus} />
          </dl>
        </section>
      </div>

      <section className="rounded-2xl border border-pink-100 p-6">
        <h2 className="flex items-center gap-2 font-semibold text-[#241b20]"><Scale size={18} /> Ownership, IP and compliance position</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Status title="Ownership and share capital" text="Current ownership must be read from the evidence-backed cap-table record and its supporting documents. Working fundraising scenarios are excluded from this investor view." />
          <Status title="Intellectual property" text="No patent, freedom-to-operate or complete IP-assignment position is represented as verified unless supporting evidence is listed below." />
          <Status title="VAT status" text={company.vatStatus || "Not confirmed"} />
          <Status title="ICO status" text={company.icoStatus || "Not confirmed"} />
        </div>
        <p className="mt-5 flex items-center gap-2 text-xs text-[#71616a]">
          <FileCheck2 size={15} /> Last reviewed: {formatDate(company.lastReviewed)}. Sensitive tax identifiers, bank details and internal legal notes are excluded.
        </p>
      </section>
    </div>
  );
}

function Status({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl bg-pink-50/60 p-4">
      <h3 className="text-sm font-semibold text-[#241b20]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#71616a]">{text}</p>
    </div>
  );
}
