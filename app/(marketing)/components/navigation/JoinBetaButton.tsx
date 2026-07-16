import Link from "next/link";
import { LANDING_BETA_CTA } from "../../lib/constants";

type JoinBetaButtonProps = {
  className?: string;
  onNavigate?: () => void;
  size?: "default" | "full";
};

export default function JoinBetaButton({
  className = "",
  onNavigate,
  size = "default",
}: JoinBetaButtonProps) {
  return (
    <Link
      href={LANDING_BETA_CTA.href}
      onClick={onNavigate}
      className={`inline-flex items-center justify-center rounded-landing-button bg-landing-navy px-5 py-2.5 text-sm font-semibold text-landing-text-inverse shadow-landing-button transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-landing-navy/90 hover:shadow-landing-elevated active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-landing-blue/50 focus-visible:ring-offset-2 ${
        size === "full" ? "w-full" : ""
      } ${className}`}
    >
      {LANDING_BETA_CTA.label}
    </Link>
  );
}
