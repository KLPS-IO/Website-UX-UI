export type VatStatus = "Not Started" | "Applied" | "Approved" | "Rejected" | "Cancelled";
export type IcoStatus = "Not Started" | "Applied" | "Registered" | "Exempt" | "Cancelled";
export type SeisStatus = "Not Started" | "Preparing" | "Submitted" | "Approved" | "Rejected";
export type AdvanceAssuranceStatus = "Not Submitted" | "Submitted" | "Approved" | "Rejected";
export type BankStatus = "Not Opened" | "Application Started" | "Application Pending" | "Under Review" | "Open" | "Closed";
export type TaxStatus = "Unknown" | "Registered" | "Active" | "Dormant" | "Closed";
export type CompanyDataStatus = "Actual" | "Verified" | "Estimated" | "Unknown";
export type AccountingIntegrationStatus = "Not Started" | "Planned Integration" | "Connected";
export type CompanyMilestoneStatus = "Completed" | "In Progress";

export type CompanyMilestone = {
  id: string;
  title: string;
  status: CompanyMilestoneStatus;
};

export type RegisteredOffice = {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  region: string;
  postcode: string;
  country: string;
};

export type CompanyAuditFields = {
  createdAt: string | null;
  updatedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  version: number;
  changeReason: string;
};

export type CompanyRecord = CompanyAuditFields & {
  id: string;
  companyName: string;
  legalName: string;
  tradingName: string;
  companyNumber: string;
  companyType: string;
  companyStatus: "Active" | "Dissolved" | "Liquidation" | "Unknown";
  operatingStatus: "Pre-revenue" | "Revenue Generating" | "Unknown";
  industry: string[];
  country: string;
  incorporationDate: string;
  registeredOffice: RegisteredOffice;
  baseCurrency: string | null;
  financialYearEnd: string;
  firstAccountsPeriodEnd: string;
  firstAccountsFilingDeadline: string;
  founder: string;
  sicCodes: string[];
  vatStatus: VatStatus;
  vatRegistrationNumber: string | null;
  vatEffectiveDate: string | null;
  vatScheme: string | null;
  vatAccountingPeriodStart: string | null;
  vatAccountingPeriodEnd: string | null;
  vatLetterIssueDate: string | null;
  vatEvidenceIds: string[];
  vatEvidenceSource: string;
  vatLastReviewed: string | null;
  accountingMethod: string | null;
  externalAccountantStatus: "Appointed" | "Not Appointed" | "Unknown";
  accountingSoftware: string;
  accountingSoftwareStatus: AccountingIntegrationStatus;
  corporationTaxStatus: TaxStatus;
  icoStatus: IcoStatus;
  icoRegistrationNumber: string | null;
  seisStatus: SeisStatus;
  seisAdvanceAssuranceStatus: AdvanceAssuranceStatus;
  seisTargetSubmissionPeriod: string | null;
  seisDecisionDate: string | null;
  seisReferenceNumber: string | null;
  seisEvidenceIds: string[];
  seisOwner: string;
  seisSource: string;
  seisNotes: string;
  bankStatus: BankStatus;
  operatingBankName: string;
  businessBankAccount: string | null;
  bankBalance: number | null;
  trl: number | null;
  crl: number | null;
  currentRaiseAmount: number | null;
  fundraisingScheme: string;
  fundraisingStatus: string;
  legalPartner: string;
  legalPartnerStatus: "Introductory call scheduled";
  currentFundingSources: string[];
  futureRevenueSources: string[];
  milestones: CompanyMilestone[];
  dataStatus: CompanyDataStatus;
  evidenceIds: string[];
  confidence: number;
  source: string;
  owner: string;
  lastReviewed: string | null;
  notes: string;
};

export type CompanyHealthWarningCode =
  | "VAT_TAX_ACCOUNT_ACTION"
  | "VAT_RETURN_DEADLINE_ACTION"
  | "VAT_PAYMENT_SCHEDULE_ACTION"
  | "VAT_CERTIFICATE_ACTION"
  | "BANK_NOT_OPEN"
  | "ICO_INCOMPLETE"
  | "SEIS_NOT_SUBMITTED"
  | "TAX_STATUS_UNKNOWN"
  | "ACCOUNTING_METHOD_UNKNOWN"
  | "CRL_UNCONFIRMED"
  | "EVIDENCE_MISSING";

export type CompanyHealthWarning = {
  code: string;
  field: string;
  severity: "info" | "warning" | "error";
  message: string;
};

export type CompanyHealth = {
  warnings: CompanyHealthWarning[];
  completionPercentage: number;
  verifiedFieldCount: number;
  unknownFieldCount: number;
  complete: boolean;
};

export type CompanyOverview = CompanyHealth & {
  company: CompanyRecord;
};

/** Network DTO: field names intentionally match the canonical Company API. */
export interface CompanyDto {
  id: string;
  company_name?: string | null;
  legal_name: string;
  trading_name: string;
  company_number: string;
  company_type?: string | null;
  company_status: string;
  operating_status?: string | null;
  industry?: string[] | string | null;
  country?: string | null;
  incorporation_date?: string | null;
  registered_office?: Record<string, string | null> | null;
  registered_office_address_line_1?: string | null;
  registered_office_address_line_2?: string | null;
  registered_office_address_line_3?: string | null;
  registered_office_city?: string | null;
  registered_office_region?: string | null;
  registered_office_postcode?: string | null;
  registered_office_country?: string | null;
  base_currency?: string | null;
  financial_year_end?: string | null;
  first_accounts_period_end?: string | null;
  first_accounts_filing_deadline?: string | null;
  founder?: string | null;
  sic_codes?: string[] | null;
  vat_status?: string | null;
  vat_registration_number?: string | null;
  vat_effective_date?: string | null;
  vat_scheme?: string | null;
  vat_accounting_period_start?: string | null;
  vat_accounting_period_end?: string | null;
  vat_letter_issue_date?: string | null;
  vat_evidence_ids?: string[] | null;
  vat_evidence_source?: string | null;
  vat_last_reviewed?: string | null;
  accounting_method?: string | null;
  external_accountant_status?: string | null;
  accounting_software?: string | null;
  accounting_software_status?: string | null;
  corporation_tax_status?: string | null;
  ico_status?: string | null;
  ico_registration_number?: string | null;
  seis_status?: string | null;
  seis_advance_assurance_status?: string | null;
  seis_target_submission_period?: string | null;
  seis_decision_date?: string | null;
  seis_reference_number?: string | null;
  seis_evidence_ids?: string[] | null;
  seis_owner?: string | null;
  seis_source?: string | null;
  seis_notes?: string | null;
  business_bank_status?: string | null;
  operating_bank_name?: string | null;
  business_bank_account?: string | null;
  bank_balance?: number | null;
  trl?: number | null;
  crl?: number | null;
  current_raise_amount?: number | null;
  fundraising_scheme?: string | null;
  fundraising_status?: string | null;
  legal_partner?: string | null;
  legal_partner_status?: string | null;
  current_funding_sources?: string[] | null;
  future_revenue_sources?: string[] | null;
  milestones?: CompanyMilestone[] | null;
  data_status?: CompanyDataStatus | null;
  evidence_ids?: string[] | null;
  confidence?: number | null;
  source?: string | null;
  owner?: string | null;
  last_reviewed?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
  version: number;
  change_reason?: string | null;
  links?: unknown[];
}

export interface CompanyHealthDto {
  completion_percentage: number;
  verified_field_count: number;
  unknown_field_count: number;
  complete?: boolean;
  warnings: Array<{ code: string; severity: "info" | "warning" | "error"; field: string; message: string }>;
}

export interface CompanyVersionDto {
  version: number;
  change_reason: string | null;
  created_at: string;
  created_by: string | null;
  snapshot?: Partial<CompanyDto> | null;
}

export interface CompanyVersion {
  version: number;
  changeReason: string;
  createdAt: string;
  createdBy: string | null;
  snapshotSummary: string;
}

export type CompanyUpdatePayload = Partial<Omit<CompanyDto, "id" | "version" | "created_at" | "updated_at" | "created_by" | "updated_by" | "links">> & { change_reason: string };
