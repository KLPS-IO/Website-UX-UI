import { ArrowLeft, ArrowUpRight, LogOut } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

type Document = { id: string; filename: string; category?: string };
type Props = {
  firstName?: string;
  email: string;
  documents: Document[];
  categoryFor: (document: Document) => string;
  onOpen: (document: Document) => Promise<void>;
  onSignOut: () => Promise<void>;
  error: string;
  metrics: { participants: number; voiceRecordings: number; commercialInterestCount: number } | null;
};
const folders = [
  { title: "Company Overview", guidance: "Latest pitch deck; one-page business overview covering the problem, solution, business model and current stage." },
  { title: "Market & Customer Evidence", guidance: "Customer discovery summary; survey findings; anonymised interview themes; competitor comparison; verified traction and tester results." },
  { title: "Product & Technology", guidance: "Product overview; selected MVP1 blueprint content; prototype photos or demonstrations; completed testing and limitations; development roadmap and next milestones." },
  { title: "Team & Advisers", guidance: "Founder biography and relevant experience; current responsibilities; confirmed advisers and their involvement; planned key hires." },
  { title: "Financials & Funding", guidance: "Dated financial summary; forecast with assumptions; funding sought; use of funds linked to milestones; relevant supplier quotations." },
  { title: "Company & Legal", guidance: "Incorporation certificate; current ownership/cap table; IP ownership and status; relevant signed agreements; appropriate policies." },
];
const labels: Record<string, string> = {
  "Pitch Deck": "Company Overview",
  Financials: "Financials & Funding",
  Funding: "Financials & Funding",
  Legal: "Company & Legal",
  "IP Portfolio": "Company & Legal",
  Technology: "Product & Technology",
  Market: "Market & Customer Evidence",
  "Team": "Team & Advisers",
  "Team & Organisation": "Team & Advisers",
};
const previousLabels: Record<string, string> = {
  "Commercial & Market": "Market & Customer Evidence",
  "Financial Information": "Financials & Funding",
  "Legal & Corporate": "Company & Legal",
};

function FolderIllustration() {
  return <svg viewBox="0 0 320 240" aria-hidden="true" className="mx-auto w-full max-w-[320px] drop-shadow-sm">
    <path d="M18 55Q18 32 41 32H105L144 55H279Q302 55 302 78V196Q302 218 280 218H40Q18 218 18 196Z" fill="#e6b800" />
    <path d="M18 91Q18 69 40 69H280Q302 69 302 91V196Q302 218 280 218H40Q18 218 18 196Z" fill="#ffd633" />
    <rect x="133" y="111" width="55" height="68" rx="5" fill="none" stroke="#805d00" strokeWidth="2" />
    <path d="M145 130H176M145 142H176M145 154H165" fill="none" stroke="#805d00" strokeWidth="2" strokeLinecap="round" />
  </svg>;
}

export function GuestDataRoom({ firstName, email, documents, categoryFor, onOpen, onSignOut, error, metrics }: Props) {
  const [params] = useSearchParams();
  const requested = params.get("folder");
  const selected = requested ? previousLabels[requested] || requested : null;
  const selectedFolder = folders.find(folder => folder.title === selected);
  const groups = new Map<string, Document[]>(folders.map(folder => [folder.title, []]));
  documents.forEach(document => {
    const category = categoryFor(document);
    const rawCategory = document.category?.trim() || "";
    const label = folders.find(folder => folder.title === rawCategory)?.title || labels[rawCategory] || previousLabels[rawCategory] || labels[category] || category;
    groups.set(label, [...(groups.get(label) || []), document]);
  });
  const welcomeName = firstName?.trim() || email;
  const items = selected ? groups.get(selected) : undefined;
  const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-4";
  return <main className="min-h-screen bg-white text-[#241b20]" style={{ colorScheme: "light" }}>
    <header className="border-b border-pink-100 px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 py-6">
        <span className="font-serif text-lg font-semibold">Private Data Room</span>
        <button onClick={() => void onSignOut()} className={`flex items-center gap-2 rounded px-2 py-2 text-sm ${focus}`}><LogOut size={16} /> Sign out</button>
      </div>
    </header>
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
      {selected && <Link to="/data-room" className={`mb-8 inline-flex items-center gap-2 rounded text-sm text-[#9d245d] ${focus}`}><ArrowLeft size={16} /> Back to data room</Link>}
      <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-[#b52b70]">Confidential access</p>
      <h1 className="break-words font-serif text-4xl leading-tight md:text-6xl">{selected ? (selectedFolder ? selected : "Folder unavailable") : `Welcome, ${welcomeName}`}</h1>
      {!selected && <p className="mt-6 max-w-xl text-base leading-7 text-[#71616a]">Welcome to our data room. Select a folder below to review the available information.</p>}
      {error && <p role="alert" className="mt-6 rounded border border-pink-200 p-4 text-[#9d245d]">{error}</p>}
      {!selected ? <>
        {metrics && <section aria-label="Research evidence" className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-y border-pink-100 py-5 text-sm text-[#71616a]">
          <span><strong className="text-[#241b20]">{metrics.participants}</strong> research participants</span>
          <span><strong className="text-[#241b20]">{metrics.voiceRecordings}</strong> voice recordings</span>
          <span><strong className="text-[#241b20]">{metrics.commercialInterestCount}</strong> expressed commercial interest</span>
        </section>}
        <h2 className="mt-12 font-serif text-2xl">Document library</h2>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {folders.map(({ title: label }, index) => { const docs = groups.get(label) || []; return <Link key={label} to={`?folder=${encodeURIComponent(label)}`} className={`group rounded-2xl border border-pink-100 p-5 transition-shadow duration-200 hover:shadow-[0_0_30px_rgba(236,72,153,0.16)] focus-visible:shadow-[0_0_30px_rgba(236,72,153,0.16)] motion-reduce:transition-none ${focus}`}>
            <FolderIllustration />
            <h3 className="mt-4 text-center font-serif text-2xl">{String(index + 1).padStart(2, "0")} · {label}</h3>
            <div className="mt-6 flex items-center justify-between border-t border-pink-100 pt-4 text-xs text-[#71616a]"><span>{docs.length ? `${docs.length} ${docs.length === 1 ? "document" : "documents"}` : "Not yet available"}</span><ArrowUpRight size={17} /></div>
          </Link>; })}
        </div>
      </> : selectedFolder ? <>
        <section className="mt-8 max-w-2xl text-sm leading-7 text-[#71616a]">
          <h2 className="font-semibold text-[#241b20]">Documents include</h2>
          <p className="mt-2">{selectedFolder.guidance}</p>
        </section>
        {!items?.length && <p className="mt-8 text-[#71616a]">Not yet available. No documents are currently available for your account in this folder.</p>}
        <ul className="mt-10 divide-y divide-pink-100 border-y border-pink-100">{(items || []).map(doc => <li key={doc.id}>
        <button onClick={() => void onOpen(doc)} className={`flex w-full items-center justify-between gap-5 rounded px-3 py-6 text-left hover:bg-pink-50 ${focus}`}><span className="break-words">{doc.filename}</span><span className="flex shrink-0 items-center gap-2 text-sm text-[#9d245d]">View <ArrowUpRight size={16} /></span></button>
      </li>)}</ul></> : <p className="mt-6 text-[#71616a]">This folder has no documents available for your account.</p>}
    </div>
  </main>;
}
