import type { LandingSectionId } from "./constants";

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function getScrollProgress(): number {
  if (typeof window === "undefined") {
    return 0;
  }

  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  if (docHeight <= 0) {
    return 0;
  }

  return clamp(scrollTop / docHeight, 0, 1);
}

export function getElementScrollProgress(
  element: HTMLElement,
  offset = 0,
): number {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const elementTop = rect.top + window.scrollY - offset;
  const elementHeight = rect.height;
  const scrollTop = window.scrollY;

  const start = elementTop - viewportHeight;
  const end = elementTop + elementHeight;
  const range = end - start;

  if (range <= 0) {
    return scrollTop >= elementTop ? 1 : 0;
  }

  return clamp((scrollTop - start) / range, 0, 1);
}

export function getVisibleSectionId(
  sectionIds: LandingSectionId[],
  offset = 0,
): LandingSectionId | null {
  if (typeof window === "undefined") {
    return null;
  }

  const scrollPosition = window.scrollY + offset;

  let activeSection: LandingSectionId | null = null;

  for (const id of sectionIds) {
    const element = document.getElementById(id);

    if (!element) {
      continue;
    }

    const elementTop = element.offsetTop;

    if (scrollPosition >= elementTop) {
      activeSection = id;
    }
  }

  return activeSection;
}

export function getCompletedSectionCount(
  sectionIds: LandingSectionId[],
  offset = 0,
): number {
  const activeId = getVisibleSectionId(sectionIds, offset);

  if (!activeId) {
    return 0;
  }

  return sectionIds.indexOf(activeId) + 1;
}

export function getJourneyProgress(
  sectionIds: LandingSectionId[],
  offset = 0,
): number {
  if (sectionIds.length === 0) {
    return 0;
  }

  const completed = getCompletedSectionCount(sectionIds, offset);
  return clamp(completed / sectionIds.length, 0, 1);
}

export function smoothScrollTo(targetY: number, duration = 600): void {
  if (typeof window === "undefined") {
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    window.scrollTo({ top: targetY, behavior: "auto" });
    return;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = clamp(elapsed / duration, 0, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export function scrollToSection(sectionId: string, offset = 0): void {
  const element = document.getElementById(sectionId);

  if (!element) {
    return;
  }

  const targetY = element.offsetTop - offset;
  smoothScrollTo(targetY);
}
