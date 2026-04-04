import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function AvatarFrame({ avatar, selected = false, unlocked = true, onSelect }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={unlocked ? onSelect : undefined}
      className={`relative rounded-2xl overflow-hidden border-2 transition-colors ${
        selected ? 'border-primary shadow-lg' : 'border-border/50'
      } ${!unlocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="w-24 h-24 flex items-center justify-center bg-muted">
        <span className="text-4xl">{avatar.emoji}</span>
      </div>
      {!unlocked && (
        <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
          <Lock className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
      <div className="px-2 py-1.5 text-center">
        <span className="text-[10px] font-medium">{avatar.name}</span>
      </div>
    </motion.button>
  );
}