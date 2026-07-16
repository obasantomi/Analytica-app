"use client";

import { motion } from "framer-motion";
import { useCursorFollower } from "../../hooks/useCursorFollower";

type CursorFollowerProps = {
  className?: string;
};

const SIZE_BY_MODE = {
  default: 10,
  button: 12,
  card: 11,
  cta: 13,
} as const;

const OPACITY_BY_MODE = {
  default: 0.7,
  button: 0.85,
  card: 0.55,
  cta: 0.8,
} as const;

const SCALE_BY_MODE = {
  default: 1,
  button: 1.5,
  card: 1.25,
  cta: 1.5,
} as const;

const SHADOW_BY_MODE = {
  default: "0 0 8px rgba(34, 197, 94, 0.18)",
  button: "0 0 12px rgba(34, 197, 94, 0.24)",
  card: "0 0 10px rgba(34, 197, 94, 0.2)",
  cta: "0 0 12px rgba(34, 197, 94, 0.24)",
} as const;

export default function CursorFollower({
  className = "",
}: CursorFollowerProps) {
  const { x, y, isEnabled, mode, prefersReducedMotion } = useCursorFollower();

  if (!isEnabled) {
    return null;
  }

  const size = SIZE_BY_MODE[mode];
  const opacity = OPACITY_BY_MODE[mode];
  const scale = SCALE_BY_MODE[mode];

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none fixed z-[9999] rounded-full border border-landing-success/30 bg-landing-success/20 ${className}`}
      style={{
        width: size,
        height: size,
        x,
        y,
        opacity,
        translateX: "-50%",
        translateY: "-50%",
        boxShadow: SHADOW_BY_MODE[mode],
        willChange: "transform, opacity",
      }}
      animate={
        prefersReducedMotion ? { scale: 1, opacity } : { scale, opacity }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0.01 }
          : { type: "spring", stiffness: 260, damping: 24, mass: 0.6 }
      }
      initial={false}
    />
  );
}
