"use client";

import { motion } from "framer-motion";
import type { ComponentType, ReactNode } from "react";
import { cardReveal } from "../../lib/motion";

type FeatureCardProps = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  preview: ReactNode;
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  preview,
}: FeatureCardProps) {
  return (
    <motion.li
      variants={cardReveal}
      className="group rounded-landing-card border border-landing-border/70 bg-landing-surface p-landing-3 shadow-landing-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-landing-navy/20 hover:shadow-landing-elevated focus-within:border-landing-navy/20 focus-within:shadow-landing-elevated sm:p-landing-4"
    >
      <span className="flex size-11 items-center justify-center rounded-2xl bg-landing-blue/10 text-landing-blue">
        <Icon className="size-5" aria-hidden="true" />
      </span>

      <h3 className="mt-landing-3 text-lg font-semibold text-landing-navy">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-landing-text-secondary">
        {description}
      </p>

      <div
        aria-hidden="true"
        className="mt-landing-4 min-h-24 rounded-3xl border border-landing-border/70 bg-landing-surface-muted p-landing-3 shadow-landing-card"
      >
        {preview}
      </div>
    </motion.li>
  );
}
