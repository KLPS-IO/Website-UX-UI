import React from 'react';
import { motion, Variants } from 'framer-motion';

const mascotImages = {
  idle: 'https://media.base44.com/images/public/69d124e7d115287b1baab5b8/640ee1a7e_generated_image.png',
  happy: 'https://media.base44.com/images/public/69d124e7d115287b1baab5b8/466489f78_generated_image.png',
  celebrating: 'https://media.base44.com/images/public/69d124e7d115287b1baab5b8/82f2303c6_generated_image.png',
  encouraging: 'https://media.base44.com/images/public/69d124e7d115287b1baab5b8/c61c972ec_generated_image.png',
};

const sizeMap = { sm: 80, md: 120, lg: 160, xl: 200 };

const animVariants: Variants = {
  idle: {
    y: [0, -6, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
  happy: {
    y: [0, -10, 0],
    scale: [1, 1.04, 1],
    transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
  },
  celebrating: {
    rotate: [0, -6, 6, -4, 4, 0],
    scale: [1, 1.08, 1],
    transition: { duration: 0.7, repeat: Infinity },
  },
  encouraging: {
    y: [0, -5, 0],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

export default function Lema({ state = 'idle', size = 'md', message, withRing = false, ringProgress = 0 }) {
  const px = sizeMap[size] || sizeMap.md;
  const ringSize = px * 1.6;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex items-center justify-center" style={{ width: ringSize, height: ringSize * 0.7 }}>
        {/* Arc ring behind mascot */}
        {withRing && (
          <svg
            className="absolute top-0 left-0"
            width={ringSize}
            height={ringSize * 0.75}
            viewBox={`0 0 ${ringSize} ${ringSize * 0.75}`}
          >
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(152 30% 42% / 0.2)" />
                <stop offset={`${ringProgress}%`} stopColor="hsl(152 30% 42%)" />
                <stop offset={`${ringProgress}%`} stopColor="hsl(152 30% 42% / 0.15)" />
                <stop offset="100%" stopColor="hsl(152 30% 42% / 0.15)" />
              </linearGradient>
            </defs>
            {/* Track */}
            <path
              d={`M ${ringSize * 0.1} ${ringSize * 0.72} A ${ringSize * 0.4} ${ringSize * 0.4} 0 0 1 ${ringSize * 0.9} ${ringSize * 0.72}`}
              fill="none"
              stroke="hsl(152 30% 42% / 0.15)"
              strokeWidth={ringSize * 0.04}
              strokeLinecap="round"
            />
            {/* Progress */}
            <path
              d={`M ${ringSize * 0.1} ${ringSize * 0.72} A ${ringSize * 0.4} ${ringSize * 0.4} 0 0 1 ${ringSize * 0.9} ${ringSize * 0.72}`}
              fill="none"
              stroke="hsl(152 30% 42%)"
              strokeWidth={ringSize * 0.04}
              strokeLinecap="round"
              strokeDasharray={`${Math.PI * ringSize * 0.4}`}
              strokeDashoffset={`${Math.PI * ringSize * 0.4 * (1 - ringProgress / 100)}`}
            />
            {/* Dot at progress end */}
            <circle
              cx={ringSize * 0.9}
              cy={ringSize * 0.72}
              r={ringSize * 0.04}
              fill="hsl(152 30% 42%)"
            />
          </svg>
        )}

        {/* Mascot image */}
        <motion.div
          animate={state}
          variants={animVariants}
          className="relative z-10"
          style={{ width: px, height: px }}
        >
          <img
            src={mascotImages[state] || mascotImages.idle}
            alt="Lema mascot"
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </motion.div>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl px-4 py-2.5 text-sm text-center max-w-[220px] shadow-sm"
        >
          {message}
        </motion.div>
      )}
    </div>
  );
}