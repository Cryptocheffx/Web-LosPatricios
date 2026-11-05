export type ProductCategory = "foie-gras" | "magret" | "pierna" | "machon";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  details: string;
  image: string;
  imageAlt: string;
  servingImage?: string;
  servingImageAlt?: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "foie-gras",
    slug: "foie-gras",
    name: "Foie Gras de pato",
    category: "foie-gras",
    categoryLabel: "Foie Gras",
    description: "La delicatessen de Los Patricios para tus ocasiones especiales.",
    details:
      "Nuestro producto estrella: Foie Gras de pato, pensado para servir como protagonista de una mesa especial. Consulta las presentaciones disponibles directamente con Los Patricios.",
    image: "/images/foie-gras.jpeg",
    imageAlt: "Foie Gras de pato envasado",
    featured: true,
  },
  {
    id: "magret-de-pato",
    slug: "magret-de-pato",
    name: "Magret de pato",
    category: "magret",
    categoryLabel: "Magret",
    description: "Un corte de pato para lucirte con tu próxima receta.",
    details:
      "El magret es una pieza ideal para convertir una comida en una ocasión especial. Explora la fotografía del producto y una sugerencia de presentación.",
    image: "/images/magret-de-pato.jpeg",
    imageAlt: "Magret de pato fresco sobre una tabla de madera",
    servingImage: "/images/presentacion-magret.jpeg",
    servingImageAlt: "Magret de pato cocinado y servido en un plato",
  },
  {
    id: "pierna-de-pato",
    slug: "pierna-de-pato",
    name: "Pierna de pato",
    category: "pierna",
    categoryLabel: "Pierna",
    description: "Una pieza generosa para preparar y compartir en la mesa.",
    details:
      "La pierna de pato es una opción versátil para preparar un plato principal. Consulta su presentación y disponibilidad antes de realizar tu pedido.",
    image: "/images/pierna-de-pato.jpeg",
    imageAlt: "Pierna de pato cruda sobre una tabla",
    servingImage: "/images/presentacion-pierna.jpeg",
    servingImageAlt: "Pierna de pato preparada y servida con acompañamientos",
  },
  {
    id: "machon-de-pato",
    slug: "machon-de-pato",
    name: "Machón de pato",
    category: "machon",
    categoryLabel: "Machón",
    description: "Un corte lleno de sabor para explorar nuevas recetas.",
    details:
      "Conoce el machón de pato y encuentra inspiración para disfrutarlo en casa. Las presentaciones y la disponibilidad se confirman al solicitar información.",
    image: "/images/machon-de-pato.jpeg",
    imageAlt: "Machón de pato crudo sobre una tabla",
    servingImage: "/images/presentacion-machon.jpeg",
    servingImageAlt: "Machones de pato dorados y servidos con hierbas",
  },
];

export const categories: {
  id: ProductCategory | "todos";
  label: string;
}[] = [
  { id: "todos", label: "Todos los productos" },
  { id: "foie-gras", label: "Foie Gras" },
  { id: "magret", label: "Magret de pato" },
  { id: "pierna", label: "Pierna de pato" },
  { id: "machon", label: "Machón de pato" },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
