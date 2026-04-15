"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BiShow } from "react-icons/bi";

const page = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full h-full mx-auto bg-white rounded-r-lg shadow-[0_40px_120px_rgba(0,0,0,0.12)] p-8 text-slate-900">
      <div className="space-y-3 text-center mb-12 mt-20">
        <h1 className="text-4xl font-extrabold">Welcome Back</h1>
        <p className="text-slate-500">
          Please enter your details to continue your journey.
        </p>
      </div>

      <form className="space-y-8">
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
            placeholder="name@company.com"
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
            <a
              href="#"
              className="text-sm font-semibold text-sky-600 hover:text-sky-700"
            >
              Forgot password
            </a>
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

        <button className="w-full rounded-3xl bg-teal-400 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-teal-300">
          Sign In →
        </button>
      </form>

      <div className="relative my-10">
        <div className="absolute inset-x-0 top-1/2 border-t border-slate-200" />
        <div className="relative mx-auto w-fit bg-white px-3 text-xs uppercase tracking-[0.3em] text-slate-500">
          Or continue with
        </div>
      </div>

      <button className="w-full inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50">
        <FcGoogle className="text-2xl" />
        Continue with Google
      </button>

      <div className="mt-20 text-center text-sm text-slate-600">
        Don't have an account yet?{" "}
        <a
          href="/sign-up"
          className="font-semibold text-slate-950 hover:text-slate-700"
        >
          Register one here
        </a>
      </div>
    </div>
  );
};

export default page;
