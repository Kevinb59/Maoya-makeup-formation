import "./globals.css";

export const metadata = {
  title: "Maoya Makeup Formation — Formation en maquillage & conseil en image",
  description:
    "Formation en maquillage individuelle et personnalisée à Lille et à distance. Éligible CPF, paiement en 4x.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
