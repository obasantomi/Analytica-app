"use client";

import { motion } from "framer-motion";
import {
  BiBarChartAlt2,
  BiBot,
  BiData,
  BiFolderOpen,
  BiGitBranch,
  BiMessageRoundedCheck,
} from "react-icons/bi";
import type { ComponentType } from "react";
import { FEATURES_COPY } from "../../lib/constants";
import { staggerContainer, STAGGER } from "../../lib/motion";
import FeatureCard from "./FeatureCard";
import { getFeaturePreview } from "./FeaturePreviews";

type FeatureId = (typeof FEATURES_COPY.cards)[number]["id"];

type FeatureIcon = ComponentType<{ className?: string }>;

const featureIcons: Record<FeatureId, FeatureIcon> = {
  datasets: BiData,
  mentor: BiBot,
  paths: BiGitBranch,
  feedback: BiMessageRoundedCheck,
  progress: BiBarChartAlt2,
  portfolio: BiFolderOpen,
};

export default function FeatureGrid() {
  return (
    <motion.ul
      variants={staggerContainer(STAGGER.normal, 0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="mt-landing-5 grid list-none gap-landing-3 p-0 sm:grid-cols-2 lg:grid-cols-3"
    >
      {FEATURES_COPY.cards.map((feature) => {
        const Icon = featureIcons[feature.id];

        return (
          <FeatureCard
            key={feature.id}
            icon={Icon}
            title={feature.title}
            description={feature.description}
            preview={getFeaturePreview(feature.id)}
          />
        );
      })}
    </motion.ul>
  );
}
