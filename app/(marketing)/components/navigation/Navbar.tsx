"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import {
  HERO_ENTRANCE,
  LANDING_NAV_HEIGHT,
  LANDING_NAV_SECTION_IDS,
  SCROLL_BLUR_THRESHOLD,
} from "../../lib/constants";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { EASING } from "../../lib/motion";
import Container from "../ui/Container";
import JoinBetaButton from "./JoinBetaButton";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";

export default function Navbar() {
  const scrollY = useScrollPosition();
  const activeSection = useScrollSpy(LANDING_NAV_SECTION_IDS);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isScrolled = scrollY > SCROLL_BLUR_THRESHOLD;

  const closeMobileNav = () => setIsMobileOpen(false);
  const toggleMobileNav = () => setIsMobileOpen((open) => !open);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: EASING.easeOut,
        delay: HERO_ENTRANCE.nav,
      }}
    >
      <nav
        aria-label="Main navigation"
        className={`transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 ease-out ${
          isScrolled
            ? "border-b border-landing-border/60 bg-landing-surface/80 shadow-landing-card backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
        style={{ height: LANDING_NAV_HEIGHT }}
      >
        <Container className="flex h-full items-center justify-between gap-landing-3">
          <Logo onNavigate={closeMobileNav} />

          <div className="hidden md:block">
            <NavLinks activeSection={activeSection} />
          </div>

          <div className="flex items-center gap-landing-2">
            <div className="hidden md:block">
              <JoinBetaButton />
            </div>

            <MobileNav
              activeSection={activeSection}
              isOpen={isMobileOpen}
              onToggle={toggleMobileNav}
              onClose={closeMobileNav}
            />
          </div>
        </Container>
      </nav>
    </motion.header>
  );
}
