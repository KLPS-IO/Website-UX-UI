import type { EvidenceDto, EvidenceItem } from "@/types/evidence";

export const confidenceToPercent = (confidence: number) =>
  Math.round(Math.min(1, Math.max(0, Number.isFinite(confidence) ? confidence : 0)) * 100);

export function mapEvidenceDto(dto: EvidenceDto): EvidenceItem {
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
    hasR2Object: Boolean(dto.r2_object_key),
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
    links: dto.links ?? [],
  };
}

