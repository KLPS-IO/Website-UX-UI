import { emptyConcepts, type ConceptAnswers } from './interview-concepts.ts';
export const INTERVIEW_VERSION = 'klps-discovery-v2';
export const questions = [
  ['story', '1 · A recent real moment · 60 sec', 'In the past month, has a change in your body affected your comfort, clothing or day? Tell me about the most recent time — or say if it hasn’t.', 'What happened, when, and what did you do? Do not suggest bloating or a diagnosis. No problem is a valid answer.'],
  ['impact', '2 · Frequency and consequence · 40 sec', 'How many times did that happen in the past month, and what did it stop you doing or change for you?', 'Capture a concrete consequence, not your interpretation of her feelings.'],
  ['alternative', '3 · What she already does · 60 sec', 'What did you try that time? What have you bought or used for this in the past three months, if anything?', 'Ask for product/brand, actual £ spent and whether that was one-off or monthly. £0 is valid; unknown is not £0.'],
  ['gap', '4 · The unmet need · 40 sec', 'What worked, and what was still difficult or missing? If you did nothing, what made you leave it alone?', 'Ask why she kept or stopped using the alternative. Avoid assuming every experience needs a product.'],
  ['outcome', '5 · The result that matters · 40 sec', 'What one thing would have made that situation easier? How would you know it had helped?', 'Ask what information, if any, would change what she does. Do not introduce a garment until discovery is finished.'],
] as const;
export type Interview = {
  concepts: ConceptAnswers; id: string; createdAt: string; version: string; consent: boolean; adult: boolean;
  source: string; relationship: string; segment: string; status: string;
  story: string; impact: string; alternative: string; gap: string; outcome: string;
  frequency: string; spend: string; spendBasis: string; problem: string;
  offer: string; price: string; priceResponse: string; objection: string;
  commitment: string; followupConsent: boolean; contact: string; quoteConsent: boolean;
  paymentReference: string; paidAmount: string; notes: string;
};
export function emptyInterview(): Interview { const id=crypto.randomUUID(); return {id, concepts:emptyConcepts(id), createdAt: new Date().toISOString(), version: INTERVIEW_VERSION, consent:false, adult:false, source:'', relationship:'stranger', segment:'unclassified', status:'completed', story:'',impact:'',alternative:'',gap:'',outcome:'',frequency:'unknown',spend:'',spendBasis:'one-off / last 3 months',problem:'unknown',offer:'KLPS is exploring whether clothing, a separate wearable or a simpler app could help women understand useful changes over time. No garment type or technology has been selected. It is a development concept; reliable measurement and useful insights still need testing. It is not a diagnostic product.',price:'',priceResponse:'not tested',objection:'',commitment:'none',followupConsent:false,contact:'',quoteConsent:false,paymentReference:'',paidAmount:'',notes:''}; }
export function evidenceSummary(rows: Interview[]) {
  const complete=rows.filter(r=>r.status==='completed');
  if(!complete.length) return 'No completed interviews in this selection yet. No problem, garment, fabric or technology preference has been established. No price or payment evidence has been established. Start with three conversations, then review the first ten before choosing what to prototype.';
  const n=complete.length;
  const recent=complete.filter(r=>r.problem==='yes').length;
  const spent=complete.filter(r=>r.spend!=='' && Number(r.spend)>0).length;
  const tested=complete.filter(r=>r.priceResponse!=='not tested' && r.priceResponse!=='declined').length;
  const booked=complete.filter(r=>r.commitment==='booked').length;
  const paid=complete.filter(r=>r.commitment==='paid' && r.paymentReference && Number(r.paidAmount)>0).length;
  return `We completed ${n} discovery interviews in this selected sample; ${recent}/${n} reported a concrete problem in the past month. ${spent}/${n} reported actual spending on alternatives in the past three months; unmet needs and product priorities require review of the linked interview records. We tested a stated concept offer with ${tested}/${n}; ${booked}/${n} booked a follow-up and ${paid}/${n} have a recorded payment reference, with payment records requiring reconciliation. These convenience-sample findings do not establish market size or proven demand; the next decision is which repeated problem and segment warrants a small paid pilot.`;
}
