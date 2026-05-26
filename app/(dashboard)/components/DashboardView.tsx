import { prisma } from "@/prisma/client";
import DashboardStatCard from "./DashboardStatCard";
import RecentProjectsView from "./RecentProjectsView";
import SkillRadarCard from "./SkillRadarCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const session = await getServerSession();

if (!session?.user?.email) {
  redirect("/sign-in");
}

const user = await prisma.user.findUnique({
  where: { email: session.user.email },
});

if (!user) {
  redirect("/sign-up");
}

const projectCount = await prisma.userProject.count({
  where: { userId: user.id },
});

const DashboardView = () => (
  <section className="px-5 lg:px-10 pt-7.5 pb-17 w-full">
    <div className="flex flex-col items-start lg:flex-row w-full lg:items-center gap-10 justify-between">
      <div className="flex-1 flex gap-5 flex-col">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
          <p className="mt-3 max-w-xl text-sm text-slate-600">
            Deepen your expertise through industry-grade challenges. Your path
            is defined by the problems you solve.
          </p>
        </div>

        <div>
          <div className="italic text-[13px] rounded max-w-md p-3 bg-[#001736] flex gap-2 text-white">
            <img src="/images/Icon.svg" alt="" className="text-[#001736]" />
            <p>Powered by AI to adapt, guide, and accelerate your growth.</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <DashboardStatCard title="Total Projects" value={projectCount} />
      </div>
    </div>

    <SkillRadarCard />

    <RecentProjectsView />
  </section>
);

export default DashboardView;
