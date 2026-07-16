"use client";

import { motion } from "framer-motion";
import { HERO_COPY, HERO_ENTRANCE } from "../../lib/constants";
import { heroLineReveal, staggerContainer } from "../../lib/motion";

const lines = [
  { text: HERO_COPY.headline.line1, className: "text-landing-text-primary" },
  {
    text: HERO_COPY.headline.line2,
    className: "landing-hero-line-muted",
  },
  { text: HERO_COPY.headline.line3, className: "text-landing-text-primary" },
] as const;

export default function HeroHeadline() {
  return (
    <motion.h1
      variants={staggerContainer(HERO_ENTRANCE.headingStagger, HERO_ENTRANCE.headingBase)}
      initial="hidden"
      animate="visible"
      className="landing-display"
    >
      {lines.map((line) => (
        <motion.span
          key={line.text}
          variants={heroLineReveal}
          className={`block ${line.className}`}
        >
          {line.text}
        </motion.span>
      ))}
    </motion.h1>
  );
}
