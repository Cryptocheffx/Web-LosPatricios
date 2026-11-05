"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useStore } from "./store-context";

function BasketIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 1.9-1.4L21 8H6" />
      <circle cx="10" cy="20" r="1.3" />
      <circle cx="18" cy="20" r="1.3" />
    </svg>
  );
}

export default function SiteHeader() {
  const { cartCount, openCart } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Inicio" },
    { href: "/tienda", label: "Tienda" },
    { href: "/contacto", label: "Contacto" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      <div className="topline">
        <div className="shell topline-inner">
          <span>El sabor auténtico del pato</span>
          <span>FOIE GRAS · MAGRET · CORTES DE PATO</span>
        </div>
      </div>
      <header className="site-header">
        <div className="shell header-main">
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <Link className="brand" href="/" aria-label="Los Patricios, inicio">
            <Image
              src="/logo-los-patricios.png"
              width={128}
              height={63}
              alt="Los Patricios"
              priority
              style={{ height: "auto" }}
            />
          </Link>
          <nav
            className={`main-nav${menuOpen ? " main-nav-open" : ""}`}
            aria-label="Navegación principal"
          >
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <button
            className="cart-button"
            type="button"
            onClick={openCart}
            aria-label={`Abrir carrito, ${cartCount} unidades`}
          >
            <BasketIcon />
            <span>Mi carrito</span>
            <span className="cart-count" aria-live="polite">
              {cartCount}
            </span>
          </button>
        </div>
      </header>
    </>
  );
}
