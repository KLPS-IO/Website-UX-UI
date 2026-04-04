import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import WellnessCard from '@/components/ui-wellness/WellnessCard';
import ProgressRing from '@/components/ui-wellness/ProgressRing';
import AchievementBadge from '@/components/ui-wellness/AchievementBadge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const weeklyData = [
  { day: 'Mon', checkins: 1, mood: 4, steps: 8200 },
  { day: 'Tue', checkins: 1, mood: 3, steps: 6400 },
  { day: 'Wed', checkins: 1, mood: 5, steps: 10200 },
  { day: 'Thu', checkins: 1, mood: 4, steps: 7800 },
  { day: 'Fri', checkins: 1, mood: 4, steps: 9100 },
  { day: 'Sat', checkins: 0, mood: 3, steps: 5300 },
  { day: 'Sun', checkins: 1, mood: 5, steps: 11000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl px-3 py-2 shadow-lg text-xs">
        <p className="font-semibold">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-muted-foreground">{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Progress() {
  const [period, setPeriod] = useState('week');

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="px-5 pt-6 max-w-2xl mx-auto">
      <motion.div variants={item} className="mb-6">
        <h1 className="font-heading text-2xl font-bold">Progress</h1>
        <p className="text-sm text-muted-foreground">Your wellness journey overview</p>
      </motion.div>

      {/* Period toggle */}
      <motion.div variants={item} className="mb-6">
        <Tabs defaultValue="week" onValueChange={setPeriod}>
          <TabsList className="bg-muted rounded-xl p-1">
            <TabsTrigger value="week" className="rounded-lg text-xs">Week</TabsTrigger>
            <TabsTrigger value="month" className="rounded-lg text-xs">Month</TabsTrigger>
            <TabsTrigger value="year" className="rounded-lg text-xs">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Summary rings */}
      <motion.div variants={item}>
        <WellnessCard className="mb-5" gradient={undefined} onClick={undefined}>
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center gap-1.5">
              <ProgressRing progress={85} size={60} strokeWidth={5} color="hsl(152 30% 42%)" children={undefined} />
              <span className="text-xs text-muted-foreground">Check-ins</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <ProgressRing progress={72} size={60} strokeWidth={5} color="hsl(35 80% 58%)" children={undefined} />
              <span className="text-xs text-muted-foreground">Goals</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <ProgressRing progress={60} size={60} strokeWidth={5} color="hsl(200 60% 55%)" children={undefined} />
              <span className="text-xs text-muted-foreground">Activity</span>
            </div>
          </div>
        </WellnessCard>
      </motion.div>

      {/* Mood chart */}
      <motion.div variants={item}>
        <WellnessCard className="mb-5" gradient={undefined} onClick={undefined}>
          <h3 className="font-heading font-semibold text-sm mb-4">Mood Trend</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[1, 5]} hide />
                <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
                <Line type="monotone" dataKey="mood" stroke="hsl(152 30% 42%)" strokeWidth={2.5} dot={{ fill: 'hsl(152 30% 42%)', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </WellnessCard>
      </motion.div>

      {/* Steps chart */}
      <motion.div variants={item}>
        <WellnessCard className="mb-5" gradient={undefined} onClick={undefined}>
          <h3 className="font-heading font-semibold text-sm mb-4">Daily Steps</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
                <Bar dataKey="steps" fill="hsl(152 30% 42% / 0.6)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </WellnessCard>
      </motion.div>

      {/* Recent achievements */}
      <motion.div variants={item} className="mb-8">
        <h3 className="font-heading font-semibold text-sm mb-3">Recent Achievements</h3>
        <div className="flex gap-5 overflow-x-auto pb-2">
          <AchievementBadge type="completion" title="7-Day Streak" unlocked subtitle={undefined} />
          <AchievementBadge type="consistency" title="Week Warrior" unlocked subtitle={undefined} />
          <AchievementBadge type="milestone" title="100 Check-ins" unlocked={false} subtitle={undefined} />
          <AchievementBadge type="goal" title="Goal Crusher" unlocked={false} subtitle={undefined} />
        </div>
      </motion.div>
    </motion.div>
  );
}