import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Lema from '@/components/mascot/Lema';

export default function CheckIn() {

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

  const [summary, setSummary] = useState<string | null>(null);

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
      placeholder: 'Share your thoughts...',
    },
  ];

  const q = questions[currentQ];
  const total = questions.length;
  const progress = ((currentQ + 1) / total) * 100;

  const selectAnswer = (value) => {
    setAnswers({ ...answers, [q.id]: value });
  };

  const fetchSummary = async () => {
    const res = await fetch(
      "https://klps-lema-production.up.railway.app/api/summary/today"
    );

    const data = await res.json();

    setSummary(data.summary);
    setCompleted(true);
  };

  const next = async () => {

    if (currentQ < total - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      await fetchSummary();
    }

  };

  const prev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  // =====================
  // COMPLETION SCREEN
  // =====================

  if (completed) {

    return (
      <div className="px-5 pt-6 max-w-lg mx-auto text-center">

        <div className="mb-6">
          <Lema state="celebrating" message="" />
        </div>

        <h2 className="text-2xl font-bold mb-4">
          Check-In Complete 🎉
        </h2>

        <p className="mb-6 text-muted-foreground">
          {summary}
        </p>

        <Button onClick={() => window.location.href = "/beta-dashboard/summary"}>
          Back to Dashboard
        </Button>

      </div>
    );
  }

  // =====================
  // QUESTIONS UI
  // =====================

  return (
    <div className="px-5 pt-6 max-w-lg mx-auto">

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs mb-2">
          <span>Question {currentQ + 1} of {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>

        <div className="h-2 bg-muted rounded-full">
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Mascot */}
      <div className="flex justify-center mb-6">
        <Lema state={currentQ === total - 1 ? 'encouraging' : 'idle'} message="" />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >

          <h2 className="text-xl font-bold text-center mb-8">
            {q.text}
          </h2>

          {q.type === 'selection' && (
            <div className="space-y-3">
              {q.options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => selectAnswer(opt.label)}
                  className={`w-full p-4 border rounded-xl ${
                    answers[q.id] === opt.label
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {q.type === 'text' && (
            <Textarea
              value={answers[q.id] || ''}
              onChange={(e) => selectAnswer(e.target.value)}
            />
          )}

        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8">

        <Button onClick={prev} disabled={currentQ === 0}>
          Back
        </Button>

        <Button
          onClick={next}
          disabled={!answers[q.id]}
        >
          {currentQ === total - 1 ? "Complete" : "Next"}
        </Button>

      </div>

    </div>
  );
}