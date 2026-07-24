import { CheckCircle2, Download, FileCheck2, PieChart, ShieldCheck, TableProperties } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "@/assets/logo.webp";
import { PageHeader, SectionTitle, Surface } from "@/components/finance/PageHeader";
import { exportCurrentFinancePagePdf } from "@/lib/finance-page-export";
import { capTable, exportCapTableExcel } from "@/services/cap-table/cap-table.service";

const money = (value: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2 }).format(value);
const percent = (value: number) => new Intl.NumberFormat("en-GB", { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
const date = (value: string) => new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
const exportButton = "inline-flex items-center gap-2 rounded-lg border border-border bg-white/70 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:cursor-wait disabled:opacity-60";

const summary = [
  ["Total Shares Issued", String(capTable.totals.sharesIssued)],
  ["Number of Shareholders", String(capTable.totals.shareholders)],
  ["Fully Diluted Ownership", percent(capTable.calculatedHoldings[0].fullyDilutedOwnership)],
  ["Option pool", "None"],
  ["Convertible Securities", "None"],
] as const;

export default function CapTablePage() {
  const { pathname } = useLocation();
  const [pdfPreparing, setPdfPreparing] = useState(false);
  const [excelPreparing, setExcelPreparing] = useState(false);
  const [exportError, setExportError] = useState("");

  const exportPdf = async () => {
    setPdfPreparing(true); setExportError("");
    try { await exportCurrentFinancePagePdf(pathname); }
    catch (error) { console.error("Cap table PDF export failed", error); setExportError("PDF export failed. Please try again."); }
    finally { setPdfPreparing(false); }
  };
  const exportExcel = async () => {
    setExcelPreparing(true); setExportError("");
    try { await exportCapTableExcel(capTable); }
    catch (error) { console.error("Cap table Excel export failed", error); setExportError("Excel export failed. Please try again."); }
    finally { setExcelPreparing(false); }
  };

  return <div>
    <PageHeader
      eyebrow="Company ownership"
      title="Capitalisation Table (Cap Table)"
      description="Current ownership, issued share capital and equity structure for KLPS Ltd."
      actions={<div className="flex flex-wrap items-center justify-end gap-2">
        <button type="button" className={exportButton} onClick={() => void exportPdf()} disabled={pdfPreparing} aria-label="Export capitalisation table as PDF"><Download className="h-4 w-4" /> {pdfPreparing ? "Preparing PDF…" : "Export PDF"}</button>
        <button type="button" className={exportButton} onClick={() => void exportExcel()} disabled={excelPreparing} aria-label="Export capitalisation table as Excel workbook"><TableProperties className="h-4 w-4" /> {excelPreparing ? "Preparing Excel…" : "Export Excel"}</button>
      </div>}
    />
    {exportError && <div role="alert" className="mb-4 rounded-lg border border-brand-coral/25 bg-brand-coral/10 p-3 text-sm text-brand-coral">{exportError}</div>}

    <Surface className="finance-pdf-block mb-6 overflow-hidden">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white">
            <img src={logo} alt="KLPS company logo" className="h-16 w-16 scale-[3.4] object-contain" />
          </div>
          <div className="min-w-0"><div className="text-xs font-bold uppercase tracking-[0.12em] text-brand-purple">Verified incorporation snapshot</div><h2 className="mt-1 break-words text-2xl font-semibold">KLPS Ltd</h2><p className="mt-1 text-sm text-muted-foreground">Canonical Company ownership record</p></div>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-sage/25 bg-brand-sage/10 px-3 py-1.5 text-xs font-semibold text-brand-sage"><CheckCircle2 className="h-3.5 w-3.5" /> {capTable.status}</span>
        </div>
        <dl className="grid gap-4 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-3">
          <Meta label="Company" value={capTable.company.legalName} />
          <Meta label="Trading Name" value={capTable.company.tradingName} />
          <Meta label="Company Number" value={capTable.company.companyNumber} />
          <Meta label="Effective Date" value={date(capTable.effectiveDate)} />
          <Meta label="Version" value={capTable.version} />
          <Meta label="Status" value={capTable.status} />
        </dl>
      </div>
    </Surface>

    <Surface className="finance-pdf-block mb-6">
      <SectionTitle title="Purpose" />
      <p className="max-w-4xl text-sm leading-7 text-muted-foreground">This document represents the current ownership structure of KIDS, LADIES &amp; PARENTS, SPECIALISTS LTD, including its issued shares, shareholder ownership and current equity-instrument position as at the effective date stated above.</p>
    </Surface>

    <section className="finance-pdf-block mb-6">
      <div className="rounded-2xl border border-brand-purple/20 bg-brand-purple/[0.05] p-5">
      <SectionTitle title="Ownership Summary" hint="Current verified position" />
      <div className="cap-table-summary mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {summary.map(([label, value]) => <article key={label} className="rounded-xl border border-border bg-card p-4"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-3 text-xl font-semibold">{value}</div></article>)}
      </div>
      </div>
    </section>

    <Surface className="finance-pdf-block mb-6" padded={false}>
      <div className="border-b border-border px-5 py-4"><SectionTitle title="Current Ownership" hint="Issued share capital" /></div>
      <div className="cap-table-desktop-table hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px] text-sm">
          <thead><tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground"><th className="px-5 py-3">Shareholder</th><th className="px-3 py-3">Share Class</th><th className="px-3 py-3">Shares Held</th><th className="px-3 py-3">% Ownership</th><th className="px-3 py-3">Date Issued</th><th className="px-5 py-3">Notes</th></tr></thead>
          <tbody>{capTable.calculatedHoldings.map((holding) => <tr key={holding.shareholder} className="border-t border-border"><td className="px-5 py-4 font-semibold">{holding.shareholder}</td><td className="px-3 py-4">{holding.shareClass}</td><td className="px-3 py-4">{holding.sharesHeld}</td><td className="px-3 py-4">{percent(holding.votingOwnership)}</td><td className="px-3 py-4">{date(holding.dateIssued)}</td><td className="px-5 py-4">{holding.notes}</td></tr>)}
          <tr className="border-t-2 border-border bg-muted/30 font-semibold"><td className="px-5 py-4">Total</td><td className="px-3 py-4">Ordinary</td><td className="px-3 py-4">{capTable.totals.sharesIssued}</td><td className="px-3 py-4">100.00%</td><td className="px-3 py-4">—</td><td className="px-5 py-4">{money(capTable.totals.nominalShareCapital)} total nominal capital</td></tr>
          </tbody>
        </table>
      </div>
      <div className="cap-table-mobile-cards space-y-3 p-4 md:hidden">{capTable.calculatedHoldings.map((holding) => <article key={holding.shareholder} className="rounded-xl border border-border p-4"><h3 className="font-semibold">{holding.shareholder}</h3><dl className="mt-3 grid grid-cols-2 gap-3"><Meta label="Share Class" value={holding.shareClass} /><Meta label="Shares Held" value={String(holding.sharesHeld)} /><Meta label="% Ownership" value={percent(holding.votingOwnership)} /><Meta label="Date Issued" value={date(holding.dateIssued)} /><div className="col-span-2"><Meta label="Notes" value={holding.notes} /></div></dl></article>)}</div>
    </Surface>

    <div className="cap-table-two-column mb-6 grid gap-6 lg:grid-cols-2">
      <Surface className="finance-pdf-block">
        <SectionTitle title="Ordinary Share Rights" />
        <p className="mb-4 text-sm text-muted-foreground">The current cap table contains one issued Ordinary share.</p>
        <ul className="space-y-3">{[capTable.rights.voting, capTable.rights.dividends, capTable.rights.distributions, "No amount unpaid"].map((right) => <li key={right} className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-4 w-4 shrink-0 text-brand-sage" /> {right}</li>)}</ul>
      </Surface>
      <Surface className="finance-pdf-block">
        <SectionTitle title="Ownership Visualisation" hint="Text equivalent: Emma Mendez — 100%" />
        <div className="mt-5 flex items-center gap-5"><div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-[12px] border-brand-purple bg-background"><PieChart className="h-5 w-5 text-brand-purple" aria-hidden="true" /></div><div><div className="text-lg font-semibold">Emma Mendez</div><div className="text-2xl font-semibold text-brand-purple">100%</div><p className="text-xs text-muted-foreground">1 of 1 issued shares</p></div></div>
      </Surface>
    </div>

    <Surface className="finance-pdf-block mb-6">
      <SectionTitle title="Equity Instruments" />
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Meta label="Option pool" value={capTable.equityInstruments.optionPool} /><Meta label="Employee share options" value={capTable.equityInstruments.employeeOptions} /><Meta label="Convertible notes" value={capTable.equityInstruments.convertibleNotes} /><Meta label="SAFEs" value={capTable.equityInstruments.safes} /><Meta label="Warrants" value={capTable.equityInstruments.warrants} /><Meta label="Preference shares" value={capTable.equityInstruments.preferenceShares} /><Meta label="External investors" value={capTable.equityInstruments.externalInvestors} />
      </dl>
    </Surface>

    <Surface className="finance-pdf-block mb-6">
      <SectionTitle title="Notes" />
      <ul className="grid gap-3 sm:grid-cols-2">
        {[
          "There are currently no employee options.",
          "No SAFEs.",
          "No Convertible Notes.",
          "No Warrants.",
          "No Preference Shares.",
          "No Outstanding Equity Instruments.",
        ].map((note) => <li key={note} className="flex items-center gap-3 rounded-lg border border-border bg-background/60 p-3 text-sm"><CheckCircle2 className="h-4 w-4 shrink-0 text-brand-sage" /> {note}</li>)}
      </ul>
    </Surface>

    <div className="cap-table-two-column mb-6 grid gap-6 lg:grid-cols-2">
      <Surface className="finance-pdf-block">
        <SectionTitle title="Evidence & Provenance" />
        <div className="flex gap-3"><FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" /><dl className="grid gap-3"><Meta label="Primary evidence" value={capTable.evidence.title} /><Meta label="Evidence includes" value={capTable.evidence.includes.join(" · ")} /><Meta label="Source organisation" value={capTable.evidence.sourceOrganisation} /><Meta label="Evidence status" value={capTable.evidence.status} /><Meta label="Evidence record" value="Evidence record available in Corporate Documents" /></dl></div>
      </Surface>
      <Surface className="finance-pdf-block">
        <SectionTitle title="Version & Audit" />
        <dl className="grid gap-3 sm:grid-cols-2"><Meta label="Version" value={capTable.version} /><Meta label="Effective date" value={date(capTable.effectiveDate)} /><Meta label="Prepared for" value={capTable.audit.preparedFor} /><Meta label="Document owner" value={capTable.audit.documentOwner} /><div className="sm:col-span-2"><Meta label="Change reason" value={capTable.audit.changeReason} /></div><div className="sm:col-span-2"><Meta label="Next review" value={capTable.audit.nextReview} /></div></dl>
      </Surface>
    </div>

    <footer className="finance-pdf-block rounded-xl border border-brand-orange/25 bg-brand-orange/[0.07] p-5">
      <div className="flex gap-3 text-sm font-medium leading-6"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" /><p>This cap table is maintained as the canonical record of the Company&apos;s equity ownership and will be updated following any issuance, transfer or cancellation of shares, option grants or other equity instruments.</p></div>
      <div className="mt-4 border-t border-brand-orange/15 pt-3 text-center text-xs text-muted-foreground">KLPS Ltd · Capitalisation Table · Version 1.0</div>
    </footer>
  </div>;
}

function Meta({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</dt><dd className="mt-1 break-words text-sm font-medium">{value}</dd></div>;
}
