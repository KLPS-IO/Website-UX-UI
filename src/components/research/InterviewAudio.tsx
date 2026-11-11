import { useEffect, useRef, useState } from 'react';
import { authenticatedBlob } from '@/lib/authenticated-api';
export type AudioTake = { clipKey?: string; blob: Blob; durationSeconds: number; captureWarnings?: string[] };
export type SavedAudio = { questionKey: string; contentType: string; durationSeconds: number; bytes: number; captureWarnings?: string[] };
export function MicrophoneSetup({enabled,value,onChange,onAvailability}:{enabled:boolean;value:string;onChange:(deviceId:string)=>void;onAvailability?:(available:boolean)=>void}){
 const [devices,setDevices]=useState<MediaDeviceInfo[]>([]);const [busy,setBusy]=useState(false);const [error,setError]=useState('');const [checked,setChecked]=useState(false);const [verified,setVerified]=useState('');const [missing,setMissing]=useState(false);
 const mounted=useRef(true);const selected=useRef(value);selected.current=value;const availability=useRef(onAvailability);availability.current=onAvailability;
 async function refresh(){if(!navigator.mediaDevices?.enumerateDevices)return;try{const next=(await navigator.mediaDevices.enumerateDevices()).filter(d=>d.kind==='audioinput');if(!mounted.current)return;setDevices(next);const lost=Boolean(selected.current&&!next.some(d=>d.deviceId===selected.current));setMissing(lost);availability.current?.(!lost);}catch{if(mounted.current)setError('Could not refresh the microphone list. Check Chrome microphone permission and try again.');}}
 useEffect(()=>{mounted.current=true;void refresh();const changed=()=>{setVerified('');void refresh();};const visible=()=>{if(document.visibilityState==='visible')changed();};navigator.mediaDevices?.addEventListener('devicechange',changed);window.addEventListener('focus',changed);document.addEventListener('visibilitychange',visible);return()=>{mounted.current=false;navigator.mediaDevices?.removeEventListener('devicechange',changed);window.removeEventListener('focus',changed);document.removeEventListener('visibilitychange',visible);};},[]);
 useEffect(()=>{const lost=Boolean(value&&!devices.some(d=>d.deviceId===value));setMissing(lost);availability.current?.(!lost);},[value,devices]);
 useEffect(()=>{setVerified('');},[value]);
 function select(deviceId:string){onChange(deviceId);setVerified('');setError('');}
 async function check(testSelected=false){setBusy(true);setError('');setVerified('');let mic:MediaStream|undefined;try{if(!navigator.mediaDevices?.getUserMedia)throw Error('Open the secure page in Chrome or Safari to use a microphone.');mic=await navigator.mediaDevices.getUserMedia({audio:testSelected?{...(value?{deviceId:{exact:value}}:{}),channelCount:{ideal:1}}:true});const track=mic.getAudioTracks()[0];const actual=track?.getSettings().deviceId;if(testSelected&&value&&!['default','communications'].includes(value)&&actual&&actual!==value)throw Error('Chrome opened a different input. Re-select your microphone and test it again.');if(!mounted.current)return;setChecked(true);await refresh();if(testSelected)setVerified(track?.label||'Browser default microphone');}catch(e){if(!mounted.current)return;setError(e instanceof Error&&e.name==='NotAllowedError'?'Chrome microphone access is blocked. Allow microphone access for this site in Chrome settings, then check again.':e instanceof Error&&['NotFoundError','OverconstrainedError'].includes(e.name)?'The selected microphone is unavailable. Reconnect it, refresh the list and choose an available input.':e instanceof Error?e.message:'Could not open the microphone.');}finally{mic?.getTracks().forEach(t=>t.stop());if(mounted.current)setBusy(false);}}
 const inputs=devices.filter(d=>d.deviceId);const jieli=inputs.find(d=>/jieli/i.test(d.label)&&!['default','communications'].includes(d.deviceId))||inputs.find(d=>/jieli/i.test(d.label));
 return <section className="rounded-xl border border-purple-200 bg-purple-50 p-4 space-y-3" aria-label="Microphone setup"><h3 className="font-semibold">Connect and test your microphone</h3><p className="text-sm">Plug in the USB receiver, then allow Chrome microphone access. This hardware check does not save audio. Interview recording still requires participant consent.</p><div className="flex flex-wrap gap-2"><button type="button" disabled={!enabled||busy} className="rounded-full border bg-white px-4 py-2 disabled:opacity-40" onClick={()=>void check()}>{busy?'Checking…':'Check available microphones'}</button><button type="button" disabled={!enabled||busy||missing} className="rounded-full border bg-white px-4 py-2 disabled:opacity-40" onClick={()=>void check(true)}>Test selected input</button></div>
 <label className="block text-sm font-medium" htmlFor="interview-microphone">Recording microphone</label><select id="interview-microphone" aria-label="Recording microphone" className="w-full rounded-xl border bg-white p-3" disabled={!enabled||busy} value={value} onChange={e=>select(e.target.value)}><option value="">Browser default microphone</option>{missing&&<option value={value} disabled>Previously selected microphone is disconnected</option>}{inputs.map((d,i)=><option key={d.deviceId} value={d.deviceId}>{d.label||`Microphone ${i+1} (allow access to show its name)`}</option>)}</select>
 {jieli&&<p className="rounded-lg bg-white p-3 text-sm"><strong>Jieli microphone detected:</strong> {jieli.label}. <button type="button" disabled={!enabled||busy} className="underline" onClick={()=>select(jieli.deviceId)}>Use Jieli microphone</button></p>}
 {verified&&<p role="status" className="rounded-lg bg-white p-3 text-sm"><strong>Input opened by Chrome:</strong> {verified}. Make a short recording and listen back before the interview.</p>}
 {missing&&<p role="status" className="rounded-lg bg-amber-50 p-3 text-sm">The selected microphone is no longer available. Choose another input before recording. We will not silently switch to the built-in microphone.</p>}
 {!checked&&<p className="text-xs text-stone-600">Select Check available microphones to request microphone permission and reveal device names.</p>}
 <details className="text-sm"><summary className="cursor-pointer underline">Jieli Technology USB Composite Device is not listed?</summary><p className="mt-2">Only audio inputs exposed by Chrome can appear here. A USB connection prompt alone does not confirm that its microphone is available to the website. Check the receiver connection, allow this site’s microphone permission, then refresh the list. Chrome may expose it under a different audio name or through the browser default input; use Test selected input to check the reported input name.</p></details>{error&&<p role="alert" className="text-sm text-red-800">{error}</p>}</section>;
}
export function InterviewAudio({ questionKey, enabled, onChange, onActive, onCheckpoint, deviceId = '' }: {
    questionKey: string;
    enabled: boolean;
    deviceId?: string;
    onChange: (value: AudioTake) => void;
    onCheckpoint?: (value: AudioTake) => Promise<unknown>;
    onActive: (active: boolean) => void;
}) {
    const [state, setState] = useState<'idle' | 'starting' | 'recording' | 'paused'>('idle');
    const [seconds, setSeconds] = useState(0);
    const [error, setError] = useState('');
    const [warning, setWarning] = useState('');
    const [input, setInput] = useState('');
    const [level, setLevel] = useState(0);
    const recorder = useRef<MediaRecorder>();
    const stream = useRef<MediaStream>();
    const timer = useRef<ReturnType<typeof setInterval>>();
    const meter = useRef<ReturnType<typeof setInterval>>();
    const context = useRef<AudioContext>();
    const wake = useRef<WakeLockSentinel>();
    const alive = useRef(true);
    const elapsed = useRef(0);
    const started = useRef(0);
    const warnings = useRef<string[]>([]);
    const callback = useRef({ onChange, onActive, onCheckpoint });
    callback.current = { onChange, onActive, onCheckpoint };
    const rotating = useRef(false);
    function duration() { return elapsed.current + (recorder.current?.state === 'recording' ? performance.now() - started.current : 0); }
    function release() { clearInterval(timer.current); clearInterval(meter.current); stream.current?.getTracks().forEach(track => { track.onmute = null; track.onended = null; track.stop(); }); if (context.current) {
        void context.current.close().catch(() => { });
        context.current = undefined;
    } if (wake.current) {
        void wake.current.release().catch(() => { });
        wake.current = undefined;
    } setLevel(0); }
    async function keepAwake() { try {
        if (!navigator.wakeLock || document.visibilityState !== 'visible' || (wake.current && !wake.current.released))
            return;
        const lock = await navigator.wakeLock.request('screen');
        if (!alive.current || !recorder.current || recorder.current.state === 'inactive') {
            await lock.release();
            return;
        }
        wake.current = lock;
    }
    catch { /* Capture continues when screen wake lock is unavailable. */ } }
    function flag(code: string, message: string) { if (!warnings.current.includes(code))
        warnings.current.push(code); if (alive.current)
        setWarning(message); }
    function stop() { const rec = recorder.current; if (rec && rec.state !== 'inactive') {
        elapsed.current = duration();
        rec.stop();
    } }
    function pause() { if (recorder.current?.state !== 'recording')
        return; elapsed.current = duration(); recorder.current.pause(); setState('paused'); }
    function resume() { if (recorder.current?.state !== 'paused')
        return; started.current = performance.now(); recorder.current.resume(); setState('recording'); void keepAwake(); }
    useEffect(() => { alive.current = true; const visibility = () => { if (!recorder.current || recorder.current.state === 'inactive')
        return; if (document.visibilityState === 'hidden')
        flag('backgrounded', 'The page went into the background. Check this part of the recording for interruptions.');
    else
        void keepAwake(); }; document.addEventListener('visibilitychange', visibility); return () => { alive.current = false; rotating.current = false; document.removeEventListener('visibilitychange', visibility); stop(); release(); callback.current.onActive(false); }; }, []);
    async function start() {
        if (!enabled || recorder.current && recorder.current.state !== 'inactive')
            return;
        setError('');
        setWarning('');
        setState('starting');
        callback.current.onActive(true);
        warnings.current = [];
        elapsed.current = 0;
        rotating.current = false;
        try {
            if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined')
                throw Error('Open this secure page in Chrome or Safari to record.');
            const mic = await navigator.mediaDevices.getUserMedia({ audio: { ...(deviceId ? { deviceId: { exact: deviceId } } : {}), channelCount: { ideal: 1 } } });
            if (!alive.current) {
                mic.getTracks().forEach(t => t.stop());
                return;
            }
            stream.current = mic;
            const track = mic.getAudioTracks()[0];
            const actual = track?.getSettings().deviceId;
            if (deviceId && !['default', 'communications'].includes(deviceId) && actual && actual !== deviceId)
                throw Error('The browser opened a different microphone. Check the selected input.');
            setInput(track?.label || 'Browser microphone');
            const mime = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm'].find(type => MediaRecorder.isTypeSupported(type));
            const rec = new MediaRecorder(mic, { ...(mime ? { mimeType: mime } : {}), audioBitsPerSecond: 64000 });
            recorder.current = rec;
            const chunks: Blob[] = [];
            let bytes = 0;
            let lastCheckpoint = 0;
            const clipKey = `${questionKey}__${crypto.randomUUID()}`;
            track.onmute = () => flag('microphone_muted', 'Microphone signal interrupted. Check the captured audio.');
            track.onended = () => { flag('microphone_ended', 'Microphone disconnected. Saving the captured part.'); stop(); };
            rec.ondataavailable = event => { if (!event.data.size)
                return; chunks.push(event.data); bytes += event.data.size; if (performance.now() - lastCheckpoint >= 15000 || chunks.length === 1) {
                lastCheckpoint = performance.now();
                const checkpoint = { clipKey, blob: new Blob(chunks, { type: rec.mimeType || mime || event.data.type }), durationSeconds: Math.max(0.1, Math.round(duration() / 100) / 10), captureWarnings: [...warnings.current] };
                void callback.current.onCheckpoint?.(checkpoint).catch(() => { if (alive.current)
                    setWarning('Device backup is unavailable. Stop and save regularly, and keep this page open until server saving is confirmed.'); });
            } if (bytes >= 18 * 1024 * 1024 && rec.state === 'recording') {
                rotating.current = true;
                stop();
            } };
            rec.onerror = () => { rotating.current = false; flag('recorder_error', 'Recording was interrupted. Saving the captured part.'); stop(); };
            rec.onstop = () => { const durationSeconds = Math.max(0.1, Math.round(elapsed.current / 100) / 10); const blob = new Blob(chunks, { type: rec.mimeType || mime || chunks[0]?.type }); const again = rotating.current; release(); if (!alive.current)
                return; setState('idle'); callback.current.onActive(false); if (blob.size)
                callback.current.onChange({ clipKey, blob, durationSeconds, captureWarnings: [...warnings.current] });
            else
                setError('No audio was captured. Please test the microphone.'); if (again) {
                setWarning('A long recording was saved as a clip. Continuing in another clip.');
                void start();
            } };
            started.current = performance.now();
            rec.start(1000);
            setSeconds(0);
            setState('recording');
            void keepAwake();
            timer.current = setInterval(() => setSeconds(Math.floor(duration() / 1000)), 250);
            try {
                const Ctx = window.AudioContext || (window as Window & {
                    webkitAudioContext?: typeof AudioContext;
                }).webkitAudioContext;
                if (Ctx) {
                    const ctx = new Ctx();
                    context.current = ctx;
                    await ctx.resume();
                    if (rec.state === 'inactive')
                        return;
                    const analyser = ctx.createAnalyser();
                    analyser.fftSize = 256;
                    ctx.createMediaStreamSource(mic).connect(analyser);
                    const samples = new Uint8Array(analyser.fftSize);
                    meter.current = setInterval(() => { analyser.getByteTimeDomainData(samples); let sum = 0; for (const sample of samples)
                        sum += ((sample - 128) / 128) ** 2; setLevel(Math.min(100, Math.round(Math.sqrt(sum / samples.length) * 400))); }, 200);
                }
            }
            catch { /* Input meter is optional. */ }
        }
        catch (e) {
            release();
            setState('idle');
            callback.current.onActive(false);
            setError(e instanceof Error ? e.message : 'Could not start the microphone.');
        }
    }
    return <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 space-y-3" aria-label={`Audio answer: ${questionKey}`}>
  <p className="font-semibold">{state === 'recording' ? '● Recording' : state === 'paused' ? 'Paused' : 'Record a clip'}{['recording', 'paused'].includes(state) && ` · ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`}</p>
  <p className="text-sm">Record for as long as you need. Audio is backed up on this device about every 15 seconds while this page is running. Stop and save uploads this clip automatically. You can add more clips to this question.</p>
  {['recording', 'paused'].includes(state) && <><p className="text-xs">Input: {input}. Keep this page visible and the screen awake.</p><div role="meter" aria-label="Microphone input level" aria-valuemin={0} aria-valuemax={100} aria-valuenow={level} className="h-3 overflow-hidden rounded-full bg-purple-200"><div className="h-full bg-purple-800" style={{ width: `${level}%` }}/></div></>}
  <div className="flex flex-wrap gap-3">{state === 'recording' && <button type="button" className="rounded-full border bg-white px-5 py-3" onClick={pause}>Pause recording</button>}{state === 'paused' && <button type="button" className="rounded-full border bg-white px-5 py-3" onClick={resume}>Resume recording</button>}{['recording', 'paused'].includes(state) ? <button type="button" className="rounded-full bg-red-700 px-5 py-3 text-white" onClick={() => { rotating.current = false; stop(); }}>Stop and save clip</button> : <button type="button" disabled={!enabled || state === 'starting'} className="rounded-full bg-purple-900 px-5 py-3 text-white disabled:opacity-40" onClick={() => void start()}>{state === 'starting' ? 'Opening microphone…' : 'Record another clip'}</button>}</div>
  {warning && <p role="status" className="rounded-lg bg-amber-50 p-3 text-sm">{warning}</p>}{error && <p role="alert" className="text-red-800">{error}</p>}
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
 return <div className="min-w-0 rounded-xl border border-purple-200 bg-purple-50/60 p-3 space-y-3"><p className="font-medium">{label||audio.questionKey} · {duration}</p>{Boolean(audio.captureWarnings?.length)&&<p className="rounded-lg bg-amber-50 p-2 text-xs text-amber-900">The browser reported an interruption during this take. Check for gaps before using the transcript.</p>}{url?<><audio ref={player} aria-label={label||`Recording ${audio.questionKey}`} controls preload="metadata" src={url} className="w-full min-w-0"/><div className="flex flex-wrap items-center gap-3 text-sm"><button type="button" className="rounded-full border border-purple-200 bg-white px-3 py-2" onClick={()=>{if(player.current)player.current.currentTime=Math.max(0,player.current.currentTime-5);}}>Back 5 seconds</button><label>Speed <select aria-label={`Playback speed for ${audio.questionKey}`} className="ml-1 rounded-lg border border-purple-200 bg-white px-2 py-2" value={speed} onChange={e=>setSpeed(e.target.value)}>{['0.75','1','1.25','1.5'].map(value=><option value={value} key={value}>{value}×</option>)}</select></label></div></>:<button type="button" disabled={loading} className="underline" onClick={()=>void load()}>{loading?'Loading matching audio…':transcriptId?'Load matching audio':'Load private recording'}</button>}{url&&<a href={url} download={`${id}-${audio.questionKey}.${audio.contentType.includes('mp4')?'m4a':audio.contentType.includes('ogg')?'ogg':'webm'}`} className="inline-block text-sm underline">Download this audio</a>}{error&&<p role="alert" className="text-sm text-red-800">{error}</p>}</div>;
}
