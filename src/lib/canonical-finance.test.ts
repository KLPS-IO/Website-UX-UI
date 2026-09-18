import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {displayMoney} from './canonical-finance.ts';
test('unknown money never formats as zero; real zero remains visible',()=>{assert.equal(displayMoney(null),'Not yet evidenced');assert.equal(displayMoney(undefined),'Not yet evidenced');assert.equal(displayMoney('0'),'£0.00');assert.equal(displayMoney('123.45'),'£123.45');});
test('financial engine is a server facade with no competing cash/runway formula',()=>{const s=readFileSync('src/finance/financialEngine.ts','utf8');assert.match(s,/\/api\/finance\/canonical-model/);assert.doesNotMatch(s,/cash\s*\/\s*burn|plannedFunding|Math\.max/);});
test('dashboard and forecasts consume the same server-owned presentation',()=>{for(const p of ['dashboard','cash-flow','kpis','forecasts','scenarios','reports'])assert.match(readFileSync(`src/pages/Finance.${p}.tsx`,'utf8'),/CanonicalFinancePage/);assert.doesNotMatch(readFileSync('src/components/finance/CanonicalFinancePage.tsx','utf8'),/Model synced/);});
