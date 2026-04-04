import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ClipboardCheck, Target, Droplets, Moon, Footprints, ChevronRight } from 'lucide-react';
import Lema from '@/components/mascot/Lema';
import ProgressRing from '@/components/ui-wellness/ProgressRing';
import WellnessCard from '@/components/ui-wellness/WellnessCard';
import StreakDisplay from '@/components/ui-wellness/StreakDisplay';
import QuickAction from '@/components/ui-wellness/QuickAction';
import GoalCard from '@/components/ui-wellness/GoalCard';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Dashboard() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="px-5 pt-6 max-w-2xl mx-auto">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Good morning</p>
          <h1 className="font-heading text-2xl font-bold">Welcome back 👋</h1>
        </div>
        <Link to="/profile">
          <div className="w-10 h-10 bg-wellness-mint rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">U</span>
          </div>
        </Link>
      </motion.div>

      {/* Mascot hero card */}
      <motion.div variants={item}>
        <WellnessCard gradient="mint" className="mb-5" onClick={() => {}}>
          <div className="flex flex-col items-center py-2">
            <Lema state="happy" size="md" message="" withRing ringProgress={60} />
            <p className="text-sm font-medium mt-3">Today's Progress — 60%</p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">3 of 5 daily goals completed</p>
            <Link
              to="/check-in"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary bg-primary/10 px-5 py-2 rounded-2xl hover:bg-primary/15 transition-colors"
            >
              Start Check-In <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </WellnessCard>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={item} className="grid grid-cols-2 gap-3 mb-5">
        <WellnessCard gradient="mint" onClick={() => {}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Streak</p>
              <StreakDisplay count={12} size="sm" />
            </div>
          </div>
        </WellnessCard>
        <WellnessCard gradient="peach" onClick={() => {}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Coins</p>
              <p className="text-2xl font-heading font-bold flex items-center gap-1">
                <span className="text-accent">●</span> 340
              </p>
            </div>
          </div>
        </WellnessCard>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item} className="mb-6">
        <h3 className="font-heading font-semibold text-sm mb-3">Quick Actions</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          <Link to="/check-in"><QuickAction icon={ClipboardCheck} label="Check-In" gradient="mint" onClick={() => {}} /></Link>
          <Link to="/goals"><QuickAction icon={Target} label="Goals" gradient="peach" onClick={() => {}} /></Link>
          <QuickAction icon={Droplets} label="Water" gradient="sky" onClick={() => {}} />
          <QuickAction icon={Moon} label="Sleep" gradient="lavender" onClick={() => {}} />
          <QuickAction icon={Footprints} label="Steps" gradient="mint" onClick={() => {}} />
        </div>
      </motion.div>

      {/* Active Goals */}
      <motion.div variants={item} className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-semibold text-sm">Active Goals</h3>
          <Link to="/goals" className="text-xs text-primary font-medium">See all</Link>
        </div>
        <div className="space-y-3">
          <GoalCard title="Daily Steps" type="activity" current={6240} target={10000} unit="steps" progress={62} />
          <GoalCard title="Water Intake" type="water" current={5} target={8} unit="glasses" progress={62} />
          <GoalCard title="Sleep Goal" type="sleep" current={7} target={8} unit="hours" progress={87} />
        </div>
      </motion.div>
    </motion.div>
  );
}