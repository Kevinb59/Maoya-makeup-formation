"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "maoya-cart-v1";

/**
 * 2.1 Identifiant unique d'une ligne panier
 *    - Objectif : différencier formations et variantes produit (ex. malette par formation).
 *    - Variables clés : `item.id` + `item.variantId` composent la clé de ligne.
 *    - Logique : deux variantes du même produit = deux lignes distinctes.
 */
function getCartLineId(item) {
  return item.variantId ? `${item.id}::${item.variantId}` : item.id;
}

/**
 * 2.2 Lecture sécurisée du panier en localStorage
 *    - Objectif : restaurer le panier après actualisation ou navigation complète.
 *    - Variables clés : `CART_STORAGE_KEY` identifie la clé persistée.
 *    - Logique : ignore les données invalides pour éviter de corrompre l'état React.
 */
function readStoredCartItems() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item) =>
        item &&
        typeof item.lineId === "string" &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        typeof item.quantity === "number" &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

/**
 * 2.3 Écriture du panier en localStorage
 *    - Objectif : synchroniser l'état React avec le stockage navigateur.
 *    - Variables clés : `items` contient les lignes sérialisables du panier.
 *    - Logique : appelée après hydratation pour ne pas écraser une session existante au premier rendu.
 */
function writeStoredCartItems(items) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* Stockage indisponible (mode privé, quota…) : le panier reste en mémoire uniquement. */
  }
}

/**
 * 2. Fournisseur de panier global
 *    - Objectif : partager et persister l'état du panier sur tout le site.
 *    - Variables clés : `items` stocke les lignes, `hydrated` autorise l'écriture localStorage.
 *    - Logique : hydratation au montage, sauvegarde à chaque modification, ouverture du tiroir à l'ajout.
 */
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  /* 2.4 Restauration du panier au chargement client */
  useEffect(() => {
    setItems(readStoredCartItems());
    setHydrated(true);
  }, []);

  /* 2.5 Persistance automatique après hydratation */
  useEffect(() => {
    if (!hydrated) {
      return;
    }

    writeStoredCartItems(items);
  }, [items, hydrated]);

  const addItem = useCallback((item) => {
    const lineId = getCartLineId(item);

    setItems((currentItems) => {
      const existingItem = currentItems.find((entry) => getCartLineId(entry) === lineId);

      if (existingItem) {
        return currentItems.map((entry) =>
          getCartLineId(entry) === lineId ? { ...entry, quantity: entry.quantity + 1 } : entry,
        );
      }

      return [
        ...currentItems,
        {
          lineId,
          id: item.id,
          slug: item.slug,
          name: item.name,
          priceLabel: item.priceLabel,
          image: item.image,
          variantId: item.variantId ?? null,
          variantLabel: item.variantLabel ?? null,
          quantity: 1,
        },
      ];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback((lineId) => {
    setItems((currentItems) => currentItems.filter((item) => item.lineId !== lineId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const count = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      count,
      open,
      setOpen,
      hydrated,
      addItem,
      removeItem,
      clearCart,
    }),
    [items, count, open, hydrated, addItem, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart doit être utilisé dans un CartProvider.");
  }

  return context;
}
