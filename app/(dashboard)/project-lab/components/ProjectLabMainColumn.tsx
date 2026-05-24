"use client";
import { ViewModel } from "../[projectId]/page";
import { DatasetInfoBox } from "./DatasetInfoBox";

import { ProjectLabExercisesSection } from "./ProjectLabExercisesSection";
import { ProjectLabHeader } from "./ProjectLabHeader";
import { ProjectLabInfoCards } from "./ProjectLabInfoCards";
import { useParams } from "next/navigation";

interface ProjectLabMainColumnProps {
  viewModel: ViewModel;
}

export function ProjectLabMainColumn({ viewModel }: ProjectLabMainColumnProps) {
  const { projectId } = useParams();
  console.log(projectId);

  return (
    <div className="min-w-0 w-full max-w-none space-y-8">
      <ProjectLabHeader
        title={viewModel.projectTitle}
        leadParagraph={viewModel.leadParagraph}
      />
      <ProjectLabInfoCards
        downloadHref={viewModel.downloadHref}
        datasetCardBody={viewModel.datasetCardBody}
      />
      <ProjectLabExercisesSection exercises={viewModel.exercises} />
      <DatasetInfoBox
        description={viewModel.businessContext}
        stakeholderQuestions={viewModel.stakeholderQuestions}
        allQuestions={viewModel.allQuestions}
        downloadHref={`/api/projects/${projectId}/download`}
        projectId={projectId as string}
      />
    </div>
  );
}
