import {useCallback,useEffect,useRef,useState} from "react";import {ArrowLeft,PlugZap,Square} from "lucide-react";import {Link} from "react-router-dom";import {toast} from "sonner";import {Button} from "@/components/ui/button";import {Card,CardContent,CardDescription,CardHeader,CardTitle} from "@/components/ui/card";import {Input} from "@/components/ui/input";import {Label} from "@/components/ui/label";import {textileLabApi} from "@/features/textile-lab/api";import {ArduinoUsbSerialAdapter} from "@/features/textile-lab/adapters/arduinoUsbSerial";import type {ActivityPurpose,CalibrationFoundation,Device,LabOverview,RawReading,Specimen,TestSession} from "@/features/textile-lab/types";
const empty:LabOverview={device:null,specimen:null,session:null,latest_reading:null};const purposes:ActivityPurpose[]=["engineering","calibration","controlled_test","real_world_wear","genuine_product_use"];const emptyFoundation:CalibrationFoundation={channels:[],protocols:[],calibration_runs:[],derived_results:[],metrics:{experiments_completed:0,raw_observations:0,capture_duration_seconds:0,specimens_tested:0,hardware_revisions_tested:0,calibration_runs_completed:0,calibration_runs_passed:0,derived_results:0,validated_results:0}};
export default function TextileIntelligenceLab(){const [overview,setOverview]=useState(empty),[devices,setDevices]=useState<Device[]>([]),[specimens,setSpecimens]=useState<Specimen[]>([]),[sessions,setSessions]=useState<TestSession[]>([]),[foundation,setFoundation]=useState<CalibrationFoundation>(emptyFoundation),[busy,setBusy]=useState(false),[connected,setConnected]=useState(false),[latest,setLatest]=useState<RawReading|null>(null),[registrationMessage,setRegistrationMessage]=useState<{kind:"success"|"error";text:string}|null>(null);const [deviceForm,setDeviceForm]=useState({device_identifier:"ARDUINO-01",display_name:"Arduino USB Device 01",hardware_type:"microcontroller",hardware_model:"Arduino Nano 33 BLE",firmware_version:"",transport:"usb_serial"});const [sessionForm,setSessionForm]=useState({device_id:"",specimen_id:"",protocol_identifier:"raw-capture-v1",protocol_version:"1.0",test_user_id:"",activity_purpose:"engineering" as ActivityPurpose});const [protocolForm,setProtocolForm]=useState({protocol_identifier:"controlled-textile-response",version:"1.0",title:"Controlled textile response",engineering_objective:"Measure repeatability of the raw electrical response under recorded mechanical reference conditions.",cycle_count:"3",baseline_seconds:"10",hold_seconds:"5"});const adapter=useRef<ArduinoUsbSerialAdapter|null>(null),abort=useRef<AbortController|null>(null),queue=useRef<RawReading[]>([]),timer=useRef<number|null>(null);
 const load=useCallback(async()=>{try{const [o,d,p,s,f]=await Promise.all([textileLabApi.overview(),textileLabApi.devices(),textileLabApi.specimens(),textileLabApi.sessions(),textileLabApi.foundation()]);setOverview(o.overview);setDevices(d.devices);setSpecimens(p.specimens);setSessions(s.sessions);setFoundation(f);setSessionForm(v=>({...v,device_id:v.device_id||d.devices[0]?.id||"",specimen_id:v.specimen_id||p.specimens[0]?.id||""}));}catch(e){toast.error(e instanceof Error?e.message:"Lab data could not be loaded");}},[]);useEffect(()=>{void load();return()=>{abort.current?.abort();if(timer.current)window.clearInterval(timer.current);void adapter.current?.disconnect();}},[load]);
 async function registerDevice(e:React.FormEvent){e.preventDefault();setBusy(true);setRegistrationMessage(null);try{const response=await textileLabApi.registerDevice(deviceForm);await load();const message=`${response.device.display_name} registered and available for test sessions.`;setRegistrationMessage({kind:"success",text:message});toast.success(message);}catch(e){const detail=e instanceof Error?e.message:"Device registration failed";const message=detail.includes("404")?"The Textile Lab API is unavailable. Start the local backend and confirm the local migration has been applied.":detail;setRegistrationMessage({kind:"error",text:message});toast.error(message);}finally{setBusy(false)}}
 async function startSession(e:React.FormEvent){e.preventDefault();setBusy(true);try{await textileLabApi.startSession({...sessionForm,test_user_id:sessionForm.test_user_id||null});toast.success("Raw capture session started");await load();}catch(e){toast.error(e instanceof Error?e.message:"Session could not be started");}finally{setBusy(false)}}
 async function flush(){const active=overview.session;if(!active||!queue.current.length)return;const batch=queue.current.splice(0,100);try{await textileLabApi.appendReadings(active.id,batch);}catch(e){queue.current.unshift(...batch);toast.error(e instanceof Error?e.message:"Raw readings could not be stored");}}
 async function connect(){if(!overview.session)return toast.error("Start a test session before connecting a device.");try{const a=new ArduinoUsbSerialAdapter();adapter.current=a;await a.connect();setConnected(true);abort.current=new AbortController();timer.current=window.setInterval(()=>void flush(),500);void a.read(r=>{setLatest(r);queue.current.push(r);},abort.current.signal).catch(e=>toast.error(e.message));}catch(e){toast.error(e instanceof Error?e.message:"USB connection failed");}}
 async function stop(){abort.current?.abort();if(timer.current)window.clearInterval(timer.current);await new Promise(r=>setTimeout(r,0));await flush();await adapter.current?.disconnect();setConnected(false);if(overview.session)await textileLabApi.completeSession(overview.session.id);toast.success("Session completed and USB disconnected");await load();}
 async function createProtocol(e:React.FormEvent){e.preventDefault();setBusy(true);try{await textileLabApi.createProtocol({...protocolForm,channel_id:foundation.channels[0]?.id||null,cycle_count:Number(protocolForm.cycle_count),baseline_seconds:Number(protocolForm.baseline_seconds),hold_seconds:Number(protocolForm.hold_seconds),reference_inputs:[],acceptance_criteria:{review_required:true,no_health_inference:true},status:"approved"});toast.success("Versioned engineering protocol approved and locked");await load();}catch(e){toast.error(e instanceof Error?e.message:"Protocol could not be created");}finally{setBusy(false)}}
 const field=(name:keyof typeof deviceForm)=>(e:React.ChangeEvent<HTMLInputElement>)=>setDeviceForm(v=>({...v,[name]:e.target.value}));
 return <main className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
<Button asChild variant="ghost">
<Link to="/beta-dashboard/founder">
<ArrowLeft/>Founder control centre</Link>
</Button>
<div>
<p className="text-sm font-medium text-primary">Founder only · engineering data</p>
<h1 className="text-3xl font-bold">Textile Intelligence Lab</h1>
<p className="mt-2 text-muted-foreground">Hardware-agnostic test records with Arduino USB serial as the first capture adapter.</p>
</div>
<div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
<strong>USB-only safety boundary:</strong> inspect all wiring, insulation and strain relief before power. Disconnect immediately if wires, connectors or textiles become warm, smell unusual, discolor, spark or deform. Do not use damaged or previously overheated wiring.</div>
<div className="grid gap-4 md:grid-cols-4">{[["Device",overview.device?.display_name??"None registered"],["Specimen",overview.specimen?.display_name??"None active"],["Session",overview.session?"Active":"No active session"],["Latest raw reading",latest?.raw_value??overview.latest_reading?.raw_value??"—"]].map(([a,b])=>
<Card key={a}>
<CardHeader className="pb-2">
<CardDescription>{a}</CardDescription>
<CardTitle className="text-lg">{b}</CardTitle>
</CardHeader>
</Card>)}</div>
<div className="grid gap-4 xl:grid-cols-5">
<Card className="xl:col-span-2"><CardHeader><CardDescription>RAW · captured observation</CardDescription><CardTitle>{latest?.source_payload??overview.latest_reading?.source_payload??"No payload captured"}</CardTitle></CardHeader><CardContent className="space-y-1 text-sm"><p>Parsed value: {latest?.raw_value??overview.latest_reading?.raw_value??"—"}</p><p>Channel: {latest?.channel_identifier??overview.latest_reading?.channel_identifier??"—"}</p><p>Timestamp: {latest?.observed_at??overview.latest_reading?.observed_at??"—"}</p><p className="text-muted-foreground">Raw observations are not physical or physiological measurements.</p></CardContent></Card>
<Card><CardHeader><CardDescription>CALIBRATING</CardDescription><CardTitle>{foundation.calibration_runs.find(r=>r.status==="in_progress")?.run_identifier??"No active calibration"}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Known reference inputs must link to immutable raw observations.</CardContent></Card>
<Card><CardHeader><CardDescription>EXPERIMENTAL</CardDescription><CardTitle>{foundation.derived_results.length} derived results</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Technical results only. No body-state interpretation.</CardContent></Card>
<Card><CardHeader><CardDescription>VALIDATED / USER-FACING</CardDescription><CardTitle>Locked</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Validation requires reviewed acceptance criteria. User-facing transition is disabled in this phase.</CardContent></Card>
</div>
<Card><CardHeader><CardTitle>Calibration protocol foundation</CardTitle><CardDescription>Create and lock a versioned engineering procedure. Reference levels and criteria are explicit protocol data, not permanent assumptions.</CardDescription></CardHeader><CardContent><form onSubmit={createProtocol} className="grid gap-3 md:grid-cols-3">{(["protocol_identifier","version","title","engineering_objective","cycle_count","baseline_seconds","hold_seconds"] as const).map(k=><div key={k} className={k==="engineering_objective"?"md:col-span-3":""}><Label htmlFor={`protocol-${k}`}>{k.replaceAll("_"," ")}</Label><Input id={`protocol-${k}`} value={protocolForm[k]} onChange={e=>setProtocolForm(v=>({...v,[k]:e.target.value}))}/></div>)}<div className="md:col-span-3 flex flex-wrap items-center gap-3"><Button disabled={busy||!foundation.channels.length}>Approve versioned protocol</Button><span className="text-sm text-muted-foreground">Channel: {foundation.channels[0]?.display_name??"No canonical channel registered"}</span></div></form></CardContent></Card>
<Card><CardHeader><CardTitle>Canonical engineering metrics</CardTitle><CardDescription>Engineering progress only—never customer traction.</CardDescription></CardHeader><CardContent className="grid gap-3 sm:grid-cols-4">{Object.entries(foundation.metrics).map(([key,value])=><div key={key} className="rounded-md border p-3"><div className="text-xl font-semibold">{value}</div><div className="text-xs text-muted-foreground">{key.replaceAll("_"," ")}</div></div>)}</CardContent></Card>
<div className="grid gap-6 lg:grid-cols-2">
<Card>
<CardHeader>
<CardTitle>Register device</CardTitle>
<CardDescription>Hardware identity is metadata; capture remains behind the adapter boundary.</CardDescription>
</CardHeader>
<CardContent>
<form className="space-y-3" onSubmit={registerDevice}>{(["device_identifier","display_name","hardware_type","hardware_model","firmware_version"] as const).map(k=>
<div key={k}>
<Label htmlFor={k}>{k.replaceAll("_"," ")}</Label>
<Input id={k} value={deviceForm[k]} onChange={field(k)}/>
</div>)}<Button disabled={busy}>Register USB device</Button>
{registrationMessage&&<p role={registrationMessage.kind==="error"?"alert":"status"} className={`rounded-md border p-3 text-sm ${registrationMessage.kind==="error"?"border-destructive/40 bg-destructive/10 text-destructive":"border-emerald-300 bg-emerald-50 text-emerald-900"}`}>{registrationMessage.text}</p>}
</form>
</CardContent>
</Card>
<Card>
<CardHeader>
<CardTitle>Start test session</CardTitle>
<CardDescription>Links one registered device to one garment specimen. A beta user UUID is optional and does not enter traction reporting.</CardDescription>
</CardHeader>
<CardContent>
<form className="space-y-3" onSubmit={startSession}>
<Label>Device</Label>
<select className="h-10 w-full rounded-md border bg-background px-3" value={sessionForm.device_id} onChange={e=>setSessionForm(v=>({...v,device_id:e.target.value}))}>{devices.map(d=>
<option key={d.id} value={d.id}>{d.display_name}</option>)}</select>
<Label>Garment specimen</Label>
<select className="h-10 w-full rounded-md border bg-background px-3" value={sessionForm.specimen_id} onChange={e=>setSessionForm(v=>({...v,specimen_id:e.target.value}))}>{specimens.map(s=>
<option key={s.id} value={s.id}>{s.display_name}</option>)}</select>
<Label>Activity purpose</Label>
<select className="h-10 w-full rounded-md border bg-background px-3" value={sessionForm.activity_purpose} onChange={e=>setSessionForm(v=>({...v,activity_purpose:e.target.value as ActivityPurpose}))}>{purposes.map(p=>
<option key={p} value={p}>{p.replaceAll("_"," ")}</option>)}</select>
<Label htmlFor="test-user">Optional test-user UUID</Label>
<Input id="test-user" value={sessionForm.test_user_id} onChange={e=>setSessionForm(v=>({...v,test_user_id:e.target.value}))} placeholder="Leave blank for bench testing"/>
<Button disabled={busy||!!overview.session||!sessionForm.device_id||!sessionForm.specimen_id}>Start session</Button>
</form>
<div className="mt-6 flex gap-3">
<Button onClick={connect} disabled={connected||!overview.session}>
<PlugZap/>Connect Arduino via USB</Button>
<Button variant="outline" onClick={stop} disabled={!connected}>
<Square/>Stop safely</Button>
</div>
</CardContent>
</Card>
</div>
<Card>
<CardHeader>
<CardTitle>Session history</CardTitle>
<CardDescription>Raw readings are append-only and retain timestamps, adapter version, transport, source payload and device/specimen provenance.</CardDescription>
</CardHeader>
<CardContent className="space-y-2">{sessions.length?sessions.map(s=>
<div key={s.id} className="flex flex-wrap justify-between rounded-md border p-3 text-sm">
<span>{s.specimen_name} · {s.device_name}</span>
<span>{s.activity_purpose.replaceAll("_"," ")} · excluded from traction · {s.status} · {new Date(s.started_at).toLocaleString()}</span>
</div>):<p className="text-sm text-muted-foreground">No sessions yet.</p>}</CardContent>
</Card>
</main>}
