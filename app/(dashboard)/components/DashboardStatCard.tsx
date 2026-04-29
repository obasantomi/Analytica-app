type DashboardStatCardProps = {
  title: string;
  value: string | number;
  description?: string;
};

const DashboardStatCard = ({
  title,
  value,
  description,
}: DashboardStatCardProps) => (
  <div className="rounded-xl bg-white p-6 ">
    <p className="text-[12px] text-wrap font-bold uppercase tracking-[0.28em] text-[#001736]">
      {title}
    </p>
    <p className="mt-5 text-xl font-semibold text-[#001736]">{value}</p>
    {description ? (
      <p className="mt-3 text-sm text-slate-600">{description}</p>
    ) : null}
  </div>
);

export default DashboardStatCard;
