type Conversation = {
  organisation: string;
  location: string;
  period: string;
  status: string;
  statusTone: "green" | "amber" | "neutral";
  lifecycle: string;
  lifecycleTone: "green" | "amber" | "red";
  discussion: string;
  nextStep: string;
};

const conversations: Conversation[] = [
  {
    organisation: "WearNex",
    location: "United Kingdom · video meeting",
    period: "2 Oct 2026",
    status: "Technical discovery meeting completed",
    statusTone: "green",
    lifecycle: "Follow-up scope requested",
    lifecycleTone: "amber",
    discussion: "KLPS presented its stretch-sensing prototype and discussed a stretch-first MVP, optional skin-temperature sensing, daily wear, washing and a route from prototype to wearer trials. WearNex advised simplifying the garment around an encapsulated sensor and sealed removable electronics module, with Bluetooth, onboard logging and wireless charging. It also identified perspiration, detergent residue, garment sizing, manufacturing yield, certification and freedom-to-operate as development considerations. Spoken, non-binding indications were approximately £2,500–£2,800 for an improved prototype, £21,000–£28,000 for 50 pre-production trial systems and £200,000–£250,000 for 5,000 units. No quotation, order or development engagement was agreed.",
    nextStep: "Send WearNex a concise written brief covering the preferred garment, encapsulated module, stretch and temperature requirements, expected daily wear and the requested prototype outcome. Ask for a written scope, deliverables, ownership/IP terms, timescale and quotation, while completing proportionate freedom-to-operate review before committing material development spend.",
  },
  {
    organisation: "University of Manchester Henry Royce Institute",
    location: "Manchester",
    period: "Oct 2025 – May 2026",
    status: "Outline project plan received",
    statusTone: "green",
    lifecycle: "On pause — scope under review",
    lifecycleTone: "amber",
    discussion: "Early technical discussions covered graphene–nylon fibre feasibility, sample preparation and characterisation. The outline scope received in May covers fibre production rather than creation of a woven textile.",
    nextStep: "KLPS to assess how the fibre-only scope fits the next technical phase.",
  },
  {
    organisation: "Interactive Wear AG",
    location: "Germany",
    period: "2026 · month to confirm",
    status: "Supplier conversation",
    statusTone: "neutral",
    lifecycle: "Concluded — no further action",
    lifecycleTone: "red",
    discussion: "Initial discussion recorded around wearable-electronics and smart-textile development capability. No contracted delivery relationship is represented.",
    nextStep: "No further action is currently planned. Reopen only if KLPS decides the supplier should be reconsidered.",
  },
  {
    organisation: "Ignitec Ltd",
    location: "Bristol",
    period: "Sep – Oct 2026",
    status: "Proposal received — correction requested",
    statusTone: "amber",
    lifecycle: "Decision pending — not accepted",
    lifecycleTone: "amber",
    discussion: "Proposal 915 was received on 1 October 2026 for a four-hour discovery workshop in Bristol and a written development roadmap. The proposed scope covers stretch sensing, smaller electronics, power, connectivity, garment integration, comfort, washing, manufacturing, cost and scale. The fixed fee is £2,550 excluding VAT; later engineering and prototype work is outside this proposal and would require separate approval.",
    nextStep: "Obtain a corrected version replacing the unrelated project name ‘Clippies’ with KLPS, then review funding availability and decide whether to accept. No follow-on development is authorised.",
  },
  {
    organisation: "Smart Garment People",
    location: "Burnley",
    period: "Sep 2026",
    status: "Introductory outreach sent",
    statusTone: "neutral",
    lifecycle: "Awaiting response",
    lifecycleTone: "amber",
    discussion: "KLPS requested an introductory call about garment integration, comfort, washability and the feasibility of developing a smaller wearable prototype.",
    nextStep: "Await a response and assess technical fit, development process and indicative feasibility-stage cost.",
  },
  {
    organisation: "ADETEXS",
    location: "Nottingham",
    period: "Sep 2026",
    status: "Introductory outreach sent",
    statusTone: "neutral",
    lifecycle: "Awaiting response",
    lifecycleTone: "amber",
    discussion: "KLPS requested an introductory discussion about integrating sensing electronics into textiles, with emphasis on comfort, reliable sensing and washability.",
    nextStep: "Await a response and assess technical fit and indicative feasibility-stage cost.",
  },
];

const statusClasses = {
  green: "border-emerald-200 bg-emerald-50 text-emerald-800",
  amber: "border-amber-200 bg-amber-50 text-amber-800",
  neutral: "border-pink-200 bg-pink-50 text-[#8b1f53]",
};

const lifecycleClasses = {
  green: "border-emerald-200 bg-emerald-50 text-emerald-800",
  amber: "border-amber-200 bg-amber-50 text-amber-800",
  red: "border-red-200 bg-red-50 text-red-700",
};

export function DevelopmentConversations() {
  return (
    <article aria-label="KLPS development conversations" className="mt-10 space-y-8 text-base leading-7 text-[#71616a]">
      <section className="rounded-2xl border border-pink-100 bg-pink-50/50 p-6 md:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9d245d]">Development conversations · updated 2 October 2026</p>
        <h2 className="mt-4 font-serif text-3xl leading-tight text-[#241b20]">Research and product-development engagement</h2>
        <p className="mt-4 max-w-3xl">KLPS is speaking with research and commercial organisations to test technical fit, define the next prototype scope and understand development costs. The entries below record conversations and outreach; they do not represent contracted partnerships unless expressly stated.</p>
      </section>

      <div className="space-y-4">
        {conversations.map((conversation) => (
          <section key={conversation.organisation} className="rounded-2xl border border-pink-100 p-5 md:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#9d245d]">{conversation.period}</p>
                <h2 className="mt-2 font-serif text-2xl text-[#241b20]">{conversation.organisation}</h2>
                <p className="mt-1 text-sm">{conversation.location}</p>
              </div>
              <div className="flex items-end gap-2 sm:flex-col" aria-label={`Status: ${conversation.status}. ${conversation.lifecycle}.`}>
                <span className={`w-fit rounded-full border px-3 py-1 text-xs font-medium ${statusClasses[conversation.statusTone]}`}>{conversation.status}</span>
                <span className={`w-fit rounded-full border px-3 py-1 text-[11px] font-medium ${lifecycleClasses[conversation.lifecycleTone]}`}>{conversation.lifecycle}</span>
              </div>
            </div>
            <div className="mt-5 grid gap-5 border-t border-pink-100 pt-5 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-[#241b20]">Conversation</h3>
                <p className="mt-2 text-sm leading-6">{conversation.discussion}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#241b20]">Current next step</h3>
                <p className="mt-2 text-sm leading-6">{conversation.nextStep}</p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <p className="text-sm">Statuses describe the latest evidenced position available to KLPS and will be updated when a response, proposal, decision or completed engagement changes the record. Spoken cost indications are planning references only and are not treated as quotations or commitments.</p>
    </article>
  );
}
