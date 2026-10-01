import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { allowAttribution, clearAttribution, currentAttribution } from '@/lib/waitlist-attribution';
export default function WaitlistAttributionConsent() {
 const location=useLocation();
 const [code,setCode]=useState<string|null>(null),[dismissed,setDismissed]=useState(false),[active,setActive]=useState(Boolean(currentAttribution())),[busy,setBusy]=useState(false),[error,setError]=useState('');
 useEffect(()=>{const candidate=new URLSearchParams(location.search).get('klps_ref');if(!code&&candidate&&/^[a-f0-9]{18}$/.test(candidate))setCode(candidate);},[location.search,code]);
 if(!['/','/waitlist','/waitlist/'].includes(location.pathname))return null;
 if(active)return <button className="fixed bottom-3 left-3 z-50 rounded-lg border bg-white p-2 text-xs text-black shadow" onClick={()=>{clearAttribution();setActive(false);setDismissed(true);}}>Stop tracking this link</button>;
 if(!code||dismissed)return null;
 return <aside aria-label="Link tracking choice" className="fixed bottom-4 left-4 right-4 z-50 max-w-lg rounded-xl border border-black/20 bg-white p-4 text-black shadow-xl">
  <p className="font-semibold">Help us track which post got you interested in joining KLPS.</p><p className="mt-2 text-sm">This helps us understand which posts people find useful. You can join the waitlist either way.</p><p className="mt-2 text-xs">If you agree, we’ll remember this link while you browse (up to 24 hours) and connect it to your signup. You can stop tracking the link before signing up.</p>
  {error&&<p role="alert" className="mt-2 text-sm text-red-800">{error}</p>}
  <div className="mt-3 flex flex-wrap gap-3"><button disabled={busy} className="rounded border border-black px-3 py-2 disabled:opacity-50" onClick={async()=>{setBusy(true);try{await allowAttribution(code);setActive(true);}catch(e){setError(e instanceof Error?e.message:'Link tracking is unavailable. You can still join the waitlist.');}finally{setBusy(false);}}}>Sure, that’s OK</button><button disabled={busy} className="rounded border border-black px-3 py-2" onClick={()=>setDismissed(true)}>No thanks, don’t track the link</button></div>
 </aside>;
}
