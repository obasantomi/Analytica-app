import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { AIMentorPanel } from "@/app/(dashboard)/project-lab/components/AIMentorPanel";
import { ProjectLabMainColumn } from "@/app/(dashboard)/project-lab/components/ProjectLabMainColumn";

import { formatDomainLabel } from "@/lib/project-lab/projectLabCopy";
import { Domain } from "@/app/generated/prisma/client";
import { QuestionInterface } from "@/app/api/projects/[id]/chat/chat.service";

interface Props {
  params: Promise<{
    projectId: string;
  }>;
}

export interface QuestionWithMetadata {
  id: string;
  question: string;
  type?: string;
  hint?: string;
}

export interface ViewModel {
  projectTitle: string;
  exercises: QuestionInterface;
  stakeholderQuestions: string[];
  allQuestions: QuestionWithMetadata[];
  downloadHref: string;
  projectDescription: string | null;
  leadParagraph: string;
  datasetName: string | null;
  datasetCardBody: string;
  businessContext: string;
  objectives: string[];
}

const page = async ({ params }: Props) => {
  const session = await getServerSession();

  if (!session?.user.email) {
    redirect("/sign-in");
  }

  // Find user by email from the session
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/sign-up");
  }

  const { projectId } = await params;
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      title: true,
      description: true,
      difficulty: true,
      domain: true,
      dataset: {
        select: {
          name: true,
          description: true,
          datasetConfig: true,
        },
      },
    },
  });

  const userProject = await prisma.userProject.findUnique({
    where: {
      userId_projectId: {
        userId: user.id,
        projectId: projectId,
      },
    },
  });

  if (!project || !userProject) {
    return <div className="text-black">Project not found</div>;
  }

  function buildLeadParagraph(
    projectDescription: string | null | undefined,
    datasetName: string | null,
    domain: Domain,
  ): string {
    return (
      projectDescription?.trim() ||
      `A hands-on lab using ${datasetName ?? "the linked dataset"} to practice structured analysis, communication, and quality checks in ${formatDomainLabel(domain).toLowerCase()}.`
    );
  }

  const downloadHref = `/api/projects/${projectId}/download`;
  const exercises: QuestionInterface =
    userProject.aiQuestions as QuestionInterface;

  // Extract all questions from all exercises
  const allQuestions: QuestionWithMetadata[] = exercises
    ? exercises.flatMap((exercise) =>
        exercise.questions.map((q) => ({
          id: q.id,
          question: q.question,
          type: q.type,
          hint: q.hint,
        })),
      )
    : [];

  const viewModel: ViewModel = {
    projectTitle: project.title,
    exercises: userProject.aiQuestions as QuestionInterface,
    stakeholderQuestions: exercises[0]?.questions.map((q) => q.question),
    allQuestions,
    downloadHref,
    projectDescription: project.description,
    leadParagraph: buildLeadParagraph(
      project.description,
      project.dataset?.name ?? null,
      project.domain,
    ),
    datasetName: project.dataset?.name ?? null,
    datasetCardBody:
      project.dataset?.description ??
      `${project.dataset?.name ?? "Dataset"}: structured observations you will explore, summarize, and connect to the project prompt.`,
    businessContext: `You are analyzing "${project.title}" in ${formatDomainLabel(
      project.domain,
    )}. The objective is to translate raw signals into a decision-ready narrative with clear visuals and defensible metrics.`,
    objectives: [
      `Understand the dataset and its relevance to the project prompt.`,
      `Perform exploratory data analysis to uncover insights and patterns.`,
      `Communicate findings effectively through visualizations and narratives.`,
    ],
  };

  return (
    <div className="">
      <div className="h-full lg:mr-109.75 bg-[#f8fafc] pb-5 p-10 lg:pb-20 text-slate-900 ">
        <div className="mx-auto w-full">
          <ProjectLabMainColumn viewModel={viewModel} />
        </div>
      </div>
      <AIMentorPanel projectId={projectId} />
    </div>
  );
};

export default page;
