export const QUICKFILE_PURCHASE_PROFILE="quickfile_purchase_csv_v1" as const;
export const PAYMENT_MAPPING_KEYS=["founder_director_funded","paypal","personal_credit_card","company_credit_card","business_bank","other"] as const;
export type PaymentMappingKey=(typeof PAYMENT_MAPPING_KEYS)[number];
export type AccountingExportConfig={
  status?:"success";export_type:"mtd_accounting";profile:typeof QUICKFILE_PURCHASE_PROFILE;
  category_nominal_codes:Record<string,string>;payment_account_nominal_codes:Partial<Record<PaymentMappingKey,string>>;
  source:"database"|"environment"|"none";confirmed:boolean;confirmed_at:string|null;updated_at:string|null;version:number;
};
export type AccountingExportConfigInput={profile:typeof QUICKFILE_PURCHASE_PROFILE;category_nominal_codes:Record<string,string>;payment_account_nominal_codes:Partial<Record<PaymentMappingKey,string>>;confirm:boolean;expected_version:number;change_reason:string};
export type ManualAdjustment={adjustment_id:string;parent_expense_id:string;expense_id?:string|null;reason:string;amount?:string|number|null;gbp_gross_amount?:string|number|null;adjustment_date?:string|null;reference?:string|null;supplier_reference?:string|null};
export type AccountingExportBlockerDetail={code:string;expense_id:string;message?:string;stored_vat_period_id?:string;effective_tax_point_date?:string;date_derived_vat_period_id?:string|null;date_derived_vat_period_source?:"derived"|"none"|"conflict";date_derived_matching_period_ids?:string[]};
export type AccountingExportValidation={
  export_type:"mtd_accounting";profile:typeof QUICKFILE_PURCHASE_PROFILE;validation_mode:"dry_run";generated_at:string;
  vat_period:Record<string,unknown>;eligible_row_count:number;blocked_row_count:number;excluded_row_count:number;blocked_expense_ids:string[];excluded_expense_ids:string[];
  blocking_reasons:Record<string,string[]>;blocking_details?:Record<string,AccountingExportBlockerDetail[]>;exclusion_reasons:Record<string,string[]>;mapping_config_source:"database"|"environment"|"none";mapping_config_confirmed:boolean;
  mapping_config_version:number;mapped_nominal_codes:Record<string,string>;missing_nominal_mappings:string[];
  payment_account_mappings:Record<string,string>;unmapped_payment_sources:string[];
  adjustment_handling:{strategy:string;manual_adjustment_count:number;items:ManualAdjustment[]};
  expected_csv_headings:string[];source_ledger_fingerprint:string;
};
