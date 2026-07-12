"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HiChevronDown, HiPencilSquare, HiSparkles } from "react-icons/hi2";
import { useState } from "react";

interface QuestionReviewCardProps {
  question: string;
  aiIdealAnswer: string;
  feedback: string;
  questionId: string;
  index?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.06,
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export function QuestionReviewCard({
  question,
  aiIdealAnswer,
  feedback,
  index = 0,
}: QuestionReviewCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50/80"
        aria-expanded={open}
      >
        <div className="flex min-w-0 items-start gap-3 cursor-pointer">
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F2F4F6] text-[#001736]">
            <HiPencilSquare className="h-4 w-4" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
              Question {index + 1}
            </p>
            <h4 className="mt-1 text-base font-semibold leading-snug text-[#001736]">
              {question}
            </h4>
          </div>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600"
        >
          <HiChevronDown className="h-2 w-2" aria-hidden />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-4 border-t  border-slate-100 px-5 pb-5">
              <div className="rounded-xl border mt-5 border-slate-100 bg-[#F2F4F6]/60 p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#001736]">
                  <HiSparkles className="h-4 w-4 text-[#14b8a6]" aria-hidden />
                  <span>AI ideal answer</span>
                </div>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
                  {aiIdealAnswer}
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                  Feedback
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {feedback}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}
