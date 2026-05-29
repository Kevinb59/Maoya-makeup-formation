import LegalPlaceholderPage from "@/components/legal/LegalPlaceholderPage";

export const metadata = {
  title: "Conditions générales de vente — Maoya Makeup Formation",
  description: "Conditions générales de vente des formations Maoya Makeup Formation.",
};

export default function Page() {
  return (
    <LegalPlaceholderPage
      title="Conditions générales de vente"
      intro="Les conditions générales de vente encadreront les modalités d'inscription et de paiement de nos formations."
    />
  );
}
