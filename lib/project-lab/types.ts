import { QuestionInterface } from "@/app/api/projects/[id]/chat/chat.service";
import type { DifficultyLevel, Domain } from "@/app/generated/prisma/client";

export type DatasetConfigFields = {
  startYear?: number;
  endYear?: number;
  indicator?: string;
  country?: string;
};

export interface ExerciseItem {
  title: string;
  description: string;
}

export interface ProjectLabProjectInput {
  title: string;
  description: string | null;
  difficulty: DifficultyLevel;
  domain: Domain;
  dataset: {
    name: string;
    description: string | null;
    datasetConfig: unknown;
  } | null;
}

export interface ProjectLabUserProjectInput {
  aiQuestions: string | null;
  aiFeedback: string | null;
}

export interface ProjectLabViewModel {
  objectives: string[];
  exercises: QuestionInterface;
  stakeholderQuestions: string[];
  businessContext: string;
  downloadHref: string;
  timeEstimate: string;
  fileType: string;
  projectTitle: string;
  projectDescription: string | null;
  /** Shown under the title (includes fallback copy) */
  leadParagraph: string;
  datasetName: string | null;
  /** Body text for “The Dataset” card */
  datasetCardBody: string;
  aiFeedback: string | null;
}
