export type FinanceGlossaryEntry = {
  term: string;
  definition: string;
  aliases?: readonly string[];
  learnMoreUrl?: string;
};

export const financeGlossary = {
  ARR: { term: "ARR", definition: "Annual Recurring Revenue" },
  ARPU: { term: "ARPU", definition: "Average Revenue Per User" },
  ASP: { term: "ASP", definition: "Average Selling Price" },
  BOM: { term: "BOM", definition: "Bill of Materials" },
  BTA: { term: "BTA", definition: "Business Tax Account" },
  "Burn Rate": { term: "Burn Rate", definition: "Monthly Cash Burn" },
  CAC: { term: "CAC", definition: "Customer Acquisition Cost" },
  CapEx: { term: "CapEx", definition: "Capital Expenditure" },
  "Cash Flow": { term: "Cash Flow", definition: "Money In vs Money Out" },
  Churn: { term: "Churn", definition: "Customer Loss Rate" },
  COGS: { term: "COGS", definition: "Cost of Goods Sold" },
  CPA: { term: "CPA", definition: "Cost Per Acquisition" },
  EBITDA: { term: "EBITDA", definition: "Earnings Before Interest, Tax, Depreciation and Amortisation" },
  EIS: { term: "EIS", definition: "Enterprise Investment Scheme" },
  Forecast: { term: "Forecast", definition: "Financial Projection" },
  GDPR: { term: "GDPR", definition: "General Data Protection Regulation" },
  GM: { term: "GM", definition: "Gross Margin" },
  HMRC: { term: "HMRC", definition: "His Majesty's Revenue and Customs" },
  ICO: { term: "ICO", definition: "Information Commissioner's Office" },
  KPI: { term: "KPI", definition: "Key Performance Indicator", aliases: ["KPIs"] },
  LOI: { term: "LOI", definition: "Letter of Intent", aliases: ["LOIs"] },
  LTV: { term: "LTV", definition: "Lifetime Value" },
  "LTV:CAC": { term: "LTV:CAC", definition: "Lifetime Value to Customer Acquisition Cost", aliases: ["LTV / CAC", "LTV/CAC"] },
  MOQ: { term: "MOQ", definition: "Minimum Order Quantity" },
  MRR: { term: "MRR", definition: "Monthly Recurring Revenue" },
  NDA: { term: "NDA", definition: "Non-Disclosure Agreement", aliases: ["NDAs"] },
  OpEx: { term: "OpEx", definition: "Operating Expenditure" },
  PoC: { term: "PoC", definition: "Proof of Concept" },
  "P&L": { term: "P&L", definition: "Profit and Loss Statement" },
  "R&D": { term: "R&D", definition: "Research and Development" },
  ROAS: { term: "ROAS", definition: "Return on Advertising Spend" },
  ROI: { term: "ROI", definition: "Return on Investment" },
  Runway: { term: "Runway", definition: "Months of Remaining Cash" },
  Scenario: { term: "Scenario", definition: "What-if Financial Model", aliases: ["Scenarios"] },
  SEIS: { term: "SEIS", definition: "Seed Enterprise Investment Scheme" },
  SIC: { term: "SIC", definition: "Standard Industrial Classification" },
  SKU: { term: "SKU", definition: "Stock Keeping Unit" },
  TRL: { term: "TRL", definition: "Technology Readiness Level" },
  UoM: { term: "UoM", definition: "University of Manchester" },
  VAT: { term: "VAT", definition: "Value Added Tax" },
  VRN: { term: "VRN", definition: "VAT Registration Number" },
} as const satisfies Record<string, FinanceGlossaryEntry>;

export type FinanceGlossaryKey = keyof typeof financeGlossary;

const entries = Object.entries(financeGlossary) as [FinanceGlossaryKey, FinanceGlossaryEntry][];
export const financeGlossaryTerms = entries
  .flatMap(([key, entry]) => [key, entry.term, ...(entry.aliases ?? [])].map((term) => ({ key, term })))
  .sort((a, b) => b.term.length - a.term.length);

export function getFinanceGlossaryEntry(value: string): FinanceGlossaryEntry | undefined {
  const match = financeGlossaryTerms.find(({ key, term }) => key.toLowerCase() === value.toLowerCase() || term.toLowerCase() === value.toLowerCase());
  return match ? financeGlossary[match.key] : undefined;
}

