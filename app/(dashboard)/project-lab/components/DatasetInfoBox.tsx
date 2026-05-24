"use client";
import { useState } from "react";
import { HiArrowDownTray, HiCheckCircle } from "react-icons/hi2";
import { AnswerQuestionsModal } from "./AnswerQuestionsModal";
import { QuestionWithMetadata } from "../[projectId]/page";
import axios, { AxiosResponse, isAxiosError } from "axios";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export interface DatasetInfoBoxProps {
  description: string;
  stakeholderQuestions: string[];
  allQuestions?: QuestionWithMetadata[];
  downloadHref: string;
  className?: string;
  projectId?: string;
}

export function DatasetInfoBox({
  description,
  stakeholderQuestions,
  allQuestions = [],
  downloadHref,
  className,
  projectId,
}: DatasetInfoBoxProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmitAnswers = async (answers: any[]) => {
    setIsSubmitting(true);
    try {
      console.log("Submitted answers:", answers);
      const response: AxiosResponse = await axios.post(
        `/api/projects/${projectId}/review-details`,
        answers,
      );
      if (response.data?.success) {
        const projectId = response.data.projectId;
        toast.success(
          "Your answers have been submitted and reviewed successfully!",
          {
            position: "top-right",
            style: { fontSize: "14px" },
          },
        );

        router.push(`/project-lab/${projectId}/details`);
      } else {
        toast.error("Failed to submit your answers. Please try again.", {
          position: "top-right",
          style: { fontSize: "14px" },
        });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          "An error occurred while submitting your answers. Please try again.";
        toast.error(message, {
          position: "top-right",
          style: { fontSize: "14px" },
        });
        return;
      }
      toast.error(
        "An error occurred while submitting your answers. Please try again.",
        {
          position: "top-right",
          style: { fontSize: "14px" },
        },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className={`overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0f172a] text-white shadow-lg${
        className ? ` ${className}` : ""
      }`}
    >
      <div className="border-b border-slate-700/80 px-5 py-6 sm:px-8 sm:py-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-slate-400">
          BUSINESS CONTEXT
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
          {description}
        </p>
      </div>

      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-slate-400">
          STAKEHOLDER QUESTIONS
        </p>
        <ul className="mt-4 space-y-3">
          {stakeholderQuestions.map((question, index) => (
            <li
              key={`${index}-${question.slice(0, 48)}`}
              className="flex gap-3 text-sm text-slate-200 sm:text-base"
            >
              <HiCheckCircle
                className="mt-0.5 h-5 w-5 shrink-0 text-[#14b8a6]"
                aria-hidden
              />
              <span className="leading-relaxed">{question}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#14b8a6] px-5 py-3.5 text-sm font-semibold text-[#0f172a] shadow-[0_0_24px_rgba(20,184,166,0.35)] transition hover:bg-[#2dd4bf] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2dd4bf]"
          >
            Answer Questions
          </button>
          <a
            href={downloadHref}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#14b8a6] bg-transparent px-5 py-3.5 text-sm font-semibold text-[#14b8a6] transition hover:bg-[#14b8a6]/10 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#14b8a6] sm:flex-initial sm:min-w-60"
          >
            <HiArrowDownTray className="h-5 w-5" aria-hidden />
            Download Dataset
          </a>
        </div>
      </div>

      <AnswerQuestionsModal
        isOpen={isModalOpen}
        questions={allQuestions}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitAnswers}
        isLoading={isSubmitting}
      />
    </section>
  );
}
