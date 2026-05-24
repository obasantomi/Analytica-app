import type { ReactNode } from "react";
import { FiArrowRight } from "react-icons/fi";

export interface ExerciseCardQuestion {
  text: string;
  icon?: ReactNode;
}

export interface ExerciseCardProps {
  title: string;
  questions: ExerciseCardQuestion[];
  variant: "featured" | "default";
  icon?: ReactNode;
  className?: string;
}

export function ExerciseCard({
  title,
  questions,
  variant,
  icon,
  className,
}: ExerciseCardProps) {
  const isFeatured = variant === "featured";

  return (
    <article
      className={`relative flex flex-col rounded-2xl border transition-shadow hover:shadow-lg ${
        isFeatured
          ? "min-h-55 border-slate-700/80 bg-[#0f172a] p-6 text-white sm:min-h-65 sm:p-8"
          : "border-slate-200 bg-slate-100/90 p-5 text-slate-900"
      }${className ? ` ${className}` : ""}`}
    >
      <div className="flex items-start gap-4">
        {icon ? (
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-lg ${
              isFeatured
                ? "border-[#14b8a6]/40 bg-[#14b8a6]/10 text-[#2dd4bf]"
                : "border-slate-300 bg-white text-[#14b8a6]"
            }`}
          >
            {icon}
          </div>
        ) : null}
        <div className="min-w-0 flex-1 pr-10 sm:pr-12">
          <h3
            className={`font-semibold leading-snug ${
              isFeatured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
            }`}
          >
            {title}
          </h3>
          <div
            className={`${isFeatured ? "mt-8 space-y-6" : "mt-8 space-y-6"}`}
          >
            {questions.map((q, i) => (
              <p
                key={i}
                className={`text-sm leading-relaxed ${
                  isFeatured ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {q.icon ? (
                  <span className="inline-flex mr-3 align-middle">
                    {q.icon}
                  </span>
                ) : null}
                <span className="align-middle">{q.text}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
      {isFeatured ? (
        <div className="mt-auto flex justify-end pt-6">
          <span
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#14b8a6] text-[#0f172a] shadow-md"
            aria-hidden
          >
            <FiArrowRight className="h-5 w-5" />
          </span>
        </div>
      ) : null}
    </article>
  );
}
