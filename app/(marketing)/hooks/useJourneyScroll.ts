"use client";

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState, type RefObject } from "react";

type UseJourneyScrollResult = {
  wrapperRef: RefObject<HTMLDivElement | null>;
  scrollYProgress: MotionValue<number>;
  activeIndex: number;
};

export function useJourneyScroll(stepCount: number): UseJourneyScrollResult {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      stepCount - 1,
      Math.max(0, Math.floor(latest * stepCount)),
    );

    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  return {
    wrapperRef,
    scrollYProgress,
    activeIndex,
  };
}
