import type { Transition, Variants } from "framer-motion";

export const EASING = {
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
};

export const DURATION = {
  fast: 0.12,
  normal: 0.2,
  button: 0.12,
  nav: 0.3,
  section: 0.6,
  sectionMax: 0.7,
} as const;

export const STAGGER = {
  tight: 0.08,
  normal: 0.1,
  relaxed: 0.12,
  heroLine: 0.12,
} as const;

export const SPRING = {
  subtle: { type: "spring" as const, stiffness: 400, damping: 40 },
  nav: { type: "spring" as const, stiffness: 380, damping: 32 },
};

export const TRANSITIONS = {
  fast: {
    duration: DURATION.fast,
    ease: EASING.easeOut,
  } satisfies Transition,
  normal: {
    duration: DURATION.normal,
    ease: EASING.easeOut,
  } satisfies Transition,
  section: {
    duration: DURATION.section,
    ease: EASING.easeOut,
  } satisfies Transition,
  nav: {
    duration: DURATION.nav,
    ease: EASING.easeInOut,
  } satisfies Transition,
};

export const sectionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITIONS.section,
  },
};

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITIONS.normal,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: TRANSITIONS.normal,
  },
};

export const cardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITIONS.normal,
  },
};

export const heroLineReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASING.easeOut,
    },
  },
};

export const heroFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASING.easeOut,
      delay,
    },
  }),
};

export const heroScaleIn: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: EASING.easeOut,
      delay,
    },
  }),
};

export const staggerContainer = (
  staggerChildren: number = STAGGER.normal,
  delayChildren: number = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export function getReducedMotionVariants(variants: Variants): Variants {
  const reduced: Variants = {};

  for (const [key, value] of Object.entries(variants)) {
    if (typeof value === "object" && value !== null) {
      reduced[key] = {
        ...value,
        y: 0,
        transition: { duration: 0.01 },
      };
    }
  }

  return reduced;
}

export function withReducedMotion(
  variants: Variants,
  prefersReducedMotion: boolean,
): Variants {
  return prefersReducedMotion ? getReducedMotionVariants(variants) : variants;
}
