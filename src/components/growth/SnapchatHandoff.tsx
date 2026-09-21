import {authenticatedBlob} from "@/lib/authenticated-api";
import {useEffect,useRef,useState} from 'react';
import {growthService} from '@/services/growth/growth.service';
import type {SocialProviderOverview,SocialPublishJob,GrowthRecord} from '@/types/growth';

type SnapWindow=Window & {snapKitInit?:()=>void;snap?:{creativekit:{initalizeShareButtons:(buttons:HTMLCollectionOf<Element>)=>void}}};
let sdk:Promise<void>|undefined;
function loadCreativeKit(){
 if(!sdk)sdk=new Promise<void>((resolve,reject)=>{
  const w=window as SnapWindow;
  if(w.snap?.creativekit){resolve();return;}
  const script=document.createElement('script');script.id='snapkit-creative-kit-sdk';script.src='https://sdk.snapkit.com/js/v1/create.js';script.async=true;script.referrerPolicy='no-referrer';
  const timer=setTimeout(()=>{script.remove();sdk=undefined;reject(new Error('Snapchat sharing could not load. Refresh and try again.'));},15000);
  w.snapKitInit=()=>{clearTimeout(timer);resolve();};
  script.onerror=()=>{clearTimeout(timer);script.remove();sdk=undefined;reject(new Error('Snapchat sharing could not load. Check your connection or content blocker.'));};document.head.appendChild(script);
 });return sdk;
}
export function SnapchatHandoff({provider}:{provider:SocialProviderOverview}){
 const [text,setText]=useState(''),[image,setImage]=useState(''),[sources,setSources]=useState<GrowthRecord[]>([]),[media,setMedia]=useState<{id:string;display_name:string;filename:string}[]>([]);
 const [jobs,setJobs]=useState<SocialPublishJob[]>([]),[job,setJob]=useState<SocialPublishJob|null>(null),[handoff,setHandoff]=useState<{url:string;expires_at:string}|null>(null);
 const [preview,setPreview]=useState('');
 const [busy,setBusy]=useState(false),[error,setError]=useState(''),[ready,setReady]=useState(false),[opened,setOpened]=useState(false);const button=useRef<HTMLButtonElement>(null);
 const enabled=provider.handoff_enabled===true;
 const refresh=async()=>setJobs((await growthService.socialPublishJobs()).filter(j=>j.provider==='snapchat'));
 useEffect(()=>{void Promise.all([growthService.list('content').then(setSources),growthService.handoffMedia().then(setMedia),refresh()]).catch(()=>setError('Content could not be loaded. Refresh this page.'));},[]);
 useEffect(()=>{setReady(false);if(!handoff)return;let cancelled=false;void loadCreativeKit().then(()=>{if(cancelled||!button.current)return;(window as SnapWindow).snap!.creativekit.initalizeShareButtons(document.getElementsByClassName('snapchat-share-button'));setReady(true);}).catch(e=>{if(!cancelled)setError(e.message);});return()=>{cancelled=true;};},[handoff]);
 useEffect(()=>{let cancelled=false,url='';setPreview('');if(image)void authenticatedBlob(`/api/growth/social/handoff-media/${image}/preview`).then(blob=>{url=URL.createObjectURL(blob);if(!cancelled)setPreview(url);else URL.revokeObjectURL(url);}).catch(()=>{if(!cancelled)setError('Image preview unavailable. Choose another approved image.');});return()=>{cancelled=true;if(url)URL.revokeObjectURL(url);};},[image]);
 const action=async(fn:()=>Promise<void>)=>{setBusy(true);setError('');try{await fn();await refresh();}catch(e){setError(e instanceof Error?e.message:'Action failed. Refresh and review the current state.');}finally{setBusy(false);}};
 const prepare=()=>action(async()=>{if(!provider.connection||!provider.publishing_destination)return;
 const source=await growthService.create('content',{title:text.trim().slice(0,80),content_type:'text',platform:'snapchat',status:'script',caption:text.trim()});
 const variant=await growthService.saveSocialVariant(source.id,'snapchat',text.trim(),provider.publishing_destination,image?[{publishing_asset_id:image}]:[]);
 const draft=await growthService.createSocialPublishJob(provider.connection.id,variant.id);setJob(await growthService.socialPublishJob(draft.id));});
 const approve=()=>action(async()=>{if(!job)return;await growthService.approveSocialVariant(job.content_variant_id);setJob(await growthService.approveSocialPublishJob(job));});
 const handoffAction=()=>action(async()=>{if(!job)return;setHandoff(await growthService.prepareSocialHandoff(job));});
 const reset=()=>{setJob(null);setHandoff(null);setOpened(false);setText('');setImage('');};
 const cls='rounded-lg border border-black/25 bg-white px-3 py-2 text-sm font-semibold text-black disabled:opacity-40';
 return <section aria-label="Snapchat Creative Kit" className="space-y-3 rounded-xl bg-white p-4 text-black">
 <h4 className="font-bold">Snapchat Creative Kit — manual share</h4>
 <p className="text-sm">Share an approved link with its title and optional image preview. This web flow does not insert a full-screen photo/video or publish directly. On mobile Snapchat opens; on desktop scan the Snapcode with Snapchat.</p>
 <p className="text-sm">Login Kit identity: {provider.connection?.provider_account_name??'Not connected'}. Creative Kit uses the account signed into the Snapchat app; check it before sending.</p>
 {!enabled&&<p className="text-red-800">Connect Snapchat with Login Kit before preparing a handoff.</p>}
 {preview&&<img src={preview} alt="Selected approved Snapchat preview" className="max-h-64 max-w-full"/>}
 {error&&<p role="alert" className="text-red-800">{error}</p>}
 {!job?<>
 <label className="block">Start from existing content<select className="block w-full border p-2" defaultValue="" onChange={e=>{const item=sources.find(s=>s.id===e.target.value);if(item)setText(String(item.caption??item.title??'').slice(0,500));}}><option value="">Write new content</option>{sources.map(s=><option key={s.id} value={s.id}>{String(s.title)}</option>)}</select></label>
 <label className="block">Share title / text<textarea className="block w-full border p-2" maxLength={500} rows={4} value={text} onChange={e=>setText(e.target.value)}/></label>
 <label className="block">Approved image preview<select className="block w-full border p-2" value={image} onChange={e=>setImage(e.target.value)}><option value="">Text/link preview only</option>{media.map(m=><option value={m.id} key={m.id}>{m.display_name||m.filename}</option>)}</select></label>
 <button className={cls} disabled={busy||!enabled||!text.trim()||Boolean(image&&!preview)} onClick={()=>void prepare()}>Prepare for review</button>
 </>:<>
 <p>Content: <strong>{job.copy}</strong></p><p>Login Kit account: {job.account_name} · Approval: {job.status}</p>
 <p className="text-sm">Approval permits a public, unlisted share page and any selected approved image to be retrieved for 72 hours. Snapchat may cache previews. Do not include private information.</p>
 {job.status==='draft'&&<button className={cls} disabled={busy||!enabled||Boolean(image&&!preview)} onClick={()=>void approve()}>Approve this Snapchat content</button>}
 {job.status==='approved'&&!handoff&&<button className={cls} disabled={busy||!enabled||job.approval_fingerprint!==job.current_fingerprint} onClick={()=>void handoffAction()}>Prepare approved handoff</button>}
 {handoff&&<><p role="status" className="text-green-800">Handoff ready. Nothing has been published by Growth OS.</p><a href={handoff.url} target="_blank" rel="noreferrer" className="underline">Preview approved share page</a><p className="text-xs">Expires {new Date(handoff.expires_at).toLocaleString('en-GB')}</p><button ref={button} className={`${cls} snapchat-share-button`} data-share-url={handoff.url} disabled={!ready||busy} onClick={()=>setOpened(true)}>Share to Snapchat</button>{opened&&<p>Complete or cancel the final share inside Snapchat. Growth OS cannot confirm whether you sent it.</p>}</>}
 <button className={cls} disabled={busy} onClick={reset}>Prepare another item</button>
 </>}
 {jobs.length>0&&<details><summary>Recent Snapchat approvals</summary>{jobs.slice(0,10).map(j=><button key={j.id} className="block underline" disabled={busy} onClick={()=>{setJob(j);setImage(j.media_references?.[0]?.publishing_asset_id??'');setHandoff(null);setOpened(false);}}>{j.copy.slice(0,70)} · {j.status}</button>)}</details>}
 </section>;
}
