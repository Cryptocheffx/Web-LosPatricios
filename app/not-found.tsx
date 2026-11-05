import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell not-found">
      <span className="eyebrow">Los Patricios · Tienda</span>
      <h1>No encontramos ese producto.</h1>
      <p>Explora nuestra selección de pato y encuentra otro favorito.</p>
      <Link className="button button-primary" href="/">
        Volver a la tienda
      </Link>
    </section>
  );
}
