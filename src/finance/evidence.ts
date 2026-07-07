import type { DecisionRecord, DocRow, EvidenceRecord, FinanceEvent, Funding, Hire, RiskRecord } from "@/types/finance";

const audit = (date: string, by = "Emma / Founder") => ({
  created_at: date,
  updated_at: date,
  created_by: by,
  updated_by: by,
  version: 1,
  change_reason: "Initial Finance OS placeholder",
});

export const evidence: EvidenceRecord[] = [
  { id: "ev-1", title: "Pricing Sensitivity Study - Van Westendorp", type: "Research", supports: "asp", confidence: 82, addedAt: "2026-06-14", source: "Internal / Attest", fileName: "pricing-study-q1.pdf", ...audit("2026-06-14") },
  { id: "ev-2", title: "Subscription Willingness Survey (n=412)", type: "Survey", supports: "sub_price", confidence: 74, addedAt: "2026-05-02", source: "Typeform export", fileName: "subscription-survey.csv", ...audit("2026-05-02") },
  { id: "ev-3", title: "Shenzhen A - Manufacturing Quote", type: "Supplier Quote", supports: "mfg_cost", confidence: 88, addedAt: "2026-06-01", source: "Supplier PDF", fileName: "supplier-quote-shenzhen-a.pdf", ...audit("2026-06-01", "Operations") },
  { id: "ev-4", title: "LOI - Northwind Retail (Enterprise)", type: "Contract", supports: "ent_rev", confidence: 55, addedAt: "2026-05-25", source: "DocuSign", fileName: "northwind-loi.pdf", ...audit("2026-05-25") },
  { id: "ev-5", title: "Meta Ads Q2 Invoice", type: "Invoice", supports: "cac", confidence: 71, addedAt: "2026-06-30", source: "Xero", fileName: "meta-ads-q2.pdf", ...audit("2026-06-30", "Growth Lead") },
  { id: "ev-6", title: "Bank Statement June 2026", type: "Invoice", supports: "opening_cash", confidence: 100, addedAt: "2026-07-01", source: "Barclays", fileName: "bank-statement-jun-2026.pdf", ...audit("2026-07-01", "Finance") },
  { id: "ev-7", title: "Packaging Prototype Cost Sheet", type: "Prototype Cost", supports: "packaging", confidence: 90, addedAt: "2026-04-11", source: "Operations", fileName: "packaging-cost-sheet.xlsx", ...audit("2026-04-11", "Operations") },
  { id: "ev-8", title: "3PL Fulfilment Contract", type: "Contract", supports: "shipping", confidence: 80, addedAt: "2026-04-11", source: "3PL partner", fileName: "fulfilment-contract.pdf", ...audit("2026-04-11", "Operations") },
  { id: "ev-9", title: "Waitlist Segment Export", type: "Document", supports: "waitlist", confidence: 95, addedAt: "2026-07-01", source: "Segment", fileName: "waitlist-export.csv", ...audit("2026-07-01", "Growth Lead") },
  { id: "ev-10", title: "Wearable Launch Competitor Benchmarks", type: "Competitor Analysis", supports: "conv", confidence: 62, addedAt: "2026-06-20", source: "Internal research", fileName: "wearable-launch-benchmarks.pdf", ...audit("2026-06-20", "Growth Lead") },
];

export const hires: Hire[] = [
  { id: "h1", role: "Founder / CEO", department: "Operations", salary: 60000, startDate: "2026-01", status: "Active" },
  { id: "h2", role: "CTO", department: "Engineering", salary: 95000, startDate: "2026-01", status: "Active" },
  { id: "h3", role: "Senior Engineer", department: "Engineering", salary: 82000, startDate: "2026-04", status: "Active" },
  { id: "h4", role: "Product Designer", department: "Design", salary: 68000, startDate: "2026-06", status: "Active" },
  { id: "h5", role: "Growth Lead", department: "Marketing", salary: 72000, startDate: "2026-09", status: "Offer Out" },
  { id: "h6", role: "Ops Manager", department: "Operations", salary: 58000, startDate: "2026-10", status: "Planned" },
  { id: "h7", role: "Enterprise AE", department: "Sales", salary: 78000, startDate: "2027-01", status: "Planned" },
  { id: "h8", role: "Finance Analyst", department: "Finance", salary: 55000, startDate: "2027-03", status: "Planned" },
];

export const funding: Funding[] = [
  { id: "f1", name: "Innovate UK Grant", type: "Grant", amount: 250000, date: "2026-02-01", status: "Received" },
  { id: "f2", name: "Angel Round", type: "Investment", amount: 500000, date: "2026-03-15", status: "Received", dilution: 0.08 },
  { id: "f3", name: "SEIS Top-up", type: "Investment", amount: 150000, date: "2026-05-01", status: "Received", dilution: 0.02 },
  { id: "f4", name: "Seed Round", type: "Round", amount: 2500000, date: "2027-01-01", status: "Planned", dilution: 0.18 },
];

export const documents: DocRow[] = [
  { id: "d1", name: "KLPS_Financial_Model_v14.xlsx", type: "XLSX", size: "1.4 MB", updatedAt: "2026-07-02", category: "Model" },
  { id: "d2", name: "Investor_Deck_July2026.pdf", type: "PDF", size: "8.2 MB", updatedAt: "2026-07-01", category: "Deck" },
  { id: "d3", name: "Cap_Table.xlsx", type: "XLSX", size: "220 KB", updatedAt: "2026-06-28", category: "Legal" },
  { id: "d4", name: "Supplier_Contract_Shenzhen.pdf", type: "PDF", size: "3.1 MB", updatedAt: "2026-06-01", category: "Supplier" },
  { id: "d5", name: "SEIS_Advance_Assurance.pdf", type: "PDF", size: "412 KB", updatedAt: "2026-05-15", category: "Tax" },
  { id: "d6", name: "Bank_Statement_June26.pdf", type: "PDF", size: "180 KB", updatedAt: "2026-07-01", category: "Bank" },
];

export const decisions: DecisionRecord[] = [
  {
    id: "dec-1",
    title: "Hold launch ASP at GBP 249",
    description: "Keep the base hardware price under GBP 250 until pilot conversion data proves appetite for a premium bundle.",
    owner: "Founder",
    date: "2026-06-18",
    financialImpact: 186000,
    linkedEvidence: ["ev-1"],
    status: "Monitoring",
    outcome: "Review after July cohort pricing test.",
    ...audit("2026-06-18"),
  },
  {
    id: "dec-2",
    title: "Plan Seed Round for January 2027",
    description: "Use grants and angel cash to extend runway, then raise after manufacturing quote confidence improves.",
    owner: "Founder",
    date: "2026-07-01",
    financialImpact: 2500000,
    linkedEvidence: ["ev-6"],
    status: "Approved",
    outcome: "Seed round appears in best/base forecast scenarios.",
    ...audit("2026-07-01"),
  },
];

export const risks: RiskRecord[] = [
  {
    id: "risk-1",
    risk: "Enterprise revenue depends on LOIs converting to paid contracts.",
    category: "Revenue",
    probability: 0.58,
    impact: 0.78,
    owner: "Founder",
    mitigation: "Reduce enterprise weighting until contracts are signed and attach each LOI as evidence.",
    reviewDate: "2026-08-01",
    status: "Mitigating",
    ...audit("2026-07-01"),
  },
  {
    id: "risk-2",
    risk: "Manufacturing quote changes after prototype iteration.",
    category: "Manufacturing",
    probability: 0.42,
    impact: 0.72,
    owner: "Operations",
    mitigation: "Secure second supplier quote and track BOM deltas by version.",
    reviewDate: "2026-07-20",
    status: "Open",
    ...audit("2026-06-24", "Operations"),
  },
  {
    id: "risk-3",
    risk: "Seed timing slips by one quarter.",
    category: "Funding",
    probability: 0.35,
    impact: 0.81,
    owner: "Founder",
    mitigation: "Maintain conservative scenario and grant pipeline.",
    reviewDate: "2026-08-15",
    status: "Monitoring",
    ...audit("2026-07-02"),
  },
];

export const seedActivity: FinanceEvent[] = [
  { id: "a1", type: "assumption.updated", at: "2h", who: "Emma", title: "Manufacturing Cost Updated", what: "Updated assumption Average Selling Price to GBP 249", entityId: "asp" },
  { id: "a2", type: "forecast.recalculated", at: "6h", who: "System", title: "Revenue Forecast Recalculated", what: "Recalculated 18-month cash flow after ASP change", entityId: "asp" },
  { id: "a3", type: "evidence.added", at: "1d", who: "Marcus", title: "Added Supplier Quote", what: "Uploaded Supplier Contract - Shenzhen", entityId: "ev-3" },
  { id: "a4", type: "evidence.added", at: "2d", who: "Emma", title: "Added Enterprise Evidence", what: "Added evidence: LOI - Northwind Retail", entityId: "ev-4" },
  { id: "a5", type: "forecast.recalculated", at: "3d", who: "System", title: "Forecast Accuracy Updated", what: "Forecast accuracy improved to 87%" },
];
