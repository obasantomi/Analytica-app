import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
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

const RecentProjectsView = async () => {
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
        take: 3,
      });
    }
  }

  return (
    <div className="w-full">
      <div className="flex w-full mb-8 justify-between items-center">
        <p className="text-[24px] text-[#001736] font-bold">Recent Projects</p>
        <Link
          href={"/project-lab"}
          className="group text-[#0058BB] flex items-center font-bold gap-2 transition-colors duration-200 cursor-pointer hover:text-[#004795]"
          type="button"
        >
          <p>View Archive</p>
          <FaChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="flex gap-7.5 w-full overflow-x-scroll">
        {userProjects.length === 0 ? (
          <EmptyProjectView />
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

export default RecentProjectsView;
