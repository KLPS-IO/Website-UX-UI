import { Check, Clipboard, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

const OPEN_CONTACT_EVENT = "klps:open-data-room-contact";
const email = "emmamendez@klps.co.uk";
const socialLinks = [
  ["Instagram", "https://www.instagram.com/klps_wear/"],
  ["X", "https://x.com/klps_wear"],
  ["YouTube", "https://www.youtube.com/@KLPS-official"],
  ["LinkedIn", "https://www.linkedin.com/in/klpswear/"],
  ["Facebook", "https://www.facebook.com/profile.php?id=61592718058230"],
  ["TikTok", "https://www.tiktok.com/@klps_wear"],
  ["Website", "https://klps.co.uk"],
] as const;

export function ContactEmmaButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_CONTACT_EVENT))}>
      Contact Emma
    </button>
  );
}

export function DataRoomContactDialog() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_CONTACT_EVENT, show);
    return () => window.removeEventListener(OPEN_CONTACT_EVENT, show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const field = document.createElement("textarea");
      field.value = email;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  if (!open) return null;
  const contactLink = "inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2.5 text-sm font-medium text-[#9d245d] transition hover:bg-pink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500";

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#241b20]/50 p-4" onMouseDown={(event) => { if (event.currentTarget === event.target) setOpen(false); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="contact-emma-title" className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 text-[#241b20] shadow-2xl md:p-8">
        <button type="button" onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-lg p-2 text-[#71616a] hover:bg-pink-50" aria-label="Close contact details"><X size={20} /></button>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#b52b70]">Direct contact</p>
        <h2 id="contact-emma-title" className="mt-2 pr-10 font-serif text-3xl">Speak with Emma Mendez</h2>
        <p className="mt-3 text-sm leading-6 text-[#71616a]">For questions about KLPS, this data room or arranging a conversation, contact Emma directly.</p>

        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#9b8993]">Email address</p>
          <button type="button" title="Click to copy email address" onClick={() => void copyEmail()} className="group mt-2 flex w-full items-center justify-between gap-3 rounded-xl border border-pink-200 bg-pink-50/50 px-4 py-3 text-left hover:bg-pink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500">
            <span className="break-all font-medium">{email}</span>
            <span className="flex shrink-0 items-center gap-1 text-xs text-[#9d245d]">{copied ? <Check size={16} /> : <Clipboard size={16} />}{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <a className={contactLink} href="https://wa.me/447983417736?text=Hello%20Emma%2C%20I%27m%20getting%20in%20touch%20regarding%20the%20KLPS%20data%20room." target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a>
          <a className={contactLink} href="tel:+447983417736"><Phone size={17} /> 07983 417736</a>
        </div>

        <div className="mt-6 border-t border-pink-100 pt-5">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#9b8993]">Follow KLPS</p>
          <nav className="mt-3 flex flex-wrap gap-x-5 gap-y-2" aria-label="KLPS social media">
            {socialLinks.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" className="rounded text-sm text-[#9d245d] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500">{label}</a>)}
          </nav>
        </div>
      </section>
    </div>
  );
}
