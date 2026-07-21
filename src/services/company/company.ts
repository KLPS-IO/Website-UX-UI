import { companyDefaults } from "@/types/company.defaults";
import type { CompanyOverview, CompanyRecord } from "@/types/company";
import { getCompanyHealth } from "./company.health";

const cloneCompany = (): CompanyRecord => ({
  ...companyDefaults,
  registeredOffice: { ...companyDefaults.registeredOffice },
  sicCodes: [...companyDefaults.sicCodes],
  industry: [...companyDefaults.industry],
  evidenceIds: [...companyDefaults.evidenceIds],
  vatEvidenceIds: [...companyDefaults.vatEvidenceIds],
  seisEvidenceIds: [...companyDefaults.seisEvidenceIds],
  currentFundingSources: [...companyDefaults.currentFundingSources],
  futureRevenueSources: [...companyDefaults.futureRevenueSources],
  milestones: companyDefaults.milestones.map((milestone) => ({ ...milestone })),
});

export function getCompany(): CompanyRecord {
  return cloneCompany();
}

export function getCompanyOverview(): CompanyOverview {
  const company = cloneCompany();
  return { company, ...getCompanyHealth(company) };
}
