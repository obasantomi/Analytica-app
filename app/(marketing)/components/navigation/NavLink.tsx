"use client";

import { motion } from "framer-motion";
import type { LandingSectionId } from "../../lib/constants";
import { LANDING_NAV_HEIGHT } from "../../lib/constants";
import { SPRING } from "../../lib/motion";
import { scrollToSection } from "../../lib/scroll";

type NavLinkProps = {
  label: string;
  href: string;
  sectionId: LandingSectionId;
  isActive: boolean;
  showPill?: boolean;
  onNavigate?: () => void;
  className?: string;
};

export default function NavLink({
  label,
  href,
  sectionId,
  isActive,
  showPill = true,
  onNavigate,
  className = "",
}: NavLinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToSection(sectionId, LANDING_NAV_HEIGHT);
    onNavigate?.();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-current={isActive ? "page" : undefined}
      className={`relative inline-flex items-center rounded-landing-badge px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-landing-blue/40 focus-visible:ring-offset-2 ${
        isActive
          ? "text-landing-navy"
          : "text-landing-text-secondary hover:text-landing-navy"
      } ${className}`}
    >
      {showPill ? (
        <motion.span
          layoutId="nav-active-pill"
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : 0.98,
            y: isActive ? 0 : 2,
          }}
          className="pointer-events-none absolute inset-0 rounded-landing-badge border border-landing-success/40 bg-landing-success/12 shadow-[0_0_0_1px_rgba(34,197,94,0.04)]"
          transition={SPRING.nav}
          aria-hidden="true"
        />
      ) : null}
      <span className="relative z-10">{label}</span>
    </a>
  );
}
