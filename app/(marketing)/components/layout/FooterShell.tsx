import { BiEnvelope, BiLogoLinkedin, BiLogoTwitter } from "react-icons/bi";
import FooterLinks from "./FooterLinks";
import Container from "../ui/Container";

export default function FooterShell() {
  return (
    <footer
      className="border-t border-landing-border bg-landing-surface-muted py-landing-6 lg:py-landing-7"
      aria-label="Site footer"
    >
      <Container>
        <FooterLinks />

        <div className="mt-landing-6 flex flex-col items-start justify-between gap-landing-3 border-t border-landing-border pt-landing-4 sm:flex-row sm:items-center">
          <p className="text-sm text-landing-text-secondary">
            © 2026 Analytica. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-landing-3 text-sm text-landing-text-secondary">
            <a
              href="mailto:obasantomilola@gmail.com"
              className="inline-flex items-center gap-2 transition-colors hover:text-landing-navy"
            >
              <BiEnvelope className="size-4" aria-hidden="true" />
              obasantomilola@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/tomilola-obasan/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-landing-navy"
              aria-label="Analytica on LinkedIn"
            >
              <BiLogoLinkedin className="size-5" aria-hidden="true" />
            </a>
            <a
              href="https://x.com/obasan_tomilola"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-landing-navy"
              aria-label="Analytica on X"
            >
              <BiLogoTwitter className="size-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
