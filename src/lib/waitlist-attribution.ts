import { API_BASE } from '@/config/api';
const key = 'klps.first-party-attribution.v1';
type Touch = {token:string;expires_at:string};
let memory: Touch | null = null;
let attempt: {code:string;token:string}|null = null;
let pending: Promise<void> | null = null;
export function currentAttribution(): Touch | null {
 try { const saved=sessionStorage.getItem(key); if(saved) memory=JSON.parse(saved); } catch { /* Storage may be blocked. */ }
 if (!memory || !/^[a-f0-9]{64}$/.test(memory.token) || (!Number.isFinite(Date.parse(memory.expires_at)) || Date.parse(memory.expires_at)<=Date.now())) { memory=null; try { sessionStorage.removeItem(key); } catch { /* optional storage */ } }
 return memory;
}
export function clearAttribution() { memory=null;attempt=null;try {sessionStorage.removeItem(key);} catch { /* optional storage */ } }
export function allowAttribution(code:string): Promise<void> {
 if(currentAttribution())return Promise.resolve();
 if(pending)return pending;
 const token=attempt?.code===code?attempt.token:Array.from(crypto.getRandomValues(new Uint8Array(32)),b=>b.toString(16).padStart(2,'0')).join('');
 attempt={code,token};
 pending=(async()=>{
  const response=await fetch(`${API_BASE}/api/waitlist/visits`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code,token,consent:true}),signal:AbortSignal.timeout(8000)});
  if(!response.ok)throw new Error('Measurement unavailable. You can still join the waitlist.');
  const body=await response.json();
  if(typeof body.expires_at!=='string'||!Number.isFinite(Date.parse(body.expires_at)))throw new Error('Measurement unavailable.');
  memory={token,expires_at:body.expires_at};try {sessionStorage.setItem(key,JSON.stringify(memory));} catch { /* In-memory session still works. */ }
 })().finally(()=>{pending=null;});
 return pending;
}
export async function waitlistAttributionToken() { try {await pending;} catch { /* Signup must work without measurement. */ } return currentAttribution()?.token ?? null; }
