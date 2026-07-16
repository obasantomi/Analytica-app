"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BiBot, BiCheckCircle, BiData, BiLineChart } from "react-icons/bi";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { PRODUCT_PREVIEW_COPY } from "../../lib/constants";
import { EASING, cardReveal, staggerContainer } from "../../lib/motion";
import HeroPanel from "../hero/HeroPanel";
import Grid from "../ui/Grid";

const STAGE_DURATION_MS = 2200;

const previewStages = [
  {
    title: "Dataset loaded",
    description:
      "The workspace is ready with business context, schema, and the first decision point.",
    accent: "Loading data",
  },
  {
    title: "AI mentor active",
    description:
      "The mentor suggests a useful next step without taking over the analysis.",
    accent: "Guidance ready",
  },
  {
    title: "Analysis underway",
    description:
      "Charts and recommendations build as the insight becomes clearer.",
    accent: "Trend visible",
  },
  {
    title: "Feedback ready",
    description:
      "Professional review appears with a clear explanation of what improved.",
    accent: "Review complete",
  },
] as const;

const chartBars = [34, 58, 47, 72, 86, 63] as const;

export default function ProductPreviewExperience() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setStage((current) => (current + 1) % previewStages.length);
    }, STAGE_DURATION_MS);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  const activeStage = previewStages[stage];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASING.easeOut }}
      className="rounded-3xl border border-landing-border/70 bg-landing-surface p-landing-4 shadow-landing-card sm:p-landing-5"
    >
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-landing-blue">
          {PRODUCT_PREVIEW_COPY.eyebrow}
        </p>
        <h2 className="mt-landing-2 landing-heading text-balance">
          {PRODUCT_PREVIEW_COPY.heading}
        </h2>
        <p className="mt-landing-3 landing-body max-w-landing-text text-pretty">
          {PRODUCT_PREVIEW_COPY.description}
        </p>
      </div>

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
            className="col-span-4 lg:col-span-4"
          >
            <div className="flex h-full flex-col gap-landing-2">
              <HeroPanel className="flex-1">
                <div className="flex items-center gap-2 text-landing-blue">
                  <BiData className="size-5" aria-hidden="true" />
                  <p className="text-sm font-semibold text-landing-navy">
                    Workspace data
                  </p>
                </div>
                <div className="mt-landing-3 space-y-2">
                  {[
                    ["Project", "Customer retention"],
                    ["Source", "Retail dataset"],
                    ["Goal", "Identify drivers"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-xl border border-landing-border/70 bg-landing-surface px-3 py-2 text-sm"
                    >
                      <span className="text-landing-text-secondary">
                        {label}
                      </span>
                      <span className="font-medium text-landing-navy">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </HeroPanel>

              <HeroPanel>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-landing-text-muted">
                    Progress
                  </p>
                  <span className="text-sm font-semibold text-landing-success">
                    {prefersReducedMotion ? 74 : 58 + stage * 8}%
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-landing-border">
                  <motion.div
                    className="h-full rounded-full bg-landing-success"
                    animate={{
                      width: `${prefersReducedMotion ? 74 : 58 + stage * 8}%`,
                    }}
                    transition={{ duration: 0.4, ease: EASING.easeOut }}
                  />
                </div>
              </HeroPanel>
            </div>
          </motion.div>

          <motion.div
            variants={cardReveal}
            className="col-span-4 lg:col-span-8"
          >
            <HeroPanel className="h-full">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-landing-border pb-landing-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-landing-text-muted">
                    Live preview
                  </p>
                  <p className="mt-1 text-base font-semibold text-landing-navy">
                    {activeStage.title}
                  </p>
                </div>
                <span className="rounded-landing-badge border border-landing-success/30 bg-landing-success/10 px-3 py-1 text-xs font-medium text-landing-success">
                  {activeStage.accent}
                </span>
              </div>

              <div className="mt-landing-4 grid gap-landing-3 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-2xl border border-landing-border bg-landing-surface p-landing-3">
                  <div className="flex items-center gap-2 text-landing-blue">
                    <BiLineChart className="size-5" aria-hidden="true" />
                    <p className="text-sm font-semibold text-landing-navy">
                      Trend signal
                    </p>
                  </div>

                  <div className="mt-landing-3 flex h-28 items-end gap-2">
                    {chartBars.map((height, index) => (
                      <motion.div
                        key={`${height}-${index}`}
                        className={`flex-1 rounded-t-md ${index === chartBars.length - 1 ? "bg-landing-success" : "bg-landing-blue/80"}`}
                        initial={{ height: 0, opacity: 0.4 }}
                        animate={{
                          height: `${prefersReducedMotion ? height : height * (0.8 + stage * 0.05)}%`,
                          opacity: 1,
                        }}
                        transition={{
                          duration: 0.45,
                          delay: index * 0.06,
                          ease: EASING.easeOut,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: EASING.easeOut }}
                    className="rounded-2xl border border-landing-border bg-landing-surface-muted p-landing-3"
                  >
                    <div className="flex items-start gap-2">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-landing-blue/10 text-landing-blue">
                        {stage === 0 ? (
                          <BiData className="size-5" aria-hidden="true" />
                        ) : stage === 1 ? (
                          <BiBot className="size-5" aria-hidden="true" />
                        ) : stage === 2 ? (
                          <BiLineChart className="size-5" aria-hidden="true" />
                        ) : (
                          <BiCheckCircle
                            className="size-5"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-landing-navy">
                          {activeStage.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-landing-text-secondary">
                          {activeStage.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-landing-3 rounded-2xl border border-landing-border bg-landing-surface px-3 py-3 text-sm text-landing-text-secondary">
                      {stage === 0 ? (
                        <p>The dataset is now visible and ready to explore.</p>
                      ) : stage === 1 ? (
                        <p>
                          Use the next prompt to shape the analysis around the
                          right question.
                        </p>
                      ) : stage === 2 ? (
                        <p>
                          Charts and recommendations now reinforce the same
                          insight.
                        </p>
                      ) : (
                        <p>
                          Professional feedback arrives with guidance you can
                          carry forward.
                        </p>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </HeroPanel>
          </motion.div>
        </Grid>
      </motion.div>
    </motion.div>
  );
}
