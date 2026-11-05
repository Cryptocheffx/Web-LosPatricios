import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Conoce Los Patricios: una empresa dedicada al pato, sus cortes y la delicatessen Foie Gras.",
};

const pillars = [
  {
    number: "01",
    title: "El pato",
    description:
      "Una propuesta especializada con magret, pierna y machón de pato.",
  },
  {
    number: "02",
    title: "La delicatessen",
    description:
      "Foie Gras de pato: la especialidad que distingue nuestra selección.",
  },
  {
    number: "03",
    title: "La mesa",
    description:
      "Productos e ideas para preparar, servir y compartir en cada ocasión.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="inner-page-hero about-page-hero">
        <div className="shell inner-page-hero-content">
          <span className="eyebrow">Los Patricios</span>
          <h1>
            About <em>nosotros.</em>
          </h1>
          <nav className="breadcrumbs" aria-label="Ruta de navegación">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span>About</span>
          </nav>
        </div>
      </section>

      <section className="shell about-story">
        <div className="about-story-image">
          <Image
            src="/images/presentacion-magret.jpeg"
            alt="Magret de pato preparado para disfrutar en la mesa"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <span>El placer está en compartir</span>
        </div>
        <div className="about-story-copy">
          <span className="eyebrow">Nuestra empresa</span>
          <h2>
            Una pasión por el pato
            <br />
            <em>y sus buenos momentos.</em>
          </h2>
          <p>
            Los Patricios es una empresa dedicada a la venta de carne de pato y
            productos delicatessen. Nuestra selección reúne cortes de pato y
            Foie Gras para llevar nuevas experiencias de sabor a la mesa.
          </p>
          <p>
            El Foie Gras es nuestra especialidad y el corazón de una propuesta
            pensada para quienes disfrutan la buena cocina, descubren nuevos
            sabores y celebran alrededor de la mesa.
          </p>
          <Link className="button button-home-primary" href="/tienda">
            Conoce nuestra tienda
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
              <path d="M3.5 10h12m-5-5 5 5-5 5" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="about-pillars-section">
        <div className="shell">
          <div className="about-pillars-heading">
            <span className="eyebrow">Lo que nos define</span>
            <h2>
              Del producto <em>a tu mesa.</em>
            </h2>
          </div>
          <div className="about-pillars">
            {pillars.map((pillar) => (
              <article className="about-pillar" key={pillar.number}>
                <span>{pillar.number}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-finish shell">
        <div>
          <span className="eyebrow">Una selección especial</span>
          <h2>
            Hay algo delicioso
            <br />
            <em>por descubrir.</em>
          </h2>
        </div>
        <div>
          <p>
            Explora los productos de Los Patricios y encuentra el corte o
            delicatessen que buscas para tu próxima ocasión.
          </p>
          <Link className="button button-home-primary" href="/tienda">
            Ir a la tienda
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
              <path d="M3.5 10h12m-5-5 5 5-5 5" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
