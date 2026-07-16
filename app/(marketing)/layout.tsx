import type { Metadata } from "next";
import FooterShell from "./components/layout/FooterShell";
import CursorFollower from "./components/motion/CursorFollower";
import Navbar from "./components/navigation/Navbar";
import MotionProvider from "./providers/MotionProvider";

export const metadata: Metadata = {
  title: "Analytica — Learn Data Analytics with Real Projects",
  description:
    "Transform from curious learner to industry-ready data analyst through immersive, project-based learning with AI mentorship and measurable progress.",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MotionProvider>
      <div className="min-h-screen bg-landing-surface font-sans text-landing-text-primary">
        <CursorFollower />
        <Navbar />
        <main>{children}</main>
        <FooterShell />
      </div>
    </MotionProvider>
  );
}
