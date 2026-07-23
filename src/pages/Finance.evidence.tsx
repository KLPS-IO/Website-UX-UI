import { useCallback, useEffect, useMemo, useState } from "react";
import { File, FileText, ShieldCheck, X } from "lucide-react";
import { PageHeader, SectionTitle, Surface } from "@/components/finance/PageHeader";
import { ApiError } from "@/lib/authenticated-api";
import { evidenceErrorMessage, evidenceService } from "@/services/evidence/evidence.service";
import type { EvidenceItem } from "@/types/evidence";
import { GlossaryText } from "@/components/finance/GlossaryTooltip";

const shown = (value: string | number | null | undefined, fallback = "Not yet evidenced") =>
  value === null || value === undefined || value === "" ? fallback : String(value);
const date = (value: string | null) => value ? new Date(value).toLocaleDateString("en-GB") : "Not confirmed";
const size = (value: number | null) => value === null ? "Not confirmed" : `${(value / 1024).toFixed(value >= 10240 ? 0 : 1)} KB`;

export default function EvidencePage() {
  const [items, setItems] = useState<EvidenceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [selected, setSelected] = useState<EvidenceItem | null>(null);
  const [versions, setVersions] = useState<EvidenceItem[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try { setItems(await evidenceService.listWithLinks({ limit: 100 })); }
    catch (reason) { setError(reason); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const openDetail = async (item: EvidenceItem) => {
    setSelected(item);
    setVersions([]);
    setDetailLoading(true);
    try {
      const [detail, history] = await Promise.all([evidenceService.get(item.id), evidenceService.versions(item.id)]);
      setSelected(detail);
      setVersions(history);
    } catch (reason) { setError(reason); }
    finally { setDetailLoading(false); }
  };

  const averageConfidence = useMemo(() => items.length
    ? Math.round(items.reduce((sum, item) => sum + item.confidencePercent, 0) / items.length)
    : null, [items]);
  const linked = items.filter((item) => item.links !== null && item.links.length > 0).length;
  const unauthorised = error instanceof ApiError && (error.status === 401 || error.status === 403);

  return (
    <div>
      <PageHeader eyebrow="Traceability" title="Evidence" description="Canonical evidence records from the Finance Evidence API." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="Evidence artefacts" value={loading ? "—" : items.length} detail="No demo records are used" />
        <Stat label="Linked records" value={loading ? "—" : linked} detail="Across supported backend entities" />
        <Stat label="Average confidence" value={averageConfidence === null ? "Not available" : `${averageConfidence}%`} detail="Backend decimals displayed as percentages" accent />
      </div>

      <div className="mt-6">
        {loading && <State title="Loading evidence" message="Retrieving canonical evidence records…" />}
        {!loading && error && <State title={unauthorised ? "Unauthorised" : "Evidence unavailable"} message={evidenceErrorMessage(error)} action={load} />}
        {!loading && !error && items.length === 0 && <State title="No evidence yet" message="The canonical Evidence API returned no records. Evidence can be added when genuine source material is available." />}
        {!loading && !error && items.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {items.map((item) => (
              <button key={item.id} type="button" className="text-left" onClick={() => void openDetail(item)}>
                <Surface className="h-full transition-colors hover:border-brand-orange/30">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-navy/60 text-brand-sage"><File className="h-5 w-5" /></div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-brand-orange">{item.code}</span>
                        <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">{item.verificationStatus}</span>
                        <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">{item.documentStatus}</span>
                      </div>
                      <h3 className="mt-2 truncate text-sm font-semibold">{item.title}</h3>
                      <div className="mt-1 text-xs text-muted-foreground">{item.type} · {shown(item.category)} · v{item.fileVersion}</div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <span>Source: {shown(item.sourceOrganisation)}</span><span>Owner: {shown(item.owner)}</span>
                        <span>Last reviewed: {date(item.lastReviewedDate)}</span><span>Next review: {date(item.nextReviewDate)}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5"><div className="h-full bg-brand-sage" style={{ width: `${item.confidencePercent}%` }} /></div>
                        <span className="inline-flex items-center gap-1 text-xs text-brand-sage"><ShieldCheck className="h-3 w-3" /> {item.confidencePercent}%</span>
                        <span className="text-xs text-muted-foreground">{item.links === null ? "Links not loaded" : `${item.links.length} links`}</span>
                      </div>
                    </div>
                  </div>
                </Surface>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && <EvidenceDetail item={selected} versions={versions} loading={detailLoading} close={() => setSelected(null)} />}
    </div>
  );
}

function EvidenceDetail({ item, versions, loading, close }: { item: EvidenceItem; versions: EvidenceItem[]; loading: boolean; close: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50" role="dialog" aria-modal="true" aria-label={`Evidence ${item.code}`}>
      <button className="absolute inset-0 cursor-default" onClick={close} aria-label="Close evidence detail" />
      <aside className="relative h-full w-full max-w-xl overflow-y-auto border-l border-border bg-background p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4"><div><div className="text-xs font-semibold text-brand-orange">{item.code}</div><h2 className="mt-1 text-xl font-semibold">{item.title}</h2></div><button onClick={close} className="rounded-lg border border-border p-2"><X className="h-4 w-4" /></button></div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{shown(item.description, "No description provided")}</p>
        {loading && <p className="mt-4 text-sm text-muted-foreground">Loading full metadata and version history…</p>}
        <Surface className="mt-6"><SectionTitle title="Metadata" /><dl className="grid gap-4 sm:grid-cols-2">
          <Field label="Evidence type" value={item.type} /><Field label="Category" value={shown(item.category)} />
          <Field label="Source organisation" value={shown(item.sourceOrganisation)} /><Field label="Owner" value={shown(item.owner)} />
          <Field label="Confidence" value={`${item.confidencePercent}%`} /><Field label="Verification" value={item.verificationStatus} />
          <Field label="Document status" value={item.documentStatus} /><Field label="R2 object" value={item.hasR2Object ? "Stored securely" : "Not present"} />
          <Field label="Filename" value={shown(item.originalFilename)} /><Field label="MIME type" value={shown(item.mimeType)} />
          <Field label="File size" value={size(item.fileSize)} /><Field label="Checksum" value={shown(item.checksum)} />
          <Field label="File version" value={`v${item.fileVersion}`} /><Field label="Review frequency" value={shown(item.reviewFrequency)} />
          <Field label="Last reviewed" value={date(item.lastReviewedDate)} /><Field label="Next review" value={date(item.nextReviewDate)} />
          <Field label="Expiry date" value={date(item.expiryDate)} /><Field label="Folder path" value={shown(item.folderPath)} />
        </dl></Surface>
        <Surface className="mt-4"><SectionTitle title="Audit" /><dl className="grid gap-4 sm:grid-cols-2"><Field label="Created" value={date(item.createdAt)} /><Field label="Updated" value={date(item.updatedAt)} /><Field label="Created by" value={shown(item.createdBy)} /><Field label="Updated by" value={shown(item.updatedBy)} /><Field label="Record version" value={`v${item.version}`} /><Field label="Change reason" value={shown(item.changeReason)} /></dl></Surface>
        <Surface className="mt-4"><SectionTitle title="Links" hint={item.links === null ? "Not loaded" : `${item.links.length}`} />{item.links === null ? <p className="text-sm text-muted-foreground">Link information was not loaded.</p> : item.links.length ? <ul className="space-y-2">{item.links.map((link) => <li key={link.id} className="rounded-lg border border-border p-3 text-sm"><span className="font-medium">{link.entity_type === "company" ? "Company" : link.entity_type}</span><div className="mt-1 break-all text-xs text-muted-foreground">{link.entity_id}</div><div className="mt-1 text-xs text-muted-foreground">{link.relationship ?? link.relationship_type ?? "Linked"}</div></li>)}</ul> : <p className="text-sm text-muted-foreground">No linked backend records.</p>}</Surface>
        <Surface className="mt-4"><SectionTitle title="Version History" hint={`${versions.length}`} />{versions.length ? <ul className="space-y-2">{versions.map((version) => <li key={`${version.id}-${version.version}`} className="flex justify-between rounded-lg border border-border p-3 text-sm"><span>Record v{version.version} · File v{version.fileVersion}</span><span className="text-muted-foreground">{date(version.updatedAt)}</span></li>)}</ul> : <p className="text-sm text-muted-foreground">No version history returned.</p>}</Surface>
      </aside>
    </div>
  );
}

function Stat({ label, value, detail, accent = false }: { label: string; value: string | number; detail: string; accent?: boolean }) { return <Surface><div className="text-xs uppercase tracking-widest text-muted-foreground"><GlossaryText>{label}</GlossaryText></div><div className={`mt-2 text-3xl font-semibold ${accent ? "text-brand-orange" : ""}`}>{value}</div><p className="mt-2 text-xs text-muted-foreground"><GlossaryText>{detail}</GlossaryText></p></Surface>; }
function State({ title, message, action }: { title: string; message: string; action?: () => void }) { return <Surface><div className="flex items-start gap-3"><FileText className="h-5 w-5 text-brand-orange" /><div><h2 className="font-semibold">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{message}</p>{action && <button onClick={action} className="mt-3 rounded-lg border border-border px-3 py-2 text-xs font-medium">Try again</button>}</div></div></Surface>; }
function Field({ label, value }: { label: string; value: string | number }) { return <div><dt className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"><GlossaryText>{label}</GlossaryText></dt><dd className="mt-1 break-words text-sm font-medium">{typeof value === "string" ? <GlossaryText>{value}</GlossaryText> : value}</dd></div>; }
