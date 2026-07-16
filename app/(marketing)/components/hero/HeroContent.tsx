"use client";

import { motion } from "framer-motion";
import { HERO_COPY, HERO_ENTRANCE } from "../../lib/constants";
import { heroFadeUp } from "../../lib/motion";
import HeroBadge from "./HeroBadge";
import HeroCTAs from "./HeroCTAs";
import HeroHeadline from "./HeroHeadline";

export default function HeroContent() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-landing-5 text-center sm:mx-0 sm:max-w-none sm:items-start sm:text-left lg:gap-landing-6">
      <HeroBadge />

      <HeroHeadline />

      <motion.p
        variants={heroFadeUp}
        initial="hidden"
        animate="visible"
        custom={HERO_ENTRANCE.supporting}
        className="landing-body max-w-landing-text text-pretty"
      >
        {HERO_COPY.supporting}
      </motion.p>

      <HeroCTAs />
    </div>
  );
}
