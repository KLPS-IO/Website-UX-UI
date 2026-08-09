export type FinanceReadinessState="SUBMITTED"|"OVERDUE"|"BLOCKED"|"READY_TO_EXPORT"|"EXPORTED_NOT_FILED"|"IN_REVIEW"|"UPCOMING";
export type FinanceAction={id:string;action_type:string;title:string;description:string|null;status:"open"|"in_progress"|"waiting"|"completed"|"dismissed";priority:"low"|"normal"|"high"|"critical";due_date:string|null;recommended_start_date:string|null;is_machine_verifiable:boolean;deep_link:string|null};
export type CompliancePeriod={id:string;start_date:string;end_date:string;filing_deadline:string;readiness_state:FinanceReadinessState;reminder:{days_remaining:number;milestone:number|"overdue"|null}};
export type FinanceCompliance={as_of:string;primary_period:CompliancePeriod|null;periods:CompliancePeriod[];actions:FinanceAction[]};
