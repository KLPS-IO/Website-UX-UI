import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Star } from 'lucide-react';
import WellnessCard from '@/components/ui-wellness/WellnessCard';
import RewardCard from '@/components/ui-wellness/RewardCard';
import { Progress } from '@/components/ui/progress';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const rewards = [
  { title: 'Calm Avatar', description: 'Unlock the Zen avatar skin', tier: 'bronze', unlocked: true, progress: 100 },
  { title: 'Nature Theme', description: 'Unlock forest theme', tier: 'bronze', unlocked: true, progress: 100 },
  { title: 'Golden Badge', description: 'Reach 30-day streak', tier: 'silver', unlocked: false, progress: 40 },
  { title: 'Lema Outfit', description: 'Dress up your mascot', tier: 'silver', unlocked: false, progress: 65 },
  { title: 'Premium Insights', description: 'Unlock deep analytics', tier: 'gold', unlocked: false, progress: 20 },
  { title: 'Diamond Crown', description: 'Complete all milestones', tier: 'platinum', unlocked: false, progress: 5 },
];

export default function Rewards() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="px-5 pt-6 max-w-2xl mx-auto">
      <motion.div variants={item} className="mb-6">
        <h1 className="font-heading text-2xl font-bold">Rewards</h1>
        <p className="text-sm text-muted-foreground">Earn rewards for your consistency</p>
      </motion.div>

      {/* Coin balance */}
      <motion.div variants={item}>
        <WellnessCard gradient="gold" className="mb-6" onClick={() => {}}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center">
              <Coins className="w-7 h-7 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Your Balance</p>
              <p className="font-heading text-3xl font-bold">340 <span className="text-base font-normal text-muted-foreground">coins</span></p>
            </div>
          </div>
        </WellnessCard>
      </motion.div>

      {/* Next tier progress */}
      <motion.div variants={item}>
        <WellnessCard gradient="silver" className="mb-6" onClick={() => {}}>
          <div className="flex items-center gap-3 mb-3">
            <Star className="w-5 h-5 text-accent" />
            <div>
              <h4 className="font-heading font-semibold text-sm">Silver Tier</h4>
              <p className="text-xs text-muted-foreground">160 more coins to unlock</p>
            </div>
          </div>
          <Progress value={68} className="h-2.5" />
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-muted-foreground">340 / 500</span>
            <span className="text-[10px] text-muted-foreground font-medium">68%</span>
          </div>
        </WellnessCard>
      </motion.div>

      {/* Reward cards */}
      <motion.div variants={item} className="mb-8">
        <h3 className="font-heading font-semibold text-sm mb-3">Available Rewards</h3>
        <div className="space-y-3">
          {rewards.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <RewardCard {...r} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}