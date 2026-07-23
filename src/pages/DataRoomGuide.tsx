import { ArrowLeft, Download, Printer, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader, SectionTitle, Surface } from "@/components/finance/PageHeader";
import { exportCurrentFinancePagePdf, printCurrentFinancePage } from "@/lib/finance-page-export";
import { useDataRoomViewer } from "@/hooks/useDataRoomViewer";

const folders = [
  ["00_READ_FIRST", "Guide, index and navigation documents."],
  ["01_CORPORATE", "Incorporation, constitutional documents, ownership and statutory company records."],
  ["02_FINANCE", "Tax, accounting, banking, budgets, financial models and financial evidence."],
  ["03_FUNDRAISING", "Pitch materials, SEIS/EIS, investor documents, applications and round information."],
  ["04_PRODUCT", "Product definitions, pricing, unit economics, specifications and roadmap evidence."],
  ["05_TECHNOLOGY", "System architecture, electronics, software and technical-development evidence."],
  ["06_INTELLECTUAL_PROPERTY", "Patent strategy, invention records, ownership, confidentiality and freedom-to-operate work."],
  ["07_MANUFACTURING", "Materials, suppliers, quotations, bill of materials, manufacturing and testing."],
  ["08_MARKET", "Market sizing, competitor research, industry reports and commercial evidence."],
  ["09_CUSTOMERS", "Customer discovery, interviews, waitlist, pilots and customer evidence."],
  ["10_RESEARCH", "Academic papers, experimental findings, surveys and research partnerships."],
  ["11_REGULATORY", "Regulatory pathway, data protection, medical-device considerations and compliance."],
  ["12_LEGAL", "Contracts, terms, policies, resolutions and legal advice."],
  ["13_TEAM", "Founder information, advisors, hiring plans and option-scheme documents."],
  ["14_PRESS", "Media, awards, accelerator announcements and approved public materials."],
  ["99_ARCHIVE", "Superseded or inactive records retained for audit history."],
] as const;

const statuses = [
  ["Verified", "Backed by authoritative evidence and reviewed."], ["Under Review", "Evidence exists but requires validation."],
  ["Active", "Current document or record."], ["Draft", "Not yet approved for reliance."],
  ["Superseded", "Replaced by a newer version."], ["Archived", "Retained for history but not current."],
  ["Expired", "No longer valid or beyond its review date."],
] as const;

const schedule = [
  ["Corporate and statutory documents", "Review after every filing or legal change."],
  ["Finance and banking", "Review monthly and after material transactions."],
  ["Fundraising", "Review whenever the round, valuation, target or legal status changes."],
  ["Product and manufacturing", "Review after new quotations, prototypes, tests or specification changes."],
  ["Market and customers", "Review quarterly or after significant new research."],
  ["Regulatory and legal", "Review after legal advice, policy changes or regulatory milestones."],
  ["Team", "Review after appointments, departures or option grants."],
  ["Full data-room audit", "Quarterly."],
] as const;

export default function DataRoomGuidePage() {
  const navigate = useNavigate();
  const viewer = useDataRoomViewer();
  const uploadGuide = () => navigate("/data-room/finance/documents", { state: { documentUploadPrefill: {
    title: "KLPS Data Room Guide", category: "Read First", sourceOrganisation: "KLPS Ltd", linkMode: true,
    entityType: "company", relationship: "Guides authorised review of the KLPS data room",
  } } });

  if (!viewer) return <div className="finance-theme flex min-h-screen items-center justify-center bg-background p-6 text-foreground"><Surface className="max-w-lg"><SectionTitle title="Authenticated Data Room" /><p className="text-sm text-muted-foreground">An authorised Data Room session is required to view the guide.</p><Link className="guide-action mt-4" to="/data-room"><ArrowLeft className="h-4 w-4" /> Return to Data Room</Link></Surface></div>;

  return <div className="finance-theme min-h-screen bg-background text-foreground">
    <header className="print:hidden flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/90 px-4 py-3 md:px-8">
      <Link to="/data-room/finance/documents" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Return to Documents</Link>
      <div className="flex flex-wrap gap-2"><button className="guide-action" onClick={printCurrentFinancePage}><Printer className="h-4 w-4" /> Print Guide</button><button className="guide-action" onClick={() => void exportCurrentFinancePagePdf("/data-room/guide")}><Download className="h-4 w-4" /> Export PDF</button><button className="guide-action bg-brand-orange text-primary-foreground" onClick={uploadGuide}><Upload className="h-4 w-4" /> Upload Guide</button></div>
    </header>
    <main data-finance-page-content className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      <PageHeader eyebrow="Read First" title="KLPS Ltd — Data Room Guide" description="How to navigate, interpret and request information from the KLPS investor data room." />
      <div className="space-y-6">
        <GuideSection title="Purpose"><p>This data room contains the documents and evidence supporting KLPS Ltd’s legal status, financial model, fundraising plans, technology development, market research and commercial strategy.</p></GuideSection>
        <GuideSection title="How to use the data room"><ul className="guide-list"><li>Begin with the Read First folder.</li><li>Review the Company and Fundraising folders for legal and investment readiness.</li><li>Use Evidence codes such as EVD-0001 when referring to specific records.</li><li>Use the Finance OS links to trace assumptions, products, decisions and risks back to evidence.</li><li>Request clarification through the named founder contact rather than relying on outdated copies.</li></ul></GuideSection>
        <GuideSection title="Folder index"><div className="grid gap-3 md:grid-cols-2">{folders.map(([code, description]) => <div key={code} className="rounded-lg border border-border p-3"><div className="font-mono text-xs font-semibold text-brand-orange">{code}</div><p className="mt-1 text-sm text-muted-foreground">{description}</p></div>)}</div></GuideSection>
        <GuideSection title="Key contacts"><div className="grid gap-4 md:grid-cols-2"><div><div className="text-xs uppercase tracking-wider text-muted-foreground">Founder and primary data-room contact</div><p className="mt-2 font-medium">Emma Mendez<br />Founder and CEO<br />KLPS Ltd<br /><a className="text-brand-orange" href="mailto:emmamendez@klps.co.uk">emmamendez@klps.co.uk</a></p></div><dl className="space-y-3">{["Accountant", "Legal/fundraising adviser", "Technical/R&D contact", "Data-protection contact"].map((label) => <div key={label}><dt className="text-xs font-semibold">{label}</dt><dd className="text-sm text-muted-foreground">To be completed before canonical upload</dd></div>)}</dl></div></GuideSection>
        <GuideSection title="Document-status definitions"><dl className="grid gap-3 md:grid-cols-2">{statuses.map(([status, definition]) => <div key={status} className="rounded-lg border border-border p-3"><dt className="font-semibold">{status}</dt><dd className="mt-1 text-sm text-muted-foreground">{definition}</dd></div>)}</dl></GuideSection>
        <GuideSection title="Updating schedule"><div className="overflow-x-auto"><table className="w-full text-sm"><tbody>{schedule.map(([area, timing]) => <tr key={area} className="border-t border-border first:border-0"><th className="px-3 py-3 text-left font-semibold">{area}</th><td className="px-3 py-3 text-muted-foreground">{timing}</td></tr>)}</tbody></table></div></GuideSection>
        <GuideSection title="Version and ownership"><dl className="grid gap-4 md:grid-cols-2">{["Guide version", "Last updated", "Document owner", "Next scheduled review", "Change reason"].map((label) => <div key={label}><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt><dd className="mt-1 text-sm">To be completed before canonical upload</dd></div>)}</dl></GuideSection>
        <GuideSection title="Disclaimer"><p>This data room is provided for authorised business review. Information may include forward-looking plans, estimates and assumptions. Users should distinguish verified records from information marked estimated, preparing, under review or not yet evidenced.</p></GuideSection>
      </div>
    </main>
  </div>;
}

function GuideSection({ title, children }: { title: string; children: React.ReactNode }) { return <Surface><SectionTitle title={title} /><div className="text-sm leading-7 text-foreground">{children}</div></Surface>; }
