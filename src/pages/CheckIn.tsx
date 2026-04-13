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

type AnswerValue =
  string | string[];

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
    useState<Record<string, AnswerValue>>({});

  const [otherAnswers, setOtherAnswers] =
    useState<Record<string, string>>({});

  const [dayNumber, setDayNumber] =
    useState<number>(1);

  const [summary, setSummary] =
    useState("");

  const [completedToday, setCompletedToday] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  /* ⭐ NEW: Prevent duplicate clicks */
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  /**
   * Fetch Questions
   */

  useEffect(() => {

    const fetchQuestions = async () => {

      if (!userId) {

        console.error("Missing user_id");

        setLoading(false);

        return;

      }

      try {

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

        setQuestions(
          data.questions || []
        );

        setCompletedToday(
          data.completedToday || false
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
        setCompletedToday(false);

      }

      finally {

        setLoading(false);

      }

    };

    fetchQuestions();

  }, [userId]);

  /**
   * ⭐ FIXED: Summary fetch runs ONCE
   */

  useEffect(() => {

    const fetchSummary = async () => {

      if (!userId) return;

      try {

        const res = await fetch(
          `${API_BASE}/api/summary/today?user_id=${userId}`
        );

        if (!res.ok) return;

        const data =
          await res.json();

        setSummary(
          data.summary_text || ""
        );

      }

      catch (error) {

        console.error(
          "Failed loading summary:",
          error
        );

      }

    };

    fetchSummary();

  }, [userId]);

  /**
   * Current Question
   */

  const currentQuestion =
    questions.length > 0
      ? questions[currentIndex]
      : null;

  const currentAnswer =
    currentQuestion
      ? answers[
          currentQuestion.question_key
        ]
      : undefined;

  const selectedOptions =
    Array.isArray(currentAnswer)
      ? currentAnswer
      : [];

  const selectedOptionDetails =
    currentQuestion?.options?.filter(
      opt =>
        selectedOptions.includes(
          opt.value
        )
    ) || [];

  const isOtherOption = (
    value: string
  ) =>
    value
      .toLowerCase()
      .includes("something else") ||
    value
      .toLowerCase()
      .includes("other");

  const hasOtherOption =
    currentQuestion?.options?.some(
      opt =>
        isOtherOption(opt.label) ||
        isOtherOption(opt.value)
    ) || false;

  const otherSelected =
    selectedOptionDetails.some(
      opt =>
        isOtherOption(opt.label) ||
        isOtherOption(opt.value)
    ) ||
    selectedOptions.some(value =>
      isOtherOption(value)
    );

  const currentOtherText =
    currentQuestion
      ? otherAnswers[
          currentQuestion.question_key
        ] || ""
      : "";

  /**
   * Save Signal
   */

  const saveSignal = (
    questionKey: string,
    value: string,
    domain: string
  ) => {

    if (!userId) return;

    fetch(
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
          question_key: questionKey,
          response_value: value,
          domain: domain

        })

      }
    ).catch(error => {

      console.error(
        "Signal save failed:",
        error
      );

    });

  };

  /**
   * Navigation
   */

  const next = () => {

    if (
      !currentQuestion ||
      isSubmitting
    ) return;

    setIsSubmitting(true);

    const responseValue =
      Array.isArray(currentAnswer)
        ? currentAnswer.join(" | ")
        : currentAnswer;

    if (!responseValue) {

      setIsSubmitting(false);
      return;

    }

    void saveSignal(
      currentQuestion.question_key,
      responseValue,
      currentQuestion.domain
    );

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

      if (userId) {

        localStorage.setItem(
          `checkin_completed_at_${userId}`,
          new Date().toISOString()
        );

      }

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
   * Completed Today
   */

  if (completedToday) {

    return (

      <ChatCompleteState
        streak={dayNumber}
        userId={userId}
        summary={summary}
        message="You've already completed today's check-in. Come back tomorrow."
      />

    );

  }

  if (!currentQuestion) {

  return (

    <ChatCompleteState
      streak={dayNumber}
      userId={userId}
      summary={summary}
      message="Today's reflection is complete."
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

  return (

    <div className="px-5 pt-6 max-w-lg mx-auto">

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

      <div className="flex justify-center mb-6">

        <Lema
          state="supportive"
          message=""
        />

      </div>

      <AnimatePresence mode="wait">

        <motion.div
          key={
            currentQuestion.question_key
          }
        >

          <h2 className="text-xl font-bold text-center mb-8">
            {currentQuestion.question_text}
          </h2>

        </motion.div>

      </AnimatePresence>

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