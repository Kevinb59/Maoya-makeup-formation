/**
 * 8. Ligne de prérequis (texte simple ou texte + lien)
 *    - Objectif : afficher les prérequis avec lien optionnel vers la malette produits.
 *    - Variables clés : `item` est une chaîne ou `{ text, link }`.
 *    - Logique : le lien pointe vers la fiche malette variable du catalogue.
 */
export default function PrerequisiteItem({ item }) {
  if (typeof item === "string") {
    return <li>{item}</li>;
  }

  return (
    <li>
      {item.text}
      <a href={item.link.href}>{item.link.label}</a>
    </li>
  );
}
