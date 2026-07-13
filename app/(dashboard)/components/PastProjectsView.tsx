import ProjectCard from "./ProjectCard";
import EmptyProjectView from "./EmptyProjectView";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { AIReviewInterface } from "@/app/api/projects/[id]/chat/chat.service";

function timeAgo(date?: Date | null) {
  if (!date) return "In progress";
  const diff = Date.now() - new Date(date).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

const PastProjectsView = async () => {
  const session = await getServerSession();

  let userProjects: any[] = [];

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (user) {
      userProjects = await prisma.userProject.findMany({
        where: { userId: user.id },
        include: { project: true },
        orderBy: { updatedAt: "desc" },
      });
    }
  }

  return (
    <div className="w-full">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[24px] text-[#001736] font-bold">Past Projects</p>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            A total view of all completed projects, organized into project cards
            for quick review.
          </p>
        </div>

        <div className="rounded-sm bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          Total projects: {userProjects.length}
        </div>
      </div>

      <div className="flex w-full overflow-x-scroll lg:grid gap-5 content-center justify-items-start grid-cols-[repeat(auto-fit,minmax(530px,1fr))] mt-20">
        {userProjects.length === 0 ? (
          <EmptyProjectView
            title="No Projects Yet"
            description="Start your first project to begin building your professional portfolio and unlocking AI insights."
          />
        ) : (
          userProjects.map((up) => (
            <ProjectCard
              key={up.id}
              projectId={up.project.id}
              category={up.project.category || up.project.domain || ""}
              title={up.project.title}
              description={up.project.description || ""}
              completedAgo={timeAgo(up.completedAt || up.lastActivityAt)}
              solutionLink={undefined}
              grade={up.grade}
              aiReview={
                (up.aiFeedback as AIReviewInterface)?.overallSummary ??
                "No AI review yet"
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PastProjectsView;
