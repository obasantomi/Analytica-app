"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdAutoAwesome } from "react-icons/md";
import IndustryScenarioSelector from "../../components/IndustryScenarioSelector";
import DifficultySelector from "../../components/DifficultySelector";
import DisciplineSelector from "../../components/DisciplineSelector";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface FormData {
  discipline: "ANALYSIS" | "VISUALIZATION" | "CLEANING" | "THEORY" | null;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT" | null;
  scenario: "FINANCE" | "MARKETING" | "HEALTHCARE" | "OPERATIONS" | null;
}

const ProjectLabView = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    discipline: null,
    difficulty: null,
    scenario: null,
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDataset = async () => {
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

    setIsGenerating(true);

    try {
      const response = await axios.post("/api/projects", formData);

      const { projectId } = response.data;

      if (projectId) {
        toast.success("Project created successfully!", {
          style: { fontSize: "14px" },
        });
        router.push(`/project-lab/${projectId}`);
      } else {
        toast.error("Failed to create project. Please try again.", {
          style: { fontSize: "14px" },
        });
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error, {
          style: { fontSize: "14px" },
        });
      } else {
        toast.error("An unexpected error occurred. Please try again.", {
          style: { fontSize: "14px" },
        });
      }
    } finally {
      setIsGenerating(false);
      setFormData({
        discipline: null,
        difficulty: null,
        scenario: null,
      });
    }
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
          disabled={isGenerating}
          className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 ${isGenerating ? "bg-blue-500/70 text-white cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"}`}
          type="button"
        >
          <MdAutoAwesome size={20} />
          {isGenerating ? "Generating Dataset..." : "Generate Dataset"}
        </button>
      </div>
      <Toaster position="top-right" />
    </section>
  );
};

export default ProjectLabView;
