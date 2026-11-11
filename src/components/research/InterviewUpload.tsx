import { useEffect, useState } from 'react';
import type { AudioTake } from './InterviewAudio';
export function PendingInterviewClip({ take, label, onRetry }: {
    take: AudioTake;
    label: string;
    onRetry: () => void;
}) {
    const [url, setUrl] = useState('');
    useEffect(() => { const next = URL.createObjectURL(take.blob); setUrl(next); return () => URL.revokeObjectURL(next); }, [take.blob]);
    return <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 space-y-2"><p className="font-semibold">{label} · awaiting server confirmation</p><audio src={url} controls className="w-full"/><div className="flex flex-wrap gap-4"><button type="button" className="underline" onClick={onRetry}>Retry saving clip</button><a className="underline" href={url} download={`klps-recording.${take.blob.type.includes('mp4') ? 'm4a' : take.blob.type.includes('mpeg') ? 'mp3' : 'webm'}`}>Download backup</a></div></div>;
}
export default function InterviewUpload({ enabled, onAdd }: {
    enabled: boolean;
    onAdd: (take: AudioTake) => void;
}) {
    const [file, setFile] = useState<File>();
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');
    const [generation, setGeneration] = useState(0);
    useEffect(() => { if (!file)
        return; let live = true; const audio = new Audio(); const url = URL.createObjectURL(file); audio.preload = 'metadata'; audio.onloadedmetadata = () => { if (live && Number.isFinite(audio.duration) && audio.duration > 0)
        setDuration(String(Math.round(audio.duration * 10) / 10)); }; audio.src = url; return () => { live = false; audio.src = ''; URL.revokeObjectURL(url); }; }, [file]);
    function add() { if (!file)
        return; const seconds = Number(duration); if (!(seconds > 0) || seconds > 86400) {
        setError('Enter the recording length in seconds.');
        return;
    } const mime = file.type === 'audio/x-m4a' || /\.m4a$/i.test(file.name) ? 'audio/mp4' : /\.mp3$/i.test(file.name) ? 'audio/mpeg' : /\.wav$/i.test(file.name) ? 'audio/wav' : file.type || 'audio/webm'; onAdd({ blob: new Blob([file], { type: mime }), durationSeconds: seconds }); setFile(undefined); setDuration(''); setGeneration(n => n + 1); setError(''); }
    return <details className="rounded-xl border p-3"><summary className="cursor-pointer">Upload a phone recording to this topic</summary><div className="mt-3 space-y-3"><p className="text-sm">Choose a consented recording. Each file can be up to 20 MB. Add several files one at a time.</p><input key={generation} aria-label="Phone audio file" type="file" accept="audio/mp4,audio/x-m4a,audio/mpeg,audio/wav,audio/webm,.m4a,.mp3,.wav,.webm" disabled={!enabled} onChange={e => { const next = e.target.files?.[0]; setDuration(''); if (next && next.size > 20 * 1024 * 1024) {
        setError('This file is larger than 20 MB. Split or compress a copy on your phone, keeping the original.');
        setFile(undefined);
        return;
    } setFile(next); setError(''); }}/>{file && <><p className="break-all text-sm">{file.name}</p><label className="block text-sm">Recording length in seconds<input type="number" min="0.1" step="0.1" max="86400" className="mt-1 w-full rounded-lg border p-2" value={duration} onChange={e => setDuration(e.target.value)}/></label><p className="text-xs">The length fills automatically when available. Otherwise enter the duration shown on your phone.</p><button type="button" disabled={!enabled || !duration} className="rounded-full bg-purple-900 px-4 py-2 text-white disabled:opacity-40" onClick={add}>Upload and save clip</button></>}{error && <p role="alert">{error}</p>}</div></details>;
}
