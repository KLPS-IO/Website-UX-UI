import type {
  DecisionRecord,
  DocRow,
  EvidenceRecord,
  FinanceEvent,
  Funding,
  Hire,
  RiskRecord,
} from "@/types/finance";

// Truthful V1 starts empty. Records are added only when genuine source material exists.
export const evidence: EvidenceRecord[] = [];
export const hires: Hire[] = [];
export const funding: Funding[] = [];
export const documents: DocRow[] = [];
export const decisions: DecisionRecord[] = [];
export const risks: RiskRecord[] = [];
export const seedActivity: FinanceEvent[] = [];
