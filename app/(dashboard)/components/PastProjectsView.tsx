import ProjectCard from "./ProjectCard";

const projects = [
  {
    category: "SUPPLY CHAIN",
    title: "Demand Forecasting v2.1",
    description:
      "Optimizing warehouse allocation using XGBoost and seasonal trend decomposition.",
    completedAgo: "2d ago",
    solutionLink: "#",
    grade: "A-",
    aiReview: `"Model handling of outlier event 'Black Friday' was precise, but data normalization for 2021 was slightly aggressive. Consider log-transforms next time."`,
  },
  {
    category: "MARKETING",
    title: "Churn Prediction Suite",
    description:
      "Segmenting customer behavior with classification models and targeted retention campaigns.",
    completedAgo: "5d ago",
    solutionLink: "#",
    grade: "A",
    aiReview: `"Feature selection was strong and campaign uplift was well measured. Explore additional behavioral signals for even richer targeting."`,
  },
  {
    category: "FINANCE",
    title: "Cash Flow Optimizer",
    description:
      "Forecasting monthly cash needs with scenario modeling and liquidity insights.",
    completedAgo: "1w ago",
    solutionLink: "#",
    grade: "B+",
    aiReview: `"The scenario analysis captured variability effectively, but a second pass on outlier handling would improve precision."`,
  },
  {
    category: "OPERATIONS",
    title: "Inventory Rebalance",
    description:
      "Rebalancing stock across distribution centers to reduce holding costs and improve fill rate.",
    completedAgo: "10d ago",
    solutionLink: "#",
    grade: "A",
    aiReview: `"Excellent operational framing and a clear path to efficiency. Next time, test alternate demand windows for deeper robustness."`,
  },
  {
    category: "RETAIL",
    title: "Customer Segmentation",
    description:
      "Building high-value clusters for personalized merchandising and loyalty programs.",
    completedAgo: "2w ago",
    solutionLink: "#",
    grade: "A",
    aiReview: `"Segments are meaningful and actionable. Consider validating with a second data source to confirm customer stability."`,
  },
];

const PastProjectsView = () => (
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
        Total projects: {projects.length}
      </div>
    </div>

    <div className="flex w-full overflow-x-scroll lg:grid gap-5  content-center justify-items-center grid-cols-[repeat(auto-fit,minmax(530px,1fr))]">
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  </div>
);

export default PastProjectsView;
