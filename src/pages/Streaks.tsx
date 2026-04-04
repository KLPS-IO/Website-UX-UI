import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Trophy, Zap, Share2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Lema from '@/components/mascot/Lema';
import WellnessCard from '@/components/ui-wellness/WellnessCard';
import StreakFlame from '@/components/streaks/StreakFlame';
import StreakDayRow from '@/components/streaks/StreakDayRow';
import StreakHighlights from '@/components/streaks/StreakHighlights';

export default function Streaks() {
  const [showHighlights, setShowHighlights] = useState(false);

  return (
    <div className="max-w-lg mx-auto">
      {/* ── Streak hero ── */}
      <div className="bg-gradient-to-b from-background to-muted/40 px-5 pt-10 pb-8 flex flex-col items-center">
        {/* Big flame with number */}
        <StreakFlame count={12} />

        <p className="text-lg font-heading font-semibold text-foreground mt-2">Day Streak</p>

        {/* Current week row */}
        <div className="mt-6 w-full">
          <StreakDayRow />
        </div>

        <p className="mt-5 text-sm text-muted-foreground text-center px-6">
          You made it to 12! Keep the momentum going — you're doing great.
        </p>

        {/* Action buttons */}
        <div className="flex gap-3 mt-6 w-full">
          <Button
            className="flex-1 rounded-2xl bg-primary hover:bg-primary/90 font-semibold"
            size="lg"
            onClick={() => setShowHighlights(true)}
          >
            View Highlights
          </Button>
          <Button variant="outline" size="lg" className="rounded-2xl gap-2">
            <Share2 className="w-4 h-4" /> Share
          </Button>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="px-5 py-5 grid grid-cols-3 gap-3">
        <WellnessCard gradient="default" onClick={() => {}} className="text-center py-4">
          <Zap className="w-5 h-5 text-accent mx-auto mb-1.5 fill-accent/30" />
          <p className="font-heading font-bold text-xl">12</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Current</p>
        </WellnessCard>
        <WellnessCard gradient="default" onClick={() => {}} className="text-center py-4">
          <Trophy className="w-5 h-5 text-chart-3 mx-auto mb-1.5" />
          <p className="font-heading font-bold text-xl">21</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Best Ever</p>
        </WellnessCard>
        <WellnessCard gradient="default" onClick={() => {}} className="text-center py-4">
          <Shield className="w-5 h-5 text-chart-4 mx-auto mb-1.5" />
          <p className="font-heading font-bold text-xl">2</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Freezes</p>
        </WellnessCard>
      </div>

      {/* ── Mascot coach card ── */}
      <div className="px-5 pb-5">
        <WellnessCard gradient="mint" onClick={() => {}}>
          <div className="flex items-center gap-3 mb-3">
            <Lema state="encouraging" size="sm" message="You're on a 12-day streak — keep it up!" />
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">LEMA</span>
              </div>
              <p className="text-sm font-medium leading-snug">
                You're on a <span className="text-primary font-bold">12-day streak</span> — incredible consistency!{' '}
                <span className="text-primary">Keep it up! ✨</span>
              </p>
            </div>
          </div>
          <button className="w-full border border-primary/30 rounded-2xl py-2.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors">
            Chat with Lema
          </button>
        </WellnessCard>
      </div>

      {/* ── Monthly history ── */}
      <div className="px-5 pb-10">
        <h3 className="font-heading font-semibold text-sm mb-4">History</h3>
        <StreakHistory />
      </div>

      {/* ── Highlights modal ── */}
      <AnimatePresence>
        {showHighlights && (
          <StreakHighlights onClose={() => setShowHighlights(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function StreakHistory() {
  const weeks = [
    { label: 'This Week', days: [true, true, true, true, false, false, false] },
    { label: 'Last Week', days: [true, true, false, true, true, true, true] },
    { label: '2 Weeks Ago', days: [true, true, true, true, true, false, true] },
    { label: '3 Weeks Ago', days: [false, true, true, true, true, true, true] },
  ];
  const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="space-y-5">
      {weeks.map((week, wi) => (
        <div key={wi}>
          <p className="text-xs text-muted-foreground mb-2.5">{week.label}</p>
          <div className="flex gap-2">
            {week.days.map((done, di) => (
              <div key={di} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground font-medium">{labels[di]}</span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: wi * 0.07 + di * 0.03 }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    done ? 'bg-accent' : 'bg-muted'
                  }`}
                >
                  {done && (
                    <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M3 8l3 3 7-7" />
                    </svg>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}