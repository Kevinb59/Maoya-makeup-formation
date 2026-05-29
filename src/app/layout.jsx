import "./globals.css";
import ClientProviders from "@/components/providers/ClientProviders";
import { site } from "@/data/site";

/* 1. URL canonique du site
   - Objectif : générer des URLs absolues pour Open Graph (aperçu SMS, WhatsApp, réseaux).
   - Variables clés : `NEXT_PUBLIC_SITE_URL` en prod, puis alias Vercel public (jamais l'URL preview hashée).
   - Logique : les previews Vercel (`*-xxx.vercel.app`) renvoient 401 aux crawlers → image invisible en SMS. */
function getMetadataBase() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  }

  if (process.env.VERCEL_ENV === "production") {
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      return new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
    }

    return new URL("https://maoya-makeup-formation.vercel.app");
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
        height: 558,
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
