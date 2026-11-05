import type { Metadata } from "next";
import Storefront from "../storefront";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Explora la tienda de Los Patricios: Foie Gras de pato, magret, pierna y machón. Añade productos a tu pedido y solicita una cotización.",
};

export default function StorePage() {
  return <Storefront />;
}
