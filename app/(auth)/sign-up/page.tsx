"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import z from "zod";
import { SignUpSchema } from "../(authSchema)/authSchema";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

type SignUpData = z.infer<typeof SignUpSchema>;

const page = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onsubmit = async (data: SignUpData) => {
    try {
      const response = await axios.post("/api/user", data);
      console.log(response.data.message);
      if (response.status === 201) {
        const sessionCreate = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (sessionCreate?.ok) {
          router.push("/");
        } else {
          toast.error("Account created but failed to sign in.", {
            position: "top-right",
            style: { fontSize: "14px" },
          });
        }
      } else {
        toast.error("Failed to create account. Please try again.", {
          position: "top-right",
          style: { fontSize: "14px" },
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error || "Something went wrong.", {
          position: "top-right",
          style: { fontSize: "14px" },
        });
      } else {
        toast.error("An unexpected error occurred. Please try again.", {
          position: "top-right",
          style: { fontSize: "14px" },
        });
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 mx-auto bg-white h-full rounded-r-lg shadow-[0_40px_120px_rgba(0,0,0,0.12)] p-8 text-slate-900">
      <Toaster />
      <div className="space-y-3 text-center mb-8 mt-8">
        <h1 className="text-4xl font-extrabold">Create Your Account</h1>
        <p className="text-slate-500">
          Start your journey into precision analytics.
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
        >
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

      <form onSubmit={handleSubmit(onsubmit)} className="space-y-8">
        <div>
          <label
            htmlFor="full-name"
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 mb-2"
          >
            Full name
          </label>
          <input
            id="full-name"
            {...register("fullName")}
            type="text"
            placeholder="Alex Rivers"
            className="w-full rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullName?.message}
            </p>
          )}
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
            {...register("email")}
            type="email"
            placeholder="alex@analytics.co"
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
          className={`w-full flex justify-center gap-4 rounded-3xl px-5 py-4 mt-8 text-sm font-semibold text-slate-950 transition ${
            isSubmitting
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-teal-400 hover:bg-teal-300"
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2 justify-center">
              <span className="loading loading-xm loading-infinity text-black"></span>
              <p className="italic">Creating account...</p>
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className=" text-center mt-auto text-sm text-slate-600">
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
