import PastProjectsView from "../components/PastProjectsView";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

const ProjectLabPage = () => (
  <section className="px-5 md:px-10 pt-7.5 pb-15 lg:pb-20 w-full">
    <div>
      <h1 className="text-3xl font-semibold text-slate-900">Project Lab</h1>
      <p className="mt-3 max-w-xl text-sm text-slate-600">
        Review your past projects and start new ones to deepen your expertise.
      </p>
    </div>

    <div className="mt-8">
      <Link
        href="/project-lab/new"
        className="inline-flex items-center gap-2 rounded bg-[#00D4A5] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-100 transition hover:bg-[#00c392]"
      >
        <FiPlus className="h-4 w-4" />
        Start New Project
      </Link>
    </div>

    <div className="mt-12">
      <PastProjectsView />
    </div>
  </section>
);

export default ProjectLabPage;
