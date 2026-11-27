# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Arte Nativo Estampados: tienda web de productos personalizados (estampado textil, sublimación, grabado láser, stickers). Todo el contenido visible y los comentarios están en español rioplatense ("vos", "elegí", "mandanos"); mantener ese tono.

Stack: Next.js 14 (App Router) + React 18 + TypeScript + Tailwind + shadcn/ui (Radix), Firebase (Auth + Firestore), deploy en Firebase App Hosting (`apphosting.yaml`).

## Comandos

```bash
npm run dev         # servidor de desarrollo
npm run build       # build de producción
npm run lint        # next lint
npm run typecheck   # tsc --noEmit
```

No hay tests. `next.config.js` tiene `ignoreBuildErrors` e `ignoreDuringBuilds`, así que el build pasa aunque haya errores de tipos: correr `npm run typecheck` para verificar cambios. Ya existen errores previos en `src/ai/flows/generate-product-description.ts`, `src/ai/flows/send-newsletter-flow.ts` (importan `ai` de `@/ai/genkit`, que ya no lo exporta) y en `ui/calendar.tsx` / `ui/chart.tsx` (dependencias no instaladas); no son regresiones.

`next.config.ts` está vacío a propósito; la config real está en `next.config.js`.

## Arquitectura

**Datos (`src/lib/data.ts`)**: única capa de acceso a Firestore, usando el SDK *cliente* de Firebase (`src/lib/firebase.ts`) tanto en server components como en el cliente. Colecciones: `products`, `reviews`, `news`, `subscribers` (doc id = email), `customers`, `carts` (doc id = uid), `admins` (si existe el doc con id = uid, el usuario es admin). Tipos en `src/lib/types.ts`; `Category` es una unión cerrada de strings y la usan el header, los filtros, `HomeSections` y `categorySeo` en `src/lib/site.ts`. Al mapear docs, el `id` del documento va *después* del spread de `doc.data()`, porque algunos productos tienen un campo `id` numérico que lo pisaría.

**Estado global (`src/hooks/`)**: `layout.tsx` envuelve todo en `AuthProvider` → `FavoritesProvider` → `CartProvider`. `useAuth` expone `user`, `isAdmin` y `loading`; las páginas `/admin/*` se protegen del lado del cliente con `isAdmin`. El carrito funciona sin login: los invitados lo guardan en `localStorage` (`guest-cart`) y al iniciar sesión se une con el de Firestore (`carts/{uid}`). Cada línea se identifica por `lineKey` (producto + color + talle), no por `id`. Los favoritos viven en `localStorage` pero exigen login.

**Home (`src/app/page.tsx`)**: server component que filtra y pagina productos según `searchParams` (`category`, `page`). Las secciones de marketing (hero, categorías, servicios, ocasiones, cómo comprar, CTA) solo se muestran con `category=Todos` y página 1, y salen de `src/components/HomeSections.tsx`.

**IA**: el chat (`src/ai/flows/chat.ts`, server action usada por `ChatPopup`) llama directo a Groq (`groq-sdk`, `GROQ_API_KEY`). Mete el catálogo de Firestore en el prompt solo si el mensaje tiene palabras clave de productos, y el system prompt lo limita a temas de la tienda. Los otros flows (descripción de producto, newsletter) todavía usan la API vieja de Genkit y están rotos tras el cambio de proveedor. El newsletter envía mails con Resend (`RESEND_API_KEY`).

**Pedidos y contacto**: no hay pago online ni creador online (no linkear a `/crear`). El checkout es el carrito: arma un mensaje de WhatsApp con `buildWhatsAppOrderMessage` (`src/lib/cart-utils.ts`, que también parsea y formatea precios guardados como `"$13000"` y traduce colores hex a nombres). Los CTA de cotización arman links `wa.me` con `phoneNumber` exportado de `src/components/WhatsAppButton.tsx` (`NEXT_PUBLIC_WHATSAPPNUMBER`).

**SEO**: `src/lib/site.ts` centraliza URL, textos y `baseOpenGraph` (Next reemplaza el `openGraph` entero por página, así que siempre partir de esa base). `sitemap.ts` y `robots.ts` en `src/app`. Producto tiene `generateMetadata` + JSON-LD `Product`. Las categorías (`/?category=X`) no llevan canonical a propósito: Next 14 descarta el query string cuando la ruta es `/`.

Variables de entorno en `.env`: `NEXT_PUBLIC_SITE_URL` (dominio público, para canonical/sitemap), `NEXT_PUBLIC_FIREBASE_*`, `NEXT_PUBLIC_WHATSAPPNUMBER`, `GROQ_API_KEY`, `RESEND_API_KEY`, `GEMINI_API_KEY`.

## Sistema visual

Paleta cálida definida como variables HSL en `src/app/globals.css`: terracota del logo como `--primary`, fondo crema, `--secondary` tinta oscura y `--radius: 1rem`. Fuentes: `font-headline` (Bricolage Grotesque) y `font-body` (Plus Jakarta Sans), cargadas desde Google Fonts en `layout.tsx`.

Patrón de sección: usar `SectionHeading` de `HomeSections.tsx` (eyebrow + título grande en mayúsculas que termina en punto, p. ej. "Productos destacados.") en lugar de `h2` sueltos. También hay clases utilitarias `.eyebrow`, `.section-title` y `.bg-grain`. Para imágenes remotas usar `ImageWithSkeleton` (`src/components/ui/image-with-skeleton.tsx`, misma API que `next/image`, padre `relative`) para que se vea un skeleton mientras cargan. Estados vacíos y skeleton de grilla en `PageStates.tsx`; pantallas de cuenta con `AuthShell`; panel admin con `AdminHeader` / `AdminAccessDenied`. Tarjetas: `rounded-2xl border bg-card`, hover `-translate-y-1` + sombra, links con flecha `ArrowRight` que se desplaza en hover.

Todas las páginas usan este estilo salvo `/generate-description` (depende del flow de IA roto).
