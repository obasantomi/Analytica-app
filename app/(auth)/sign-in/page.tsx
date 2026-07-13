"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import z from "zod";
import { SignInSchema } from "../(authSchema)/authSchema";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type signInData = z.infer<typeof SignInSchema>;

const page = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signInData>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (data: signInData) => {
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (response?.ok) {
      toast.success("Signed in successfully!", {
        position: "top-right",
        style: { fontSize: "14px" },
      });
      router.push("/");
    } else {
      console.log("Sign in failed: ", response?.error);
      toast.error("Invalid email or password.", {
        position: "top-right",
        style: { fontSize: "14px" },
      });
    }
  };

  return (
    <div className="mx-auto flex h-full w-full flex-col gap-5 rounded-r-lg bg-white p-4 text-slate-900 shadow-[0_40px_120px_rgba(0,0,0,0.12)] sm:p-8">
      <Toaster />
      <div className="mt-8 mb-6 space-y-3 text-center sm:mb-12 sm:mt-20">
        <h1 className="text-2xl font-extrabold sm:text-4xl">Welcome Back</h1>
        <p className="text-sm text-slate-500 sm:text-base">
          Please enter your details to continue your journey.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 mb-2"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="name@gmail.com"
            className="w-full rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          )}
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
              {...register("password")}
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
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password?.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex w-full justify-center gap-4 rounded-3xl px-5 py-3 text-sm font-semibold text-slate-950 transition sm:py-4 ${
            isSubmitting
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-teal-400 hover:bg-teal-300"
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2 justify-center">
              <span className="loading loading-xm loading-infinity text-black"></span>
              <p className="italic">Signing in...</p>
            </div>
          ) : (
            "Sign In →"
          )}{" "}
        </button>
      </form>

      <div className="relative my-6 sm:my-10">
        <div className="absolute inset-x-0 top-1/2 border-t border-slate-200" />
        <div className="relative mx-auto w-fit bg-white px-3 text-xs uppercase tracking-[0.3em] text-slate-500">
          Or continue with
        </div>
      </div>

      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="w-full inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
      >
        <FcGoogle className="text-2xl" />
        Continue with Google
      </button>

      <div className="mt-auto text-center text-xs text-slate-600 sm:text-sm">
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
