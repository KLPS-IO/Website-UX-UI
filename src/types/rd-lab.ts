export type RdRecord = Record<string, unknown> & {
  id: string;
  created_at?: string;
  updated_at?: string;
  version?: number;
};
export type RdSupplier = RdRecord & {
  organisation_name: string;
  organisation_aliases?: string[] | null;
  category: string;
  country?: string | null;
  website?: string | null;
  existing_relationship?: string | null;
  priority_tier?: string | null;
  procurement_status: string;
  source_reference?: string | null;
  research_notes?: string | null;
};
export type RdWorkPackage = RdRecord & {
  code: string;
  title: string;
  objective: string;
  description: string | null;
  status: string;
  owner_user_id: string;
};
export type RdSummary = {
  suppliers_identified: number;
  suppliers_contacted: number;
  meetings_held: number;
  rfqs_sent: number;
  quotations_received: number;
  open_actions: number;
  minimum_amount: number | string | null;
  likely_amount: number | string | null;
  maximum_amount: number | string | null;
};
export type RdResource =
  | "suppliers"
  | "contacts"
  | "interactions"
  | "rfqs"
  | "quotations"
  | "findings"
  | "actions"
  | "friction"
  | "mappings";
export type ProcurementStageState =
  | "Not Started"
  | "In Progress"
  | "Ready"
  | "Complete";
export type ProcurementProgressStage = {
  key: string;
  label: string;
  state: ProcurementStageState;
  completed_count: number;
  target_count: number | null;
  supporting_counts: Record<string, number>;
};
export type ProcurementProgress = {
  work_package_id: string;
  current_stage: string;
  next_action: string;
  blocking_reason: string | null;
  stages: ProcurementProgressStage[];
  summary: {
    suppliers_identified: number;
    suppliers_verified?: number;
    suppliers_shortlisted: number;
    suppliers_contacted: number;
    meetings_held: number;
    rfqs_sent: number;
    quotations_received: number;
    valid_quotations: number;
    finance_mappings_complete: number;
    critical_actions_open: number;
    linked_evidence_count: number;
  };
  calculated_at: string;
};
