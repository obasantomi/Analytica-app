import Link from "next/link";
import { BsRocketTakeoffFill } from "react-icons/bs";
import { VscEmptyWindow } from "react-icons/vsc";

interface EmptyProjectViewProps {
  title?: string;
  description?: string;
}

const EmptyProjectView = ({
  title = "No Projects Yet",
  description,
}: EmptyProjectViewProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-lg bg-[#F2F4F6] p-5 text-center text-black sm:p-10 sm:px-12">
      <span className="my-6 mb-5 inline-flex items-center justify-center rounded-md bg-white p-3 sm:my-10 sm:p-4">
        <VscEmptyWindow className="h-7 w-7 sm:h-8 sm:w-8" />
      </span>

      <h3 className="mb-2 text-xl font-bold sm:text-2xl">{title}</h3>
      <p className="mb-6 max-w-md text-xs leading-6 text-slate-600 sm:mb-8 sm:text-sm">
        {description}
      </p>
      <Link
        href="/project-lab/new"
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 focus:outline-none focus:ring-4 focus:ring-blue-600/20 active:translate-y-0 active:scale-[0.99] sm:px-6 sm:py-3 sm:text-[14px]"
      >
        <button className="flex items-center gap-2">
          <BsRocketTakeoffFill width={40} height={40} />
          <span className="relative"> Start Your First Project</span>
        </button>
      </Link>
    </div>
  );
};

export default EmptyProjectView;
