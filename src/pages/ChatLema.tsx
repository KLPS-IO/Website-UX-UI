import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ArrowLeft, ArrowRight } from "lucide-react";

import Lema from "@/components/mascot/Lema";

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

export default function CheckIn() {

  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [dayNumber, setDayNumber] = useState<number>(1);

  const [loading, setLoading] = useState(true);

  // ==========================
  // Fetch Questions
  // ==========================

  useEffect(() => {

    const fetchQuestions = async () => {

      try {

        const res = await fetch(
          "https://klps-lema-production.up.railway.app/api/questions/today"
        );

        const data = await res.json();

        console.log("Fetched Questions:", data);

        setQuestions(data.questions || []);
        setDayNumber(data.day || 1);

      } catch (error) {

        console.error("Failed loading questions:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchQuestions();

  }, []);

  // ==========================
  // Safe Current Question
  // ==========================

  const currentQuestion =
    questions.length > 0
      ? questions[currentIndex]
      : null;

  // ==========================
  // Save Signal
  // ==========================

  const saveSignal = async (
    questionKey: string,
    value: string,
    domain: string
  ) => {

    try {

      await fetch(
        "https://klps-lema-production.up.railway.app/api/signal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id:
              "11111111-1111-1111-1111-111111111111",

            day_number: dayNumber,

            question_key: questionKey,

            response_value: value,

            domain: domain
          })
        }
      );

    } catch (error) {

      console.error("Signal save failed:", error);

    }

  };

  // ==========================
  // Select Answer
  // ==========================

  const selectAnswer = async (value: string) => {

    if (!currentQuestion) return;

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.question_key]: value
    }));

    await saveSignal(
      currentQuestion.question_key,
      value,
      currentQuestion.domain
    );

  };

  // ==========================
  // Navigation
  // ==========================

  const next = () => {

    if (!currentQuestion) return;

    if (currentIndex < questions.length - 1) {

      setCurrentIndex(prev => prev + 1);

    } else {

      // ✅ FINAL STEP → Summary

      navigate("/beta-dashboard/summary");

    }

  };

  const prev = () => {

    if (currentIndex > 0) {

      setCurrentIndex(prev => prev - 1);

    }

  };

  // ==========================
  // Loading Guard
  // ==========================

  if (loading) {

    return (

      <div className="flex items-center justify-center h-screen">

        Loading check-in...

      </div>

    );

  }

  // ==========================
  // No Questions Guard
  // ==========================

  if (!currentQuestion) {

    return (

      <div className="flex items-center justify-center h-screen">

        No questions available.

      </div>

    );

  }

  // ==========================
  // Progress
  // ==========================

  const progress =
    ((currentIndex + 1) / questions.length) * 100;

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
            animate={{ width: `${progress}%` }}
          />

        </div>

      </div>

      {/* Mascot */}

      <div className="flex justify-center mb-6">

        <Lema
          state={
            currentIndex === questions.length - 1
              ? "encouraging"
              : "idle"
          }
          message=""
        />

      </div>

      {/* Question */}

      <AnimatePresence mode="wait">

        <motion.div
          key={currentQuestion.question_key}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >

          <h2 className="text-xl font-bold text-center mb-8">

            {currentQuestion.question_text}

          </h2>

          {/* Selection */}

          {currentQuestion.response_type === "selection" && (

            <div className="space-y-3">

              {currentQuestion.options?.map(opt => (

                <button
                  key={opt.value}
                  onClick={() =>
                    selectAnswer(opt.value)
                  }
                  className={`w-full p-4 border rounded-xl text-left ${
                    answers[currentQuestion.question_key] === opt.value
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >

                  {opt.label}

                </button>

              ))}

            </div>

          )}

          {/* Text */}

          {currentQuestion.response_type === "text_long" && (

            <Textarea
              value={
                answers[currentQuestion.question_key] || ""
              }
              onChange={(e) =>
                selectAnswer(e.target.value)
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
          disabled={currentIndex === 0}
        >

          <ArrowLeft /> Back

        </Button>

        <Button
          onClick={next}
          disabled={
            !answers[currentQuestion.question_key]
          }
        >

          {currentIndex === questions.length - 1
            ? "Complete"
            : "Next"}

          <ArrowRight />

        </Button>

      </div>

    </div>

  );

}