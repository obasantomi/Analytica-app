import DashboardStatCard from "./DashboardStatCard";
import RecentProjectsView from "./RecentProjectsView";
import SkillRadarCard from "./SkillRadarCard";

type DashboardViewProps = {
  projectCount: number;
};

const DashboardView = ({ projectCount }: DashboardViewProps) => (
  <section>
    <div className="flex flex-col items-start justify-between gap-6 w-full lg:flex-row lg:items-center lg:gap-10">
      <div className="flex flex-1 flex-col gap-4 sm:gap-5">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-2 max-w-xl text-xs text-slate-600 sm:mt-3 sm:text-sm">
            Deepen your expertise through industry-grade challenges. Your path
            is defined by the problems you solve.
          </p>
        </div>

        <div>
          <div className="flex max-w-md items-start gap-2 rounded bg-[#001736] p-2.5 text-[12px] italic text-white sm:p-3 sm:text-[13px]">
            <img
              src="/images/Icon.svg"
              alt=""
              className="mt-0.5 text-[#001736]"
            />
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
