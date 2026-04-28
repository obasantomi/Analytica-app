"use client";

import { signOut } from "next-auth/react";
import { FiUser } from "react-icons/fi";
import { useRef, useState } from "react";

type DashboardNavProps = {
  name: string;
  image?: string | null;
};

const DashboardNav = ({ name, image }: DashboardNavProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full border shadow-sm transition hover:shadow-md"
      >
        {image ? (
          <img
            src={image}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full  text-slate-600">
            <FiUser className="h-5 w-5" />
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
          <div className="mb-3 flex items-center gap-3">
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                <FiUser className="h-5 w-5" />
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-slate-900 truncate">
                {name}
              </p>
              <p className="text-xs text-slate-500">Signed in</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
            className="w-full rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardNav;
