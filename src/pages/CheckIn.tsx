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

export default function CheckIn() {

  console.log("CHAT LEMA LOADED");

  const navigate = useNavigate();

  const userId =
    localStorage.getItem("user_id");

  const [questions, setQuestions] =
    useState<Question[]>([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [answers, setAnswers] =
    useState<Record<string, string>>({});

  const [dayNumber, setDayNumber] =
    useState<number>(1);

  const [loading, setLoading] =
    useState(true);

  /**
   * Fetch Questions
   */

  useEffect(() => {

    const fetchQuestions = async () => {

      if (!userId) {

        console.error(
          "Missing user_id"
        );

        setLoading(false);

        return;

      }

      try {

        console.log(
          "Fetching questions..."
        );

        const res = await fetch(
          `${API_BASE}/api/questions/today?user_id=${userId}`
        );

        if (!res.ok) {

          const err =
            await res.text();

          console.error(
            "Question fetch failed:",
            err
          );

          setQuestions([]);

          return;

        }

        const data =
          await res.json();

        console.log(
          "Fetched Questions:",
          data
        );

        setQuestions(
          data.questions || []
        );

        setDayNumber(
          data.day || 1
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

  /**
   * Current Question
   */

  const currentQuestion =
    questions.length > 0
      ? questions[currentIndex]
      : null;

  /**
   * Save Signal
   */

  const saveSignal = async (
    questionKey: string,
    value: string,
    domain: string
  ) => {

    if (!userId) return;

    try {

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

            day_number:
              dayNumber,

            question_key:
              questionKey,

            response_value:
              value,

            domain:
              domain

          })

        }
      );

    }

    catch (error) {

      console.error(
        "Signal save failed:",
        error
      );

    }

  };

  /**
   * Select Answer
   */

  const selectAnswer = async (
    value: string
  ) => {

    if (!currentQuestion) return;

    setAnswers(prev => ({

      ...prev,

      [currentQuestion.question_key]:
        value

    }));

    await saveSignal(

      currentQuestion.question_key,

      value,

      currentQuestion.domain

    );

  };

  /**
   * Navigation
   */

  const next = () => {

    if (!currentQuestion) return;

    if (
      currentIndex <
      questions.length - 1
    ) {

      setCurrentIndex(prev =>
        prev + 1
      );

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

  /**
   * Loading
   */

  if (loading) {

    return (

      <div className="flex items-center justify-center h-screen">

        Loading check-in...

      </div>

    );

  }

  /**
   * No Questions → Complete State
   */

  if (!currentQuestion) {

    console.warn(
      "No questions returned from API"
    );

    return (

      <ChatCompleteState
        streak={dayNumber}
      />

    );

  }

  /**
   * Progress
   */

  const progress =
    ((currentIndex + 1) /
      questions.length) *
    100;

  /**
   * Detect missing options
   */

  const hasOptions =
    currentQuestion.options &&
    currentQuestion.options.length > 0;

  if (

    currentQuestion.response_type === "selection" &&
    !hasOptions

  ) {

    console.warn(
      `Missing options for ${currentQuestion.question_key}`
    );

  }

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
              width:
                `${progress}%`
            }}
          />

        </div>

      </div>

      {/* Mascot */}

      <div className="flex justify-center mb-6">

        <Lema
          state={
            currentIndex ===
            questions.length - 1
              ? "encouraging"
              : "idle"
          }
          message=""
        />

      </div>

      {/* Question */}

      <AnimatePresence mode="wait">

        <motion.div
          key={
            currentQuestion.question_key
          }

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

            {currentQuestion.question_text}

          </h2>

          {/* Selection */}

          {currentQuestion.response_type === "selection" && hasOptions && (

            <div className="space-y-3">

              {currentQuestion.options.map(
                opt => (

                  <button
                    key={opt.value}

                    onClick={() =>
                      selectAnswer(
                        opt.value
                      )
                    }

                    className={`w-full p-4 border rounded-xl text-left ${
                      answers[
                        currentQuestion.question_key
                      ] === opt.value
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

          {/* Fallback Text Input */}

          {(

            currentQuestion.response_type === "text_long" ||

            (

              currentQuestion.response_type === "selection" &&
              !hasOptions

            )

          ) && (

            <Textarea
              value={
                answers[
                  currentQuestion.question_key
                ] || ""
              }

              onChange={(e) =>
                selectAnswer(
                  e.target.value
                )
              }

              placeholder="Type your response..."

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
