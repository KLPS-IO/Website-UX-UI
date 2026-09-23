import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
// Architectural privacy regression: the existing page-wide PDF/print controls must
// never capture a newly opened PSB. Real form/API behaviour is exercised separately.
test('application and PSB are excluded from page-wide exports and browser storage',()=>{
 const source=readFileSync(new URL('../components/finance/DebtApplicationWorkspace.tsx',import.meta.url),'utf8');
 assert.match(source,/<section[^>]*data-html2canvas-ignore="true"[^>]*className="print:hidden/);
 assert.doesNotMatch(source,/(?:localStorage|sessionStorage)\.setItem/);
 const api=readFileSync(new URL('../services/debt-applications.ts',import.meta.url),'utf8');
 assert.match(api,/psb:\(id:string\)=>authenticatedApi<Psb>/);
 const general=api.split('export type WorkspaceApp=')[1].split('export type Workspace=')[0];
 assert.doesNotMatch(general,/monthly_amount|monthly_income|monthly_expenses/);
});
