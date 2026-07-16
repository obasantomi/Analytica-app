import type { ElementType, HTMLAttributes, ReactNode } from "react";

type HeroPanelProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
} & HTMLAttributes<HTMLElement>;

export default function HeroPanel({
  children,
  className = "",
  as: Component = "div",
  ...rest
}: HeroPanelProps) {
  return (
    <Component
      className={`rounded-3xl border border-landing-border/70 bg-landing-surface-muted p-landing-3 shadow-landing-card ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
