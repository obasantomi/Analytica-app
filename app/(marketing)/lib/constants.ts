export const LANDING_MAX_WIDTH = 1280;
export const LANDING_CONTENT_MAX_WIDTH = 900;
export const LANDING_TEXT_MAX_WIDTH = 720;
export const LANDING_NAV_HEIGHT = 72;

export const LANDING_SECTION_IDS = {
  hero: "hero",
  problem: "problem",
  solution: "solution",
  features: "features",
  journey: "journey",
  preview: "preview",
  outcomes: "outcomes",
  faq: "faq",
  cta: "cta",
} as const;

export type LandingSectionId =
  (typeof LANDING_SECTION_IDS)[keyof typeof LANDING_SECTION_IDS];

export const LANDING_NAV_LINKS = [
  {
    label: "Home",
    sectionId: LANDING_SECTION_IDS.hero,
    href: `#${LANDING_SECTION_IDS.hero}`,
  },
  {
    label: "Features",
    sectionId: LANDING_SECTION_IDS.features,
    href: `#${LANDING_SECTION_IDS.features}`,
  },
  {
    label: "Learning Journey",
    sectionId: LANDING_SECTION_IDS.journey,
    href: `#${LANDING_SECTION_IDS.journey}`,
  },
  {
    label: "AI Mentor",
    sectionId: LANDING_SECTION_IDS.preview,
    href: `#${LANDING_SECTION_IDS.preview}`,
  },
  {
    label: "FAQ",
    sectionId: LANDING_SECTION_IDS.faq,
    href: `#${LANDING_SECTION_IDS.faq}`,
  },
] as const;

export const LANDING_NAV_SECTION_IDS = LANDING_NAV_LINKS.map(
  (link) => link.sectionId,
);

export const HERO_ENTRANCE = {
  nav: 0,
  badge: 0.15,
  headingBase: 0.3,
  headingStagger: 0.12,
  supporting: 0.65,
  primaryCta: 0.8,
  secondaryCta: 0.92,
  visualization: 1.05,
  background: 1.2,
} as const;

export const HERO_COPY = {
  badge: "Real-world analytics • AI mentorship",
  headline: {
    line1: "Learn",
    line2: "with real projects,",
    line3: "become industry ready.",
  },
  supporting:
    "Analytica helps aspiring analysts turn real business data into guided projects with mentorship, professional feedback, and clear progress.",
  secondaryCta: {
    label: "See how it works",
    sectionId: LANDING_SECTION_IDS.journey,
  },
} as const;

export const PROBLEM_COPY = {
  eyebrow: "Why the current path breaks down",
  heading: "Most learners finish courses without the practice employers need.",
  description:
    "A lesson can teach a method. It rarely teaches the judgement, context, and decision-making that real projects demand.",
  cards: [
    {
      title: "No real-world practice",
      description:
        "Toy datasets can be completed quickly, but they rarely build the instincts that matter in a professional role.",
    },
    {
      title: "No real-time mentorship",
      description:
        "Guidance is often delayed, generic, or missing when a learner needs direction most.",
    },
    {
      title: "No professional framing",
      description:
        "The missing piece is the business thinking that turns analysis into clear, credible decisions.",
    },
  ],
} as const;

export const SOLUTION_COPY = {
  eyebrow: "How Analytica works",
  heading: "A clearer path from first analysis to professional readiness.",
  description:
    "Learners work through authentic datasets, receive contextual guidance from an AI mentor, and build the habits employers expect without losing momentum.",
  steps: [
    {
      title: "Choose a real project",
      description:
        "Start from a realistic brief and a dataset that mirrors the kind of analysis used in modern teams.",
    },
    {
      title: "Work through the right questions",
      description:
        "Receive guided prompts and recommendations that shape the analysis without handing over answers.",
    },
    {
      title: "Get mentor feedback",
      description:
        "Finish with coaching that explains your choices, strengthens your reasoning, and makes your work portfolio-ready.",
    },
  ],
  callout: {
    title: "Progress becomes visible early.",
    description:
      "Each completed project brings a learner closer to the confidence and readiness they want.",
  },
} as const;

export const FEATURES_COPY = {
  eyebrow: "Built for the work that comes next",
  heading: "The structure behind stronger analyst habits.",
  description:
    "Every part of Analytica turns a project into practice you can explain, improve, and carry into your next role.",
  cards: [
    {
      id: "datasets",
      title: "Real-world datasets",
      description:
        "Practice with the imperfect data, business context, and decisions that make real analysis matter.",
    },
    {
      id: "mentor",
      title: "AI mentor",
      description:
        "Get a useful next question when you need it—without losing the chance to think through the answer.",
    },
    {
      id: "paths",
      title: "Guided learning paths",
      description:
        "Move through projects in a deliberate order, with each step building on the last.",
    },
    {
      id: "feedback",
      title: "Professional feedback",
      description:
        "See how your reasoning, communication, and final recommendation hold up—not just your output.",
    },
    {
      id: "progress",
      title: "Skill progress tracking",
      description:
        "Make growth visible across the skills that turn careful analysis into confident work.",
    },
    {
      id: "portfolio",
      title: "Portfolio-worthy projects",
      description:
        "Finish work you can walk through with clarity: the brief, the method, and the business decision.",
    },
  ],
} as const;

export const PRODUCT_PREVIEW_COPY = {
  eyebrow: "Product experience",
  heading: "The workspace feels like a real analytical workflow.",
  description:
    "Every part of the experience is designed to feel like the product itself: active, structured, and grounded in real decision-making.",
} as const;

export const OUTCOMES_COPY = {
  eyebrow: "Visible growth",
  heading: "Progress becomes visible, not abstract.",
  description:
    "As learners move through the product, their progress becomes easier to see, easier to explain, and easier to trust.",
} as const;

export const FAQ_COPY = {
  eyebrow: "Questions answered",
  heading: "A calm, practical introduction to how the experience works.",
  description:
    "The details below help a new visitor understand the rhythm of the product without feeling overwhelmed.",
  items: [
    {
      question: "Who is Analytica for?",
      answer:
        "It is designed for aspiring analysts, career switchers, and learners who want structure, mentorship, and portfolio-ready practice rather than passive tutorials.",
    },
    {
      question: "Is it beginner friendly?",
      answer:
        "Yes. The experience starts with clearer guidance and gradually builds more independence as learners grow more confident.",
    },
    {
      question: "What kind of datasets are used?",
      answer:
        "The product uses realistic business datasets with context, ambiguity, and decision points so the analysis feels close to professional work.",
    },
    {
      question: "Is AI doing the work for me?",
      answer:
        "The AI mentor supports the process by offering direction, prompts, and feedback. The learner still makes the decisions and builds the reasoning.",
    },
    {
      question: "Will I build a portfolio?",
      answer:
        "Yes. Each project is structured so the work can be reviewed, explained, and kept as evidence of growth for future applications or interviews.",
    },
  ],
} as const;

export const LEARNING_JOURNEY_COPY = {
  eyebrow: "Learning journey",
  heading: "A clearer route from project brief to professional feedback.",
  description:
    "Five deliberate steps turn an unfamiliar dataset into work you can explain with confidence.",
  steps: [
    {
      id: "project",
      number: "01",
      title: "Choose a project",
      description:
        "Begin with a business brief that gives the analysis a clear decision to support.",
    },
    {
      id: "dataset",
      number: "02",
      title: "Explore the dataset",
      description:
        "Find the patterns, gaps, and questions inside the data before choosing a method.",
    },
    {
      id: "guidance",
      number: "03",
      title: "Receive AI guidance",
      description:
        "Ask for timely prompts that sharpen your approach without doing the work for you.",
    },
    {
      id: "analysis",
      number: "04",
      title: "Complete the analysis",
      description:
        "Turn evidence into a recommendation that is structured, defensible, and easy to follow.",
    },
    {
      id: "feedback",
      number: "05",
      title: "Receive professional feedback",
      description:
        "Review the work as a professional would, then carry those lessons into the next project.",
    },
  ],
} as const;

export type LearningJourneyStep = (typeof LEARNING_JOURNEY_COPY.steps)[number];

export const LANDING_BETA_CTA = {
  label: "Join Beta",
  href: "/sign-up",
} as const;

export const SCROLL_BLUR_THRESHOLD = 24;
