import { companyRepository } from "@/repositories/companyRepository";
import type { CompanyUpdatePayload } from "@/types/company";
import { mapEvidenceDto } from "@/services/evidence/evidence.adapter";
import { mapCompanyDto, mapCompanyHealthDto, mapCompanyVersionDto } from "./company.adapter";

export const companyService = {
  async getCompany() {
    const dto = (await companyRepository.getCompany()).company;
    return dto ? mapCompanyDto(dto) : null;
  },
  async updateCompany(payload: CompanyUpdatePayload) {
    if (!payload.change_reason.trim()) throw new Error("A change reason is required.");
    return mapCompanyDto((await companyRepository.updateCompany(payload)).company);
  },
  async getCompanyVersions() { return (await companyRepository.getCompanyVersions()).versions.map(mapCompanyVersionDto); },
  async getCompanyHealth() { return mapCompanyHealthDto((await companyRepository.getCompanyHealth()).health); },
  async getCompanyEvidence() { return (await companyRepository.getCompanyEvidence()).evidence.map(mapEvidenceDto); },
};
