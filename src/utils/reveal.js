"use client";

/**
 * Calcule le délai d'animation reveal à partir de l'index et du pas.
 */
export function revealDelayStyle(index, step = 90) {
  return { "--reveal-delay": `${index * step}ms` };
}
