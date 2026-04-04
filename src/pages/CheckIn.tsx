import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Lema from '@/components/mascot/Lema';
import CheckInComplete from '@/components/checkin/CheckInComplete';

const questions = [
  {
    id: 1,
    text: "How are you feeling today?",
    type: 'selection',
    options: [
      { label: 'Great', emoji: '😊' },
      { label: 'Good', emoji: '🙂' },
      { label: 'Okay', emoji: '😐' },
      { label: 'Not great', emoji: '😔' },
      { label: 'Struggling', emoji: '😣' },
    ],
  },
  {
    id: 2,
    text: "How well did you sleep last night?",
    type: 'selection',
    options: [
      { label: 'Excellent', emoji: '🌟' },
      { label: 'Good', emoji: '😴' },
      { label: 'Fair', emoji: '😑' },
      { label: 'Poor', emoji: '😫' },
    ],
  },
  {
    id: 3,
    text: "What's your energy level?",
    type: 'selection',
    options: [
      { label: 'High', emoji: '⚡' },
      { label: 'Medium', emoji: '🔋' },
      { label: 'Low', emoji: '🪫' },
    ],
  },
  {
    id: 4,
    text: "Did you exercise today?",
    type: 'selection',
    options: [
      { label: 'Yes, intense', emoji: '🏋️' },
      { label: 'Light exercise', emoji: '🚶' },
      { label: 'Not yet', emoji: '💤' },
    ],
  },
  {
    id: 5,
    text: "Anything on your mind today?",
    type: 'text',
    placeholder: 'Share your thoughts, goals, or reflections...',
  },
];

export default function CheckIn() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

  const q = questions[currentQ];
  const total = questions.length;
  const progress = ((currentQ + 1) / total) * 100;

  const selectAnswer = (value) => {
    setAnswers({ ...answers, [q.id]: value });
  };

  const next = () => {
    if (currentQ < total - 1) setCurrentQ(currentQ + 1);
    else setCompleted(true);
  };

  const prev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  if (completed) return <CheckInComplete answers={answers} questions={questions} />;

  return (
    <div className="px-5 pt-6 max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground font-medium">Question {currentQ + 1} of {total}</span>
          <span className="text-xs font-semibold text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Mascot */}
      <div className="flex justify-center mb-6">
        <Lema state={currentQ === total - 1 ? 'encouraging' : 'idle'} size="sm" message="" />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-heading text-xl font-bold text-center mb-8">{q.text}</h2>

          {q.type === 'selection' && (
            <div className="space-y-3">
              {q.options.map((opt) => (
                <motion.button
                  key={opt.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectAnswer(opt.label)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all text-left ${
                    answers[q.id] === opt.label
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border/50 bg-card hover:border-border'
                  }`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="font-medium text-sm">{opt.label}</span>
                  {answers[q.id] === opt.label && (
                    <Check className="w-5 h-5 text-primary ml-auto" />
                  )}
                </motion.button>
              ))}
            </div>
          )}

          {q.type === 'text' && (
            <Textarea
              placeholder={q.placeholder}
              value={answers[q.id] || ''}
              onChange={(e) => selectAnswer(e.target.value)}
              className="min-h-[140px] rounded-2xl border-border/50 text-sm resize-none"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 mb-8">
        <Button variant="ghost" onClick={prev} disabled={currentQ === 0} className="gap-2 rounded-xl">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button
          onClick={next}
          disabled={!answers[q.id]}
          className="gap-2 rounded-xl bg-primary hover:bg-primary/90"
        >
          {currentQ === total - 1 ? 'Complete' : 'Next'} <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}