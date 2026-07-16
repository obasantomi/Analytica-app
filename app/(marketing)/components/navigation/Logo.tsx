"use client";

import Image from "next/image";
import { LANDING_NAV_HEIGHT, LANDING_SECTION_IDS } from "../../lib/constants";
import { scrollToSection } from "../../lib/scroll";

type LogoProps = {
  onNavigate?: () => void;
};

export default function Logo({ onNavigate }: LogoProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToSection(LANDING_SECTION_IDS.hero, LANDING_NAV_HEIGHT);
    onNavigate?.();
  };

  return (
    <a
      href={`#${LANDING_SECTION_IDS.hero}`}
      onClick={handleClick}
      className="group flex items-center gap-landing-2 rounded-landing-button outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-landing-blue/40 focus-visible:ring-offset-2"
      aria-label="Analytica — go to top"
    >
      <Image
        src="/images/Logo.svg"
        alt=""
        width={32}
        height={32}
        className="size-8"
        priority
      />
      <span className="text-lg font-bold tracking-tight text-landing-navy">
        Analytica
      </span>
    </a>
  );
}
