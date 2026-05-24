import type { AIReviewInterface } from "@/app/api/projects/[id]/chat/chat.service";

const gradeLabelForPercent = (percentString: string) => {
  const value = Number(percentString.replace("%", ""));

  if (Number.isNaN(value)) return "N/A";
  if (value >= 94) return "A";
  if (value >= 90) return "A-";
  if (value >= 87) return "B+";
  if (value >= 83) return "B";
  if (value >= 80) return "B-";
  if (value >= 77) return "C+";
  if (value >= 73) return "C";
  if (value >= 70) return "C-";
  return "D";
};

interface EvaluationOverviewCardProps {
  review: AIReviewInterface;
}

export function EvaluationOverviewCard({
  review,
}: EvaluationOverviewCardProps) {
  const gradeLabel = gradeLabelForPercent(review.overallGrade);

  return (
    <section className="relative overflow-hidden mb-10 rounded-2xl bg-[linear-gradient(148deg,#001736_0%,#002B5B_100%)] text-white shadow-[0_24px_60px_rgba(0,23,54,0.22)]">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#58FBDA]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/4 h-48 w-48 rounded-full bg-[#7594CA]/20 blur-3xl" />

      <div className="relative p-8 sm:p-10">
        <div className="flex flex-col gap-6 items-start">
          <div className="max-w-2xl space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#58FBDA]">
              Performance review
            </p>
          </div>

          <div className="font-semibold">
            <span className="text-[72px] inline-block leading-none">
              {review.overallGrade}
            </span>{" "}
            <span>- Grade: {gradeLabel}</span>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-[220px_1fr] md:items-stretch">
          <div className="rounded-xl border border-white/10 bg-[rgba(255,255,255,0.06)] p-6 backdrop-blur-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7594CA]">
              Summary
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-100 sm:text-[15px]">
              {review.overallSummary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
