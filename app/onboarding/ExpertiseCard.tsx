import React from "react";

export interface ExpertiseCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isSelected: boolean;
  onClick: () => void;
}

export interface ExpertiseOption {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  value: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
}

export const ExpertiseCard = ({
  title,
  description,
  icon: Icon,
  isSelected,
  onClick,
}: ExpertiseCardProps) => (
  <div
    className={`rounded-2xl border p-6 cursor-pointer transition ${
      isSelected
        ? "border-cyan-300 bg-cyan-50 shadow-sm"
        : "border-slate-200 bg-slate-50"
    }`}
    onClick={onClick}
  >
    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-cyan-600">
      <Icon className="h-5 w-5" />
    </div>
    <h3 className="mt-5 text-base font-semibold text-slate-900">{title}</h3>
    <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
  </div>
);
