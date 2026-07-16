import type { ReactNode } from "react";
import {
  BiBot,
  BiCheckCircle,
  BiTask,
} from "react-icons/bi";
import { FEATURES_COPY } from "../../lib/constants";

type FeatureId = (typeof FEATURES_COPY.cards)[number]["id"];

export function DatasetPreview() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-landing-text-muted">
          Retail performance
        </span>
        <span className="size-2 rounded-full bg-landing-success" />
      </div>
      <div className="grid grid-cols-[1.4fr_0.8fr_0.7fr] gap-2 text-[11px] text-landing-text-secondary">
        <span className="rounded-lg bg-landing-surface px-2 py-1.5">
          Region
        </span>
        <span className="rounded-lg bg-landing-surface px-2 py-1.5">Sales</span>
        <span className="rounded-lg bg-landing-surface px-2 py-1.5">Goal</span>
        <span className="rounded-lg bg-landing-surface px-2 py-1.5">North</span>
        <span className="rounded-lg bg-landing-surface px-2 py-1.5">$124K</span>
        <span className="rounded-lg bg-landing-surface px-2 py-1.5">$110K</span>
      </div>
    </div>
  );
}

export function MentorPreview() {
  return (
    <div className="flex items-start gap-2">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-landing-blue/10 text-landing-blue">
        <BiBot className="size-4" aria-hidden="true" />
      </span>
      <p className="rounded-2xl rounded-tl-md bg-landing-surface px-3 py-2 text-[11px] leading-relaxed text-landing-text-secondary">
        What changed after you split results by region?
      </p>
    </div>
  );
}

export function LearningPathPreview() {
  return (
    <ol className="space-y-2">
      {["Frame the question", "Explore the data", "Share the insight"].map(
        (step, index) => (
          <li key={step} className="flex items-center gap-2 text-[11px]">
            <span
              className={`flex size-5 items-center justify-center rounded-full font-semibold ${
                index === 0
                  ? "bg-landing-success/10 text-landing-success"
                  : "bg-landing-surface text-landing-text-muted"
              }`}
            >
              {index === 0 ? (
                <BiCheckCircle className="size-3.5" aria-hidden="true" />
              ) : (
                index + 1
              )}
            </span>
            <span className="text-landing-text-secondary">{step}</span>
          </li>
        ),
      )}
    </ol>
  );
}

export function FeedbackPreview() {
  return (
    <div className="rounded-xl border border-landing-border bg-landing-surface px-3 py-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium text-landing-navy">
          Analysis clarity
        </span>
        <span className="text-[11px] font-semibold text-landing-success">
          Strong
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-landing-border">
        <div className="h-full w-3/4 rounded-full bg-landing-success" />
      </div>
    </div>
  );
}

export function ProgressPreview() {
  return (
    <div className="flex h-16 items-end gap-2 px-1 pt-2">
      {[38, 54, 47, 72, 88].map((height, index) => (
        <div key={height} className="flex flex-1 flex-col items-center gap-1.5">
          <div
            className={`w-full rounded-t-md ${
              index === 4 ? "bg-landing-success" : "bg-landing-blue/20"
            }`}
            style={{ height: `${height}%` }}
          />
          <span className="size-1 rounded-full bg-landing-border" />
        </div>
      ))}
    </div>
  );
}

export function PortfolioPreview() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-landing-border bg-landing-surface px-3 py-2">
      <span className="flex size-8 items-center justify-center rounded-lg bg-landing-blue/10 text-landing-blue">
        <BiTask className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-medium text-landing-navy">
          Customer retention analysis
        </p>
        <p className="mt-0.5 text-[10px] text-landing-text-muted">
          Project complete
        </p>
      </div>
    </div>
  );
}

const featurePreviews: Record<FeatureId, ReactNode> = {
  datasets: <DatasetPreview />,
  mentor: <MentorPreview />,
  paths: <LearningPathPreview />,
  feedback: <FeedbackPreview />,
  progress: <ProgressPreview />,
  portfolio: <PortfolioPreview />,
};

export function getFeaturePreview(id: FeatureId) {
  return featurePreviews[id];
}
