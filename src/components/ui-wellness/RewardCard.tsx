import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Gift, Sparkles } from 'lucide-react';

export default function RewardCard({ title, description, tier = 'bronze', unlocked = false, progress = 0 }) {
  const tierStyles = {
    bronze: 'from-amber-700/20 to-amber-900/10 border-amber-700/30',
    silver: 'from-slate-300/30 to-slate-400/10 border-slate-400/40',
    gold: 'from-yellow-400/25 to-amber-500/10 border-yellow-500/40',
    platinum: 'from-cyan-200/20 to-blue-300/10 border-cyan-400/30',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-2xl border bg-gradient-to-br p-4 overflow-hidden ${tierStyles[tier] || tierStyles.bronze} ${!unlocked ? 'opacity-70' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${unlocked ? 'bg-accent/20' : 'bg-muted'}`}>
          {unlocked ? (
            <Sparkles className="w-6 h-6 text-accent" />
          ) : (
            <Lock className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-heading font-semibold text-sm truncate">{title}</h4>
          <p className="text-xs text-muted-foreground truncate">{description}</p>
          {!unlocked && (
            <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          )}
        </div>
      </div>
      {unlocked && (
        <div className="absolute top-2 right-2">
          <Gift className="w-4 h-4 text-accent" />
        </div>
      )}
    </motion.div>
  );
}