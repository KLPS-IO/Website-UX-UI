import { formatDateOnlyUk } from "./safe-date.ts";
import type { VatLedgerRow, VatPeriod, VatWarningDetail } from "../types/vat-ledger.ts";

export type VatLedgerFilters = { supplier: string; reviewStatus: string; evidenceStatus: string };
export type VatEntryDraft={payment_date:string;invoice_date:string;supplier_name:string;gross_amount:string;description:string;currency:string;exchange_rate:string;gbp_net_amount:string;gbp_vat_amount:string;gbp_gross_amount:string;vat_rate:string;notes:string;vat_treatment:string;vat_review_status:string;vat_period_id:string};

const EMPTY_VAT_ENTRY:VatEntryDraft={payment_date:"",invoice_date:"",supplier_name:"",gross_amount:"",description:"",currency:"GBP",exchange_rate:"",gbp_net_amount:"",gbp_vat_amount:"",gbp_gross_amount:"",vat_rate:"",notes:"",vat_treatment:"pending_review",vat_review_status:"pending_review",vat_period_id:""};

export const hasUnsavedVatEntry=(entry:VatEntryDraft)=>Object.keys(EMPTY_VAT_ENTRY).some(key=>entry[key as keyof VatEntryDraft]!==EMPTY_VAT_ENTRY[key as keyof VatEntryDraft]);

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

export function vatRateRatioToPercent(value: unknown): string {
  if (value === null || value === undefined || value === "") return "";
  const ratio=Number(value);
  return Number.isFinite(ratio)&&ratio>=0&&ratio<=1?String(ratio*100):"";
}

export function vatRatePercentToRatio(value: unknown): string | null {
  if (value === null || value === undefined || value === "") return null;
  const percent=Number(value);
  if(!Number.isFinite(percent)||percent<0||percent>100)throw new Error("VAT rate must be between 0 and 100%.");
  return String(percent/100);
}

export const warningCopy = (warning:string) => ({pending_vat_treatment:"VAT treatment has not been reviewed.",foreign_currency_without_conversion:"Foreign-currency conversion data is incomplete.",gross_net_vat_mismatch:"Net plus VAT does not match gross.",no_supplier_invoice:"Supplier invoice is missing.",payment_evidence_missing:"Payment evidence is missing.",vat_period_conflict:"The tax-point date matches more than one VAT period."}[warning] ?? warning.replaceAll("_"," "));
export type VatReviewStatus="pending_review"|"in_review"|"ready_for_review"|"review_complete";
export const allowedVatReviewStatuses=(current:string|null|undefined):VatReviewStatus[]=>current==="ready_for_review"||current==="review_complete"?["in_review","ready_for_review","review_complete"]:["pending_review","in_review","ready_for_review"];
export const warningSeverityCopy=(severity:VatWarningDetail["severity"])=>severity==="critical"?"Critical":severity==="review_required"?"Review required":"Advisory";
export const vatReviewNextAction=(row:Pick<VatLedgerRow,"vat_review_status"|"warning_details">)=>{
  const issue=row.warning_details?.find(item=>item.severity==="critical")??row.warning_details?.find(item=>item.severity==="review_required");
  if(issue)return issue.message;
  if(row.vat_review_status==="ready_for_review")return"Accounting checks passed. Mark review complete after final review.";
  if(row.vat_review_status==="review_complete")return"Review complete. Resolve advisories when practical.";
  return"Complete the accounting fields and VAT invoice evidence, then move to Ready for review.";
};
export const vatSaveErrorMessage=(error:unknown)=>{
  if(!error||typeof error!=="object"||!("code" in error)||(error as {code?:unknown}).code!=="vat_review_blocked")return error instanceof Error?error.message:"Expense could not be saved";
  const payload=(error as {payload?:Record<string,unknown>}).payload;
  const details=payload?.details;
  const issues=details&&typeof details==="object"&&Array.isArray((details as {issues?:unknown}).issues)?(details as {issues:Array<{message?:unknown}>}).issues:[];
  const messages=issues.map(issue=>typeof issue?.message==="string"?issue.message:"").filter(Boolean);
  const heading=error instanceof Error?error.message:"VAT review status could not be changed";
  return messages.length?`${heading}:\n${messages.map(message=>`- ${message}`).join("\n")}`:heading;
};
