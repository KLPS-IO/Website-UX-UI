import { useEffect, useMemo, useState } from "react";
import { Eye, Pencil, Trash2, Upload } from "lucide-react";
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
import type { EvidenceItem } from "@/types/evidence";
import type { VatEvidenceFile } from "@/types/vat-ledger";
import { formatSafeDate } from "@/lib/safe-date";

const control =
  "rounded-lg border border-border bg-background px-3 py-2 text-sm";
const uploadAction =
  "rounded-lg border border-[#d97f13] !bg-[#ef9f32] px-4 py-2 text-sm font-semibold !text-white shadow-sm transition hover:!bg-[#d97f13] disabled:cursor-not-allowed disabled:!border-slate-300 disabled:!bg-slate-200 disabled:!text-slate-600 disabled:opacity-100";
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
  const [editingEvidenceId,setEditingEvidenceId]=useState<string|null>(null);
  const [addingDocument,setAddingDocument]=useState(false);
  const [linkedFiles,setLinkedFiles]=useState<VatEvidenceFile[]>([]);
  const [linkedDetails,setLinkedDetails]=useState<Record<string,EvidenceItem>>({});
  useEffect(() => {
    if (!target) return;
    setFile(null);
    setTitle("");
    setPurpose(
      target.entityType === "expense_adjustment" ? "refund_confirmation" : "",
    );
    setDocumentDate(target.date ?? "");
    setSource(target.supplier);
    setSupplierReference(target.reference ?? "");
    setNotes("");
    setEditingEvidenceId(null);
    setError("");
    setMessage("");
    setLinkedFiles(target.evidence);
    setAddingDocument(target.evidence.length===0);
    let current=true;
    void Promise.all(target.evidence.map(item=>evidenceService.get(item.id))).then(items=>{
      if(current)setLinkedDetails(Object.fromEntries(items.map(item=>[item.id,item])));
    }).catch(()=>{if(current)setLinkedDetails({});});
    return()=>{current=false;};
  }, [target]);
  const purposeLabel = useMemo(
    () =>
      purposes.find(([value]) => value === purpose)?.[1] ??
      "supporting document",
    [purpose],
  );
  useEffect(() => {
    if (target && purpose && !editingEvidenceId)
      setTitle(
        `${target.supplier} — ${purposeLabel} — ${documentDate || target.date || "undated"}`,
      );
  }, [target, purpose, purposeLabel, documentDate, editingEvidenceId]);
  const upload = async () => {
    if (!target || !file || !purpose) {
      setError("Choose an evidence purpose and file before uploading.");
      return;
    }
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const metadata={
        title:title.trim(),description:notes.trim()||null,document_date:documentDate||null,
        source_organisation:source.trim()||null,vat_evidence_type:canonicalPurpose(purpose),
        supplier_reference:supplierReference.trim()||null
      };
      const result = await evidenceService.uploadDocument({
        file,
        title:metadata.title,
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
      const savedEvidence=result.evidence_reused
        ? await evidenceService.update(result.evidence.id,{...metadata,change_reason:"Completed metadata during VAT evidence reuse"})
        : result.evidence;
      setLinkedDetails(current=>({...current,[savedEvidence.id]:savedEvidence}));
      setLinkedFiles(current=>current.some(item=>item.id===savedEvidence.id)?current:[...current,{id:savedEvidence.id,filename:savedEvidence.originalFilename,type:savedEvidence.vatEvidenceType}]);
      setAddingDocument(false);setFile(null);setPurpose("");setTitle("");setNotes("");
      setMessage(
        result.duplicate_link
          ? "This document was already linked. Its evidence details were saved."
          : result.evidence_reused
            ? "Existing canonical document details updated and linked."
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
  const editDetails=async(id:string)=>{
    setBusy(true);setError("");setMessage("");
    try{
      const item=await evidenceService.get(id);
      setAddingDocument(false);
      setLinkedDetails(current=>({...current,[id]:item}));
      const storedPurpose=item.vatEvidenceType??"";
      setEditingEvidenceId(id);
      setPurpose(storedPurpose==="order_confirmation"?"supplier_order_confirmation":storedPurpose==="proof_of_payment"?"payment_evidence":storedPurpose);
      setTitle(item.title);
      setDocumentDate(item.documentDate??"");
      setSource(item.sourceOrganisation??"");
      setSupplierReference(item.supplierReference??"");
      setNotes(item.description??"");
    }catch(reason){setError(documentApiErrorMessage(reason));}
    finally{setBusy(false);}
  };
  const cancelEdit=()=>{
    if(!target)return;
    setEditingEvidenceId(null);setFile(null);setPurpose("");setTitle("");
    setDocumentDate(target.date??"");setSource(target.supplier);
    setSupplierReference(target.reference??"");setNotes("");setError("");setMessage("");
  };
  const saveDetails=async()=>{
    if(!editingEvidenceId||!purpose||!title.trim()){setError("Complete the evidence purpose and document title before saving.");return;}
    setBusy(true);setError("");setMessage("");
    try{
      const saved=await evidenceService.update(editingEvidenceId,{
        title:title.trim(),description:notes.trim()||null,document_date:documentDate||null,
        source_organisation:source.trim()||null,vat_evidence_type:canonicalPurpose(purpose),
        supplier_reference:supplierReference.trim()||null,change_reason:"Updated from VAT Ledger evidence review"
      });
      setLinkedDetails(current=>({...current,[saved.id]:saved}));
      setMessage("Evidence details saved.");
      await onLinked({evidence_reused:true,link_created:false,duplicate_link:false});
      if(target){
        setEditingEvidenceId(null);setFile(null);setPurpose("");setTitle("");
        setDocumentDate(target.date??"");setSource(target.supplier);
        setSupplierReference(target.reference??"");setNotes("");
      }
    }catch(reason){setError(documentApiErrorMessage(reason));}
    finally{setBusy(false);}
  };
  const removeLink=async(id:string)=>{
    if(!target||!window.confirm("Remove this evidence from the transaction? If it is not linked anywhere else, the stored document will also be permanently deleted."))return;
    setBusy(true);setError("");setMessage("");
    try{
      const linked=await evidenceService.linked(target.entityType,target.id);
      const item=linked.find(candidate=>candidate.id===id);
      const linkId=item?.links?.find(link=>link.entity_type===target.entityType&&link.entity_id===target.id)?.id;
      if(!linkId)throw new Error("The evidence link could not be found. Refresh the ledger and try again.");
      const result=await evidenceService.unlink(id,linkId);
      setLinkedFiles(current=>{const next=current.filter(item=>item.id!==id);if(!next.length)setAddingDocument(true);return next;});
      setLinkedDetails(current=>{const next={...current};delete next[id];return next;});
      if(editingEvidenceId===id)cancelEdit();
      setMessage(result.evidence_deleted?"Evidence removed and the unlinked document was deleted.":"Evidence unlinked from this transaction.");
      await onLinked({evidence_reused:false,link_created:false,duplicate_link:false});
    }catch(reason){setError(documentApiErrorMessage(reason));}
    finally{setBusy(false);}
  };
  const showEvidenceEditor=Boolean(editingEvidenceId)||addingDocument||linkedFiles.length===0;
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
            {editingEvidenceId?"Update the canonical details for this linked document.":showEvidenceEditor?"The document will be stored privately in Financial OS and linked to this transaction.":"Review the canonical documents linked to this transaction."}
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
            {showEvidenceEditor&&<div className="grid gap-3 rounded-lg border border-border bg-muted/20 p-4 sm:grid-cols-2">
              <h3 className="text-sm font-semibold sm:col-span-2">{editingEvidenceId?"Edit linked evidence details":"Add another document"}</h3>
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
              {!editingEvidenceId&&<label className="text-sm">File *<input required type="file" className={`${control} mt-1 w-full`} accept=".pdf,.png,.jpg,.jpeg,.txt,.csv,.docx,.xlsx,.pptx" onChange={(event) => setFile(event.target.files?.[0] ?? null)} /></label>}
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
            </div>}
            {linkedFiles.length > 0 && (
              <section>
                <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-semibold">Linked evidence</h3>{!showEvidenceEditor&&<button type="button" className={control} onClick={()=>setAddingDocument(true)}><Upload className="mr-2 inline h-4 w-4" />Add another document</button>}</div>
                <div className="mt-2 space-y-2">
                  {linkedFiles.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-2 rounded-lg border border-border p-3 text-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0"><div className="font-medium">{linkedDetails[item.id]?.title??item.filename??item.type??"Evidence document"}</div>{linkedDetails[item.id]&&<div className="mt-1 space-y-0.5 text-xs text-muted-foreground"><div>{[linkedDetails[item.id].vatEvidenceType?.replaceAll("_"," "),linkedDetails[item.id].documentDate,linkedDetails[item.id].sourceOrganisation,linkedDetails[item.id].supplierReference].filter(Boolean).join(" · ")}</div>{linkedDetails[item.id].description&&<p className="whitespace-pre-wrap">{linkedDetails[item.id].description}</p>}</div>}</div>
                      <div className="flex flex-wrap gap-2">
                        <button type="button" className={control} onClick={() => void view(item.id)}><Eye className="mr-2 inline h-4 w-4" />View</button>
                        <button type="button" className={control} disabled={busy} onClick={() => void editDetails(item.id)}><Pencil className="mr-2 inline h-4 w-4" />Edit details</button>
                        <button type="button" className="rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700" disabled={busy} onClick={() => void removeLink(item.id)}><Trash2 className="mr-2 inline h-4 w-4" />Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
              <button type="button" className={`${control} w-full sm:w-auto`} onClick={editingEvidenceId?cancelEdit:onClose}>
                {editingEvidenceId?"Cancel edit":"Close"}
              </button>
              {showEvidenceEditor&&<button
                type="button"
                disabled={busy || !purpose || !title.trim() || (!editingEvidenceId&&!file)}
                className={`${uploadAction} w-full sm:w-auto`}
                onClick={() => void (editingEvidenceId?saveDetails():upload())}
              >
                <Upload className="mr-2 inline h-4 w-4" />
                {busy ? (editingEvidenceId?"Saving…":"Uploading…") : editingEvidenceId?"Save details":"Upload and link"}
              </button>}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
