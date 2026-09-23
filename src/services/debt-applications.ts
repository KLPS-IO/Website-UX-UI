import { authenticatedApi } from '@/lib/authenticated-api';
export type Field={key:string;label:string;type:'text'|'money'|'number'|'date'|'select';options?:string[]};
export type Evidence={id:string;title:string;version:number;file_version:number|null;evidence_code?:string};
export type Item={id:string;code:string;section:string;title:string;application_field:string;status:string;data:Record<string,string|number|null>;source:string;source_date:string|null;evidence_id:string|null;evidence_version:number|null;evidence_title?:string;locator:string;classification:string;rationale:string;next_action:string;owner:string;version:number;ready:boolean};
export type PsbEntry={id:string;workbook_row:number;kind:string;title:string;monthly_amount:string|null;status:string;source:string;source_date:string|null;period_start:string|null;period_end:string|null;evidence_id:string|null;evidence_version:number|null;locator:string;rationale:string;version:number};
export type Psb={entries:PsbEntry[];summary:{ready:boolean;complete:number;total:number;monthly_income:number|null;monthly_expenses:number|null;annual_income:number|null;annual_expenses:number|null;monthly_surplus:number|null;after_proposed_payment:number|null;affordability:string;rule:string};history:{entry_id:string;entry_version:number;snapshot:unknown;recorded_at:string}[]};
export type WorkspaceApp={application:{id:string;product:string;partner:string;status:string;requested_amount:string;term_months:number;indicative_rate:string;rate_source:string;rate_as_of:string;forecast_start:string|null;decision_status:string;version:number};items:Item[];payment:{monthly:number;total:number;interest:number;basis:string};budget:{provisional_allocated:number;evidenced_eligible:number;unallocated:number;unknown_cost_lines:number;overallocated:boolean};summary:{psb:{ready:boolean;complete:number;total:number};affordability:string;cash_flow_ready:boolean;complete:number;total:number;blockers:{code:string;title:string;next_action:string;section:string}[];unresolved_contradictions:number;documents_ready:number;documents_total:number};history:{id:string;entity_kind:string;entity_version:number;recorded_at:string;snapshot:unknown}[]};
export type Workspace={applications:WorkspaceApp[];fields:Record<string,Field[]>;statuses:string[];classifications:string[];application_statuses:string[];position:{as_of:string;cash:{value:string|null;state:string;as_of:string|null};credit_observations:{id:string;metric:string;value:string;as_of:string;stale:boolean;review_status:string}[];engagements:{id:string;provider:string;budget_ex_vat:string|null;price_basis:string;status:string}[];vat:{id:string;obligation_reference:string;result:string;box_5:string;box_6:string}[];expense_control:{active_records:number;founder_paid_records:number};warning:string};template:{version:string;workbook:{filename:string;sha256:string};guide:{filename:string;sha256:string}}};
const path='/api/finance/debt-applications';
const write=(url:string,body:Record<string,unknown>,method='POST')=>authenticatedApi(url,{method,body:JSON.stringify(body)});
export const debtApi={
 get:()=>authenticatedApi<Workspace>(path), initialise:()=>write(path,{}),
 update:(id:string,input:Record<string,unknown>)=>write(`${path}/${id}`,input,'PATCH'),
 item:(id:string,item:string|null,input:Record<string,unknown>)=>write(`${path}/${id}/items${item?`/${item}`:''}`,input,item?'PATCH':'POST'),
 psb:(id:string)=>authenticatedApi<Psb>(`${path}/${id}/psb`),
 savePsb:(id:string,entry:string,input:Record<string,unknown>)=>write(`${path}/${id}/psb/${entry}`,input,'PATCH'),
 interaction:(id:string,input:Record<string,unknown>)=>write(`${path}/${id}/interactions`,input),
 review:(id:string,input:Record<string,unknown>)=>write(`${path}/${id}/reviews`,input),
 evidence:()=>authenticatedApi<{evidence:Evidence[]}>('/api/finance/evidence?limit=500')
};
