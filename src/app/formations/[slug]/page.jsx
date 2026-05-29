import { notFound } from "next/navigation";
import FormationDetailPage from "@/components/formations/FormationDetailPage";
import ProductDetailPage from "@/components/formations/ProductDetailPage";
import { getCatalogItemBySlug, getCatalogSlugs } from "@/data/catalog";

export function generateStaticParams() {
  return getCatalogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getCatalogItemBySlug(slug);

  if (!item) {
    return {
      title: "Article introuvable — Maoya Makeup Formation",
    };
  }

  const description =
    item.introText?.split("\n\n")[0] ??
    item.descriptionParagraphs?.[0] ??
    item.subtitle ??
    item.name;

  return {
    title: `${item.name} — Maoya Makeup Formation`,
    description,
  };
}

export default async function FormationPage({ params }) {
  const { slug } = await params;
  const item = getCatalogItemBySlug(slug);

  if (!item) {
    notFound();
  }

  if (item.type === "product") {
    return <ProductDetailPage product={item} />;
  }

  return <FormationDetailPage formation={item} />;
}
