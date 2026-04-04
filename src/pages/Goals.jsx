import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Target, Footprints, Heart, Droplets, Moon, Apple } from 'lucide-react';
import GoalCard from '@/components/ui-wellness/GoalCard';
import WellnessCard from '@/components/ui-wellness/WellnessCard';
import ProgressRing from '@/components/ui-wellness/ProgressRing';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const goalTemplates = [
  { type: 'activity', title: 'Daily Steps', icon: Footprints, color: 'peach' },
  { type: 'water', title: 'Water Intake', icon: Droplets, color: 'sky' },
  { type: 'sleep', title: 'Sleep Quality', icon: Moon, color: 'lavender' },
  { type: 'nutrition', title: 'Nutrition', icon: Apple, color: 'mint' },
  { type: 'health', title: 'Heart Health', icon: Heart, color: 'peach' },
  { type: 'weight', title: 'Weight Goal', icon: Target, color: 'lavender' },
];

const activeGoals = [
  { title: 'Daily Steps', type: 'activity', current: 6240, target: 10000, unit: 'steps', progress: 62 },
  { title: 'Water Intake', type: 'water', current: 5, target: 8, unit: 'glasses', progress: 62 },
  { title: 'Sleep Goal', type: 'sleep', current: 7, target: 8, unit: 'hours', progress: 87 },
  { title: 'Healthy Meals', type: 'nutrition', current: 2, target: 3, unit: 'meals', progress: 66 },
];

export default function Goals() {
  const [showTemplates, setShowTemplates] = useState(false);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="px-5 pt-6 max-w-2xl mx-auto">
      <motion.div variants={item} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold">Goals</h1>
          <p className="text-sm text-muted-foreground">Track your daily targets</p>
        </div>
        <Button onClick={() => setShowTemplates(!showTemplates)} className="rounded-xl gap-2 bg-primary hover:bg-primary/90" size="sm">
          <Plus className="w-4 h-4" /> Add Goal
        </Button>
      </motion.div>

      {/* Overall progress */}
      <motion.div variants={item}>
        <WellnessCard gradient="mint" className="mb-6">
          <div className="flex items-center gap-5">
            <ProgressRing progress={69} size={72} strokeWidth={6} />
            <div>
              <h3 className="font-heading font-semibold">Overall Progress</h3>
              <p className="text-sm text-muted-foreground">4 active goals</p>
            </div>
          </div>
        </WellnessCard>
      </motion.div>

      {/* Goal templates */}
      {showTemplates && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6">
          <h3 className="font-heading font-semibold text-sm mb-3">Choose a Goal</h3>
          <div className="grid grid-cols-3 gap-3">
            {goalTemplates.map((g) => (
              <WellnessCard key={g.type} gradient={g.color} onClick={() => setShowTemplates(false)} className="flex flex-col items-center gap-2 py-4 px-2">
                <g.icon className="w-6 h-6 text-foreground/70" />
                <span className="text-xs font-medium text-center">{g.title}</span>
              </WellnessCard>
            ))}
          </div>
        </motion.div>
      )}

      {/* Active goals */}
      <motion.div variants={item}>
        <h3 className="font-heading font-semibold text-sm mb-3">Active Goals</h3>
        <div className="space-y-3 mb-6">
          {activeGoals.map((goal) => (
            <GoalCard key={goal.title} {...goal} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}