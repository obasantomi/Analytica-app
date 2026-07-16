"use client";

import { motion } from "framer-motion";
import { BiBot, BiCommentDetail, BiTargetLock } from "react-icons/bi";
import { LANDING_SECTION_IDS, PROBLEM_COPY } from "../../lib/constants";
import { sectionReveal, staggerContainer } from "../../lib/motion";
import Grid from "../ui/Grid";
import Section from "../ui/Section";
import ProblemCard from "./ProblemCard";

const problemCards = [
  {
    title: PROBLEM_COPY.cards[0].title,
    description: PROBLEM_COPY.cards[0].description,
    icon: BiTargetLock,
  },
  {
    title: PROBLEM_COPY.cards[1].title,
    description: PROBLEM_COPY.cards[1].description,
    icon: BiBot,
  },
  {
    title: PROBLEM_COPY.cards[2].title,
    description: PROBLEM_COPY.cards[2].description,
    icon: BiCommentDetail,
  },
] as const;

export default function ProblemSection() {
  return (
    <Section
      id={LANDING_SECTION_IDS.problem}
      aria-label="Problem section"
      className="overflow-hidden"
    >
      <Grid className="items-center gap-landing-4 lg:gap-landing-6">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="col-span-12 lg:col-span-5"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-landing-blue">
            {PROBLEM_COPY.eyebrow}
          </p>
          <h2 className="mt-landing-2 landing-heading max-w-2xl text-balance">
            {PROBLEM_COPY.heading}
          </h2>
          <p className="mt-landing-3 landing-body max-w-landing-text text-pretty">
            {PROBLEM_COPY.description}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="col-span-12 lg:col-span-7"
        >
          <div className="rounded-3xl border border-landing-border bg-landing-surface-muted/80 p-landing-3 shadow-landing-card sm:p-landing-4">
            <div className="flex items-center justify-between gap-landing-2 border-b border-landing-border pb-landing-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-landing-text-muted">
                  Common gaps
                </p>
                <p className="mt-1 text-base font-semibold text-landing-navy">
                  Why learners stall before they get hired
                </p>
              </div>
              <div className="rounded-landing-badge border border-landing-border bg-landing-surface px-3 py-1.5 text-sm font-medium text-landing-text-secondary">
                3 signals
              </div>
            </div>

            <div className="mt-landing-4 grid gap-landing-3 md:grid-cols-3">
              {problemCards.map((card, index) => (
                <ProblemCard
                  key={card.title}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </Grid>
    </Section>
  );
}
