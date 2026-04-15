"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BiShow } from "react-icons/bi";

const page = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full mx-auto bg-white h-full rounded-r-lg shadow-[0_40px_120px_rgba(0,0,0,0.12)] p-8 text-slate-900">
      <div className="space-y-3 text-center mb-8 mt-8">
        <h1 className="text-4xl font-extrabold">Create Your Account</h1>
        <p className="text-slate-500">
          Start your journey into precision analytics.
        </p>
      </div>

      <div className="space-y-4">
        <button className="w-full inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50">
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>
      </div>

      <div className="relative mt-10 mb-10">
        <div className="absolute inset-x-0 top-1/2 border-t border-slate-200" />
        <div className="relative mx-auto w-fit bg-white px-3 text-xs uppercase tracking-[0.3em] text-slate-500">
          Or register with email
        </div>
      </div>

      <form className="space-y-8">
        <div>
          <label
            htmlFor="full-name"
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 mb-2"
          >
            Full name
          </label>
          <input
            id="full-name"
            name="fullName"
            type="text"
            placeholder="Alex Rivers"
            className="w-full rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 mb-2"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="alex@analytics.co"
            className="w-full rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-600"
            >
              Password
            </label>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              placeholder="••••••••"
              className="w-full rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
              onClick={() => setShow(!show)}
            >
              <BiShow className="text-xl" />
            </button>
          </div>
        </div>

        <button className="w-full rounded-3xl bg-teal-400 px-5 py-4 mt-8 text-sm font-semibold text-slate-950 transition hover:bg-teal-300">
          Create Account
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <a
          href="/sign-in"
          className="font-semibold text-slate-950 hover:text-slate-700"
        >
          Log in
        </a>
      </div>
    </div>
  );
};

export default page;
