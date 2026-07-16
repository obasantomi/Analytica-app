import { LANDING_SECTION_IDS } from "../../lib/constants";
import Section from "../ui/Section";
import LearningJourneyExperience from "./LearningJourneyExperience";

export default function LearningJourneySection() {
  return (
    <Section
      id={LANDING_SECTION_IDS.journey}
      aria-label="Learning journey"
    >
      <LearningJourneyExperience />
    </Section>
  );
}
