import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Zap, Target, Heart, Flame } from 'lucide-react';

const badgeStyles = {
  completion: { bg: 'bg-wellness-mint', icon: Award, color: 'text-primary' },
  consistency: { bg: 'bg-wellness-sky', icon: Flame, color: 'text-chart-3' },
  milestone: { bg: 'bg-wellness-gold/30', icon: Star, color: 'text-accent' },
  streak: { bg: 'bg-wellness-peach', icon: Zap, color: 'text-chart-5' },
  goal: { bg: 'bg-wellness-lavender', icon: Target, color: 'text-chart-4' },
  wellness: { bg: 'bg-wellness-rose', icon: Heart, color: 'text-destructive' },
};

export default function AchievementBadge({ type = 'completion', title, subtitle, unlocked = true, size = 'md' }) {
  const style = badgeStyles[type] || badgeStyles.completion;
  const Icon = style.icon;
  const sizeClasses = size === 'sm' ? 'w-14 h-14' : size === 'lg' ? 'w-24 h-24' : 'w-18 h-18';
  const iconSize = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-10 h-10' : 'w-7 h-7';

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-2"
    >
      <div className={`${sizeClasses} rounded-full ${unlocked ? style.bg : 'bg-muted'} flex items-center justify-center relative ${!unlocked ? 'opacity-40' : ''}`}>
        <Icon className={`${iconSize} ${unlocked ? style.color : 'text-muted-foreground'}`} />
        {unlocked && (
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
            <svg viewBox="0 0 16 16" className="w-3 h-3 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 8l3 3 7-7" />
            </svg>
          </div>
        )}
      </div>
      {title && <span className={`text-xs font-medium text-center leading-tight ${!unlocked ? 'text-muted-foreground' : 'text-foreground'}`}>{title}</span>}
      {subtitle && <span className="text-[10px] text-muted-foreground text-center">{subtitle}</span>}
    </motion.div>
  );
}