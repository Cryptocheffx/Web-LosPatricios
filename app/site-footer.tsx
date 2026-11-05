import Image from "next/image";
import Link from "next/link";
import { contactInfo } from "../lib/contact-info";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="Volver al inicio de Los Patricios">
            <Image
              src="/logo-los-patricios.png"
              width={128}
              height={63}
              alt="Los Patricios"
              style={{ height: "auto" }}
            />
          </Link>
          <p>Una selección de pato para disfrutar alrededor de la mesa.</p>
        </div>
        <div className="footer-links">
          <h2>Explora</h2>
          <Link href="/">Inicio</Link>
          <Link href="/tienda">Tienda</Link>
          <Link href="/about">About</Link>
          <Link href="/contacto">Contacto</Link>
        </div>
        <div className="footer-note">
          <span className="eyebrow">Atención personalizada</span>
          <p>
            Consultamos contigo la disponibilidad, presentación, precio y
            entrega de cada pedido.
          </p>
          <a className="footer-contact-link" href={`mailto:${contactInfo.email}`}>
            {contactInfo.email}
          </a>
          <a
            className="footer-contact-link"
            href={`tel:${contactInfo.phoneHref}`}
          >
            {contactInfo.phone}
          </a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Los Patricios</span>
        <span>El sabor auténtico del pato.</span>
      </div>
    </footer>
  );
}
