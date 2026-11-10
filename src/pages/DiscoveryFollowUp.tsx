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
    <h1 className="text-4xl font-semibold">Carry on in your own time.</h1>
    <p>We’re learning what makes everyday comfort and care easier for women and the people who care for them. We’re still deciding what to offer. Choose whichever next step suits you, or leave it here.</p>
    <section className="rounded-2xl bg-white p-6 space-y-3"><h2 className="text-2xl font-semibold">Share more through Body Discovery</h2><p>The existing survey asks about body experiences, current solutions and possible future ideas. Some questions explore smart clothing. Answer only what you feel comfortable sharing.</p><Link className="inline-block rounded-full bg-purple-900 px-5 py-3 text-white" to={discoveryPath('/body-discovery', source)}>Open the optional survey</Link></section>
    <section className="rounded-2xl bg-white p-6 space-y-4"><h2 className="text-2xl font-semibold">Hear about future products</h2><p>Join the optional KLPS product waitlist. No purchase or product availability is promised.</p>
      {done ? <p role="status">You’re on the waitlist. Thank you.</p> : <form onSubmit={join} className="space-y-4">
        <label className="block">Name<input required maxLength={200} autoComplete="given-name" className="mt-1 w-full rounded-xl border p-3" value={name} onChange={e => setName(e.target.value)} /></label>
        <label className="block">Email<input type="email" required maxLength={320} autoComplete="email" className="mt-1 w-full rounded-xl border p-3" value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label className="flex items-start gap-3"><input required type="checkbox" className="mt-1" checked={consent} onChange={e => setConsent(e.target.checked)} /><span>I agree to receive KLPS product news and launch emails. I can unsubscribe at any time. This is separate from research participation.</span></label>
        <button disabled={!consent || busy} className="rounded-full bg-purple-900 px-5 py-3 text-white disabled:opacity-40">{busy ? 'Saving…' : 'Join the product waitlist'}</button>
        {error && <p role="alert">{error}</p>}
      </form>}
    </section>
    <p className="text-sm">For a research follow-up, agree that separately with Emma. Scanning this code grants no contact permission. The link identifies the recruitment channel, and does not identify your interview.</p>
    <Link to="/privacy" className="inline-block underline">Read the privacy notice</Link>
  </div></main>;
}
