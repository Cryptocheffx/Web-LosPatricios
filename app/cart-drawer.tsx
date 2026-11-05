"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { contactInfo } from "../lib/contact-info";
import { products } from "../lib/products";
import { useStore } from "./store-context";

function getOrderMessage(name: string, contact: string, note: string, lines: string) {
  return [
    "Hola, quiero consultar y cotizar este pedido de Los Patricios:",
    "",
    lines,
    "",
    `Nombre: ${name.trim()}`,
    `Contacto: ${contact.trim()}`,
    note.trim() ? `Comentario: ${note.trim()}` : "",
    "",
    "Por favor, confirmen presentaciones, precios, disponibilidad y envío.",
  ]
    .filter(Boolean)
    .join("\n");
}

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    clearCart,
    removeFromCart,
    setCartQuantity,
    storageError,
  } = useStore();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [feedback, setFeedback] = useState("");

  const lines = cart.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ product, quantity: line.quantity }] : [];
  });
  const itemCount = lines.reduce((total, line) => total + line.quantity, 0);
  const orderLines = lines
    .map(({ product, quantity }) => `• ${product.name} — ${quantity} unidad(es)`)
    .join("\n");

  useEffect(() => {
    if (!isCartOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("cart-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("cart-open");
    };
  }, [isCartOpen, closeCart]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");

    const message = getOrderMessage(name, contact, note, orderLines);
    const encoded = encodeURIComponent(message);
    if (contactInfo.whatsappHref) {
      window.location.assign(
        `https://wa.me/${contactInfo.whatsappHref}?text=${encoded}`,
      );
      return;
    }

    if (contactInfo.email) {
      window.location.assign(
        `mailto:${contactInfo.email}?subject=${encodeURIComponent("Consulta de pedido — Los Patricios")}&body=${encoded}`,
      );
      return;
    }

    void (async () => {
      try {
        await navigator.clipboard.writeText(message);
        setFeedback(
          "El pedido se copió. Compártelo con Los Patricios para confirmar precios, presentaciones y envío.",
        );
      } catch (error) {
        console.error("No se pudo copiar el pedido al portapapeles.", error);
        setFeedback(
          "No fue posible copiar el pedido automáticamente. Selecciona y copia el resumen de arriba.",
        );
      }
    })();
  }

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onMouseDown={closeCart}>
      <section
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="cart-drawer-header">
          <div>
            <span className="eyebrow">Los Patricios</span>
            <h2 id="cart-title">Tu pedido</h2>
          </div>
          <button
            className="icon-button"
            type="button"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            autoFocus
          >
            ×
          </button>
        </div>

        {storageError && <p className="store-warning">{storageError}</p>}

        {lines.length === 0 ? (
          <div className="empty-cart">
            <span className="empty-cart-icon">
              <span />
              <span />
            </span>
            <h3>Tu carrito está vacío</h3>
            <p>Explora los cortes de pato y encuentra tu próximo favorito.</p>
            <button
              className="button button-primary"
              type="button"
              onClick={closeCart}
            >
              Ver productos
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-heading">
              <span>{itemCount} unidad(es)</span>
              <button type="button" className="clear-cart" onClick={clearCart}>
                Vaciar carrito
              </button>
            </div>
            <div className="cart-lines">
              {lines.map(({ product, quantity }) => (
                <article className="cart-line" key={product.id}>
                  <Link
                    className="cart-line-image"
                    href={`/productos/${product.slug}`}
                    onClick={closeCart}
                  >
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      sizes="84px"
                    />
                  </Link>
                  <div className="cart-line-info">
                    <Link
                      className="cart-line-name"
                      href={`/productos/${product.slug}`}
                      onClick={closeCart}
                    >
                      {product.name}
                    </Link>
                    <span className="cart-line-price">Precio a confirmar</span>
                    <div className="quantity-control">
                      <button
                        type="button"
                        aria-label={`Quitar una unidad de ${product.name}`}
                        onClick={() =>
                          setCartQuantity(product.id, quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span>{quantity}</span>
                      <button
                        type="button"
                        aria-label={`Agregar una unidad de ${product.name}`}
                        onClick={() =>
                          setCartQuantity(product.id, quantity + 1)
                        }
                        disabled={quantity >= 99}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-line"
                    type="button"
                    aria-label={`Quitar ${product.name} del carrito`}
                    onClick={() => removeFromCart(product.id)}
                  >
                    ×
                  </button>
                </article>
              ))}
            </div>

            <div className="cart-price-note">
              <strong>Precio total: a confirmar</strong>
              <p>
                Confirma precio, peso o presentación, disponibilidad y envío al
                solicitar tu cotización.
              </p>
            </div>

            <form className="checkout-form" onSubmit={handleSubmit}>
              <h3>Solicita tu cotización</h3>
              <label>
                Tu nombre
                <input
                  required
                  maxLength={100}
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Nombre y apellido"
                />
              </label>
              <label>
                Teléfono o correo para responderte
                <input
                  required
                  maxLength={160}
                  autoComplete="email"
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  placeholder="Cómo podemos contactarte"
                />
              </label>
              <label>
                Comentario <span>(opcional)</span>
                <textarea
                  maxLength={500}
                  rows={2}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Presentación o consulta que te interesa"
                />
              </label>
              <div className="order-preview">
                <strong>Vista previa de tu pedido</strong>
                <pre>
                  {getOrderMessage(name, contact, note, orderLines)}
                </pre>
              </div>
              <button className="button button-primary checkout-button" type="submit">
                Enviar solicitud <span aria-hidden="true">→</span>
              </button>
              {feedback && (
                <p className="form-feedback" role="status">
                  {feedback}
                </p>
              )}
              <p className="form-privacy">
                Tus datos no se guardan en la tienda. Se incluyen únicamente
                en la solicitud que compartas.
              </p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
