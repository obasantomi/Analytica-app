"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BiBot } from "react-icons/bi";
import { HERO_ENTRANCE } from "../../lib/constants";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { heroScaleIn } from "../../lib/motion";
import HeroPanel from "./HeroPanel";

const CHART_BARS = [38, 62, 48, 78, 55, 70] as const;
const DATASET_ROWS = [
  ["Region", "Revenue", "Units"],
  ["North", "$124K", "1,240"],
  ["South", "$98K", "980"],
  ["West", "$156K", "1,560"],
] as const;

const MENTOR_MESSAGES = [
  "Start by comparing revenue trends across regions. Which area shows the strongest growth?",
  "Good approach. Consider segmenting by product category to uncover what's driving the difference.",
  "Strong analysis. Your insight on the West region's outperformance is portfolio-worthy.",
] as const;

const STAGE_DURATION_MS = 2200;

export default function HeroVisualization() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setStage((current) => (current + 1) % 7);
    }, STAGE_DURATION_MS);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  const showDataset = stage >= 1;
  const showChart = stage >= 2;
  const showMentor = stage >= 3;
  const showFeedback = stage >= 5;
  const mentorMessageIndex = stage >= 5 ? 2 : stage >= 4 ? 1 : 0;
  const progress = prefersReducedMotion
    ? 78
    : stage >= 6
      ? 78
      : stage >= 5
        ? 62
        : stage >= 4
          ? 48
          : stage >= 3
            ? 36
            : 24;

  return (
    <motion.div
      variants={heroScaleIn}
      initial="hidden"
      animate="visible"
      custom={HERO_ENTRANCE.visualization}
      className="relative mx-auto w-full max-w-xl lg:max-w-none"
    >
      <div className="rounded-landing-card border border-landing-border bg-landing-surface p-landing-3 shadow-landing-elevated sm:p-landing-4">
        <div className="mb-landing-3 flex items-center justify-between gap-landing-2 border-b border-landing-border pb-landing-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-landing-text-muted">
              Current Project
            </p>
            <p className="mt-1 text-base font-semibold text-landing-navy sm:text-lg">
              Retail Revenue Analysis
            </p>
          </div>
          <div className="flex items-center gap-landing-2 rounded-landing-badge border border-landing-border bg-landing-surface-muted px-3 py-1.5">
            <span
              className={`size-2 rounded-full transition-colors duration-500 ${
                showMentor ? "bg-landing-success" : "bg-landing-text-muted/40"
              }`}
              aria-hidden="true"
            />
            <span className="text-xs font-medium text-landing-text-secondary">
              {showMentor ? "AI Mentor Active" : "Loading dataset"}
            </span>
          </div>
        </div>

        <div className="grid gap-landing-3 sm:grid-cols-2">
          <HeroPanel>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-landing-text-muted">
              Dataset Preview
            </p>

            <div className="mt-landing-2 overflow-hidden rounded-xl border border-landing-border bg-landing-surface">
              {!showDataset ? (
                <div className="space-y-2 p-landing-2" aria-hidden="true">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-3 animate-pulse rounded bg-landing-border/60"
                      style={{ width: `${88 - index * 12}%` }}
                    />
                  ))}
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-landing-border bg-landing-surface-muted">
                      {DATASET_ROWS[0].map((cell) => (
                        <th
                          key={cell}
                          className="px-2 py-2 font-semibold text-landing-navy"
                        >
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DATASET_ROWS.slice(1).map((row) => (
                      <tr
                        key={row[0]}
                        className="border-b border-landing-border/60 last:border-0"
                      >
                        {row.map((cell) => (
                          <td
                            key={cell}
                            className="px-2 py-2 text-landing-text-secondary"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </HeroPanel>

          <HeroPanel>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-landing-text-muted">
              Revenue Trend
            </p>

            <div className="mt-landing-3 flex h-28 items-end justify-between gap-1.5">
              {CHART_BARS.map((height, index) => (
                <motion.div
                  key={index}
                  className="w-full rounded-t-md bg-landing-blue/80"
                  initial={{ scaleY: 0 }}
                  animate={{
                    scaleY: showChart ? height / 100 : 0,
                    opacity: showChart ? 1 : 0.35,
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0.01 : 0.6,
                    delay: prefersReducedMotion ? 0 : index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ originY: 1, height: "100%" }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </HeroPanel>
        </div>

        <AnimatePresence mode="wait">
          {showMentor ? (
            <motion.div
              key="mentor"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-landing-3 overflow-hidden rounded-2xl border border-landing-navy/10 bg-landing-navy"
            >
              <div className="flex items-center gap-landing-2 border-b border-white/10 px-landing-3 py-landing-2">
                <span className="flex size-8 items-center justify-center rounded-xl bg-landing-success/15 text-landing-success">
                  <BiBot className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Analytica AI Mentor
                  </p>
                  <p className="text-xs text-white/60">Guiding your analysis</p>
                </div>
              </div>

              <div className="space-y-landing-2 p-landing-3" aria-live="polite">
                <motion.div
                  key={mentorMessageIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="max-w-[95%] rounded-2xl border border-white/10 bg-white/5 px-landing-3 py-landing-2 text-sm leading-relaxed text-white/90"
                >
                  {MENTOR_MESSAGES[mentorMessageIndex]}
                </motion.div>

                {showFeedback ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 }}
                    className="ml-auto max-w-[80%] rounded-2xl bg-landing-blue/30 px-landing-3 py-landing-2 text-sm text-white"
                  >
                    The West region leads in revenue growth. I&apos;ll compare
                    category mix next.
                  </motion.div>
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <HeroPanel
          className="mt-landing-3"
          as="div"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center justify-between gap-landing-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-landing-text-muted">
              Project Progress
            </p>
            <p className="text-sm font-semibold tabular-nums text-landing-navy">
              {progress}%
            </p>
          </div>
          <div
            className="mt-landing-2 h-2 overflow-hidden rounded-landing-badge bg-landing-border/60"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label="Project progress"
          >
            <motion.div
              className="h-full rounded-landing-badge bg-landing-success"
              animate={{ width: `${progress}%` }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>
        </HeroPanel>
      </div>

      <div
        className="absolute -inset-4 -z-10 rounded-4xl bg-landing-blue/4 blur-2xl"
        aria-hidden="true"
      />
    </motion.div>
  );
}
