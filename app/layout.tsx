import type { Metadata, Viewport } from "next";
import CartDrawer from "./cart-drawer";
import "./globals.css";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import { StoreProvider } from "./store-context";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "Los Patricios | Carne de pato y Foie Gras",
    template: "%s | Los Patricios",
  },
  description:
    "Explora la selección de pato de Los Patricios: Foie Gras, magret, pierna y machón. Solicita información sobre precio y presentación.",
  applicationName: "Los Patricios",
  keywords: [
    "Los Patricios",
    "Foie Gras de pato",
    "carne de pato",
    "magret de pato",
    "pierna de pato",
    "machón de pato",
    "tienda de pato",
  ],
  openGraph: {
    title: "Tienda de pato y Foie Gras | Los Patricios",
    description:
      "Explora nuestra tienda de pato: Foie Gras, magret, pierna y machón.",
    siteName: "Los Patricios",
    locale: "es",
    type: "website",
    ...(siteUrl
      ? {
          images: [
            {
              url: "/images/presentacion-magret.jpeg",
              width: 554,
              height: 554,
              alt: "Magret de pato preparado para servir",
            },
          ],
        }
      : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f5f1",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Los Patricios",
  description:
    "Tienda de pato con Foie Gras, magret, pierna y machón de pato.",
  ...(siteUrl
    ? { logo: `${siteUrl}/logo-los-patricios.png`, url: siteUrl }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
        <StoreProvider>
          <SiteHeader />
          <main className="site-main">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
