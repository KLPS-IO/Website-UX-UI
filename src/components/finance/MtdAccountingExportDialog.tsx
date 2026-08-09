import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Download, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ApiError } from "@/lib/authenticated-api";
import { blockingReasonCopy, canGenerateAccountingExport, cleanMappings, configStateCopy, manualAdjustmentParentReference, paymentLabels, safeAccountingExportFilename, shortReference } from "@/lib/accounting-export";
import { accountingExportRepository } from "@/repositories/accountingExportRepository";
import { PAYMENT_MAPPING_KEYS, QUICKFILE_PURCHASE_PROFILE, type AccountingExportConfig, type AccountingExportValidation } from "@/types/accounting-export";
import type { VatLedgerRow, VatPeriod } from "@/types/vat-ledger";
import { formatVatPeriodLabel, vatPeriodDateConflictDisplay } from "@/lib/vat-ledger-ui";
import { safeApiDateValue } from "@/lib/safe-date";

const control = "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition hover:border-[#ef9f32] disabled:cursor-not-allowed disabled:!bg-slate-100 disabled:!text-slate-500 disabled:opacity-100";
const primary = "rounded-lg border border-[#d97f13] !bg-[#ef9f32] px-4 py-2 text-sm font-semibold !text-white shadow-sm transition hover:!bg-[#d97f13] disabled:cursor-not-allowed disabled:!border-slate-300 disabled:!bg-slate-200 disabled:!text-slate-600 disabled:opacity-100";
type MappingRow = { key: string; value: string };
const rowsFor = (map: Record<string, string>, categories: string[] = []) => [...new Set([...Object.keys(map), ...categories.filter(Boolean)])].sort().map((key) => ({ key, value: map[key] ?? "" }));
const errorCopy = (error: unknown) => (error instanceof ApiError ? (error.status === 401 || error.status === 403 ? "Only a founder-admin can use MTD Accounting Export." : error.code === "accounting_export_source_changed" ? "Financial records changed after validation. Validate the export again." : error.code === "accounting_export_config_unconfirmed" ? "Confirm the founder-reviewed mappings before downloading." : error.code === "accounting_export_config_missing" ? "Accounting mappings must be configured before downloading." : error.message) : error instanceof Error ? error.message : "The accounting export request failed.");

export function MtdAccountingExportDialog({ open, onOpenChange, period, periods, rows, onEdit }: { open: boolean; onOpenChange: (open: boolean) => void; period: VatPeriod | undefined; periods: VatPeriod[]; rows: VatLedgerRow[]; onEdit: (row: VatLedgerRow) => void }) {
  const [config, setConfig] = useState<AccountingExportConfig | null>(null),
    [categories, setCategories] = useState<MappingRow[]>([]);
  const [payments, setPayments] = useState<Record<string, string>>({}),
    [changeReason, setChangeReason] = useState("Configured for first VAT return");
  const [validation, setValidation] = useState<AccountingExportValidation | null>(null),
    [stale, setStale] = useState(false);
  const [loading, setLoading] = useState(false),
    [message, setMessage] = useState(""),
    [error, setError] = useState(""),
    [editable, setEditable] = useState(false);
  const [selectedPeriodId, setSelectedPeriodId] = useState("");
  const selectedPeriod = periods.find((item) => item.id === selectedPeriodId);
  const periodCategories = useMemo(() => [...new Set(rows.map((row) => row.category).filter(Boolean))], [rows]);
  const periodCategoriesRef = useRef(periodCategories);
  periodCategoriesRef.current = periodCategories;
  const ledgerVersion = useMemo(() => rows.map((row) => `${row.id}:${row.updated_at}:${row.vat_review_status}:${row.supplier_document_review_status}:${row.evidence_status}:${(row.evidence_files ?? []).map((item) => item.id).join(",")}:${(row.adjustments ?? []).map((item) => `${item.id}:${item.review_status}:${(item.evidence_files ?? []).map((file) => file.id).join(",")}`).join(";")}`).join("|"), [rows]);
  const previousLedgerVersion = useRef(ledgerVersion);
  const hydrate = useCallback((next: AccountingExportConfig) => {
    setConfig(next);
    setCategories(rowsFor(next.category_nominal_codes, periodCategoriesRef.current));
    setPayments(next.payment_account_nominal_codes);
    setEditable(next.source !== "environment");
  }, []);
  const fetchConfig = useCallback(
    async (preserveDraft = false) => {
      const next = await accountingExportRepository.config();
      setConfig(next);
      if (!preserveDraft) hydrate(next);
      return next;
    },
    [hydrate],
  );
  useEffect(() => {
    if (!open) return;
    setSelectedPeriodId(period?.id ?? "");
    setError("");
    setMessage("");
    setValidation(null);
    setStale(false);
    setLoading(true);
    void fetchConfig()
      .catch((e) => setError(errorCopy(e)))
      .finally(() => setLoading(false));
  }, [open, period?.id, fetchConfig]);
  useEffect(() => {
    setValidation(null);
    setStale(false);
    setMessage("");
  }, [selectedPeriodId]);
  useEffect(() => {
    if (previousLedgerVersion.current !== ledgerVersion) {
      previousLedgerVersion.current = ledgerVersion;
      if (validation) {
        setStale(true);
        setMessage("");
      }
    }
  }, [ledgerVersion, validation]);
  const invalidate = () => {
    if (validation) setStale(true);
    setMessage("");
  };
  const setCategory = (index: number, field: keyof MappingRow, value: string) => {
    setCategories((current) => current.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
    invalidate();
  };
  const setPayment = (key: string, value: string) => {
    setPayments((current) => ({ ...current, [key]: value }));
    invalidate();
  };
  const saveConfig = async (confirm: boolean) => {
    if (!config || !changeReason.trim()) {
      setError("Enter a change reason before saving mappings.");
      return;
    }
    if (confirm && !window.confirm("Confirm that you have reviewed these nominal codes? Financial OS does not verify them with QuickFile.")) return;
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const next = await accountingExportRepository.saveConfig({
        profile: QUICKFILE_PURCHASE_PROFILE,
        category_nominal_codes: cleanMappings(categories),
        payment_account_nominal_codes: cleanMappings(
          PAYMENT_MAPPING_KEYS.map((key) => ({
            key,
            value: payments[key] ?? "",
          })),
        ),
        confirm,
        expected_version: config.version,
        change_reason: changeReason.trim(),
      });
      hydrate(next);
      setChangeReason("Configured for first VAT return");
      setValidation(null);
      setStale(false);
      setMessage(confirm ? "Mappings confirmed after founder review." : "Mapping draft saved. Confirm it before downloading.");
    } catch (e) {
      if (e instanceof ApiError && e.code === "accounting_export_config_version_conflict") {
        setError("A newer mapping configuration exists. It has been refreshed; your unsaved entries are preserved. Review them before saving again.");
        try {
          await fetchConfig(true);
        } catch (refreshError) {
          setError(`${errorCopy(e)} ${errorCopy(refreshError)}`);
        }
      } else setError(errorCopy(e));
    } finally {
      setLoading(false);
    }
  };
  const validate = async () => {
    if (!selectedPeriod) {
      setError("Select a VAT period before validating transactions.");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const latest = await fetchConfig(true);
      const result = await accountingExportRepository.validate(selectedPeriod.id);
      setConfig(latest);
      setValidation(result.validation);
      setStale(false);
      setMessage(result.validation.blocked_row_count ? "Validation completed with blocked transactions." : "Validation passed against the current Financial OS records.");
    } catch (e) {
      setError(errorCopy(e));
      setValidation(null);
    } finally {
      setLoading(false);
    }
  };
  const download = async () => {
    if (!selectedPeriod || !validation || !canGenerateAccountingExport(config, validation, stale)) return;
    setLoading(true);
    setError("");
    try {
      const blob = await accountingExportRepository.generate(selectedPeriod.id, validation.source_ledger_fingerprint);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = safeAccountingExportFilename(selectedPeriod);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      setMessage("Accounting import file generated. This has not been submitted to HMRC.");
    } catch (e) {
      if (e instanceof ApiError && e.code === "accounting_export_source_changed") setStale(true);
      setError(errorCopy(e));
    } finally {
      setLoading(false);
    }
  };
  const blocked =
    validation?.blocked_expense_ids.map((id) => ({
      id,
      row: rows.find((item) => item.id === id),
      reasons: validation.blocking_reasons[id] ?? [],
    })) ?? [];
  const excluded = validation?.excluded_expense_ids.map((id)=>({id,row:rows.find((item)=>item.id===id),reasons:validation.exclusion_reasons[id]??[]}))??[];
  const categoryInvalid = categories.some((row) => !row.key.trim() || !row.value.trim());
  const validationDisabledReason = !selectedPeriod ? "Select a VAT period first." : loading ? "Configuration is still loading." : !config ? "The selected export profile is unavailable." : null;
  const generationReasons = [config?.source === "database" && !config.confirmed ? "Mapping configuration is still a draft." : null, config?.source === "none" ? "Confirm accounting mappings before generation." : null, !validation ? "Validate transactions first." : validation && validation.blocked_row_count > 0 ? `${validation.blocked_row_count} transactions remain blocked.` : null, stale ? "Financial records changed after validation." : null].filter((value): value is string => Boolean(value));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>MTD Accounting Export</DialogTitle>
          <DialogDescription>Generate a reviewed accounting-import CSV for compatible VAT accounting software. Financial OS remains the source of truth. This does not submit a VAT return to HMRC.</DialogDescription>
        </DialogHeader>
        {error && (
          <div role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-900">
            {error}
          </div>
        )}
        {message && (
          <div role="status" className="rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-900">
            {message}
          </div>
        )}
        <label className="block text-sm">
          VAT period
          <select aria-label="MTD VAT period" className={`${control} mt-1 w-full`} value={selectedPeriodId} onChange={(event) => setSelectedPeriodId(event.target.value)}>
            <option value="">Select a VAT period</option>
            {periods.map((item) => (
              <option key={item.id} value={item.id}>
                {formatVatPeriodLabel(item)}
              </option>
            ))}
          </select>
        </label>
        <dl className="grid gap-3 rounded-lg border border-border p-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-muted-foreground">Selected VAT period</dt>
            <dd className="font-medium">{selectedPeriod ? formatVatPeriodLabel(selectedPeriod) : "Select a VAT period"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Export profile</dt>
            <dd className="font-medium">QuickFile purchase CSV</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Configuration</dt>
            <dd className="font-medium">{configStateCopy(config)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Configuration source / version</dt>
            <dd>{config ? `${config.source} / ${config.version}` : "—"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Last confirmed</dt>
            <dd>{config?.confirmed_at ? new Date(config.confirmed_at).toLocaleString() : "—"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Eligible transactions</dt>
            <dd>{validation?.eligible_row_count ?? "Not validated"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Blocked transactions</dt>
            <dd>{validation?.blocked_row_count ?? "Not validated"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Intentionally excluded</dt>
            <dd>{validation?.excluded_row_count ?? "Not validated"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Manual adjustments</dt>
            <dd>{validation?.adjustment_handling.manual_adjustment_count ?? "Not validated"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Fingerprint status</dt>
            <dd>{validation ? (stale ? "Stale — revalidation required" : "Current") : `Not validated`}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Last validation</dt>
            <dd>{validation ? new Date(validation.generated_at).toLocaleString() : "—"}</dd>
          </div>
        </dl>
        <section className="space-y-4">
          <div>
            <h3 className="font-semibold">Accounting mappings</h3>
            <p className="text-sm text-muted-foreground">Enter the nominal codes from your accounting software. Financial OS does not verify these codes with QuickFile.</p>
          </div>
          {config?.source === "environment" && !editable && (
            <div className="space-y-3">
              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold">Purchase category mappings</h4>
                  {Object.entries(config.category_nominal_codes).map(([key, value]) => (
                    <p key={key}>
                      {key}: <span className="font-mono">{value}</span>
                    </p>
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold">Payment-source mappings</h4>
                  {Object.entries(config.payment_account_nominal_codes).map(([key, value]) => (
                    <p key={key}>
                      {paymentLabels[key as keyof typeof paymentLabels] ?? key}: <span className="font-mono">{value}</span>
                    </p>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className={control}
                onClick={() => {
                  setEditable(true);
                  invalidate();
                }}
              >
                Use as editable draft
              </button>
            </div>
          )}
          {editable && (
            <>
              <div>
                <h4 className="mb-2 text-sm font-semibold">Purchase category mappings</h4>
                <div className="space-y-2">
                  {categories.map((row, index) => (
                    <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]" key={index}>
                      <input aria-label={`Financial OS category ${index + 1}`} className={control} placeholder="Financial OS category" value={row.key} onChange={(event) => setCategory(index, "key", event.target.value)} />
                      <input aria-label={`Purchase nominal code ${row.key || index + 1}`} className={control} placeholder="Accounting purchase nominal code" value={row.value} onChange={(event) => setCategory(index, "value", event.target.value)} />
                      <button
                        aria-label={`Remove category mapping ${row.key || index + 1}`}
                        type="button"
                        className={control}
                        onClick={() => {
                          setCategories((current) => current.filter((_, i) => i !== index));
                          invalidate();
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className={control}
                    onClick={() => {
                      setCategories((current) => [...current, { key: "", value: "" }]);
                      invalidate();
                    }}
                  >
                    <Plus className="mr-2 inline h-4 w-4" />
                    Add category
                  </button>
                  {categoryInvalid && <p className="text-sm text-brand-coral">Complete or remove empty mapping rows before saving.</p>}
                </div>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold">Payment-source mappings</h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {PAYMENT_MAPPING_KEYS.map((key) => (
                    <label className="text-sm" key={key}>
                      {paymentLabels[key]}
                      <input className={`${control} mt-1 w-full`} value={payments[key] ?? ""} placeholder="Unmapped" onChange={(event) => setPayment(key, event.target.value)} />
                    </label>
                  ))}
                </div>
              </div>
              <label className="block text-sm">
                Change reason
                <input className={`${control} mt-1 w-full`} value={changeReason} placeholder="Configured for first VAT return" onChange={(event) => setChangeReason(event.target.value)} />
              </label>
              <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:flex-wrap sm:items-center">
                <button type="button" className={`${control} w-full sm:w-auto`} disabled={loading || categoryInvalid} onClick={() => void saveConfig(false)}>
                  Save mapping draft
                </button>
                <button
                  type="button"
                  className={`${control} w-full sm:w-auto`}
                  disabled={loading}
                  onClick={() => {
                    if (config) hydrate(config);
                    setChangeReason("Configured for first VAT return");
                    setValidation(null);
                    setStale(false);
                    setMessage("Unsaved mapping changes discarded.");
                  }}
                >
                  Discard unsaved changes
                </button>
                <button type="button" className={`${primary} w-full sm:ml-auto sm:w-auto`} disabled={loading || categoryInvalid} onClick={() => void saveConfig(true)}>
                  Confirm mappings
                </button>
              </div>
            </>
          )}
        </section>
        {validation && (
          <section className="space-y-3">
            <h3 className="font-semibold">Validation review</h3>
            {validation.missing_nominal_mappings.length > 0 && <p className="text-sm text-brand-coral">Missing purchase mappings: {validation.missing_nominal_mappings.join(", ")}</p>}
            {validation.unmapped_payment_sources.length > 0 && <p className="text-sm text-brand-coral">Missing payment mappings: {validation.unmapped_payment_sources.map((source) => paymentLabels[source as keyof typeof paymentLabels] ?? source).join(", ")}</p>}
            {blocked.map((item) => (
              <div className="rounded-lg border border-border p-3 text-sm" key={item.id}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong>{item.row?.supplier_name || "Supplier unavailable"}</strong>
                  <span>
                    {safeApiDateValue(item.row?.effective_tax_point_date ?? item.row?.transaction_date) || "No tax date"} · £{String(item.row?.gbp_gross_amount ?? item.row?.gross_amount ?? "—")} · {shortReference(item.id)}
                  </span>
                  {item.row && (
                    <button
                      type="button"
                      className="underline"
                      onClick={() => {
                        onEdit(item.row!);
                        onOpenChange(false);
                      }}
                    >
                      Edit transaction
                    </button>
                  )}
                </div>
                <ul className="mt-2 list-disc pl-5">
                  {item.reasons.map((reason) => (
                    <li key={reason}>{blockingReasonCopy(reason)}</li>
                  ))}
                </ul>
                {item.reasons.includes("vat_period_date_conflict")&&item.row&&(()=>{const conflict=vatPeriodDateConflictDisplay(item.row,periods);return conflict?<div className="mt-3 rounded-lg border border-red-300 bg-red-50 p-3 text-red-900"><strong>VAT period conflict</strong><dl className="mt-2 grid gap-2 sm:grid-cols-3"><div><dt className="font-semibold">Stored VAT period</dt><dd>{conflict.storedPeriod}</dd></div><div><dt className="font-semibold">Effective tax point</dt><dd>{conflict.effectiveTaxPoint}</dd></div><div><dt className="font-semibold">Date-derived VAT period</dt><dd>{conflict.dateDerivedPeriod}</dd></div></dl><p className="mt-2 font-medium">Founder review required before accounting export.</p></div>:null;})()}
              </div>
            ))}
          </section>
        )}
        {validation && validation.adjustment_handling.manual_adjustment_count > 0 && (
          <section className="space-y-2">
            <h3 className="font-semibold">Manual adjustments required</h3>
            {validation.adjustment_handling.items.map((item) => (
              <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm" key={item.adjustment_id}>
                <strong>{item.reference || item.supplier_reference || shortReference(item.adjustment_id)}</strong>
                {(item.amount ?? item.gbp_gross_amount) != null && <span> · £{String(item.amount ?? item.gbp_gross_amount)}</span>}
                {item.adjustment_date && <span> · {safeApiDateValue(item.adjustment_date)}</span>}
                <p>Parent transaction {shortReference(manualAdjustmentParentReference(item))}. This must be entered or reviewed separately as a purchase credit/refund in QuickFile.</p>
                <p className="text-muted-foreground">{item.reason}</p>
              </div>
            ))}
          </section>
        )}
        {validation && excluded.length > 0 && <section className="space-y-2"><h3 className="font-semibold">Intentionally excluded transactions</h3>{excluded.map((item)=><div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm" key={item.id}><strong>{item.row?.supplier_name||"Supplier unavailable"}</strong><ul className="mt-2 list-disc pl-5">{item.reasons.map((reason)=><li key={reason}>{blockingReasonCopy(reason)}</li>)}</ul>{item.row&&<button type="button" className="mt-2 underline" onClick={()=>{onEdit(item.row!);onOpenChange(false);}}>Review transaction</button>}</div>)}</section>}
        {stale && <p className="text-sm font-medium text-brand-coral">Revalidate transactions before generating the accounting CSV.</p>}
        <section className="space-y-4 rounded-xl border border-slate-300 bg-slate-50 p-4 sm:p-5">
          <div>
            <h3 className="font-semibold text-slate-950">Create the accounting CSV</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">Complete these steps in order: confirm the mappings, validate the selected VAT period, then generate the CSV.</p>
          </div>
          {(validationDisabledReason || generationReasons.length > 0) && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950">
              <p className="font-semibold">Still required</p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                {validationDisabledReason && <li>{validationDisabledReason}</li>}
                {generationReasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" className={`${control} w-full sm:w-auto`} disabled={Boolean(validationDisabledReason)} onClick={() => void validate()}>
              Validate transactions
            </button>
            <button type="button" className={`${primary} w-full sm:w-auto`} disabled={loading || !canGenerateAccountingExport(config, validation, stale)} onClick={() => void download()}>
              <Download className="mr-2 inline h-4 w-4" />
              Generate accounting CSV
            </button>
          </div>
          <p className="text-sm leading-6 text-slate-600">After downloading, import the file in QuickFile using Account Settings → Data Import Wizard → Sales and purchase invoices → Purchase invoices. Review the import preview before saving.</p>
        </section>
      </DialogContent>
    </Dialog>
  );
}
