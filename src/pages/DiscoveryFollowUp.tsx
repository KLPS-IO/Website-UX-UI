import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { API_BASE } from '@/config/api';
import { discoveryPath, discoverySource } from '@/lib/discovery-followup';

export default function DiscoveryFollowUp() {
  const { search } = useLocation();
  const source = discoverySource(search) || 'fieldwork';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const meta = document.createElement('meta'); meta.name = 'robots'; meta.content = 'noindex,nofollow'; document.head.append(meta);
    return () => meta.remove();
  }, []);
  async function join(e: React.FormEvent) {
    e.preventDefault();
    if (!consent || busy || done) return;
    setBusy(true); setError('');
    try {
      const response = await fetch(`${API_BASE}/api/waitlist`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name.trim(), email: email.trim(), source: `discovery:${source}` }) });
      if (!response.ok) throw Error('We could not save your signup. Please try again.');
      setDone(true);
    } catch (e) { setError(e instanceof Error ? e.message : 'Please try again.'); }
    finally { setBusy(false); }
  }
  return <main className="min-h-screen bg-[#f7f4ef] px-5 py-12 text-stone-900"><div className="mx-auto max-w-xl space-y-6">
    <p className="text-sm uppercase tracking-widest text-purple-800">KLPS / Thank you for talking with us</p>
    <h1 className="text-4xl font-semibold">Stay in the loop with KLPS.</h1>
    <p>We’re developing insight underwear and exploring useful care boxes, shaped by conversations with women. Join the waitlist for product news and launch updates. You can also return here to share more through our optional survey.</p>
    <section className="rounded-2xl bg-white p-6 space-y-4"><h2 className="text-2xl font-semibold">Join the KLPS waitlist</h2><p>Leave your name and email to hear how the products develop and when there’s something ready to try or buy.</p>
      {done ? <p role="status">You’re on the waitlist. Thank you. You can explore the survey below now or come back to this page whenever it suits you.</p> : <form onSubmit={join} className="space-y-4">
        <label className="block">Name<input required maxLength={200} autoComplete="given-name" className="mt-1 w-full rounded-xl border p-3" value={name} onChange={e => setName(e.target.value)} /></label>
        <label className="block">Email<input type="email" required maxLength={320} autoComplete="email" className="mt-1 w-full rounded-xl border p-3" value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label className="flex items-start gap-3"><input required type="checkbox" className="mt-1" checked={consent} onChange={e => setConsent(e.target.checked)} /><span>I agree to receive KLPS product news and launch emails. I can unsubscribe at any time. This is separate from research participation.</span></label>
        <button disabled={!consent || busy} className="rounded-full bg-purple-900 px-5 py-3 text-white disabled:opacity-40">{busy ? 'Saving…' : 'Join the waitlist'}</button>
        {error && <p role="alert">{error}</p>}
      </form>}
    </section>
    <section className="rounded-2xl bg-white p-6 space-y-3"><h2 className="text-2xl font-semibold">Have more to share?</h2><p>Body Discovery asks about your experiences, what you currently use and ideas for future products. Take it now or save this page and return later. Joining the waitlist is optional and you can complete the survey independently.</p><Link className="inline-block rounded-full bg-purple-900 px-5 py-3 text-white" to={discoveryPath('/body-discovery', source)}>Open the optional survey</Link></section>
    <p className="text-sm">For a research follow-up, agree that separately with Emma. Scanning this code grants no contact permission. The link identifies the recruitment channel, and does not identify your interview.</p>
    <Link to="/privacy" className="inline-block underline">Read the privacy notice</Link>
  </div></main>;
}
