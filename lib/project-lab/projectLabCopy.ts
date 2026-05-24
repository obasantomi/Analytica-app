import type { DifficultyLevel, Domain } from "@/app/generated/prisma/client";
import type { ExerciseItem } from "./types";

export function formatDomainLabel(domain: Domain): string {
  const map: Record<Domain, string> = {
    FINANCE: "Finance analytics",
    MARKETING: "Marketing intelligence",
    HEALTHCARE: "Healthcare operations",
    OPERATIONS: "Operations & supply chain",
  };
  return map[domain] ?? "Applied analytics";
}

export function timeEstimateForDifficulty(difficulty: DifficultyLevel): string {
  const map: Record<DifficultyLevel, string> = {
    BEGINNER: "30–40 minutes",
    INTERMEDIATE: "45–60 minutes",
    ADVANCED: "60–90 minutes",
    EXPERT: "90–120 minutes",
  };
  return map[difficulty];
}

export function parseAiQuestionLines(raw: string | null | undefined): string[] {
  if (!raw?.trim()) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed
        .filter((item): item is string => typeof item === "string")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  } catch {
    /* plain text */
  }
  return raw
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function defaultStakeholderQuestions(domain: Domain, projectTitle: string): string[] {
  const label = formatDomainLabel(domain);
  return [
    `What is the single clearest signal in the data that supports a decision for "${projectTitle}"?`,
    `Which segments or time windows in ${label.toLowerCase()} look fragile or inconsistent, and why?`,
    `If you had to defend your findings to a skeptical stakeholder, what evidence would you show first?`,
  ];
}

export function buildStakeholderQuestions(
  domain: Domain,
  projectTitle: string,
  aiQuestions: string | null | undefined,
): string[] {
  const parsed = parseAiQuestionLines(aiQuestions);
  if (parsed.length >= 3) return parsed.slice(0, 5);
  return defaultStakeholderQuestions(domain, projectTitle);
}

export function buildObjectives(
  projectDescription: string | null | undefined,
  datasetDescription: string | null | undefined,
  difficulty: DifficultyLevel,
  domain: Domain,
): string[] {
  const sentences =
    projectDescription
      ?.split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 12)
      .slice(0, 2) ?? [];

  const datasetLine = datasetDescription?.trim();

  const core: string[] = [
    ...sentences,
    ...(datasetLine
      ? [`Relate every insight back to the dataset story: ${datasetLine.slice(0, 160)}${datasetLine.length > 160 ? "…" : ""}`]
      : []),
    `Calibrate rigor for a ${difficulty.toLowerCase()} audience in ${formatDomainLabel(domain)} — prioritize clarity over complexity.`,
    "Document assumptions, definitions, and any data quality checks you relied on.",
  ];

  return Array.from(new Set(core)).slice(0, 5);
}

function domainExercisePresets(domain: Domain): ExerciseItem[] {
  const label = formatDomainLabel(domain);
  return [
    {
      title: "Initial data audit",
      description: `Profile distributions, missingness, and units. Confirm the dataset matches the ${label.toLowerCase()} question you were asked.`,
    },
    {
      title: "Signal vs noise",
      description:
        "Separate structural trends from volatility. Identify one metric that is stable enough to track week over week.",
    },
    {
      title: "Hypothesis build",
      description:
        "State a falsifiable claim, map it to columns, and outline the exact aggregation that would support or refute it.",
    },
  ];
}

export function buildExercises(
  projectTitle: string,
  domain: Domain,
  aiQuestions: string | null | undefined,
): ExerciseItem[] {
  const lines = parseAiQuestionLines(aiQuestions);
  const fromLines: ExerciseItem[] = lines.map((line) => ({
    title: line.length > 90 ? `${line.slice(0, 87)}…` : line,
    description:
      "Work through this prompt with plots and summary tables. Capture the business implication, not just the arithmetic.",
  }));

  const presets = domainExercisePresets(domain);
  const merged = [...fromLines, ...presets];
  const deduped: ExerciseItem[] = [];
  const seen = new Set<string>();
  for (const item of merged) {
    const key = item.title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
  }

  if (deduped.length === 0) {
    return [
      {
        title: `Framing "${projectTitle}"`,
        description:
          "Write a tight problem statement: decision, stakeholders, success metric, and constraints grounded in the dataset.",
      },
      ...presets,
    ];
  }

  return deduped.slice(0, 6);
}

export function buildBusinessContext(
  projectTitle: string,
  projectDescription: string | null | undefined,
  datasetDescription: string | null | undefined,
  domain: Domain,
): string {
  return (
    projectDescription?.trim() ||
    datasetDescription?.trim() ||
    `You are analyzing "${projectTitle}" in ${formatDomainLabel(domain)}. The objective is to translate raw signals into a decision-ready narrative with clear visuals and defensible metrics.`
  );
}

export function buildLeadParagraph(
  projectDescription: string | null | undefined,
  datasetName: string | null,
  domain: Domain,
): string {
  return (
    projectDescription?.trim() ||
    `A hands-on lab using ${datasetName ?? "the linked dataset"} to practice structured analysis, communication, and quality checks in ${formatDomainLabel(domain).toLowerCase()}.`
  );
}

export function buildDatasetCardBody(
  datasetDescription: string | null | undefined,
  datasetName: string | null,
): string {
  return (
    datasetDescription?.trim() ||
    `${datasetName ?? "Dataset"}: structured observations you will explore, summarize, and connect to the project prompt.`
  );
}
