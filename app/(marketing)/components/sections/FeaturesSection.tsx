"use client";

import { motion } from "framer-motion";
import { FEATURES_COPY, LANDING_SECTION_IDS } from "../../lib/constants";
import { sectionReveal } from "../../lib/motion";
import Section from "../ui/Section";
import FeatureGrid from "./FeatureGrid";

export default function FeaturesSection() {
  return (
    <Section
      id={LANDING_SECTION_IDS.features}
      aria-label="Analytica features"
      className="overflow-hidden"
    >
      <motion.div
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-landing-content"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-landing-blue">
          {FEATURES_COPY.eyebrow}
        </p>
        <h2 className="mt-landing-2 landing-heading max-w-3xl text-balance">
          {FEATURES_COPY.heading}
        </h2>
        <p className="mt-landing-3 landing-body max-w-landing-text text-pretty">
          {FEATURES_COPY.description}
        </p>
      </motion.div>

      <FeatureGrid />
    </Section>
  );
}
