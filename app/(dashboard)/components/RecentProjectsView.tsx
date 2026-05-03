"use client";
import { GoArrowRight } from "react-icons/go";
import Link from "next/link";
import ProjectCard from "./ProjectCard";

const RecentProjectsView = () => (
  <div className="w-full">
    <div className="flex w-full mb-8 justify-between items-center">
      <p className="text-[24px] text-[#001736] font-bold">Recent Projects</p>
      <Link
        href={"/project-lab"}
        className="group text-[#0058BB] flex items-center font-bold gap-2 transition-colors duration-200 cursor-pointer hover:text-[#004795]"
        type="button"
      >
        <p>View Archive</p>
        <span className="transition-transform duration-200 ease-out group-hover:translate-x-1 inline-flex">
          <GoArrowRight />
        </span>
      </Link>
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
      />
      <ProjectCard
        category="SUPPLY CHAIN"
        title="Demand Forecasting v2.1"
        description="Optimizing warehouse allocation using XGBoost and seasonal trend decomposition."
        completedAgo="2d ago"
        solutionLink="#"
        grade="A-"
        aiReview={`"Model handling of outlier event 'Black Friday' was precise, but data normalization for 2021 was slightly aggressive. Consider log-transforms next time."`}
      />
      <ProjectCard
        category="SUPPLY CHAIN"
        title="Demand Forecasting v2.1"
        description="Optimizing warehouse allocation using XGBoost and seasonal trend decomposition."
        completedAgo="2d ago"
        solutionLink="#"
        grade="A-"
        aiReview={`"Model handling of outlier event 'Black Friday' was precise, but data normalization for 2021 was slightly aggressive. Consider log-transforms next time."`}
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
      />
    </div>
  </div>
);

export default RecentProjectsView;
