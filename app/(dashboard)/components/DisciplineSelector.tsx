"use client";

import { useState } from "react";
import { MdPsychology } from "react-icons/md";
import { BiFilter } from "react-icons/bi";
import { BiLineChart } from "react-icons/bi";
import { MdInsertChart } from "react-icons/md";

interface Discipline {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const disciplines: Discipline[] = [
  {
    id: "THEORY",
    title: "Analytical thinking",
    description:
      "Focus on logic trees, hypothesis testing, and structured problem solving.",
    icon: <MdPsychology size={32} className="text-blue-500" />,
  },
  {
    id: "CLEANING",
    title: "Data Cleaning",
    description:
      "Master data munging, handling missing values, and normalization techniques.",
    icon: <BiFilter size={32} className="text-blue-500" />,
  },
  {
    id: "ANALYSIS",
    title: "Analysis",
    description:
      "Exploratory data analysis using statistical frameworks and trend prediction.",
    icon: <BiLineChart size={32} className="text-blue-500" />,
  },
  {
    id: "VISUALIZATION",
    title: "Visualization",
    description:
      "Storytelling with data. Design effective dashboards and informative plots.",
    icon: <MdInsertChart size={32} className="text-blue-500" />,
  },
];

interface DisciplineSelectorProps {
  selectedDiscipline: string | null;
  onSelect: (disciplineId: string) => void;
}

const DisciplineSelector = ({
  selectedDiscipline,
  onSelect,
}: DisciplineSelectorProps) => {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 bg-slate-900 text-white rounded font-semibold text-sm">
          1
        </div>
        <h2 className="text-xl font-semibold text-slate-900">
          Select Core Discipline
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-700">
        {disciplines.map((discipline) => (
          <button
            key={discipline.id}
            onClick={() => onSelect(discipline.id)}
            className={`p-6 rounded-lg text-left ${
              selectedDiscipline === discipline.id
                ? "border-blue-500 bg-blue-50 border"
                : " bg-white"
            }`}
            type="button"
          >
            <div className="mb-3">{discipline.icon}</div>
            <h3 className="font-semibold text-slate-900 mb-2">
              {discipline.title}
            </h3>
            <p className="text-sm text-slate-600">{discipline.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DisciplineSelector;
