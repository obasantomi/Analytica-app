"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiBarChart2,
  FiGrid,
  FiHelpCircle,
  FiLayers,
  FiLogOut,
  FiMessageCircle,
  FiPlus,
} from "react-icons/fi";

import { signOut } from "next-auth/react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

interface DashboardNavProps {
  level: string;
  role: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: FiGrid },
  { label: "Project Lab", href: "/project-lab", icon: FiLayers },
  { label: "Skill Profile", href: "/skill-profile", icon: FiBarChart2 },
];

const DashboardSidebar = ({ level, role }: DashboardNavProps) => {
  const pathname = usePathname() || "/";
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="flex flex-col justify-between gap-70 lg:gap-0 lg:h-full overflow-y-scroll bg-[#F2F4F6] px-6 py-6">
      <div>
        <div className="flex items-center mb-5 gap-3 rounded-3xl  py-4 ">
          <img src="/images/Ai.svg" alt="" className="" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-900">{role}</p>
            <p className="text-xs text-slate-500">{level} LEVEL</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "flex items-center gap-3 rounded-[10px] px-2.5 py-3 text-sm font-semibold transition " +
                  (active
                    ? "bg-white text-[#0B5BF3] border-r-4 border-[#00D4A5] shadow-sm"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900")
                }
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-5 w-5" />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-8 border-slate-200 pt-6">
        <Link
          href="/project-lab/new"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-[#00D4A5] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-100 transition hover:bg-[#00c392]"
        >
          <FiPlus className="h-4 w-4" />
          Start New Project
        </Link>

        <div className="mt-6 space-y-3 pt-6 border-t border-slate-200">
          <button
            type="button"
            className="flex w-full items-center gap-3 px-2 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-700"
          >
            <FiHelpCircle className="h-5 w-5" />
            Help Center
          </button>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
            className="flex w-full items-center gap-3 px-2 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-700"
          >
            <FiLogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
