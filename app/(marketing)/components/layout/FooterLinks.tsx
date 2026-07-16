import Link from "next/link";
import { LANDING_BETA_CTA, LANDING_SECTION_IDS } from "../../lib/constants";

type FooterLinkGroupProps = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-landing-text-muted">
        {title}
      </p>
      <ul className="mt-3 space-y-2 text-sm text-landing-text-secondary">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="transition-colors hover:text-landing-navy"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FooterLinks() {
  return (
    <div className="grid gap-landing-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="max-w-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-landing-blue">
          Analytica
        </p>
        <p className="mt-3 text-sm leading-relaxed text-landing-text-secondary">
          Learn data analytics by building real projects, getting mentorship,
          and turning each step into measurable professional growth.
        </p>
      </div>

      <FooterLinkGroup
        title="Explore"
        links={[
          { label: "Home", href: `#${LANDING_SECTION_IDS.hero}` },
          { label: "Features", href: `#${LANDING_SECTION_IDS.features}` },
          {
            label: "Learning Journey",
            href: `#${LANDING_SECTION_IDS.journey}`,
          },
        ]}
      />

      <FooterLinkGroup
        title="Get started"
        links={[
          { label: LANDING_BETA_CTA.label, href: LANDING_BETA_CTA.href },
          { label: "FAQ", href: `#${LANDING_SECTION_IDS.faq}` },
          { label: "Contact", href: "mailto:hello@analytica.app" },
        ]}
      />
    </div>
  );
}
