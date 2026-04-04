import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Bell, Shield, LogOut, ChevronRight, Moon, HelpCircle } from 'lucide-react';
import WellnessCard from '@/components/ui-wellness/WellnessCard';
import AchievementBadge from '@/components/ui-wellness/AchievementBadge';
import StreakDisplay from '@/components/ui-wellness/StreakDisplay';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const menuItems = [
  { icon: Bell, label: 'Notifications', desc: 'Manage reminders' },
  { icon: Moon, label: 'Dark Mode', desc: 'Toggle theme', toggle: true },
  { icon: Shield, label: 'Privacy', desc: 'Data & security' },
  { icon: HelpCircle, label: 'Help & Support', desc: 'FAQs and contact' },
  { icon: Settings, label: 'Settings', desc: 'App preferences' },
];

export default function Profile() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="px-5 pt-6 max-w-2xl mx-auto">
      {/* Profile Header */}
      <motion.div variants={item}>
        <WellnessCard gradient="mint" className="mb-6" onClick={() => {}}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold">Wellness User</h2>
              <p className="text-sm text-muted-foreground">Member since January 2025</p>
            </div>
          </div>
        </WellnessCard>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-3 gap-3 mb-6">
        <WellnessCard gradient={undefined} onClick={() => {}} className="text-center py-3">
          <StreakDisplay count={12} size="sm" />
          <p className="text-[10px] text-muted-foreground mt-1">Streak</p>
        </WellnessCard>
        <WellnessCard gradient={undefined} onClick={() => {}} className="text-center py-3">
          <p className="font-heading font-bold text-lg">47</p>
          <p className="text-[10px] text-muted-foreground mt-1">Check-ins</p>
        </WellnessCard>
        <WellnessCard gradient={undefined} onClick={() => {}} className="text-center py-3">
          <p className="font-heading font-bold text-lg">340</p>
          <p className="text-[10px] text-muted-foreground mt-1">Coins</p>
        </WellnessCard>
      </motion.div>

      {/* Badges */}
      <motion.div variants={item} className="mb-6">
        <h3 className="font-heading font-semibold text-sm mb-3">Your Badges</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          <AchievementBadge type="completion" title="Starter" unlocked size="sm" subtitle={undefined} />
          <AchievementBadge type="consistency" title="Week Warrior" unlocked size="sm" subtitle={undefined} />
          <AchievementBadge type="streak" title="Fire Keeper" unlocked size="sm" subtitle={undefined} />
          <AchievementBadge type="milestone" title="50 Check-ins" unlocked={false} size="sm" subtitle={undefined} />
          <AchievementBadge type="wellness" title="Zen Master" unlocked={false} size="sm" subtitle={undefined} />
        </div>
      </motion.div>

      {/* Menu */}
      <motion.div variants={item} className="mb-8">
        <WellnessCard gradient={undefined} onClick={() => {}} className="divide-y divide-border/50">
          {menuItems.map((mi, i) => (
            <div key={i} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
              <div className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center">
                <mi.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{mi.label}</p>
                <p className="text-xs text-muted-foreground">{mi.desc}</p>
              </div>
              {mi.toggle ? (
                <Switch />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </WellnessCard>
      </motion.div>

      {/* Logout */}
      <motion.div variants={item} className="mb-8">
        <button className="w-full flex items-center justify-center gap-2 py-3 text-sm text-destructive font-medium rounded-xl border border-destructive/20 hover:bg-destructive/5 transition-colors">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </motion.div>
    </motion.div>
  );
}