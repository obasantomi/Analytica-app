"use client";

import { useEffect, useState } from "react";
import { LANDING_NAV_HEIGHT, type LandingSectionId } from "../lib/constants";
import { getVisibleSectionId } from "../lib/scroll";
import { useScrollPosition } from "./useScrollPosition";

export function useScrollSpy(
  sectionIds: readonly LandingSectionId[],
  offset = LANDING_NAV_HEIGHT + 48,
): LandingSectionId {
  const scrollY = useScrollPosition();
  const [activeSection, setActiveSection] = useState<LandingSectionId>(
    sectionIds[0],
  );

  useEffect(() => {
    const currentWindow = globalThis.window;

    if (!currentWindow) {
      return;
    }

    const updateActiveSection = () => {
      const visible = getVisibleSectionId([...sectionIds], offset);
      if (visible) {
        setActiveSection(visible);
      }
    };

    updateActiveSection();

    const addEventListener = currentWindow.addEventListener.bind(currentWindow);
    const removeEventListener =
      currentWindow.removeEventListener.bind(currentWindow);

    if (!("IntersectionObserver" in currentWindow)) {
      addEventListener("scroll", updateActiveSection, { passive: true });
      addEventListener("resize", updateActiveSection);

      return () => {
        removeEventListener("scroll", updateActiveSection);
        removeEventListener("resize", updateActiveSection);
      };
    }

    const sections = sectionIds
      .map((sectionId) => currentWindow.document.getElementById(sectionId))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (entryA, entryB) =>
              entryB.intersectionRatio - entryA.intersectionRatio,
          )[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id as LandingSectionId);
        }
      },
      {
        rootMargin: `-${LANDING_NAV_HEIGHT + 24}px 0px -58% 0px`,
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [scrollY, sectionIds, offset]);

  return activeSection;
}
