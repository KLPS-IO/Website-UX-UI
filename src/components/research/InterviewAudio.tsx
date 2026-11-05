import { useEffect, useRef, useState } from 'react';
import { authenticatedBlob } from '@/lib/authenticated-api';
export type AudioTake = { blob: Blob; durationSeconds: number };
export type SavedAudio = { questionKey: string; contentType: string; durationSeconds: number; bytes: number };
const MAX_BYTES = 10 * 1024 * 1024;
export function InterviewAudio({ questionKey, value, enabled, onChange, onActive, maxSeconds = 180 }: {
  questionKey: string; value?: AudioTake; enabled: boolean; maxSeconds?: number;
  onChange: (value?: AudioTake) => void; onActive: (active: boolean) => void;
}) {
  const [state, setState] = useState<'idle'|'starting'|'recording'>('idle');
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');
  const recorder = useRef<MediaRecorder>();
  const stream = useRef<MediaStream>();
  const timer = useRef<ReturnType<typeof setInterval>>();
  const alive = useRef(true);
  const started = useRef(0);
  const duration = useRef(0);
  const callback = useRef({onChange, onActive}); callback.current = {onChange, onActive};
  useEffect(() => { alive.current = true; return () => { alive.current = false; clearInterval(timer.current); if(recorder.current?.state === 'recording') recorder.current.stop(); stream.current?.getTracks().forEach(t=>t.stop()); callback.current.onActive(false); }; }, []);
  useEffect(() => { if(!value){ setUrl(''); return; } const u=URL.createObjectURL(value.blob); setUrl(u); return ()=>URL.revokeObjectURL(u); }, [value]);
  function stop() { if(recorder.current?.state === 'recording'){ duration.current=Math.min(maxSeconds,(performance.now()-started.current)/1000); recorder.current.stop(); clearInterval(timer.current); } }
  async function start() {
    if(!enabled||state!=='idle')return;
    setError(''); setState('starting'); callback.current.onActive(true);
    try {
      if(!navigator.mediaDevices?.getUserMedia||typeof MediaRecorder==='undefined')throw Error('Audio recording is unavailable in this browser. Open this HTTPS page in Safari or Chrome.');
      const mic=await navigator.mediaDevices.getUserMedia({audio:true});
      if(!alive.current){mic.getTracks().forEach(t=>t.stop());return;}
      stream.current=mic;
      const mime=['audio/webm;codecs=opus','audio/mp4','audio/webm','audio/ogg;codecs=opus'].find(t=>MediaRecorder.isTypeSupported(t));
      const rec=new MediaRecorder(mic,mime?{mimeType:mime}:undefined); recorder.current=rec;
      const chunks:Blob[]=[];let bytes=0;let failed=false;
      rec.ondataavailable=e=>{if(e.data.size){chunks.push(e.data);bytes+=e.data.size;if(bytes>MAX_BYTES){failed=true;setError('Recording exceeded 10 MB. Please record a shorter answer.');stop();}}};
      rec.onerror=()=>{failed=true;setError('Recording was interrupted. Please try again.');stop();};
      rec.onstop=()=>{clearInterval(timer.current);mic.getTracks().forEach(t=>t.stop());if(!alive.current)return;setState('idle');callback.current.onActive(false);const blob=new Blob(chunks,{type:rec.mimeType||chunks[0]?.type||mime});if(!failed&&blob.size>0&&blob.size<=MAX_BYTES){callback.current.onChange({blob,durationSeconds:Math.round(duration.current*10)/10});}else if(!failed)setError('No audio was captured. Please try again.');};
      started.current=performance.now();duration.current=0;setSeconds(0);rec.start(1000);setState('recording');
      timer.current=setInterval(()=>{const elapsed=(performance.now()-started.current)/1000;setSeconds(Math.floor(elapsed));if(elapsed>=maxSeconds)stop();},250);
    } catch(e) {stream.current?.getTracks().forEach(t=>t.stop());setState('idle');callback.current.onActive(false);setError(e instanceof Error&&e.name==='NotAllowedError'?'Microphone access was denied. Allow microphone access in browser settings and try again.':e instanceof Error?e.message:'Could not start the microphone.');}
  }
  return <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 space-y-3" aria-label={`Audio answer: ${questionKey}`}>
    <p className="font-medium">{state==='recording'?`● Recording · ${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`:value?'Recorded answer ready to save':'Answer by voice'}</p>
    <p className="text-sm text-stone-600">{Math.floor(maxSeconds/60)} minute maximum. Ask her permission before recording. Keep this tab open and the phone awake.</p>
    {url&&<audio controls preload="metadata" src={url} className="w-full"/>}
    {state==='recording'?<button type="button" className="rounded-full bg-red-700 px-5 py-3 text-white" onClick={stop}>Stop recording</button>:<button type="button" className="rounded-full bg-purple-900 px-5 py-3 text-white disabled:opacity-40" disabled={!enabled||state==='starting'} onClick={()=>void start()}>{state==='starting'?'Opening microphone…':value?'Re-record answer':'Record answer'}</button>}
    {value&&state==='idle'&&<button type="button" className="ml-3 underline" onClick={()=>callback.current.onChange(undefined)}>Remove unsaved take</button>}
    {error&&<p role="alert" className="text-sm text-red-800">{error}</p>}
  </div>;
}
export function SavedInterviewAudio({id,audio,transcriptId,autoLoad=false,label}:{id:string;audio:SavedAudio;transcriptId?:string;autoLoad?:boolean;label?:string}) {
 const [url,setUrl]=useState('');const [error,setError]=useState('');const [loading,setLoading]=useState(false);const [speed,setSpeed]=useState('1');const player=useRef<HTMLAudioElement>(null);
 useEffect(()=>()=>{if(url)URL.revokeObjectURL(url);},[url]);
 useEffect(()=>{if(player.current)player.current.playbackRate=Number(speed);},[speed,url]);
 const path=`/api/research/interviews/${id}/audio/${audio.questionKey}${transcriptId?`?transcriptId=${encodeURIComponent(transcriptId)}`:''}`;
 async function load(){setLoading(true);setError('');try{const blob=await authenticatedBlob(path);setUrl(URL.createObjectURL(blob));}catch(e){setError(e&&typeof e==='object'&&'status' in e&&e.status===409?'This recording changed. Refresh the interview before reviewing this transcript.':'Could not load private recording. Sign in again or retry.');}finally{setLoading(false);}}
 useEffect(()=>{if(!autoLoad)return;let cancelled=false;let objectUrl='';setUrl('');setLoading(true);setError('');authenticatedBlob(path).then(blob=>{if(cancelled)return;objectUrl=URL.createObjectURL(blob);setUrl(objectUrl);}).catch(e=>{if(!cancelled)setError(e&&typeof e==='object'&&'status' in e&&e.status===409?'This recording changed. Refresh the interview before reviewing this transcript.':'Could not load the matching audio. Please retry.');}).finally(()=>{if(!cancelled)setLoading(false);});return()=>{cancelled=true;if(objectUrl)URL.revokeObjectURL(objectUrl);};},[path,autoLoad]);
 const rounded=Math.round(audio.durationSeconds);const duration=`${Math.floor(rounded/60)}:${String(rounded%60).padStart(2,'0')}`;
 return <div className="min-w-0 rounded-xl border border-purple-200 bg-purple-50/60 p-3 space-y-3"><p className="font-medium">{label||audio.questionKey} · {duration}</p>{url?<><audio ref={player} aria-label={label||`Recording ${audio.questionKey}`} controls preload="metadata" src={url} className="w-full min-w-0"/><div className="flex flex-wrap items-center gap-3 text-sm"><button type="button" className="rounded-full border border-purple-200 bg-white px-3 py-2" onClick={()=>{if(player.current)player.current.currentTime=Math.max(0,player.current.currentTime-5);}}>Back 5 seconds</button><label>Speed <select aria-label={`Playback speed for ${audio.questionKey}`} className="ml-1 rounded-lg border border-purple-200 bg-white px-2 py-2" value={speed} onChange={e=>setSpeed(e.target.value)}>{['0.75','1','1.25','1.5'].map(value=><option value={value} key={value}>{value}×</option>)}</select></label></div></>:<button type="button" disabled={loading} className="underline" onClick={()=>void load()}>{loading?'Loading matching audio…':transcriptId?'Load matching audio':'Load private recording'}</button>}{url&&<a href={url} download={`${id}-${audio.questionKey}.${audio.contentType.includes('mp4')?'m4a':audio.contentType.includes('ogg')?'ogg':'webm'}`} className="inline-block text-sm underline">Download this audio</a>}{error&&<p role="alert" className="text-sm text-red-800">{error}</p>}</div>;
}
