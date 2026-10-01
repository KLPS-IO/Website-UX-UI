import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { allowAttribution, clearAttribution, currentAttribution } from '@/lib/waitlist-attribution';
export default function WaitlistAttributionConsent() {
 const location=useLocation();
 const [code,setCode]=useState<string|null>(null),[dismissed,setDismissed]=useState(false),[active,setActive]=useState(Boolean(currentAttribution())),[busy,setBusy]=useState(false),[error,setError]=useState('');
 useEffect(()=>{const candidate=new URLSearchParams(location.search).get('klps_ref');if(!code&&candidate&&/^[a-f0-9]{18}$/.test(candidate))setCode(candidate);},[location.search,code]);
 if(!['/','/waitlist','/waitlist/'].includes(location.pathname))return null;
 if(active)return <button className="fixed bottom-3 left-3 z-50 rounded-lg border bg-white p-2 text-xs text-black shadow" onClick={()=>{clearAttribution();setActive(false);setDismissed(true);}}>Stop waitlist measurement</button>;
 if(!code||dismissed)return null;
 return <aside aria-label="Waitlist measurement choice" className="fixed bottom-4 left-4 right-4 z-50 max-w-lg rounded-xl border border-black/20 bg-white p-4 text-black shadow-xl">
  <p className="font-semibold">Help us understand what brings people to KLPS?</p><p className="mt-2 text-sm">With your permission, we’ll remember this KLPS link in this browser session for up to 24 hours and connect it to your first waitlist signup. No cross-site tracking. Joining works either way. You can stop measurement here before submitting.</p>
  {error&&<p role="alert" className="mt-2 text-sm text-red-800">{error}</p>}
  <div className="mt-3 flex gap-3"><button disabled={busy} className="rounded border border-black px-3 py-2 disabled:opacity-50" onClick={async()=>{setBusy(true);try{await allowAttribution(code);setActive(true);}catch(e){setError(e instanceof Error?e.message:'Measurement unavailable.');}finally{setBusy(false);}}}>Allow measurement</button><button disabled={busy} className="rounded border border-black px-3 py-2" onClick={()=>setDismissed(true)}>No thanks</button></div>
 </aside>;
}
