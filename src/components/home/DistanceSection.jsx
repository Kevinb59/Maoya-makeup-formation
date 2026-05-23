import SafeImage from "@/components/ui/SafeImage";
import SectionLabel from "@/components/ui/SectionLabel";
import { distanceSteps } from "@/data/content";
import { revealDelayStyle } from "@/utils/reveal";

/**
 * Étapes du programme hybride à distance (vidéo, visio, masterclass).
 */
export default function DistanceSection() {
  return (
    <section className="distance-section section-pad">
      <div className="section-intro centered reveal reveal-fade-up">
        <SectionLabel>Programme hybride</SectionLabel>
        <h2>Nos programmes à distance</h2>
      </div>
      <div className="distance-grid">
        {distanceSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article
              className="distance-card reveal reveal-zoom"
              key={step.title}
              style={revealDelayStyle(index, 110)}
            >
              <div className="distance-image">
                <SafeImage src={step.image} alt={step.title} />
                <span>{step.number}</span>
              </div>
              <div className="distance-body">
                <Icon size={22} />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
