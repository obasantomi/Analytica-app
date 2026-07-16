import Grid from "../ui/Grid";
import Section from "../ui/Section";
import { LANDING_SECTION_IDS } from "../../lib/constants";
import HeroBackground from "../hero/HeroBackground";
import HeroContent from "../hero/HeroContent";
import HeroVisualization from "../hero/HeroVisualization";

export default function HeroSection() {
  return (
    <Section
      id={LANDING_SECTION_IDS.hero}
      spacing="hero"
      aria-label="Hero section"
      className="overflow-hidden"
      containerClassName="relative"
    >
      <HeroBackground />

      <Grid className="relative items-center">
        <div className="col-span-12 lg:col-span-6">
          <HeroContent />
        </div>

        <div className="col-span-12 mt-landing-6 lg:col-span-6 lg:mt-0">
          <HeroVisualization />
        </div>
      </Grid>
    </Section>
  );
}
