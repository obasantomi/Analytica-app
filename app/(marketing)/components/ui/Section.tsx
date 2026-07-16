import type { ReactNode } from "react";
import Container from "./Container";

type SectionProps = {
  children?: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  spacing?: "default" | "compact" | "hero";
  containerSize?: "default" | "content" | "text";
  "aria-label"?: string;
};

const spacingClasses = {
  default: "py-landing-8 lg:py-landing-9",
  compact: "py-landing-6 lg:py-landing-7",
  hero: "pt-[calc(var(--landing-nav-height)+var(--landing-space-6))] pb-landing-8 lg:pb-landing-9",
} as const;

export default function Section({
  children,
  id,
  className = "",
  containerClassName = "",
  spacing = "default",
  containerSize = "default",
  "aria-label": ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative w-full ${spacingClasses[spacing]} ${className}`}
    >
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
