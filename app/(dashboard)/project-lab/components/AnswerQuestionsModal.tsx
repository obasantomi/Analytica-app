"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";
import { QuestionWithMetadata } from "../[projectId]/page";

interface AnswerData {
  questionId: string;
  question: string;
  answer: string;
}

interface AnswerQuestionsModalProps {
  isOpen: boolean;
  questions: QuestionWithMetadata[];
  onClose: () => void;
  onSubmit: (answers: AnswerData[]) => Promise<void> | void;
  isLoading?: boolean;
}

export function AnswerQuestionsModal({
  isOpen,
  questions,
  onClose,
  onSubmit,
  isLoading = false,
}: AnswerQuestionsModalProps) {
  const [answers, setAnswers] = useState<Record<string, string>>(
    Object.fromEntries(questions.map((q) => [q.id, ""])),
  );

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const validateAnswers = (): boolean => {
    const emptyIndices = Object.entries(answers)
      .filter(([_, answer]) => !answer.trim())
      .map(([id]) => id);

    if (emptyIndices.length > 0) {
      const missingCount = emptyIndices.length;
      const plural = missingCount === 1 ? "answer" : "answers";
      toast.error(
        `Please provide ${missingCount} missing ${plural} before submitting.`,
        {
          position: "top-right",
          style: { fontSize: "14px" },
        },
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateAnswers()) {
      return;
    }

    const formattedAnswers: AnswerData[] = questions.map((question) => ({
      questionId: question.id,
      question: question.question,
      answer: answers[question.id],
    }));

    try {
      await onSubmit(formattedAnswers);
      toast.success("Answers submitted successfully!", {
        position: "top-right",
        style: { fontSize: "14px" },
      });
      handleClose();
    } catch (error) {
      console.error("Error submitting answers:", error);
      toast.error("Failed to submit answers. Please try again.", {
        position: "top-right",
        style: { fontSize: "14px" },
      });
    }
  };

  const handleClose = () => {
    setAnswers(Object.fromEntries(questions.map((q) => [q.id, ""])));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {/* Modal Container */}
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-slate-700/80 bg-[#0f172a] shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700/80 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Answer Questions</h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700/50 hover:text-white disabled:cursor-not-allowed"
            aria-label="Close modal"
          >
            <HiXMark className="h-6 w-6" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto flex-1 px-6 py-6">
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="space-y-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-300">
                    Question {index + 1} of {questions.length}
                  </span>
                  <p className="mt-2 text-base text-slate-200">
                    {question.question}
                  </p>
                  {question.hint && (
                    <p className="mt-1 text-sm text-slate-400">
                      <span className="font-semibold">Hint:</span>{" "}
                      {question.hint}
                    </p>
                  )}
                  {question.type && (
                    <p className="mt-1 text-xs text-slate-500">
                      Type: {question.type}
                    </p>
                  )}
                </label>
                <textarea
                  value={answers[question.id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(question.id, e.target.value)
                  }
                  disabled={isLoading}
                  placeholder="Enter your answer here..."
                  className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 transition focus:border-[#14b8a6] focus:outline-none focus:ring-1 focus:ring-[#14b8a6] disabled:cursor-not-allowed disabled:opacity-50"
                  rows={4}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer - Sticky Action Buttons */}
        <div className="flex gap-3 border-t border-slate-700/80 bg-slate-900/50 px-6 py-4">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-slate-600 bg-transparent px-4 py-3 font-semibold text-slate-200 transition hover:bg-slate-700/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 rounded-xl bg-[#14b8a6] px-4 py-3 font-semibold text-[#0f172a] shadow-[0_0_24px_rgba(20,184,166,0.35)] transition hover:bg-[#2dd4bf] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Submit Answers"}
          </button>
        </div>
      </div>
    </div>
  );
}
