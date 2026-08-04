import type { EvidenceDto, EvidenceEntityType, EvidenceItem, EvidenceLinkDto } from "@/types/evidence";

export const confidenceToPercent = (confidence: number) =>
  Math.round(Math.min(1, Math.max(0, Number.isFinite(confidence) ? confidence : 0)) * 100);

export function mapEvidenceDto(dto: EvidenceDto, linkedContext?: { entityType: EvidenceEntityType; entityId: string }): EvidenceItem {
  let links: EvidenceLinkDto[] | null = null;
  if (Array.isArray(dto.links)) links = dto.links;
  else if (dto.link_id && linkedContext) links = [{
    id: dto.link_id,
    entity_type: linkedContext.entityType,
    entity_id: linkedContext.entityId,
    relationship: dto.relationship ?? null,
    created_at: dto.linked_at,
    display_order: dto.display_order,
    pinned: dto.pinned,
    hidden: dto.hidden,
  }];
  return {
    id: dto.id,
    code: dto.evidence_code,
    title: dto.title,
    description: dto.description,
    type: dto.evidence_type,
    category: dto.document_category,
    sourceOrganisation: dto.source_organisation,
    owner: dto.owner,
    confidenceDecimal: dto.confidence,
    confidencePercent: confidenceToPercent(dto.confidence),
    verificationStatus: dto.verification_status,
    documentStatus: dto.document_status,
    reviewFrequency: dto.review_frequency,
    lastReviewedDate: dto.last_reviewed_date,
    nextReviewDate: dto.next_review_date,
    expiryDate: dto.expiry_date,
    documentDate: dto.document_date,
    hasR2Object: dto.has_r2_object ?? Boolean(dto.r2_object_key),
    originalFilename: dto.original_filename,
    mimeType: dto.mime_type,
    fileSize: dto.file_size,
    checksum: dto.checksum,
    fileVersion: dto.file_version,
    folderPath: dto.folder_path,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
    createdBy: dto.created_by,
    updatedBy: dto.updated_by,
    version: dto.version,
    changeReason: dto.change_reason,
    links,
  };
}
