"use client";

import { useEffect, useState } from "react";

/**
 * Suit le scroll pour piloter l'opacité du header via une variable CSS.
 */
export function useHeaderScroll() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerProgress, setHeaderProgress] = useState(0);

  useEffect(() => {
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const handleScroll = () => {
      /* Pages sans hero sombre : header lisible dès le haut (fiches formation). */
      if (document.querySelector(".formation-detail-page, .product-detail-page")) {
        setHeaderProgress(1);
        return;
      }

      /* Hero plein écran — accueil ou pages internes (contact, hybride, certif, Lille). */
      const hero =
        document.querySelector(
          ".hero-section, .contact-hero, .hybride-hero, .certif-hero, .lille-hero"
        ) ?? null;
      const heroHeight = hero instanceof HTMLElement ? hero.offsetHeight : window.innerHeight;
      const headerHeight = 74;
      const fadeEnd = Math.max(heroHeight - headerHeight, 1);
      const progress = clamp(window.scrollY / fadeEnd, 0, 1);
      setHeaderProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const headerOpacity = menuOpen ? 1 : headerProgress;
  const headerClass = menuOpen || headerProgress > 0.58 ? "text-dark" : "at-top";

  return {
    menuOpen,
    setMenuOpen,
    headerClass,
    headerStyle: { "--header-opacity": headerOpacity },
  };
}
