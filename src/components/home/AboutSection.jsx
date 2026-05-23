import SafeImage from "@/components/ui/SafeImage";
import SectionLabel from "@/components/ui/SectionLabel";
import { images } from "@/data/assets";

/**
 * Présentation du centre de formation à Lille.
 */
export default function AboutSection() {
  return (
    <section className="about-section section-pad">
      <div className="about-copy reveal reveal-fade-left">
        <SectionLabel>Work & Working atmosphere</SectionLabel>
        <h2>
          Un cadre chaleureux <span>et professionnel</span>
        </h2>
        <p>
          Notre centre à Lille est un grand salon dédié à la beauté avec son espace shooting Photo. Il
          contient tout l&apos;aménagement nécessaire à un apprentissage cadré, et respectueux des
          règles d&apos;hygiène.
        </p>
        <p>
          Nous mettons un point d&apos;honneur à travailler au maximum avec des produits de
          maquillages professionnels français, et avons choisi des marques de soins certifiées bio.
        </p>
        <p>
          Situé au coeur d&apos;un quartier limitrophe de Lille (côté Lomme/Loos) à la fois calme et
          vivant, le centre est facilement accessible en voiture avec un grand parking à disposition,
          à 20mn à pied du métro et un bus (ligne 10) juste devant.
        </p>
      </div>
      <div className="about-visual-card reveal reveal-fade-right">
        <SafeImage src={images.about.centre} alt="Maoya zombie" />
        <div className="about-note">
          <h3>Formateurs expérimentés</h3>
          <p>
            Chez Maoya Makeup Formation, chaque apprenant bénéficie d&apos;un accompagnement
            personnalisé. Les formations sont individuelles ou organisées en petits groupes de 3
            personnes maximum, afin de vous guider à chaque étape de votre apprentissage.
          </p>
        </div>
      </div>
    </section>
  );
}
