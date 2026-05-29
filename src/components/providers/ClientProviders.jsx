"use client";

import { useEffect } from "react";
import { CartProvider } from "@/context/CartContext";

/**
 * 3. Providers client racine
 *    - Objectif : rendre le panier disponible sur toutes les pages Next.js.
 *    - Variables clés : `CartProvider` encapsule l'application.
 *    - Logique : ce composant est monté dans le layout pour éviter de dupliquer l'état panier.
 */
export default function ClientProviders({ children }) {
  /* 0. Marqueur JS actif — permet au CSS d'activer les animations reveal sans masquer le contenu si le JS échoue. */
  useEffect(() => {
    document.documentElement.classList.add("js");
  }, []);

  return <CartProvider>{children}</CartProvider>;
}
