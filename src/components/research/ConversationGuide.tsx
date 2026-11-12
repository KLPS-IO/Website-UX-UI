const followups = {
  story: ['What made you choose that one?', 'What did you pay?', 'How well is it working for you?'],
  impact: ['Can you take me back to the last time that happened?', 'How often has that happened in the past month?', 'What did it change about your day, if anything?'],
  alternative: ['Where did you find it?', 'What else did you consider or try?', 'Roughly what did you pay, and when?', 'Was that a one-off purchase or something you buy regularly?'],
  gap: ['What worked well?', 'Is there anything about it that still bothers you?', 'Have you tried finding something better?', 'What happened when you looked?'],
  outcome: ['What would that change for you?', 'How would you know it was better?', 'Would you choose the same thing again? What makes you say that?'],
};
export default function ConversationGuide({ topic, currentScript }: { topic: keyof typeof followups; currentScript: boolean }) {
  if (!currentScript) return <p className="text-sm text-stone-600">This saved interview uses an earlier guide. Review the question you actually asked in the recording.</p>;
  return <div className="rounded-xl bg-stone-50 p-4 space-y-3">
    <h3 className="font-semibold">If you need a follow-up, choose one</h3>{topic==='story'&&<p className="text-sm">Stay with her first example. A fleece, cream or everyday purchase can all tell you about a real need. Follow it through before introducing another subject.</p>}
    <ul className="space-y-2">{followups[topic].map(question => <li key={question} className="border-l-2 border-purple-200 pl-3">“{question}”</li>)}</ul>
    <p className="text-xs text-stone-600">These are optional. Follow what she says, pause, and move on when you understand the example.</p>
  </div>;
}
