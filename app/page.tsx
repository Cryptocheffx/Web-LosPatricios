import type { Metadata } from "next";
import LandingPage from "./home-page";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Conoce Los Patricios y descubre nuestros productos de pato: Foie Gras, magret, pierna y machón. Inspiración y atención personalizada.",
};

export default function HomePage() {
  return <LandingPage />;
}
