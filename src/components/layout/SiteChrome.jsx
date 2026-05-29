"use client";

import Header from "@/components/layout/Header";
import CartDrawer from "@/components/layout/CartDrawer";
import { useCart } from "@/context/CartContext";

/**
 * En-tête + panier + overlay — état partagé via CartContext sur toutes les pages.
 */
export default function SiteChrome() {
  const { open, setOpen } = useCart();

  /* 1. Overlay + tiroir panier
     - Objectif : centraliser l'UI globale pour éviter un état local par page.
     - Variables clés : `open` pilote l'affichage, `setOpen(false)` ferme au clic extérieur.
     - Logique : un seul panier persistant, quelle que soit la navigation. */
  return (
    <>
      <Header />
      <CartDrawer onClose={() => setOpen(false)} />
      <div
        className={`page-overlay ${open ? "visible" : ""}`}
        onClick={() => setOpen(false)}
        role="presentation"
      />
    </>
  );
}
