export interface DomainButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const DomainButton = ({
  label,
  isSelected,
  onClick,
}: DomainButtonProps) => (
  <button
    type="button"
    className={`rounded-full border px-4 py-3 text-sm font-medium transition cursor-pointer ${
      isSelected
        ? "border-cyan-500 bg-white text-slate-900 shadow-sm"
        : "border-slate-200 bg-white/90 text-slate-700"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);
