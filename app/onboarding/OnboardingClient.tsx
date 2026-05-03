"use client";
import { useState } from "react";
import {
  FiBarChart2,
  FiUser,
  FiLayers,
  FiStar,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { ExpertiseCard, ExpertiseOption } from "./ExpertiseCard";
import { DomainButton } from "./DomainButton";
import { OnboardUserData } from "./onboardUserSchema";
import axios from "axios";
import { useRouter } from "next/navigation";

interface OnboardingClientProps {
  userEmail: string;
  userName: string;
}

const OnboardingClient = ({ userEmail, userName }: OnboardingClientProps) => {
  const router = useRouter();
  const [usernameError, setUsernameError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const analyticsOptions = ["STUDENT", "ANALYST", "MANAGER"] as const;

  const [selections, setSelections] = useState<OnboardUserData>({
    username: "",
    expertise: undefined,
    analyticsExperience: undefined,
    domains: [],
    email: userEmail,
  });

  // Handle username input change with validation
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelections((prev) => ({
      ...prev,
      username: value,
    }));
    if (value.trim().length < 3) {
      setUsernameError("Username must be at least 3 characters long.");
    } else {
      setUsernameError("");
    }
  };

  // Handle form submission with validation
  const handleGetStarted = async () => {
    setIsLoading(true);
    const missingUsername = selections.username.trim().length === 0;
    const missingExpertise = !selections.expertise;
    const missingExperience = !selections.analyticsExperience;
    const missingDomains = selections.domains.length === 0;

    const missingFields: string[] = [];
    if (missingUsername) missingFields.push("username");
    if (missingExpertise) missingFields.push("expertise level");
    if (missingExperience) missingFields.push("analytics experience");
    if (missingDomains) missingFields.push("domain interest(s)");

    if (missingFields.length > 0) {
      const message =
        missingFields.length === 1
          ? `Please enter your ${missingFields[0]}.`
          : `Please enter: ${missingFields.join(", ")}.`;
      toast.error(message, {
        position: "top-right",
        style: { fontSize: "14px" },
      });
      setIsLoading(false);
      return;
    }
    console.log("onboardingSelections: ", selections);

    try {
      const response = await axios.post("/api/onboardUser", selections);
      if (response.status === 200) {
        toast.success("Onboarding completed successfully!", {
          position: "top-right",
          style: { fontSize: "14px" },
        });
        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.toJSON());
        toast.error(
          error.message || "Failed to complete onboarding. Please try again.",
          {
            position: "top-right",
            style: { fontSize: "14px" },
          },
        );
      }
    } finally {
      setIsLoading(false);
    }

    // Clear all selections after successful submission
    setSelections({
      username: "",
      expertise: undefined,
      analyticsExperience: undefined,
      domains: [],
      email: userEmail,
    });
    setUsernameError("");
  };

  // Handle analytics experience selection
  const handleExperienceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    type AnalyticsExperience = (typeof analyticsOptions)[number];
    setSelections((prev) => ({
      ...prev,
      analyticsExperience: e.target.value as AnalyticsExperience,
    }));
  };

  const expertiseOptions: ExpertiseOption[] = [
    {
      title: "Beginner",
      description: "Basic formulas, sorting, and data entry.",
      icon: FiLayers,
      value: "BEGINNER",
    },
    {
      title: "Intermediate",
      description: "VLOOKUP, Pivot Tables, and conditional logic.",
      icon: FiTrendingUp,
      value: "INTERMEDIATE",
    },
    {
      title: "Advanced",
      description: "VBA Macros, Power Query, and Complex Arrays.",
      icon: FiStar,
      value: "ADVANCED",
    },
  ];

  const domainOptions = ["FINANCE", "MARKETING", "HEALTHCARE", "OPERATIONS"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="ml-3 flex max-w-7xl items-center px-6 py-4">
          <span className="inline-flex items-center gap-2 text-2xl font-semibold text-slate-900">
            <img src="/images/Logo.svg" alt="logo" />
            Analytica
          </span>
        </div>
      </header>

      <main className="mx-auto grid lg:grid-cols-[370px_1fr] px-10 py-10 ">
        <Toaster position="top-right" />
        <aside className="hidden lg:block pr-8">
          <div className="space-y-6">
            <div>
              <div className="text-[12px] flex items-center ml-1">
                Welcome {userName}!
              </div>
              <h1 className="text-[36px] font-semibold text-[#001736]">
                Define your analytical path.
              </h1>
              <p className="mt-4 text-slate-600">
                We tailor your curriculum based on your professional trajectory
                and current skill gaps.
              </p>
            </div>
          </div>
        </aside>

        <section className="flex-1 w-full space-y-6">
          <div className="rounded-4xl  p-8 ">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm border-l-4 pl-4 border-[#0058BB] mb-4 font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Personal Identity
                </p>
              </div>
              <FiUser className="h-8 w-8 text-cyan-500" />
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">
                Username
              </span>
              <input
                type="text"
                value={selections.username}
                onChange={handleUsernameChange}
                placeholder="e.g. Alexander"
                className="input input-bordered w-full bg-white text-slate-900 placeholder:text-slate-500"
              />
              {usernameError && (
                <p className="text-red-500 text-xs mt-1">{usernameError}</p>
              )}
            </label>
          </div>

          <div className="rounded-4xl p-8 pt-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold border-l-4 pl-4 border-[#0058BB] mb-4 uppercase tracking-[0.3em] text-slate-500">
                  Expertise Level
                </p>
                <h2 className=" text-[14px] mb-4  text-slate-900">
                  Current Excel Proficiency
                </h2>
              </div>
              <FiBarChart2 className="h-8 w-8 text-cyan-500" />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {expertiseOptions.map((option) => (
                <ExpertiseCard
                  key={option.value}
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                  isSelected={selections.expertise === option.value}
                  onClick={() =>
                    setSelections((prev) => ({
                      ...prev,
                      expertise:
                        prev.expertise === option.value
                          ? undefined
                          : option.value,
                    }))
                  }
                />
              ))}
            </div>
            <label className="mt-8 grid gap-2">
              <span className="text-sm mb-4 font-medium text-slate-700">
                Analytics Experience
              </span>
              <select
                value={selections.analyticsExperience}
                onChange={(e) => handleExperienceSelect(e)}
                className="select select-bordered w-full bg-white text-slate-900"
              >
                <option value="">Select your analytics experience</option>
                <option value="STUDENT">Student</option>
                <option value="ANALYST">Analyst</option>
                <option value="MANAGER">Manager</option>
              </select>
            </label>
          </div>

          <div>
            <p className="text-sm font-semibold border-l-4 pl-4 ml-8 border-[#0058BB] mb-4 uppercase tracking-[0.3em] text-slate-500">
              Personalization
            </p>
          </div>
          <div className="rounded-4xl ml-8 bg-[#F2F4F6] p-8 max-w-225">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-[14px] mb-5 mt-3 font-semibold text-slate-900">
                Domain interest
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {domainOptions.map((label) => (
                <DomainButton
                  key={label}
                  label={label}
                  isSelected={selections.domains.includes(label)}
                  onClick={() =>
                    setSelections((prev) => ({ 
                      ...prev,
                      domains: prev.domains.includes(label)
                        ? prev.domains.filter((d) => d !== label)
                        : [...prev.domains, label],
                    }))
                  }
                />
              ))}
            </div>
          </div>

          <div className="flex w-full pl-8 mt-20 justify-between items-center">
            <p className="text-[12px] max-w-92.5">
              By clicking Create Account, you agree to our terms of service and
              curriculum data policy.
            </p>
            <button
              type="button"
              onClick={handleGetStarted}
              disabled={isLoading || !!usernameError}
              className={`py-3 px-8 transition-all duration-200 rounded-lg text-sm font-semibold shadow-md flex items-center gap-2 ${
                isLoading
                  ? "bg-slate-300 cursor-not-allowed text-slate-500"
                  : usernameError
                    ? "opacity-50 cursor-not-allowed bg-[#58FBDA] text-slate-900"
                    : "bg-[#58FBDA] hover:bg-[#40E5CC] active:bg-[#2DD9BC] text-slate-900 hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
            >
              {isLoading ? "Submitting..." : "Get Started"}
              {!isLoading && <FiArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OnboardingClient;
