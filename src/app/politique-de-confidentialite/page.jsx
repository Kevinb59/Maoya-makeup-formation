import LegalPlaceholderPage from "@/components/legal/LegalPlaceholderPage";

export const metadata = {
  title: "Politique de confidentialité — Maoya Makeup Formation",
  description: "Politique de confidentialité et protection des données personnelles.",
};

export default function Page() {
  return (
    <LegalPlaceholderPage
      title="Politique de confidentialité"
      intro="Cette page détaillera la collecte, l'utilisation et la protection de vos données personnelles."
    />
  );
}
