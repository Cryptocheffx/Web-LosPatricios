import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const socialImage = {
  url: "/images/presentacion-magret.jpeg",
  width: 554,
  height: 554,
  alt: "Magret de pato servido en la mesa",
};

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "Los Patricios | Pato y Foie Gras",
    template: "%s | Los Patricios",
  },
  description:
    "Descubre la selección de pato de Los Patricios: Foie Gras, magret, muslo y pierna de pato para disfrutar en cada ocasión.",
  applicationName: "Los Patricios",
  keywords: [
    "Los Patricios",
    "Foie Gras",
    "carne de pato",
    "magret de pato",
    "muslo de pato",
    "pierna de pato",
    "delicatessen",
  ],
  openGraph: {
    title: "Los Patricios | Pato y Foie Gras",
    description:
      "Una selección de pato y delicatessen para cocinar, compartir y celebrar.",
    siteName: "Los Patricios",
    locale: "es",
    type: "website",
    ...(siteUrl ? { images: [socialImage] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Los Patricios | Pato y Foie Gras",
    description:
      "Una selección de pato y delicatessen para cocinar, compartir y celebrar.",
    ...(siteUrl ? { images: [socialImage.url] } : {}),
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
  themeColor: "#f7f3ed",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Los Patricios",
  description:
    "Selección de productos de pato y delicatessen, con Foie Gras como producto destacado.",
  ...(siteUrl
    ? { logo: `${siteUrl.replace(/\/$/, "")}/logo-los-patricios.png` }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
