"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BiArrowToRight } from "react-icons/bi";
import { LANDING_BETA_CTA, LANDING_SECTION_IDS } from "../../lib/constants";
import { sectionReveal } from "../../lib/motion";
import Section from "../ui/Section";

export default function FinalCtaSection() {
  return (
    <Section
      id={LANDING_SECTION_IDS.cta}
      spacing="compact"
      aria-label="Call to action section"
      className="overflow-hidden"
    >
      <motion.div
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="rounded-3xl border border-landing-border bg-landing-surface p-landing-5 shadow-landing-card sm:p-landing-6"
      >
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-landing-blue">
            Ready to begin
          </p>
          <h2 className="mt-landing-2 landing-heading text-balance">
            You've completed the introduction. Now begin your journey.
          </h2>
          <p className="mt-landing-3 landing-body max-w-landing-text text-pretty">
            Join the beta and start working through your first guided analytics
            project with structure, mentorship, and clear progress.
          </p>
        </div>

        <div className="mt-landing-4 flex flex-wrap items-center gap-landing-3">
          <Link
            href={LANDING_BETA_CTA.href}
            className="inline-flex items-center justify-center gap-2 rounded-landing-button bg-landing-navy px-5 py-2.75 text-sm font-semibold text-landing-text-inverse transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-landing-navy/90 hover:shadow-landing-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-landing-blue/40 focus-visible:ring-offset-2"
          >
            {LANDING_BETA_CTA.label}
            <BiArrowToRight className="size-4" aria-hidden="true" />
          </Link>
          <a
            href="#hero"
            className="inline-flex items-center justify-center rounded-landing-button border border-landing-border bg-transparent px-5 py-2.75 text-sm font-semibold text-landing-navy transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-landing-navy/20 hover:bg-landing-surface-muted hover:shadow-landing-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-landing-blue/40 focus-visible:ring-offset-2"
          >
            Back to top
          </a>
        </div>
      </motion.div>
    </Section>
  );
}
