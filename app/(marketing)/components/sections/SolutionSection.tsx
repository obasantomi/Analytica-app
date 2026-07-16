"use client";

import { motion } from "framer-motion";
import {
  BiBot,
  BiCategoryAlt,
  BiLineChart,
  BiBadgeCheck,
} from "react-icons/bi";
import { LANDING_SECTION_IDS, SOLUTION_COPY } from "../../lib/constants";
import { sectionReveal } from "../../lib/motion";
import Grid from "../ui/Grid";
import Section from "../ui/Section";

const workflowSteps = [
  {
    title: SOLUTION_COPY.steps[0].title,
    description: SOLUTION_COPY.steps[0].description,
    icon: BiCategoryAlt,
  },
  {
    title: SOLUTION_COPY.steps[1].title,
    description: SOLUTION_COPY.steps[1].description,
    icon: BiLineChart,
  },
  {
    title: SOLUTION_COPY.steps[2].title,
    description: SOLUTION_COPY.steps[2].description,
    icon: BiBot,
  },
] as const;

export default function SolutionSection() {
  return (
    <Section
      id={LANDING_SECTION_IDS.solution}
      aria-label="Solution section"
      className="overflow-hidden"
    >
      <Grid className="items-start gap-landing-4 lg:gap-landing-6">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="col-span-12 lg:col-span-5"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-landing-blue">
            {SOLUTION_COPY.eyebrow}
          </p>
          <h2 className="mt-landing-2 landing-heading max-w-2xl text-balance">
            {SOLUTION_COPY.heading}
          </h2>
          <p className="mt-landing-3 landing-body max-w-landing-text text-pretty">
            {SOLUTION_COPY.description}
          </p>

          <div className="mt-landing-4 rounded-3xl border border-landing-border bg-landing-surface p-landing-3 shadow-landing-card">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-landing-success/10 text-landing-success">
                <BiBadgeCheck className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-landing-navy">
                  {SOLUTION_COPY.callout.title}
                </p>
                <p className="mt-1 text-sm text-landing-text-secondary">
                  {SOLUTION_COPY.callout.description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.08 }}
          className="col-span-12 lg:col-span-7"
        >
          <div className="rounded-3xl border border-landing-border bg-landing-surface-muted/80 p-landing-3 shadow-landing-card sm:p-landing-4">
            <div className="flex items-center justify-between gap-landing-2 border-b border-landing-border pb-landing-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-landing-text-muted">
                  Guided workflow
                </p>
                <p className="mt-1 text-base font-semibold text-landing-navy">
                  From raw data to portfolio-ready insight
                </p>
              </div>
              <div className="rounded-landing-badge border border-landing-border bg-landing-surface px-3 py-1.5 text-sm font-medium text-landing-text-secondary">
                3 steps
              </div>
            </div>

            <div className="mt-landing-4 space-y-landing-3">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.title}
                    className="flex gap-landing-3 rounded-3xl border border-landing-border/70 bg-landing-surface p-landing-3"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-landing-blue/10 text-landing-blue">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-landing-navy">
                          {step.title}
                        </p>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-landing-text-muted">
                          0{index + 1}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-landing-text-secondary">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </Grid>
    </Section>
  );
}
