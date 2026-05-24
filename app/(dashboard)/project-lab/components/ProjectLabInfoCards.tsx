import { HiCircleStack } from "react-icons/hi2";
import { HiClipboardDocumentCheck } from "react-icons/hi2";
import { HiCheckCircle } from "react-icons/hi2";
import { FiDownload } from "react-icons/fi";
import type { ProjectLabViewModel } from "@/lib/project-lab/types";

interface ProjectLabInfoCardsProps {
  downloadHref: ProjectLabViewModel["downloadHref"];
  datasetCardBody: ProjectLabViewModel["datasetCardBody"];
}

export function ProjectLabInfoCards({
  downloadHref,
  datasetCardBody,
}: ProjectLabInfoCardsProps) {
  return (
    <div>
      <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3 text-[#14b8a6]">
          <HiCircleStack className="h-6 w-6 shrink-0" aria-hidden />
          <h2 className="text-lg font-semibold text-[#0f172a]">The Dataset</h2>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {datasetCardBody}
        </p>
        <a
          href={downloadHref}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#14b8a6] transition hover:text-[#0d9488]"
        >
          <FiDownload className="h-4 w-4" aria-hidden />
          Download preview
        </a>
      </section>
    </div>
  );
}
