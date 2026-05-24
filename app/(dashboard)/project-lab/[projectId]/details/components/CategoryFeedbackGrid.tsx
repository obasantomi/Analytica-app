import type { AIReviewInterface } from "@/app/api/projects/[id]/chat/chat.service";
import { CategoryFeedbackCard } from "./CategoryFeedbackCard";

interface CategoryFeedbackGridProps {
  categoryFeedback: AIReviewInterface["categoryFeedback"];
}

export function CategoryFeedbackGrid({
  categoryFeedback,
}: CategoryFeedbackGridProps) {
  return (
    <section className="space-y-6 mb-10">
      <div className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500">
          Category feedback
        </p>
        <h3 className="text-xl font-semibold text-[#001736] sm:text-2xl">
          Strengths and improvement areas
        </h3>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          Actionable insight across visualization, storytelling, cleaning, bias,
          and insight generation.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categoryFeedback.map((item) => (
          <CategoryFeedbackCard
            key={item.area}
            area={item.area}
            score={item.score}
            feedback={item.feedback}
          />
        ))}
      </div>
    </section>
  );
}
