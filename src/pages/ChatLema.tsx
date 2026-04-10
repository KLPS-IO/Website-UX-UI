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
};

type AnswerValue =
  string | string[];

export default function CheckIn() {

  console.log("CHAT LEMA LOADED");

  const navigate = useNavigate();

  /**
   * ✅ Get logged-in user ID
   */

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

  const [loading, setLoading] =
    useState(true);

  /**
   * Fetch Questions
   */

  useEffect(() => {

    const fetchQuestions = async () => {

      if (!userId) {

        console.error(
          "No user_id found in localStorage"
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

  }, [userId, currentIndex, questions.length]);

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
      .includes(
        "something else"
      ) ||
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

  const normalizeFreeText = (
    value: string
  ) => {
    const trimmed =
      value.trim();

    if (!trimmed) return "";

    const collapsedSpaces =
      trimmed.replace(
        /\s+/g,
        " "
      );

    const normalizedPunctuationSpacing =
      collapsedSpaces
        .replace(
          /\s+([,!.?])/g,
          "$1"
        )
        .replace(
          /([,!.?])([^\s])/g,
          "$1 $2"
        );

    const sentenceCased =
      normalizedPunctuationSpacing.replace(
        /(^\s*[a-z])|([.!?]\s+[a-z])/g,
        match =>
          match.toUpperCase()
      );

    if (
      /[.!?]$/.test(
        sentenceCased
      )
    ) {
      return sentenceCased;
    }

    const wordCount =
      sentenceCased.split(" ")
        .length;

    return wordCount > 3
      ? `${sentenceCased}.`
      : sentenceCased;
  };

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
    ).catch(error => {

      console.error(
        "Signal save failed:",
        error
      );

    });

  };

  /**
   * Select Answer
   */

  const selectAnswer = (
    value: string
  ) => {

    if (!currentQuestion) return;

    setAnswers(prev => ({

      ...prev,

      [currentQuestion.question_key]:
        value

    }));

  };

  const toggleSelection = (
    value: string
  ) => {

    if (!currentQuestion) return;

    setAnswers(prev => {
      const existing =
        Array.isArray(
          prev[
            currentQuestion.question_key
          ]
        )
          ? [
              ...(
                prev[
                  currentQuestion.question_key
                ] as string[]
              )
            ]
          : [];

      const nextValues =
        existing.includes(value)
          ? existing.filter(
              item =>
                item !== value
            )
          : [...existing, value];

      return {
        ...prev,
        [currentQuestion.question_key]:
          nextValues
      };
    });

  };

  const updateOtherAnswer = (
    value: string
  ) => {

    if (!currentQuestion) return;

    setOtherAnswers(prev => ({
      ...prev,
      [currentQuestion.question_key]:
        value
    }));

  };

  const buildResponseValue = () => {

    if (!currentQuestion) return "";

    if (
      currentQuestion.response_type ===
      "selection"
    ) {
      const combined =
        selectedOptions.map(value => {
          const isOther =
            isOtherOption(value) ||
            selectedOptionDetails.some(
              opt =>
                opt.value === value &&
                (
                  isOtherOption(opt.label) ||
                  isOtherOption(opt.value)
                )
            );

          if (
            isOther &&
            currentOtherText.trim()
          ) {
            return `${value}: ${normalizeFreeText(currentOtherText)}`;
          }

          return value;
        });

      return combined.join(" | ");
    }

    return typeof currentAnswer ===
      "string"
      ? normalizeFreeText(
          currentAnswer
        )
      : "";
  };

  const canContinue = () => {

    if (!currentQuestion) return false;

    if (
      currentQuestion.response_type ===
      "selection"
    ) {
      if (selectedOptions.length === 0) {
        return false;
      }

      if (
        otherSelected &&
        !currentOtherText.trim()
      ) {
        return false;
      }

      return true;
    }

    return Boolean(
      typeof currentAnswer ===
        "string" &&
        currentAnswer.trim()
    );
  };

  /**
   * Navigation
   */

  const next = () => {

    if (!currentQuestion || isCompleting) return;

    const responseValue =
      buildResponseValue();

    if (!responseValue) return;

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

    }

    else {

      console.time(
        "chat-complete-transition"
      );

      console.log(
        "Complete tapped at",
        new Date().toISOString()
      );

      setIsCompleting(true);

      if (userId) {
        localStorage.setItem(
          `checkin_completed_at_${userId}`,
          new Date().toISOString()
        );
      }

      setCurrentIndex(
        questions.length
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
   * No Questions → Completion State
   */

  if (!currentQuestion) {

    console.warn(
      "No questions returned from API"
    );

    return (

      <ChatCompleteState
        streak={dayNumber}
        userId={userId}
        summary={summary}
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

  const hasOptions =
    currentQuestion.options &&
    currentQuestion.options.length > 0;

  if (
    currentQuestion.response_type ===
      "selection" &&
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
            currentIndex === 0
              ? "welcome"
              : currentIndex === 1
              ? "supportive"
              : currentIndex === 2
              ? "idle"
              : currentIndex === 3
              ? "encouraging"
              : currentIndex === 4
              ? "encouraging"
              : "welcome"
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

          {currentQuestion.response_type ===
            "selection" &&
            hasOptions && (

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

                    className={`w-full p-4 border rounded-xl text-left ${
                      selectedOptions.includes(
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

          {currentQuestion.response_type ===
            "selection" &&
            hasOptions &&
            hasOtherOption &&
            otherSelected && (
            <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="mb-2 text-sm font-medium text-foreground">
                Tell me what that “Something else” is...
              </p>
              <Textarea
                value={currentOtherText}
                onChange={(e) =>
                  updateOtherAnswer(
                    e.target.value
                  )
                }
                placeholder="Type your answer here..."
                spellCheck
                autoCorrect="on"
                autoCapitalize="sentences"
                className="bg-background"
              />
            </div>
          )}

          {(
            currentQuestion.response_type ===
              "text_long" ||
            (
              currentQuestion.response_type ===
                "selection" &&
              !hasOptions
            )
          ) && (

            <Textarea
              value={
                typeof currentAnswer ===
                "string"
                  ? currentAnswer
                  : ""
              }

              onChange={(e) =>
                selectAnswer(
                  e.target.value
                )
              }
              placeholder="Type your response..."
              spellCheck
              autoCorrect="on"
              autoCapitalize="sentences"
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
            !canContinue() ||
            isCompleting
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
