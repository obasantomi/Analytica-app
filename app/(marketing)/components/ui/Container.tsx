import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav" | "main";
  size?: "default" | "content" | "text";
};

const sizeClasses = {
  default: "max-w-landing",
  content: "max-w-landing-content",
  text: "max-w-landing-text",
} as const;

export default function Container({
  children,
  className = "",
  as: Component = "div",
  size = "default",
}: ContainerProps) {
  return (
    <Component
      className={`mx-auto w-full px-landing-2 sm:px-landing-3 lg:px-landing-4 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </Component>
  );
}
