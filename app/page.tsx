import Image from "next/image";

const products = [
  {
    name: "Foie Gras",
    category: "Nuestra delicatessen",
    description: "El protagonista de una mesa especial.",
    image: "/images/foie-gras.jpeg",
    alt: "Foie Gras en su presentación envasada",
    featured: true,
  },
  {
    name: "Magret de pato",
    category: "Corte de pato",
    description: "Un corte lleno de sabor para lucirte en la cocina.",
    image: "/images/magret-de-pato.jpeg",
    alt: "Magret de pato crudo sobre una tabla de madera",
  },
  {
    name: "Pierna de pato",
    category: "Corte de pato",
    description: "Una opción generosa para compartir en la mesa.",
    image: "/images/pierna-de-pato.jpeg",
    alt: "Pierna de pato fresca sobre una tabla",
  },
  {
    name: "Machón de pato",
    category: "Corte de pato",
    description: "Una pieza sabrosa para inspirar tu próxima receta.",
    image: "/images/machon-de-pato.jpeg",
    alt: "Machón de pato crudo sobre una tabla",
  },
];

const servingIdeas = [
  {
    name: "Magret a la mesa",
    description: "Un corte dorado, servido para disfrutar sin apuro.",
    image: "/images/presentacion-magret.jpeg",
    alt: "Magret de pato cocinado y presentado en un plato",
  },
  {
    name: "Machón dorado",
    description: "Una presentación cálida para compartir en familia.",
    image: "/images/presentacion-machon.jpeg",
    alt: "Machones de pato dorados y servidos con hierbas",
  },
  {
    name: "Pierna al horno",
    description: "Una idea de plato principal para una ocasión especial.",
    image: "/images/presentacion-pierna.jpeg",
    alt: "Pierna de pato servida con acompañamientos",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3.5 10h12m-5-5 5 5-5 5" />
    </svg>
  );
}

function SiteHeader() {
  return (
    <>
      <div className="topline">
        <div className="container topline-inner">
          <p>Los Patricios · El sabor auténtico del pato</p>
          <a href="#productos">
            Descubre nuestra selección <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label="Los Patricios, inicio">
            <Image
              src="/logo-los-patricios.png"
              width={128}
              height={63}
              alt="Los Patricios"
              priority
            />
          </a>
          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#inicio">Inicio</a>
            <a href="#nosotros">Nuestra historia</a>
            <a href="#productos">Productos</a>
            <a href="#inspiracion">Inspiración</a>
          </nav>
          <a className="header-cta" href="#contacto">
            Hablemos <ArrowIcon />
          </a>
          <details className="mobile-menu">
            <summary aria-label="Abrir menú de navegación">
              <span />
              <span />
              <span />
            </summary>
            <nav aria-label="Navegación móvil">
              <a href="#inicio">Inicio</a>
              <a href="#nosotros">Nuestra historia</a>
              <a href="#productos">Productos</a>
              <a href="#inspiracion">Inspiración</a>
              <a href="#contacto">Contacto</a>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="eyebrow-line" />
                Una experiencia para saborear
              </p>
              <h1>
                El pato tiene
                <br />
                <em>su lado</em> exquisito.
              </h1>
              <p className="hero-description">
                Una selección de cortes de pato y delicatessen para cocinar,
                compartir y celebrar. Descubre el sabor especial de Los
                Patricios.
              </p>
              <div className="hero-actions">
                <a className="button button-dark" href="#productos">
                  Descubrir productos <ArrowIcon />
                </a>
                <a className="text-link" href="#nosotros">
                  Conócenos <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="hero-notes" aria-label="Lo que nos distingue">
                <span>Delicatessen</span>
                <span>Cortes de pato</span>
                <span>Inspiración para tu mesa</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-wrap">
                <Image
                  src="/images/presentacion-magret.jpeg"
                  alt="Magret de pato cocinado y servido en un plato"
                  fill
                  sizes="(max-width: 760px) 100vw, 52vw"
                  className="hero-image"
                />
              </div>
              <div className="hero-image-caption">
                <span>Un clásico para disfrutar</span>
                <span>01 — 03</span>
              </div>
              <a className="feature-stamp" href="#foie-gras">
                <span>Descubre</span>
                <strong>Foie<br />Gras</strong>
                <span className="stamp-arrow" aria-hidden="true">↗</span>
              </a>
              <span className="hero-side-note">BUEN GUSTO, EN CADA DETALLE</span>
            </div>
          </div>
          <div className="hero-bottom-rule" />
        </section>

        <section className="intro-section section-pad" id="nosotros">
          <div className="container intro-grid">
            <div className="intro-heading">
              <p className="eyebrow">
                <span className="eyebrow-line" />
                Nuestra esencia
              </p>
              <h2>
                Una mesa memorable
                <br />
                <em>empieza con</em> buenos sabores.
              </h2>
            </div>
            <div className="intro-copy">
              <p>
                En Los Patricios celebramos el sabor del pato y todo lo que
                sucede alrededor de la mesa. Explora nuestra selección, desde
                cortes para tus recetas hasta el inconfundible Foie Gras.
              </p>
              <a className="text-link" href="#productos">
                Explorar la selección <span aria-hidden="true">↗</span>
              </a>
              <div className="intro-signature">Los Patricios</div>
            </div>
          </div>
          <div className="container values-row">
            <div className="value-item">
              <span className="value-number">01</span>
              <span>Una selección con personalidad</span>
            </div>
            <div className="value-item">
              <span className="value-number">02</span>
              <span>El Foie Gras como protagonista</span>
            </div>
            <div className="value-item">
              <span className="value-number">03</span>
              <span>Ideas para disfrutar y compartir</span>
            </div>
          </div>
        </section>

        <section className="products-section section-pad" id="productos">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow-line" />
                  Una selección especial
                </p>
                <h2>Descubre nuestros <em>favoritos.</em></h2>
              </div>
              <p className="section-description">
                Productos para darle un toque distinto a tus recetas y
                ocasiones especiales.
              </p>
            </div>

            <div className="product-grid">
              {products.map((product, index) => (
                <article
                  className={`product-card${product.featured ? " product-card-featured" : ""}`}
                  id={product.featured ? "foie-gras" : undefined}
                  key={product.name}
                >
                  <a
                    className="product-image-link"
                    href="#contacto"
                    aria-label={`Consultar por ${product.name}`}
                  >
                    <div className="product-image-wrap">
                      <Image
                        src={product.image}
                        alt={product.alt}
                        fill
                        sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 25vw"
                        className="product-image"
                      />
                      {product.featured && (
                        <span className="product-ribbon">Producto estrella</span>
                      )}
                    </div>
                  </a>
                  <div className="product-meta">
                    <span>{product.category}</span>
                    <span>0{index + 1}</span>
                  </div>
                  <div className="product-title-row">
                    <h3>{product.name}</h3>
                    <a
                      className="round-link"
                      href="#contacto"
                      aria-label={`Consultar por ${product.name}`}
                    >
                      <ArrowIcon />
                    </a>
                  </div>
                  <p className="product-description">{product.description}</p>
                </article>
              ))}
            </div>
            <p className="catalog-note">
              Las presentaciones y disponibilidad pueden variar. Escríbenos
              para más información.
            </p>
          </div>
        </section>

        <section className="feature-section" aria-labelledby="feature-title">
          <div className="container feature-grid">
            <div className="feature-photo">
              <Image
                src="/images/foie-gras.jpeg"
                alt="Presentación de Foie Gras de Los Patricios"
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
                className="feature-image"
              />
              <span className="photo-caption">El detalle que lo cambia todo</span>
            </div>
            <div className="feature-copy">
              <p className="eyebrow eyebrow-light">
                <span className="eyebrow-line" />
                El protagonista
              </p>
              <h2 id="feature-title">
                Foie Gras,
                <br />
                <em>para ocasiones</em>
                <br />
                inolvidables.
              </h2>
              <p>
                Un delicatessen que transforma un momento en una celebración.
                Descúbrelo y encuentra la ocasión perfecta para compartirlo.
              </p>
              <a className="button button-light" href="#contacto">
                Consultar Foie Gras <ArrowIcon />
              </a>
              <span className="feature-index">01 / DELICATESSEN</span>
            </div>
          </div>
        </section>

        <section className="inspiration-section section-pad" id="inspiracion">
          <div className="container">
            <div className="section-heading inspiration-heading">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow-line" />
                  Ideas para servir
                </p>
                <h2>Del producto <em>a tu mesa.</em></h2>
              </div>
              <p className="section-description">
                Un poco de inspiración para imaginar tu próxima receta.
              </p>
            </div>
            <div className="inspiration-grid">
              {servingIdeas.map((idea, index) => (
                <article className="inspiration-card" key={idea.name}>
                  <div className="inspiration-image-wrap">
                    <Image
                      src={idea.image}
                      alt={idea.alt}
                      fill
                      sizes="(max-width: 700px) 100vw, 33vw"
                      className="inspiration-image"
                    />
                    <span className="inspiration-number">0{index + 1}</span>
                  </div>
                  <div className="inspiration-copy">
                    <h3>{idea.name}</h3>
                    <p>{idea.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contacto">
          <div className="container contact-inner">
            <div>
              <p className="eyebrow eyebrow-light">
                <span className="eyebrow-line" />
                Los Patricios
              </p>
              <h2>
                Que empiece
                <br />
                <em>algo delicioso.</em>
              </h2>
            </div>
            <div className="contact-action">
              <p>
                ¿Quieres conocer más sobre nuestros productos? Explora la
                selección y consulta las presentaciones disponibles.
              </p>
              <a className="button button-light" href="#productos">
                Volver a los productos <ArrowIcon />
              </a>
            </div>
            <span className="contact-watermark" aria-hidden="true">LP</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <a href="#inicio" aria-label="Los Patricios, volver al inicio">
              <Image
                src="/logo-los-patricios.png"
                width={128}
                height={63}
                alt="Los Patricios"
              />
            </a>
            <p>El sabor del pato, para compartir a tu manera.</p>
          </div>
          <div className="footer-links">
            <span>Explora</span>
            <a href="#nosotros">Nuestra esencia</a>
            <a href="#productos">Productos</a>
            <a href="#inspiracion">Ideas para servir</a>
          </div>
          <a className="back-to-top" href="#inicio">
            Volver arriba <span aria-hidden="true">↑</span>
          </a>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Los Patricios</span>
          <span>Una invitación a disfrutar.</span>
        </div>
      </footer>
    </>
  );
}
