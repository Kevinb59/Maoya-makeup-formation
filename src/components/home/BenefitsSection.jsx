import { benefits } from "@/data/content";
import { revealDelayStyle } from "@/utils/reveal";

/**
 * Bandeau des avantages (paiement, flexibilité, certification, Qualiopi).
 */
export default function BenefitsSection() {
  return (
    <section className="benefits-section section-pad">
      <div className="benefit-heading reveal reveal-fade-left">
        <h2>
          Conçues pour vous permettre de développer une expertise solide et immédiatement applicable.
        </h2>
      </div>
      <div className="benefit-grid">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <article
              className="benefit-card reveal reveal-fade-up"
              key={benefit.title}
              style={revealDelayStyle(index)}
            >
              <Icon size={24} />
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
