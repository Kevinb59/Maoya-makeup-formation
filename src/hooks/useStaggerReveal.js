"use client";

import { useEffect } from "react";

/**
 * Déclenche l'apparition des cartes une par une quand la grille entre dans le viewport.
 */
export function useStaggerReveal(gridRef, staggerMs = 220) {
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;

    const cards = Array.from(grid.querySelectorAll("[data-stagger-reveal]"));
    if (cards.length === 0) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        cards.forEach((card, index) => {
          window.setTimeout(() => {
            card.classList.add("is-visible");
          }, index * staggerMs);
        });

        observer.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, [gridRef, staggerMs]);
}
