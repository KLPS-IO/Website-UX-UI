import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AvatarFrame from '@/components/ui-wellness/AvatarFrame';
import WellnessCard from '@/components/ui-wellness/WellnessCard';
import { Button } from '@/components/ui/button';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const avatars = [
  { id: 1, emoji: '🧘', name: 'Zen', unlocked: true },
  { id: 2, emoji: '🌿', name: 'Nature', unlocked: true },
  { id: 3, emoji: '🌸', name: 'Blossom', unlocked: true },
  { id: 4, emoji: '⭐', name: 'Star', unlocked: true },
  { id: 5, emoji: '🔥', name: 'Flame', unlocked: false },
  { id: 6, emoji: '🌊', name: 'Ocean', unlocked: false },
  { id: 7, emoji: '🦋', name: 'Butterfly', unlocked: false },
  { id: 8, emoji: '🌙', name: 'Moon', unlocked: false },
  { id: 9, emoji: '💎', name: 'Diamond', unlocked: false },
  { id: 10, emoji: '🦊', name: 'Fox', unlocked: false },
  { id: 11, emoji: '🐉', name: 'Dragon', unlocked: false },
  { id: 12, emoji: '🌈', name: 'Rainbow', unlocked: false },
];

export default function Avatar() {
  const [selected, setSelected] = useState(1);
  const selectedAvatar = avatars.find(a => a.id === selected);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="px-5 pt-6 max-w-2xl mx-auto">
      <motion.div variants={item} className="mb-6">
        <h1 className="font-heading text-2xl font-bold">Avatar</h1>
        <p className="text-sm text-muted-foreground">Choose your wellness identity</p>
      </motion.div>

      {/* Preview */}
      <motion.div variants={item}>
        <WellnessCard gradient="mint" className="mb-6" onClick={() => {}}>
          <div className="flex flex-col items-center py-6">
            <motion.div
              key={selected}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-28 h-28 bg-card rounded-3xl border-2 border-primary/30 flex items-center justify-center shadow-lg mb-4"
            >
              <span className="text-6xl">{selectedAvatar?.emoji}</span>
            </motion.div>
            <h3 className="font-heading font-bold text-lg">{selectedAvatar?.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">Currently selected</p>
          </div>
        </WellnessCard>
      </motion.div>

      {/* Unlocked */}
      <motion.div variants={item} className="mb-6">
        <h3 className="font-heading font-semibold text-sm mb-3">Unlocked ({avatars.filter(a => a.unlocked).length})</h3>
        <div className="grid grid-cols-4 gap-3">
          {avatars.filter(a => a.unlocked).map(avatar => (
            <AvatarFrame
              key={avatar.id}
              avatar={avatar}
              selected={selected === avatar.id}
              unlocked
              onSelect={() => setSelected(avatar.id)}
            />
          ))}
        </div>
      </motion.div>

      {/* Locked */}
      <motion.div variants={item} className="mb-8">
        <h3 className="font-heading font-semibold text-sm mb-3">Locked ({avatars.filter(a => !a.unlocked).length})</h3>
        <div className="grid grid-cols-4 gap-3">
          {avatars.filter(a => !a.unlocked).map(avatar => (
            <AvatarFrame
              key={avatar.id}
              avatar={avatar}
              selected={false}
              unlocked={false}
              onSelect={() => {}}
            />
          ))}
        </div>
      </motion.div>

      {/* Save */}
      <motion.div variants={item} className="mb-8">
        <Button className="w-full rounded-xl bg-primary hover:bg-primary/90" size="lg">
          Save Avatar
        </Button>
      </motion.div>
    </motion.div>
  );
}