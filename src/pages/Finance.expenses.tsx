import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, Banknote, CheckCircle2, Landmark, Receipt, Search, UserRound, WalletCards } from "lucide-react";
import { PageHeader, SectionTitle, Surface } from "@/components/finance/PageHeader";
import { ApiError } from "@/lib/authenticated-api";
import { expenseErrorMessage } from "@/services/expenses/expense.service";
import { useExpenses } from "@/hooks/useExpenses";
import { formatSafeDate } from "@/lib/safe-date";
import type { Expense } from "@/types/expense";

const money = (value: number | null, fallback = "Not confirmed") =>
  value === null ? fallback : new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);
const expenseDate = (value: unknown, fallback = "Not confirmed") =>
  formatSafeDate(value, fallback, { day: "numeric", month: "short", year: "numeric" });
const actualCost = (expense: Expense) =>
  expense.costType === "Actual transaction" ||
  expense.costType === "One-off programme cost" ||
  (expense.costType === "Recurring operating cost" && expense.transactionDate !== null);
const founderFunded = (expense: Expense) =>
  expense.paidBy?.toLowerCase() === "founder" || expense.paymentChannel?.toLowerCase().includes("founder") === true;
const sumKnown = (items: Expense[], pick: (item: Expense) => number | null) => {
  const values = items.map(pick).filter((value): value is number => value !== null);
  return values.length ? values.reduce((total, value) => total + value, 0) : null;
};

const statusLabels = (expense: Expense) => {
  const labels: string[] = [];
  if (expense.costType === "Actual transaction") labels.push("Actual");
  if (expense.costType === "Recurring operating cost") labels.push("Recurring");
  if (expense.costType === "One-off programme cost") labels.push("One-off");
  if (expense.costType === "Recurring shared cost") labels.push("Shared cost");
  if (expense.costType.includes("Planned") || expense.costType === "Future operating cost") labels.push("Planned");
  labels.push(expense.evidenceStatus);
  return [...new Set(labels)];
};

export default function ExpensesPage() {
  const { expenses, loading, error } = useExpenses();
  const [filters, setFilters] = useState({
    keyword: "", category: "", supplier: "", costType: "", evidence: "", payment: "", cadence: "", funding: "", cash: "",
  });

  const choices = (pick: (expense: Expense) => string | null) =>
    [...new Set(expenses.map(pick).filter((value): value is string => Boolean(value)))].sort();
  const filtered = useMemo(() => expenses.filter((expense) => {
    const text = `${expense.name} ${expense.supplierName ?? ""} ${expense.notes ?? ""}`.toLowerCase();
    return (!filters.keyword || text.includes(filters.keyword.toLowerCase()))
      && (!filters.category || expense.category === filters.category)
      && (!filters.supplier || expense.supplierName === filters.supplier)
      && (!filters.costType || expense.costType === filters.costType)
      && (!filters.evidence || expense.evidenceStatus === filters.evidence)
      && (!filters.payment || expense.paymentChannel === filters.payment)
      && (!filters.cadence || (filters.cadence === "Recurring" ? expense.frequency !== "One-off" : expense.frequency === "One-off"))
      && (!filters.funding || (filters.funding === "Founder-funded") === founderFunded(expense))
      && (!filters.cash || (filters.cash === "Company cash") === (expense.companyCashOutflow === true));
  }), [expenses, filters]);

  const actual = expenses.filter(actualCost);
  const cards = [
    ["Verified actual spend", money(sumKnown(actual.filter((item) => item.evidenceStatus === "Verified"), (item) => item.grossAmount)), "Confirmed gross", CheckCircle2],
    ["Founder-funded spend", money(sumKnown(actual.filter(founderFunded), (item) => item.grossAmount)), "Known gross costs", UserRound],
    ["Company-bank cash spend", money(sumKnown(actual.filter((item) => item.companyCashOutflow === true), (item) => item.grossAmount), "None recorded"), "Confirmed company outflow", Landmark],
    ["Recurring monthly run-rate", money(sumKnown(expenses.filter((item) => item.frequency === "Monthly"), (item) => item.recurringRunRateNet)), "Confirmed net", WalletCards],
    ["Costs awaiting evidence", String(expenses.filter((item) => item.evidenceStatus !== "Verified").length), "Records", Receipt],
    ["Shared allocation pending", String(expenses.filter((item) => item.costType === "Recurring shared cost" && item.klpsAllocationAmount === null).length), "Records", AlertCircle],
  ] as const;

  return (
    <div>
      <PageHeader eyebrow="Outflows" title="Expenses" description="Canonical actual, recurring, shared and planned cost records from the Finance OS backend." />

      {loading && <State title="Loading expenses" body="Retrieving canonical current-cost records…" />}
      {!loading && error && <State title={error instanceof ApiError && [401, 403].includes(error.status) ? "Access unavailable" : "Expenses unavailable"} body={expenseErrorMessage(error)} alert />}
      {!loading && !error && expenses.length === 0 && <State title="No current costs recorded" body="No canonical expense records have been returned by the backend. No placeholder records are shown." />}

      {!loading && !error && expenses.length > 0 && <>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map(([label, value, hint, Icon]) => <Surface key={label}><div className="flex items-start justify-between gap-3"><div><div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-3 text-2xl font-semibold">{value}</div><div className="mt-1 text-xs text-muted-foreground">{hint}</div></div><Icon className="h-5 w-5 text-brand-orange" /></div></Surface>)}
        </div>

        <div className="my-5 rounded-xl border border-brand-purple/20 bg-brand-purple/[0.07] p-4 text-sm">
          <strong>Founder-funded treatment:</strong> Founder-funded expenses are recognised as business costs but do not reduce KLPS bank cash unless reimbursed or paid by the company.
        </div>
        {expenses.every((expense) => expense.evidenceId === null) && (
          <div role="status" className="mb-5 rounded-xl border border-brand-orange/25 bg-brand-orange/10 p-4 text-sm">
            <strong>No evidence links yet.</strong> Evidence references may be recorded, but no canonical Evidence UUID is currently linked to these expenses.
          </div>
        )}

        <Surface className="mb-5">
          <SectionTitle title="Filter Current Costs" hint={`${filtered.length} of ${expenses.length} records`} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <label className="relative xl:col-span-2"><span className="sr-only">Search expenses</span><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><input value={filters.keyword} onChange={(event) => setFilters({ ...filters, keyword: event.target.value })} className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm" placeholder="Search name, supplier or notes" /></label>
            <Filter label="Category" value={filters.category} values={choices((item) => item.category)} onChange={(value) => setFilters({ ...filters, category: value })} />
            <Filter label="Supplier" value={filters.supplier} values={choices((item) => item.supplierName)} onChange={(value) => setFilters({ ...filters, supplier: value })} />
            <Filter label="Cost type" value={filters.costType} values={choices((item) => item.costType)} onChange={(value) => setFilters({ ...filters, costType: value })} />
            <Filter label="Evidence" value={filters.evidence} values={choices((item) => item.evidenceStatus)} onChange={(value) => setFilters({ ...filters, evidence: value })} />
            <Filter label="Payment source" value={filters.payment} values={choices((item) => item.paymentChannel)} onChange={(value) => setFilters({ ...filters, payment: value })} />
            <Filter label="Cadence" value={filters.cadence} values={["Recurring", "One-off"]} onChange={(value) => setFilters({ ...filters, cadence: value })} />
            <Filter label="Funding" value={filters.funding} values={["Founder-funded", "Not founder-funded"]} onChange={(value) => setFilters({ ...filters, funding: value })} />
            <Filter label="Cash outflow" value={filters.cash} values={["Company cash", "Not company cash"]} onChange={(value) => setFilters({ ...filters, cash: value })} />
          </div>
        </Surface>

        {filtered.length === 0 ? <State title="No matching expenses" body="No canonical records match the selected filters." /> :
          <div className="space-y-4">{filtered.map((expense) => <ExpenseCard key={expense.id} expense={expense} />)}</div>}

        <p className="mt-5 text-xs text-muted-foreground">These records are read-only. Changes require a supported Finance OS backend expense write endpoint.</p>
      </>}
    </div>
  );
}

function ExpenseCard({ expense }: { expense: Expense }) {
  const allocation = expense.klpsAllocationPercentage === null
    ? "Allocation pending"
    : `${(expense.klpsAllocationPercentage * 100).toFixed(0)}% · ${money(expense.klpsAllocationAmount)}`;
  return <Surface>
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">{statusLabels(expense).map((label) => <span key={label} className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-semibold">{label}</span>)}</div>
        <h2 className="mt-3 break-words text-lg font-semibold">{expense.name}</h2>
        <p className="mt-1 break-words text-sm text-muted-foreground">{expense.supplierName ?? "Supplier not confirmed"} · {expense.category}</p>
      </div>
      <div className="shrink-0 text-left lg:text-right"><div className="text-xs text-muted-foreground">Gross amount</div><div className="mt-1 text-xl font-semibold">{money(expense.grossAmount, expense.currentStatus === "Not yet purchased" ? "Not yet purchased" : "Not confirmed")}</div></div>
    </div>
    <dl className="mt-5 grid gap-x-6 gap-y-4 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-4">
      <Detail label="Cost type" value={expense.costType} />
      <Detail label="Status" value={expense.currentStatus} />
      <Detail label="Frequency" value={expense.frequency ?? "Not confirmed"} />
      <Detail label="Transaction date" value={expenseDate(expense.transactionDate)} />
      <Detail label="Service period" value={expense.servicePeriodStart ? `${expenseDate(expense.servicePeriodStart)} to ${expenseDate(expense.servicePeriodEnd)}` : "Not confirmed"} />
      <Detail label="Net amount" value={money(expense.netAmount)} />
      <Detail label="VAT amount" value={money(expense.vatAmount, expense.evidenceStatus === "Under Review" ? "To evidence" : "Not confirmed")} />
      <Detail label="Recurring run-rate" value={money(expense.recurringRunRateNet)} />
      <Detail label="Payment source" value={founderFunded(expense) ? (expense.paymentChannel ?? "Founder-funded") : (expense.paymentChannel ?? "Not confirmed")} />
      <Detail label="Company-bank cash outflow" value={expense.companyCashOutflow === null ? "Not confirmed" : expense.companyCashOutflow ? "Yes — paid from KLPS bank" : "No"} />
      <Detail label="Business allocation" value={allocation} />
      <Detail label="Reimbursement" value={expense.reimbursementStatus ?? "Not confirmed"} />
      <Detail label="Evidence status" value={expense.evidenceStatus} />
      <Detail label="Change reason" value={expense.changeReason} />
    </dl>
    {expense.notes && <p className="mt-4 rounded-lg bg-background/60 p-3 text-sm leading-6 text-muted-foreground">{expense.notes}</p>}
    <div className="mt-4">
      {expense.evidenceId
        ? <Link className="text-sm font-semibold text-brand-orange underline-offset-4 hover:underline" to={`/finance/evidence?evidence=${encodeURIComponent(expense.evidenceId)}`} aria-label={`Open evidence for ${expense.name}`}>Open Evidence</Link>
        : <span className="text-sm font-semibold text-muted-foreground">Evidence required{expense.evidenceReference ? ` · ${expense.evidenceReference}` : ""}</span>}
    </div>
  </Surface>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt><dd className="mt-1 break-words text-sm">{value}</dd></div>;
}

function Filter({ label, value, values, onChange }: { label: string; value: string; values: string[]; onChange: (value: string) => void }) {
  return <label><span className="sr-only">{label}</span><select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"><option value="">All {label.toLowerCase()}</option>{values.map((item) => <option key={item}>{item}</option>)}</select></label>;
}

function State({ title, body, alert = false }: { title: string; body: string; alert?: boolean }) {
  return <Surface><div role={alert ? "alert" : "status"} className="py-8 text-center"><h2 className="text-lg font-semibold">{title}</h2><p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">{body}</p></div></Surface>;
}
