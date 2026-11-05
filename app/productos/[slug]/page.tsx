import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "../../product-detail";
import { getProduct, products } from "../../../lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Producto no encontrado" };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    title: product.name,
    description: product.description,
    ...(siteUrl
      ? {
          openGraph: {
            title: `${product.name} | Los Patricios`,
            description: product.description,
            images: [{ url: product.image, alt: product.imageAlt }],
          },
        }
      : {}),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [
      product.image,
      ...(product.servingImage ? [product.servingImage] : []),
    ],
    category: "Duck meat",
    brand: { "@type": "Brand", name: "Los Patricios" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetail product={product} />
    </>
  );
}
