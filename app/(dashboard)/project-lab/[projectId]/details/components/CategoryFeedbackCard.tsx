import {
  HiChartBar,
  HiSparkles,
  HiEye,
  HiShieldCheck,
  HiScale,
  HiWrenchScrewdriver,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

const categoryIconMap: Record<string, IconType> = {
  "data visualization": HiChartBar,
  "insight generation": HiSparkles,
  storytelling: HiEye,
  "bias & statistical awareness": HiShieldCheck,
  cleaning: HiWrenchScrewdriver,
};

const progressColorByScore = (score: number) => {
  if (score >= 85) return "bg-emerald-500";
  if (score >= 70) return "bg-amber-400";
  return "bg-rose-400";
};

const scoreTextColorByScore = (score: number) => {
  if (score >= 85) return "text-emerald-600";
  if (score >= 70) return "text-amber-600";
  return "text-rose-600";
};

interface CategoryFeedbackCardProps {
  area: string;
  score: number;
  feedback: string;
}

export function CategoryFeedbackCard({
  area,
  score,
  feedback,
}: CategoryFeedbackCardProps) {
  const Icon = categoryIconMap[area] ?? HiScale;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200  bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-[#F2F4F6] text-[#001736]">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
            Score
          </p>
          <p
            className={`mt-0.5 text-2xl font-semibold tabular-nums ${scoreTextColorByScore(score)}`}
          >
            {score}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#001736]">
          {area}
        </p>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
          {feedback}
        </p>

        <div className="mt-5">
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full transition-all ${progressColorByScore(score)}`}
              style={{ width: `${score}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">{score}% proficiency</p>
        </div>
      </div>
    </article>
  );
}
