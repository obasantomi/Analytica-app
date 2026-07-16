"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { FAQ_COPY, LANDING_SECTION_IDS } from "../../lib/constants";
import { cardReveal, sectionReveal, staggerContainer } from "../../lib/motion";
import Section from "../ui/Section";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Section
      id={LANDING_SECTION_IDS.faq}
      aria-label="Frequently asked questions"
      className="overflow-hidden"
    >
      <motion.div
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-landing-content"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-landing-blue">
          {FAQ_COPY.eyebrow}
        </p>
        <h2 className="mt-landing-2 landing-heading max-w-3xl text-balance">
          {FAQ_COPY.heading}
        </h2>
        <p className="mt-landing-3 landing-body max-w-landing-text text-pretty">
          {FAQ_COPY.description}
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.06, 0.04)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-landing-5"
      >
        <div className="space-y-landing-3">
          {FAQ_COPY.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.question}
                variants={cardReveal}
                className="rounded-3xl border border-landing-border bg-landing-surface p-landing-3 shadow-landing-card sm:p-landing-4"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-landing-navy">
                    {item.question}
                  </span>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-landing-blue/10 text-landing-blue">
                    <BiChevronDown
                      className={`size-5 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={
                        prefersReducedMotion
                          ? { height: "auto", opacity: 1 }
                          : { height: 0, opacity: 0 }
                      }
                      animate={
                        prefersReducedMotion
                          ? { height: "auto", opacity: 1 }
                          : { height: "auto", opacity: 1 }
                      }
                      exit={
                        prefersReducedMotion
                          ? { height: "auto", opacity: 1 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-landing-text-secondary">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </Section>
  );
}
