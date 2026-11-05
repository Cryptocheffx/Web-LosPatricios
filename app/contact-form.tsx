"use client";

import { useRef, type FormEvent } from "react";
import { contactInfo } from "../lib/contact-info";

type ContactChannel = "whatsapp" | "email";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  function sendMessage(channel: ContactChannel) {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const text = [
      `Hola, soy ${name}. Quiero contactar a Los Patricios.`,
      "",
      message,
      "",
      `Correo: ${email}`,
      phone ? `Teléfono: ${phone}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const encoded = encodeURIComponent(text);

    if (channel === "whatsapp") {
      window.open(
        `https://wa.me/${contactInfo.whatsappHref}?text=${encoded}`,
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }

    window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(
      "Consulta desde la página web — Los Patricios",
    )}&body=${encoded}`;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage("email");
  }

  return (
    <form
      className="contact-form"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div className="contact-form-intro">
        <span className="eyebrow">Cuéntanos qué necesitas</span>
        <h2>Contáctanos</h2>
        <p>
          Completa tus datos y elige cómo enviar tu consulta. El mensaje se
          abrirá en tu correo o WhatsApp para que puedas revisarlo antes de
          compartirlo.
        </p>
      </div>

      <div className="contact-fields">
        <label>
          Nombre <span>*</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Tu nombre"
          />
        </label>
        <label>
          Correo electrónico <span>*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={160}
            placeholder="nombre@correo.com"
          />
        </label>
        <label>
          Teléfono <span className="optional">(opcional)</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            placeholder="+51 ..."
          />
        </label>
        <label className="contact-message-field">
          Tu consulta <span>*</span>
          <textarea
            name="message"
            required
            minLength={5}
            maxLength={2000}
            rows={5}
            placeholder="Cuéntanos cómo podemos ayudarte..."
          />
        </label>
      </div>

      <div className="contact-form-actions">
        <button
          className="button button-home-primary"
          type="button"
          onClick={() => sendMessage("whatsapp")}
        >
          Enviar por WhatsApp <span aria-hidden="true">↗</span>
        </button>
        <button className="button button-contact-outline" type="submit">
          Enviar por correo <span aria-hidden="true">↗</span>
        </button>
      </div>
      <p className="contact-privacy">
        Al enviar, se abrirá la aplicación elegida. No almacenamos estos datos
        en el sitio.
      </p>
    </form>
  );
}
