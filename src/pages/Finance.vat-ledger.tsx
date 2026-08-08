import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, Plus } from "lucide-react";
import { PageHeader, Surface } from "@/components/finance/PageHeader";
import { MtdAccountingExportDialog } from "@/components/finance/MtdAccountingExportDialog";
import { VatEvidenceUploadDialog, type VatEvidenceTarget } from "@/components/finance/VatEvidenceUploadDialog";
import { useDataRoomViewer } from "@/hooks/useDataRoomViewer";
import { vatLedgerRepository } from "@/repositories/vatLedgerRepository";
import { exportVatCsv, exportVatXlsx } from "@/services/expenses/vat-ledger-export";
import type { VatLedgerRow, VatPeriod, VatPeriodSuggestion } from "@/types/vat-ledger";
import { buildDuplicateExpensePayload } from "@/lib/vat-ledger-duplicate";
import { safeApiDateValue } from "@/lib/safe-date";
import { authoritativeRowsAfterMutation, calculatedGbpGross, EVIDENCE_FILTERS, filterVatLedgerRows, foreignCurrencyWarning, formatVatPeriodLabel, vatPeriodDisplay, warningCopy } from "@/lib/vat-ledger-ui";

const input = "rounded-lg border border-border bg-background px-3 py-2 text-sm";
const reviewStatuses = ["pending_review", "in_review", "ready_for_review", "review_complete"];
const treatments = ["pending_review", "standard_rated", "reduced_rated", "zero_rated", "exempt", "outside_scope", "no_vat_shown", "reverse_charge_review_required", "import_vat_review_required", "blocked_vat", "partially_recoverable", "personal_non_business"];
const human = (value: string | null | undefined) => (value ?? "Not recorded").replaceAll("_", " ").replace(/^./, (character) => character.toUpperCase());
type FormState = {
  payment_date: string;
  invoice_date: string;
  supplier_name: string;
  gross_amount: string;
  description: string;
  currency: string;
  exchange_rate: string;
  gbp_net_amount: string;
  gbp_vat_amount: string;
  gbp_gross_amount: string;
  notes: string;
  vat_treatment: string;
  vat_review_status: string;
  vat_period_id: string;
};
const emptyForm: FormState = {
  payment_date: "",
  invoice_date: "",
  supplier_name: "",
  gross_amount: "",
  description: "",
  currency: "GBP",
  exchange_rate: "",
  gbp_net_amount: "",
  gbp_vat_amount: "",
  gbp_gross_amount: "",
  notes: "",
  vat_treatment: "pending_review",
  vat_review_status: "pending_review",
  vat_period_id: "",
};

export default function VatLedgerPage() {
  const viewer = useDataRoomViewer();
  const [periods, setPeriods] = useState<VatPeriod[]>([]),
    [period, setPeriod] = useState(""),
    [rows, setRows] = useState<VatLedgerRow[]>([]),
    [error, setError] = useState("");
  const [filters, setFilters] = useState({
    supplier: "",
    reviewStatus: "",
    evidenceStatus: "",
  });
  const [form, setForm] = useState<FormState>(emptyForm),
    [editingId, setEditingId] = useState<string | null>(null),
    [suggestion, setSuggestion] = useState<VatPeriodSuggestion | null>(null);
  const [formBaseline, setFormBaseline] = useState<FormState>(emptyForm),
    [evidenceTarget, setEvidenceTarget] = useState<VatEvidenceTarget | null>(null);
  const [formError, setFormError] = useState("");
  const [entryOpen, setEntryOpen] = useState(false);
  const [mtdExportOpen, setMtdExportOpen] = useState(false);
  const load = useCallback(async () => {
    try {
      const [p, l] = await Promise.all([vatLedgerRepository.periods(), vatLedgerRepository.ledger(period)]);
      setPeriods(p.vat_periods);
      setRows(l.transactions);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "VAT ledger unavailable");
    }
  }, [period]);
  useEffect(() => {
    void load();
  }, [load]);
  const taxPoint = form.invoice_date || form.payment_date;
  useEffect(() => {
    let current = true;
    if (!taxPoint) {
      setSuggestion(null);
      return () => {
        current = false;
      };
    }
    void vatLedgerRepository
      .suggestPeriod(taxPoint)
      .then((result) => {
        if (current) setSuggestion(result.vat_period);
      })
      .catch(() => {
        if (current) setSuggestion(null);
      });
    return () => {
      current = false;
    };
  }, [taxPoint]);
  const selected = useMemo(() => periods.find((item) => item.id === period), [period, periods]);
  const filteredRows = useMemo(() => filterVatLedgerRows(rows, filters), [rows, filters]);
  const conversionWarning = foreignCurrencyWarning(form);
  const resetForm = () => {
    setForm(emptyForm);
    setFormBaseline(emptyForm);
    setEditingId(null);
    setSuggestion(null);
    setFormError("");
  };
  const dirty = JSON.stringify(form) !== JSON.stringify(formBaseline);
  const closeForm = () => {
    if (dirty && !window.confirm("Close this unsaved entry? Nothing will be saved.")) return;
    resetForm();
    setEntryOpen(false);
  };
  const clearForm = () => {
    if (dirty && !window.confirm("Clear this unsaved entry? Nothing will be saved.")) return;
    resetForm();
  };
  const openNewEntry = () => {
    resetForm();
    setEntryOpen(true);
  };
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError("");
    try {
      const gbpGross = form.gbp_gross_amount || calculatedGbpGross(form.gross_amount, form.exchange_rate);
      const payload = {
        ...form,
        transaction_date: form.payment_date,
        gbp_gross_amount: gbpGross || null,
        vat_period_id: form.vat_period_id || null,
        change_reason: editingId ? "Founder edited VAT ledger record" : "Created through VAT fast entry",
      };
      const refreshed = await authoritativeRowsAfterMutation(
        () => (editingId ? vatLedgerRepository.update(editingId, payload) : vatLedgerRepository.create(payload)),
        () => vatLedgerRepository.ledger(period),
      );
      setRows(refreshed);
      setError("");
      resetForm();
      setEntryOpen(false);
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Expense could not be saved");
    }
  };
  const edit = (row: VatLedgerRow) => {
    const saved = {
      payment_date: safeApiDateValue(row.payment_date ?? row.transaction_date),
      invoice_date: safeApiDateValue(row.invoice_date),
      supplier_name: row.supplier_name ?? "",
      gross_amount: String(row.gross_amount ?? ""),
      description: row.description ?? "",
      currency: row.currency ?? "GBP",
      exchange_rate: String(row.exchange_rate ?? ""),
      gbp_net_amount: String(row.gbp_net_amount ?? ""),
      gbp_vat_amount: String(row.gbp_vat_amount ?? ""),
      gbp_gross_amount: String(row.gbp_gross_amount ?? ""),
      notes: row.notes ?? "",
      vat_treatment: row.vat_treatment ?? "pending_review",
      vat_review_status: row.vat_review_status ?? "pending_review",
      vat_period_id: row.stored_vat_period_id ?? row.vat_period_id ?? "",
    };
    setEditingId(row.id);
    setFormError("");
    setEntryOpen(true);
    setForm(saved);
    setFormBaseline(saved);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const duplicate = async (row: VatLedgerRow) => {
    try {
      await vatLedgerRepository.create(buildDuplicateExpensePayload(row));
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Expense could not be duplicated");
    }
  };
  const archive = async (row: VatLedgerRow) => {
    if (!window.confirm(`Archive ${row.name ?? "this VAT record"}?`)) return;
    try {
      await vatLedgerRepository.archive(row.id, "Archived from VAT ledger");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Expense could not be archived");
    }
  };
  const update = (field: keyof FormState, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const expenseEvidenceTarget = (row: VatLedgerRow): VatEvidenceTarget => ({
    entityType: "expense",
    id: row.id,
    supplier: row.supplier_name ?? "Supplier not confirmed",
    date: row.effective_tax_point_date ?? row.invoice_date ?? row.transaction_date,
    gross: `£${String(row.gbp_gross_amount ?? row.gross_amount ?? "—")}`,
    reference: row.invoice_number ?? row.order_reference ?? null,
    evidence: row.evidence_files,
  });
  const adjustmentEvidenceTarget = (row: VatLedgerRow, adjustment: NonNullable<VatLedgerRow["adjustments"]>[number]): VatEvidenceTarget => ({
    entityType: "expense_adjustment",
    id: adjustment.id,
    supplier: row.supplier_name ?? "Supplier not confirmed",
    date: adjustment.adjustment_date,
    gross: `£${String(adjustment.gbp_gross_amount ?? adjustment.gross_amount ?? "—")}`,
    reference: adjustment.supplier_reference,
    parentReference: adjustment.parent_order_reference ?? adjustment.parent_invoice_number ?? row.order_reference ?? row.invoice_number,
    evidence: adjustment.evidence_files,
  });
  const suggestedPeriod = suggestion?.id ? periods.find((item) => item.id === suggestion.id) : null;

  return (
    <div>
      <PageHeader eyebrow="VAT readiness" title="Historical VAT ledger" description="Manual working paper for founder review. Not an HMRC submission." />
      {error && (
        <div role="alert" className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-red-900">
          {error}
        </div>
      )}
      <Surface className="mb-5">
        <div className="flex flex-wrap gap-3">
          <select aria-label="VAT period" className={input} value={period} onChange={(event) => setPeriod(event.target.value)}>
            <option value="">All VAT periods</option>
            {periods.map((item) => (
              <option key={item.id} value={item.id}>
                {formatVatPeriodLabel(item)}
                {item.overdue ? " · overdue" : ""}
              </option>
            ))}
          </select>
          <input aria-label="Filter supplier" className={input} placeholder="Filter supplier" value={filters.supplier} onChange={(event) => setFilters({ ...filters, supplier: event.target.value })} />
          <select aria-label="Review status" className={input} value={filters.reviewStatus} onChange={(event) => setFilters({ ...filters, reviewStatus: event.target.value })}>
            <option value="">All review statuses</option>
            {reviewStatuses.map((status) => (
              <option value={status} key={status}>
                {human(status)}
              </option>
            ))}
          </select>
          <select aria-label="Evidence status" className={input} value={filters.evidenceStatus} onChange={(event) => setFilters({ ...filters, evidenceStatus: event.target.value })}>
            <option value="">All evidence statuses</option>
            {EVIDENCE_FILTERS.map((status) => (
              <option value={status} key={status}>
                {human(status)}
              </option>
            ))}
          </select>
          <button className={input} type="button" onClick={() => setFilters({ supplier: "", reviewStatus: "", evidenceStatus: "" })}>
            Clear filters
          </button>
          {viewer?.canWriteFinance && (
            <button className={input} type="button" onClick={openNewEntry}>
              <Plus className="mr-2 inline h-4 w-4" />
              New entry
            </button>
          )}
          <button className={input} type="button" onClick={() => exportVatCsv(filteredRows)}>
            <Download className="mr-2 inline h-4 w-4" />
            CSV
          </button>
          <button className={input} type="button" onClick={() => void exportVatXlsx(filteredRows, selected)}>
            <Download className="mr-2 inline h-4 w-4" />
            XLSX
          </button>
          {viewer?.isFounderAdmin && (
            <button className="rounded-lg border border-brand-orange bg-background px-3 py-2 text-sm font-semibold text-brand-orange" type="button" onClick={() => setMtdExportOpen(true)}>
              MTD Accounting Export
            </button>
          )}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Showing {filteredRows.length} of {rows.length} records. Exports use this filtered set.
        </p>
      </Surface>
      {viewer?.isFounderAdmin && <MtdAccountingExportDialog open={mtdExportOpen} onOpenChange={setMtdExportOpen} period={selected} periods={periods} rows={rows} onEdit={edit} />}
      {viewer?.canWriteFinance && entryOpen && (
        <Surface className="mb-5">
          {formError && (
            <div role="alert" className="mb-3 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-900">
              {formError}
            </div>
          )}
          <form onSubmit={save} className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
            <input required aria-label="Payment date" type="date" className={input} value={form.payment_date} onChange={(event) => update("payment_date", event.target.value)} />
            <input aria-label="Invoice date" type="date" className={input} value={form.invoice_date} onChange={(event) => update("invoice_date", event.target.value)} />
            <input required aria-label="Supplier" className={input} placeholder="Supplier" value={form.supplier_name} onChange={(event) => update("supplier_name", event.target.value)} />
            <input required aria-label="Foreign or gross amount" inputMode="decimal" className={input} placeholder="Foreign or gross amount" value={form.gross_amount} onChange={(event) => update("gross_amount", event.target.value)} />
            <input aria-label="Description" className={input} placeholder="Short description" value={form.description} onChange={(event) => update("description", event.target.value)} />
            <input aria-label="Currency" className={input} maxLength={3} placeholder="Currency" value={form.currency} onChange={(event) => update("currency", event.target.value.toUpperCase())} />
            <input aria-label="Exchange rate" inputMode="decimal" className={input} placeholder="Exchange rate" value={form.exchange_rate} onChange={(event) => update("exchange_rate", event.target.value)} />
            <input aria-label="GBP net" inputMode="decimal" className={input} placeholder="GBP net" value={form.gbp_net_amount} onChange={(event) => update("gbp_net_amount", event.target.value)} />
            <input aria-label="GBP VAT" inputMode="decimal" className={input} placeholder="GBP VAT" value={form.gbp_vat_amount} onChange={(event) => update("gbp_vat_amount", event.target.value)} />
            <input aria-label="GBP gross" inputMode="decimal" className={input} placeholder={calculatedGbpGross(form.gross_amount, form.exchange_rate) ? `Calculated ${calculatedGbpGross(form.gross_amount, form.exchange_rate)}` : "GBP gross"} value={form.gbp_gross_amount} onChange={(event) => update("gbp_gross_amount", event.target.value)} />
            <select aria-label="VAT treatment" className={input} value={form.vat_treatment} onChange={(event) => update("vat_treatment", event.target.value)}>
              {treatments.map((value) => (
                <option value={value} key={value}>
                  {human(value)}
                </option>
              ))}
            </select>
            <select aria-label="Review status" className={input} value={form.vat_review_status} onChange={(event) => update("vat_review_status", event.target.value)}>
              {reviewStatuses.map((value) => (
                <option value={value} key={value}>
                  {human(value)}
                </option>
              ))}
            </select>
            <select aria-label="Confirmed VAT period" className={input} value={form.vat_period_id} onChange={(event) => update("vat_period_id", event.target.value)}>
              <option value="">No explicit period confirmed</option>
              {periods.map((item) => (
                <option value={item.id} key={item.id}>
                  {formatVatPeriodLabel(item)}
                </option>
              ))}
            </select>
            <input aria-label="Review note" className={input} placeholder="Review note for manual conversion" value={form.notes} onChange={(event) => update("notes", event.target.value)} />
            <div className="flex gap-2">
              <button type="button" className={input} onClick={editingId ? closeForm : clearForm}>
                {editingId ? "Close" : "Clear form"}
              </button>
              <button className="rounded-lg bg-brand-orange px-3 py-2 text-sm font-semibold text-white">
                <Plus className="mr-2 inline h-4 w-4" />
                {editingId ? "Save changes" : "Save pending review"}
              </button>
            </div>
          </form>
          <div className="mt-3 text-sm">
            {suggestion?.vat_period_source === "conflict" ? (
              <p className="text-brand-coral">The tax-point date matches more than one VAT period. Select the correct period explicitly.</p>
            ) : suggestedPeriod ? (
              <p>
                Suggested VAT period: <strong>{formatVatPeriodLabel(suggestedPeriod)}</strong>. This is date-derived and not yet reviewed.{" "}
                {!form.vat_period_id && (
                  <button type="button" className="ml-2 underline" onClick={() => update("vat_period_id", suggestedPeriod.id)}>
                    Use suggestion
                  </button>
                )}
              </p>
            ) : taxPoint ? (
              <p>No VAT period matches this tax-point date.</p>
            ) : null}
            {conversionWarning && <p className="mt-1 text-brand-coral">{conversionWarning} Pending saves remain available, but review cannot be completed.</p>}
          </div>
        </Surface>
      )}
      <Surface>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                {["Tax point", "Supplier", "Description", "Net", "VAT", "Gross", "Treatment", "VAT period", "Evidence", "Review", "Warnings", "Actions"].map((heading) => (
                  <th className="p-2" key={heading}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => {
                const periodDisplay = vatPeriodDisplay(row);
                return (
                  <tr key={row.id} className="border-t border-border">
                    <td className="p-2">{safeApiDateValue(row.effective_tax_point_date ?? row.transaction_date) || "—"}</td>
                    <td className="p-2">{row.supplier_name ?? "—"}</td>
                    <td className="p-2">{row.description ?? row.name ?? "Not recorded"}</td>
                    <td className="p-2">{String(row.gbp_net_amount ?? row.net_amount ?? "—")}</td>
                    <td className="p-2">{String(row.gbp_vat_amount ?? row.vat_amount ?? "—")}</td>
                    <td className="p-2">{String(row.gbp_gross_amount ?? row.gross_amount ?? "—")}</td>
                    <td className="p-2">{human(row.vat_treatment ?? "pending_review")}</td>
                    <td className="p-2">
                      <span>{periodDisplay.label}</span>
                      <span className="block text-xs text-muted-foreground">{periodDisplay.detail}</span>
                    </td>
                    <td className="p-2">{human(row.evidence_coverage ?? "requires_review")}</td>
                    <td className="p-2">{human(row.vat_review_status ?? "pending_review")}</td>
                    <td className="p-2 text-brand-coral">{row.warnings?.length ? row.warnings.map((warning) => <div key={warning}>{warningCopy(warning)}</div>) : "—"}</td>
                    <td className="p-2">
                      {viewer?.canWriteFinance && (
                        <div className="flex flex-wrap gap-1">
                          <button type="button" className={input} onClick={() => edit(row)}>
                            Edit
                          </button>
                          <button type="button" className={input} onClick={() => void duplicate(row)}>
                            Duplicate
                          </button>
                          <button type="button" className={input} onClick={() => void archive(row)}>
                            Archive
                          </button>
                          {viewer.isFounderAdmin && (
                            <button type="button" className={input} onClick={() => setEvidenceTarget(expenseEvidenceTarget(row))}>
                              Upload evidence
                            </button>
                          )}
                          {viewer.isFounderAdmin && row.evidence_files?.length > 0 && (
                            <button type="button" className={input} onClick={() => setEvidenceTarget(expenseEvidenceTarget(row))}>
                              View evidence
                            </button>
                          )}
                          {viewer.isFounderAdmin &&
                            (row.adjustments ?? []).map((adjustment) => (
                              <div className="basis-full rounded-lg border border-border p-2 text-xs" key={adjustment.id}>
                                <div>
                                  Refund {safeApiDateValue(adjustment.adjustment_date)} · £{String(adjustment.gbp_gross_amount ?? adjustment.gross_amount ?? "—")}
                                  {adjustment.supplier_reference ? ` · ${adjustment.supplier_reference}` : ""}
                                </div>
                                <div className="mt-1 flex flex-wrap gap-1">
                                  <button type="button" className={input} onClick={() => setEvidenceTarget(adjustmentEvidenceTarget(row, adjustment))}>
                                    Upload refund evidence
                                  </button>
                                  {adjustment.evidence_files?.length > 0 && (
                                    <button type="button" className={input} onClick={() => setEvidenceTarget(adjustmentEvidenceTarget(row, adjustment))}>
                                      View refund evidence
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!filteredRows.length && <p className="p-6 text-center text-muted-foreground">No VAT ledger records match these filters.</p>}
        </div>
      </Surface>
      <VatEvidenceUploadDialog
        target={evidenceTarget}
        onClose={() => setEvidenceTarget(null)}
        onLinked={async () => {
          await load();
        }}
      />
    </div>
  );
}
