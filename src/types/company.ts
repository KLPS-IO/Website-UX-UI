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
  baseCurrency: "GBP";
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
  trl: number;
  crl: number | null;
  currentRaiseAmount: number;
  fundraisingScheme: "SEIS";
  fundraisingStatus: "Preparing HMRC Advance Assurance";
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
  code: CompanyHealthWarningCode;
  field: keyof CompanyRecord;
  severity: "info" | "warning";
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
