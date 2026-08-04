import { ApiError } from "@/lib/authenticated-api";
import type { DocumentUploadInput } from "@/types/evidence";

const isUuid = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

export const MAX_DOCUMENT_BYTES = 25 * 1024 * 1024;
export const allowedDocumentExtensions = ["pdf", "png", "jpg", "jpeg", "txt", "csv", "docx", "xlsx", "pptx"] as const;
const allowedMimeTypes = new Set([
  "application/pdf", "image/png", "image/jpeg", "text/plain", "text/csv",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);

export const documentFolderDisplay: Record<DocumentUploadInput["document_category"], string> = {
  "Read First": "00_READ_FIRST", Corporate: "01_CORPORATE", Finance: "02_FINANCE", Fundraising: "03_FUNDRAISING",
  Product: "04_PRODUCT", Technology: "05_TECHNOLOGY", "Intellectual Property": "06_INTELLECTUAL_PROPERTY",
  Manufacturing: "07_MANUFACTURING", Market: "08_MARKET", Customers: "09_CUSTOMERS", Research: "10_RESEARCH",
  Regulatory: "11_REGULATORY", Legal: "12_LEGAL", Team: "13_TEAM", Press: "14_PRESS", Archive: "99_ARCHIVE",
};

export function validateDocumentUpload(input: Partial<DocumentUploadInput>): string[] {
  const errors: string[] = [];
  if (!input.file) return ["A file is required."];
  if (!input.title?.trim()) errors.push("A title is required.");
  if (!input.document_category) errors.push("A document category is required.");
  const extension = input.file.name.includes(".") ? input.file.name.split(".").pop()!.toLowerCase() : "";
  if (!extension) errors.push("The file must have an extension.");
  else if (!allowedDocumentExtensions.includes(extension as typeof allowedDocumentExtensions[number])) errors.push("This file extension is not supported.");
  if (input.file.type && !allowedMimeTypes.has(input.file.type)) errors.push("This file type is not supported.");
  if (input.file.size > MAX_DOCUMENT_BYTES) errors.push("The file exceeds the 25 MiB upload limit.");
  const linkParts = [input.linked_entity_type, input.linked_entity_id?.trim(), input.relationship?.trim()];
  const supplied = linkParts.filter(Boolean).length;
  if (supplied > 0 && supplied < 3) errors.push("Entity type, entity ID and relationship must all be supplied together.");
  if (supplied === 3 && !isUuid(input.linked_entity_id!)) errors.push("The linked entity ID must be a valid backend UUID.");
  return errors;
}

export function buildDocumentUploadFormData(input: DocumentUploadInput) {
  const errors = validateDocumentUpload(input);
  if (errors.length) throw new Error(errors.join(" "));
  const form = new FormData();
  form.append("file", input.file);
  form.append("title", input.title.trim());
  form.append("document_category", input.document_category);
  if (input.document_date) form.append("document_date", input.document_date);
  if (input.description?.trim()) form.append("description", input.description.trim());
  if (input.source_organisation?.trim()) form.append("source_organisation", input.source_organisation.trim());
  if (input.linked_entity_type && input.linked_entity_id && input.relationship) {
    form.append("linked_entity_type", input.linked_entity_type);
    form.append("linked_entity_id", input.linked_entity_id.trim());
    form.append("relationship", input.relationship.trim());
  }
  if (input.vat_evidence_type) form.append("vat_evidence_type", input.vat_evidence_type);
  if (input.supplier_reference?.trim()) form.append("supplier_reference", input.supplier_reference.trim());
  return form;
}

export function documentApiErrorMessage(error: unknown) {
  if (!(error instanceof ApiError)) return error instanceof Error ? error.message : "The document request failed.";
  const code = error.code;
  if (error.status === 401) return "Your session has expired. Please sign in again.";
  if (code === "finance_write_forbidden") return "Founder or administrator access is required to upload documents.";
  if (error.status === 403) return "You do not have permission to access this document.";
  if (error.status === 413 || code === "document_too_large") return "The document exceeds the 25 MiB upload limit.";
  if (code === "duplicate_evidence_link") return "This evidence is already linked to that record.";
  if (error.status === 409) return code?.includes("duplicate") ? "This document already exists." : "This document conflicts with an existing record.";
  if (code === "file_required") return "A file is required.";
  if (code === "invalid_document_upload") return "The document upload is invalid. Check the file and required metadata.";
  if (code === "partial_entity_link") return "Entity type, entity ID and relationship must all be supplied together.";
  if (code === "file_extension_required") return "The file must have an extension.";
  if (code === "linked_entity_not_found") return "The linked backend record could not be found.";
  if (code === "evidence_file_not_found") return "No stored file is attached to this evidence record.";
  if (code === "unsupported_evidence_entity") return "That entity type does not support document links.";
  if (code === "r2_not_configured" || error.status === 503) return "Private document storage is not configured yet.";
  if (code === "invalid_access_action") return "The requested file action is not supported.";
  return error.message || "The document request failed.";
}
