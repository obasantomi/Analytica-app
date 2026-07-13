"use client";

import { FiCheckCircle, FiExternalLink, FiLink } from "react-icons/fi";
import Link from "next/link";

type ProjectCardProps = {
  category: string;
  title: string;
  description: string;
  completedAgo: string;
  solutionLink?: string;
  grade?: string;
  aiReview: string;
  onViewReview?: () => void;
  projectId?: string;
};

export default function ProjectCard({
  category,
  title,
  description,
  completedAgo,
  solutionLink,
  grade,
  aiReview,
  onViewReview,
  projectId,
}: ProjectCardProps) {
  return (
    <div className="relative group flex w-full max-w-140 cursor-pointer flex-col gap-1 rounded bg-[#F2F4F6] md:flex-row">
      <div className="absolute hidden group-hover:block pointer-events-none inset-0 bg-black/10 " />
      {/* LEFT PANEL */}
      <div className="w-full rounded border bg-white p-4 pb-24 sm:p-6 sm:pb-42.5 md:max-w-100">
        {/* Top row */}
        <div className="flex justify-between gap-1 items-center mb-4">
          <span className="text-[12px] whitespace-nowrap bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
            {category}
          </span>

          <span className="text-sm text-slate-500">
            Completed {completedAgo}
          </span>
        </div>

        {/* Title */}
        <h2 className="mb-3 text-xl font-bold text-slate-900 sm:text-2xl">
          {title}
        </h2>

        {/* Description */}
        <p className="mb-6 text-[11px] leading-relaxed text-slate-600 sm:text-xs">
          {description}
        </p>

        {/* Bottom row */}
        <div className="flex items-center gap-4 text-sm">
          {solutionLink && (
            <a
              href={solutionLink}
              className="flex items-center gap-2 text-blue-600 font-medium hover:underline"
            >
              <FiLink />
              Solution
            </a>
          )}

          {grade && (
            <div className="flex items-center md:whitespace-nowrap gap-2 text-slate-700">
              <FiCheckCircle className="text-green-600" />
              Grade: {grade}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex w-full flex-col justify-between gap-2 rounded bg-emerald-900 p-4 text-white sm:p-6 md:min-w-55.5">
        <div>
          <p className="text-emerald-300 text-sm  font-semibold mb-3">
            AI CRITIQUE
          </p>

          <p className="text-emerald-100 ">{aiReview}</p>
        </div>

        {projectId && (
          <Link
            href={`/project-lab/${projectId}/details`}
            className="flex items-center gap-2  text-[#58FBDA] font-medium hover:underline"
          >
            <FiLink />
            More details
          </Link>
        )}
      </div>
    </div>
  );
}
