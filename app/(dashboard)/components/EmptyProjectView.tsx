import Link from "next/link";
import { FiFolder, FiPlus } from "react-icons/fi";

interface EmptyProjectViewProps {
  title?: string;
  description?: string;
}

const EmptyProjectView = ({
  title = "No Projects Yet",
  description = "Start your first project to begin building your professional portfolio and unlocking AI insights.",
}: EmptyProjectViewProps) => {
  return (
    <div className="flex flex-col bg-[#F2F4F6] text-black p-12 items-center justify-center w-full">
      <div className="mb-6">
        <FiFolder className="w-28 h-28" />
      </div>
      <h3 className="text-2xl font-bold  mb-2">{title}</h3>
      <p className="text-center  mb-8 max-w-md">{description}</p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-3 text-[14px] rounded">
        <Link
          href="/project-lab/new"
          className="inline-flex items-center gap-2 px-6 py-3  font-semibold rounded-lg transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white  text-[14px] "
        >
          <FiPlus className="w-4 h-4" />
          Start Your First Project
        </Link>
      </button>
    </div>
  );
};

export default EmptyProjectView;
