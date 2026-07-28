export type RdRecord = Record<string, unknown> & { id: string; created_at?: string; updated_at?: string; version?: number };
export type RdWorkPackage = RdRecord & { code:string;title:string;objective:string;description:string|null;status:string;owner_user_id:string; };
export type RdSummary = { suppliers_identified:number;suppliers_contacted:number;meetings_held:number;rfqs_sent:number;quotations_received:number;open_actions:number;minimum_amount:number|string|null;likely_amount:number|string|null;maximum_amount:number|string|null; };
export type RdResource = "suppliers"|"contacts"|"interactions"|"rfqs"|"quotations"|"findings"|"actions"|"friction"|"mappings";
