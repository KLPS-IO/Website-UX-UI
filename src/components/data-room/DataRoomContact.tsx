import { Mail, MessageCircle, Phone } from "lucide-react";

const contactLink = "inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2.5 text-sm font-medium text-[#9d245d] transition hover:bg-pink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2";
const socialLinks = [
  ["Instagram", "https://www.instagram.com/klps_wear/"],
  ["X", "https://x.com/klps_wear"],
  ["YouTube", "https://www.youtube.com/@KLPS-official"],
  ["LinkedIn", "https://www.linkedin.com/in/klpswear/"],
  ["Facebook", "https://www.facebook.com/profile.php?id=61592718058230"],
  ["TikTok", "https://www.tiktok.com/@klps_wear"],
  ["Website", "https://klps.co.uk"],
] as const;

export function DataRoomContact() {
  return (
    <section className="mt-16 rounded-2xl border border-pink-100 bg-pink-50/40 p-6 md:p-8" aria-labelledby="data-room-contact-title">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#b52b70]">Direct contact</p>
      <h2 id="data-room-contact-title" className="mt-2 font-serif text-2xl text-[#241b20]">Speak with Emma Mendez</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#71616a]">
        For questions about KLPS, the evidence in this data room or arranging a conversation, contact Emma directly. No contact form or intermediary inbox is used.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a className={contactLink} href="mailto:emmamendez@klps.co.uk?subject=KLPS%20Data%20Room%20Enquiry">
          <Mail size={17} /> Email Emma
        </a>
        <a className={contactLink} href="https://wa.me/447983417736?text=Hello%20Emma%2C%20I%27m%20getting%20in%20touch%20regarding%20the%20KLPS%20data%20room." target="_blank" rel="noreferrer">
          <MessageCircle size={17} /> Message on WhatsApp
        </a>
        <a className={contactLink} href="tel:+447983417736">
          <Phone size={17} /> 07983 417736
        </a>
      </div>
      <p className="mt-4 text-xs text-[#71616a]">Emma Mendez · Founder, KLPS Ltd · emmamendez@klps.co.uk</p>
      <div className="mt-6 border-t border-pink-100 pt-5">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#9b8993]">Follow KLPS</p>
        <nav className="mt-3 flex flex-wrap gap-x-5 gap-y-2" aria-label="KLPS social media">
          {socialLinks.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="rounded text-sm text-[#9d245d] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
