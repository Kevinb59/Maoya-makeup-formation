"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import { navItems } from "@/data/content";
import { site } from "@/data/site";
import { useCart } from "@/context/CartContext";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";

/**
 * En-tête fixe avec navigation desktop/mobile et bouton panier.
 */
export default function Header() {
  const { menuOpen, setMenuOpen, headerClass, headerStyle } = useHeaderScroll();
  const { count, open, setOpen } = useCart();
  const safeNavItems = Array.isArray(navItems) ? navItems : [];

  return (
    <header className={`site-header ${headerClass}`} style={headerStyle}>
      <div className="nav-shell">
        <a
          className="header-phone"
          href={`tel:${site.phone}`}
          aria-label="Appeler Maoya Makeup Formation"
        >
          {site.phone}
        </a>

        <nav className="desktop-nav" aria-label="Navigation principale">
          {safeNavItems.slice(0, 5).map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="cart-button"
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag size={18} />
            <span>{count}</span>
          </button>
          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Ouvrir le menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Navigation mobile">
          {safeNavItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
