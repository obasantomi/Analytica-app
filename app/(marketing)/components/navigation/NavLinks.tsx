"use client";

import { LANDING_NAV_LINKS } from "../../lib/constants";
import type { LandingSectionId } from "../../lib/constants";
import NavLink from "./NavLink";

type NavLinksProps = {
  activeSection: LandingSectionId;
  onNavigate?: () => void;
};

export default function NavLinks({ activeSection, onNavigate }: NavLinksProps) {
  return (
    <ul className="flex items-center gap-landing-1" role="list">
      {LANDING_NAV_LINKS.map((link) => (
        <li key={link.sectionId}>
          <NavLink
            label={link.label}
            href={link.href}
            sectionId={link.sectionId}
            isActive={activeSection === link.sectionId}
            onNavigate={onNavigate}
          />
        </li>
      ))}
    </ul>
  );
}
