import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Lema from '@/components/mascot/Lema';

export default function CheckIn() {

  useEffect(() => {

  const startSession = async () => {

    await fetch(
      "https://klps-lema-production.up.railway.app/api/session/start",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id:
            "11111111-1111-1111-1111-111111111111"
        })
      }
    );

  };

  startSession();

}, []);

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const USER_ID =
    "11111111-1111-1111-1111-111111111111";

  const questions = [

    {
      id: 1,
      key: "mood",
      text: "How are you feeling today?",
      type: 'selection',
      options: [
        { label: 'Great' },
        { label: 'Good' },
        { label: 'Okay' },
        { label: 'Not great' },
        { label: 'Struggling' },
      ],
    },

    {
      id: 2,
      key: "sleep",
      text: "How well did you sleep last night?",
      type: 'selection',
      options: [
        { label: 'Excellent' },
        { label: 'Good' },
        { label: 'Fair' },
        { label: 'Poor' },
      ],
    },

    {
      id: 3,
      key: "energy",
      text: "What's your energy level?",
      type: 'selection',
      options: [
        { label: 'High' },
        { label: 'Medium' },
        { label: 'Low' },
      ],
    },

    {
      id: 4,
      key: "exercise",
      text: "Did you exercise today?",
      type: 'selection',
      options: [
        { label: 'Yes intense' },
        { label: 'Light exercise' },
        { label: 'Not yet' },
      ],
    },

    {
      id: 5,
      key: "reflection",
      text: "Anything on your mind today?",
      type: 'text',
      placeholder: 'Share your thoughts...',
    }

  ];

  const q = questions[currentQ];
  const total = questions.length;
  const progress = ((currentQ + 1) / total) * 100;

  const selectAnswer = (value) => {

    setAnswers({
      ...answers,
      [q.key]: value
    });

  };


  /**
   * Send answers to backend
   */

const submitSignals = async () => {

  const entries =
    Object.entries(answers);

  for (const [key, value] of entries) {

    if (!value) continue;

    const payload = {

      user_id: USER_ID,

      day_number: 1,

      question_key: key,

      response_value: value,

      domain: "daily_checkin"

    };

    console.log(
      "Sending signal:",
      payload
    );

    const res = await fetch(
      "https://klps-lema-production.up.railway.app/api/signal",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(payload)

      }
    );

    if (!res.ok) {

      const errorText =
        await res.text();

      console.error(
        "Signal failed:",
        payload,
        errorText
      );

    }

  }

};


  /**
   * Fetch summary after signals saved
   */

  const fetchSummary = async () => {

  /**
   * STEP 1 — Start session
   */

  const sessionRes = await fetch(
    `https://klps-lema-production.up.railway.app/api/questions/today?user_id=${USER_ID}`
  );

  if (!sessionRes.ok) {

    console.error(
      "Session start failed"
    );

    return;

  }

  /**
   * STEP 2 — Submit signals
   */

  await submitSignals();

  /**
   * STEP 3 — Get summary
   */

  const res = await fetch(
    `https://klps-lema-production.up.railway.app/api/summary/today?user_id=${USER_ID}`
  );

  if (!res.ok) {

    const err =
      await res.text();

    console.error(
      "Summary failed:",
      err
    );

    return;

  }

  const data =
    await res.json();

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

    if (currentQ > 0) {

      setCurrentQ(currentQ - 1);

    }

  };


  /**
   * Completion Screen
   */

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

        <Button
          onClick={() =>
            window.location.href =
            "/beta-dashboard/summary"
          }
        >
          Back to Dashboard
        </Button>

      </div>

    );

  }


  /**
   * Question UI
   */

  return (

    <div className="px-5 pt-6 max-w-lg mx-auto">

      <div className="mb-6">

        <div className="flex justify-between text-xs mb-2">

          <span>
            Question {currentQ + 1} of {total}
          </span>

          <span>
            {Math.round(progress)}%
          </span>

        </div>

        <div className="h-2 bg-muted rounded-full">

          <motion.div
            className="h-full bg-primary"
            animate={{
              width: `${progress}%`
            }}
          />

        </div>

      </div>


      <div className="flex justify-center mb-6">

        <Lema
          state={
            currentQ === total - 1
              ? 'encouraging'
              : 'idle'
          }
          message=""
        />

      </div>


      <AnimatePresence mode="wait">

        <motion.div
          key={q.id}
          initial={{
            opacity: 0,
            x: 30
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: -30
          }}
        >

          <h2 className="text-xl font-bold text-center mb-8">
            {q.text}
          </h2>


          {q.type === 'selection' && (

            <div className="space-y-3">

              {q.options.map((opt) => (

                <button
                  key={opt.label}
                  onClick={() =>
                    selectAnswer(opt.label)
                  }
                  className={`w-full p-4 border rounded-xl ${
                    answers[q.key] === opt.label
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
              value={
                answers[q.key] || ''
              }
              onChange={(e) =>
                selectAnswer(
                  e.target.value
                )
              }
            />

          )}

        </motion.div>

      </AnimatePresence>


      <div className="flex justify-between mt-8">

        <Button
          onClick={prev}
          disabled={currentQ === 0}
        >
          Back
        </Button>

        <Button
          onClick={next}
          disabled={!answers[q.key]}
        >

          {currentQ === total - 1
            ? "Complete"
            : "Next"}

        </Button>

      </div>

    </div>

  );

}