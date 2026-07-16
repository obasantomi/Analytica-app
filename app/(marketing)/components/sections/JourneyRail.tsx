"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { LearningJourneyStep } from "../../lib/constants";

type JourneyRailProps = {
  steps: readonly LearningJourneyStep[];
  activeIndex: number;
  progress: MotionValue<number>;
};

export default function JourneyRail({
  steps,
  activeIndex,
  progress,
}: JourneyRailProps) {
  const fillScaleY = useTransform(progress, [0, 1], [0, 1]);
  const indicatorTop = useTransform(progress, [0, 1], ["0%", "calc(100% - 1.5rem)"]);

  return (
    <div aria-label="Learning journey progress" className="relative h-full">
      <div
        aria-hidden="true"
        className="absolute bottom-3 left-3 top-3 w-px bg-landing-border"
      >
        <motion.div
          style={{ scaleY: fillScaleY }}
          className="h-full w-full origin-top bg-landing-success shadow-[0_0_12px_rgba(34,197,94,0.45)]"
        />
      </div>

      <motion.div
        aria-hidden="true"
        style={{ top: indicatorTop }}
        className="absolute left-3 size-3 -translate-x-1/2 rounded-full bg-landing-success shadow-[0_0_16px_rgba(34,197,94,0.55)]"
      />

      <ol className="relative flex h-80 flex-col justify-between pl-8">
        {steps.map((step, index) => {
          const isCurrent = index === activeIndex;
          const isComplete = index < activeIndex;

          return (
            <li
              key={step.id}
              aria-current={isCurrent ? "step" : undefined}
              className={`transition-[opacity,color] duration-300 ${
                isCurrent
                  ? "opacity-100"
                  : isComplete
                    ? "opacity-60"
                    : "opacity-30"
              }`}
            >
              <div className="flex items-center gap-landing-2">
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold transition-colors duration-300 ${
                    isCurrent || isComplete
                      ? "border-landing-success bg-landing-success/10 text-landing-success"
                      : "border-landing-border bg-landing-surface text-landing-text-muted"
                  }`}
                >
                  {step.number}
                </span>
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isCurrent
                      ? "text-landing-navy"
                      : "text-landing-text-secondary"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
