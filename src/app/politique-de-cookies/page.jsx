import LegalPlaceholderPage from "@/components/legal/LegalPlaceholderPage";

export const metadata = {
  title: "Politique de cookies — Maoya Makeup Formation",
  description: "Politique de cookies du site Maoya Makeup Formation.",
};

export default function Page() {
  return (
    <LegalPlaceholderPage
      title="Politique de cookies"
      intro="Cette page expliquera l'utilisation des cookies et vos options de gestion du consentement."
    />
  );
}
