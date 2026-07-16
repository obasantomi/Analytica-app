"use client";

import { motion } from "framer-motion";
import { HERO_COPY, HERO_ENTRANCE } from "../../lib/constants";
import { heroFadeUp } from "../../lib/motion";
import JoinBetaButton from "../navigation/JoinBetaButton";
import SecondaryButton from "../ui/SecondaryButton";

export default function HeroCTAs() {
  return (
    <div className="flex w-full flex-col gap-landing-3 sm:w-auto sm:flex-row sm:items-center sm:justify-start">
      <motion.div
        variants={heroFadeUp}
        initial="hidden"
        animate="visible"
        custom={HERO_ENTRANCE.primaryCta}
      >
        <JoinBetaButton className="w-full sm:w-auto" />
      </motion.div>

      <motion.div
        variants={heroFadeUp}
        initial="hidden"
        animate="visible"
        custom={HERO_ENTRANCE.secondaryCta}
      >
        <SecondaryButton
          label={HERO_COPY.secondaryCta.label}
          sectionId={HERO_COPY.secondaryCta.sectionId}
          className="w-full sm:w-auto"
        />
      </motion.div>
    </div>
  );
}
