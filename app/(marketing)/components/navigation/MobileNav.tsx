"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { LANDING_NAV_LINKS } from "../../lib/constants";
import type { LandingSectionId } from "../../lib/constants";
import { fadeIn } from "../../lib/motion";
import JoinBetaButton from "./JoinBetaButton";
import NavLink from "./NavLink";

type MobileNavProps = {
  activeSection: LandingSectionId;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export default function MobileNav({
  activeSection,
  isOpen,
  onToggle,
  onClose,
}: MobileNavProps) {
  const menuId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex size-10 items-center justify-center rounded-landing-button text-landing-navy transition-colors hover:bg-landing-navy/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-landing-blue/40 focus-visible:ring-offset-2"
      >
        {isOpen ? (
          <HiXMark className="size-5" aria-hidden="true" />
        ) : (
          <HiBars3 className="size-5" aria-hidden="true" />
        )}
      </button>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              className="fixed inset-0 z-40 bg-landing-navy/20 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
            />

            <motion.div
              ref={panelRef}
              id={menuId}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed inset-x-0 top-[var(--landing-nav-height)] z-50 border-b border-landing-border bg-landing-surface/95 shadow-landing-elevated backdrop-blur-md"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <nav className="flex flex-col gap-landing-1 px-landing-2 py-landing-3 sm:px-landing-3">
                <ul className="flex flex-col gap-landing-1" role="list">
                  {LANDING_NAV_LINKS.map((link, index) => (
                    <motion.li
                      key={link.sectionId}
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.05 }}
                    >
                      <NavLink
                        label={link.label}
                        href={link.href}
                        sectionId={link.sectionId}
                        isActive={activeSection === link.sectionId}
                        showPill={false}
                        onNavigate={onClose}
                        className="block w-full px-landing-2 py-landing-2 text-base"
                      />
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: LANDING_NAV_LINKS.length * 0.05 }}
                  className="mt-landing-2 border-t border-landing-border pt-landing-3"
                >
                  <JoinBetaButton size="full" onNavigate={onClose} />
                </motion.div>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
