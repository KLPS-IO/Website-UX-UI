// Compatibility entry point. All financial calculations are server-owned.
import {authenticatedApi} from '@/lib/authenticated-api';
import type {CanonicalModel} from '@/types/finance-canonical';
export type {Scenario} from '@/types/finance';
export type FinanceState=CanonicalModel;
export const MONTHS=18;
export const START=new Date(new Date().getFullYear(),new Date().getMonth(),1);
export const expenseCategories=['Payroll','Research','Manufacturing','Technology','Marketing','Legal','Travel','Operations'] as const;
export async function buildFinancialEngine(scenario='base'){return (await authenticatedApi<{model:CanonicalModel}>(`/api/finance/canonical-model?scenario=${encodeURIComponent(scenario)}`)).model;}
export const createInitialFinanceState=()=>buildFinancialEngine();
export const calculateFinanceModel=(_state:FinanceState,scenario='base')=>buildFinancialEngine(scenario);
export const currency=(n:number|null)=>n===null?'Not yet evidenced':new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',maximumFractionDigits:0}).format(n);
export const currencyShort=currency;
export const pct=(n:number|null,digits=1)=>n===null?'Not yet evidenced':`${(n*100).toFixed(digits)}%`;
