export const evidenceDocumentCategories = [
  "Read First", "Corporate", "Finance", "Fundraising", "Product", "Technology",
  "Intellectual Property", "Manufacturing", "Market", "Customers",
  "Research", "Regulatory", "Legal", "Team", "Press", "Archive",
] as const;

export type EvidenceDocumentCategory = (typeof evidenceDocumentCategories)[number];
export type EvidenceVerificationStatus = "Unknown" | "Unverified" | "Under Review" | "Verified" | "Rejected" | "Expired";
export type EvidenceDocumentStatus = "Draft" | "Active" | "Superseded" | "Archived" | "Expired";
export type EvidenceEntityType = "assumptions" | "products" | "decisions" | "risks" | "funding" | "reports" | "scenarios" | "hires" | "documents" | "company" | "expense";

export interface EvidenceLinkDto {
  id: string;
  entity_type: EvidenceEntityType;
  entity_id: string;
  relationship_type?: string | null;
  relationship?: string | null;
  created_at?: string;
}

/** Network DTO. Field names deliberately match the canonical backend contract. */
export interface EvidenceDto {
  id: string;
  evidence_code: string;
  title: string;
  description: string | null;
  evidence_type: string;
  document_category: EvidenceDocumentCategory | null;
  source_organisation: string | null;
  owner: string | null;
  confidence: number;
  verification_status: EvidenceVerificationStatus;
  document_status: EvidenceDocumentStatus;
  review_frequency: string | null;
  last_reviewed_date: string | null;
  next_review_date: string | null;
  expiry_date: string | null;
  r2_object_key: string | null;
  original_filename: string | null;
  mime_type: string | null;
  file_size: number | null;
  checksum: string | null;
  file_version: number;
  folder_path: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
  version: number;
  change_reason: string;
  links?: EvidenceLinkDto[];
  link_id?: string;
  relationship?: string | null;
  link_notes?: string | null;
  linked_at?: string;
}

export interface EvidenceItem {
  id: string;
  code: string;
  title: string;
  description: string | null;
  type: string;
  category: EvidenceDocumentCategory | null;
  sourceOrganisation: string | null;
  owner: string | null;
  confidenceDecimal: number;
  confidencePercent: number;
  verificationStatus: EvidenceVerificationStatus;
  documentStatus: EvidenceDocumentStatus;
  reviewFrequency: string | null;
  lastReviewedDate: string | null;
  nextReviewDate: string | null;
  expiryDate: string | null;
  hasR2Object: boolean;
  originalFilename: string | null;
  mimeType: string | null;
  fileSize: number | null;
  checksum: string | null;
  fileVersion: number;
  folderPath: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  version: number;
  changeReason: string;
  /** null means the list endpoint omitted link data; [] means the API confirmed no links. */
  links: EvidenceLinkDto[] | null;
}

export type EvidenceFilters = Partial<{
  title: string;
  category: EvidenceDocumentCategory;
  evidence_type: string;
  source_organisation: string;
  owner: string;
  verification_status: EvidenceVerificationStatus;
  linked_entity_type: EvidenceEntityType;
  linked_entity_id: string;
  keyword: string;
  limit: number;
}>;

export type EvidenceMetadataInput = Partial<Omit<EvidenceDto, "id" | "evidence_code" | "created_at" | "updated_at" | "created_by" | "updated_by" | "version" | "links">> & Pick<EvidenceDto, "title" | "evidence_type">;

export type DocumentLinkEntityType = "assumption" | "product" | "decision" | "risk" | "company" | "funding" | "report" | "scenario" | "hire" | "document" | "expense";

export type DocumentUploadInput = {
  file: File;
  title: string;
  document_category: EvidenceDocumentCategory;
  document_date?: string;
  description?: string;
  source_organisation?: string;
  linked_entity_type?: DocumentLinkEntityType;
  linked_entity_id?: string;
  relationship?: string;
};

export type DocumentAccessResponse = { status: "success"; action: "view" | "download"; signed_url: string; expires_at: string };
