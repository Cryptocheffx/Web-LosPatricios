"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { products } from "../lib/products";

const slides = [
  {
    image: "/images/presentacion-magret.jpeg",
    alt: "Magret de pato cocinado y servido en un plato",
    eyebrow: "Una selección para disfrutar",
    title: "El sabor del pato,",
    highlight: "en su mejor momento.",
    description:
      "Cortes seleccionados y delicatessen para poner algo especial en tu mesa.",
    link: "/tienda",
    action: "Descubre la tienda",
  },
  {
    image: "/images/presentacion-machon.jpeg",
    alt: "Machones de pato dorados y listos para compartir",
    eyebrow: "Buenos momentos alrededor de la mesa",
    title: "Sabores que invitan",
    highlight: "a compartir.",
    description:
      "Encuentra el corte que te inspira y disfruta el pato a tu manera.",
    link: "/tienda",
    action: "Explora los cortes",
  },
  {
    image: "/images/foie-gras.jpeg",
    alt: "Foie Gras de pato de Los Patricios",
    eyebrow: "La delicatessen de Los Patricios",
    title: "Foie Gras,",
    highlight: "una experiencia única.",
    description:
      "Descubre la delicatessen estrella de Los Patricios y sus presentaciones.",
    link: "/productos/foie-gras",
    action: "Conoce el Foie Gras",
  },
];

const strengths = [
  {
    number: "01",
    title: "Especialistas en pato",
    description:
      "Una selección dedicada a los cortes de pato y a la delicatessen.",
  },
  {
    number: "02",
    title: "Foie Gras protagonista",
    description:
      "Nuestra especialidad para quienes buscan un detalle extraordinario.",
  },
  {
    number: "03",
    title: "Atención personalizada",
    description:
      "Te orientamos sobre productos y presentaciones cuando nos contactas.",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M3.5 10h12m-5-5 5 5-5 5" />
    </svg>
  );
}

function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % slides.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  const slide = slides[activeSlide];
  const moveSlide = (direction: -1 | 1) =>
    setActiveSlide(
      (current) => (current + direction + slides.length) % slides.length,
    );

  return (
    <section
      className="home-carousel"
      aria-label="Presentación de Los Patricios"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="carousel-image-wrap" key={slide.image}>
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          priority={activeSlide === 0}
          sizes="100vw"
          className="carousel-image"
        />
      </div>
      <div className="carousel-shade" />
      <div className="shell carousel-content">
        <div className="carousel-copy" aria-live="polite">
          <p className="home-eyebrow">
            <span />
            {slide.eyebrow}
          </p>
          <h1>
            {slide.title}
            <br />
            <em>{slide.highlight}</em>
          </h1>
          <p className="carousel-description">{slide.description}</p>
          <Link className="button button-carousel" href={slide.link}>
            {slide.action}
            <ArrowIcon />
          </Link>
        </div>
        <div className="carousel-controls">
          <div className="carousel-dots" aria-label="Seleccionar diapositiva">
            {slides.map((item, index) => (
              <button
                type="button"
                key={item.image}
                aria-label={`Mostrar imagen ${index + 1}: ${item.eyebrow}`}
                aria-current={activeSlide === index ? "true" : undefined}
                className={activeSlide === index ? "active" : ""}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
          <span className="carousel-counter">
            0{activeSlide + 1} <span>/</span> 0{slides.length}
          </span>
          <div className="carousel-arrows">
            <button
              type="button"
              onClick={() => moveSlide(-1)}
              aria-label="Imagen anterior"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => moveSlide(1)}
              aria-label="Imagen siguiente"
            >
              ›
            </button>
          </div>
        </div>
      </div>
      <span className="carousel-caption">LOS PATRICIOS · PRODUCTOS DE PATO</span>
    </section>
  );
}

export default function LandingPage() {
  return (
    <>
      <HeroCarousel />

      <section className="home-intro">
        <div className="shell home-intro-grid">
          <div className="home-intro-heading">
            <span className="home-eyebrow home-eyebrow-dark">
              <span />
              Una mesa con carácter
            </span>
            <h2>
              El placer de descubrir
              <br />
              <em>algo diferente.</em>
            </h2>
          </div>
          <div className="home-intro-copy">
            <p>
              En Los Patricios nos dedicamos a acercarte productos de pato para
              inspirar nuevas recetas y ocasiones para compartir. Conoce
              nuestros cortes y descubre el Foie Gras, nuestra delicatessen
              estrella.
            </p>
            <Link className="home-text-link" href="/about">
              Conoce Los Patricios <ArrowIcon />
            </Link>
          </div>
        </div>
        <div className="shell home-strengths">
          {strengths.map((strength) => (
            <article className="home-strength" key={strength.number}>
              <span>{strength.number}</span>
              <div>
                <h3>{strength.title}</h3>
                <p>{strength.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-featured shell">
        <div className="home-section-heading">
          <div>
            <span className="home-eyebrow home-eyebrow-dark">
              <span />
              La selección de la casa
            </span>
            <h2>
              Favoritos <em>de pato.</em>
            </h2>
          </div>
          <Link className="home-text-link" href="/tienda">
            Ver todos los productos <ArrowIcon />
          </Link>
        </div>
        <div className="home-product-grid">
          {products.map((product) => (
            <Link
              className="home-product-card"
              key={product.id}
              href={`/productos/${product.slug}`}
            >
              <div className="home-product-image">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 700px) 50vw, 260px"
                />
                {product.featured && (
                  <span className="product-badge">La especialidad</span>
                )}
              </div>
              <span className="catalog-category">{product.categoryLabel}</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </Link>
          ))}
        </div>
        <div className="home-featured-action">
          <Link className="button button-home-primary" href="/tienda">
            Explorar toda la tienda <ArrowIcon />
          </Link>
        </div>
      </section>

      <section className="home-about-band">
        <div className="shell home-about-grid">
          <div className="home-about-photo">
            <Image
              src="/images/presentacion-pierna.jpeg"
              alt="Una presentación de pato para disfrutar alrededor de la mesa"
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
            />
            <span className="home-photo-tag">Los Patricios · Buen gusto en cada detalle</span>
          </div>
          <div className="home-about-copy">
            <span className="home-eyebrow">
              <span />
              Conoce nuestra esencia
            </span>
            <h2>
              El pato es
              <br />
              <em>nuestro mundo.</em>
            </h2>
            <p>
              Una empresa dedicada a los productos de pato y al Foie Gras,
              pensada para quienes disfrutan descubriendo nuevos sabores y
              compartiéndolos en su mesa.
            </p>
            <Link className="button button-carousel" href="/about">
              Más sobre nosotros <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-contact-cta">
        <div className="shell home-contact-inner">
          <div>
            <span className="home-eyebrow">
              <span />
              Estamos aquí para ayudarte
            </span>
            <h2>
              ¿Tienes una consulta?
              <br />
              <em>Hablemos.</em>
            </h2>
          </div>
          <Link className="button button-carousel" href="/contacto">
            Ir a contacto <ArrowIcon />
          </Link>
        </div>
      </section>
    </>
  );
}
