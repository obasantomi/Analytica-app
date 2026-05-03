"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdAutoAwesome } from "react-icons/md";
import IndustryScenarioSelector from "../../components/IndustryScenarioSelector";
import DifficultySelector from "../../components/DifficultySelector";
import DisciplineSelector from "../../components/DisciplineSelector";

export interface FormData {
  discipline: "ANALYSIS" | "VISUALIZATION" | "CLEANING" | "THEORY" | null;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT" | null;
  scenario: "FINANCE" | "MARKETING" | "HEALTHCARE" | "OPERATIONS" | null;
}

const ProjectLabView = () => {
  const [formData, setFormData] = useState<FormData>({
    discipline: null,
    difficulty: null,
    scenario: null,
  });

  const handleGenerateDataset = () => {
    const missingFields: string[] = [];
    if (!formData.discipline) missingFields.push("discipline");
    if (!formData.difficulty) missingFields.push("difficulty level");
    if (!formData.scenario) missingFields.push("industry scenario");

    if (missingFields.length > 0) {
      const message =
        missingFields.length === 1
          ? `Please select ${missingFields[0]}.`
          : `Please select ${missingFields.join(", ")}.`;
      toast.error(message, {
        style: { fontSize: "14px" },
      });
      return;
    }

    console.log("Form data submitted:", formData);
  };

  return (
    <section className="px-5 lg:px-10 pt-7.5 pb-17 w-full">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">
          Configure Your Workspace
        </h1>
        <p className="mt-3 max-w-xl text-sm text-slate-600">
          Let's tailor the training environment to your specific objectives and
          data maturity level.
        </p>
      </div>

      <DisciplineSelector
        selectedDiscipline={formData.discipline}
        onSelect={(discipline) =>
          setFormData({
            ...formData,
            discipline: discipline as FormData["discipline"],
          })
        }
      />

      <DifficultySelector
        selectedDifficulty={formData.difficulty}
        onSelect={(difficulty) =>
          setFormData({
            ...formData,
            difficulty: difficulty as FormData["difficulty"],
          })
        }
      />

      <IndustryScenarioSelector
        selectedScenario={formData.scenario}
        onSelect={(scenario) =>
          setFormData({
            ...formData,
            scenario: scenario as FormData["scenario"],
          })
        }
      />

      <div className="mt-12">
        <button
          onClick={handleGenerateDataset}
          className={`px-6 py-3 rounded-lg cursor-pointer font-semibold flex items-center gap-2 transition-all duration-200 ${"bg-blue-600 text-white hover:bg-blue-700 active:scale-95"}`}
          type="button"
        >
          <MdAutoAwesome size={20} />
          Generate Dataset
        </button>
      </div>
      <Toaster position="top-right" />
    </section>
  );
};

export default ProjectLabView;
