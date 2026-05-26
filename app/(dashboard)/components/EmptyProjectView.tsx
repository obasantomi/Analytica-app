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
    <div className="flex w-full rounded-lg flex-col items-center justify-center bg-[#F2F4F6] p-10  text-center text-black sm:px-12">
      <span className="inline-flex p-4 my-10 mb-5 rounded-md bg-white justify-center items-center">
        <VscEmptyWindow className="w-8 h-8" />
      </span>

      <h3 className="mb-2 text-2xl font-bold">{title}</h3>
      <p className="mb-8 max-w-md text-sm leading-6 text-slate-600">
        {description}
      </p>
      <Link
        href="/project-lab/new"
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-blue-600 px-6 py-3 text-[14px] font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 focus:outline-none focus:ring-4 focus:ring-blue-600/20 active:translate-y-0 active:scale-[0.99]"
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
