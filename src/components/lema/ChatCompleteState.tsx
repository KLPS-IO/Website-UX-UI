import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import Lema from "@/components/mascot/Lema";

type Props = {
  streak?: number;
  userId?: string | null;
  summary?: string;
  message?: string;
};

export default function ChatCompleteState({
  streak = 1,
  userId,
  summary,
  message
}: Props) {

  const [timeLeft, setTimeLeft] =
    useState("");

  /**
   * Countdown to 24 hours after
   * this user's completion time
   */

  useEffect(() => {

    if (!userId) {
      setTimeLeft("24h 0m");
      return;
    }

    const completionKey =
      `checkin_completed_at_${userId}`;

    const getCompletionTime = () => {
      const saved =
        localStorage.getItem(
          completionKey
        );

      if (saved) {
        return new Date(saved);
      }

      const now =
        new Date();

      localStorage.setItem(
        completionKey,
        now.toISOString()
      );

      return now;
    };

    const updateTimer = () => {

      const now =
        new Date();

      const completedAt =
        getCompletionTime();

      const diff =
        Math.max(
          0,
          completedAt.getTime() +
            24 * 60 * 60 * 1000 -
            now.getTime()
        );

      const hours =
        Math.floor(
          diff /
          (1000 * 60 * 60)
        );

      const minutes =
        Math.floor(
          (diff %
            (1000 * 60 * 60)) /
          (1000 * 60)
        );

      setTimeLeft(
        `${hours}h ${minutes}m`
      );

    };

    updateTimer();

    const interval =
      setInterval(
        updateTimer,
        60000
      );

    return () =>
      clearInterval(interval);

  }, [userId]);

  const summaryLines =
    summary
      ? summary
          .split("\n")
          .map(line =>
            line.trim()
          )
          .filter(Boolean)
      : [];

  const hasSummaryHeading =
    summaryLines.some(line =>
      line
        .toLowerCase()
        .includes(
          "today you showed"
        )
    );

  const formattedSummaryLines =
    summaryLines.filter(line =>
      !line
        .toLowerCase()
        .includes(
          "today you showed"
        )
    );

  return (

    <div className="px-6 pt-12 max-w-lg mx-auto text-center">

      {/* Mascot */}

      <motion.div
        initial={{
          scale: 0.9,
          opacity: 0
        }}
        animate={{
          scale: 1,
          opacity: 1
        }}
        className="mb-6"
      >

        <Lema
          state="celebrating"
          message=""
        />

      </motion.div>

      {/* Streak */}

      <motion.h2
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="text-2xl font-bold mb-2"
      >

        🔥 {streak} Day Streak Complete

      </motion.h2>

      <p className="text-muted-foreground mb-6">

        You showed up today. That matters.

      </p>

      {message && (
        <p className="text-sm text-muted-foreground mb-6">
          {message}
        </p>
      )}

      {/* Reflection Card */}

      <div className="bg-muted/40 border rounded-2xl p-5 mb-6 text-left">

        {summary ? (
          <>
            {!hasSummaryHeading && (
              <p className="text-sm text-muted-foreground mb-2">
                Today you showed:
              </p>
            )}

            <div className="space-y-2.5">
              {formattedSummaryLines.map(
                (line, index) => {
                  const cleanLine =
                    line.replace(
                      /^[•*-]\s*/,
                      ""
                    );

                  const isLabelValue =
                    cleanLine.includes(
                      ":"
                    );

                  if (!isLabelValue) {
                    return (
                      <p
                        key={`${cleanLine}-${index}`}
                        className="text-sm leading-relaxed text-foreground/90"
                      >
                        {cleanLine}
                      </p>
                    );
                  }

                  const [
                    label,
                    ...rest
                  ] = cleanLine.split(
                    ":"
                  );

                  return (
                    <div
                      key={`${cleanLine}-${index}`}
                      className="flex items-start gap-2 text-sm leading-relaxed"
                    >
                      <span className="mt-1 text-primary">
                        •
                      </span>
                      <p className="text-foreground/90">
                        <span className="font-medium">
                          {label.trim()}:
                        </span>{" "}
                        {rest
                          .join(":")
                          .trim()}
                      </p>
                    </div>
                  );
                }
              )}
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-2">
              Today's reflection saved
            </p>

            <p className="text-base font-medium">
              You're building consistency — one day at a time.
            </p>
          </>
        )}

      </div>

      {summary && (
        <p className="text-base font-medium mb-6">
          You're building consistency — one day at a time.
        </p>
      )}

      {/* Countdown */}

      <div className="mb-6">

        <p className="text-sm text-muted-foreground">

          Next check-in opens in

        </p>

        <motion.p
          key={timeLeft}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-semibold mt-1"
        >

          ⏱ {timeLeft}

        </motion.p>

      </div>

      {/* Encouragement */}

      <p className="text-sm text-muted-foreground">

        Rest now. We'll continue tomorrow 🌱

      </p>

    </div>

  );

}
