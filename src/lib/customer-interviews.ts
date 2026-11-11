import { emptyConcepts, type ConceptAnswers } from './interview-concepts.ts';
export const INTERVIEW_VERSION = 'klps-discovery-v5';
export const questions = [
  ['story', '1 · Start with something real', "What's something you've tried or used recently for your own comfort or care?", 'Let her choose the subject. If she buys for someone else, follow that experience. A product, device, service or something she already owns can all be a starting point.'],
  ['impact', '2 · Why she tried it', 'What made you try it?', 'Stay with the example she just gave. Find out what happened on a particular occasion and how much it mattered to her.'],
  ['alternative', '3 · How she chose and paid', 'How did you choose that one?', 'Learn what she actually bought or tried, where she found it, what she paid and when. Ask each follow-up separately.'],
  ['gap', '4 · How it worked', 'How did it work for you?', 'Give her room to say it worked well. Find out what happened when she used it and whether she kept using it.'],
  ['outcome', '5 · What she would improve', 'If you could improve one thing about that experience, what would it be?', 'Accept that she may change nothing. Keep the improvement grounded in her own experience, then thank her and offer an optional next step.'],
] as const;
export const purchaseQuestions = [
  ['story', '1 · A recent purchase or experience', 'Tell me about the last time you bought something to help with your own comfort or care, or for someone you care for.', 'Follow her example. Establish who used it and who paid. If she has no relevant purchase, ask about a recent experience or accept that answer.'],
  ['impact', '2 · What led her to look', 'What was happening that made you look for something?', 'Ask when it happened, how often it happens, and what was difficult. Check the past-month frequency separately before coding it.'],
  ['alternative', '3 · What she already buys or tries', 'What did you buy or try, where did you find it, and roughly what did you spend?', 'Include things she already owned, homemade solutions and doing nothing. Ask when she spent it and the spending period. Unknown is not £0.'],
  ['gap', '4 · What still needs help', 'How well did that work? What, if anything, was still difficult?', 'Ask what she used, stopped using or would buy again. Leave room for everything working well.'],
  ['outcome', '5 · How she chooses', 'How did you decide what to choose? Was there anything you needed help finding or understanding?', 'Follow a useful story. Explore the result she wanted without suggesting a box, garment or technology.'],
] as const;
export const legacyQuestions = [
  ['story', '1 · A recent real moment · 60 sec', 'In the past month, has a change in your body affected your comfort, clothing or day? Tell me about the most recent time — or say if it hasn’t.', 'What happened, when, and what did you do? Do not suggest bloating or a diagnosis. No problem is a valid answer.'],
  ['impact', '2 · Frequency and consequence · 40 sec', 'How many times did that happen in the past month, and what did it stop you doing or change for you?', 'Capture a concrete consequence, not your interpretation of her feelings.'],
  ['alternative', '3 · What she already does · 60 sec', 'What did you try that time? What have you bought or used for this in the past three months, if anything?', 'Ask for product/brand, actual £ spent and whether that was one-off or monthly. £0 is valid; unknown is not £0.'],
  ['gap', '4 · The unmet need · 40 sec', 'What worked, and what was still difficult or missing? If you did nothing, what made you leave it alone?', 'Ask why she kept or stopped using the alternative. Avoid assuming every experience needs a product.'],
  ['outcome', '5 · The result that matters · 40 sec', 'What one thing would have made that situation easier? How would you know it had helped?', 'Ask what information, if any, would change what she does. Do not introduce a garment until discovery is finished.'],
] as const;
type GuideQuestion = readonly ['story'|'impact'|'alternative'|'gap'|'outcome', string, string, string?];
export const questionsForVersion = (version?: string): readonly GuideQuestion[] => version === INTERVIEW_VERSION ? questions : version === 'klps-discovery-v4' ? purchaseQuestions : legacyQuestions;
export type Interview = {
  audioConsent?: boolean; audio?: { questionKey: string; contentType: string; durationSeconds: number; bytes: number }[]; analysisStatus?: string; concepts: ConceptAnswers; id: string; createdAt: string; version: string; consent: boolean; adult: boolean;
  source: string; relationship: string; segment: string; status: string;
  story: string; impact: string; alternative: string; gap: string; outcome: string;
  frequency: string; spend: string; spendBasis: string; problem: string;
  offer: string; price: string; priceResponse: string; objection: string;
  commitment: string; followupConsent: boolean; contact: string; quoteConsent: boolean;
  paymentReference: string; paidAmount: string; notes: string;
};
export function emptyInterview(): Interview { const id=crypto.randomUUID(); return {id, audioConsent:false, audio:[], analysisStatus:'needs review', concepts:emptyConcepts(id), createdAt: new Date().toISOString(), version: INTERVIEW_VERSION, consent:false, adult:false, source:'', relationship:'stranger', segment:'unclassified', status:'completed', story:'',impact:'',alternative:'',gap:'',outcome:'',frequency:'unknown',spend:'',spendBasis:'unknown',problem:'unknown',offer:'',price:'',priceResponse:'not tested',objection:'',commitment:'none',followupConsent:false,contact:'',quoteConsent:false,paymentReference:'',paidAmount:'',notes:''}; }
export function evidenceSummary(rows: Interview[]) {
  const complete=rows.filter(r=>r.status==='completed'&&r.analysisStatus!=='needs review');
  if(!complete.length) return 'No reviewed, completed interviews in this selection yet. No buyer, problem or offer has been established. No price or payment evidence has been established. Start with three conversations, then review the first ten before choosing what to prototype.';
  const n=complete.length;
  const recent=complete.filter(r=>r.problem==='yes').length;
  const spent=complete.filter(r=>r.spend!=='' && Number(r.spend)>0 && r.spendBasis!=='unknown').length;
  const tested=complete.filter(r=>r.priceResponse!=='not tested' && r.priceResponse!=='declined').length;
  const booked=complete.filter(r=>r.commitment==='booked').length;
  const paid=complete.filter(r=>r.commitment==='paid' && r.paymentReference && Number(r.paidAmount)>0).length;
  return `We completed ${n} discovery interviews in this selected sample; ${recent}/${n} were coded as reporting a concrete problem in the past month. ${spent}/${n} reported actual spending on alternatives with a recorded spending basis; unmet needs and product priorities require review of the linked interview records. We tested a stated concept offer with ${tested}/${n}; ${booked}/${n} booked a follow-up and ${paid}/${n} have a recorded payment reference, with payment records requiring reconciliation. These convenience-sample findings do not establish market size or proven demand; the next decision is which repeated problem and segment warrants a small paid pilot.`;
}
