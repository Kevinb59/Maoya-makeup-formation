import SafeImage from "@/components/ui/SafeImage";
import { logos } from "@/data/assets";
import { navItems } from "@/data/content";
import { footerLegalLinks, footerSocialLinks } from "@/data/footer";

/**
 * Pied de page avec menu, informations légales et réseaux sociaux.
 */
export default function SiteFooter() {
  const safeNavItems = Array.isArray(navItems) ? navItems : [];
  const safeLegalLinks = Array.isArray(footerLegalLinks) ? footerLegalLinks : [];
  const safeSocialLinks = Array.isArray(footerSocialLinks) ? footerSocialLinks : [];

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <SafeImage src={logos.footer} alt="Logo Maoya Make Up Formation" />
        <p>Formation en maquillage & conseil en image — individuelle et personnalisée.</p>
      </div>
      <div>
        <h3>Menu</h3>
        {safeNavItems.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>
      <div>
        <h3>Informations légales</h3>
        {safeLegalLinks.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>
      <div>
        <h3>Réseaux sociaux</h3>
        {safeSocialLinks.map((item) => (
          <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
            {item.label}
          </a>
        ))}
      </div>
      <p className="copyright">Copyright © 2026 | Maoya Makeup Formation</p>
    </footer>
  );
}
