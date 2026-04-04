import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

export default function StreakDisplay({ count = 0, size = 'md' }) {
  const sizeClasses = {
    sm: { container: 'gap-1', icon: 'w-5 h-5', text: 'text-lg' },
    md: { container: 'gap-2', icon: 'w-8 h-8', text: 'text-3xl' },
    lg: { container: 'gap-3', icon: 'w-12 h-12', text: 'text-5xl' },
  };
  const s = sizeClasses[size] || sizeClasses.md;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`flex items-center ${s.container}`}
    >
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Flame className={`${s.icon} text-accent fill-accent/30`} />
      </motion.div>
      <span className={`${s.text} font-heading font-bold text-foreground`}>{count}</span>
    </motion.div>
  );
}