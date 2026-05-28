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
  allow_multiple?: boolean;
};

/* ⭐ Multi-value support */
type AnswerValue =
  string | string[];

type CompletionMeta = {
  currentStreak?: number;
  lastCompletedDay?: number;
  isDayComplete?: boolean;
};

type QuestionsLoadState =
  | "loading"
  | "ready"
  | "failed";

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

const shouldAllowMultiple = (
  question: Question | null
) => {
  if (!question) return false;

  if (
    typeof question.allow_multiple ===
    "boolean"
  ) {
    return question.allow_multiple;
  }

  const responseType =
    (
      question.response_type || ""
    ).toLowerCase();

  if (
    responseType ===
      "multi_select" ||
    responseType ===
      "selection_multi"
  ) {
    return true;
  }

  return question.question_key
    .toLowerCase()
    .endsWith("_check");
};

const isSelectionQuestion = (
  question: Question | null
) => {
  if (!question) return false;

  const responseType =
    (
      question.response_type || ""
    ).toLowerCase();

  const hasOptions =
    Array.isArray(question.options) &&
    question.options.length > 0;

  return (
    responseType === "selection" ||
    responseType === "multi_select" ||
    responseType === "selection_multi" ||
    (shouldAllowMultiple(
      question
    ) &&
      hasOptions)
  );
};

const getSummaryText = (
  payload: unknown
) => {
  if (
    !payload ||
    typeof payload !== "object"
  ) {
    return "";
  }

  const record =
    payload as Record<
      string,
      unknown
    >;

  const nested =
    record.data &&
    typeof record.data === "object"
      ? (record.data as Record<
          string,
          unknown
        >)
      : {};

  const candidates = [
    record.summary_text,
    record.summary,
    nested.summary_text,
    nested.summary
  ];

  for (const candidate of candidates) {
    if (
      typeof candidate ===
        "string" &&
      candidate.trim().length > 0
    ) {
      return candidate.trim();
    }
  }

  return "";
};

const parsePositiveNumber = (
  value: unknown
) => {
  if (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value > 0
  ) {
    return Math.trunc(value);
  }

  if (
    typeof value === "string" &&
    value.trim().length > 0
  ) {
    const parsed = Number(value);
    if (
      Number.isFinite(parsed) &&
      parsed > 0
    ) {
      return Math.trunc(parsed);
    }
  }

  return undefined;
};

const getCompletionMeta = (
  payload: unknown
): CompletionMeta => {
  if (
    !payload ||
    typeof payload !== "object"
  ) {
    return {};
  }

  const record =
    payload as Record<
      string,
      unknown
    >;

  const nested =
    record.data &&
    typeof record.data === "object"
      ? (record.data as Record<
          string,
          unknown
        >)
      : {};

  const currentStreak =
    parsePositiveNumber(
      nested.currentStreak ??
        nested.current_streak ??
        record.currentStreak ??
        record.current_streak
    );

  const lastCompletedDay =
    parsePositiveNumber(
      nested.lastCompletedDay ??
        nested.last_completed_day ??
        record.lastCompletedDay ??
        record.last_completed_day
    );

  const rawIsDayComplete =
    nested.isDayComplete ??
    nested.is_day_complete ??
    record.isDayComplete ??
    record.is_day_complete;

  const isDayComplete =
    typeof rawIsDayComplete ===
    "boolean"
      ? rawIsDayComplete
      : undefined;

  return {
    currentStreak,
    lastCompletedDay,
    isDayComplete
  };
};

const wait = (ms: number) =>
  new Promise(resolve =>
    setTimeout(resolve, ms)
  );

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

  const [otherAnswers, setOtherAnswers] =
    useState<Record<string, string>>({});

  const [dayNumber, setDayNumber] =
    useState<number>(1);

  const [completedToday, setCompletedToday] =
    useState(false);

  const [summary, setSummary] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [questionsLoadState, setQuestionsLoadState] =
    useState<QuestionsLoadState>("loading");

  const [checkInError, setCheckInError] =
    useState("");

  const [connectionStatus, setConnectionStatus] =
    useState("Loading check-in...");

  const [
    hasSignalCompletionMeta,
    setHasSignalCompletionMeta
  ] = useState(false);

  const applyCompletionMeta = (
    payload: unknown,
    source: "signal" | "summary"
  ) => {
    const completionMeta =
      getCompletionMeta(payload);

    const nextDayNumber =
      completionMeta.currentStreak ??
      completionMeta.lastCompletedDay;

    if (
      typeof nextDayNumber ===
      "number"
    ) {
      setDayNumber(nextDayNumber);

      if (source === "signal") {
        setHasSignalCompletionMeta(
          true
        );
      }
    }

    if (
      source === "signal" &&
      completionMeta.isDayComplete ===
        true
    ) {
      setCompletedToday(true);
    }
  };

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

        setQuestionsLoadState("loading");
        setCheckInError("");
        setConnectionStatus(
          "Loading check-in..."
        );

        let data: {
          questions?: Question[];
          completedToday?: boolean;
          isDayComplete?: boolean;
          is_day_complete?: boolean;
          lastCompletedDay?: number;
        } | null = null;

        const maxAttempts = 4;

        for (
          let attempt = 1;
          attempt <= maxAttempts;
          attempt += 1
        ) {
          try {
            const res = await fetch(
              `${API_BASE}/api/questions/today?user_id=${userId}`
            );

            if (!res.ok) {
              throw new Error(
                `Question fetch failed with ${res.status}`
              );
            }

            data =
              await res.json();
            break;
          }
          catch (error) {
            if (attempt >= maxAttempts) {
              throw error;
            }

            setConnectionStatus(
              "Loading ..."
            );

            await wait(2500 * attempt);
          }
        }

        if (!data) {
          throw new Error(
            "Question fetch returned no data"
          );
        }

        setQuestions(
          data.questions || []
        );

        setCompletedToday(
          data.completedToday === true ||
            data.isDayComplete === true ||
            data.is_day_complete === true
        );

        setDayNumber(
          data.lastCompletedDay || 1
        );

        setQuestionsLoadState("ready");

      }

      catch (error) {

        console.error(
          "Failed loading questions:",
          error
        );

        setQuestions([]);
        setQuestionsLoadState("failed");
        setCheckInError(
          "We couldn't load today's check-in. Please try again in a moment."
        );

      }

      finally {

        setLoading(false);

      }

    };

    fetchQuestions();

  }, [userId]);

  useEffect(() => {

    if (
      loading ||
      !userId ||
      (!completedToday &&
        questions.length > 0)
    ) {
      return;
    }

    let cancelled = false;

    const fetchSummary = async () => {
      for (
        let attempt = 0;
        attempt < 6;
        attempt += 1
      ) {
        try {
          const res = await fetch(
            `${API_BASE}/api/summary/today?user_id=${userId}`
          );

          if (res.ok) {
            const data =
              await res.json();

            const nextSummary =
              getSummaryText(data);

            if (
              !hasSignalCompletionMeta
            ) {
              applyCompletionMeta(
                data,
                "summary"
              );
            }

            if (nextSummary) {
              if (!cancelled) {
                setSummary(
                  nextSummary
                );
              }
              return;
            }
          }
        }

        catch (error) {
          console.error(
            "Failed loading summary:",
            error
          );
        }

        if (attempt < 5) {
          await wait(1500);
        }
      }
    };

    fetchSummary();

    return () => {
      cancelled = true;
    };

  }, [
    completedToday,
    hasSignalCompletionMeta,
    loading,
    questions.length,
    userId
  ]);

  /* ----------------------------- */

  const currentQuestion =
    questions[currentIndex];

  const allowMultipleSelections =
    shouldAllowMultiple(
      currentQuestion
    );

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

      if (
        allowMultipleSelections
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

  /* ----------------------------- */
  /* Save Signal                   */
  /* ----------------------------- */

  const saveSignal = async (): Promise<boolean> => {

    if (!currentQuestion) return false;

    const rawAnswer =
      answers[
        currentQuestion.question_key
      ];

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
      return false;
    }

    setCheckInError("");

    const value =
      Array.isArray(rawAnswer)
        ? rawAnswer
            .filter(
              item =>
                !otherOptionValues.includes(
                  item
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

    let res: Response;

    try {
      res = await fetch(
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
    }
    catch (error) {
      console.error(
        "Signal save failed:",
        error
      );

      setCheckInError(
        "We couldn't save that answer. Please try again before continuing."
      );

      return false;
    }

    if (!res.ok) {
      setCheckInError(
        "We couldn't save that answer. Please try again before continuing."
      );

      return false;
    }

    try {
      const data =
        await res.json();
      applyCompletionMeta(
        data,
        "signal"
      );
    }
    catch (error) {
      console.error(
        "Failed reading signal response:",
        error
      );
    }

    return true;

  };

  /* ----------------------------- */
  /* Navigation                    */
  /* ----------------------------- */

  const next = async () => {

    if (
      !currentQuestion ||
      isSubmitting
    ) return;

    const rawAnswer =
      answers[
        currentQuestion.question_key
      ];

    const otherOptionValues =
      currentQuestion.options
        ?.filter(isOtherOption)
        .map(opt => opt.value) || [];

    const hasOtherSelected =
      Array.isArray(rawAnswer)
        ? rawAnswer.some(value =>
            otherOptionValues.includes(
              value
            )
          )
        : typeof rawAnswer === "string"
          ? otherOptionValues.includes(
              rawAnswer
            )
          : false;

    const canContinue =
      Array.isArray(rawAnswer)
        ? rawAnswer.length > 0 &&
          (!hasOtherSelected ||
            (
              otherAnswers[
                currentQuestion.question_key
              ] || ""
            )
              .trim()
              .length > 0)
        : typeof rawAnswer ===
              "string" &&
            rawAnswer.trim().length > 0;

    if (!canContinue) return;

    setIsSubmitting(true);

    const saved =
      await saveSignal();

    if (!saved) {
      setIsSubmitting(false);
      return;
    }

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
        {connectionStatus}

      </div>

    );

  }

  if (
    questionsLoadState === "failed"
  ) {
    return (
      <div className="px-6 pt-12 max-w-lg mx-auto text-center">
        <Lema
          state="supportive"
          message=""
        />
        <h2 className="text-2xl font-bold mb-3">
          Check-in unavailable
        </h2>
        <p className="text-muted-foreground mb-6">
          {checkInError}
        </p>
        <Button
          onClick={() =>
            window.location.reload()
          }
        >
          Try again
        </Button>
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
        summary={summary}
        message="You've already completed today's check-in."
      />

    );

  }

  if (!currentQuestion) {

    return (

      <div className="px-6 pt-12 max-w-lg mx-auto text-center">
        <Lema
          state="supportive"
          message=""
        />
        <h2 className="text-2xl font-bold mb-3">
          No check-in questions loaded
        </h2>
        <p className="text-muted-foreground mb-6">
          Today's check-in has not been marked complete. Refresh to load the questions again.
        </p>
        <Button
          onClick={() =>
            window.location.reload()
          }
        >
          Refresh
        </Button>
      </div>

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
    allowMultipleSelections
      ? Array.isArray(selected)
        ? selected
        : []
      : typeof selected ===
            "string" &&
          selected.length > 0
        ? [selected]
        : [];

  const useSelectionUI =
    isSelectionQuestion(
      currentQuestion
    );

  const otherOptionValuesForCurrent =
    currentQuestion.options
      ?.filter(isOtherOption)
      .map(opt => opt.value) || [];

  const hasOtherSelected =
    useSelectionUI &&
    selectedArray.some(value =>
      otherOptionValuesForCurrent.includes(
        value
      )
    );

  const canContinue =
    useSelectionUI
      ? allowMultipleSelections
        ? selectedArray.length > 0 &&
          (!hasOtherSelected ||
            (
              otherAnswers[
                currentQuestion.question_key
              ] || ""
            )
              .trim()
              .length > 0)
        : selectedArray.length > 0 &&
          (!hasOtherSelected ||
            (
              otherAnswers[
                currentQuestion.question_key
              ] || ""
            )
              .trim()
              .length > 0)
      : typeof selected ===
            "string" &&
          selected.trim().length > 0;

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

          {useSelectionUI && (

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

          {/* Text */}

          {!useSelectionUI && (

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

      {checkInError && (
        <p className="mt-6 text-sm text-destructive text-center">
          {checkInError}
        </p>
      )}

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
            isSubmitting ||
            !canContinue
          }
        >

          {currentIndex ===
          questions.length - 1
            ? isSubmitting
              ? "Completing..."
              : "Complete"
            : isSubmitting
              ? "Saving..."
              : "Next"}

          <ArrowRight />

        </Button>

      </div>

    </div>

  );

}
