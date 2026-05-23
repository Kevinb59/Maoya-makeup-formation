import SafeImage from "@/components/ui/SafeImage";
import SectionLabel from "@/components/ui/SectionLabel";
import { studentGallery } from "@/data/content";
import { revealDelayStyle } from "@/utils/reveal";

/**
 * Galerie masonry des réalisations élèves.
 */
export default function StudentsSection() {
  return (
    <section className="students-section section-pad">
      <div className="section-intro centered reveal reveal-fade-up">
        <SectionLabel>Portfolio élèves</SectionLabel>
        <h2>Réalisations de nos élèves</h2>
      </div>
      <div className="student-gallery">
        {studentGallery.map((src, index) => (
          <SafeImage
            key={src}
            src={src}
            alt={`Réalisation élève ${index + 1}`}
            className="reveal reveal-zoom"
            style={revealDelayStyle(index % 6, 70)}
          />
        ))}
      </div>
    </section>
  );
}
