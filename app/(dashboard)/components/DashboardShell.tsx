"use client";

import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import DashboardNav from "./DashboardNav";
import DashboardSidebar from "./DashboardSidebar";
import { useParams, usePathname } from "next/navigation";

interface DashboardShellProps {
  children: React.ReactNode;
  userName: string;
  userImage?: string | null;
  level: string;
  role: string;
}

const DashboardShell = ({
  children,
  userName,
  userImage,
  level,
  role,
}: DashboardShellProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { projectId } = useParams();
  const pathname = usePathname();

  const isOnProjectLabMainPage = pathname === `/project-lab/${projectId}`;

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen h-full">
      <header className="bg-[#F2F4F6] z-30 fixed top-0 right-0 left-0 flex border-b border-slate-200">
        <div className="mx-auto w-full max-w-432.5 flex items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-4">
            {!isOnProjectLabMainPage && (
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 md:hidden"
                aria-label="Open menu"
              >
                <FiMenu className="h-5 w-5" />
              </button>
            )}
            <div className="text-[#002B5B] text-[24px] font-bold">
              Analytica
            </div>
          </div>

          <DashboardNav name={userName} image={userImage} />
        </div>
      </header>

      {!isOnProjectLabMainPage && (
        <aside className="hidden md:block fixed z-20 left-0 w-64 top-16 bottom-0 overflow-y-scroll bg-[#F2F4F6]">
          <DashboardSidebar level={level} role={role} />
        </aside>
      )}

      <div
        className={`fixed inset-0 z-30 bg-slate-900/40 transition-opacity duration-300 lg:hidden ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside
        className={`fixed z-40 top-0 left-0 h-full w-72 transform bg-[#F2F4F6] shadow-2xl transition-transform duration-300 lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
          <div className="text-lg font-semibold text-slate-900">Menu</div>
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
            aria-label="Close menu"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
        <DashboardSidebar level={level} role={role} />
      </aside>

      <main
        className={`${!isOnProjectLabMainPage ? "md:ml-64" : " "} mt-[71.5px] bg-[#eeeff1] overflow-hidden h-full`}
      >
        <div className="h-full overflow-scroll p-10">{children}</div>
      </main>
    </div>
  );
};

export default DashboardShell;
