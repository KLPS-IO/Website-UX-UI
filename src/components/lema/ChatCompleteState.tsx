import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import Lema from "@/components/mascot/Lema";

type Props = {
  streak?: number;
  userId?: string | null;
};

export default function ChatCompleteState({
  streak = 1,
  userId
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

      {/* Reflection Card */}

      <div className="bg-muted/40 border rounded-2xl p-5 mb-6">

        <p className="text-sm text-muted-foreground mb-2">

          Today's reflection saved

        </p>

        <p className="text-base font-medium">

          You're building consistency — one day at a time.

        </p>

      </div>

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
