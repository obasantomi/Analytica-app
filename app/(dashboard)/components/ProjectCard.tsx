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
    <div className="flex bg-[#F2F4F6] w-162.5 rounded gap-1">
      {/* LEFT PANEL */}
      <div className="bg-white rounded w-100 p-6 pb-42.5  border">
        {/* Top row */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-md">
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

              <div className="flex items-center gap-2 text-slate-700">
                <FiCheckCircle className="text-green-600" />
                Grade: {grade}
              </div>
            </>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="bg-emerald-900 w-61.5 text-white rounded p-6 flex flex-col justify-between">
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
