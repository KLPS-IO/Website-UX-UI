import { ApiError } from "@/lib/authenticated-api";
import { evidenceRepository } from "@/repositories/evidenceRepository";
import type { EvidenceEntityType, EvidenceFilters, EvidenceMetadataInput } from "@/types/evidence";
import { mapEvidenceDto } from "./evidence.adapter";

export const isBackendUuid = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

export function evidenceErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 401 || error.status === 403) return "You are not authorised to view Finance evidence.";
    if (error.status === 409) return "This evidence is already linked to that record.";
    if (error.status === 404) return "The evidence or target record could not be found.";
    if (error.status === 422) return "Evidence linking is not supported for this record type.";
    return error.message;
  }
  return "Evidence is temporarily unavailable.";
}

export const evidenceService = {
  async list(filters: EvidenceFilters = {}) { return (await evidenceRepository.list(filters)).evidence.map(mapEvidenceDto); },
  async get(id: string) { return mapEvidenceDto((await evidenceRepository.get(id)).evidence); },
  async create(input: EvidenceMetadataInput) { return mapEvidenceDto((await evidenceRepository.create(input)).evidence); },
  async update(id: string, input: Partial<EvidenceMetadataInput>) { return mapEvidenceDto((await evidenceRepository.update(id, input)).evidence); },
  async versions(id: string) { return (await evidenceRepository.versions(id)).versions.map(mapEvidenceDto); },
  async link(evidenceId: string, entityType: EvidenceEntityType, entityId: string) {
    if (!isBackendUuid(entityId)) throw new Error("Backend record required before evidence can be linked.");
    return evidenceRepository.link(evidenceId, entityType, entityId);
  },
  unlink: evidenceRepository.unlink,
  async linked(entityType: EvidenceEntityType, entityId: string) {
    if (!isBackendUuid(entityId)) return [];
    return (await evidenceRepository.linked(entityType, entityId)).evidence.map(mapEvidenceDto);
  },
};

