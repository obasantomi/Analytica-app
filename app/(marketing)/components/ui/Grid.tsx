import type { ReactNode } from "react";

type GridProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
};

export default function Grid({
  children,
  className = "",
  as: Component = "div",
}: GridProps) {
  return (
    <Component
      className={`grid grid-cols-4 gap-landing-2 sm:grid-cols-8 sm:gap-landing-3 lg:grid-cols-12 lg:gap-landing-4 ${className}`}
    >
      {children}
    </Component>
  );
}
