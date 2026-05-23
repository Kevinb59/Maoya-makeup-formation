import { Star } from "lucide-react";

/**
 * Témoignage client avec lien vers les avis Google.
 */
export default function TestimonialSection() {
  return (
    <section className="testimonial-section">
      <div className="testimonial-inner section-pad compact">
        <div className="quote-card reveal reveal-flip">
          <div className="stars" aria-label="Avis 5 étoiles">
            {[...Array(5)].map((_, index) => (
              <Star key={index} size={18} fill="currentColor" />
            ))}
          </div>
          <blockquote>
            J&apos;ai été formée en partie par Camille afin de devenir Makeup Artist. Aujourd&apos;hui
            cela fait 3 ans que je vis de mon activité. La formation était très complète et intéressante
            du début jusqu&apos;à la fin. Camille est très pédagogue, à l&apos;écoute et disponible pour
            ses élèves même lorsqu&apos;ils ne font plus la formation. J&apos;ai eu quelques fois des
            demandes et elle a toujours été présente. Je recommande vivement cette formation.
          </blockquote>
          <div className="quote-footer">
            <strong>Kelly Clément</strong>
            <a href="https://share.google/">Voir tous les avis</a>
          </div>
        </div>
      </div>
    </section>
  );
}
