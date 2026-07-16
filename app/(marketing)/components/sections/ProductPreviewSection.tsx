import { LANDING_SECTION_IDS } from "../../lib/constants";
import Section from "../ui/Section";
import ProductPreviewExperience from "./ProductPreviewExperience";

export default function ProductPreviewSection() {
  return (
    <Section
      id={LANDING_SECTION_IDS.preview}
      aria-label="Product preview section"
      className="overflow-hidden"
    >
      <ProductPreviewExperience />
    </Section>
  );
}
