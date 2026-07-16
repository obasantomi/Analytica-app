import FAQSection from "./components/sections/FAQSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import FinalCtaSection from "./components/sections/FinalCtaSection";
import HeroSection from "./components/sections/HeroSection";
import LearningJourneySection from "./components/sections/LearningJourneySection";
import OutcomesSection from "./components/sections/OutcomesSection";
import ProblemSection from "./components/sections/ProblemSection";
import ProductPreviewSection from "./components/sections/ProductPreviewSection";
import SolutionSection from "./components/sections/SolutionSection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />

      <ProblemSection />

      <SolutionSection />

      <FeaturesSection />

      <LearningJourneySection />

      <ProductPreviewSection />

      <OutcomesSection />

      <FAQSection />

      <FinalCtaSection />
    </>
  );
}
