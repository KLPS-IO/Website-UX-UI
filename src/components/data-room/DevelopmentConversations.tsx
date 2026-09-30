type Conversation = {
  organisation: string;
  location: string;
  period: string;
  status: string;
  discussion: string;
  nextStep: string;
};

const conversations: Conversation[] = [
  {
    organisation: "University of Manchester Henry Royce Institute",
    location: "Manchester",
    period: "Oct 2025 – May 2026",
    status: "Outline project plan received",
    discussion: "Early technical discussions covered graphene–nylon fibre feasibility, sample preparation and characterisation. The outline scope received in May covers fibre production rather than creation of a woven textile.",
    nextStep: "KLPS to assess how the fibre-only scope fits the next technical phase.",
  },
  {
    organisation: "Interactive Wear AG",
    location: "Germany",
    period: "2026 · month to confirm",
    status: "Supplier conversation",
    discussion: "Initial discussion recorded around wearable-electronics and smart-textile development capability. No contracted delivery relationship is represented.",
    nextStep: "Confirm the dated record and determine whether a scoped feasibility discussion should continue.",
  },
  {
    organisation: "Ignitec Ltd",
    location: "Bristol",
    period: "Sep 2026",
    status: "Proposal pending",
    discussion: "A product-development workshop has been discussed for the next wearable prototype, including scope, engineering activity and associated costs.",
    nextStep: "Review the proposal when received and decide whether the scope, deliverables and budget are suitable.",
  },
  {
    organisation: "Smart Garment People",
    location: "Burnley",
    period: "Sep 2026",
    status: "Introductory outreach sent",
    discussion: "KLPS requested an introductory call about garment integration, comfort, washability and the feasibility of developing a smaller wearable prototype.",
    nextStep: "Await a response and assess technical fit, development process and indicative feasibility-stage cost.",
  },
  {
    organisation: "ADETEXS",
    location: "Nottingham",
    period: "Sep 2026",
    status: "Introductory outreach sent",
    discussion: "KLPS requested an introductory discussion about integrating sensing electronics into textiles, with emphasis on comfort, reliable sensing and washability.",
    nextStep: "Await a response and assess technical fit and indicative feasibility-stage cost.",
  },
];

export function DevelopmentConversations() {
  return (
    <article aria-label="KLPS development conversations" className="mt-10 space-y-8 text-base leading-7 text-[#71616a]">
      <section className="rounded-2xl border border-pink-100 bg-pink-50/50 p-6 md:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9d245d]">Development conversations · 30 September 2026</p>
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
              <span className="w-fit rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-xs font-medium text-[#8b1f53]">{conversation.status}</span>
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

      <p className="text-sm">Statuses describe the latest evidenced position available to KLPS and should be updated when a response, proposal, decision or completed engagement changes the record.</p>
    </article>
  );
}
