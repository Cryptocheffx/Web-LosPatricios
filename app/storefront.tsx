"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, products, type ProductCategory } from "../lib/products";
import { useStore } from "./store-context";

type CategoryId = ProductCategory | "todos";
type SortOrder = "featured" | "name-asc" | "name-desc";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M3.5 10h12m-5-5 5 5-5 5" />
    </svg>
  );
}

export default function Storefront() {
  const { addToCart } = useStore();
  const [category, setCategory] = useState<CategoryId>("todos");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOrder>("featured");

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("es");
    return products
      .filter((product) => category === "todos" || product.category === category)
      .filter(
        (product) =>
          !query ||
          `${product.name} ${product.categoryLabel} ${product.description}`
            .toLocaleLowerCase("es")
            .includes(query),
      )
      .sort((a, b) => {
        if (sort === "name-asc") return a.name.localeCompare(b.name, "es");
        if (sort === "name-desc") return b.name.localeCompare(a.name, "es");
        return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      });
  }, [category, search, sort]);

  const countForCategory = (selected: CategoryId) =>
    selected === "todos"
      ? products.length
      : products.filter((product) => product.category === selected).length;

  return (
    <>
      <section className="shop-hero">
        <div className="shop-hero-photo" aria-hidden="true" />
        <div className="shell shop-hero-inner">
          <div>
            <p>Los Patricios · Selección de pato</p>
            <h1>Tienda</h1>
          </div>
          <nav className="breadcrumbs" aria-label="Ruta de navegación">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span>Tienda</span>
          </nav>
        </div>
      </section>

      <section className="shop-section shell" id="productos">
        <aside className="shop-sidebar" aria-label="Filtros de productos">
          <div className="sidebar-block">
            <div className="sidebar-title">
              <h2>Categorías</h2>
              <span>{products.length}</span>
            </div>
            <div className="sidebar-categories">
              {categories.map((item) => (
                <button
                  className={`sidebar-category${category === item.id ? " selected" : ""}`}
                  key={item.id}
                  type="button"
                  aria-pressed={category === item.id}
                  onClick={() => setCategory(item.id)}
                >
                  <span>{item.label}</span>
                  <span className="category-count">
                    {countForCategory(item.id)}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="sidebar-promo">
            <span className="eyebrow">La especialidad de la casa</span>
            <h3>El Foie Gras es el protagonista.</h3>
            <p>
              Explora nuestra delicatessen y consulta sus presentaciones.
            </p>
            <Link href="/productos/foie-gras">
              Ver Foie Gras <ArrowIcon />
            </Link>
          </div>
          <div className="sidebar-help">
            <span className="sidebar-help-mark">LP</span>
            <p>¿Primera vez con el pato?</p>
            <Link href="#inspiracion">Mira las ideas para servir →</Link>
          </div>
        </aside>

        <div className="shop-main">
          <div className="shop-heading">
            <div>
              <span className="eyebrow">Una selección para tu mesa</span>
              <h2>
                Productos <em>de pato</em>
              </h2>
              <p>Descubre cada corte y encuentra el que va con tu mesa.</p>
            </div>
            <span className="shop-heading-seal" aria-hidden="true">
              LOS
              <br />
              PATRICIOS
            </span>
          </div>

          <div className="shop-toolbar">
            <label className="product-search">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 4.5 4.5" />
              </svg>
              <input
                type="search"
                aria-label="Buscar productos"
                placeholder="Buscar productos..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Borrar búsqueda"
                >
                  ×
                </button>
              )}
            </label>
            <label className="sort-control">
              <span>Ordenar:</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOrder)}
                aria-label="Ordenar productos"
              >
                <option value="featured">Destacados</option>
                <option value="name-asc">Nombre: A a Z</option>
                <option value="name-desc">Nombre: Z a A</option>
              </select>
            </label>
          </div>

          <div className="category-tabs" role="group" aria-label="Filtrar por categoría">
            {categories.map((item) => (
              <button
                className={`category-tab${category === item.id ? " active" : ""}`}
                key={item.id}
                type="button"
                aria-pressed={category === item.id}
                onClick={() => setCategory(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="results-row" aria-live="polite">
            <span>
              Mostrando <strong>{visibleProducts.length}</strong> de{" "}
              <strong>{products.length}</strong> productos
            </span>
            {search && <span>Resultados para “{search}”</span>}
          </div>

          {visibleProducts.length > 0 ? (
            <div className="catalog-grid">
              {visibleProducts.map((product) => (
                <article
                  className={`catalog-card${product.featured ? " featured-product" : ""}`}
                  key={product.id}
                >
                  <div className="catalog-photo">
                    <Link
                      className="catalog-photo-link"
                      href={`/productos/${product.slug}`}
                      aria-label={`Ver detalles de ${product.name}`}
                    >
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        sizes="(max-width: 680px) 50vw, (max-width: 1040px) 40vw, 260px"
                      />
                    </Link>
                    {product.featured && (
                      <span className="product-badge">La especialidad</span>
                    )}
                    <button
                      className="quick-add"
                      type="button"
                      onClick={() => addToCart(product.id)}
                    >
                      Añadir al pedido <span aria-hidden="true">+</span>
                    </button>
                  </div>
                  <div className="catalog-card-copy">
                    <span className="catalog-category">
                      {product.categoryLabel}
                    </span>
                    <h3>
                      <Link href={`/productos/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <p>{product.description}</p>
                    <div className="catalog-card-footer">
                      <span className="quote-price">Precio a consultar</span>
                      <Link
                        className="card-arrow"
                        href={`/productos/${product.slug}`}
                        aria-label={`Ver producto ${product.name}`}
                      >
                        <ArrowIcon />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No encontramos productos</h3>
              <p>Prueba otra palabra o vuelve a ver toda la selección.</p>
              <button
                className="button button-outline"
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("todos");
                }}
              >
                Ver todos los productos
              </button>
            </div>
          )}

          <div className="catalog-disclaimer">
            <span aria-hidden="true">✳</span>
            <p>
              Los precios, pesos, presentaciones y disponibilidad se confirman
              directamente al cotizar.
            </p>
          </div>
        </div>
      </section>

      <section className="inspiration-strip" id="inspiracion">
        <div className="shell inspiration-inner">
          <div>
            <span className="eyebrow">Inspírate en tu cocina</span>
            <h2>De nuestros productos <em>a tu mesa.</em></h2>
          </div>
          <div className="serving-ideas">
            {[
              {
                name: "Magret",
                image: "/images/presentacion-magret.jpeg",
                alt: "Magret de pato servido en un plato",
              },
              {
                name: "Pierna",
                image: "/images/presentacion-pierna.jpeg",
                alt: "Pierna de pato servida con acompañamientos",
              },
              {
                name: "Machón",
                image: "/images/presentacion-machon.jpeg",
                alt: "Machones de pato preparados y servidos",
              },
            ].map((idea) => (
              <figure className="serving-card" key={idea.name}>
                <div>
                  <Image src={idea.image} alt={idea.alt} fill sizes="100px" />
                </div>
                <figcaption>{idea.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
