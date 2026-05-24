import { AIReviewInterface } from "@/app/api/projects/[id]/chat/chat.service";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CategoryFeedbackGrid } from "./components/CategoryFeedbackGrid";
import { EvaluationOverviewCard } from "./components/EvaluationOverviewCard";
import { QuestionReviewList } from "./components/QuestionReviewList";

interface Props {
  params: Promise<{ projectId: string }>;
}

const page = async ({ params }: Props) => {
  const { projectId } = await params;
  const session = await getServerSession();

  if (!session?.user.email) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/sign-up");
  }

  const userProject = await prisma.userProject.findUnique({
    where: {
      userId_projectId: {
        projectId,
        userId: user.id,
      },
    },
  });

  if (!userProject) {
    redirect("/project-lab");
  }

  const aiFeedback = userProject.aiFeedback as AIReviewInterface | null;

  return (
    <div className="min-h-full w-full p-10 pb-20  text-slate-900 ">
      <div className="space-y-12">
        <header className=" mb-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500">
            AI Evaluation Results
          </p>
          <h1 className="text-2xl mb-3 font-semibold tracking-tight text-[#001736] sm:text-3xl">
            Your performance breakdown
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Review overall scoring, category-specific guidance, and AI feedback
            for each evaluated question.
          </p>
        </header>

        {aiFeedback ? (
          <div className="space-y-12">
            <EvaluationOverviewCard review={aiFeedback} />
            <CategoryFeedbackGrid
              categoryFeedback={aiFeedback.categoryFeedback}
            />
            <QuestionReviewList questionReviews={aiFeedback.questionReviews} />
          </div>
        ) : (
          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-center">
              <div>
                <h2 className="text-xl font-semibold text-[#001736]">
                  AI evaluation is not available yet.
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  After the project finishes, AI will generate a full
                  performance review for your dashboard. Return once the
                  analysis is completed or trigger an evaluation through the
                  project workflow.
                </p>
              </div>
              <div className="rounded-2xl bg-[linear-gradient(148deg,#001736_0%,#002B5B_100%)] p-6 text-white shadow-[0_20px_50px_rgba(0,23,54,0.18)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7594CA]">
                  Awaiting review
                </p>
                <p className="mt-3 text-2xl font-semibold">No AI data yet</p>
                <p className="mt-2 text-sm leading-6 text-[#7594CA]">
                  This page will display a polished breakdown once the AI
                  evaluation completes.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default page;
