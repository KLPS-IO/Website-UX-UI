import { ArrowUpRight } from "lucide-react";

type EvidenceDocument = { id: string; filename: string; category?: string };
type Props = {
  documents: EvidenceDocument[];
  onOpen: (document: EvidenceDocument) => Promise<void>;
};
const surveyId = "907925a6-1121-4787-921f-dfa416cc9103";
const canvasId = "9d9b6431-9c0f-49be-97d3-d0a433957055";
const findings = [
  { title: "Fit, fabric and quality are prominent priorities", detail: "68 of 120 records selected quality (56.7%); 67 selected fit and 67 selected fabric (55.8% each).", implication: "These priorities inform what to evaluate in product development.", locator: "Q12 · report page 2" },
  { title: "Visible panty lines are a frequent concern", detail: "76 of 120 records selected removing visible panty lines (63.3%), the most selected standard priority in this survey.", implication: "Visibility under clothing is a useful focus for future wear testing.", locator: "Q12 · report page 2" },
  { title: "The clip-off concept needs further validation", detail: "25 records answered exactly Yes, 11 No, 2 Maybe and 8 gave other answers. 74 of 120 did not answer this question.", implication: "This is an early concept signal; the response gap limits any conclusion about demand.", locator: "Q15 · report page 5" },
];

export function EvidenceOverview({ documents, onOpen }: Props) {
  const survey = documents.find((doc) => doc.id === surveyId);
  const canvas = documents.find((doc) => doc.id === canvasId);
  const view = (doc: EvidenceDocument, label: string) => (
    <button type="button" onClick={() => void onOpen(doc)} className="mt-4 inline-flex items-center gap-2 rounded text-sm font-medium text-[#9d245d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-4">
      {label}<ArrowUpRight size={16} aria-hidden="true" />
    </button>
  );
  return (
    <section aria-labelledby="evidence-overview-title" className="mt-10 space-y-8">
      <div className="max-w-3xl">
        <h2 id="evidence-overview-title" className="font-serif text-3xl">Evidence Overview</h2>
        <p className="mt-3 leading-7 text-[#71616a]">Follow each finding to its supporting document and source reference. Findings describe the evidence available; implications explain how it informs our next steps.</p>
      </div>
      {survey && <>
        <div className="rounded-2xl border border-pink-100 bg-pink-50/40 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9d245d]">Reference 01 · Early underwear survey</p>
          <p className="mt-3 font-medium">19 May 2024–23 November 2025 · 120 response records</p>
          <p className="mt-2 text-sm leading-6 text-[#71616a]">115 records from 2024 and 5 from 2025. Historical customer discovery; this is not a count of prototype testers. Multiple selections were allowed for the priorities question.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {findings.map((finding) => <article key={finding.title} className="rounded-2xl border border-pink-100 p-6">
            <h3 className="font-serif text-xl">{finding.title}</h3>
            <dl className="mt-4 space-y-4 text-sm leading-6">
              <div><dt className="font-semibold">What we learned</dt><dd className="mt-1 text-[#71616a]">{finding.detail}</dd></div>
              <div><dt className="font-semibold">What this informs</dt><dd className="mt-1 text-[#71616a]">{finding.implication}</dd></div>
              <div><dt className="font-semibold">Supporting evidence</dt><dd className="mt-1 text-[#71616a]">Reference 01 · {finding.locator}<br />19 May 2024–23 November 2025 · n = 120 records</dd></div>
            </dl>
            {view(survey, "View evidence · Ref 01")}
          </article>)}
        </div>
      </>}
      <section aria-labelledby="source-register-title" className="rounded-2xl border border-pink-100 p-6 md:p-8">
        <h3 id="source-register-title" className="font-serif text-2xl">Source references</h3>
        <p className="mt-2 text-sm leading-6 text-[#71616a]">The report, its underlying responses and any later interpretation should be traceable as separate parts of the same evidence trail.</p>
        <div className="mt-6 divide-y divide-pink-100">
          {survey && <article className="pb-6">
            <h4 className="font-semibold">01 · Early underwear customer discovery</h4>
            <p className="mt-2 text-sm leading-6 text-[#71616a]">Available: anonymised report, version 1.0, prepared 28 September 2026. Source: <span className="font-medium">2 Min Survey.xlsx</span>, Responses worksheet, rows 2–121. Counts and methods are documented in the report.</p>
            <p className="mt-2 text-sm leading-6 text-[#71616a]">Underlying response-level data is not published here. An anonymised source export can be added under Reference 01 for readers to check the findings. The survey platform has not been verified from this workbook.</p>
            {view(survey, "View survey report · Ref 01")}
          </article>}
          {canvas && <article className="py-6">
            <h4 className="font-semibold">02 · Value Proposition Canvas</h4>
            <p className="mt-2 text-sm leading-6 text-[#71616a]">Supporting company analysis of customer needs and the proposed value proposition. Treat this as an interpretation to connect to primary evidence, rather than a separate participant study. Study dates and sample size are not established in this overview.</p>
            {view(canvas, "View canvas · Ref 02")}
          </article>}
          <article className="pt-6">
            <h4 className="font-semibold">Sources still to be linked</h4>
            <ul className="mt-3 list-disc space-y-3 pl-5 text-sm leading-6 text-[#71616a]">
              <li><strong>Customer interviews:</strong> dated, anonymised notes or transcripts, exact quotations with page or timestamp references, participant counts and the themes they support.</li>
              <li><strong>Online customer surveys:</strong> the questionnaire, dated anonymised response export, sample size and the question behind each finding.</li>
              <li><strong>Product testing:</strong> when available, the tested version, dates, method, tester count and observed outcomes.</li>
            </ul>
            <p className="mt-4 text-sm leading-6 text-[#71616a]">These source packs are not yet linked here. We do not combine survey, interview and testing totals without checking participant overlap.</p>
          </article>
        </div>
      </section>
    </section>
  );
}
