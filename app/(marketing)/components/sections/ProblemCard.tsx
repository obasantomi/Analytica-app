"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { cardReveal } from "../../lib/motion";

type ProblemCardProps = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  index: number;
};

export default function ProblemCard({
  icon: Icon,
  title,
  description,
  index,
}: ProblemCardProps) {
  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="rounded-3xl border border-landing-border/70 bg-landing-surface/90 p-landing-3 shadow-landing-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-landing-navy/20 hover:shadow-landing-elevated"
    >
      <div className="flex size-11 items-center justify-center rounded-2xl bg-landing-blue/10 text-landing-blue">
        <Icon className="size-5" aria-hidden="true" />
      </div>

      <h3 className="mt-landing-3 text-lg font-semibold text-landing-navy">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-landing-text-secondary">
        {description}
      </p>
    </motion.div>
  );
}
