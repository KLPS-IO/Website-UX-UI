import { Building2, CalendarDays, CheckCircle2, CircleAlert, Clock3, FileCheck2, Landmark, PieChart, ShieldCheck } from "lucide-react";
import { PageHeader, SectionTitle, Surface } from "@/components/finance/PageHeader";
import { GlossaryText } from "@/components/finance/GlossaryTooltip";
import { useFinance } from "@/contexts/FinanceContext";
import { ApiError } from "@/lib/authenticated-api";
import { evidenceErrorMessage, evidenceService } from "@/services/evidence/evidence.service";
import type { EvidenceItem } from "@/types/evidence";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const display = (value: string | number | null | undefined, fallback = "Not confirmed") =>
  value === null || value === undefined || value === "" ? fallback : String(value);

const formatDate = (value: string | null | undefined) => {
  if (!value) return "Not confirmed";
  const parsed = new Date(value.length === 10 ? `${value}T00:00:00` : value);
  return Number.isNaN(parsed.getTime()) ? "Not confirmed" : parsed.toLocaleDateString("en-GB", {
    day: "2-digit", month: "long", year: "numeric",
  });
};

const formatMoney = (value: number | null) => value === null ? "Not confirmed" :
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);

const formatFieldLabel = (field: string) => {
  const acronyms: Record<string, string> = {
    vat: "VAT",
    ico: "ICO",
    seis: "SEIS",
    crl: "CRL",
    trl: "TRL",
    ids: "IDs",
    id: "ID",
  };

  return field
    .replace(/_/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(" ")
    .map((word) => acronyms[word.toLowerCase()] ?? `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join(" ");
};

export default function CompanyPage() {
  const { company, companyHealth: overview, companyVersions, companyEvidence, companyLoading, companyError, refreshCompany } = useFinance();
  const [availableEvidence, setAvailableEvidence] = useState<EvidenceItem[]>([]);
  const [linkMessage, setLinkMessage] = useState("");
  const [linkingId, setLinkingId] = useState("");

  useEffect(() => {
    if (!company) return;
    evidenceService.list({ limit: 100 }).then(setAvailableEvidence).catch(() => setAvailableEvidence([]));
  }, [company]);

  if (companyLoading) return <CompanyState title="Loading Company" message="Retrieving the canonical Company record, health and evidence…" />;
  if (companyError) {
    const unauthorised = companyError instanceof ApiError && (companyError.status === 401 || companyError.status === 403);
    return <CompanyState title={unauthorised ? "Unauthorised" : "Company unavailable"} message={unauthorised ? "You are not authorised to view the canonical Company record." : companyError instanceof Error ? companyError.message : "The Company API is unavailable."} action={refreshCompany} />;
  }
  if (!company || !overview) return <CompanyState title="No canonical Company" message="The Company API returned no canonical Company record." action={refreshCompany} />;

  const linkEvidence = async (evidenceId: string) => {
    setLinkingId(evidenceId); setLinkMessage("");
    try {
      await evidenceService.link(evidenceId, "company", company.id);
      setLinkMessage("Evidence linked successfully.");
      await refreshCompany();
    } catch (error) { setLinkMessage(evidenceErrorMessage(error)); }
    finally { setLinkingId(""); }
  };
  const address = Object.values(company.registeredOffice).filter(Boolean);

  return (
    <div>
      <PageHeader
        eyebrow="Company"
        title={company.tradingName}
        description="Verified legal, tax, compliance and company-status information."
        actions={
          <span className="inline-flex items-center gap-2 rounded-lg border border-brand-sage/25 bg-brand-sage/10 px-3 py-2 text-xs font-medium text-brand-sage">
            <ShieldCheck className="h-4 w-4" /> {company.dataStatus} record
          </span>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Surface className="lg:col-span-2">
          <SectionTitle title="Legal Identity" hint={`Company no. ${company.companyNumber}`} />
          <dl className="grid gap-4 sm:grid-cols-2">
            <Field label="Company name" value={company.companyName} />
            <Field label="Legal name" value={company.legalName} />
            <Field label="Trading name" value={company.tradingName} />
            <Field label="Company type" value={company.companyType} />
            <Field label="Company status" value={company.companyStatus} />
            <Field label="Operating status" value={company.operatingStatus} />
            <Field label="Industry" value={company.industry.join(" · ")} />
            <Field label="Country" value={company.country} />
            <Field label="Incorporated" value={formatDate(company.incorporationDate)} />
            <Field label="Founder" value={company.founder} />
            <Field label="Base currency" value={company.baseCurrency} />
            <Field label="SIC codes" value={company.sicCodes.join(" · ")} />
          </dl>
        </Surface>

        <Surface>
          <SectionTitle title="Company Record" />
          <div className="flex items-end justify-between">
            <div>
              <div className="text-4xl font-semibold">{overview.completionPercentage}%</div>
              <div className="mt-1 text-xs text-muted-foreground">record completion</div>
            </div>
            <FileCheck2 className="h-9 w-9 text-brand-orange" />
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
            <div className="h-full bg-gradient-to-r from-brand-orange to-brand-sage" style={{ width: `${overview.completionPercentage}%` }} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Field label="Known fields" value={overview.verifiedFieldCount} />
            <Field label="Unknown fields" value={overview.unknownFieldCount} />
          </div>
          <div className="mt-4 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-xs text-muted-foreground">
            Evidence: {companyEvidence.length ? `${companyEvidence.length} linked` : "No linked evidence"}
          </div>
        </Surface>
      </div>

      <Surface className="mt-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <SectionTitle title="Ownership & Share Capital" hint="Verified incorporation snapshot" />
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              <Field label="Shareholders" value="1 shareholder" />
              <Field label="Issued shares" value="1 ordinary share" />
              <Field label="Ownership" value="100% founder owned" />
              <Field label="Nominal capital" value="£1 total" />
              <Field label="Option pool" value="None" />
              <Field label="External investors" value="None" />
            </div>
          </div>
          <Link to="../cap-table" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-brand-purple/25 bg-brand-purple/10 px-3 py-2 text-sm font-semibold text-brand-purple transition hover:border-brand-purple/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple">
            <PieChart className="h-4 w-4" /> Open Cap Table
          </Link>
        </div>
      </Surface>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Surface>
          <SectionTitle title="Banking & Accounting" />
          <dl className="grid gap-4 sm:grid-cols-2">
            <Field label="Operating bank" value={company.operatingBankName} />
            <Field label="Bank status" value={company.bankStatus} />
            <Field label="External accountant" value={company.externalAccountantStatus} />
            <Field label="Accounting software" value={company.accountingSoftware} />
            <Field label="Software status" value={company.accountingSoftwareStatus} />
            <Field label="Accounting method" value={display(company.accountingMethod)} />
          </dl>
        </Surface>

        <Surface>
          <SectionTitle title="Fundraising & Legal" />
          <dl className="grid gap-4 sm:grid-cols-2">
            <Field label="Current raise target" value={formatMoney(company.currentRaiseAmount)} />
            <Field label="Scheme" value={company.fundraisingScheme} />
            <Field label="Raise status" value={company.fundraisingStatus} />
            <Field label="Legal partner" value={company.legalPartner} />
            <Field label="Legal partner status" value={company.legalPartnerStatus} />
          </dl>
        </Surface>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Surface>
          <SectionTitle title="Funding Strategy" />
          <StrategyList label="Current funding sources" values={company.currentFundingSources} />
          <StrategyList label="Future revenue sources" values={company.futureRevenueSources} className="mt-5" />
        </Surface>

        <Surface>
          <SectionTitle title="Company Timeline" />
          <ul className="space-y-3">
            {company.milestones.map((milestone) => (
              <li key={milestone.id} className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                {milestone.status === "Completed"
                  ? <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-sage" />
                  : <Clock3 className="h-4 w-4 shrink-0 text-brand-orange" />}
                <span className="text-sm font-medium">{milestone.title}</span>
                <span className="ml-auto text-[10px] uppercase tracking-widest text-muted-foreground">{milestone.status}</span>
              </li>
            ))}
          </ul>
        </Surface>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Surface>
          <SectionTitle title="Registered Office" />
          <div className="flex gap-3">
            <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
            <address className="not-italic text-sm leading-7 text-muted-foreground">
              {address.map((line) => <div key={line}>{line}</div>)}
            </address>
          </div>
        </Surface>

        <Surface>
          <SectionTitle title="Accounts & Filing" />
          <dl className="space-y-3">
            <IconField icon={CalendarDays} label="Financial year end" value={company.financialYearEnd} />
            <IconField icon={CalendarDays} label="First accounts period end" value={formatDate(company.firstAccountsPeriodEnd)} />
            <IconField icon={CalendarDays} label="First accounts filing deadline" value={formatDate(company.firstAccountsFilingDeadline)} />
          </dl>
        </Surface>
      </div>

      <Surface className="mt-6">
        <SectionTitle title="Tax, Compliance & Readiness" />
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="VAT status" value={company.vatStatus} />
          <Field label="VAT number" value={display(company.vatRegistrationNumber, "Not yet evidenced")} />
          <Field label="VAT effective date" value={company.vatEffectiveDate ? formatDate(company.vatEffectiveDate) : "Not confirmed"} />
          <Field label="VAT scheme" value={display(company.vatScheme)} />
          <Field label="VAT accounting period" value={company.vatAccountingPeriodStart && company.vatAccountingPeriodEnd ? `${formatDate(company.vatAccountingPeriodStart)} to ${formatDate(company.vatAccountingPeriodEnd)}` : "Not confirmed"} />
          <Field label="HMRC letter issued" value={company.vatLetterIssueDate ? formatDate(company.vatLetterIssueDate) : "Not confirmed"} />
          <Field label="VAT evidence source" value={company.vatEvidenceSource} />
          <Field label="Corporation Tax" value={company.corporationTaxStatus} />
          <Field label="Accounting method" value={display(company.accountingMethod)} />
          <Field label="ICO status" value={company.icoStatus} />
          <Field label="SEIS status" value={company.seisStatus} />
          <Field label="SEIS advance assurance" value={company.seisAdvanceAssuranceStatus} />
          <Field label="SEIS target submission" value={display(company.seisTargetSubmissionPeriod)} />
          <Field label="SEIS decision date" value={display(company.seisDecisionDate)} />
          <Field label="SEIS reference" value={display(company.seisReferenceNumber, "Not submitted")} />
          <Field label="SEIS evidence" value={company.seisEvidenceIds.length ? `${company.seisEvidenceIds.length} linked` : "Not yet evidenced"} />
          <Field label="Bank status" value={company.bankStatus} />
          <Field label="Business bank account" value={display(company.businessBankAccount)} />
          <Field label="Bank balance" value={company.bankBalance === null ? "Not yet evidenced" : `GBP ${company.bankBalance}`} />
          <Field label="TRL" value={company.trl} />
          <Field label="CRL" value={display(company.crl)} />
        </dl>
      </Surface>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Surface>
          <SectionTitle title="Company Evidence" hint={`${companyEvidence.length} linked`} />
          {companyEvidence.length ? <ul className="space-y-3">{companyEvidence.map((item) => (
            <li key={item.id} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
              <div className="flex flex-wrap items-center gap-2"><span className="font-semibold text-brand-orange">{item.code}</span><span className="text-sm font-medium">{item.title}</span></div>
              <div className="mt-2 text-xs text-muted-foreground">{display(item.category)} · {item.type} · {item.verificationStatus} · {item.documentStatus}</div>
              <div className="mt-1 text-xs text-muted-foreground">Confidence {item.confidencePercent}% · {display(item.sourceOrganisation)} · Relationship: {display(item.links?.find((link) => link.entity_type === "company" && link.entity_id === company.id)?.relationship_type ?? item.links?.find((link) => link.entity_type === "company" && link.entity_id === company.id)?.relationship)}</div>
            </li>
          ))}</ul> : <p className="text-sm text-muted-foreground">No evidence is linked to this canonical Company UUID.</p>}
          {linkMessage && <p role="status" className="mt-3 text-xs text-brand-orange">{linkMessage}</p>}
        </Surface>

        <Surface>
          <SectionTitle title="Link Existing Evidence" hint="Founder/admin access required" />
          <ul className="max-h-80 space-y-2 overflow-y-auto">
            {availableEvidence.filter((item) => !companyEvidence.some((linked) => linked.id === item.id)).map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/5 p-3">
                <div className="min-w-0"><div className="truncate text-sm font-medium">{item.code} — {item.title}</div><div className="text-xs text-muted-foreground">{display(item.category)} · {item.verificationStatus}</div></div>
                <button type="button" disabled={Boolean(linkingId)} onClick={() => void linkEvidence(item.id)} className="rounded-lg border border-brand-orange/30 px-3 py-2 text-xs font-medium text-brand-orange disabled:opacity-50">{linkingId === item.id ? "Linking…" : "Link"}</button>
              </li>
            ))}
          </ul>
        </Surface>
      </div>

      <Surface className="mt-6">
        <SectionTitle title="Company Version History" hint={`Current version ${company.version}`} />
        {companyVersions.length ? <ul className="space-y-3">{companyVersions.map((version) => (
          <li key={version.version} className="grid gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-sm md:grid-cols-4">
            <Field label="Version" value={`v${version.version}`} /><Field label="Change reason" value={display(version.changeReason)} />
            <Field label="Created" value={formatDate(version.createdAt)} /><Field label="Created by" value={display(version.createdBy)} />
            <div className="md:col-span-4"><Field label="Snapshot" value={version.snapshotSummary} /></div>
          </li>
        ))}</ul> : <p className="text-sm text-muted-foreground">No version history was returned.</p>}
      </Surface>

      <Surface className="mt-6">
        <SectionTitle title="Canonical Audit" />
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Field label="Version" value={`v${company.version}`} /><Field label="Last updated" value={formatDate(company.updatedAt)} /><Field label="Updated by" value={display(company.updatedBy)} /><Field label="Change reason" value={display(company.changeReason)} /></dl>
      </Surface>

      <Surface className="mt-6">
        <SectionTitle title="Company Health" hint={`${overview.warnings.length} open items`} />
        <ul className="grid gap-3 md:grid-cols-2">
          {overview.warnings.map((warning, index) => (
            <li key={`${warning.code}-${index}`} className="flex gap-3 rounded-lg border border-brand-orange/15 bg-brand-orange/[0.06] p-3">
              {warning.severity === "info" ? <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-brand-sage" /> : <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />}
              <div>
                <div className="text-sm font-medium"><GlossaryText>{warning.message}</GlossaryText></div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {warning.code} · {warning.severity} · {formatFieldLabel(warning.field)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Surface>
    </div>
  );
}

function CompanyState({ title, message, action }: { title: string; message: string; action?: () => Promise<void> }) {
  return <div><PageHeader eyebrow="Company" title={title} description={message} />{action && <button type="button" onClick={() => void action()} className="rounded-lg border border-border px-3 py-2 text-sm font-medium">Try again</button>}</div>;
}

function Field({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"><GlossaryText>{label}</GlossaryText></dt>
      <dd className="mt-1 text-sm font-medium text-foreground">{typeof value === "string" ? <GlossaryText>{value}</GlossaryText> : value}</dd>
    </div>
  );
}

function IconField({ icon: Icon, label, value }: { icon: typeof CalendarDays; label: string; value: string }) {
  return (
    <div className="flex gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
      <Icon className="h-4 w-4 shrink-0 text-brand-orange" />
      <Field label={label} value={value} />
    </div>
  );
}

function StrategyList({ label, values, className = "" }: { label: string; values: string[]; className?: string }) {
  return (
    <div className={className}>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"><GlossaryText>{label}</GlossaryText></div>
      <ul className="mt-2 flex flex-wrap gap-2">
        {values.map((value) => <li key={value} className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-sm font-medium"><GlossaryText>{value}</GlossaryText></li>)}
      </ul>
    </div>
  );
}
