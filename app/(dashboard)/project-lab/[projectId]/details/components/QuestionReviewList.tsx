"use client";

import type { AIReviewInterface } from "@/app/api/projects/[id]/chat/chat.service";
import { QuestionReviewCard } from "./QuestionReviewCard";

interface QuestionReviewListProps {
  questionReviews: AIReviewInterface["questionReviews"];
}

export function QuestionReviewList({
  questionReviews,
}: QuestionReviewListProps) {
  if (!questionReviews.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-semibold text-[#001736]">
          No question reviews available yet.
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Generate AI feedback on project questions to surface ideal responses
          and review notes.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500">
          Question review
        </p>
        <h3 className="text-xl font-semibold text-[#001736] sm:text-2xl">
          AI feedback per question
        </h3>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          Expand each prompt to compare the ideal response with personalized
          feedback on your answer.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {questionReviews.map((review, index) => (
          <QuestionReviewCard
            key={review.questionId}
            index={index}
            questionId={review.questionId}
            question={review.question}
            aiIdealAnswer={review.aiIdealAnswer}
            feedback={review.feedback}
          />
        ))}
      </div>
    </section>
  );
}
