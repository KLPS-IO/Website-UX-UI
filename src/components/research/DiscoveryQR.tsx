import { useEffect, useState } from 'react';
import { discoveryPath } from '@/lib/discovery-followup';

export default function DiscoveryQR({ source }: { source: string }) {
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const campaign = source === 'café' ? 'cafe' : source.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'fieldwork';
  const url = `${window.location.origin}${discoveryPath('/discovery-follow-up', campaign)}`;
  useEffect(() => {
    let live = true;
    setImage(''); setError('');
    import('qrcode').then(qr => qr.toDataURL(url, { width: 320, margin: 4, errorCorrectionLevel: 'M' }))
      .then(data => { if (live) setImage(data); })
      .catch(() => { if (live) setError('QR could not load. You can still share the link below.'); });
    return () => { live = false; };
  }, [url]);
  return <section className="rounded-2xl border border-purple-200 bg-white p-6 space-y-4">
    <h2 className="text-2xl font-semibold">Invite her to join the waitlist</h2>
    <p>“Would you like to join the KLPS waitlist and hear how the products develop? You can scan this and sign up now if you’d like. There’s a survey on the same page too, which you can come back to in your own time.”</p>
    {image && <img src={image} alt="Scan to join the KLPS waitlist or return to the optional survey" width={320} height={320} className="mx-auto w-full max-w-[320px]" />}
    {error && <p role="alert">{error}</p>}
    <a className="block break-all underline text-sm" href={url} target="_blank" rel="noreferrer">{url}</a>
    <p className="text-sm text-stone-600">This public link carries the recruitment channel only. It gives no access to interviews, recordings or founder notes. Research follow-up permission is recorded separately below. Survey responses and waitlist signups remain separate evidence.</p>
  </section>;
}
