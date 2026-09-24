import { useState } from 'react';
import { Psb, Reconciliation } from '@/services/debt-applications';
const input='mt-1 w-full rounded border border-border bg-background p-2';
const money=(n:number|null)=>n==null?'Unknown':new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'}).format(n);
export function PrivatePsbReconciliation({psb,busy,save}:{psb:Psb;busy:boolean;save:(v:Record<string,unknown>)=>Promise<void>}){
 const [editing,setEditing]=useState(false);
 const [context,setContext]=useState<Reconciliation>(psb.reconciliation??{source:'',source_date:'',source_sha256:null,policy:[],commitments:[],exclusions:[],warnings:[]});
 return <section className="my-4 rounded border border-border p-4" aria-label="Private reconciliation and disclosures">
  <h3 className="font-semibold">Working reconciliation and private disclosures</h3>
  <p>{psb.summary.working_reconciled?'Founder inputs reconciled.':'Reconciliation required: review current entries and confirm category totals.'} {psb.summary.evidence_follow_up?'Source evidence review remains separate.':''}</p>
  <p className="my-2 text-sm">{psb.summary.rule}</p>
  {psb.summary.temporary_commitments_unresolved&&<p role="alert" className="font-semibold text-red-700 dark:text-red-300">Temporary instalment timing is unresolved. The indicative headroom above is before those payments; it is not lender affordability approval.</p>}
  {psb.reconciliation&&<><p className="mt-3 text-sm">Source: {psb.reconciliation.source} · {psb.reconciliation.source_date}</p>
   <ul className="my-3 list-disc pl-5">{psb.reconciliation.warnings.map(w=><li key={w}>{w}</li>)}</ul>
   <h4 className="font-semibold">Existing commitments (disclosure, not additional monthly expenditure)</h4>
   {psb.reconciliation.commitments.map((c,i)=><article key={i} className="my-2 rounded border p-3"><p>{c.label}: balance {money(c.balance)} · monthly {money(c.monthly_payment)}{c.apr!=null?` · APR ${c.apr}%`:''}</p><p className="text-sm">{c.classification} · {c.basis}</p><p className="text-sm">{c.included_psb_row?`Already included in PSB E${c.included_psb_row}.`:'Separately disclosed; not added to normalised totals.'} {c.end_month?`Ends ${c.end_month}.`:''} {c.period_start_month?`Period ${c.period_start_month}–${c.period_end_month??'unknown'}.`:''}</p></article>)}
   <details className="my-3"><summary>Excluded variable / historical items and reconciliation rules</summary>{psb.reconciliation.exclusions.map((e,i)=><p className="mt-2 text-sm" key={i}>{e.label}{e.amount!=null?` · ${money(e.amount)}`:''}{e.date?` · ${e.date}`:''}: {e.classification}. {e.reason}</p>)}<ol className="mt-3 list-decimal pl-5">{psb.reconciliation.policy.map(p=><li key={p.code}>{p.rule}</li>)}</ol></details>
  </>}
  <button type="button" className="rounded border px-3 py-2" onClick={()=>setEditing(!editing)}>Review reconciliation and disclosures</button>
  {editing&&<form className="mt-4 space-y-3" onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);void save({entry_versions:psb.entries.map(e=>({id:e.id,version:e.version})),previous_reconciliation_id:psb.reconciliation?.id??null,source:String(f.get('source')),source_date:String(f.get('source_date')),source_sha256:null,commitments:context.commitments,exclusions:context.exclusions,warnings:context.warnings,expected_income:Number(f.get('expected_income')),expected_expenses:Number(f.get('expected_expenses')),review_confirmed:f.get('review_confirmed')==='on'}).then(()=>setEditing(false));}}>
   <p className="text-sm">Recheck category/component mapping and disclosures. Saving pins current entry revisions. An incorrect total stops reconciliation without changing any amount.</p>
   <label className="block">Source / founder reconciliation basis<input name="source" className={input} defaultValue={context.source} required maxLength={1500}/></label>
   <label className="block">Source date<input name="source_date" type="date" className={input} defaultValue={context.source_date} required/></label>
   <div className="grid gap-3 sm:grid-cols-2">{[['expected_income','Approved monthly income',psb.summary.monthly_income],['expected_expenses','Approved monthly expenses',psb.summary.monthly_expenses]].map(([name,label,value])=><label key={String(name)}>{label}<input name={String(name)} className={input} type="number" step="0.01" min="0" required defaultValue={value??''}/></label>)}</div>
   <h4 className="font-semibold">Commitments</h4>
   {context.commitments.map((c,i)=><fieldset key={i} className="grid gap-3 rounded border p-3 sm:grid-cols-2"><legend>{c.label||'New commitment'}</legend>{Object.entries(c).map(([key,value])=><label key={key}>{key.replaceAll('_',' ')}{key==='kind'?<select className={input} value={String(value??'')} onChange={e=>setContext({...context,commitments:context.commitments.map((x,n)=>n===i?{...x,kind:e.target.value}:x)})}>{['revolving','hire_purchase','temporary','paid_off'].map(k=><option key={k}>{k}</option>)}</select>:<input className={input} type={['balance','monthly_payment','apr','included_psb_row'].includes(key)?'number':key.includes('month')?'month':'text'} step="0.01" min="0" value={value??''} onChange={e=>setContext({...context,commitments:context.commitments.map((x,n)=>n===i?{...x,[key]:e.target.value===''?null:['balance','monthly_payment','apr','included_psb_row'].includes(key)?Number(e.target.value):e.target.value}:x)})}/>}</label>)}<button type="button" onClick={()=>setContext({...context,commitments:context.commitments.filter((_,n)=>n!==i)})}>Remove disclosure in next revision</button></fieldset>)}
   <button type="button" className="rounded border p-2" onClick={()=>setContext({...context,commitments:[...context.commitments,{label:'',kind:'temporary',balance:null,monthly_payment:null,apr:null,end_month:null,period_start_month:null,period_end_month:null,included_psb_row:null,basis:'',classification:''}]})}>Add private commitment</button>
   <label className="block">Evidence / timing follow-up (one point per line)<textarea className={input} value={context.warnings.join('\n')} onChange={e=>setContext({...context,warnings:e.target.value.split('\n').filter(Boolean)})}/></label>
   <p className="text-sm">Excluded historical items and policy remain preserved from the prior reconciliation; no excluded amount is added to income or expenses.</p>
   <label className="block"><input type="checkbox" name="review_confirmed" required/> I explicitly confirm these working totals, classifications and disclosures. This is not a statement of lender approval.</label>
   <button disabled={busy} className="rounded border px-3 py-2">Record private reconciliation</button>
  </form>}
 </section>;
}
