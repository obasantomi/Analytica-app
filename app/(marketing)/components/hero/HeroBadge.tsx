"use client";

import { motion } from "framer-motion";
import { BiBullseye } from "react-icons/bi";
import { HERO_COPY, HERO_ENTRANCE } from "../../lib/constants";
import { heroFadeUp } from "../../lib/motion";

export default function HeroBadge() {
  return (
    <motion.div
      variants={heroFadeUp}
      initial="hidden"
      animate="visible"
      custom={HERO_ENTRANCE.badge}
      className="inline-flex items-center gap-3 rounded-landing-badge border border-landing-border/70 bg-landing-surface/90 px-4 py-2 shadow-landing-card backdrop-blur-sm"
    >
      <span className="flex size-8 items-center justify-center rounded-full bg-landing-blue/10 text-landing-blue">
        <BiBullseye className="size-4" aria-hidden="true" />
      </span>

      <div className="flex items-center gap-2">
        <span
          className="size-2 rounded-full bg-landing-success"
          aria-hidden="true"
        />
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-landing-text-secondary">
          {HERO_COPY.badge}
        </span>
      </div>
    </motion.div>
  );
}
