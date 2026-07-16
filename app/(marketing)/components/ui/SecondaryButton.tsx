"use client";

import { LANDING_NAV_HEIGHT } from "../../lib/constants";
import type { LandingSectionId } from "../../lib/constants";
import { scrollToSection } from "../../lib/scroll";

type SecondaryButtonProps = {
  label: string;
  sectionId: LandingSectionId;
  className?: string;
};

export default function SecondaryButton({
  label,
  sectionId,
  className = "",
}: SecondaryButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    scrollToSection(sectionId, LANDING_NAV_HEIGHT);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-landing-button border border-landing-border bg-transparent px-5 py-2.5 text-sm font-semibold text-landing-navy transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-landing-navy/20 hover:bg-landing-surface-muted hover:shadow-landing-card active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-landing-blue/40 focus-visible:ring-offset-2 ${className}`}
    >
      {label}
    </button>
  );
}
