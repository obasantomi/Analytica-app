"use client";

import { useState } from "react";
import { MdExpandMore } from "react-icons/md";

interface DifficultyOption {
  id: string;
  label: string;
}

const difficultyOptions: DifficultyOption[] = [
  {
    id: "BEGINNER",
    label: "Beginner — Fundamentals & Guided Paths",
  },
  {
    id: "INTERMEDIATE",
    label: "Intermediate — Applied Challenges",
  },
  {
    id: "ADVANCED",
    label: "Advanced — Real-world Scenarios",
  },
  {
    id: "EXPERT",
    label: "Expert — Industry-level Problems",
  },
];

interface DifficultySelectorProps {
  selectedDifficulty: string | null;
  onSelect: (difficultyId: string) => void;
}

const DifficultySelector = ({
  selectedDifficulty,
  onSelect,
}: DifficultySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel =
    difficultyOptions.find((opt) => opt.id === selectedDifficulty)?.label ||
    "Select difficulty level";

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 bg-slate-300 text-slate-600 rounded font-semibold text-sm">
          2
        </div>
        <h2 className="text-xl font-semibold text-slate-900">
          Difficulty Level
        </h2>
      </div>

      <div className="relative w-full max-w-5xl">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between hover:border-gray-300 transition-colors duration-200"
          type="button"
        >
          <span className="text-slate-900 font-medium">{selectedLabel}</span>
          <MdExpandMore
            size={24}
            className={`text-slate-600 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {difficultyOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onSelect(option.id);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left transition-colors duration-200 ${
                  selectedDifficulty === option.id
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-slate-900 hover:bg-gray-50"
                }`}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DifficultySelector;
