import DashboardStatCard from "./DashboardStatCard";
import ProjectCard from "./ProjectCard";
import SkillRadarCard from "./SkillRaderChart";
import { GoArrowRight } from "react-icons/go";
import { LuBrainCircuit } from "react-icons/lu";

const DashboardView = () => (
  <section className="px-10 pt-7.5 pb-20 h-full w-full">
    <div className="flex w-full items-center gap-10 justify-between">
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
        <DashboardStatCard title="Total Projects" value={12} />
        <DashboardStatCard title="Current Streak" value="4 wks" />
      </div>
    </div>

    <SkillRadarCard />

    <div className="w-full">
      <div className="flex w-full mb-8 justify-between items-center">
        <p className="text-[24px] text-[#001736] font-bold">Recent Projects</p>
        <button
          className="group text-[#0058BB] flex items-center font-bold gap-2 transition-colors duration-200 cursor-pointer hover:text-[#004795]"
          type="button"
        >
          <p>View Archive</p>
          <span className="transition-transform duration-200 ease-out group-hover:translate-x-1 inline-flex">
            <GoArrowRight />
          </span>
        </button>
      </div>

      <div className="flex gap-7.5 w-full overflow-x-scroll">
        {/* First Project Card */}
        <ProjectCard
          category="SUPPLY CHAIN"
          title="Demand Forecasting v2.1"
          description="Optimizing warehouse allocation using XGBoost and seasonal trend decomposition."
          completedAgo="2d ago"
          solutionLink="#"
          grade="A-"
          aiReview={`"Model handling of outlier event 'Black Friday' was precise, but data normalization for 2021 was slightly aggressive. Consider log-transforms next time."`}
          // onViewReview={() => console.log("Open review")}
        />

        {/* Second Project Card */}
        <ProjectCard
          category="SUPPLY CHAIN"
          title="Demand Forecasting v2.1"
          description="Optimizing warehouse allocation using XGBoost and seasonal trend decomposition."
          completedAgo="2d ago"
          solutionLink="#"
          grade="A-"
          aiReview={`"Model handling of outlier event 'Black Friday' was precise, but data normalization for 2021 was slightly aggressive. Consider log-transforms next time."`}
          // onViewReview={() => console.log("Open review")}
        />

        {/* Third Project Card */}
        <ProjectCard
          category="SUPPLY CHAIN"
          title="Demand Forecasting v2.1"
          description="Optimizing warehouse allocation using XGBoost and seasonal trend decomposition."
          completedAgo="2d ago"
          solutionLink="#"
          grade="A-"
          aiReview={`"Model handling of outlier event 'Black Friday' was precise, but data normalization for 2021 was slightly aggressive. Consider log-transforms next time."`}
          // onViewReview={() => console.log("Open review")}
        />
      </div>
    </div>
  </section>
);

export default DashboardView;
