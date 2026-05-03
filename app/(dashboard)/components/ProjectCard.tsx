import { FiCheckCircle, FiExternalLink, FiLink } from "react-icons/fi";

type ProjectCardProps = {
  category: string;
  title: string;
  description: string;
  completedAgo: string;
  solutionLink?: string;
  grade?: string;
  aiReview: string;
  onViewReview?: () => void;
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
}: ProjectCardProps) {
  return (
    <div className=" relative group flex cursor-pointer max-w-140 bg-[#F2F4F6] w-full rounded gap-1">
      <div className="absolute hidden group-hover:block pointer-events-none inset-0 bg-black/10 " />
      {/* LEFT PANEL */}
      <div className="bg-white rounded w-full max-w-100 p-6 pb-42.5  border">
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
        <h2 className="text-2xl font-bold text-slate-900 mb-3">{title}</h2>

        {/* Description */}
        <p className="text-slate-600 leading-relaxed mb-6">{description}</p>

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
            <>
              <span className="text-slate-300">|</span>

              <div className="flex items-center md:whitespace-nowrap gap-2 text-slate-700">
                <FiCheckCircle className="text-green-600" />
                Grade: {grade}
              </div>
            </>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="bg-emerald-900 w-full min-w-55.5 text-white rounded p-6 flex flex-col justify-between">
        <div>
          <p className="text-emerald-300 text-sm font-semibold mb-3">
            AI CRITIQUE
          </p>

          <p className="text-emerald-100 leading-relaxed whitespace-pre-line">
            {aiReview}
          </p>
        </div>

        <button
          onClick={onViewReview}
          className="mt-6 flex items-center gap-2 text-emerald-300 font-medium hover:underline"
        >
          Detailed Review
          <FiExternalLink />
        </button>
      </div>
    </div>
  );
}
