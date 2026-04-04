import React from 'react';
import { motion } from 'framer-motion';

export default function StreakFlame({ count = 0 }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 180 }}
      className="relative flex items-center justify-center"
      style={{ width: 140, height: 160 }}
    >
      {/* Flame SVG */}
      <svg viewBox="0 0 140 160" className="absolute inset-0 w-full h-full" fill="none">
        {/* Outer flame */}
        <motion.path
          d="M70 8 C50 30 20 50 22 90 C24 120 40 148 70 152 C100 148 116 120 118 90 C120 50 90 30 70 8Z"
          fill="url(#flameOuter)"
          animate={{ scaleY: [1, 1.03, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {/* Inner flame */}
        <path
          d="M70 35 C58 52 42 66 44 92 C46 112 56 134 70 138 C84 134 94 112 96 92 C98 66 82 52 70 35Z"
          fill="url(#flameInner)"
        />
        {/* Highlight streak */}
        <path
          d="M62 60 C60 72 62 86 68 98"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.4"
        />
        <defs>
          <linearGradient id="flameOuter" x1="70" y1="8" x2="70" y2="152" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(35 80% 58%)" />
            <stop offset="60%" stopColor="hsl(22 90% 52%)" />
            <stop offset="100%" stopColor="hsl(10 85% 45%)" />
          </linearGradient>
          <linearGradient id="flameInner" x1="70" y1="35" x2="70" y2="138" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(42 100% 70%)" />
            <stop offset="100%" stopColor="hsl(35 90% 60%)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Number overlay */}
      <span
        className="relative z-10 font-heading font-black text-white"
        style={{
          fontSize: count >= 100 ? 36 : 48,
          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          WebkitTextStroke: '1.5px rgba(180,80,0,0.4)',
          marginTop: 24,
        }}
      >
        {count}
      </span>
    </motion.div>
  );
}