"use client";

import { ShoppingBag, X } from "lucide-react";

/**
 * Tiroir latéral du panier (placeholder vide pour l'instant).
 */
export default function CartDrawer({ open, onClose }) {
  return (
    <aside className={`cart-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="cart-drawer-header">
        <strong>Votre panier</strong>
        <button type="button" onClick={onClose} aria-label="Fermer le panier">
          <X size={20} />
        </button>
      </div>
      <div className="cart-empty">
        <ShoppingBag size={44} />
        <h3>Votre panier est vide</h3>
        <p>Découvrez nos formations disponibles</p>
        <a className="button primary" href="https://www.maoyamakeupformation.com/a-distance/">
          Voir nos programmes →
        </a>
      </div>
    </aside>
  );
}
