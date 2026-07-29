import { authenticatedApi, authenticatedBlob } from "@/lib/authenticated-api";
import type { DocumentAccessResponse, EvidenceDto, EvidenceEntityType, EvidenceFilters, EvidenceLinkDto, EvidenceMetadataInput } from "@/types/evidence";

type EvidenceResponse = { status: "success"; evidence: EvidenceDto };
type EvidenceListResponse = { status: "success"; evidence: EvidenceDto[] };
type EvidenceVersionsResponse = { status: "success"; versions: EvidenceDto[] };

const queryString = (filters: EvidenceFilters) => {
  const query = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") query.set(key, String(value));
  });
  const value = query.toString();
  return value ? `?${value}` : "";
};

export const evidenceRepository = {
  list: (filters: EvidenceFilters = {}) => authenticatedApi<EvidenceListResponse>(`/api/finance/evidence${queryString(filters)}`),
  get: (id: string) => authenticatedApi<EvidenceResponse>(`/api/finance/evidence/${id}`),
  create: (input: EvidenceMetadataInput) => authenticatedApi<EvidenceResponse>("/api/finance/evidence", { method: "POST", body: JSON.stringify(input) }),
  update: (id: string, input: Partial<EvidenceMetadataInput>) => authenticatedApi<EvidenceResponse>(`/api/finance/evidence/${id}`, { method: "PATCH", body: JSON.stringify(input) }),
  versions: (id: string) => authenticatedApi<EvidenceVersionsResponse>(`/api/finance/evidence/${id}/versions`),
  link: (id: string, entityType: EvidenceEntityType, entityId: string) => authenticatedApi<{ status: "success"; link: EvidenceLinkDto }>(`/api/finance/evidence/${id}/link`, { method: "POST", body: JSON.stringify({ entity_type: entityType, entity_id: entityId }) }),
  unlink: (id: string, linkId: string) => authenticatedApi<{ status: "success"; evidence_deleted: boolean; remaining_link_count: number }>(`/api/finance/evidence/${id}/links/${linkId}`, { method: "DELETE" }),
  reorderLinks: (entityType: EvidenceEntityType, entityId: string, orderedLinkIds: string[]) =>
    authenticatedApi<{ status: "success"; links: Array<{ id: string; display_order: number }> }>("/api/finance/evidence-links/order", {
      method: "PUT",
      body: JSON.stringify({ entity_type: entityType, entity_id: entityId, ordered_link_ids: orderedLinkIds }),
    }),
  deleteEverywhere: (id: string) =>
    authenticatedApi<{ status: "success"; evidence_id: string; deleted_link_count: number }>(`/api/finance/evidence/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ confirmation: "DELETE EVERYWHERE" }),
    }),
  linked: (entityType: EvidenceEntityType, entityId: string) => authenticatedApi<EvidenceListResponse>(`/api/finance/evidence/linked/${entityType}/${entityId}`),
  uploadDocument: (formData: FormData) => authenticatedApi<{ status: "success"; evidence: EvidenceDto; link: EvidenceLinkDto | null }>("/api/finance/evidence/upload", { method: "POST", body: formData }),
  accessDocument: (evidenceId: string, action: "view" | "download") => authenticatedApi<DocumentAccessResponse>(`/api/finance/evidence/${evidenceId}/access`, { method: "POST", body: JSON.stringify({ action }) }),
  previewDocument: (evidenceId: string) => authenticatedBlob(`/api/finance/evidence/${evidenceId}/content`),
};
