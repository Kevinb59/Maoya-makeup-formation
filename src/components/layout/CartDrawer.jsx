"use client";

import { ShoppingBag, X } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import { useCart } from "@/context/CartContext";

/**
 * Tiroir latéral du panier.
 */
export default function CartDrawer({ onClose }) {
  const { items, count, open, setOpen, removeItem } = useCart();
  const closeDrawer = onClose ?? (() => setOpen(false));

  /* 1. Fermeture sans rechargement
     - Objectif : « Continuer mes achats » referme le tiroir et conserve le panier en mémoire/localStorage.
     - Variables clés : `closeDrawer` remet `open` à false dans le contexte global.
     - Logique : pas de navigation `<a>` pour éviter une perte d'état perçue par l'utilisateur. */
  const handleContinueShopping = () => {
    closeDrawer();
  };

  return (
    <aside className={`cart-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="cart-drawer-header">
        <strong>Votre panier ({count})</strong>
        <button type="button" onClick={closeDrawer} aria-label="Fermer le panier">
          <X size={20} />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <ShoppingBag size={44} />
          <h3>Votre panier est vide</h3>
          <p>Découvrez nos formations disponibles</p>
          <a className="button primary" href="/a-distance/">
            Voir nos programmes →
          </a>
        </div>
      ) : (
        /* 2. Liste des articles du panier
           - Objectif : afficher les formations ajoutées avant branchement Firebase/paiement.
           - Variables clés : `items` contient nom, image, quantité et prix formaté.
           - Logique : chaque ligne peut être retirée individuellement du panier persisté. */
        <div className="cart-items">
          <ul>
            {items.map((item) => (
              <li className="cart-item" key={item.lineId}>
                <SafeImage src={item.image} alt={item.name} />
                <div className="cart-item-body">
                  <strong>{item.name}</strong>
                  {item.variantLabel ? <p>{item.variantLabel}</p> : null}
                  <p>{item.priceLabel}</p>
                  <span>Quantité : {item.quantity}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.lineId)}
                  aria-label={`Retirer ${item.name}`}
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="button primary" onClick={handleContinueShopping}>
            Continuer mes achats
          </button>
        </div>
      )}
    </aside>
  );
}
