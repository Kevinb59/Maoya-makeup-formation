import SafeImage from "@/components/ui/SafeImage";
import { navItems } from "@/data/content";
import { site } from "@/data/site";

/**
 * Pied de page avec menu, ressources et réseaux sociaux.
 */
export default function SiteFooter() {
  const safeNavItems = Array.isArray(navItems) ? navItems : [];

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <SafeImage src={site.logo} alt="Logo Maoya Make Up Formation" />
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
        <h3>Resources</h3>
        <a href="https://www.maoyamakeupformation.com/contact/">Contact Support</a>
        <a href="https://www.maoyamakeupformation.com/contact/">FAQ</a>
        <a href="https://www.maoyamakeupformation.com/contact/">Live Chat</a>
        <a href="https://www.maoyamakeupformation.com/contact/">Returns</a>
      </div>
      <div>
        <h3>Social Media</h3>
        <a href="#facebook">Facebook</a>
        <a href="#twitter">Twitter</a>
        <a href="#instagram">Instagram</a>
        <a href="#pinterest">Pinterest</a>
      </div>
      <p className="copyright">Copyright © 2026 | Powered by Maoya Makeup Formation</p>
    </footer>
  );
}
