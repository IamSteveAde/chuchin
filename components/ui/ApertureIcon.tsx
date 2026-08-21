"use client";

import { motion, useReducedMotion } from "framer-motion";

type ApertureIconProps = {
  size?: number;
  blades?: number;
  className?: string;
  spin?: boolean;
  open?: boolean;
};

/**
 * The brand's signature mark: a camera aperture built from triangular
 * blades, filled with the orange-to-gold brand gradient. Used as a
 * hover accent, section divider, and loading state throughout the site.
 */
export default function ApertureIcon({
  size = 48,
  blades = 6,
  className = "",
  spin = false,
  open = true
}: ApertureIconProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldSpin = spin && !prefersReducedMotion;

  const bladeAngle = 360 / blades;
  const edgeX = 50 + 48 * Math.sin((Math.PI / 180) * bladeAngle);
  const edgeY = 50 - 48 * Math.cos((Math.PI / 180) * bladeAngle);
  const tipY = open ? 2 : 24;

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Chuchin Ultimate Productions aperture mark"
      animate={shouldSpin ? { rotate: 360 } : undefined}
      transition={shouldSpin ? { duration: 14, repeat: Infinity, ease: "linear" } : undefined}
    >
      <defs>
        <linearGradient id="apertureGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4661E" />
          <stop offset="100%" stopColor="#F5A623" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="49" fill="none" stroke="url(#apertureGradient)" strokeWidth="1" opacity="0.25" />
      {Array.from({ length: blades }).map((_, i) => (
        <motion.path
          key={i}
          d={`M50,50 L50,${tipY} A48,48 0 0,1 ${edgeX},${edgeY} Z`}
          fill="url(#apertureGradient)"
          stroke="#FAF7F2"
          strokeWidth="1.5"
          transform={`rotate(${bladeAngle * i} 50 50)`}
          initial={false}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      <circle
        cx="50"
        cy="50"
        r={open ? 13 : 5}
        fill="#FAF7F2"
        style={{ transition: "r 0.6s cubic-bezier(0.16,1,0.3,1)" }}
      />
    </motion.svg>
  );
}
