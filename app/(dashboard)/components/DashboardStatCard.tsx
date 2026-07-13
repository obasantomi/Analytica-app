import type { ReactNode } from "react";

type DashboardStatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
};

const DashboardStatCard = ({
  title,
  value,
  description,
  icon,
}: DashboardStatCardProps) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-[11px] text-wrap font-bold uppercase tracking-[0.28em] text-[#001736] sm:text-[12px]">
          {title}
        </p>
        <p className="mt-4 text-lg font-semibold text-[#001736] sm:mt-5 sm:text-xl">
          {value}
        </p>
      </div>

      {icon ? (
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#58FBDA]/20 text-[#001736] shadow-[0_0_0_1px_rgba(0,23,54,0.06)]">
          {icon}
        </div>
      ) : null}
    </div>

    {description ? (
      <p className="mt-2 text-xs text-slate-600 sm:mt-3 sm:text-sm">
        {description}
      </p>
    ) : null}
  </div>
);

export default DashboardStatCard;
