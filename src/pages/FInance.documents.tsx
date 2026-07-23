import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { Download, Eye, FileClock, FileText, Loader2, RotateCcw, Trash2, Upload } from "lucide-react";
import { PageHeader, SectionTitle, Surface } from "@/components/finance/PageHeader";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useFinance } from "@/contexts/FinanceContext";
import { useDataRoomViewer } from "@/hooks/useDataRoomViewer";
import { ApiError } from "@/lib/authenticated-api";
import { documentApiErrorMessage, documentFolderDisplay, validateDocumentUpload } from "@/services/evidence/document-upload";
import { evidenceService } from "@/services/evidence/evidence.service";
import { evidenceDocumentCategories, type DocumentLinkEntityType, type DocumentUploadInput, type EvidenceDocumentCategory, type EvidenceItem, type EvidenceVerificationStatus } from "@/types/evidence";

type QueueStatus = "Ready" | "Validating" | "Uploading" | "Complete" | "Failed";
type QueueItem = {
  queueId: string; file: File; title: string; category: EvidenceDocumentCategory | ""; documentDate: string;
  description: string; sourceOrganisation: string; linkMode: boolean; entityType: DocumentLinkEntityType | "";
  entityId: string; relationship: string; status: QueueStatus; errors: string[]; resultMessage: string;
};

const inputClass = "w-full rounded-lg border border-border bg-white/70 px-3 py-2 text-sm outline-none focus:border-brand-orange/50";
const buttonClass = "inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium transition hover:border-brand-orange/40 disabled:cursor-not-allowed disabled:opacity-50";
const formatSize = (bytes: number | null) => bytes === null ? "Not confirmed" : bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MiB` : `${Math.max(1, Math.round(bytes / 1024))} KiB`;
const formatDate = (value: string) => value ? new Date(value).toLocaleDateString("en-GB") : "Not confirmed";

export default function DocumentsPage() {
  const viewer = useDataRoomViewer();
  const { company, refreshCompany } = useFinance();
  const [documents, setDocuments] = useState<EvidenceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [category, setCategory] = useState<EvidenceDocumentCategory | "">("");
  const [keyword, setKeyword] = useState("");
  const [verification, setVerification] = useState<EvidenceVerificationStatus | "">("");
  const [sourceOrganisation, setSourceOrganisation] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [accessError, setAccessError] = useState("");
  const [versionsFor, setVersionsFor] = useState<EvidenceItem | null>(null);
  const [versions, setVersions] = useState<EvidenceItem[]>([]);
  const [versionsLoading, setVersionsLoading] = useState(false);

  const loadDocuments = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      setDocuments(await evidenceService.listWithLinks({ evidence_type: "document", category: category || undefined, keyword: keyword.trim() || undefined, verification_status: verification || undefined, source_organisation: sourceOrganisation.trim() || undefined, limit: 250 }));
    } catch (reason) { setDocuments([]); setError(reason); }
    finally { setLoading(false); }
  }, [category, keyword, verification, sourceOrganisation]);

  useEffect(() => { const timer = window.setTimeout(() => void loadDocuments(), 250); return () => window.clearTimeout(timer); }, [loadDocuments]);

  const grouped = useMemo(() => evidenceDocumentCategories.map((name) => ({ name, documents: documents.filter((document) => document.category === name) })), [documents]);
  const sources = useMemo(() => Array.from(new Set(documents.map((document) => document.sourceOrganisation).filter((value): value is string => Boolean(value)))).sort(), [documents]);
  const unauthorised = error instanceof ApiError && (error.status === 401 || error.status === 403);

  const accessFile = async (item: EvidenceItem, action: "view" | "download") => {
    setAccessError("");
    const viewWindow = action === "view" ? window.open("about:blank", "_blank") : null;
    if (viewWindow) viewWindow.opener = null;
    try {
      const access = await evidenceService.accessDocument(item.id, action);
      if (action === "view") {
        if (viewWindow) viewWindow.location.replace(access.signed_url); else window.open(access.signed_url, "_blank", "noopener,noreferrer");
      } else {
        const anchor = document.createElement("a"); anchor.href = access.signed_url; anchor.download = item.originalFilename ?? ""; anchor.rel = "noopener";
        document.body.appendChild(anchor); anchor.click(); anchor.remove();
      }
    } catch (reason) { viewWindow?.close(); setAccessError(documentApiErrorMessage(reason)); }
  };

  const openVersions = async (item: EvidenceItem) => {
    setVersionsFor(item); setVersions([]); setVersionsLoading(true);
    try { setVersions(await evidenceService.versions(item.id)); }
    catch (reason) { setAccessError(documentApiErrorMessage(reason)); }
    finally { setVersionsLoading(false); }
  };

  return (
    <div>
      <PageHeader eyebrow="Data room" title="Documents" description="Canonical Finance evidence documents stored privately and accessed through short-lived secure links."
        actions={viewer?.canWriteFinance ? <button onClick={() => setUploadOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-brand-orange/90"><Upload className="h-4 w-4" /> Upload</button> : <span className="text-xs text-muted-foreground">Upload requires founder/admin access</span>} />

      <Surface className="mb-6">
        <SectionTitle title="Document Filters" />
        <div className="grid gap-3 md:grid-cols-4">
          <label className="text-xs text-muted-foreground">Category<select className={`${inputClass} mt-1`} value={category} onChange={(event) => setCategory(event.target.value as EvidenceDocumentCategory | "")}><option value="">All categories</option>{evidenceDocumentCategories.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className="text-xs text-muted-foreground">Keyword<input className={`${inputClass} mt-1`} value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Code, title or filename" /></label>
          <label className="text-xs text-muted-foreground">Verification<select className={`${inputClass} mt-1`} value={verification} onChange={(event) => setVerification(event.target.value as EvidenceVerificationStatus | "")}><option value="">All statuses</option>{["Unknown", "Unverified", "Under Review", "Verified", "Rejected", "Expired"].map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className="text-xs text-muted-foreground">Source organisation<input className={`${inputClass} mt-1`} list="document-sources" value={sourceOrganisation} onChange={(event) => setSourceOrganisation(event.target.value)} /><datalist id="document-sources">{sources.map((value) => <option key={value} value={value} />)}</datalist></label>
        </div>
      </Surface>

      {accessError && <div role="alert" className="mb-4 rounded-lg border border-brand-coral/25 bg-brand-coral/10 p-3 text-sm text-brand-coral">{accessError}</div>}
      {loading && <DocumentState title="Loading documents" message="Retrieving canonical document evidence…" />}
      {!loading && error && <DocumentState title={unauthorised ? "Unauthorised" : "Documents unavailable"} message={unauthorised ? "You are not authorised to view Finance documents." : documentApiErrorMessage(error)} action={loadDocuments} />}
      {!loading && !error && documents.length === 0 && <DocumentState title={category ? `No documents in ${category}` : "No documents yet"} message="The canonical Evidence API returned no matching document records." />}
      {!loading && !error && documents.length > 0 && <div className="space-y-6">{grouped.filter((group) => group.documents.length > 0).map((group) => (
        <Surface key={group.name} padded={false}>
          <div className="border-b border-white/5 px-5 py-4"><SectionTitle title={group.name} hint={`${group.documents.length} · ${documentFolderDisplay[group.name]}`} /></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[1050px] text-sm"><thead><tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground"><th className="px-5 py-3">Document</th><th className="px-3 py-3">Source</th><th className="px-3 py-3">File</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Updated</th><th className="px-3 py-3">Links</th><th className="px-5 py-3 text-right">Actions</th></tr></thead><tbody>{group.documents.map((item) => (
            <tr key={item.id} className="border-t border-white/5 align-top hover:bg-white/[0.02]"><td className="px-5 py-3"><div className="font-semibold text-brand-orange">{item.code}</div><div className="max-w-xs truncate font-medium" title={item.title}>{item.title}</div><div className="text-xs text-muted-foreground">v{item.fileVersion}</div></td><td className="px-3 py-3 text-muted-foreground">{item.sourceOrganisation ?? "Not confirmed"}</td><td className="px-3 py-3"><div className="max-w-[190px] truncate" title={item.originalFilename ?? undefined}>{item.originalFilename ?? "No file attached"}</div><div className="text-xs text-muted-foreground">{item.mimeType ?? "Unknown type"} · {formatSize(item.fileSize)}</div></td><td className="px-3 py-3"><div>{item.documentStatus}</div><div className="text-xs text-muted-foreground">{item.verificationStatus}</div></td><td className="px-3 py-3 text-muted-foreground">{formatDate(item.updatedAt)}</td><td className="px-3 py-3">{item.links === null ? <span className="text-xs text-muted-foreground">Not loaded</span> : item.links.length === 0 ? <><div>0</div><div className="text-xs text-muted-foreground">No entity links</div></> : <><div className="font-medium">{item.links.length}</div><ul className="mt-1 max-w-[220px] space-y-2 text-xs">{item.links.map((link) => <li key={link.id}><div className="font-medium text-foreground">{link.entity_type === "company" ? "Company" : link.entity_type}</div><div className="text-muted-foreground">{link.relationship ?? link.relationship_type ?? "Linked"}</div></li>)}</ul></>}</td><td className="px-5 py-3"><div className="flex justify-end gap-2"><button disabled={!item.hasR2Object} onClick={() => void accessFile(item, "view")} className={buttonClass} aria-label={`View ${item.title}`}><Eye className="h-4 w-4" /> View</button><button disabled={!item.hasR2Object} onClick={() => void accessFile(item, "download")} className={buttonClass} aria-label={`Download ${item.title}`}><Download className="h-4 w-4" /></button><button onClick={() => void openVersions(item)} className={buttonClass} aria-label={`Version history for ${item.title}`}><FileClock className="h-4 w-4" /> Versions</button></div></td></tr>
          ))}</tbody></table></div>
        </Surface>
      ))}</div>}

      <UploadDialog open={uploadOpen} setOpen={setUploadOpen} queue={queue} setQueue={setQueue} companyId={company?.id ?? null} documents={documents} afterUploads={async (linkedCompany) => { await loadDocuments(); if (linkedCompany) await refreshCompany(); }} />
      <VersionDialog item={versionsFor} setItem={setVersionsFor} versions={versions} loading={versionsLoading} />
    </div>
  );
}

function UploadDialog({ open, setOpen, queue, setQueue, companyId, documents, afterUploads }: { open: boolean; setOpen: (value: boolean) => void; queue: QueueItem[]; setQueue: React.Dispatch<React.SetStateAction<QueueItem[]>>; companyId: string | null; documents: EvidenceItem[]; afterUploads: (linkedCompany: boolean) => Promise<void> }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const addFiles = (files: File[]) => setQueue((current) => [...current, ...files.map((file): QueueItem => ({ queueId: crypto.randomUUID(), file, title: file.name.replace(/\.[^.]+$/, ""), category: "", documentDate: "", description: "", sourceOrganisation: "", linkMode: false, entityType: "", entityId: "", relationship: "", status: "Ready", errors: [], resultMessage: "" }))]);
  const update = (id: string, changes: Partial<QueueItem>) => setQueue((current) => current.map((item) => item.queueId === id ? { ...item, ...changes } : item));
  const onDrop = (event: DragEvent<HTMLDivElement>) => { event.preventDefault(); addFiles(Array.from(event.dataTransfer.files)); };

  const uploadAll = async () => {
    let anySuccess = false; let linkedCompany = false;
    await Promise.all(queue.filter((item) => item.status !== "Complete" && item.status !== "Uploading").map(async (item) => {
      const input: Partial<DocumentUploadInput> = { file: item.file, title: item.title, document_category: item.category || undefined, document_date: item.documentDate || undefined, description: item.description || undefined, source_organisation: item.sourceOrganisation || undefined,
        ...(item.linkMode ? { linked_entity_type: item.entityType || undefined, linked_entity_id: item.entityId || undefined, relationship: item.relationship || undefined } : {}) };
      update(item.queueId, { status: "Validating", errors: [], resultMessage: "" });
      const errors = validateDocumentUpload(input);
      if (errors.length) { update(item.queueId, { status: "Failed", errors, resultMessage: "Retry available" }); return; }
      update(item.queueId, { status: "Uploading" });
      try {
        const result = await evidenceService.uploadDocument(input as DocumentUploadInput);
        anySuccess = true; if (result.link?.entity_type === "company") linkedCompany = true;
        update(item.queueId, { status: "Complete", resultMessage: result.link ? "Uploaded and linked" : "Uploaded" });
      } catch (reason) {
        update(item.queueId, { status: "Failed", errors: [documentApiErrorMessage(reason)], resultMessage: "Retry available" });
        if (reason instanceof ApiError && reason.status === 409) await afterUploads(false);
      }
    }));
    if (anySuccess) await afterUploads(linkedCompany);
  };

  return <Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto"><DialogHeader><DialogTitle>Upload Finance Documents</DialogTitle><DialogDescription>Files are uploaded privately one at a time. Evidence codes, filenames, versions and storage paths are assigned by the backend.</DialogDescription></DialogHeader>
    <div role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") inputRef.current?.click(); }} onDragOver={(event) => event.preventDefault()} onDrop={onDrop} onClick={() => inputRef.current?.click()} className="cursor-pointer rounded-xl border border-dashed border-brand-orange/40 bg-brand-orange/5 p-6 text-center"><Upload className="mx-auto h-6 w-6 text-brand-orange" /><div className="mt-2 text-sm font-medium">Click to upload or drag and drop</div><div className="mt-1 text-xs text-muted-foreground">PDF, PNG, JPEG, TXT, CSV, DOCX, XLSX or PPTX · maximum 25 MiB each</div><input ref={inputRef} type="file" multiple className="sr-only" accept=".pdf,.png,.jpg,.jpeg,.txt,.csv,.docx,.xlsx,.pptx" onChange={(event) => { addFiles(Array.from(event.target.files ?? [])); event.target.value = ""; }} /></div>
    <div className="space-y-4">{queue.map((item) => <QueueEditor key={item.queueId} item={item} update={(changes) => update(item.queueId, changes)} remove={() => setQueue((current) => current.filter((queued) => queued.queueId !== item.queueId))} companyId={companyId} documents={documents} />)}</div>
    {!queue.length && <p className="text-center text-sm text-muted-foreground">No files queued.</p>}
    <div className="flex justify-end gap-2"><button className={buttonClass} onClick={() => setOpen(false)}>Close</button><button type="button" aria-label="Upload ready files" className="inline-flex min-w-[190px] items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-brand-orange/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100" disabled={!queue.some((item) => item.status !== "Complete" && item.status !== "Uploading")} onClick={() => void uploadAll()}><Upload className="h-4 w-4 shrink-0" aria-hidden="true" /><span>Upload ready files</span></button></div>
  </DialogContent></Dialog>;
}

function QueueEditor({ item, update, remove, companyId, documents }: { item: QueueItem; update: (changes: Partial<QueueItem>) => void; remove: () => void; companyId: string | null; documents: EvidenceItem[] }) {
  const locked = item.status === "Uploading" || item.status === "Complete";
  const entityChanged = (entityType: DocumentLinkEntityType | "") => update({ entityType, entityId: entityType === "company" ? companyId ?? "" : "", relationship: "" });
  return <div className="rounded-xl border border-border p-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><div className="truncate text-sm font-semibold" title={item.file.name}>{item.file.name}</div><div className="text-xs text-muted-foreground">{formatSize(item.file.size)} · {item.status}{item.resultMessage ? ` · ${item.resultMessage}` : ""}</div></div>{!locked && <button onClick={remove} className="p-2 text-muted-foreground" aria-label={`Remove ${item.file.name}`}><Trash2 className="h-4 w-4" /></button>}</div>
    {item.status === "Uploading" && <div className="mt-3 flex items-center gap-2 text-xs text-brand-orange"><Loader2 className="h-4 w-4 animate-spin" /> Uploading securely…</div>}
    <div className="mt-4 grid gap-3 md:grid-cols-2"><label className="text-xs text-muted-foreground">Title *<input disabled={locked} className={`${inputClass} mt-1`} value={item.title} onChange={(event) => update({ title: event.target.value, status: "Ready" })} /></label><label className="text-xs text-muted-foreground">Document category *<select disabled={locked} className={`${inputClass} mt-1`} value={item.category} onChange={(event) => update({ category: event.target.value as EvidenceDocumentCategory, status: "Ready" })}><option value="">Select category</option>{evidenceDocumentCategories.map((value) => <option key={value}>{value}</option>)}</select>{item.category && <span className="mt-1 block text-[10px]">Display folder: {documentFolderDisplay[item.category]}</span>}</label><label className="text-xs text-muted-foreground">Document date<input disabled={locked} type="date" className={`${inputClass} mt-1`} value={item.documentDate} onChange={(event) => update({ documentDate: event.target.value })} /><span className="mt-1 block text-[10px]">If omitted, the upload date will be used in the stored filename.</span></label><label className="text-xs text-muted-foreground">Source organisation<input disabled={locked} className={`${inputClass} mt-1`} value={item.sourceOrganisation} onChange={(event) => update({ sourceOrganisation: event.target.value })} /></label><label className="text-xs text-muted-foreground md:col-span-2">Description<textarea disabled={locked} className={`${inputClass} mt-1 min-h-20`} value={item.description} onChange={(event) => update({ description: event.target.value })} /></label></div>
    <fieldset disabled={locked} className="mt-4"><legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Entity linking</legend><div className="mt-2 flex gap-4 text-sm"><label><input type="radio" checked={!item.linkMode} onChange={() => update({ linkMode: false, entityType: "", entityId: "", relationship: "" })} /> Upload document only</label><label><input type="radio" checked={item.linkMode} onChange={() => update({ linkMode: true })} /> Upload and link to an entity</label></div>{item.linkMode && <div className="mt-3 grid gap-3 md:grid-cols-3"><label className="text-xs text-muted-foreground">Entity type<select className={`${inputClass} mt-1`} value={item.entityType} onChange={(event) => entityChanged(event.target.value as DocumentLinkEntityType | "")}><option value="">Select</option><option value="company" disabled={!companyId}>Company</option><option value="document">Document</option>{["assumption", "product", "decision", "risk", "funding", "report", "scenario", "hire"].map((value) => <option key={value} value={value} disabled>{value} — backend record required</option>)}</select></label><label className="text-xs text-muted-foreground">Entity ID{item.entityType === "company" ? <input className={`${inputClass} mt-1`} readOnly value={item.entityId} /> : item.entityType === "document" ? <select className={`${inputClass} mt-1`} value={item.entityId} onChange={(event) => update({ entityId: event.target.value })}><option value="">Select document</option>{documents.map((document) => <option key={document.id} value={document.id}>{document.code} — {document.title}</option>)}</select> : <input className={`${inputClass} mt-1`} disabled placeholder="Backend record required before evidence can be linked." />}</label><label className="text-xs text-muted-foreground">Relationship<input className={`${inputClass} mt-1`} value={item.relationship} onChange={(event) => update({ relationship: event.target.value })} /></label></div>}</fieldset>
    {item.errors.length > 0 && <ul role="alert" className="mt-3 list-disc pl-5 text-xs text-brand-coral">{item.errors.map((error) => <li key={error}>{error}</li>)}</ul>}{item.status === "Failed" && <button onClick={() => update({ status: "Ready", errors: [], resultMessage: "" })} className={`${buttonClass} mt-3`}><RotateCcw className="h-3.5 w-3.5" /> Retry available</button>}
  </div>;
}

function VersionDialog({ item, setItem, versions, loading }: { item: EvidenceItem | null; setItem: (item: EvidenceItem | null) => void; versions: EvidenceItem[]; loading: boolean }) {
  return <Dialog open={Boolean(item)} onOpenChange={(open) => { if (!open) setItem(null); }}><DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto"><DialogHeader><DialogTitle>Version History</DialogTitle><DialogDescription>{item?.code} — {item?.title}</DialogDescription></DialogHeader>{loading ? <p className="text-sm text-muted-foreground">Loading versions…</p> : versions.length ? <ul className="space-y-3">{versions.map((version, index) => { const current = version.fileVersion === item?.fileVersion || index === 0; return <li key={`${version.id}-${version.version}-${index}`} className="rounded-lg border border-border p-4"><div className="flex justify-between"><span className="font-semibold">File v{version.fileVersion} · Record v{version.version}</span><span className={current ? "text-brand-sage" : "text-muted-foreground"}>{current ? "Current Version" : "Previous Version"}</span></div><div className="mt-2 grid gap-1 text-xs text-muted-foreground sm:grid-cols-2"><span>Uploaded: {formatDate(version.createdAt)}</span><span>By: {version.createdBy ?? "Not confirmed"}</span><span>Status: {version.documentStatus}</span><span>File: {version.originalFilename ?? "Not confirmed"}</span><span>Type: {version.mimeType ?? "Not confirmed"}</span><span>Size: {formatSize(version.fileSize)}</span></div><p className="mt-2 text-xs">{version.changeReason || "No change reason supplied"}</p></li>; })}</ul> : <p className="text-sm text-muted-foreground">No version-history records were returned.</p>}</DialogContent></Dialog>;
}

function DocumentState({ title, message, action }: { title: string; message: string; action?: () => Promise<void> }) { return <Surface><div className="flex items-start gap-3"><FileText className="h-5 w-5 text-brand-orange" /><div><h2 className="font-semibold">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{message}</p>{action && <button className={`${buttonClass} mt-3`} onClick={() => void action()}>Try again</button>}</div></div></Surface>; }
