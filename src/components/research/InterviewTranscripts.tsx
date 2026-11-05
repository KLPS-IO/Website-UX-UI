import { useEffect, useState } from 'react';
import { authenticatedApi } from '@/lib/authenticated-api';
import { questions } from '@/lib/customer-interviews';
type Transcript={id:string;question_key:string;status:string;original_text:string|null;edited_text:string|null;model:string;revision:number;error_message:string|null;approved_at:string|null};
type Result={configured:boolean;model:string;transcripts:Transcript[]};
const label=(key:string)=>questions.find(q=>q[0]===key)?.[1]||(key==='concepts'?'Concept conversation':key==='offer'?'Offer conversation':key);
export default function InterviewTranscripts({id,onDirty}:{id:string;onDirty?:(dirty:boolean)=>void}){
 const [open,setOpen]=useState(false);const [data,setData]=useState<Result>();const [error,setError]=useState('');const [busy,setBusy]=useState(false);const [dirty,setDirty]=useState<string[]>([]);
 const endpoint=`/api/research/interviews/${id}/transcripts`;
 async function load(){try{setData(await authenticatedApi<Result>(endpoint));setError('');}catch(e){setError(e instanceof Error?e.message:'Could not load transcripts.');}}
 useEffect(()=>{if(open)void load();},[open,id]);
 const pending=data?.transcripts.some(t=>['queued','processing'].includes(t.status));
 useEffect(()=>{if(!open||!pending)return;const timer=setInterval(()=>{void load();},4000);return ()=>clearInterval(timer);},[open,pending,id]);
 useEffect(()=>{onDirty?.(dirty.length>0);return ()=>onDirty?.(false);},[dirty.length]);
 async function queue(retryFailed=false){setBusy(true);setError('');try{await authenticatedApi(endpoint,{method:'POST',body:JSON.stringify({retryFailed})});await load();}catch(e){setError(e instanceof Error?e.message:'Could not start transcription.');}finally{setBusy(false);}}
 function exportText(){if(!data)return;const blob=new Blob([JSON.stringify({interviewId:id,exportedAt:new Date().toISOString(),transcripts:data.transcripts},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`interview-${id}-transcripts.json`;a.click();URL.revokeObjectURL(url);}
 return <section className="rounded-2xl border border-purple-200 bg-purple-50 p-4 space-y-4">
  <h3 className="text-lg font-semibold">Read and review transcripts</h3>
  {!open?<button type="button" className="rounded-full bg-purple-900 px-5 py-3 text-white" onClick={()=>setOpen(true)}>Open transcripts</button>:<>
   <p className="text-sm">Transcription sends saved audio to OpenAI for processing. Text stays in your private research workspace. Check it against the recording, especially prices, numbers and who said what. Original machine text is preserved; approval does not automatically approve interview statistics.</p>
   {!data&&!error&&<p>Loading transcripts…</p>}
   {data&&!data.configured&&<p className="rounded-lg bg-amber-50 p-3">Transcription is ready to connect. Add OPENAI_API_KEY to the KLPS backend first.</p>}
   {data&&<div className="flex flex-wrap gap-3"><button type="button" disabled={!data.configured||busy||pending||dirty.length>0} onClick={()=>void queue()} className="rounded-full bg-purple-900 px-5 py-3 text-white disabled:opacity-40">{busy?'Starting…':pending?'Transcribing…':'Transcribe saved recordings'}</button>{data.transcripts.some(t=>t.status==='failed')&&<button type="button" disabled={busy||pending||!data.configured} className="rounded-full border border-purple-300 px-5 py-3" onClick={()=>{if(window.confirm('Retry failed recordings? An interrupted request may already have incurred a transcription charge.'))void queue(true);}}>Retry failed recordings</button>}<button type="button" className="underline" disabled={dirty.length>0} onClick={()=>void load()}>Refresh status</button>{data.transcripts.length>0&&<button type="button" className="underline" onClick={exportText}>Export transcripts</button>}</div>}
   {data?.transcripts.map(t=><TranscriptEditor key={t.id} transcript={t} endpoint={endpoint} onChange={next=>setData(d=>d?{...d,transcripts:d.transcripts.map(t=>t.id===next.id?next:t)}:d)} onDirty={changed=>setDirty(ids=>changed?[...new Set([...ids,t.id])]:ids.filter(id=>id!==t.id))}/>)}
   {data?.transcripts.length===0&&<p className="text-sm">No transcripts yet. Start transcription to process this interview’s saved recordings.</p>}
  </>}
  {dirty.length>0&&<p className="text-sm">Save or discard your transcript edits before leaving this view.</p>}
  {error&&<p role="alert" className="text-red-800">{error}</p>}
 </section>;
}
function TranscriptEditor({transcript,endpoint,onChange,onDirty}:{transcript:Transcript;endpoint:string;onChange:(next:Transcript)=>void;onDirty:(dirty:boolean)=>void}){
 const [text,setText]=useState(transcript.edited_text||transcript.original_text||'');const [base,setBase]=useState(transcript);const [saving,setSaving]=useState(false);const [error,setError]=useState('');const [checked,setChecked]=useState(false);
 const changed=text!==(base.edited_text||base.original_text||'');
 useEffect(()=>{onDirty(changed);const guard=(e:BeforeUnloadEvent)=>{if(changed){e.preventDefault();e.returnValue='';}};window.addEventListener('beforeunload',guard);return()=>{window.removeEventListener('beforeunload',guard);onDirty(false);};},[changed]);
 useEffect(()=>{if(!changed){setBase(transcript);setText(transcript.edited_text||transcript.original_text||'');}},[transcript.revision]);
 async function save(approve:boolean){setSaving(true);setError('');try{const result=await authenticatedApi<{transcript:Transcript}>(`${endpoint}/${transcript.id}`,{method:'PATCH',body:JSON.stringify({text,approve,revision:base.revision})});setBase(result.transcript);setText(result.transcript.edited_text||'');setChecked(false);onChange(result.transcript);}catch(e){setError(e instanceof Error?e.message:'Not saved. Your edits remain here.');}finally{setSaving(false);}}
 const ready=['draft','approved'].includes(transcript.status);
 return <article className="rounded-xl bg-white p-4 space-y-3"><h4 className="font-semibold">{label(transcript.question_key)}</h4><p className="text-sm">Status: <strong>{transcript.status}</strong> · {transcript.model}</p>
  {transcript.error_message&&<p role="alert" className="text-sm text-red-800">{transcript.error_message}</p>}
  {ready&&<><details><summary className="cursor-pointer text-sm underline">Original machine transcript</summary><p className="mt-3 whitespace-pre-wrap text-sm">{transcript.original_text}</p></details><label className="block text-sm font-medium">Editable transcript<textarea value={text} maxLength={100000} rows={8} className="mt-2 w-full rounded-xl border border-stone-300 p-3 font-normal" onChange={e=>{setText(e.target.value);setChecked(false);}}/></label><p className="text-xs text-stone-500">Keep the participant’s meaning. Mark unclear audio as [unclear]; distinguish Emma’s questions from the participant’s responses rather than guessing.</p><label className="flex gap-2 text-sm"><input type="checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)}/>I checked this transcript against the audio, including who said what.</label><div className="flex flex-wrap gap-3"><button type="button" disabled={saving||!changed||!text.trim()} className="rounded-full border px-4 py-2 disabled:opacity-40" onClick={()=>void save(false)}>Save draft</button><button type="button" disabled={saving||!checked||!text.trim()} className="rounded-full bg-purple-900 px-4 py-2 text-white disabled:opacity-40" onClick={()=>void save(true)}>Approve transcript</button>{changed&&<button type="button" className="underline" onClick={()=>{setText(base.edited_text||base.original_text||'');setChecked(false);}}>Discard edits</button>}</div></>}
  {error&&<p role="alert" className="text-sm text-red-800">{error}</p>}
 </article>;
}
