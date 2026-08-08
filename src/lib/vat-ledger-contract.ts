import type { VatEvidenceFile, VatExpenseAdjustment, VatLedgerRow } from "../types/vat-ledger.ts";

type JsonRecord = Record<string, unknown>;
const record = (value: unknown): JsonRecord => value !== null && typeof value === "object" && !Array.isArray(value) ? value as JsonRecord : {};
const records = (value: unknown): JsonRecord[] => Array.isArray(value) ? value.map(record).filter((item) => Object.keys(item).length > 0) : [];
const strings = (value: unknown): string[] => Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
const optionalString = (value: unknown): string | null => typeof value === "string" ? value : null;

const evidenceFile = (value: JsonRecord): VatEvidenceFile => ({
  id: typeof value.id === "string" ? value.id : "",
  filename: optionalString(value.filename),
  type: optionalString(value.type),
  verification_status: optionalString(value.verification_status),
  document_status: optionalString(value.document_status),
});

const adjustment = (value: JsonRecord): VatExpenseAdjustment => ({
  ...value,
  id: typeof value.id === "string" ? value.id : "",
  adjustment_type: optionalString(value.adjustment_type),
  adjustment_date: optionalString(value.adjustment_date),
  currency: optionalString(value.currency),
  supplier_reference: optionalString(value.supplier_reference),
  reason: optionalString(value.reason),
  review_status: optionalString(value.review_status),
  parent_order_reference: optionalString(value.parent_order_reference),
  parent_invoice_number: optionalString(value.parent_invoice_number),
  evidence_files: records(value.evidence_files).map(evidenceFile),
} as VatExpenseAdjustment);

const malformedFields = (value: JsonRecord): string[] => {
  const fields = ["warnings", "evidence_files", "adjustments"].filter((field) => !Array.isArray(value[field]));
  records(value.adjustments).forEach((item, index) => { if (!Array.isArray(item.evidence_files)) fields.push(`adjustments[${index}].evidence_files`); });
  return fields;
};

export function normalizeVatLedgerRow(value: unknown): VatLedgerRow {
  const source = record(value), malformed = malformedFields(source);
  if (import.meta.env?.DEV && malformed.length) console.warn("VAT ledger record normalized", { record_id: typeof source.id === "string" ? source.id : "unknown", fields: malformed });
  return {
    ...source,
    id: typeof source.id === "string" ? source.id : "",
    name: optionalString(source.name),
    supplier_name: optionalString(source.supplier_name),
    description: optionalString(source.description),
    category: optionalString(source.category),
    currency: optionalString(source.currency),
    reimbursement_status: optionalString(source.reimbursement_status),
    evidence_status: optionalString(source.evidence_status),
    notes: optionalString(source.notes),
    evidence_files: records(source.evidence_files).map(evidenceFile),
    adjustments: records(source.adjustments).map(adjustment),
    warnings: strings(source.warnings),
    warning_details: Array.isArray(source.warning_details) ? source.warning_details : [],
  } as VatLedgerRow;
}

export const normalizeVatLedgerRows = (value: unknown): VatLedgerRow[] => Array.isArray(value) ? value.map(normalizeVatLedgerRow) : [];
