import React from 'react';
import { motion } from 'framer-motion';

export default function QuickAction({ icon: Icon, label, gradient = 'mint', onClick }) {
  const gradients = {
    mint: 'from-wellness-mint to-wellness-mint/50',
    peach: 'from-wellness-peach to-wellness-peach/50',
    lavender: 'from-wellness-lavender to-wellness-lavender/50',
    sky: 'from-wellness-sky to-wellness-sky/50',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br ${gradients[gradient]} border border-border/30 min-w-[80px]`}
    >
      <Icon className="w-6 h-6 text-foreground/80" />
      <span className="text-xs font-medium text-foreground/80">{label}</span>
    </motion.button>
  );
}