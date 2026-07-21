export type ConfidenceLevel =
  | "Unknown"
  | "Estimated"
  | "Survey"
  | "Research"
  | "Expert Opinion"
  | "Supplier Quote"
  | "Pilot Data"
  | "Historical"
  | "Actual"
  | "Verified";

export type AssumptionCategory =
  | "Pricing"
  | "Manufacturing"
  | "Marketing"
  | "Hiring"
  | "Finance"
  | "Growth";

export type EvidenceType =
  | "Supplier Quote"
  | "Research"
  | "Survey"
  | "Competitor Analysis"
  | "Contract"
  | "Invoice"
  | "Prototype Cost"
  | "Document";

export type RecordStatus =
  | "Unknown"
  | "Estimated"
  | "Actual"
  | "Draft"
  | "Active"
  | "Needs Review"
  | "Archived"
  | "Verified";

export interface AuditFields {
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  version: number;
  change_reason: string;
}

export interface VersionEntry {
  version: number;
  value: number;
  at: string;
  by: string;
  reason: string;
}

export interface FinancialAssumption extends AuditFields {
  id: string;
  category: AssumptionCategory;
  name: string;
  value: number;
  unit: string;
  confidence: number;
  confidenceLevel: ConfidenceLevel;
  source: string;
  owner: string;
  status: RecordStatus;
  evidenceIds: string[];
  notes: string;
  linkedMetrics: string[];
  history: VersionEntry[];
}

export interface EvidenceRecord extends AuditFields {
  id: string;
  title: string;
  type: EvidenceType;
  supports: string;
  confidence: number;
  addedAt: string;
  source: string;
  fileName?: string;
}

export interface FinanceEvent {
  id: string;
  type:
    | "assumption.updated"
    | "forecast.recalculated"
    | "evidence.added"
    | "payroll.updated"
    | "scenario.created"
    | "report.generated";
  title: string;
  what: string;
  who: string;
  at: string;
  entityId?: string;
}

export interface DecisionRecord extends AuditFields {
  id: string;
  title: string;
  description: string;
  owner: string;
  date: string;
  financialImpact: number;
  linkedEvidence: string[];
  status: "Proposed" | "Approved" | "Rejected" | "Monitoring";
  outcome: string;
}

export interface RiskRecord extends AuditFields {
  id: string;
  risk: string;
  category: "Revenue" | "Manufacturing" | "Funding" | "Hiring" | "Compliance" | "Market";
  probability: number;
  impact: number;
  owner: string;
  mitigation: string;
  reviewDate: string;
  status: "Open" | "Mitigating" | "Monitoring" | "Closed";
}

export interface Product {
  /*
   * Identity
   */
  id: string;
  name: string;
  version: string;
  status: "Live" | "Beta" | "Planned";
  launchDate: string;

  /*
   * Commercial
   */
  sellingPrice: number;
  subscriptionMonthly: number;
  currency: string;

  /*
   * Manufacturing
   */
  mfgCost: number;
  packaging: number;
  shipping: number;

  supplier: string;
  manufacturingMethod: string;
  minimumOrderQuantity: number;
  leadTimeWeeks: number;

  /*
   * Product
   */
  productType: string;
  targetCustomer: string;

  /*
   * Evidence
   */
  confidence: number;
  confidenceLevel: ConfidenceLevel;
  evidenceIds: string[];

  source: string;

  /*
   * Ownership
   */
  owner: string;
  lastReviewed: string;

  /*
   * Health
   */
  warnings?: string[];

  /*
   * Future
   */
  notes?: string;
}

export interface Hire {
  id: string;
  role: string;
  department: "Engineering" | "Operations" | "Marketing" | "Sales" | "Finance" | "Design";
  salary: number;
  startDate: string;
  status: "Active" | "Planned" | "Offer Out";
}

export interface Funding {
  id: string;
  name: string;
  type: "Grant" | "Investment" | "Round";
  amount: number;
  date: string;
  status: "Received" | "Committed" | "Planned";
  dilution?: number;
}

export interface DocRow {
  id: string;
  name: string;
  type: string;
  size: string;
  updatedAt: string;
  category: string;
}

export type Scenario = "conservative" | "base" | "best";

export type ExpenseCategory =
  | "Payroll"
  | "Research"
  | "Manufacturing"
  | "Technology"
  | "Marketing"
  | "Legal"
  | "Travel"
  | "Operations";
