import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Zap, X } from 'lucide-react';

const highlights = [
  {
    icon: Zap,
    iconBg: 'bg-accent',
    iconColor: 'text-white',
    title: "You're on a 12-day streak.",
    subtitle: 'Keep it up!',
    progress: null,
  },
  {
    icon: Trophy,
    iconBg: 'bg-muted',
    iconColor: 'text-muted-foreground',
    title: 'You completed 5 goals this week.',
    subtitle: 'Amazing work!',
    progress: null,
  },
  {
    icon: Zap,
    iconBg: 'bg-primary',
    iconColor: 'text-white',
    title: 'You\'re 8 days away from your best streak.',
    subtitle: 'PERSONAL BEST INCOMING',
    progress: 57,
  },
];

export default function StreakHighlights({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg mx-auto bg-card rounded-t-3xl p-6 pb-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-xl font-bold">Streak Highlights</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Highlight items */}
        <div className="space-y-6 mb-10">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className={`w-11 h-11 rounded-full ${h.iconBg} flex items-center justify-center flex-shrink-0`}>
                <h.icon className={`w-5 h-5 ${h.iconColor}`} />
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-sm font-medium">{h.title}</p>
                {h.progress !== null ? (
                  <div className="mt-2">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">{h.subtitle}</p>
                    <Progress value={h.progress} className="h-2" />
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground mt-0.5">{h.subtitle}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <Button
          onClick={onClose}
          className="w-full rounded-2xl bg-primary hover:bg-primary/90 font-semibold"
          size="lg"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );
}