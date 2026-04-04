import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Target, Footprints, Heart, Droplets, Moon, Apple } from 'lucide-react';

const goalIcons = {
  weight: Target,
  activity: Footprints,
  health: Heart,
  water: Droplets,
  sleep: Moon,
  nutrition: Apple,
};

const goalColors = {
  weight: 'text-chart-4',
  activity: 'text-chart-1',
  health: 'text-destructive',
  water: 'text-chart-3',
  sleep: 'text-chart-4',
  nutrition: 'text-chart-2',
};

export default function GoalCard({ title, type = 'health', current, target, unit, progress = 0 }) {
  const Icon = goalIcons[type] || Target;
  const color = goalColors[type] || 'text-primary';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm">{title}</h4>
            <p className="text-xs text-muted-foreground">
              {current} / {target} {unit}
            </p>
          </div>
        </div>
        <span className="text-sm font-semibold text-primary">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </motion.div>
  );
}