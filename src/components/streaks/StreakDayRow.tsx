import React from 'react';
import { motion } from 'framer-motion';

const days = ['M', 'T', 'W', 'T', 'F'];
// M=done, T=done, W=done, T=today(frozen/current), F=upcoming
const states = ['done', 'done', 'done', 'today', 'upcoming'];

export default function StreakDayRow() {
  return (
    <div className="flex items-center justify-center gap-3">
      {days.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground">{d}</span>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
          >
            {states[i] === 'done' && (
              <div className="w-11 h-11 rounded-2xl bg-accent flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M4 10l4 4 8-8" />
                </svg>
              </div>
            )}
            {states[i] === 'today' && (
              <div className="w-11 h-11 rounded-2xl bg-wellness-sky border-2 border-chart-3 flex items-center justify-center">
                <div className="w-4 h-4 rounded-md bg-chart-3/30 border border-chart-3/50" />
              </div>
            )}
            {states[i] === 'upcoming' && (
              <div className="w-11 h-11 rounded-2xl bg-muted flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-border" />
              </div>
            )}
          </motion.div>
        </div>
      ))}
    </div>
  );
}