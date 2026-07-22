import type {
  AccountingIntegrationStatus, AdvanceAssuranceStatus, BankStatus, CompanyDto,
  CompanyHealth, CompanyHealthDto, CompanyRecord, CompanyVersion, CompanyVersionDto,
  IcoStatus, SeisStatus, TaxStatus, VatStatus,
} from "@/types/company";

const stringList = (value: string[] | string | null | undefined) =>
  Array.isArray(value) ? value : value ? value.split(",").map((item) => item.trim()).filter(Boolean) : [];
const text = (value: string | null | undefined) => value ?? "";

export function mapCompanyDto(dto: CompanyDto): CompanyRecord {
  const office = dto.registered_office ?? {};
  const officeValue = (key: string, direct?: string | null) => text(direct ?? office[key]);
  return {
    id: dto.id,
    companyName: text(dto.company_name ?? dto.trading_name),
    legalName: text(dto.legal_name), tradingName: text(dto.trading_name), companyNumber: text(dto.company_number),
    companyType: text(dto.company_type), companyStatus: dto.company_status as CompanyRecord["companyStatus"],
    operatingStatus: (dto.operating_status ?? "Unknown") as CompanyRecord["operatingStatus"],
    industry: stringList(dto.industry), country: text(dto.country), incorporationDate: text(dto.incorporation_date),
    registeredOffice: {
      addressLine1: officeValue("address_line_1", dto.registered_office_address_line_1),
      addressLine2: officeValue("address_line_2", dto.registered_office_address_line_2),
      addressLine3: officeValue("address_line_3", dto.registered_office_address_line_3),
      city: officeValue("city", dto.registered_office_city), region: officeValue("region", dto.registered_office_region),
      postcode: officeValue("postcode", dto.registered_office_postcode), country: officeValue("country", dto.registered_office_country),
    },
    baseCurrency: dto.base_currency ?? null, financialYearEnd: text(dto.financial_year_end),
    firstAccountsPeriodEnd: text(dto.first_accounts_period_end), firstAccountsFilingDeadline: text(dto.first_accounts_filing_deadline),
    founder: text(dto.founder), sicCodes: dto.sic_codes ?? [], vatStatus: (dto.vat_status ?? "Not Started") as VatStatus,
    vatRegistrationNumber: dto.vat_registration_number ?? null, vatEffectiveDate: dto.vat_effective_date ?? null,
    vatScheme: dto.vat_scheme ?? null, vatAccountingPeriodStart: dto.vat_accounting_period_start ?? null,
    vatAccountingPeriodEnd: dto.vat_accounting_period_end ?? null, vatLetterIssueDate: dto.vat_letter_issue_date ?? null,
    vatEvidenceIds: dto.vat_evidence_ids ?? [], vatEvidenceSource: text(dto.vat_evidence_source), vatLastReviewed: dto.vat_last_reviewed ?? null,
    accountingMethod: dto.accounting_method ?? null, externalAccountantStatus: (dto.external_accountant_status ?? "Unknown") as CompanyRecord["externalAccountantStatus"],
    accountingSoftware: text(dto.accounting_software), accountingSoftwareStatus: (dto.accounting_software_status ?? "Not Started") as AccountingIntegrationStatus,
    corporationTaxStatus: (dto.corporation_tax_status ?? "Unknown") as TaxStatus, icoStatus: (dto.ico_status ?? "Not Started") as IcoStatus,
    icoRegistrationNumber: dto.ico_registration_number ?? null, seisStatus: (dto.seis_status ?? "Not Started") as SeisStatus,
    seisAdvanceAssuranceStatus: (dto.seis_advance_assurance_status ?? "Not Submitted") as AdvanceAssuranceStatus,
    seisTargetSubmissionPeriod: dto.seis_target_submission_period ?? null, seisDecisionDate: dto.seis_decision_date ?? null,
    seisReferenceNumber: dto.seis_reference_number ?? null, seisEvidenceIds: dto.seis_evidence_ids ?? [], seisOwner: text(dto.seis_owner),
    seisSource: text(dto.seis_source), seisNotes: text(dto.seis_notes), bankStatus: (dto.business_bank_status ?? "Not Opened") as BankStatus,
    operatingBankName: text(dto.operating_bank_name), businessBankAccount: dto.business_bank_account ?? null, bankBalance: dto.bank_balance ?? null,
    trl: dto.trl ?? null, crl: dto.crl ?? null, currentRaiseAmount: dto.current_raise_amount ?? null,
    fundraisingScheme: text(dto.fundraising_scheme), fundraisingStatus: text(dto.fundraising_status), legalPartner: text(dto.legal_partner),
    legalPartnerStatus: text(dto.legal_partner_status) as CompanyRecord["legalPartnerStatus"], currentFundingSources: dto.current_funding_sources ?? [],
    futureRevenueSources: dto.future_revenue_sources ?? [], milestones: dto.milestones ?? [], dataStatus: dto.data_status ?? "Unknown",
    evidenceIds: dto.evidence_ids ?? [], confidence: dto.confidence ?? 0, source: text(dto.source), owner: text(dto.owner),
    lastReviewed: dto.last_reviewed ?? null, notes: text(dto.notes), createdAt: dto.created_at ?? null, updatedAt: dto.updated_at ?? null,
    createdBy: dto.created_by ?? null, updatedBy: dto.updated_by ?? null, version: dto.version, changeReason: text(dto.change_reason),
  };
}

export const mapCompanyHealthDto = (dto: CompanyHealthDto): CompanyHealth => ({
  completionPercentage: dto.completion_percentage,
  verifiedFieldCount: dto.verified_field_count,
  unknownFieldCount: dto.unknown_field_count,
  complete: dto.complete ?? false,
  warnings: dto.warnings.map((warning) => ({ ...warning })),
});

export const mapCompanyVersionDto = (dto: CompanyVersionDto): CompanyVersion => ({
  version: dto.version, changeReason: text(dto.change_reason), createdAt: dto.created_at, createdBy: dto.created_by,
  snapshotSummary: dto.snapshot
    ? [dto.snapshot.trading_name, dto.snapshot.company_status, dto.snapshot.vat_status].filter(Boolean).join(" · ") || "Snapshot recorded"
    : "Snapshot not included",
});

