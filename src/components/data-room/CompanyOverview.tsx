import { Link } from "react-router-dom";
import { ContactEmmaButton } from "./DataRoomContact";

type ResearchMetrics = {
  participants: number;
  voiceRecordings: number;
  commercialInterestCount: number;
};

const folderLink = (folder: string) => `/data-room?folder=${encodeURIComponent(folder)}`;
const linkStyle = "font-medium text-[#9d245d] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500";

export function CompanyOverview({ metrics }: { metrics: ResearchMetrics | null }) {
  return (
    <article aria-label="KLPS company overview" className="mt-10 space-y-9 text-base leading-7 text-[#71616a]">
      <section className="rounded-2xl border border-pink-100 bg-pink-50/50 p-6 md:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9d245d]">KLPS Ltd · Company briefing · 28 September 2026</p>
        <h2 className="mt-4 font-serif text-3xl leading-tight text-[#241b20]">Intelligent textiles for women’s body understanding</h2>
        <p className="mt-4 max-w-3xl">KLPS is developing everyday garments with integrated textile sensing and software that turns body signals into personalised insights. The aim is to help women understand changes in their bodies through clothing they already wear.</p>
        <div className="mt-5 flex flex-wrap gap-2 text-sm text-[#241b20]">
          {['Founder-led', 'Prototype development', 'Customer discovery'].map(label => <span key={label} className="rounded-full border border-pink-200 bg-white px-3 py-1">{label}</span>)}
        </div>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="font-serif text-2xl text-[#241b20]">The customer and problem</h2>
          <p className="mt-3">KLPS’s early research focuses on women seeking a better understanding of body changes, including bloating, changes in size or shape, cycle patterns and lifestyle influences. The product direction is informed by these needs, with an emphasis on useful everyday context.</p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-[#241b20]">The product in development</h2>
          <p className="mt-3">The proposed system combines a garment, conductive textile sensing, electronics and a software insight layer. The next prototype is intended to bring these parts together and test how they work in practice. Intended capabilities are development goals, not claims of clinical validation or a finished commercial product.</p>
        </section>
      </div>

      <section>
        <h2 className="font-serif text-2xl text-[#241b20]">Progress and customer evidence</h2>
        <p className="mt-3">Customer discovery and prototype development are underway. Research informs the problem definition and product priorities; it is separate from testing a working garment.</p>
        {metrics && <dl className="mt-5 grid gap-3 sm:grid-cols-3">
          {[[metrics.participants, 'Research participants'], [metrics.voiceRecordings, 'Voice recordings'], [metrics.commercialInterestCount, 'Expressed commercial interest']].map(([value, label]) => (
            <div key={label} className="rounded-xl border border-pink-100 p-4"><dt className="text-sm">{label}</dt><dd className="mt-2 text-3xl font-semibold text-[#241b20]">{value}</dd></div>
          ))}
        </dl>}
        <p className="mt-3 text-sm">{metrics ? 'These are live research counts, not counts of paying customers or completed product tests. Expressed interest does not establish a purchase commitment.' : 'Live research counts are currently unavailable. The supporting research folder contains the evidence available for review.'}</p>
        <p className="mt-3"><Link className={linkStyle} to={folderLink('Market & Customer Evidence')}>Review market and customer evidence</Link></p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-[#241b20]">Next prototype milestone</h2>
        <p className="mt-3">In her 25 September update, Emma reported a meeting with a Bristol company and a workshop booked for the coming weeks to develop the next working prototype. Workshop funding was being assembled, with the supplier’s proposal and paperwork expected on 28 September.</p>
        <p className="mt-3">The next steps are to confirm the workshop scope and budget, build the next prototype and document its measured performance, limitations and user feedback before progressing towards commercial pilots.</p>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
          <Link className={linkStyle} to={folderLink('Product & Technology')}>Explore product and technology</Link>
          <Link className={linkStyle} to={folderLink('Development Conversations')}>Review development conversations</Link>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-[#241b20]">Founder and advisory support</h2>
        <p className="mt-3"><strong className="text-[#241b20]">Emma Mendez - Founder & CEO.</strong> Emma brings experience in enterprise software and work with advanced materials and wearable technology, and leads KLPS’s product direction and business development.</p>
        <ul className="mt-4 space-y-2">
          <li><strong className="text-[#241b20]">Oyin A.</strong> - commercial advice and connections in women-in-tech.</li>
          <li><strong className="text-[#241b20]">Muneeb A.</strong> - technical advice spanning LLM systems, MVP development and computer vision.</li>
          <li><strong className="text-[#241b20]">Imran K.</strong> - professional services and procurement advice.</li>
        </ul>
        <p className="mt-3"><Link className={linkStyle} to={folderLink('Team & Advisers')}>Review team and adviser information</Link></p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-[#241b20]">Funding and commercial direction</h2>
        <p className="mt-3">KLPS is seeking funding to advance prototype development, technical and user validation, manufacturing preparation and the work needed for commercial pilots. The immediate priority is financing the next prototype workshop and agreeing its deliverables.</p>
        <p className="mt-3">The commercial direction is to develop the garment and insight platform into a manufacturable consumer product. Pricing, routes to market and commercial assumptions should be assessed alongside the financial plan and supporting evidence.</p>
        <p className="mt-3"><Link className={linkStyle} to={folderLink('Financials & Funding')}>Review financials and funding plans</Link></p>
      </section>

      <section className="border-t border-pink-100 pt-7">
        <h2 className="font-serif text-2xl text-[#241b20]">Continue your review</h2>
        <p className="mt-3">Start with the pitch deck, then follow the evidence most relevant to your review. Available documents depend on your account’s permissions.</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          <Link className={linkStyle} to={folderLink('Pitch Deck')}>Pitch Deck</Link>
          <Link className={linkStyle} to={folderLink('Company & Legal')}>Company & Legal</Link>
          <ContactEmmaButton className={linkStyle} />
        </div>
      </section>
    </article>
  );
}
