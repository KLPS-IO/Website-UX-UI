import type { MoneyDto } from "./expense";

export type VatPeriod={id:string;start_date:string;end_date:string;filing_deadline:string|null;status:string;overdue:boolean;review_status:string;locked_at:string|null};
export type SupplierDocumentReviewStatus="pending_review"|"vat_invoice_confirmed"|"supporting_document_accepted_no_vat_claim"|"alternative_vat_evidence_requires_specialist_review"|"insufficient_evidence_exclude_from_export";
export type VatLedgerRow={
  id:string;name:string|null;supplier_name:string|null;description?:string|null;category:string|null;transaction_date:string|null;invoice_date?:string|null;payment_date?:string|null;
  currency:string|null;net_amount:MoneyDto;vat_amount:MoneyDto;gross_amount:MoneyDto;gbp_net_amount?:MoneyDto;gbp_vat_amount?:MoneyDto;gbp_gross_amount?:MoneyDto;
  vat_rate:MoneyDto;vat_treatment?:string|null;supplier_document_review_status?:SupplierDocumentReviewStatus|null;business_use_percentage?:MoneyDto;recoverable_vat_amount?:MoneyDto;founder_paid?:boolean|null;
  supplier_country?:string|null;supplier_vat_number?:string|null;invoice_number?:string|null;order_reference?:string|null;payment_method?:string|null;payment_source?:string|null;
  reimbursement_status:string|null;evidence_status:string|null;vat_review_status?:string|null;vat_period_id?:string|null;stored_vat_period_id?:string|null;effective_vat_period_id?:string|null;vat_period_source?:"explicit"|"derived"|"none"|"conflict";effective_tax_point_date?:string|null;vat_period_start?:string|null;vat_period_end?:string|null;
  exchange_rate?:MoneyDto;
  evidence_files:Array<VatEvidenceFile>;adjustments?:VatExpenseAdjustment[];evidence_coverage?:string;warnings:string[];warning_details?:VatWarningDetail[];notes:string|null;created_at:string;updated_at:string;
};
export type VatWarningDetail={code:string;severity:"critical"|"review_required"|"advisory";message:string};
export type VatEvidenceFile={id:string;filename:string|null;type:string|null;verification_status?:string|null;document_status?:string|null};
export type VatExpenseAdjustment={id:string;adjustment_type:string|null;adjustment_date:string|null;gross_amount:MoneyDto;gbp_gross_amount:MoneyDto;currency:string|null;supplier_reference:string|null;reason:string|null;review_status:string|null;parent_order_reference:string|null;parent_invoice_number:string|null;evidence_files:VatEvidenceFile[]};
export type HistoricalExpenseInput=Partial<VatLedgerRow>&{transaction_date:string;supplier_name:string;gross_amount:string;change_reason?:string};
export type VatPeriodSuggestion=(VatPeriod&{vat_period_source:"derived";effective_tax_point_date:string})|{id:null;vat_period_source:"conflict";effective_tax_point_date:string;matching_period_ids:string[]};
