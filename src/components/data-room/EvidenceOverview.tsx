import { ArrowUpRight } from "lucide-react";

type EvidenceDocument = { id: string; filename: string; category?: string };
type Props = {
  documents: EvidenceDocument[];
  onOpen: (document: EvidenceDocument) => Promise<void>;
};
const surveyId = "907925a6-1121-4787-921f-dfa416cc9103";
const onlineSurveyId = "57e82cef-4d66-4d1a-bfb2-35460bbb9234";
const canvasId = "9d9b6431-9c0f-49be-97d3-d0a433957055";
const findings = [
  { title: "Fit, fabric and quality are prominent priorities", detail: "68 of 120 records selected quality (56.7%); 67 selected fit and 67 selected fabric (55.8% each).", implication: "These priorities inform what to evaluate in product development.", locator: "Q12 · report page 2" },
  { title: "Visible panty lines are a frequent concern", detail: "76 of 120 records selected removing visible panty lines (63.3%), the most selected standard priority in this survey.", implication: "Visibility under clothing is a useful focus for future wear testing.", locator: "Q12 · report page 2" },
  { title: "The clip-off concept needs further validation", detail: "25 records answered exactly Yes, 11 No, 2 Maybe and 8 gave other answers. 74 of 120 did not answer this question.", implication: "This is an early concept signal; the response gap limits any conclusion about demand.", locator: "Q15 · report page 5" },
];

export function EvidenceOverview({ documents, onOpen }: Props) {
  const onlineSurvey = documents.find((doc) => doc.id === onlineSurveyId);
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
      {onlineSurvey && <section aria-labelledby="online-survey-heading" className="space-y-5">
        <div className="rounded-2xl border border-pink-100 bg-pink-50/40 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9d245d]">Reference 03 · Online customer survey</p>
          <h3 id="online-survey-heading" className="mt-3 font-serif text-2xl">Understanding body changes and customer needs</h3>
          <p className="mt-2 font-medium">June 2026 · 44 submitted responses</p>
          <p className="mt-2 text-sm leading-6 text-[#71616a]">Structured customer-discovery responses, presented as selected whole-sample findings. This sample is separate from the earlier underwear survey below; participant overlap has not been checked, so the counts are not combined.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {title: "Personal understanding is a clear research priority", detail: "28 of 44 (63.6%) selected each of personal baseline, patterns they might be missing, and habits affecting symptoms. These are overlapping selections, not separate groups.", implication: "Investigate personalised, low-effort insight into body changes; validate usefulness through product testing.", locator: "desired_insights · summary page 1"},
            {title: "People already spend on existing approaches", detail: "34 of 44 (77.3%) reported having spent money. 43 of 44 answered this field; percentages use all 44 submitted responses.", implication: "Explore which unmet needs remain despite existing spending. This is not KLPS revenue.", locator: "spent_money · summary page 1"},
            {title: "Stated interest needs a behavioural follow-up", detail: "31 of 44 (70.5%) selected definitely or probably for would_use. 22 of 44 (50.0%) selected yes for would_pay. Each field was answered by 43 of 44; percentages use all 44 submissions.", implication: "Test actual uptake, repeated use and payment. Survey interest is not an order or purchase commitment.", locator: "would_use / would_pay · summary page 1"},
          ].map((finding) => <article key={finding.title} className="rounded-2xl border border-pink-100 p-6">
            <h4 className="font-serif text-xl">{finding.title}</h4>
            <dl className="mt-4 space-y-4 text-sm leading-6">
              <div><dt className="font-semibold">What we learned</dt><dd className="mt-1 text-[#71616a]">{finding.detail}</dd></div>
              <div><dt className="font-semibold">What this informs</dt><dd className="mt-1 text-[#71616a]">{finding.implication}</dd></div>
              <div><dt className="font-semibold">Supporting evidence</dt><dd className="mt-1 text-[#71616a]">Reference 03 · {finding.locator}<br />June 2026 · n = 44 responses</dd></div>
            </dl>
            {view(onlineSurvey, "View evidence · Ref 03")}
          </article>)}
        </div>
      </section>}
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
          {onlineSurvey && <article className="py-6">
            <h4 className="font-semibold">03 · June 2026 investor research summary</h4>
            <p className="mt-2 text-sm leading-6 text-[#71616a]">Available: two-page investor summary v1.2 with selected aggregate findings, answered counts, methodology and limitations. Figures reconcile with the verified June 2026 source data. No repeated survey IDs, repeated participant IDs within the survey, or exact duplicate full answer sets were found. Test-entry status remains unverified.</p>
            <p className="mt-2 text-sm leading-6 text-[#71616a]">The private source material includes linked typed and audio-reference survey answers. These are not separate customer interviews. No individual quotations or demographic combinations are included in the investor summary.</p>
            <p className="mt-2 text-sm leading-6 text-[#71616a]">A complete private review appendix now links every survey and stored answer to stable pseudonymous references. Individual answers, quotations, recordings and response-level data are not published here while sharing permissions are clarified. Question definitions, product check-ins and supplier records are excluded from these customer-discovery counts.</p>
            {view(onlineSurvey, "View investor summary · Ref 03")}
          </article>}
          <article className="pt-6">
            <h4 className="font-semibold">Evidence prepared and remaining gaps</h4>
            <ul className="mt-3 list-disc space-y-3 pl-5 text-sm leading-6 text-[#71616a]">
              <li><strong>Interviews and transcripts:</strong> no separate interview evidence has been verified. The database transcript table is empty. Linked survey answers remain distinct from interviews; any later interview pack should include dates, participant counts and source references for quotations.</li>
              <li><strong>Online survey source material:</strong> CSV exports and the complete pseudonymised response appendix are prepared for private review. Sharing permissions and the full original questionnaire still need confirming. Reference 03 v1.2 provides a short aggregate investor report. Detailed exports and the individual appendix remain private; no monetary price claim is made before the question wording and currency are confirmed.</li>
              <li><strong>Product testing:</strong> when available, the tested version, dates, method, tester count and observed outcomes.</li>
            </ul>
            <p className="mt-4 text-sm leading-6 text-[#71616a]">Private review materials are not available through this investor page. We do not combine survey, interview and testing totals without checking participant overlap.</p>
          </article>
        </div>
      </section>
    </section>
  );
}
