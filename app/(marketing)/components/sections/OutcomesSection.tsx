"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import {
  BiBarChartAlt2,
  BiCheckCircle,
  BiTargetLock,
  BiTrendingUp,
} from "react-icons/bi";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { LANDING_SECTION_IDS, OUTCOMES_COPY } from "../../lib/constants";
import { cardReveal, sectionReveal, staggerContainer } from "../../lib/motion";
import HeroPanel from "../hero/HeroPanel";
import Grid from "../ui/Grid";
import Section from "../ui/Section";

type MetricCardProps = {
  icon: typeof BiTrendingUp;
  value: number;
  suffix: string;
  label: string;
  description: string;
  precision?: number;
};

function AnimatedNumber({
  value,
  precision = 0,
}: {
  value: number;
  precision?: number;
}) {
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (latest) =>
    latest.toFixed(precision),
  );

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.8,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [motionValue, value]);

  return <motion.span>{display}</motion.span>;
}

function MetricCard({
  icon: Icon,
  value,
  suffix,
  label,
  description,
  precision = 0,
}: MetricCardProps) {
  return (
    <HeroPanel className="h-full">
      <div className="flex items-center gap-2 text-landing-blue">
        <Icon className="size-5" aria-hidden="true" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-landing-text-muted">
          {label}
        </p>
      </div>

      <div className="mt-landing-3">
        <p className="text-3xl font-semibold tracking-tight text-landing-navy sm:text-4xl">
          <AnimatedNumber value={value} precision={precision} />
          {suffix}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-landing-text-secondary">
          {description}
        </p>
      </div>
    </HeroPanel>
  );
}

export default function OutcomesSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Section
      id={LANDING_SECTION_IDS.outcomes}
      aria-label="Outcomes section"
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
          {OUTCOMES_COPY.eyebrow}
        </p>
        <h2 className="mt-landing-2 landing-heading max-w-3xl text-balance">
          {OUTCOMES_COPY.heading}
        </h2>
        <p className="mt-landing-3 landing-body max-w-landing-text text-pretty">
          {OUTCOMES_COPY.description}
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.08, 0.04)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-landing-5"
      >
        <Grid className="items-stretch">
          <motion.div
            variants={cardReveal}
            className="col-span-2 lg:col-span-3"
          >
            <MetricCard
              icon={BiTargetLock}
              value={32}
              suffix="%"
              label="Projects completed"
              description="Learners finish a more complete first portfolio project in less time."
            />
          </motion.div>

          <motion.div
            variants={cardReveal}
            className="col-span-2 lg:col-span-3"
          >
            <MetricCard
              icon={BiTrendingUp}
              value={4.8}
              suffix="/5"
              label="Portfolio quality"
              description="Professional feedback consistently raises the clarity of recommendations."
              precision={1}
            />
          </motion.div>

          <motion.div
            variants={cardReveal}
            className="col-span-2 lg:col-span-3"
          >
            <MetricCard
              icon={BiBarChartAlt2}
              value={12}
              suffix="h"
              label="Guided practice"
              description="A focused weekly rhythm helps new analysts build stronger habits."
            />
          </motion.div>

          <motion.div
            variants={cardReveal}
            className="col-span-2 lg:col-span-3"
          >
            <MetricCard
              icon={BiCheckCircle}
              value={87}
              suffix="%"
              label="Feedback clarity"
              description="Mentor guidance becomes easier to act on and easier to explain."
            />
          </motion.div>

          <motion.div
            variants={cardReveal}
            className="col-span-4 lg:col-span-6"
          >
            <HeroPanel className="h-full">
              <div className="flex items-center gap-2 text-landing-blue">
                <BiTrendingUp className="size-5" aria-hidden="true" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-landing-text-muted">
                  Momentum signal
                </p>
              </div>

              <div className="mt-landing-4 grid gap-landing-3 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-2xl border border-landing-border bg-landing-surface p-landing-3">
                  <p className="text-sm font-semibold text-landing-navy">
                    Confidence grows with each completed step.
                  </p>
                  <div className="mt-landing-3 flex h-24 items-end gap-2">
                    {[24, 38, 48, 61, 79, 92].map((height, index) => (
                      <motion.div
                        key={`${height}-${index}`}
                        initial={{ height: 0, opacity: 0.45 }}
                        whileInView={{ height: `${height}%`, opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                          duration: 0.45,
                          delay: index * 0.06,
                          ease: "easeOut",
                        }}
                        className={`flex-1 rounded-t-md ${index === 5 ? "bg-landing-success" : "bg-landing-blue/80"}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-landing-border bg-landing-surface-muted p-landing-3">
                  <p className="text-sm font-semibold text-landing-navy">
                    {prefersReducedMotion
                      ? "Clear progress at every stage."
                      : "Each milestone turns a skill into a visible advantage."}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-landing-text-secondary">
                    Projects become more structured, feedback becomes more
                    actionable, and the next step feels clearer.
                  </p>
                </div>
              </div>
            </HeroPanel>
          </motion.div>
        </Grid>
      </motion.div>
    </Section>
  );
}
