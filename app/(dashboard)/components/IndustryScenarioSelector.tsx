"use client";

interface IndustryScenario {
  id: string;
  label: string;
}

const scenarios: IndustryScenario[] = [
  { id: "FINANCE", label: "FINANCE" },
  { id: "MARKETING", label: "MARKETING" },
  { id: "HEALTHCARE", label: "HEALTHCARE" },
  { id: "OPERATIONS", label: "OPERATIONS" },
];

interface IndustryScenarioSelectorProps {
  selectedScenario: string | null;
  onSelect: (scenarioId: string) => void;
}

const IndustryScenarioSelector = ({
  selectedScenario,
  onSelect,
}: IndustryScenarioSelectorProps) => {
  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 bg-slate-300 text-slate-600 rounded font-semibold text-sm">
          3
        </div>
        <h2 className="text-xl font-semibold text-slate-900">
          Industry Scenario
        </h2>
      </div>

      <div className="flex gap-4 flex-wrap">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => onSelect(scenario.id)}
            className={`px-6 py-3 text-[14px] rounded-sm font-small transition-all duration-100 ${
              selectedScenario === scenario.id
                ? "border-blue-600 bg-blue-600 shadow-sm text-white"
                : "border-gray-300 bg-white text-slate-900 hover:border-gray-400"
            }`}
            type="button"
          >
            {scenario.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IndustryScenarioSelector;
