"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  LEARNING_JOURNEY_COPY,
  type LearningJourneyStep,
} from "../../lib/constants";
import { useJourneyScroll } from "../../hooks/useJourneyScroll";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { EASING, cardReveal, staggerContainer } from "../../lib/motion";
import Grid from "../ui/Grid";
import JourneyRail from "./JourneyRail";
import JourneyStage from "./JourneyStage";

const journeySteps = LEARNING_JOURNEY_COPY.steps;
const JOURNEY_SCROLL_HEIGHT = `${journeySteps.length * 100}vh`;

function JourneyStepContent({
  step,
  index,
}: {
  step: LearningJourneyStep;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: EASING.easeOut }}
      className="relative z-10"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-landing-blue">
        {LEARNING_JOURNEY_COPY.eyebrow}
      </p>
      <p className="mt-landing-3 text-sm font-semibold tracking-[0.16em] text-landing-success">
        {step.number} / 05
      </p>
      <h2 className="mt-landing-2 landing-heading max-w-xl text-balance">
        {step.title}
      </h2>
      <p className="mt-landing-3 landing-body max-w-landing-text text-pretty">
        {step.description}
      </p>
      <p className="mt-landing-4 text-sm font-medium text-landing-text-secondary">
        Step {index + 1} of {journeySteps.length}
      </p>
    </motion.div>
  );
}

function JourneyContentOutline() {
  return (
    <ol className="sr-only">
      {journeySteps.map((step) => (
        <li key={step.id}>
          <h2>{step.title}</h2>
          <p>{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

function StaticJourney() {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-landing-blue">
        {LEARNING_JOURNEY_COPY.eyebrow}
      </p>
      <h2 className="mt-landing-2 landing-heading max-w-3xl text-balance">
        {LEARNING_JOURNEY_COPY.heading}
      </h2>
      <p className="mt-landing-3 landing-body max-w-landing-text text-pretty">
        {LEARNING_JOURNEY_COPY.description}
      </p>

      <motion.ol
        variants={staggerContainer(0.1, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-landing-5 space-y-landing-3"
      >
        {journeySteps.map((step) => (
          <motion.li
            key={step.id}
            variants={cardReveal}
            className="rounded-landing-card border border-landing-border bg-landing-surface p-landing-3 shadow-landing-card sm:p-landing-4"
          >
            <div className="flex items-start gap-landing-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-landing-success/10 text-sm font-bold text-landing-success">
                {step.number}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-landing-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-landing-text-secondary">
                  {step.description}
                </p>
              </div>
            </div>
            <div className="mt-landing-3">
              <JourneyStage step={step} showBackgroundNumber={false} />
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}

function PinnedJourney() {
  const { wrapperRef, scrollYProgress, activeIndex } = useJourneyScroll(
    journeySteps.length,
  );
  const activeStep = journeySteps[activeIndex];

  return (
    <>
      <JourneyContentOutline />

      <div className="mb-landing-5 max-w-landing-content">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-landing-blue">
          {LEARNING_JOURNEY_COPY.eyebrow}
        </p>
        <h2 className="mt-landing-2 landing-heading max-w-3xl text-balance">
          {LEARNING_JOURNEY_COPY.heading}
        </h2>
        <p className="mt-landing-3 landing-body max-w-landing-text text-pretty">
          {LEARNING_JOURNEY_COPY.description}
        </p>
      </div>

      <div
        ref={wrapperRef}
        className="relative"
        style={{ height: JOURNEY_SCROLL_HEIGHT }}
      >
        <div
          className="sticky top-0 flex h-screen items-center"
          style={{
            paddingTop: "var(--landing-nav-height)",
          }}
        >
          <div className="w-full py-landing-4">
            <Grid className="items-center gap-landing-4">
              <div className="col-span-12 lg:col-span-3">
                <JourneyRail
                  steps={journeySteps}
                  activeIndex={activeIndex}
                  progress={scrollYProgress}
                />
              </div>

              <div className="relative col-span-12 min-h-70 lg:col-span-5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={activeStep.number}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASING.easeOut }}
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-2 top-1/2 -z-10 -translate-y-1/2 select-none text-[6rem] font-bold leading-none tracking-tighter text-landing-navy/5 sm:text-[8rem] lg:text-[10rem]"
                  >
                    {activeStep.number}
                  </motion.span>
                </AnimatePresence>

                <AnimatePresence mode="wait" initial={false}>
                  <JourneyStepContent
                    key={activeStep.id}
                    step={activeStep}
                    index={activeIndex}
                  />
                </AnimatePresence>
              </div>

              <div className="col-span-12 lg:col-span-4">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeStep.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: EASING.easeOut }}
                  >
                    <JourneyStage
                      step={activeStep}
                      showBackgroundNumber={false}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LearningJourneyExperience() {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <StaticJourney />;
  }

  return (
    <>
      <div className="lg:hidden">
        <StaticJourney />
      </div>
      <div className="hidden lg:block">
        <PinnedJourney />
      </div>
    </>
  );
}
