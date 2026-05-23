"use client";

import { useEffect } from "react";

/**
 * Active les animations reveal au scroll via IntersectionObserver.
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".reveal"));

    if (elements.length === 0) return undefined;

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}
