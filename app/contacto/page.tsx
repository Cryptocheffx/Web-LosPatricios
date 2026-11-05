import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "../contact-form";
import { contactInfo } from "../../lib/contact-info";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta a Los Patricios por teléfono, WhatsApp o correo. Consulta nuestros productos de pato y Foie Gras.",
};

function ContactIcon({ kind }: { kind: "phone" | "whatsapp" | "email" }) {
  if (kind === "email") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (kind === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 11.6a8.3 8.3 0 0 1-12.4 7.2L3 20l1.2-4.4A8.3 8.3 0 1 1 20 11.6Z" />
        <path d="M8.2 8.4c.3-.6.7-.5 1-.5h.3c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4 0 .6l-.6.7c-.2.2-.1.4 0 .6.4.7 1 1.3 1.7 1.8.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.5.7c.3.2.4.3.4.5 0 .2 0 .8-.4 1.2-.4.4-1.1.7-1.8.6-.7-.1-1.7-.5-2.9-1.5-1.5-1.3-2.5-2.8-2.8-3.6-.3-.8 0-1.6.4-2.1Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3h10v18H7z" />
      <path d="M10 6h4m-3 12h2" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="inner-page-hero contact-page-hero">
        <div className="shell inner-page-hero-content">
          <span className="eyebrow">Estamos para ayudarte</span>
          <h1>
            Hablemos de
            <br />
            <em>algo delicioso.</em>
          </h1>
          <nav className="breadcrumbs" aria-label="Ruta de navegación">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span>Contacto</span>
          </nav>
        </div>
      </section>

      <section className="shell contact-page-layout">
        <div className="contact-details">
          <span className="eyebrow">Contacto directo</span>
          <h2>
            Estamos a un
            <br />
            mensaje de distancia.
          </h2>
          <p className="contact-details-copy">
            Escríbenos para consultar sobre Foie Gras, cortes de pato,
            presentaciones disponibles o tu pedido.
          </p>

          <div className="contact-methods">
            <a className="contact-method" href={`tel:${contactInfo.phoneHref}`}>
              <span className="contact-method-icon">
                <ContactIcon kind="phone" />
              </span>
              <span>
                <small>Llámanos</small>
                <strong>{contactInfo.phone}</strong>
                <em>Atención telefónica</em>
              </span>
            </a>
            <a
              className="contact-method"
              href={`https://wa.me/${contactInfo.whatsappHref}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-method-icon">
                <ContactIcon kind="whatsapp" />
              </span>
              <span>
                <small>Escríbenos por WhatsApp</small>
                <strong>{contactInfo.phone}</strong>
                <em>Consulta sobre tu pedido</em>
              </span>
              <span className="contact-method-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a className="contact-method" href={`mailto:${contactInfo.email}`}>
              <span className="contact-method-icon">
                <ContactIcon kind="email" />
              </span>
              <span>
                <small>Correo electrónico</small>
                <strong>{contactInfo.email}</strong>
                <em>Envíanos tu consulta</em>
              </span>
              <span className="contact-method-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>

          <div className="contact-hours-note">
            <span aria-hidden="true">✳</span>
            <p>
              Te ayudamos a confirmar precios, presentaciones y disponibilidad
              directamente.
            </p>
          </div>

          <Link className="contact-back-shop" href="/tienda">
            Explorar productos de pato <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ContactForm />
      </section>
    </>
  );
}
