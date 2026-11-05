# Los Patricios

Sitio profesional y responsive de Los Patricios construido con **Node.js,
Next.js App Router, TypeScript y Yarn**. Incluye páginas independientes de
Inicio, Tienda, About y Contacto, además de las fichas individuales de Foie
Gras, magret, pierna y machón de pato.

## Requisitos

- Node.js 20.9 o posterior
- Yarn Classic 1.22.22

El proyecto fija Yarn en `package.json`; Corepack lo activa automáticamente
con `corepack yarn`.

## Primer inicio

```bash
corepack yarn install
corepack yarn dev
```

Abre http://localhost:3000 para ver Inicio. Desde la navegación puedes ir a la
tienda, conocer la empresa o enviar una consulta. Si ya tienes Yarn instalado,
puedes ejecutar `yarn install` y `yarn dev`.

## Comprobaciones y producción

```bash
corepack yarn typecheck
corepack yarn build
corepack yarn start
```

## Catálogo y pedidos

- Busca productos, filtra por sus categorías, ordena los resultados y abre las
  fichas individuales en la página Tienda.
- Añade unidades al carrito, cambia cantidades y vuelve a abrir la tienda: el
  carrito permanece guardado en el dispositivo.
- Envía una solicitud de cotización desde el carrito directamente al WhatsApp
  de Los Patricios. La página de contacto también permite enviar consultas al
  WhatsApp o al correo de ventas.
- El Inicio cuenta con un carrusel de tres fotografías, productos destacados y
  enlaces a la tienda, About y Contacto.
- Las solicitudes no procesan pagos y no guardan datos personales; falta
  configurar precios y presentaciones comerciales para habilitar un cobro real.

## Configuración

Duplica `.env.example` como `.env.local` y define los valores que tengas:

- `NEXT_PUBLIC_SITE_URL`: dominio público con `https://`; se usa en los
  metadatos y en el sitemap de Google.
- `GOOGLE_SITE_VERIFICATION`: token que entrega Google Search Console.

El teléfono y correo oficiales se comparten entre el encabezado, carrito y
página de Contacto desde `lib/contact-info.ts`. Las imágenes de marca y
producto están en `public/`.
