import "./globals.css";
import ClientProviders from "@/components/providers/ClientProviders";
import { site } from "@/data/site";

/* 1. URL canonique du site
   - Objectif : générer des URLs absolues pour Open Graph (aperçu SMS, WhatsApp, réseaux).
   - Variables clés : `NEXT_PUBLIC_SITE_URL` en prod, fallback Vercel puis domaine Maoya.
   - Logique : `metadataBase` permet à Next.js de résoudre `/og/share.png` en URL complète. */
function getMetadataBase() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  }

  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }

  return new URL(site.baseUrl);
}

export const metadata = {
  metadataBase: getMetadataBase(),
  title: site.shareTitle,
  description: site.shareDescription,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Maoya Makeup Formation",
    title: site.shareTitle,
    description: site.shareDescription,
    images: [
      {
        url: site.shareImage,
        width: 1200,
        height: 630,
        alt: "Maoya Makeup Formation — formations maquillage et conseil en image à Lille",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.shareTitle,
    description: site.shareDescription,
    images: [site.shareImage],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
