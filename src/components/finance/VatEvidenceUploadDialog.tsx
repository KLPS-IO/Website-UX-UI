import { useEffect, useMemo, useState } from "react";
import { Eye, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { documentApiErrorMessage } from "@/services/evidence/document-upload";
import { evidenceService } from "@/services/evidence/evidence.service";
import type { DocumentLinkEntityType } from "@/types/evidence";
import type { VatEvidenceFile } from "@/types/vat-ledger";
import { formatSafeDate } from "@/lib/safe-date";

const control =
  "rounded-lg border border-border bg-background px-3 py-2 text-sm";
const purposes = [
  ["full_vat_invoice", "Full VAT invoice"],
  ["simplified_vat_invoice", "Simplified VAT invoice"],
  ["supplier_invoice_no_vat", "Supplier invoice with no VAT"],
  ["retail_receipt", "Retail receipt"],
  ["supplier_order_confirmation", "Supplier order confirmation"],
  ["payment_evidence", "Payment evidence"],
  ["refund_confirmation", "Refund confirmation"],
  ["other_supporting_document", "Other supporting document"],
] as const;
const canonicalPurpose = (purpose: string) =>
  purpose === "supplier_order_confirmation"
    ? "order_confirmation"
    : purpose === "payment_evidence"
      ? "proof_of_payment"
      : purpose;

export type VatEvidenceTarget = {
  entityType: Extract<DocumentLinkEntityType, "expense" | "expense_adjustment">;
  id: string;
  supplier: string;
  date: string | null;
  gross: string;
  reference: string | null;
  parentReference?: string | null;
  evidence: VatEvidenceFile[];
};

type VatUploadResult = {
  evidence_reused: boolean;
  link_created: boolean;
  duplicate_link: boolean;
};
export function VatEvidenceUploadDialog({
  target,
  onClose,
  onLinked,
}: {
  target: VatEvidenceTarget | null;
  onClose: () => void;
  onLinked: (result: VatUploadResult) => Promise<void>;
}) {
  const [file, setFile] = useState<File | null>(null),
    [purpose, setPurpose] = useState(""),
    [title, setTitle] = useState(""),
    [documentDate, setDocumentDate] = useState(""),
    [source, setSource] = useState(""),
    [supplierReference, setSupplierReference] = useState(""),
    [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [message, setMessage] = useState("");
  useEffect(() => {
    if (!target) return;
    setFile(null);
    setPurpose(
      target.entityType === "expense_adjustment" ? "refund_confirmation" : "",
    );
    setDocumentDate(target.date ?? "");
    setSource(target.supplier);
    setSupplierReference(target.reference ?? "");
    setNotes("");
    setError("");
    setMessage("");
  }, [target]);
  const purposeLabel = useMemo(
    () =>
      purposes.find(([value]) => value === purpose)?.[1] ??
      "supporting document",
    [purpose],
  );
  useEffect(() => {
    if (target && purpose)
      setTitle(
        `${target.supplier} — ${purposeLabel} — ${documentDate || target.date || "undated"}`,
      );
  }, [target, purpose, purposeLabel, documentDate]);
  const upload = async () => {
    if (!target || !file || !purpose) {
      setError("Choose an evidence purpose and file before uploading.");
      return;
    }
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const result = await evidenceService.uploadDocument({
        file,
        title,
        document_category: "Finance",
        document_date: documentDate || undefined,
        description: notes || undefined,
        source_organisation: source || undefined,
        linked_entity_type: target.entityType,
        linked_entity_id: target.id,
        relationship: canonicalPurpose(purpose),
        vat_evidence_type: canonicalPurpose(purpose),
        supplier_reference: supplierReference || undefined,
      });
      setMessage(
        result.duplicate_link
          ? "This document was already linked to this transaction."
          : result.evidence_reused
            ? "Existing canonical document reused and linked."
            : "Evidence uploaded and linked.",
      );
      await onLinked(result);
    } catch (reason) {
      setError(documentApiErrorMessage(reason));
    } finally {
      setBusy(false);
    }
  };
  const view = async (id: string) => {
    const popup = window.open("about:blank", "_blank");
    if (popup) popup.opener = null;
    try {
      const result = await evidenceService.accessDocument(id, "view");
      if (popup) popup.location.replace(result.signed_url);
      else window.open(result.signed_url, "_blank", "noopener,noreferrer");
    } catch (reason) {
      popup?.close();
      setError(documentApiErrorMessage(reason));
    }
  };
  return (
    <Dialog
      open={Boolean(target)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {target?.entityType === "expense_adjustment"
              ? "Upload refund evidence"
              : "Upload evidence for this expense"}
          </DialogTitle>
          <DialogDescription>
            The document will be stored privately in Financial OS and linked to
            this transaction.
          </DialogDescription>
        </DialogHeader>
        {target && (
          <>
            <dl className="grid gap-2 rounded-lg border border-border p-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">Supplier</dt>
                <dd className="font-medium">{target.supplier}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Date</dt>
                <dd>{formatSafeDate(target.date, "Not confirmed")}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Gross</dt>
                <dd>{target.gross}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Reference</dt>
                <dd>{target.reference ?? "Not confirmed"}</dd>
              </div>
              {target.parentReference && (
                <div className="sm:col-span-2">
                  <dt className="text-muted-foreground">
                    Parent order or invoice
                  </dt>
                  <dd>{target.parentReference}</dd>
                </div>
              )}
              <div className="sm:col-span-2">
                <dt className="text-muted-foreground">Transaction</dt>
                <dd className="font-mono">{target.id.slice(0, 8)}…</dd>
              </div>
            </dl>
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-900"
              >
                {error}
              </div>
            )}
            {message && (
              <div
                role="status"
                className="rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-900"
              >
                {message}
              </div>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-sm">
                Evidence purpose *
                <select
                  required
                  className={`${control} mt-1 w-full`}
                  value={purpose}
                  onChange={(event) => setPurpose(event.target.value)}
                >
                  <option value="">Select purpose</option>
                  {purposes.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                File *
                <input
                  required
                  type="file"
                  className={`${control} mt-1 w-full`}
                  accept=".pdf,.png,.jpg,.jpeg,.txt,.csv,.docx,.xlsx,.pptx"
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                />
              </label>
              <label className="text-sm sm:col-span-2">
                Document title *
                <input
                  required
                  className={`${control} mt-1 w-full`}
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </label>
              <label className="text-sm">
                Document date
                <input
                  type="date"
                  className={`${control} mt-1 w-full`}
                  value={documentDate}
                  onChange={(event) => setDocumentDate(event.target.value)}
                />
              </label>
              <label className="text-sm">
                Source organisation
                <input
                  className={`${control} mt-1 w-full`}
                  value={source}
                  onChange={(event) => setSource(event.target.value)}
                />
              </label>
              <label className="text-sm sm:col-span-2">
                Supplier reference
                <input
                  className={`${control} mt-1 w-full`}
                  value={supplierReference}
                  onChange={(event) => setSupplierReference(event.target.value)}
                />
              </label>
              <label className="text-sm sm:col-span-2">
                Description or notes
                <textarea
                  className={`${control} mt-1 min-h-20 w-full`}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </label>
            </div>
            {target.evidence.length > 0 && (
              <section>
                <h3 className="text-sm font-semibold">Linked evidence</h3>
                <div className="mt-2 space-y-2">
                  {target.evidence.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"
                    >
                      <span>
                        {item.filename ?? item.type ?? "Evidence document"}
                      </span>
                      <button
                        type="button"
                        className={control}
                        onClick={() => void view(item.id)}
                      >
                        <Eye className="mr-2 inline h-4 w-4" />
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}
            <div className="flex justify-end gap-2">
              <button type="button" className={control} onClick={onClose}>
                Close
              </button>
              <button
                type="button"
                disabled={busy || !file || !purpose || !title.trim()}
                className="rounded-lg bg-brand-orange px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
                onClick={() => void upload()}
              >
                <Upload className="mr-2 inline h-4 w-4" />
                {busy ? "Uploading…" : "Upload and link"}
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
