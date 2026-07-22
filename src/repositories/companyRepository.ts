import { authenticatedApi } from "@/lib/authenticated-api";
import type { CompanyDto, CompanyHealthDto, CompanyUpdatePayload, CompanyVersionDto } from "@/types/company";
import type { EvidenceDto } from "@/types/evidence";

export const companyRepository = {
  getCompany: () => authenticatedApi<{ status: "success"; company: CompanyDto | null }>("/api/finance/company"),
  updateCompany: (payload: CompanyUpdatePayload) => authenticatedApi<{ status: "success"; company: CompanyDto }>("/api/finance/company", { method: "PATCH", body: JSON.stringify(payload) }),
  getCompanyVersions: () => authenticatedApi<{ status: "success"; versions: CompanyVersionDto[] }>("/api/finance/company/versions"),
  getCompanyHealth: () => authenticatedApi<{ status: "success"; health: CompanyHealthDto }>("/api/finance/company/health"),
  getCompanyEvidence: () => authenticatedApi<{ status: "success"; evidence: EvidenceDto[] }>("/api/finance/company/evidence"),
};

