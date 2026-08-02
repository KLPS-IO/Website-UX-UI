import { formatDateOnlyUk } from "./safe-date.ts";
import type { VatLedgerRow, VatPeriod } from "../types/vat-ledger.ts";

export type VatLedgerFilters = { supplier: string; reviewStatus: string; evidenceStatus: string };

export const EVIDENCE_FILTERS = ["no_evidence","payment_evidence_only","supplier_document_only","supplier_document_plus_payment_evidence","vat_invoice_present","refund_or_credit_adjustment_present","requires_review"] as const;

export function formatVatPeriodLabel(period?: Pick<VatPeriod, "start_date" | "end_date"> | null): string {
  if (!period) return "Not confirmed";
  const start = formatDateOnlyUk(period.start_date, ""), end = formatDateOnlyUk(period.end_date, "");
  return start && end ? `${start} to ${end}` : "Not confirmed";
}

export function filterVatLedgerRows(rows: VatLedgerRow[], filters: VatLedgerFilters): VatLedgerRow[] {
  const supplier = filters.supplier.trim().toLocaleLowerCase("en-GB");
  return rows.filter((row) => (!supplier || (row.supplier_name ?? "").toLocaleLowerCase("en-GB").includes(supplier)) && (!filters.reviewStatus || (row.vat_review_status ?? "pending_review") === filters.reviewStatus) && (!filters.evidenceStatus || row.evidence_coverage === filters.evidenceStatus));
}

export function vatPeriodDisplay(row: Pick<VatLedgerRow,"vat_period_start"|"vat_period_end"|"vat_period_source">): {label:string;detail:string} {
  const label=row.vat_period_start&&row.vat_period_end?formatVatPeriodLabel({start_date:row.vat_period_start,end_date:row.vat_period_end}):"Not assigned";
  const detail=row.vat_period_source==="derived"?"Date-derived · not explicitly confirmed":row.vat_period_source?row.vat_period_source.replaceAll("_"," "):"none";
  return{label,detail};
}

export function foreignCurrencyWarning(input: {currency?:string|null;gross_amount?:unknown;exchange_rate?:unknown;gbp_net_amount?:unknown;gbp_vat_amount?:unknown;gbp_gross_amount?:unknown;notes?:string|null}): string | null {
  if ((input.currency ?? "GBP").trim().toUpperCase() === "GBP") return null;
  const finite = (value: unknown) => value !== "" && value !== null && value !== undefined && Number.isFinite(Number(value));
  const completeGbp = [input.gbp_net_amount,input.gbp_vat_amount,input.gbp_gross_amount].every(finite);
  const balancedGbp = completeGbp && Math.abs(Number(input.gbp_net_amount) + Number(input.gbp_vat_amount) - Number(input.gbp_gross_amount)) <= 0.01;
  const hasRateConversion = Number(input.exchange_rate) > 0 && finite(input.gross_amount) && completeGbp;
  const hasManualConversion = balancedGbp && Boolean(input.notes?.trim());
  return hasRateConversion || hasManualConversion ? null : "Add an exchange rate and source gross amount, or all GBP values with a review note.";
}

export async function authoritativeRowsAfterMutation<T>(mutation:()=>Promise<unknown>,refetch:()=>Promise<{transactions:T[]}>):Promise<T[]> {
  await mutation();
  return (await refetch()).transactions;
}

export function calculatedGbpGross(grossAmount: unknown, exchangeRate: unknown): string {
  const gross=Number(grossAmount),rate=Number(exchangeRate);
  return gross>=0&&rate>0&&Number.isFinite(gross)&&Number.isFinite(rate)?(gross*rate).toFixed(2):"";
}

export const warningCopy = (warning:string) => ({pending_vat_treatment:"VAT treatment has not been reviewed.",foreign_currency_without_conversion:"Foreign-currency conversion data is incomplete.",gross_net_vat_mismatch:"Net plus VAT does not match gross.",no_supplier_invoice:"Supplier invoice is missing.",payment_evidence_missing:"Payment evidence is missing.",vat_period_conflict:"The tax-point date matches more than one VAT period."}[warning] ?? warning.replaceAll("_"," "));
