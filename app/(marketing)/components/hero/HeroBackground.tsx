"use client";

import { motion } from "framer-motion";
import { HERO_ENTRANCE } from "../../lib/constants";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const AMBIENT_ORBS = [
  {
    className: "left-[8%] top-[12%] size-72 bg-landing-blue/[0.07]",
    duration: 18,
    delay: 0,
  },
  {
    className: "right-[6%] top-[20%] size-96 bg-landing-navy/[0.05]",
    duration: 22,
    delay: 2,
  },
  {
    className: "bottom-[10%] left-[35%] size-80 bg-landing-success/[0.06]",
    duration: 20,
    delay: 4,
  },
] as const;

export default function HeroBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.06)_0%,transparent_55%)]" />

      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(11,31,58,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,31,58,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />

      {AMBIENT_ORBS.map((orb) => (
        <motion.div
          key={orb.className}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          initial={{ opacity: 0 }}
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : {
                  opacity: [0.4, 0.7, 0.4],
                  y: [0, -16, 0],
                  x: [0, 8, 0],
                }
          }
          transition={{
            delay: prefersReducedMotion ? 0 : HERO_ENTRANCE.background,
            duration: prefersReducedMotion ? 0.01 : orb.duration,
            repeat: prefersReducedMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
