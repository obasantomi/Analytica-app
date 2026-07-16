"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type CursorMode = "default" | "button" | "card" | "cta";

type CursorInteraction = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  isEnabled: boolean;
  mode: CursorMode;
  prefersReducedMotion: boolean;
};

const OFFSET = { x: 12, y: 12 };

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function getCursorMode(target: EventTarget | null): CursorMode {
  if (!(target instanceof HTMLElement)) {
    return "default";
  }

  const interactiveElement = target.closest(
    "a, button, [role='button'], input, select, textarea, summary, [data-cursor-boost]",
  );

  if (interactiveElement) {
    const datasetMode = interactiveElement.getAttribute("data-cursor-boost");

    if (datasetMode === "card") {
      return "card";
    }

    if (datasetMode === "cta") {
      return "cta";
    }

    const className = interactiveElement.className?.toString() ?? "";

    if (
      className.includes("bg-landing-navy") ||
      className.includes("bg-landing-blue")
    ) {
      return "cta";
    }

    return "button";
  }

  const cardishElement = target.closest(
    "article, li, [data-cursor-card], .group, [class*='rounded-3xl'], [class*='rounded-2xl'], [class*='rounded-landing-card']",
  );

  if (cardishElement) {
    return "card";
  }

  return "default";
}

export function useCursorFollower(): CursorInteraction {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isEnabled, setIsEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [isVisible, setIsVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const actualPositionRef = useRef({ x: 0, y: 0 });
  const renderedPositionRef = useRef({ x: 0, y: 0 });
  const modeRef = useRef<CursorMode>("default");
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointerSupport = () => {
      const hasFinePointer =
        mediaQuery.matches && window.navigator.maxTouchPoints === 0;
      setIsEnabled(hasFinePointer);

      if (!hasFinePointer) {
        setIsVisible(false);
      }
    };

    updatePointerSupport();
    mediaQuery.addEventListener("change", updatePointerSupport);

    return () => {
      mediaQuery.removeEventListener("change", updatePointerSupport);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      return;
    }

    const animate = () => {
      const actualPosition = actualPositionRef.current;
      const renderedPosition = renderedPositionRef.current;
      const targetPosition = {
        x: actualPosition.x + OFFSET.x,
        y: actualPosition.y + OFFSET.y,
      };

      if (prefersReducedMotion) {
        renderedPositionRef.current = targetPosition;
        x.set(targetPosition.x);
        y.set(targetPosition.y);
      } else {
        const nextPosition = {
          x: lerp(renderedPosition.x, targetPosition.x, 0.16),
          y: lerp(renderedPosition.y, targetPosition.y, 0.16),
        };

        renderedPositionRef.current = nextPosition;
        x.set(nextPosition.x);
        y.set(nextPosition.y);
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    const handleMouseMove = (event: MouseEvent) => {
      actualPositionRef.current = { x: event.clientX, y: event.clientY };
      if (!isVisible) {
        setIsVisible(true);
      }

      const nextMode = getCursorMode(event.target);
      if (nextMode !== modeRef.current) {
        modeRef.current = nextMode;
        setMode(nextMode);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setMode("default");
      modeRef.current = "default";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isEnabled, prefersReducedMotion]);

  return {
    x,
    y,
    isEnabled: isEnabled && isVisible,
    mode,
    prefersReducedMotion,
  };
}
