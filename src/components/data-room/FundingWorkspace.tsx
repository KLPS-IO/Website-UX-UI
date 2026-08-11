import { FileText, FolderOpen } from "lucide-react";
import { visibleFundingApplications } from "@/config/fundingApplications";

type SecureDocument = { id: string; filename: string; category?: string };

export function FundingWorkspace({ isFounderAdmin, documents, onViewDocument }: { isFounderAdmin: boolean; documents: SecureDocument[]; onViewDocument: (document: SecureDocument) => void }) {
  const applications = visibleFundingApplications(isFounderAdmin);
  return <div className="glass overflow-hidden rounded-lg">
    <div className="border-b border-border px-6 py-5"><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Funding</div><h3 className="mt-3 text-2xl font-light tracking-tight text-foreground">Funding applications</h3><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Submitted applications and permissioned workspaces for current and future funding programmes.</p></div>
    <div className="grid gap-4 p-6 md:grid-cols-2">{applications.map(application=>{
      const reference=application.finalSubmittedVersion;
      const secureDocument=reference?documents.find(document=>document.filename===reference.filename&&document.category?.toLowerCase()==="funding"):undefined;
      return <article key={application.id} className="rounded-lg border border-border bg-white/[0.02] p-5">
        <div className="flex items-start justify-between gap-3"><div><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{application.programme}</div><h4 className="mt-2 text-lg font-medium text-foreground">{application.applicationName}</h4></div><span className="rounded border border-border px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">{application.status}</span></div>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-xs"><div><dt className="text-muted-foreground">Version</dt><dd className="mt-1 text-foreground">{application.version}</dd></div><div><dt className="text-muted-foreground">Submission date</dt><dd className="mt-1 text-foreground">{application.submissionDate??"Not recorded"}</dd></div><div><dt className="text-muted-foreground">Funding amount</dt><dd className="mt-1 text-foreground">{application.fundingAmount===null?"Not recorded":application.fundingAmount}</dd></div><div><dt className="text-muted-foreground">Application sections</dt><dd className="mt-1 text-foreground">{application.sections.length||"None added"}</dd></div></dl>
        {reference?<div className="mt-5 rounded-md border border-border p-3"><div className="flex items-center gap-2 text-sm font-medium"><FileText className="h-4 w-4 text-accent"/>{reference.label}</div><div className="mt-1 truncate text-xs text-muted-foreground" title={reference.filename}>{reference.filename}</div>{secureDocument?<button type="button" onClick={()=>onViewDocument(secureDocument)} className="mt-3 text-xs font-medium text-accent">View protected original →</button>:<div className="mt-3 text-xs text-muted-foreground">Awaiting secure Data Room document registration.</div>}</div>:<div className="mt-5 rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground"><FolderOpen className="mb-2 h-4 w-4"/>Empty workspace. No answers, sections, figures or documents have been added.</div>}
      </article>;
    })}</div>
    <div className="border-t border-border px-6 py-3 text-center text-[10px] uppercase tracking-[0.22em] text-muted-foreground">KPLS Investor Data Room</div>
  </div>;
}
