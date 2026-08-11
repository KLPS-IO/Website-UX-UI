import { AlertTriangle, CheckCircle2, FileText, FolderOpen } from "lucide-react";
import { visibleFundingApplications } from "@/config/fundingApplications";
import { countFundingAnswer, type FundingQuestion } from "@/config/womenTechEuApplication";

type SecureDocument = { id: string; filename: string; category?: string };

const statusLabel = (question: FundingQuestion) => question.status.replaceAll("_", " ");

function QuestionCard({ question }: { question: FundingQuestion }) {
  const count = question.answer && question.limit ? countFundingAnswer(question.answer, question.limit.unit) : null;
  const isDrafted = question.status === "drafted";
  return <div className="rounded-md border border-border bg-background/40 p-4">
    <div className="flex flex-wrap items-start justify-between gap-2">
      <h6 className="max-w-3xl text-sm font-medium leading-6 text-foreground"><span className="mr-2 font-mono text-[10px] text-accent">{question.id}</span>{question.prompt}</h6>
      <span className={`rounded border px-2 py-1 text-[9px] uppercase tracking-wider ${isDrafted ? "border-emerald-500/30 text-emerald-400" : "border-amber-500/30 text-amber-300"}`}>{statusLabel(question)}</span>
    </div>
    {question.answer ? <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-foreground/90">{question.answer}</p> : <p className="mt-3 text-sm italic text-amber-200/80">Unanswered — confirmation or verified evidence required.</p>}
    {question.limit && <div className="mt-2 font-mono text-[10px] text-muted-foreground">{count ?? 0} / {question.limit.maximum} {question.limit.unit}</div>}
    <div className="mt-3 rounded border border-border/70 bg-white/[0.02] p-3 text-xs leading-5 text-muted-foreground"><span className="font-medium text-foreground">Evidence note:</span> {question.evidenceNote}</div>
    {question.flags && question.flags.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{question.flags.map(flag => <span key={flag} className="inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/5 px-2 py-1 text-[10px] text-amber-200"><AlertTriangle className="h-3 w-3" />{flag}</span>)}</div>}
  </div>;
}

export function FundingWorkspace({ isFounderAdmin, documents, onViewDocument }: { isFounderAdmin: boolean; documents: SecureDocument[]; onViewDocument: (document: SecureDocument) => void }) {
  const applications = visibleFundingApplications(isFounderAdmin);
  return <div className="glass overflow-hidden rounded-lg">
    <div className="border-b border-border px-6 py-5"><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Funding</div><h3 className="mt-3 text-2xl font-light tracking-tight text-foreground">Funding applications</h3><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Submitted applications and permissioned workspaces for current and future funding programmes.</p></div>
    <div className="space-y-4 p-6">{applications.map(application=>{
      const reference=application.finalSubmittedVersion;
      const secureDocument=reference?documents.find(document=>document.filename===reference.filename&&document.category?.toLowerCase()==="funding"):undefined;
      const questionCount=application.sections.reduce((sum, section)=>sum+section.questions.length,0);
      const completedCount=application.sections.reduce((sum, section)=>sum+section.questions.filter(question=>question.answer!==null).length,0);
      return <article key={application.id} className="rounded-lg border border-border bg-white/[0.02] p-5">
        <div className="flex flex-wrap items-start justify-between gap-3"><div><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{application.programme}</div><h4 className="mt-2 text-lg font-medium text-foreground">{application.applicationName}</h4></div><span className="rounded border border-border px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">{application.status}</span></div>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-xs md:grid-cols-4"><div><dt className="text-muted-foreground">Version</dt><dd className="mt-1 text-foreground">{application.version}</dd></div><div><dt className="text-muted-foreground">Submission date</dt><dd className="mt-1 text-foreground">{application.submissionDate??"Not submitted"}</dd></div><div><dt className="text-muted-foreground">Funding amount</dt><dd className="mt-1 text-foreground">{application.fundingAmount===null?"Not confirmed":`€${application.fundingAmount.toLocaleString("en-GB")}`}</dd></div><div><dt className="text-muted-foreground">Application progress</dt><dd className="mt-1 text-foreground">{questionCount ? `${completedCount} of ${questionCount} fields drafted` : "Historical record"}</dd></div></dl>
        {reference?<div className="mt-5 rounded-md border border-border p-3"><div className="flex items-center gap-2 text-sm font-medium"><FileText className="h-4 w-4 text-accent"/>{reference.label}</div><div className="mt-1 truncate text-xs text-muted-foreground" title={reference.filename}>{reference.filename}</div>{secureDocument?<button type="button" onClick={()=>onViewDocument(secureDocument)} className="mt-3 text-xs font-medium text-accent">View protected original →</button>:<div className="mt-3 text-xs text-muted-foreground">Awaiting secure Data Room document registration.</div>}</div>:application.sections.length===0?<div className="mt-5 rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground"><FolderOpen className="mb-2 h-4 w-4"/>Empty workspace. No answers, sections, figures or documents have been added.</div>:<div className="mt-5 space-y-3">
          <div className="flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-200"><CheckCircle2 className="h-4 w-4" />Draft only. Nothing has been submitted and all confirmation flags remain visible.</div>
          {application.sections.map(section=><details key={section.id} className="group rounded-md border border-border bg-background/20"><summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-foreground marker:hidden"><span className="flex items-center justify-between gap-3"><span>{section.title}</span><span className="text-xs font-normal text-sky-400 group-open:hidden">See more</span><span className="hidden text-xs font-normal text-sky-400 group-open:inline">See less</span></span></summary><div className="space-y-3 border-t border-border p-4">{section.questions.map(question=><QuestionCard key={question.id} question={question}/>)}</div></details>)}
        </div>}
      </article>;
    })}</div>
    <div className="border-t border-border px-6 py-3 text-center text-[10px] uppercase tracking-[0.22em] text-muted-foreground">KPLS Investor Data Room</div>
  </div>;
}
