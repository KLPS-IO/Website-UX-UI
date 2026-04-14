import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ArrowLeft, ArrowRight } from "lucide-react";

import Lema from "@/components/mascot/Lema";

import ChatCompleteState
from "@/components/lema/ChatCompleteState";

import { API_BASE } from "@/config/api";

type Option = {
  value: string;
  label: string;
};

type Question = {
  question_key: string;
  question_text: string;
  domain: string;
  response_type: string;
  options: Option[];
};

/* ⭐ Multi-value support */
type AnswerValue =
  string | string[];

export default function CheckIn() {

  const navigate = useNavigate();

  const userId =
    localStorage.getItem("user_id");

  const [questions, setQuestions] =
    useState<Question[]>([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [answers, setAnswers] =
    useState<Record<string, AnswerValue>>({});

  const [dayNumber, setDayNumber] =
    useState<number>(1);

  const [completedToday, setCompletedToday] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  /* ----------------------------- */
  /* Fetch Questions               */
  /* ----------------------------- */

  useEffect(() => {

    const fetchQuestions = async () => {

      if (!userId) {

        setLoading(false);
        return;

      }

      try {

        const res = await fetch(
          `${API_BASE}/api/questions/today?user_id=${userId}`
        );

        const data =
          await res.json();

        setQuestions(
          data.questions || []
        );

        setCompletedToday(
          data.completedToday || false
        );

        setDayNumber(
          data.lastCompletedDay || 1
        );

      }

      catch (error) {

        console.error(
          "Failed loading questions:",
          error
        );

        setQuestions([]);

      }

      finally {

        setLoading(false);

      }

    };

    fetchQuestions();

  }, [userId]);

  /* ----------------------------- */

  const currentQuestion =
    questions[currentIndex];

  /* ----------------------------- */
  /* Selection Handler             */
  /* ----------------------------- */

  const toggleSelection = (
    value: string
  ) => {

    if (!currentQuestion) return;

    setAnswers(prev => {

      const existing =
        prev[currentQuestion.question_key];

      /* Multi-select logic */

      if (Array.isArray(existing)) {

        if (existing.includes(value)) {

          return {

            ...prev,

            [currentQuestion.question_key]:

              existing.filter(
                v => v !== value
              )

          };

        }

        return {

          ...prev,

          [currentQuestion.question_key]:

            [...existing, value]

        };

      }

      /* First selection */

      return {

        ...prev,

        [currentQuestion.question_key]:

          [value]

      };

    });

  };

  /* ----------------------------- */
  /* Text Answer                   */
  /* ----------------------------- */

  const setTextAnswer = (
    value: string
  ) => {

    if (!currentQuestion) return;

    setAnswers(prev => ({

      ...prev,

      [currentQuestion.question_key]:
        value

    }));

  };

  /* ----------------------------- */
  /* Save Signal                   */
  /* ----------------------------- */

  const saveSignal = async () => {

    if (!currentQuestion) return;

    const rawAnswer =
      answers[
        currentQuestion.question_key
      ];

    if (!rawAnswer) return;

    const value =
      Array.isArray(rawAnswer)
        ? rawAnswer.join(" | ")
        : rawAnswer;

    await fetch(
      `${API_BASE}/api/signal`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          user_id: userId,

          day_number: dayNumber,

          question_key:
            currentQuestion.question_key,

          response_value:
            value,

          domain:
            currentQuestion.domain

        })

      }
    );

  };

  /* ----------------------------- */
  /* Navigation                    */
  /* ----------------------------- */

  const next = async () => {

    if (
      !currentQuestion ||
      isSubmitting
    ) return;

    setIsSubmitting(true);

    await saveSignal();

    if (
      currentIndex <
      questions.length - 1
    ) {

      setCurrentIndex(prev =>
        prev + 1
      );

      setIsSubmitting(false);

    }

    else {

      navigate(
        "/beta-dashboard/summary"
      );

    }

  };

  const prev = () => {

    if (currentIndex > 0) {

      setCurrentIndex(prev =>
        prev - 1
      );

    }

  };

  /* ----------------------------- */
  /* Loading                       */
  /* ----------------------------- */

  if (loading) {

    return (

      <div className="flex items-center justify-center h-screen">

        Loading check-in...

      </div>

    );

  }

  /* ----------------------------- */
  /* Completed Today               */
  /* ----------------------------- */

  if (completedToday) {

    return (

      <ChatCompleteState
        streak={dayNumber}
        userId={userId}
        message="You've already completed today's check-in."
      />

    );

  }

  if (!currentQuestion) {

    return (

      <ChatCompleteState
        streak={dayNumber}
        userId={userId}
        message="Today's reflection is complete."
      />

    );

  }

  /* ----------------------------- */

  const progress =
    ((currentIndex + 1) /
      questions.length) *
    100;

  const selected =
    answers[
      currentQuestion.question_key
    ];

  const selectedArray =
    Array.isArray(selected)
      ? selected
      : [];

  /* ----------------------------- */
  /* UI                            */
  /* ----------------------------- */

  return (

    <div className="px-5 pt-6 max-w-lg mx-auto">

      {/* Progress */}

      <div className="mb-6">

        <div className="flex justify-between text-xs mb-2">

          <span>
            Question {currentIndex + 1} of {questions.length}
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

      {/* Mascot */}

      <div className="flex justify-center mb-6">

        <Lema
          state="supportive"
          message=""
        />

      </div>

      {/* Question */}

      <AnimatePresence mode="wait">

        <motion.div
          key={
            currentQuestion.question_key
          }
        >

          <h2 className="text-xl font-bold text-center mb-8">

            {currentQuestion.question_text}

          </h2>

          {/* Selection */}

          {currentQuestion.response_type ===
            "selection" && (

            <div className="space-y-3">

              {currentQuestion.options?.map(
                opt => (

                  <button
                    key={opt.value}

                    onClick={() =>
                      toggleSelection(
                        opt.value
                      )
                    }

                    className={`w-full p-4 border rounded-xl text-left transition ${
                      selectedArray.includes(
                        opt.value
                      )
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >

                    {opt.label}

                  </button>

                )

              )}

            </div>

          )}

          {/* Text */}

          {currentQuestion.response_type ===
            "text_long" && (

            <Textarea
              value={
                typeof selected === "string"
                  ? selected
                  : ""
              }

              onChange={(e) =>
                setTextAnswer(
                  e.target.value
                )
              }
            />

          )}

        </motion.div>

      </AnimatePresence>

      {/* Navigation */}

      <div className="flex justify-between mt-8">

        <Button
          variant="ghost"
          onClick={prev}
          disabled={
            currentIndex === 0
          }
        >

          <ArrowLeft />
          Back

        </Button>

        <Button
          onClick={next}

          disabled={
            !answers[
              currentQuestion.question_key
            ]
          }
        >

          {currentIndex ===
          questions.length - 1
            ? "Complete"
            : "Next"}

          <ArrowRight />

        </Button>

      </div>

    </div>

  );

}