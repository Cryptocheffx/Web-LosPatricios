"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "../lib/products";
import { products } from "../lib/products";
import { useStore } from "./store-context";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M3.5 10h12m-5-5 5 5-5 5" />
    </svg>
  );
}

export default function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<"product" | "serving">("product");
  const selectedImage =
    activeImage === "serving" &&
    product.servingImage &&
    product.servingImageAlt
      ? {
          src: product.servingImage,
          alt: product.servingImageAlt,
        }
      : { src: product.image, alt: product.imageAlt };
  const images = [
    { id: "product" as const, src: product.image, label: "Producto" },
    ...(product.servingImage
      ? [
          {
            id: "serving" as const,
            src: product.servingImage,
            label: "Idea para servir",
          },
        ]
      : []),
  ];
  const relatedProducts = products.filter((item) => item.id !== product.id);

  return (
    <>
      <div className="shell product-breadcrumbs">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <Link href="/#productos">Tienda</Link>
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </div>
      <section className="shell product-detail">
        <div className="product-gallery">
          <div className="product-detail-image">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 52vw"
            />
            {product.featured && <span className="product-badge">Producto estrella</span>}
          </div>
          {images.length > 1 && (
            <div className="gallery-tabs" role="tablist" aria-label="Imágenes del producto">
              {images.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  role="tab"
                  aria-selected={activeImage === image.id}
                  className={activeImage === image.id ? "active" : ""}
                  onClick={() => setActiveImage(image.id)}
                >
                  {image.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-detail-copy">
          <span className="eyebrow">Selección Los Patricios / {product.categoryLabel}</span>
          <h1>{product.name}</h1>
          <span className="detail-quote">Precio a consultar</span>
          <p className="detail-lead">{product.description}</p>
          <p className="detail-description">{product.details}</p>

          <div className="detail-note">
            <span aria-hidden="true">✳</span>
            <p>
              El precio y la presentación se confirman contigo según la
              disponibilidad del producto.
            </p>
          </div>

          <div className="detail-add-row">
            <div className="quantity-control" aria-label="Cantidad a pedir">
              <button
                type="button"
                aria-label="Quitar una unidad"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                type="button"
                aria-label="Agregar una unidad"
                onClick={() => setQuantity((current) => Math.min(99, current + 1))}
                disabled={quantity >= 99}
              >
                +
              </button>
            </div>
            <button
              className="button button-primary detail-add-button"
              type="button"
              onClick={() => addToCart(product.id, quantity)}
            >
              Añadir al pedido <ArrowIcon />
            </button>
          </div>

          <dl className="product-facts">
            <div>
              <dt>Categoría</dt>
              <dd>{product.categoryLabel}</dd>
            </div>
            <div>
              <dt>Marca</dt>
              <dd>Los Patricios</dd>
            </div>
            <div>
              <dt>Precio</dt>
              <dd>A confirmar al cotizar</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="shell related-products">
        <div className="related-heading">
          <div>
            <span className="eyebrow">Descubre más</span>
            <h2>También te puede <em>interesar.</em></h2>
          </div>
          <Link href="/tienda">Ver tienda <ArrowIcon /></Link>
        </div>
        <div className="related-grid">
          {relatedProducts.slice(0, 3).map((item) => (
            <Link
              className="related-card"
              key={item.id}
              href={`/productos/${item.slug}`}
            >
              <div>
                <Image src={item.image} alt={item.imageAlt} fill sizes="220px" />
              </div>
              <span>{item.categoryLabel}</span>
              <strong>{item.name}</strong>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
