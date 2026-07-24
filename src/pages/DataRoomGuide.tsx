import { ArrowLeft, CheckCircle2, Download, ExternalLink, Folder, Mail, Printer, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader, SectionTitle, Surface } from "@/components/finance/PageHeader";
import { exportCurrentFinancePagePdf, printCurrentFinancePage } from "@/lib/finance-page-export";
import { useDataRoomViewer } from "@/hooks/useDataRoomViewer";

const folders = [
  ["00", "Read First", "Orientation, navigation and data-room guidance."],
  ["01", "Corporate", "Company formation, ownership and statutory records."],
  ["02", "Finance", "Accounting, tax, banking and financial evidence."],
  ["03", "Fundraising", "Investment materials, funding rounds and SEIS documentation."],
  ["04", "Product", "Product specifications, roadmap and commercial model."],
  ["05", "Technology", "Technical development, architecture and validation."],
  ["06", "Intellectual Property", "Invention, ownership and intellectual-property records."],
  ["07", "Manufacturing", "Materials, suppliers, quotations and production evidence."],
  ["08", "Market", "Market research, sizing and competitive evidence."],
  ["09", "Customers", "Customer discovery, waitlist, pilots and demand evidence."],
  ["10", "Research", "Academic research, testing and research partnerships."],
  ["11", "Regulatory", "Compliance, data protection and regulatory pathway."],
  ["12", "Legal", "Contracts, policies, resolutions and legal documentation."],
  ["13", "Team", "Founder, team, advisors and organisational records."],
  ["14", "Press", "Media coverage, awards and approved public materials."],
  ["99", "Archive", "Superseded records retained for historical reference."],
] as const;

const evidenceControls = [
  "Evidence code",
  "Version history",
  "Upload date",
  "Verification status",
  "Secure storage",
  "Entity relationships",
] as const;

export default function DataRoomGuidePage() {
  const viewer = useDataRoomViewer();

  if (!viewer) return <div className="finance-theme flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
    <Surface className="max-w-lg">
      <SectionTitle title="Authenticated Data Room" />
      <p className="text-sm text-muted-foreground">An authorised Data Room session is required to view this document.</p>
      <Link className="guide-action mt-4" to="/data-room"><ArrowLeft className="h-4 w-4" /> Return to Data Room</Link>
    </Surface>
  </div>;

  return <div className="finance-theme min-h-screen bg-background text-foreground">
    <header className="print:hidden flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/90 px-4 py-3 md:px-8">
      <div className="flex flex-wrap gap-2">
        <Link to="/finance/dashboard" className="guide-action"><ArrowLeft className="h-4 w-4" /> Return to Finance Dashboard</Link>
        <Link to="/data-room/finance/documents" className="guide-action"><Folder className="h-4 w-4" /> Open Documents</Link>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="guide-action" onClick={printCurrentFinancePage}><Printer className="h-4 w-4" /> Print</button>
        <button className="guide-action" onClick={() => void exportCurrentFinancePagePdf("/data-room/guide")}><Download className="h-4 w-4" /> Export PDF</button>
      </div>
    </header>

    <main data-finance-page-content className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
      <div className="mb-8 rounded-2xl border border-brand-orange/20 bg-gradient-to-br from-brand-orange/[0.09] via-background to-brand-purple/[0.06] p-6 md:p-9">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-orange/20 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-orange">
          <ShieldCheck className="h-3.5 w-3.5" /> 00 Read First
        </div>
        <PageHeader eyebrow="Investor Data Room" title="Read Me First" description="A concise guide to navigating and relying on the canonical evidence held for KLPS Ltd." />
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
          <span><strong className="text-foreground">Document owner:</strong> Emma Mendez</span>
          <span><strong className="text-foreground">Version:</strong> 1.0</span>
          <span><strong className="text-foreground">Status:</strong> Current</span>
        </div>
      </div>

      <div className="space-y-6">
        <GuideSection number="01" title="Welcome">
          <p>This Data Room contains the canonical evidence supporting KLPS Ltd. It brings together the company’s corporate records, financial evidence, research, product development, technology, manufacturing and regulatory documentation in one controlled workspace.</p>
          <p className="mt-3 text-muted-foreground">It is designed to support efficient, well-informed review by authorised investors, grant assessors and advisors.</p>
        </GuideSection>

        <GuideSection number="02" title="Navigation">
          <p className="mb-5 text-muted-foreground">Documents are organised by business area. Begin with this folder, then move directly to the evidence relevant to your review.</p>
          <div className="grid gap-3 md:grid-cols-2">
            {folders.map(([number, name, description]) => <div key={number} className="flex gap-3 rounded-xl border border-border bg-background/55 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10 font-mono text-xs font-bold text-brand-orange">{number}</div>
              <div><div className="flex items-center gap-2 font-semibold"><Folder className="h-4 w-4 text-muted-foreground" /> {name}</div><p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p></div>
            </div>)}
          </div>
        </GuideSection>

        <GuideSection number="03" title="Source of Truth">
          <p>Every canonical document is managed with the controls needed for traceable review:</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {evidenceControls.map((control) => <div key={control} className="flex items-center gap-3 rounded-lg border border-border px-3 py-3"><CheckCircle2 className="h-4 w-4 shrink-0 text-brand-sage" /><span className="font-medium">{control}</span></div>)}
          </div>
          <div className="mt-5 rounded-xl border border-brand-purple/20 bg-brand-purple/[0.06] p-4 font-medium">The Data Room is the canonical source of evidence for KLPS Ltd.</div>
        </GuideSection>

        <GuideSection number="04" title="Updates">
          <p>Documents are updated as company milestones are completed and new verified evidence becomes available. When a document is replaced, its superseded version remains historically available through the version record, preserving a clear and auditable evidence trail.</p>
        </GuideSection>

        <GuideSection number="05" title="Contact">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">Founder &amp; CEO</div>
              <div className="mt-2 text-xl font-semibold">Emma Mendez</div>
              <div className="mt-5 space-y-3">
                <a className="flex w-fit items-center gap-2 text-brand-orange hover:underline" href="mailto:emmamendez@klps.co.uk"><Mail className="h-4 w-4" /> emmamendez@klps.co.uk</a>
                <a className="flex w-fit items-center gap-2 text-brand-orange hover:underline" href="https://klps.co.uk" target="_blank" rel="noreferrer"><ExternalLink className="h-4 w-4" /> klps.co.uk</a>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-background/60 px-5 py-4 text-sm"><div className="text-xs uppercase tracking-wider text-muted-foreground">Version</div><div className="mt-1 font-semibold">1.0</div></div>
          </div>
        </GuideSection>
      </div>
    </main>
  </div>;
}

function GuideSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <Surface className="break-inside-avoid">
    <div className="mb-5 flex items-center gap-3"><span className="font-mono text-xs font-bold text-brand-orange">{number}</span><SectionTitle title={title} /></div>
    <div className="text-sm leading-7 text-foreground">{children}</div>
  </Surface>;
}
