export type DisclosureStatus = "verified" | "completed" | "in_progress" | "planned" | "not_evidenced";

export const investorDisclosure = {
  version: "1.0",
  asOf: "30 September 2026",
  company: {
    legalName: "KIDS, LADIES & PARENTS, SPECIALISTS LTD",
    tradingName: "KLPS",
    companyNumber: "16436591",
    companyType: "Private company limited by shares",
    companyStatus: "Active",
    jurisdiction: "United Kingdom",
    stage: "Pre-revenue · product development",
  },
  capTable: {
    holdings: [{ shareholder: "Emma Mendez", shareClass: "Ordinary", shares: 1, ownership: 100, votingRights: 100, nominalValue: 1 }],
    totalShares: 1,
    totalNominalCapital: 1,
    externalInvestors: "None",
    optionPool: "None",
    convertibles: "None",
    note: "No completed share subdivision is reflected. Illustrative fundraising scenarios do not alter current ownership.",
  },
  commercialForecast: {
    cohort: "Controlled Founding 50 commercial pilot",
    customers: 50,
    forecastSales: 9125,
    estimatedDirectCostPerUnit: 60,
    forecastDirectCosts: 3000,
    forecastGrossContribution: 6125,
    qualification: "Planning forecast, not contracted revenue or existing sales. Unit costs will be refined when production quotations are confirmed.",
  },
  funding: {
    receivedExternalInvestment: 0,
    startUpLoan: { amount: 7000, status: "in_progress" as DisclosureStatus, statement: "Application materials and supporting forecast prepared; no loan proceeds are treated as received." },
    seis: { status: "in_progress" as DisclosureStatus, statement: "Investment-readiness work is underway. No SEIS Advance Assurance or investor commitment is claimed." },
    unconfirmedFundingTreatment: "Applications, grants, investment discussions and borrowing are excluded from cash until received.",
  },
  useOfFunds: [
    { item: "Ignitec Bristol product-development workshop", amount: 2550 },
    { item: "Workshop travel", amount: 450 },
    { item: "SEIS investment-readiness support", amount: 1194 },
    { item: "10 prototype and pilot garments", amount: 1000 },
    { item: "Prototype iteration, replacement materials and testing", amount: 1806 },
  ],
  operatingReadiness: [
    { label: "Business banking", status: "completed" as DisclosureStatus, statement: "Business bank account established. Account identifiers and balances remain founder-only." },
    { label: "Accounting and VAT", status: "completed" as DisclosureStatus, statement: "QuickFile is in use. VAT return 26A2 was submitted on 29 September 2026 as a nil return with £0 payable." },
    { label: "HMRC filing record", status: "verified" as DisclosureStatus, statement: "One non-financial late-submission point is recorded for 26A2. Financial penalty: £0; no £200 liability is represented." },
    { label: "Business credit card", status: "in_progress" as DisclosureStatus, statement: "Provider research/onboarding only. No approved facility, limit or borrowing capacity is represented." },
  ],
  cashPosition: {
    status: "not_evidenced" as DisclosureStatus,
    statement: "Current cash and cash-only runway are not published in this v1.0 investor snapshot. Planned or pending funding is not substituted for cash.",
  },
  intellectualProperty: "No patent, freedom-to-operate or complete IP-assignment position is represented as verified. Dated engineering records and controlled evidence are maintained while the formal IP position develops.",
  governanceNote: "This disclosure is purpose-built for authorised investor review. Founder-only Financial OS records, account details, personal credit information, internal scenarios and private notes are excluded.",
} as const;
