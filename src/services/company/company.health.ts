import type { CompanyHealth, CompanyHealthWarning, CompanyRecord } from "@/types/company";

const trackedFields: (keyof CompanyRecord)[] = [
  "companyName", "legalName", "tradingName", "companyNumber", "companyType", "companyStatus",
  "operatingStatus", "industry", "country",
  "incorporationDate", "registeredOffice", "baseCurrency", "financialYearEnd",
  "firstAccountsPeriodEnd", "firstAccountsFilingDeadline", "founder", "sicCodes",
  "vatStatus", "vatRegistrationNumber", "vatEffectiveDate", "vatScheme",
  "vatAccountingPeriodStart", "vatAccountingPeriodEnd", "vatLetterIssueDate",
  "vatEvidenceSource", "accountingMethod", "externalAccountantStatus",
  "accountingSoftware", "accountingSoftwareStatus",
  "corporationTaxStatus", "icoStatus", "icoRegistrationNumber", "seisStatus",
  "bankStatus", "operatingBankName", "businessBankAccount", "bankBalance", "trl", "crl",
  "currentRaiseAmount", "fundraisingScheme", "fundraisingStatus", "legalPartner",
  "legalPartnerStatus", "currentFundingSources", "futureRevenueSources", "milestones",
];

const known = (company: CompanyRecord, field: keyof CompanyRecord) => {
  const value = company[field];
  if (value === null || value === undefined || value === "" || value === "Unknown") return false;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

export function getCompanyHealth(company: CompanyRecord): CompanyHealth {
  const warnings: CompanyHealthWarning[] = [];
  const add = (code: CompanyHealthWarning["code"], field: keyof CompanyRecord, message: string, severity: CompanyHealthWarning["severity"] = "warning") =>
    warnings.push({ code, field, message, severity });

  if (company.vatStatus === "Approved") {
    add("VAT_TAX_ACCOUNT_ACTION", "vatStatus", "Add the VAT registration to the HMRC Business Tax Account.", "info");
    add("VAT_RETURN_DEADLINE_ACTION", "vatAccountingPeriodEnd", "Confirm the first VAT return deadline.", "info");
    add("VAT_PAYMENT_SCHEDULE_ACTION", "vatScheme", "Confirm the Annual Accounting Scheme interim payment schedule.", "info");
    add("VAT_CERTIFICATE_ACTION", "vatEvidenceIds", "Store the VAT certificate when available.", "info");
  }
  if (company.bankStatus !== "Open") add("BANK_NOT_OPEN", "bankStatus", `${company.operatingBankName} application is pending; the business bank account is not yet open.`);
  if (!company.icoRegistrationNumber && company.icoStatus !== "Exempt") add("ICO_INCOMPLETE", "icoStatus", "ICO registration is not completed or evidenced.");
  if (company.seisAdvanceAssuranceStatus === "Not Submitted") add("SEIS_NOT_SUBMITTED", "seisAdvanceAssuranceStatus", "SEIS advance assurance is being prepared and has not yet been submitted.");
  if (company.corporationTaxStatus === "Unknown") add("TAX_STATUS_UNKNOWN", "corporationTaxStatus", "Corporation Tax status is unknown.");
  if (!company.accountingMethod) add("ACCOUNTING_METHOD_UNKNOWN", "accountingMethod", "Accounting method is unknown.");
  if (company.crl === null) add("CRL_UNCONFIRMED", "crl", "CRL exact level is not confirmed.");
  if (company.evidenceIds.length === 0) add("EVIDENCE_MISSING", "evidenceIds", "No evidence records are linked to the Company record.");

  const verifiedFieldCount = trackedFields.filter((field) => known(company, field)).length;
  const unknownFieldCount = trackedFields.length - verifiedFieldCount;
  return {
    warnings,
    verifiedFieldCount,
    unknownFieldCount,
    completionPercentage: Math.round((verifiedFieldCount / trackedFields.length) * 100),
    complete: unknownFieldCount === 0 && warnings.length === 0,
  };
}
