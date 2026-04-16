import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ArrowLeft, ArrowRight } from "lucide-react";

import Lema from "@/components/mascot/Lema";

import ChatCompleteState
from "@/components/lema/ChatCompleteState";

import { API_BASE } from "@/config/api";
import celebratingVideo from "@/assets/lema_celebrating.mp4";

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
  allow_multiple?: boolean;
};

type AnswerValue =
  string | string[];

const isOtherOption = (
  option: Option
) => {
  const normalized =
    `${option.value} ${option.label}`
      .toLowerCase()
      .replace(/[_-]/g, " ");

  return (
    normalized.includes(
      "something else"
    ) || normalized.includes("other")
  );
};

export default function CheckIn() {

  console.log("CHAT LEMA LOADED");

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

  const [isCompleting, setIsCompleting] =
    useState(false);

  const [isComplete, setIsComplete] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  /**
   Fetch Questions
   */

  useEffect(() => {

    const fetchQuestions = async () => {

      if (!userId) {

        console.error(
          "No user_id found"
        );

        setLoading(false);

        return;

      }

      try {

        const res = await fetch(
          `${API_BASE}/api/questions/today?user_id=${userId}`
        );

        if (!res.ok) {

          console.error(
            "Question fetch failed"
          );

          setQuestions([]);

          return;

        }

        const data =
          await res.json();

        setQuestions(
          data.questions || []
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

  const currentQuestion =
    questions.length > 0
      ? questions[currentIndex]
      : null;

  /**
   Fetch Summary ONLY after completion
   */

  useEffect(() => {

    if (
      loading ||
      (!isComplete && !!currentQuestion)
    ) {
      return;
    }

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
          data.summary_text ||
            data.summary ||
            ""
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

  }, [isComplete, currentQuestion, loading, userId]);

  /**
   Preload celebration video
   */

  useEffect(() => {

    const video =
      document.createElement("video");

    video.src =
      celebratingVideo;

    video.preload =
      "auto";

    video.muted = true;
    video.playsInline = true;
    video.load();

  }, []);

  const toggleSelection = (
    value: string
  ) => {

    if (!currentQuestion) return;

    setAnswers(prev => {
      const existing =
        prev[currentQuestion.question_key];

      if (
        currentQuestion.allow_multiple
      ) {
        const list =
          Array.isArray(existing)
            ? existing
            : [];

        if (list.includes(value)) {
          const option =
            currentQuestion.options?.find(
              opt => opt.value === value
            );

          if (
            option &&
            isOtherOption(option)
          ) {
            setOtherAnswers(prev => ({
              ...prev,
              [currentQuestion.question_key]:
                ""
            }));
          }

          return {
            ...prev,
            [currentQuestion.question_key]:
              list.filter(
                v => v !== value
              )
          };
        }

        return {
          ...prev,
          [currentQuestion.question_key]:
            [...list, value]
        };
      }

      const option =
        currentQuestion.options?.find(
          opt => opt.value === value
        );

      if (
        option &&
        !isOtherOption(option)
      ) {
        setOtherAnswers(prev => ({
          ...prev,
          [currentQuestion.question_key]:
            ""
        }));
      }

      return {
        ...prev,
        [currentQuestion.question_key]:
          value
      };
    });
  };

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

  const setOtherTextAnswer = (
    value: string
  ) => {
    if (!currentQuestion) return;

    setOtherAnswers(prev => ({
      ...prev,
      [currentQuestion.question_key]:
        value
    }));
  };

  /**
   Save Signal
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
   Next
   */

  const next = () => {

    if (!currentQuestion || isCompleting)
      return;

    const rawAnswer =
      answers[currentQuestion.question_key];

    const otherOptionValues =
      currentQuestion.options
        ?.filter(isOtherOption)
        .map(opt => opt.value) || [];

    const selectedValues =
      Array.isArray(rawAnswer)
        ? rawAnswer
        : typeof rawAnswer === "string"
          ? [rawAnswer]
          : [];

    const hasOtherSelected =
      selectedValues.some(value =>
        otherOptionValues.includes(value)
      );

    const customOtherText = (
      otherAnswers[
        currentQuestion.question_key
      ] || ""
    ).trim();

    if (
      !rawAnswer ||
      (Array.isArray(rawAnswer) &&
        rawAnswer.length === 0) ||
      (typeof rawAnswer === "string" &&
        rawAnswer.trim().length === 0) ||
      (hasOtherSelected &&
        customOtherText.length === 0)
    ) {
      return;
    }

    const responseValue =
      Array.isArray(rawAnswer)
        ? rawAnswer
            .filter(
              value =>
                !otherOptionValues.includes(
                  value
                )
            )
            .concat(
              hasOtherSelected
                ? [
                    `something_else: ${customOtherText}`
                  ]
                : []
            )
            .join(" | ")
        : otherOptionValues.includes(
              rawAnswer
            )
          ? `something_else: ${customOtherText}`
          : rawAnswer;

    saveSignal(
      currentQuestion.question_key,
      responseValue,
      currentQuestion.domain
    );

    if (
      currentIndex <
      questions.length - 1
    ) {

      setCurrentIndex(
        prev => prev + 1
      );

    }

    else {

      console.log(
        "FINAL QUESTION COMPLETE"
      );

      setIsCompleting(true);

      setTimeout(() => {

        setIsComplete(true);

      }, 400);

    }

  };

  const prev = () => {

    if (currentIndex > 0) {

      setCurrentIndex(
        prev => prev - 1
      );

    }

  };

  /**
   Loading
   */

  if (loading) {

    return (

      <div className="flex items-center justify-center h-screen">

        Loading check-in...

      </div>

    );

  }

  /**
   TRUE Completion State
   */

  if (isComplete) {

    return (

      <ChatCompleteState
        streak={dayNumber}
        userId={userId}
        summary={summary}
      />

    );

  }

  /**
   No Questions fallback
   */

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
   Progress
   */

  const progress =
    ((currentIndex + 1) /
      questions.length) *
    100;

  const selectedAnswer =
    answers[currentQuestion.question_key];

  const selectedValues =
    currentQuestion.allow_multiple
      ? Array.isArray(selectedAnswer)
        ? selectedAnswer
        : []
      : typeof selectedAnswer ===
            "string" &&
          selectedAnswer.length > 0
        ? [selectedAnswer]
        : [];

  const otherOptionValuesForCurrent =
    currentQuestion.options
      ?.filter(isOtherOption)
      .map(opt => opt.value) || [];

  const hasOtherSelected =
    currentQuestion.response_type ===
      "selection" &&
    selectedValues.some(value =>
      otherOptionValuesForCurrent.includes(
        value
      )
    );

  const canContinue =
    currentQuestion.response_type ===
      "selection"
      ? currentQuestion.allow_multiple
        ? selectedValues.length > 0 &&
          (!hasOtherSelected ||
            (
              otherAnswers[
                currentQuestion.question_key
              ] || ""
            )
              .trim()
              .length > 0)
        : selectedValues.length > 0 &&
          (!hasOtherSelected ||
            (
              otherAnswers[
                currentQuestion.question_key
              ] || ""
            )
              .trim()
              .length > 0)
      : typeof selectedAnswer ===
            "string" &&
          selectedAnswer.trim().length > 0;

  return (

    <div className="px-5 pt-6 max-w-lg mx-auto">

      <div className="mb-6">

        <div className="flex justify-between text-xs mb-2">

          <span>

            Question {currentIndex + 1}
            of {questions.length}

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

        <Lema state="supportive" message="" />

      </div>

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
                      selectedValues.includes(
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

              {hasOtherSelected && (
                <Textarea
                  value={
                    otherAnswers[
                      currentQuestion.question_key
                    ] || ""
                  }
                  onChange={(e) =>
                    setOtherTextAnswer(
                      e.target.value
                    )
                  }
                  placeholder="Type your response..."
                />
              )}
            </div>
          )}

          {currentQuestion.response_type ===
            "text_long" && (
            <Textarea
              value={
                typeof selectedAnswer ===
                "string"
                  ? selectedAnswer
                  : ""
              }
              onChange={(e) =>
                setTextAnswer(
                  e.target.value
                )
              }
              placeholder="Type your response..."
            />
          )}

        </motion.div>

      </AnimatePresence>

      <div className="flex justify-between mt-8">

        <Button
          variant="ghost"
          onClick={prev}
          disabled={currentIndex === 0}
        >

          <ArrowLeft />
          Back

        </Button>

        <Button
          onClick={next}
          disabled={
            isCompleting ||
            !canContinue
          }
        >

          {currentIndex ===
          questions.length - 1
            ? isCompleting
              ? "Completing..."
              : "Complete"
            : "Next"}

          <ArrowRight />

        </Button>

      </div>

    </div>

  );

}
