import React from 'react';
import { motion } from 'framer-motion';

export default function WellnessCard({ children, className = '', gradient, onClick }) {
  const gradientClasses = {
    mint: 'bg-gradient-to-br from-wellness-mint to-card',
    peach: 'bg-gradient-to-br from-wellness-peach to-card',
    lavender: 'bg-gradient-to-br from-wellness-lavender to-card',
    sky: 'bg-gradient-to-br from-wellness-sky to-card',
    gold: 'bg-gradient-to-br from-wellness-gold/20 to-card',
  };

  return (
    <motion.div
      whileHover={onClick ? { scale: 1.01 } : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      onClick={onClick}
      className={`rounded-2xl border border-border/50 p-5 shadow-sm ${gradient ? gradientClasses[gradient] : 'bg-card'} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}