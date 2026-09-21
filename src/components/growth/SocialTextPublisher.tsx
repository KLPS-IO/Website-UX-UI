import { useEffect, useState } from 'react';
import { growthService } from '@/services/growth/growth.service';
import type { SocialProviderOverview, SocialPublishJob } from '@/types/growth';
import { canPublishJob, xPublishingEnabled } from '@/lib/social-publishing';

export function SocialTextPublisher({provider}: {provider:SocialProviderOverview}) {
 const [text,setText]=useState(''),[job,setJob]=useState<SocialPublishJob|null>(null),[jobs,setJobs]=useState<SocialPublishJob[]>([]);
 const [busy,setBusy]=useState(false),[error,setError]=useState('');
 const enabled=xPublishingEnabled(provider);
 const refresh=async()=>{const items=await growthService.socialPublishJobs();setJobs(items.filter(item=>item.provider===provider.provider));};
 useEffect(()=>{void refresh().catch(()=>setError('Publish jobs could not be loaded.'));},[provider.provider]);
 const action=async(fn:()=>Promise<void>)=>{setBusy(true);setError('');try{await fn();await refresh();}catch(e){setError(e instanceof Error?e.message:'The action could not be completed. Refresh this job before retrying.');}finally{setBusy(false);}};
 const prepare=()=>action(async()=>{
  if(!provider.connection||!provider.publishing_destination||!text.trim())return;
  const source=await growthService.create('content',{title:text.trim().slice(0,80),content_type:'text',platform:provider.provider,status:'script',caption:text.trim()});
  const variant=await growthService.saveSocialVariant(source.id,provider.provider,text.trim(),provider.publishing_destination);
  const draft=await growthService.createSocialPublishJob(provider.connection.id,variant.id);
  setJob(await growthService.socialPublishJob(draft.id));
 });
 const approve=()=>action(async()=>{if(!job)return;await growthService.approveSocialVariant(job.content_variant_id);setJob(await growthService.approveSocialPublishJob(job));});
 const publish=()=>{if(!job||!window.confirm(`Publish this approved text to ${job.account_name} on X now?\n\n${job.copy}`))return;
  void action(async()=>{setJob(await growthService.publishSocialJob(job));});};
 const button='rounded-lg border border-white/25 px-3 py-2 text-sm font-semibold text-white disabled:opacity-40';
 return <section className="mt-4 space-y-3 border-t border-white/10 pt-4" aria-label="X text publishing">
  <h4 className="font-bold text-white">Founder-approved X text posts</h4>
  <p className="text-sm text-white/65">Review the text and destination, approve the post, then select Publish now. Connecting or scheduling never posts automatically.</p>
  {!enabled&&<p className="text-sm text-amber-200">Reconnect X with tweet.write to enable publishing.</p>}
  {error&&<p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-950">{error}</p>}
  {!job?<><label className="block text-sm text-white" htmlFor="x-post-copy">Post text</label><textarea id="x-post-copy" value={text} onChange={e=>setText(e.target.value)} rows={5} maxLength={4000} className="w-full rounded-lg border border-white/20 bg-black/25 p-3 text-white" placeholder="Write the text you want to review"/><p className="text-xs text-white/60">Text only. X's 280 weighted-character limit is checked before approval.</p><button className={button} disabled={busy||!enabled||!text.trim()} onClick={()=>void prepare()}>Prepare for review</button></>:<div className="space-y-3 rounded-lg border border-white/20 p-4">
   <p className="text-sm text-white/70">Destination: <strong>{job.account_name}</strong> · Status: {job.status}</p>
   <p className="whitespace-pre-wrap break-words text-white">{job.copy}</p>
   {job.needs_review&&<p role="alert" className="text-sm text-amber-200">Outcome unconfirmed. Check X before taking further action. This job cannot be resent.</p>}
   {job.last_error_code&&<p role="status" className="text-sm text-amber-200">{job.last_error_code.replaceAll('_',' ')}{job.retry_after?` · Retry after ${new Date(job.retry_after).toLocaleString('en-GB')}`:''}</p>}
   {job.provider_post_url&&<a href={job.provider_post_url} target="_blank" rel="noreferrer" className="block text-[#35d3c8] underline">View published post</a>}
   <div className="flex flex-wrap gap-2">
    {job.status==='draft'&&<button className={button} disabled={busy||!enabled} onClick={()=>void approve()}>Approve this text and account</button>}
    {canPublishJob(job)&&<button className="rounded-lg bg-[#df3fae] px-3 py-2 text-sm font-bold text-white disabled:opacity-40" disabled={busy||!enabled} onClick={publish}>{job.status==='retry'?'Retry approved post':'Publish now'}</button>}
    <button className={button} disabled={busy} onClick={()=>void action(async()=>setJob(await growthService.socialPublishJob(job.id)))}>Refresh status</button>
    <button className={button} disabled={busy} onClick={()=>{setJob(null);setText('');setError('');}}>New draft</button>
   </div>
  </div>}
  {jobs.length>0&&<div><h5 className="text-sm font-semibold text-white">Recent publish jobs</h5><ul className="mt-2 space-y-1">{jobs.slice(0,10).map(item=><li key={item.id}><button className="text-left text-sm text-white/70 underline" disabled={busy} onClick={()=>setJob(item)}>{item.copy.slice(0,65)} · {item.status}{item.needs_review?' — check X':''}</button></li>)}</ul></div>}
 </section>;
}
