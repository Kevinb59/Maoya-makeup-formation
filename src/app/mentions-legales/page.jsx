import LegalPlaceholderPage from "@/components/legal/LegalPlaceholderPage";

export const metadata = {
  title: "Mentions légales — Maoya Makeup Formation",
  description: "Mentions légales du site Maoya Makeup Formation.",
};

export default function Page() {
  return (
    <LegalPlaceholderPage
      title="Mentions légales"
      intro="Retrouvez ici les informations légales relatives à l'éditeur du site et à l'hébergement."
    />
  );
}
