import { BiBot, BiCheckCircle, BiData, BiLineChart } from "react-icons/bi";
import type { LearningJourneyStep } from "../../lib/constants";

type JourneyStageProps = {
  step: LearningJourneyStep;
  showBackgroundNumber?: boolean;
};

function ProjectPreview() {
  return (
    <div className="rounded-2xl border border-landing-border bg-landing-surface p-landing-3 shadow-landing-card">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-landing-text-muted">
        Project brief
      </p>
      <p className="mt-2 text-base font-semibold text-landing-navy">
        Customer retention analysis
      </p>
      <div className="mt-landing-3 flex flex-wrap gap-2">
        <span className="rounded-landing-badge bg-landing-blue/10 px-2 py-1 text-[11px] font-medium text-landing-blue">
          Retail
        </span>
        <span className="rounded-landing-badge bg-landing-surface-muted px-2 py-1 text-[11px] font-medium text-landing-text-secondary">
          Business context
        </span>
      </div>
    </div>
  );
}

function DatasetPreview() {
  const rows = [
    ["Customers", "12,480"],
    ["Fields", "18"],
    ["Questions", "4"],
  ] as const;

  return (
    <div className="rounded-2xl border border-landing-border bg-landing-surface p-landing-3 shadow-landing-card">
      <div className="flex items-center gap-2 text-landing-blue">
        <BiData className="size-5" aria-hidden="true" />
        <p className="text-sm font-semibold text-landing-navy">
          Dataset overview
        </p>
      </div>
      <dl className="mt-landing-3 divide-y divide-landing-border">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between py-2 text-sm"
          >
            <dt className="text-landing-text-secondary">{label}</dt>
            <dd className="font-semibold text-landing-navy">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function GuidancePreview() {
  return (
    <div className="rounded-2xl border border-landing-border bg-landing-surface p-landing-3 shadow-landing-card">
      <div className="flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-xl bg-landing-blue/10 text-landing-blue">
          <BiBot className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-landing-navy">AI Mentor</p>
          <p className="text-[11px] text-landing-text-muted">
            Contextual guidance
          </p>
        </div>
      </div>
      <p className="mt-landing-3 rounded-2xl rounded-tl-md bg-landing-surface-muted px-3 py-2 text-sm leading-relaxed text-landing-text-secondary">
        Start by grouping retention by first purchase month.
      </p>
    </div>
  );
}

function AnalysisPreview() {
  return (
    <div className="rounded-2xl border border-landing-border bg-landing-surface p-landing-3 shadow-landing-card">
      <div className="flex items-center justify-between gap-landing-2">
        <div className="flex items-center gap-2">
          <BiLineChart
            className="size-5 text-landing-blue"
            aria-hidden="true"
          />
          <p className="text-sm font-semibold text-landing-navy">
            Retention trend
          </p>
        </div>
        <span className="text-[11px] font-semibold text-landing-success">
          Insight ready
        </span>
      </div>
      <div
        aria-hidden="true"
        className="mt-landing-4 flex h-24 items-end gap-2"
      >
        {[42, 58, 51, 72, 86].map((height, index) => (
          <span
            key={height}
            style={{ height: `${height}%` }}
            className={`flex-1 rounded-t-md ${
              index === 4 ? "bg-landing-success" : "bg-landing-blue/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function FeedbackPreview() {
  const categories = ["Reasoning", "Clarity", "Recommendation"] as const;

  return (
    <div className="rounded-2xl border border-landing-border bg-landing-surface p-landing-3 shadow-landing-card">
      <div className="flex items-center gap-2">
        <BiCheckCircle
          className="size-5 text-landing-success"
          aria-hidden="true"
        />
        <p className="text-sm font-semibold text-landing-navy">
          Professional review
        </p>
      </div>
      <ul className="mt-landing-3 space-y-2">
        {categories.map((category) => (
          <li
            key={category}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-landing-text-secondary">{category}</span>
            <span className="font-medium text-landing-success">
              Developing well
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StagePreview({ step }: JourneyStageProps) {
  switch (step.id) {
    case "project":
      return <ProjectPreview />;
    case "dataset":
      return <DatasetPreview />;
    case "guidance":
      return <GuidancePreview />;
    case "analysis":
      return <AnalysisPreview />;
    case "feedback":
      return <FeedbackPreview />;
    default:
      return null;
  }
}

export default function JourneyStage({
  step,
  showBackgroundNumber = true,
}: JourneyStageProps) {
  return (
    <div className="relative overflow-hidden rounded-landing-card border border-landing-border bg-landing-surface-muted p-landing-3 sm:p-landing-4">
      {showBackgroundNumber ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-5 select-none text-9xl font-bold leading-none tracking-tighter text-landing-navy/5 sm:text-[10rem]"
        >
          {step.number}
        </span>
      ) : null}
      <div className="relative">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-landing-text-muted">
          In the workspace
        </p>
        <div className="mt-landing-3">
          <StagePreview step={step} />
        </div>
      </div>
    </div>
  );
}
