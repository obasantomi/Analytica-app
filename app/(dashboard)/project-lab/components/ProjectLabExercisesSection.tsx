import { QuestionInterface } from "@/app/api/projects/[id]/chat/chat.service";
import { ExerciseCard } from "./ExerciseCard";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { HiChartBarSquare } from "react-icons/hi2";
import { HiBeaker } from "react-icons/hi2";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

interface ProjectLabExercisesSectionProps {
  exercises: QuestionInterface;
}

const QuestionIcon = HiChartBarSquare;

export function ProjectLabExercisesSection({
  exercises,
}: ProjectLabExercisesSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xs font-semibold tracking-[0.2em] text-slate-500">
        CRITICAL THINKING EXERCISES
      </h2>
      <ExerciseCard
        variant="featured"
        title={exercises[0]?.hypothesis}
        questions={
          exercises[0]?.questions.map((q) => ({
            text: q.question,
            icon: <QuestionIcon className="h-5 w-5" aria-hidden />,
          })) || []
        }
        icon={<HiQuestionMarkCircle className="h-6 w-6" aria-hidden />}
        className="lg:flex-1"
      />

      <div className="grid  grid-cols-1 gap-4 xl:grid-cols-2 lg:gap-4">
        {exercises.slice(1).map((ex, i) => (
          <ExerciseCard
            key={i}
            variant="default"
            title={ex.hypothesis}
            questions={ex.questions.map((q) => ({
              text: q.question,
              icon: <QuestionIcon className="h-5 w-5" aria-hidden />,
            }))}
            icon={<HiBeaker className="h-5 w-5" aria-hidden />}
          />
        ))}
      </div>
    </section>
  );
}
