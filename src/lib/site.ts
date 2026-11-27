// src/lib/site.ts
// Datos del sitio usados para SEO (metadatos, sitemap, datos estructurados).

/** URL pública del sitio. Configurar NEXT_PUBLIC_SITE_URL en producción (sin barra final). */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export const siteName = 'Arte Nativo Estampados';

export const siteDescription =
  'Productos personalizados con estampado textil, sublimación, grabado láser y stickers. Remeras, buzos, tazas, mates, llaveros y más para colegios, empresas, eventos y regalos. Envíos a todo el país.';

export const defaultOgImage =
  'https://res.cloudinary.com/julian-soto/image/upload/v1754782637/arte-nativo-web/ChatGPT_Image_9_ago_2025_08_35_29_p.m._gdujym.png';

/**
 * Base de Open Graph. Next reemplaza el objeto `openGraph` completo cuando una página
 * define el suyo, así que cada página tiene que partir de esta base.
 */
export const baseOpenGraph = {
  type: 'website' as const,
  locale: 'es_AR',
  siteName: 'Arte Nativo Estampados',
  images: [{ url: defaultOgImage, alt: 'Arte Nativo Estampados' }],
};

export const siteKeywords = [
  'productos personalizados',
  'estampado textil',
  'sublimación',
  'grabado láser',
  'remeras personalizadas',
  'buzos de egresados',
  'tazas personalizadas',
  'stickers personalizados',
  'merchandising para empresas',
  'regalos personalizados',
];

/** Texto SEO por categoría, para títulos y descripciones del catálogo filtrado. */
export const categorySeo: Record<string, { title: string; description: string }> = {
  Indumentaria: {
    title: 'Indumentaria personalizada: remeras, buzos y gorras',
    description: 'Remeras, buzos, gorras y bolsas personalizadas con serigrafía, DTF y vinilo textil. Ideal para egresados, empresas y eventos.',
  },
  Cerámica: {
    title: 'Tazas y cerámica sublimada personalizada',
    description: 'Tazas y objetos de cerámica sublimados con tu diseño, foto o logo. Colores vivos y duraderos.',
  },
  Plástico: {
    title: 'Productos de plástico personalizados',
    description: 'Vasos, botellas y artículos plásticos personalizados con tu logo o diseño.',
  },
  Acrílico: {
    title: 'Acrílico personalizado: llaveros, carteles y trofeos',
    description: 'Llaveros, carteles, trofeos y displays de acrílico cortados y grabados con láser.',
  },
  MDF: {
    title: 'MDF personalizado con corte y grabado láser',
    description: 'Cortes y grabados láser en MDF: carteles, souvenirs, portarretratos y decoración personalizada.',
  },
  Metal: {
    title: 'Grabado láser en metal: mates, termos y más',
    description: 'Mates, termos, botellas y objetos de metal grabados con láser con terminación premium.',
  },
  Goma: {
    title: 'Productos de goma personalizados',
    description: 'Artículos de goma personalizados con tu marca o diseño.',
  },
  Papel: {
    title: 'Papelería personalizada',
    description: 'Papelería, tarjetas y etiquetas personalizadas para tu marca o evento.',
  },
  Varios: {
    title: 'Stickers, bolsas y productos personalizados',
    description: 'Stickers personalizados con promos por cantidad, bolsas y mucho más para marcas y eventos.',
  },
};

/** Recorta un texto para usar como meta description (~155 caracteres). */
export function truncate(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
}
