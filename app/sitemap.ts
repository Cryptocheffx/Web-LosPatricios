import type { MetadataRoute } from "next";
import { products } from "../lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

  if (!siteUrl) {
    return [];
  }

  const pages = ["", "/tienda", "/about", "/contacto"];

  return [
    ...pages.map((path, index) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "weekly" as const,
      priority: index === 0 ? 1 : 0.8,
    })),
    ...products.map((product) => ({
      url: `${siteUrl}/productos/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: product.featured ? 0.9 : 0.7,
    })),
  ];
}
