import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Home } from 'lucide-react';
import Lema from '@/components/mascot/Lema';
import WellnessCard from '@/components/ui-wellness/WellnessCard';
import AchievementBadge from '@/components/ui-wellness/AchievementBadge';

export default function CheckInComplete({ answers, questions }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-5 pt-8 max-w-lg mx-auto text-center"
    >
      {/* Celebration */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="mb-6"
      >
        <Lema state="celebrating" size="lg" message={undefined} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h1 className="font-heading text-2xl font-bold mb-2">Check-In Complete!</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Great job taking time for yourself today. Keep up the amazing work!
        </p>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <WellnessCard gradient="mint" onClick={() => {}} className="text-left mb-6">
          <h3 className="font-heading font-semibold text-sm mb-3">Today's Summary</h3>
          <div className="space-y-2.5">
            {questions.filter(q => q.type === 'selection' && answers[q.id]).map(q => (
              <div key={q.id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{q.text.replace('?', '')}</span>
                <span className="font-medium">{answers[q.id]}</span>
              </div>
            ))}
          </div>
        </WellnessCard>
      </motion.div>

      {/* Achievement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-8"
      >
        <WellnessCard gradient="mint" onClick={() => {}} className="flex items-center gap-4">
          <AchievementBadge type="completion" size="sm" title={undefined} subtitle={undefined} />
          <div className="text-left">
            <p className="font-heading font-semibold text-sm">Daily Check-In Complete</p>
            <p className="text-xs text-muted-foreground">+10 coins earned</p>
          </div>
        </WellnessCard>
      </motion.div>

      {/* CTA */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <Link to="/">
          <Button className="rounded-xl gap-2 bg-primary hover:bg-primary/90 w-full" size="lg">
            <Home className="w-4 h-4" /> Back to Dashboard
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}