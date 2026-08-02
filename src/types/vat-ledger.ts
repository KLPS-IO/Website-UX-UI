import type { MoneyDto } from "./expense";

export type VatPeriod={id:string;start_date:string;end_date:string;filing_deadline:string|null;status:string;overdue:boolean;review_status:string;locked_at:string|null};
export type VatLedgerRow={
  id:string;name:string;supplier_name:string|null;description?:string|null;category:string;transaction_date:string|null;invoice_date?:string|null;payment_date?:string|null;
  currency:string;net_amount:MoneyDto;vat_amount:MoneyDto;gross_amount:MoneyDto;gbp_net_amount?:MoneyDto;gbp_vat_amount?:MoneyDto;gbp_gross_amount?:MoneyDto;
  vat_rate:MoneyDto;vat_treatment?:string|null;business_use_percentage?:MoneyDto;recoverable_vat_amount?:MoneyDto;founder_paid?:boolean|null;
  supplier_country?:string|null;supplier_vat_number?:string|null;invoice_number?:string|null;order_reference?:string|null;payment_method?:string|null;payment_source?:string|null;
  reimbursement_status:string|null;evidence_status:string;vat_review_status?:string|null;vat_period_id?:string|null;stored_vat_period_id?:string|null;effective_vat_period_id?:string|null;vat_period_source?:"explicit"|"derived"|"none"|"conflict";effective_tax_point_date?:string|null;vat_period_start?:string|null;vat_period_end?:string|null;
  exchange_rate?:MoneyDto;
  evidence_files:Array<{id:string;filename:string|null;type:string|null}>;evidence_coverage?:string;warnings:string[];notes:string|null;created_at:string;updated_at:string;
};
export type HistoricalExpenseInput=Partial<VatLedgerRow>&{payment_date:string;supplier_name:string;gross_amount:string;change_reason?:string};
export type VatPeriodSuggestion=(VatPeriod&{vat_period_source:"derived";effective_tax_point_date:string})|{id:null;vat_period_source:"conflict";effective_tax_point_date:string;matching_period_ids:string[]};
