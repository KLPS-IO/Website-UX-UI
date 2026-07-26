import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, ChevronDown, Download, Eye, FileClock, Landmark, Receipt, Search, Upload, UserRound, WalletCards } from "lucide-react";
import { PageHeader, SectionTitle, Surface } from "@/components/finance/PageHeader";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDataRoomViewer } from "@/hooks/useDataRoomViewer";
import { useExpenses } from "@/hooks/useExpenses";
import { ApiError } from "@/lib/authenticated-api";
import { cn } from "@/lib/utils";
import { formatSafeDate } from "@/lib/safe-date";
import { formatMoney } from "@/lib/safe-money";
import { documentApiErrorMessage } from "@/services/evidence/document-upload";
import { evidenceService } from "@/services/evidence/evidence.service";
import { expenseErrorMessage } from "@/services/expenses/expense.service";
import { UploadDialog, type QueueItem, type UploadPrefill } from "@/pages/FInance.documents";
import type { EvidenceItem } from "@/types/evidence";
import type { Expense } from "@/types/expense";

const expenseDate = (value: unknown, fallback = "Not confirmed") =>
  formatSafeDate(value, fallback, { day: "numeric", month: "short", year: "numeric" });
const founderFunded = (expense: Expense) =>
  expense.paidBy?.toLowerCase() === "founder" ||
  expense.paymentChannel?.toLowerCase().includes("founder") === true ||
  expense.paymentChannel?.toLowerCase().includes("personal") === true;
const actionClass = "inline-flex items-center gap-2 rounded-lg border border-border bg-white/60 px-3 py-2 text-xs font-semibold transition hover:border-brand-orange/40 hover:text-foreground disabled:opacity-50";

const recordType = (expense: Expense) => {
  if (expense.costType === "Actual transaction") return "Actual";
  if (expense.costType === "Recurring operating cost") return "Recurring";
  if (expense.costType === "One-off programme cost") return "One-off";
  if (expense.costType === "Recurring shared cost") return "Shared cost";
  if (expense.costType.includes("Planned") || expense.costType === "Future operating cost") return "Planned";
  return expense.costType;
};

function uploadMetadata(expense: Expense): UploadPrefill {
  const supplier = expense.supplierName ?? "KLPS";
  const name = expense.name.toLowerCase();
  let title = `${supplier} ${expense.name} Evidence`;
  let relationship = "Supports recorded business expenditure";
  let category: UploadPrefill["category"] = "Finance";

  if (supplier.includes("Female Founders Rise")) {
    title = "Female Founders Rise Cohort 9 Receipt";
    relationship = "Verifies programme participation fee";
  } else if (supplier.includes("OpenAI")) {
    title = "OpenAI ChatGPT Plus Invoice";
    relationship = "Verifies recurring software expenditure";
  } else if (supplier.includes("IONOS")) {
    title = "IONOS klps.co.uk Domain Invoice";
    relationship = "Verifies annual domain-registration cost";
  } else if (name.includes("prototype")) {
    title = `${supplier} Prototype Materials Receipt`;
    relationship = "Supports prototype-material expenditure";
    category = "Product";
  }

  return {
    title,
    category,
    sourceOrganisation: expense.supplierName ?? "",
    description: [
      `Evidence for Finance OS expense: ${expense.name}.`,
      expense.evidenceReference ? `Supplier reference: ${expense.evidenceReference}.` : "",
    ].filter(Boolean).join(" "),
    linkMode: true,
    entityType: "expense",
    entityId: expense.id,
    relationship,
  };
}

export default function ExpensesPage() {
  const viewer = useDataRoomViewer();
  const { expenses, metrics, loading, error } = useExpenses();
  const [openId, setOpenId] = useState<string | null>(null);
  const [evidenceByExpense, setEvidenceByExpense] = useState<Record<string, EvidenceItem[]>>({});
  const [evidenceLoading, setEvidenceLoading] = useState(false);
  const [evidenceError, setEvidenceError] = useState("");
  const [uploadExpense, setUploadExpense] = useState<Expense | null>(null);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [versionsFor, setVersionsFor] = useState<EvidenceItem | null>(null);
  const [versions, setVersions] = useState<EvidenceItem[]>([]);
  const [versionsLoading, setVersionsLoading] = useState(false);
  const [filters, setFilters] = useState({
    keyword: "", category: "", supplier: "", costType: "", evidence: "All", payment: "", cadence: "", funding: "", cash: "",
  });

  const loadExpenseEvidence = useCallback(async (items: Expense[]) => {
    if (!items.length) return;
    setEvidenceLoading(true); setEvidenceError("");
    const results = await Promise.all(items.map(async (expense) => {
      try { return [expense.id, await evidenceService.linked("expense", expense.id)] as const; }
      catch { return [expense.id, null] as const; }
    }));
    const next: Record<string, EvidenceItem[]> = {};
    let failed = false;
    for (const [id, evidence] of results) {
      if (evidence === null) failed = true;
      else next[id] = evidence;
    }
    setEvidenceByExpense(next);
    if (failed) setEvidenceError("Some linked evidence could not be loaded.");
    setEvidenceLoading(false);
  }, []);

  useEffect(() => { void loadExpenseEvidence(expenses); }, [expenses, loadExpenseEvidence]);

  const choices = (pick: (expense: Expense) => string | null) =>
    [...new Set(expenses.map(pick).filter((value): value is string => Boolean(value)))].sort();
  const filtered = useMemo(() => expenses.filter((expense) => {
    const text = `${expense.name} ${expense.supplierName ?? ""} ${expense.notes ?? ""}`.toLowerCase();
    const linked = (evidenceByExpense[expense.id]?.length ?? 0) > 0;
    const evidenceMatch =
      filters.evidence === "All" ||
      (filters.evidence === "Evidence linked" && linked) ||
      (filters.evidence === "Evidence required" && !linked) ||
      (filters.evidence === "Under Review" && expense.evidenceStatus === "Under Review") ||
      (filters.evidence === "Verified" && expense.evidenceStatus === "Verified");
    return (!filters.keyword || text.includes(filters.keyword.toLowerCase()))
      && (!filters.category || expense.category === filters.category)
      && (!filters.supplier || expense.supplierName === filters.supplier)
      && (!filters.costType || expense.costType === filters.costType)
      && evidenceMatch
      && (!filters.payment || expense.paymentChannel === filters.payment)
      && (!filters.cadence || (filters.cadence === "Recurring" ? expense.frequency !== "One-off" : expense.frequency === "One-off"))
      && (!filters.funding || (filters.funding === "Founder-funded") === founderFunded(expense))
      && (!filters.cash || (filters.cash === "Company cash") === (expense.companyCashOutflow === true));
  }), [expenses, evidenceByExpense, filters]);

  const metricHint = (known: number, excluded: number, basis: string) =>
    `${basis} · ${known} known${excluded ? ` · ${excluded} excluded as unknown` : ""}`;
  const cards = metrics ? [
    ["Verified actual spend", formatMoney(metrics.verifiedActualSpend.amount), metricHint(metrics.verifiedActualSpend.knownCount, metrics.verifiedActualSpend.excludedUnknownCount, "Business allocated"), CheckCircle2],
    ["Founder-funded business spend", formatMoney(metrics.totalFounderFundedBusinessSpend.amount), metricHint(metrics.totalFounderFundedBusinessSpend.knownCount, metrics.totalFounderFundedBusinessSpend.excludedUnknownCount, "Recognised costs"), UserRound],
    ["Company-bank cash spend", formatMoney(metrics.companyBankCashSpend.amount, metrics.companyBankCashSpend.knownCount === 0 ? "None recorded" : "Not confirmed"), metricHint(metrics.companyBankCashSpend.knownCount, metrics.companyBankCashSpend.excludedUnknownCount, "Company outflow"), Landmark],
    ["Recurring monthly run-rate", formatMoney(metrics.recurringMonthlyRunRateNet.amount), metricHint(metrics.recurringMonthlyRunRateNet.knownCount, metrics.recurringMonthlyRunRateNet.excludedUnknownCount, "Confirmed net"), WalletCards],
    ["Costs awaiting evidence", String(metrics.awaitingEvidenceCount), "Records with evidence work outstanding", Receipt],
    ["Shared allocation pending", String(metrics.sharedAllocationPendingCount), "Records", AlertCircle],
  ] as const : [];

  const availableDocuments = Object.values(evidenceByExpense).flat();
  const refreshSelectedEvidence = async () => {
    if (!uploadExpense) return;
    const linked = await evidenceService.linked("expense", uploadExpense.id);
    setEvidenceByExpense((current) => ({ ...current, [uploadExpense.id]: linked }));
  };

  return <div>
    <PageHeader eyebrow="Outflows" title="Expenses" description="Canonical actual, recurring, shared and planned cost records from the Finance OS backend." />
    {loading && <State title="Loading expenses" body="Retrieving canonical current-cost records…" />}
    {!loading && error && <State title={error instanceof ApiError && [401, 403].includes(error.status) ? "Access unavailable" : "Expenses unavailable"} body={expenseErrorMessage(error)} alert />}
    {!loading && !error && expenses.length === 0 && <State title="No current costs recorded" body="No canonical expense records have been returned by the backend." />}

    {!loading && !error && expenses.length > 0 && metrics && <>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([label, value, hint, Icon]) =>
        <Surface key={label}><div className="flex items-start justify-between gap-3"><div><div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-3 text-2xl font-semibold">{value}</div><div className="mt-1 text-xs text-muted-foreground">{hint}</div></div><Icon className="h-5 w-5 text-brand-orange" /></div></Surface>)}
      </div>
      <div className="my-5 rounded-xl border border-brand-purple/20 bg-brand-purple/[0.07] p-4 text-sm"><strong>Founder-funded treatment:</strong> Founder-funded expenses are recognised as business costs but do not reduce KLPS bank cash unless reimbursed or paid by the company.</div>

      <Surface className="mb-5">
        <SectionTitle title="Filter Current Costs" hint={`${filtered.length} of ${expenses.length} records`} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <label className="relative xl:col-span-2"><span className="sr-only">Search expenses</span><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><input value={filters.keyword} onChange={(event) => setFilters({ ...filters, keyword: event.target.value })} className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm" placeholder="Search name, supplier or notes" /></label>
          <Filter label="Category" value={filters.category} values={choices((item) => item.category)} onChange={(value) => setFilters({ ...filters, category: value })} />
          <Filter label="Supplier" value={filters.supplier} values={choices((item) => item.supplierName)} onChange={(value) => setFilters({ ...filters, supplier: value })} />
          <Filter label="Cost type" value={filters.costType} values={choices((item) => item.costType)} onChange={(value) => setFilters({ ...filters, costType: value })} />
          <Filter label="Evidence" value={filters.evidence} values={["All", "Evidence linked", "Evidence required", "Under Review", "Verified"]} includeAll={false} onChange={(value) => setFilters({ ...filters, evidence: value })} />
          <Filter label="Payment source" value={filters.payment} values={choices((item) => item.paymentChannel)} onChange={(value) => setFilters({ ...filters, payment: value })} />
          <Filter label="Cadence" value={filters.cadence} values={["Recurring", "One-off"]} onChange={(value) => setFilters({ ...filters, cadence: value })} />
          <Filter label="Funding" value={filters.funding} values={["Founder-funded", "Not founder-funded"]} onChange={(value) => setFilters({ ...filters, funding: value })} />
          <Filter label="Cash outflow" value={filters.cash} values={["Company cash", "Not company cash"]} onChange={(value) => setFilters({ ...filters, cash: value })} />
        </div>
      </Surface>

      {evidenceError && <div role="alert" className="mb-4 rounded-lg border border-brand-coral/25 bg-brand-coral/10 p-3 text-sm text-brand-coral">{evidenceError}</div>}
      {filtered.length === 0 ? <State title="No matching expenses" body="No canonical records match the selected filters." /> :
        <div className="space-y-3">{filtered.map((expense) => <ExpenseCard key={expense.id} expense={expense} open={openId === expense.id} setOpen={() => setOpenId(openId === expense.id ? null : expense.id)} evidence={evidenceByExpense[expense.id] ?? []} evidenceLoading={evidenceLoading} canUpload={viewer?.canWriteFinance === true} upload={() => { setQueue([]); setUploadExpense(expense); }} openVersions={async (item) => { setVersionsFor(item); setVersions([]); setVersionsLoading(true); try { setVersions(await evidenceService.versions(item.id)); } finally { setVersionsLoading(false); } }} />)}</div>}
    </>}

    <UploadDialog open={Boolean(uploadExpense)} setOpen={(open) => { if (!open) { setUploadExpense(null); setQueue([]); } }} queue={queue} setQueue={setQueue} companyId={null} documents={availableDocuments} prefill={uploadExpense ? uploadMetadata(uploadExpense) : null} afterUploads={async () => { await refreshSelectedEvidence(); }} />
    <VersionDialog item={versionsFor} versions={versions} loading={versionsLoading} close={() => setVersionsFor(null)} />
  </div>;
}

function ExpenseCard({ expense, open, setOpen, evidence, evidenceLoading, canUpload, upload, openVersions }: { expense: Expense; open: boolean; setOpen: () => void; evidence: EvidenceItem[]; evidenceLoading: boolean; canUpload: boolean; upload: () => void; openVersions: (item: EvidenceItem) => Promise<void> }) {
  const allocation = expense.klpsAllocationPercentage === null ? "Allocation pending" : `${(expense.klpsAllocationPercentage * 100).toFixed(0)}% · ${formatMoney(expense.klpsAllocationAmount)}`;
  const hasEvidence = evidence.length > 0;
  const access = async (item: EvidenceItem, action: "view" | "download") => {
    const viewWindow = action === "view" ? window.open("about:blank", "_blank") : null;
    if (viewWindow) viewWindow.opener = null;
    try {
      const result = await evidenceService.accessDocument(item.id, action);
      if (action === "view") {
        if (viewWindow) viewWindow.location.replace(result.signed_url);
        else window.open(result.signed_url, "_blank", "noopener,noreferrer");
      } else {
        const anchor = document.createElement("a"); anchor.href = result.signed_url; anchor.download = item.originalFilename ?? ""; anchor.rel = "noopener"; document.body.appendChild(anchor); anchor.click(); anchor.remove();
      }
    } catch (reason) { viewWindow?.close(); window.alert(documentApiErrorMessage(reason)); }
  };
  return <Surface className="expense-card" padded={false}>
    <div className="p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2"><Badge>{recordType(expense)}</Badge><Badge tone={expense.evidenceStatus === "Verified" ? "good" : expense.evidenceStatus === "Under Review" ? "warning" : "neutral"}>{expense.evidenceStatus}</Badge>{hasEvidence && <Badge tone="good">Evidence linked</Badge>}</div>
          <h2 className="mt-3 break-words text-base font-semibold sm:text-lg">{expense.name}</h2>
          <p className="mt-1 break-words text-sm text-muted-foreground">{expense.supplierName ?? "Supplier not confirmed"}</p>
        </div>
        <div className="flex items-center justify-between gap-4 lg:block lg:text-right"><div><div className="text-[11px] uppercase tracking-wider text-muted-foreground">Gross</div><div className="mt-1 text-lg font-semibold">{formatMoney(expense.grossAmount, expense.currentStatus === "Not yet purchased" ? "Not yet purchased" : "Not confirmed")}</div></div><button type="button" onClick={setOpen} aria-expanded={open} aria-controls={`expense-${expense.id}`} className={actionClass}><span>{open ? "Collapse" : "Details"}</span><ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} /></button></div>
      </div>
      <dl className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2 lg:grid-cols-6">
        <Detail label="Cost type" value={expense.costType} /><Detail label="Status" value={expense.currentStatus} /><Detail label="Transaction date" value={expenseDate(expense.transactionDate)} /><Detail label="Treatment" value={expense.financialTreatment} /><Detail label="Evidence" value={evidenceLoading ? "Loading…" : hasEvidence ? `${evidence.length} linked` : "Evidence needed"} />
      </dl>
      {!hasEvidence && !evidenceLoading && <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-brand-orange/25 bg-brand-orange/10 p-3 text-sm"><AlertCircle className="h-4 w-4 shrink-0 text-brand-orange" /><span className="min-w-0 flex-1 break-words">Evidence required{expense.evidenceReference ? ` · ${expense.evidenceReference}` : ""}</span>{canUpload && <button type="button" onClick={upload} className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-3 py-2 text-xs font-semibold text-white"><Upload className="h-4 w-4" /> Upload evidence</button>}</div>}
    </div>
    <div id={`expense-${expense.id}`} className={cn("expense-disclosure border-t border-border px-4 py-5 sm:px-5", !open && "hidden")}>
      <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
        <Detail label="Frequency" value={expense.frequency ?? "Not confirmed"} /><Detail label="Service period" value={expense.servicePeriodStart ? `${expenseDate(expense.servicePeriodStart)} to ${expenseDate(expense.servicePeriodEnd)}` : "Not confirmed"} /><Detail label="Net amount" value={formatMoney(expense.netAmount)} /><Detail label="VAT amount" value={formatMoney(expense.vatAmount, expense.evidenceStatus === "Under Review" ? "To evidence" : "Not confirmed")} /><Detail label="Recurring run-rate" value={formatMoney(expense.recurringRunRateNet)} /><Detail label="Payment source" value={founderFunded(expense) ? expense.paymentChannel ?? "Founder-funded" : expense.paymentChannel ?? "Not confirmed"} /><Detail label="Company-bank cash outflow" value={expense.companyCashOutflow === null ? "Not confirmed" : expense.companyCashOutflow ? "Yes — paid from KLPS bank" : "No"} /><Detail label="Business allocation" value={allocation} /><Detail label="Reimbursement" value={expense.reimbursementStatus ?? "Not confirmed"} /><Detail label="Evidence status" value={expense.evidenceStatus} /><Detail label="Change reason" value={expense.changeReason} /><Detail label="Receipt or invoice reference" value={expense.evidenceReference ?? "Not confirmed"} />
      </dl>
      {expense.notes && <p className="mt-4 rounded-lg bg-background/60 p-3 text-sm leading-6 text-muted-foreground">{expense.notes}</p>}
      <div className="mt-5"><h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Linked evidence</h3>{hasEvidence ? <div className="mt-3 space-y-3">{evidence.map((item) => <div key={item.id} className="rounded-xl border border-border p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div className="min-w-0"><div className="font-semibold text-brand-orange">{item.code}</div><div className="break-words text-sm font-medium">{item.title}</div><div className="mt-1 text-xs text-muted-foreground">{item.category ?? "Category not confirmed"} · {item.verificationStatus} · {item.sourceOrganisation ?? "Source not confirmed"}</div><div className="mt-1 text-xs text-muted-foreground">{item.links?.find((link) => link.entity_id === expense.id)?.relationship ?? "Linked to expense"}</div></div><div className="flex flex-wrap gap-2"><button disabled={!item.hasR2Object} className={actionClass} onClick={() => void access(item, "view")}><Eye className="h-4 w-4" /> View</button><button disabled={!item.hasR2Object} className={actionClass} onClick={() => void access(item, "download")}><Download className="h-4 w-4" /> Download</button><button className={actionClass} onClick={() => void openVersions(item)}><FileClock className="h-4 w-4" /> Versions</button></div></div></div>)}</div> : <p className="mt-2 text-sm text-muted-foreground">No canonical evidence is linked.</p>}</div>
    </div>
  </Surface>;
}

function Badge({ children, tone = "neutral" }: { children: string; tone?: "neutral" | "good" | "warning" }) {
  return <span className={cn("rounded-full border px-2.5 py-1 text-[11px] font-semibold", tone === "good" && "border-brand-sage/40 bg-brand-sage/15", tone === "warning" && "border-brand-orange/40 bg-brand-orange/10", tone === "neutral" && "border-border bg-background")}>{children}</span>;
}
function Detail({ label, value }: { label: string; value: string }) { return <div><dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt><dd className="mt-1 break-words text-sm">{value}</dd></div>; }
function Filter({ label, value, values, onChange, includeAll = true }: { label: string; value: string; values: string[]; onChange: (value: string) => void; includeAll?: boolean }) { return <label><span className="sr-only">{label}</span><select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm">{includeAll && <option value="">All {label.toLowerCase()}</option>}{values.map((item) => <option key={item}>{item}</option>)}</select></label>; }
function State({ title, body, alert = false }: { title: string; body: string; alert?: boolean }) { return <Surface><div role={alert ? "alert" : "status"} className="py-8 text-center"><h2 className="text-lg font-semibold">{title}</h2><p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">{body}</p></div></Surface>; }
function VersionDialog({ item, versions, loading, close }: { item: EvidenceItem | null; versions: EvidenceItem[]; loading: boolean; close: () => void }) { return <Dialog open={Boolean(item)} onOpenChange={(open) => { if (!open) close(); }}><DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto"><DialogHeader><DialogTitle>Version History</DialogTitle><DialogDescription>{item?.code} — {item?.title}</DialogDescription></DialogHeader>{loading ? <p className="text-sm text-muted-foreground">Loading versions…</p> : versions.length ? <ul className="space-y-3">{versions.map((version, index) => <li key={`${version.id}-${version.version}-${index}`} className="rounded-lg border border-border p-4"><div className="font-semibold">File v{version.fileVersion} · Record v{version.version}</div><div className="mt-1 text-xs text-muted-foreground">{expenseDate(version.createdAt)} · {version.documentStatus}</div><p className="mt-2 text-xs">{version.changeReason || "No change reason supplied"}</p></li>)}</ul> : <p className="text-sm text-muted-foreground">No version-history records were returned.</p>}</DialogContent></Dialog>; }
